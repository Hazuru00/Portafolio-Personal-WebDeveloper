import type { Metadata } from "next";
import { Georama, Kode_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

const georama = Georama({ subsets: ["latin"], variable: "--font-georama" });
const kodeMono = Kode_Mono({ subsets: ["latin"], variable: "--font-kode-mono" });

// Datos estructurados para buscadores (SEO)
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "HazuDev",
  jobTitle: "Desarrollador Fullstack Semi Senior",
  url: "https://hazuru.vercel.app",
  image: "https://avatars.githubusercontent.com/u/92418515?v=4",
  sameAs: [
    "https://github.com/hazuru00",
    "https://www.linkedin.com/in/miguel-angel-vallejo-604928225/",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://hazuru.vercel.app"),
  title: "HazuDev — Desarrollador Fullstack Semi Senior",
  description:
    "Hola, soy HazuDev, desarrollador fullstack semi senior. En mi portafolio encuentras mis proyectos, tecnologías y forma de trabajo.",
  openGraph: {
    type: "website",
    url: "https://hazuru.vercel.app/",
    title: "HazuDev — Desarrollador Fullstack Semi Senior",
    description:
      "Hola, soy HazuDev, desarrollador fullstack semi senior. En mi portafolio encuentras mis proyectos, tecnologías y forma de trabajo.",
    images: ["/metaBanner.gif"],
  },
  twitter: {
    card: "summary_large_image",
    title: "HazuDev — Desarrollador Fullstack Semi Senior",
    description:
      "Hola, soy HazuDev, desarrollador fullstack semi senior. En mi portafolio encuentras mis proyectos, tecnologías y forma de trabajo.",
    images: ["/metaBanner.gif"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
         <meta name="google-site-verification" content="m1X4P8Hto3WYo5URabZWyO_cE47k-wNKNbcY4s2H0Sc" />
      </head>
      <body className={`${kodeMono.className} ${georama.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <MotionProvider>
          {children}
        </MotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
