import Reveal from "@/components/Reveal";
import { diferenciales, serviciosNombres } from "@/lib/data";

export default function SobreMi() {
  return (
    <section
      id="sobre-mi"
      className="bg-ink px-[var(--gutter)] py-[var(--section-y)] text-on-dark"
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-[clamp(32px,5vw,72px)]">
        {/* Ocupa dos columnas sólo cuando la grilla llega a tener más de una. */}
        <Reveal className="min-w-0 md:col-span-2">
          <span className="mono-label tracking-[0.18em] text-on-dark-muted">
            Sobre mí
          </span>
          <p className="mt-7 mb-0 max-w-[30ch] text-[clamp(19px,2.2vw,30px)] leading-[1.3] tracking-[-0.02em] text-pretty">
            Diseño y desarrollo sitios para negocios de servicios que necesitan vender,
            no decorar. Sin plantillas, sin intermediarios, sin vueltas: entiendo el
            negocio, armo la estructura y la ejecuto completa.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="mono-label tracking-[0.18em] text-on-dark-muted">
            Servicios
          </span>
          <div className="mt-7 flex flex-col gap-[6px] text-[clamp(17px,1.5vw,21px)]">
            {serviciosNombres.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <span className="mono-label tracking-[0.18em] text-on-dark-muted">
            Diferenciales
          </span>
          <div className="mt-7 flex flex-col gap-[6px] text-[clamp(17px,1.5vw,21px)]">
            {diferenciales.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
