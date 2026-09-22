import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ServiciosCarousel from "@/components/ServiciosCarousel";
import { servicios } from "@/lib/data";

export default function Servicios() {
  return (
    <section id="servicios" className="px-[var(--gutter)] py-[var(--section-y)]">
      <SectionHeading eyebrow="Servicios" className="mb-[clamp(28px,5vw,64px)]" />

      <Reveal>
        <ServiciosCarousel servicios={servicios} />
      </Reveal>
    </section>
  );
}
