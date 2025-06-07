import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galerii | Alla Hüvenen - Podoloog Tartus | Professionaalne töökeskkond",
  description: "Tutvu meie professionaalse podoloogia kabineti ja teenustega läbi fotogalerii. Kvaliteetsed tööriistad, puhas keskkond ja turvalisus. Галерея подологического кабинета в Тарту.",
  keywords: [
    "podoloogia galerii Tartu",
    "Alla Hüvenen cabinet",
    "professionaalne töökeskkond",
    "podoloogia instrumendid",
    "podoloogia fotod",
    "галерея подологии Тарту",
    "кабинет подолога фото"
  ],
  openGraph: {
    title: "Galerii | Alla Hüvenen - Podoloog Tartus",
    description: "Tutvu meie professionaalse podoloogia kabineti ja teenustega läbi fotogalerii.",
    type: "website",
    url: "https://podoloog.ee/gallery",
  },
  alternates: {
    canonical: "https://podoloog.ee/gallery",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 