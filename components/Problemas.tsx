import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { problemas } from "@/lib/data";

export default function Problemas() {
  return (
    <section
      id="problemas"
      className="px-[var(--gutter)] py-[var(--section-y)]"
    >
      <SectionHeading
        eyebrow="Problemas que resuelvo"
        className="mb-[clamp(28px,5vw,56px)]"
      />

      <Reveal>
        <h2 className="mt-0 mb-[clamp(36px,6vw,72px)] max-w-[18ch] text-[clamp(28px,4.2vw,56px)] leading-[1.05] font-bold tracking-[-0.035em] text-pretty">
          Tu web no tiene que ser linda. Tiene que trabajar.
        </h2>
      </Reveal>

      {/* Guías de 1px: el gap de la grilla + un outline por tarjeta. Sin fondo
          propio, para que se vea el color de página que cambia con el scroll. */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-px">
        {problemas.map((p, i) => (
          <Reveal
            key={p.num}
            delay={Math.min(i * 0.1, 0.3)}
            className="flex min-h-[200px] flex-col gap-[14px] p-[clamp(22px,3vw,36px)] [outline:1px_solid_var(--color-rule-surface)]"
          >
            <span className="mono-label tracking-[0.16em] text-muted">{p.num}</span>
            <h3 className="m-0 text-[clamp(19px,1.8vw,25px)] leading-[1.15] font-bold tracking-[-0.02em] text-pretty">
              {p.titulo}
            </h3>
            <p className="mt-auto mr-0 mb-0 ml-0 text-[15px] leading-[1.5] text-body text-pretty">
              {p.texto}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
