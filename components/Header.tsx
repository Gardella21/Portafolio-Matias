"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import TextRoll from "@/components/TextRoll";
import { navLinks } from "@/lib/data";

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline-header bg-[rgba(251,251,250,0.86)] backdrop-blur-[10px]">
      <div className="flex items-center justify-between gap-6 px-[var(--gutter)] py-[18px]">
        <a
          href="#top"
          className="roll flex items-center gap-[10px]"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo.svg"
            alt=""
            width={23}
            height={22}
            priority
            className="block h-[22px] w-auto"
          />
          <span className="mono-label tracking-[0.12em] whitespace-nowrap">
            <TextRoll>Matias Gardella™</TextRoll>
          </span>
        </a>

        <nav className="mono-label hidden items-center gap-[clamp(16px,3.5vw,48px)] tracking-[0.14em] md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="roll whitespace-nowrap">
              <TextRoll>{link.label}</TextRoll>
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          className="roll mono-label hidden rounded-[999px] border border-ink px-[14px] py-2 tracking-[0.14em] whitespace-nowrap transition-colors duration-150 ease-out hover:bg-ink hover:text-bg md:block"
        >
          <TextRoll>Hablemos</TextRoll>
        </a>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
          className="mono-label rounded-[999px] border border-ink px-[14px] py-2 tracking-[0.14em] whitespace-nowrap transition-colors duration-150 ease-out hover:bg-ink hover:text-bg md:hidden"
        >
          {open ? "Cerrar" : "Menú"}
        </button>
      </div>

      <div
        id="menu-movil"
        hidden={!open}
        className="border-t border-hairline-header px-[var(--gutter)] pt-6 pb-8 md:hidden"
      >
        <nav className="mono-label flex flex-col items-start gap-5 tracking-[0.14em]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="roll"
              onClick={() => setOpen(false)}
            >
              <TextRoll>{link.label}</TextRoll>
            </a>
          ))}
        </nav>
        <a
          href="#contacto"
          onClick={() => setOpen(false)}
          className="roll mono-label mt-7 inline-block rounded-[999px] border border-ink px-[14px] py-2 tracking-[0.14em] transition-colors duration-150 ease-out hover:bg-ink hover:text-bg"
        >
          <TextRoll>Hablemos</TextRoll>
        </a>
      </div>
    </header>
  );
}
