import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import PageBackground from "@/components/PageBackground";
import SmoothScroll from "@/components/SmoothScroll";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Matias Gardella — Diseño web para negocios de servicios",
  description:
    "Diseño experiencias digitales estratégicas que transforman la atención en acción. Diseño web, UX/UI, desarrollo web y landing pages para negocios de servicios, desde Argentina.",
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className={jetbrainsMono.variable}>
      <body>
        <SmoothScroll />
        <PageBackground />
        {children}
      </body>
    </html>
  );
}
