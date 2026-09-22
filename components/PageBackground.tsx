"use client";

import { useEffect } from "react";

// "Sobre mí" no figura: su fondo es negro propio y el tono anterior se mantiene.
const tonos: Record<string, string> = {
  top: "#fbfbfa",
  servicios: "#eef3ec",
  problemas: "#f1eef8",
  contacto: "#fcf0e6",
};

export default function PageBackground() {
  useEffect(() => {
    const root = document.documentElement;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) root.style.setProperty("--page-bg", tonos[e.target.id]);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    for (const id of Object.keys(tonos)) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  return null;
}
