import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MarqueeServicios from "@/components/MarqueeServicios";
import Problemas from "@/components/Problemas";
import Servicios from "@/components/Servicios";
import SobreMi from "@/components/SobreMi";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MarqueeServicios />
        <Servicios />
        <Problemas />
        <SobreMi />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
