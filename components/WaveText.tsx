"use client";

import { useEffect, useRef, type ElementType } from "react";

/**
 * Título con deformación de onda siguiendo el cursor, como en la referencia:
 * el texto se rasteriza a una textura y un shader desplaza las UV en ondas
 * concéntricas alrededor del mouse, con caída por distancia.
 *
 * El texto real sigue en el DOM (accesible e indexable): el canvas se dibuja
 * encima y la capa de texto queda en opacity 0. Si no hay WebGL, o el
 * visitante pidió menos movimiento, no se monta nada y queda el texto normal.
 */

// La textura sólo se agranda en vertical. En horizontal tiene que coincidir
// exacto con la caja del bloque: cualquier píxel de canvas que sobresalga a
// los costados ensancha el documento (ni `overflow: clip` lo evita en Chrome,
// que igual lo suma al scrollWidth).
const PAD_Y = 32;
const MAX_DPR = 2;

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = vec2(aPos.x * 0.5 + 0.5, 0.5 - aPos.y * 0.5);
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `
precision mediump float;
uniform sampler2D uTex;
uniform vec2 uMouse;
uniform float uTime;
uniform float uStrength;
uniform float uAspect;
varying vec2 vUv;
void main() {
  vec2 d = vUv - uMouse;
  d.x *= uAspect;
  float dist = length(d);
  // dist está en unidades de alto del canvas: 0.5 es un radio de ~115px.
  float fall = smoothstep(0.5, 0.0, dist);
  float wave = sin(dist * 22.0 - uTime * 4.5);
  vec2 dir = dist > 0.0001 ? d / dist : vec2(0.0);
  dir.x /= uAspect;
  vec2 uv = vUv + dir * wave * fall * 0.05 * uStrength;
  // Fuera de la textura, transparente: evita que CLAMP_TO_EDGE estire el
  // primer píxel y deje un chorreado en el borde del texto.
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
    gl_FragColor = vec4(0.0);
  } else {
    gl_FragColor = texture2D(uTex, uv);
  }
}`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error("WaveText shader:", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

/** Rasteriza el texto con la tipografía y métricas que ya tiene el elemento. */
function pintarTexto(host: HTMLElement, texto: string, dpr: number) {
  const { width, height } = host.getBoundingClientRect();
  if (!width || !height) return null;

  const cs = getComputedStyle(host);
  const fontSize = parseFloat(cs.fontSize);
  const capa = document.createElement("canvas");
  capa.width = Math.ceil(width * dpr);
  capa.height = Math.ceil((height + PAD_Y * 2) * dpr);
  const ctx = capa.getContext("2d");
  if (!ctx) return null;

  ctx.scale(dpr, dpr);
  ctx.font = `${cs.fontWeight} ${fontSize}px ${cs.fontFamily}`;
  ctx.letterSpacing = cs.letterSpacing === "normal" ? "0px" : cs.letterSpacing;
  ctx.fillStyle = cs.color;
  ctx.textBaseline = "alphabetic";

  // La caja del elemento es el line-box (line-height 0.86, más chico que el
  // em-box), así que la línea base se calcula desde las métricas de la fuente.
  const m = ctx.measureText(texto);
  const asc = m.fontBoundingBoxAscent ?? fontSize * 0.8;
  const desc = m.fontBoundingBoxDescent ?? fontSize * 0.2;
  const baseline = PAD_Y + (height - (asc + desc)) / 2 + asc;

  ctx.fillText(texto, 0, baseline);
  return { capa, width, height: height + PAD_Y * 2 };
}

export default function WaveText({
  children,
  as: Tag = "div",
  className = "",
}: {
  children: string;
  as?: ElementType;
  className?: string;
}) {
  const hostRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("WaveText link:", gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTex = gl.getUniformLocation(prog, "uTex");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uStrength = gl.getUniformLocation(prog, "uStrength");
    const uAspect = gl.getUniformLocation(prog, "uAspect");

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.uniform1i(uTex, 0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    let aspecto = 1;
    let listo = false;
    let mouse = { x: -1, y: -1 };
    let fuerza = 0;
    let objetivo = 0;
    let frame = 0;
    let t0 = 0;

    const dibujar = (t: number) => {
      if (!listo) return;
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uTime, t);
      gl.uniform1f(uStrength, fuerza);
      gl.uniform1f(uAspect, aspecto);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const construir = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const pintado = pintarTexto(host, children, dpr);
      if (!pintado) return;
      canvas.style.width = `${pintado.width}px`;
      canvas.style.height = `${pintado.height}px`;
      canvas.width = pintado.capa.width;
      canvas.height = pintado.capa.height;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        pintado.capa,
      );
      aspecto = pintado.width / pintado.height;
      listo = true;
      dibujar(0);
    };

    const loop = (ts: number) => {
      if (!t0) t0 = ts;
      fuerza += (objetivo - fuerza) * 0.08;
      dibujar((ts - t0) / 1000);
      if (objetivo > 0 || fuerza > 0.002) {
        frame = requestAnimationFrame(loop);
      } else {
        frame = 0;
        fuerza = 0;
        dibujar(0);
      }
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse = {
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top) / r.height,
      };
      // Margen de gracia: la onda arranca un poco antes de llegar al texto.
      const cerca =
        mouse.x > -0.15 && mouse.x < 1.15 && mouse.y > -0.6 && mouse.y < 1.6;
      objetivo = cerca ? 1 : 0;
      if (cerca && !frame) frame = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    const ro = new ResizeObserver(construir);
    ro.observe(host);

    host.classList.add("wave-text--on");
    host.appendChild(canvas);

    let cancelado = false;
    document.fonts.ready.then(() => {
      if (!cancelado) construir();
    });
    construir();

    return () => {
      cancelado = true;
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      ro.disconnect();
      host.classList.remove("wave-text--on");
      canvas.remove();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [children]);

  return (
    <Tag ref={hostRef} className={`wave-text ${className}`}>
      <span className="wave-text__label">{children}</span>
    </Tag>
  );
}
