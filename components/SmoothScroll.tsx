"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Scroll suave con inercia (Lenis), con la misma configuración que usa la
 * referencia: duration 1.2, lerp 0.1 y easing exponencial de salida.
 * `anchors` hace que los links #ancla los maneje Lenis con el mismo easing,
 * compensando la altura del header sticky.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    // Se mide en vez de fijarlo: con un número a mano, cualquier diferencia
    // deja asomar una franja de la sección anterior debajo del header.
    const headerH = document.querySelector("header")?.offsetHeight ?? 0;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      orientation: "vertical",
      autoToggle: true,
      anchors: { offset: -headerH },
    });

    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
