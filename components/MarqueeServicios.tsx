import { serviciosNombres } from "@/lib/data";

// La secuencia se repite dos veces por mitad y la mitad se duplica: el keyframe
// traslada -50%, así el bucle empalma sin salto.
const secuencia = [...serviciosNombres, ...serviciosNombres];

function Mitad({ prefijo }: { prefijo: string }) {
  return (
    <>
      {secuencia.map((item, i) => (
        <span key={`${prefijo}-${i}`} className="contents">
          <span className="pr-10 whitespace-nowrap">{item}</span>
          <span className="pr-10">—</span>
        </span>
      ))}
    </>
  );
}

export default function MarqueeServicios() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y border-hairline-soft py-[14px]"
    >
      <div
        className="marquee-track mono-label tracking-[0.22em] text-muted"
        style={{ "--marq-duration": "28s" } as React.CSSProperties}
      >
        <Mitad prefijo="a" />
        <Mitad prefijo="b" />
      </div>
    </div>
  );
}
