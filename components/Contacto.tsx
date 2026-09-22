import { contacto } from "@/lib/data";

const tarjetas = [
  {
    label: "Email",
    valor: contacto.email,
    href: contacto.emailHref,
    externo: false,
    quiebre: true,
  },
  {
    label: "WhatsApp",
    valor: contacto.whatsapp,
    href: contacto.whatsappHref,
    externo: true,
    quiebre: false,
  },
  {
    label: "Instagram",
    valor: contacto.instagram,
    href: contacto.instagramHref,
    externo: true,
    quiebre: false,
  },
];

export default function Contacto() {
  return (
    <section
      id="contacto"
      className="px-[var(--gutter)] pt-[var(--section-y)] pb-[clamp(40px,6vw,80px)]"
    >
      <span className="mono-label tracking-[0.18em] text-muted">Contacto</span>

      <h2 className="mt-7 mb-[clamp(32px,5vw,56px)] max-w-[14ch] text-[clamp(32px,6vw,88px)] leading-[0.98] font-bold tracking-[-0.04em] text-pretty">
        ¿Empezamos con tu sitio?
      </h2>

      {/* Mismas guías de 1px que en "Problemas": gap + outline por tarjeta. */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-px">
        {tarjetas.map((t) => (
          <a
            key={t.label}
            href={t.href}
            {...(t.externo ? { target: "_blank", rel: "noopener" } : {})}
            className="flex min-w-0 flex-col gap-3 p-[clamp(22px,3vw,34px)] transition-colors duration-150 ease-out [outline:1px_solid_var(--color-rule)] hover:bg-ink hover:text-bg"
          >
            <span className="mono-label tracking-[0.16em] opacity-60">
              {t.label} ↗
            </span>
            <span
              className={
                t.quiebre
                  ? "text-[clamp(16px,1.5vw,21px)] tracking-[-0.02em] [overflow-wrap:anywhere]"
                  : "text-[clamp(16px,1.5vw,21px)] tracking-[-0.02em]"
              }
            >
              {t.valor}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
