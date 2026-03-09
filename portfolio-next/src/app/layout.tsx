import type { Metadata } from "next";
import { Georama, Kode_Mono } from "next/font/google";
import "./globals.css";
import "../index.css";

const georama = Georama({ subsets: ["latin"] });
const kodeMono = Kode_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portafolio - Programador Jr",
  description: "Hola soy HazuDev este es mi portafolio y presentación personal como profesional contiene los lenguajes que manejo proyectos y Mas!",
  openGraph: {
    type: "website",
    url: "https://hazuru.vercel.app/",
    title: "Portafolio - Programador Jr",
    description: "Hola soy HazuDev este es mi portafolio y presentación personal como profesional contiene los lenguajes que manejo proyectos y Mas!",
    images: ["/metaBanner.gif"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portafolio - Programador Jr",
    description: "Hola soy HazuDev este es mi portafolio y presentación personal como profesional contiene los lenguajes que manejo proyectos y Mas!",
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
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
         <meta name="google-site-verification" content="m1X4P8Hto3WYo5URabZWyO_cE47k-wNKNbcY4s2H0Sc" />
      </head>
      <body className={`${georama.className} ${kodeMono.className}`}>{children}</body>
    </html>
  );
}
