import type { Metadata, Viewport } from "next";
import { Caveat, Figtree, Young_Serif } from "next/font/google";
import { meta } from "@/content/historia";
import "./globals.css";

const youngSerif = Young_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--fuente-young-serif",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--fuente-caveat",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--fuente-figtree",
  display: "swap",
});

// Cámbialo por tu dominio de Vercel cuando la despliegues (o define
// NEXT_PUBLIC_SITE_URL) para que la vista previa de WhatsApp salga bien.
const sitio = process.env.NEXT_PUBLIC_SITE_URL ?? "https://para-raquel.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(sitio),
  title: meta.titulo,
  description: meta.descripcion,
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "es_ES",
    title: meta.titulo,
    description: meta.descripcion,
    images: [{ url: meta.imagenAlCompartir, width: 1100, height: 1467, alt: meta.titulo }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F4E4E1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${youngSerif.variable} ${caveat.variable} ${figtree.variable}`}>
      <body>{children}</body>
    </html>
  );
}
