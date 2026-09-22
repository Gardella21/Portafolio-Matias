# Portafolio — Matias Gardella

Landing page de una sola pantalla para ofrecer servicios de diseño y desarrollo
web a negocios de servicios. Español (es-AR), estática, sin formularios ni
fetching de datos.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- [Lenis](https://github.com/darkroomengineering/lenis) para el scroll suave
- JetBrains Mono vía `next/font`; Helvetica Neue del sistema para el display

## Arranque

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de producción
npm run lint
```

## Estructura

```
app/globals.css      tokens de diseño (@theme), base, clases de componente
app/layout.tsx       metadata, fuente mono, montaje del scroll suave
app/page.tsx         composición de las secciones
components/          Header, Hero, Servicios, Problemas, SobreMi, Contacto, Footer
                     + TextRoll, WaveText, SmoothScroll, MarqueeServicios
lib/data.ts          contenido: servicios, problemas, contacto, nav
```

## Decisiones que no se ven en el código

**Todo el layout es fluido.** Tipografía y espaciado con `clamp()`, grillas con
`auto-fit` + `minmax`. El único breakpoint del proyecto es `md:`, y sólo para
dos cosas: colapsar el nav del header en un menú, y que el bloque de texto de
"Sobre mí" cruce dos columnas recién cuando la grilla tiene más de una.

**Las guías de 1px de las grillas** (Problemas, Contacto) se dibujan con un
`outline` por tarjeta sobre un contenedor del color de la sección, no con el
truco de `gap: 1px` sobre un fondo. Con ese truco, las celdas vacías de la
última fila se pintaban de gris. Los colores `--color-rule*` son la hairline
`rgba(11,11,11,0.14)` aplanada a opaco, para que los outlines contiguos no se
superpongan oscureciendo la línea.

**No hay `scroll-behavior: smooth`.** Lo anima Lenis llamando a `window.scrollTo`
en cada frame; el smooth nativo lo interceptaba y lo dejaba clavado. Si Lenis no
arranca (`prefers-reduced-motion`), los anclas saltan de una.

**`WaveText`** rasteriza el título a una textura y lo deforma con un shader que
sigue al cursor. El texto real sigue en el DOM con `opacity: 0` para lectores de
pantalla y para SEO. El canvas coincide exacto con el ancho de la caja: cualquier
píxel que sobresalga a los costados ensancha el documento, y `overflow: clip` no
alcanza para evitarlo en Chrome.

**Accesibilidad y movimiento.** Los marquees, el roll de texto de los links, el
scroll suave y la onda se desactivan con `prefers-reduced-motion: reduce`.
