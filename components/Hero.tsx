import WaveText from "@/components/WaveText";

export default function Hero() {
  return (
    <section
      id="top"
      className="px-[var(--gutter)] pt-[clamp(40px,9vw,110px)] pb-[clamp(32px,6vw,72px)]"
    >
      {/* Cuerpo en .wordmark, compartido con el wordmark del footer. */}
      <WaveText as="h1" className="wordmark m-0">
        Matias Gardella
      </WaveText>

      <div className="mt-[clamp(28px,5vw,64px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-[clamp(20px,4vw,64px)]">
        <p className="m-0 max-w-[32ch] text-[clamp(17px,1.5vw,22px)] leading-[1.35] text-pretty">
          Diseño web para <strong className="font-bold">negocios de servicios</strong>, desde
          Argentina.
        </p>
        <p className="m-0 max-w-[34ch] justify-self-end text-right text-[clamp(17px,1.5vw,22px)] leading-[1.35] text-muted text-pretty">
          Diseño experiencias digitales{" "}
          <span className="font-bold text-ink">estratégicas</span> que transforman la{" "}
          <span className="font-bold text-ink">atención</span> en{" "}
          <span className="font-bold text-ink">acción</span>.
        </p>
      </div>
    </section>
  );
}
