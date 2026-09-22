/**
 * Roll de texto por carácter. Renderiza dos copias apiladas en la misma celda
 * de grid dentro de un contenedor con overflow hidden: al hacer hover sobre el
 * ancestro con clase `roll`, la copia de arriba sube y la de abajo entra, con
 * un retardo escalonado por carácter.
 */
const STAGGER_MS = 22;

function Copia({ chars, oculta }: { chars: string[]; oculta?: boolean }) {
  return (
    <span className="text-roll__copy" aria-hidden={oculta || undefined}>
      {chars.map((char, i) => (
        <span key={i} style={{ transitionDelay: `${i * STAGGER_MS}ms` }}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default function TextRoll({ children }: { children: string }) {
  const chars = [...children];
  return (
    <span className="text-roll">
      <span className="text-roll__track">
        <Copia chars={chars} />
        <Copia chars={chars} oculta />
      </span>
    </span>
  );
}
