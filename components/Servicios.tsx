import SectionHeading from "@/components/SectionHeading";
import { servicios } from "@/lib/data";

export default function Servicios() {
  return (
    <section id="servicios" className="px-[var(--gutter)] py-[var(--section-y)]">
      <SectionHeading eyebrow="Servicios" className="mb-[clamp(28px,5vw,64px)]" />

      {servicios.map((s) => (
        <div
          key={s.num}
          className="grid grid-cols-[64px_minmax(0,1fr)] items-start gap-[clamp(12px,3vw,40px)] border-t border-hairline py-[clamp(20px,3vw,34px)] transition-colors duration-150 ease-out hover:bg-tint"
        >
          <span className="mono-label pt-[10px] tracking-[0.16em] text-muted">
            {s.num}
          </span>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-start gap-[clamp(8px,2vw,40px)]">
            <h3 className="m-0 text-[clamp(30px,5vw,62px)] leading-none font-bold tracking-[-0.035em]">
              {s.titulo}
            </h3>
            <p className="m-0 max-w-[46ch] text-[clamp(15px,1.2vw,17px)] leading-[1.5] text-body text-pretty">
              {s.texto}
            </p>
          </div>
        </div>
      ))}

      {/* Línea de cierre del listado */}
      <div className="border-t border-hairline" />
    </section>
  );
}
