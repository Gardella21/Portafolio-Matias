import TextRoll from "@/components/TextRoll";
import WaveText from "@/components/WaveText";
import { contacto, navLinks } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-hairline-soft px-[var(--gutter)] pt-[clamp(40px,6vw,80px)] pb-6">
      {/* Solo enlaces: el mail y el teléfono viven una sola vez en #contacto,
          que está justo arriba. Acá el footer navega, no vuelve a vender. */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-[clamp(28px,4vw,56px)]">
        <div>
          <span className="mono-label tracking-[0.18em] text-on-dark-muted">Redes</span>
          <div className="mt-6 flex flex-col items-start text-[clamp(16px,1.4vw,20px)]">
            <a href={contacto.instagramHref} target="_blank" rel="noopener" className="roll py-1">
              <TextRoll>Instagram</TextRoll>
            </a>
            <a href={contacto.whatsappHref} target="_blank" rel="noopener" className="roll py-1">
              <TextRoll>WhatsApp</TextRoll>
            </a>
          </div>
        </div>

        <div className="justify-self-end text-right">
          <span className="mono-label tracking-[0.18em] text-on-dark-muted">Menú</span>
          <div className="mt-6 flex flex-col items-end text-[clamp(16px,1.4vw,20px)]">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="roll py-1">
                <TextRoll>{link.label}</TextRoll>
              </a>
            ))}
            <a href="#contacto" className="roll py-1">
              <TextRoll>Contacto</TextRoll>
            </a>
          </div>
        </div>
      </div>

      <WaveText className="wordmark mt-[clamp(40px,7vw,90px)]">
        Matias Gardella
      </WaveText>

      <div className="mono-label mt-[clamp(24px,4vw,44px)] flex flex-wrap items-center justify-between gap-x-5 gap-y-3 tracking-[0.14em] text-muted">
        <span className="whitespace-nowrap">Buenos Aires, AR</span>
        <a href="#top" className="roll py-2 whitespace-nowrap">
          <TextRoll>Volver arriba ↑</TextRoll>
        </a>
        <span>©2026</span>
      </div>
    </footer>
  );
}
