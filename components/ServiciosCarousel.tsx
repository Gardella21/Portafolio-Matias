"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

import type { Servicio } from "@/lib/data";

export default function ServiciosCarousel({ servicios }: { servicios: Servicio[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* Sangra hasta el borde de la pantalla; el padding del track mantiene el
          gutter al inicio y al final del recorrido. */}
      <div
        ref={trackRef}
        className="-mx-[var(--gutter)] cursor-grab overflow-hidden active:cursor-grabbing xl:cursor-auto xl:active:cursor-auto"
      >
        {/* Desde xl las 4 cards entran enteras: el track toma el ancho del
            contenedor y no queda recorrido para arrastrar. */}
        <motion.div
          className="flex w-max gap-[clamp(16px,2.5vw,28px)] px-[var(--gutter)] xl:w-full"
          drag="x"
          dragConstraints={trackRef}
          dragElastic={0.12}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
        >
          {servicios.map((s) => (
            <div
              key={s.num}
              className="flex w-[min(80vw,340px)] shrink-0 flex-col xl:w-auto xl:min-w-0 xl:flex-1 gap-[18px] border border-hairline p-[clamp(22px,3vw,30px)] select-none"
            >
              <span className="mono-label tracking-[0.16em] text-muted">{s.num}</span>
              <h3 className="m-0 text-[clamp(26px,3.4vw,36px)] leading-[1.05] font-bold tracking-[-0.035em]">
                {s.titulo}
              </h3>
              <p className="m-0 text-[15px] leading-[1.5] text-body text-pretty">{s.texto}</p>
            </div>
          ))}
        </motion.div>
      </div>
      <p className="mono-label mt-5 mb-0 tracking-[0.16em] text-muted md:hidden">Deslizá →</p>
    </>
  );
}
