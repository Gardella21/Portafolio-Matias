export type Servicio = {
  num: string;
  titulo: string;
  texto: string;
};

export type Problema = {
  num: string;
  titulo: string;
  texto: string;
};

export const servicios: Servicio[] = [
  {
    num: "01",
    titulo: "Diseño web",
    texto:
      "Sitios hechos desde cero para tu negocio: estructura, jerarquía y mensaje pensados para que el visitante entienda qué hacés en cinco segundos.",
  },
  {
    num: "02",
    titulo: "UX/UI",
    texto:
      "Recorridos claros, sin fricción y sin decisiones al azar. Cada pantalla tiene un objetivo y una acción siguiente.",
  },
  {
    num: "03",
    titulo: "Desarrollo web",
    texto:
      "Implementación completa: rápida, responsive y lista para Google. Sin plantillas genéricas ni plugins de más.",
  },
  {
    num: "04",
    titulo: "Landing pages",
    texto:
      "Páginas de una sola misión: convertir. Ideales para campañas, lanzamientos y captación de clientes.",
  },
];

export const problemas: Problema[] = [
  {
    num: "01",
    titulo: "Tu web recibe visitas y no genera consultas",
    texto:
      "Reordeno el mensaje y los llamados a la acción para que la visita termine en contacto.",
  },
  {
    num: "02",
    titulo: "En el celular se ve rota o carga lenta",
    texto:
      "Construyo mobile-first y liviano: la mayoría de tus clientes te ve desde el teléfono.",
  },
  {
    num: "03",
    titulo: "No lográs comunicar tu valor",
    texto:
      "Traduzco lo que hacés a un mensaje concreto que el cliente entiende y compara.",
  },
  {
    num: "04",
    titulo: "No aparecés en Google",
    texto:
      "Estructura, velocidad y contenido armados para que te encuentren cuando te buscan.",
  },
];

export const navLinks = [
  { label: "Inicio", href: "#top" },
  { label: "Servicios", href: "#servicios" },
  { label: "Problemas", href: "#problemas" },
  { label: "Sobre mí", href: "#sobre-mi" },
] as const;

/** Nombres de los servicios: sirven al marquee y a la lista de "Sobre mí". */
export const serviciosNombres = servicios.map((s) => s.titulo);

export const diferenciales = [
  "Entrega rápida",
  "Trato directo",
  "Diseño a medida",
  "Enfoque en conversión",
  "Precio cerrado",
] as const;

export const contacto = {
  email: "matiasgardella4@gmail.com",
  emailHref: "mailto:matiasgardella4@gmail.com",
  whatsapp: "+54 9 2346 330076",
  whatsappHref: "https://wa.me/5492346330076",
  instagram: "@matias.gardella",
  instagramHref: "https://instagram.com/matias.gardella",
} as const;
