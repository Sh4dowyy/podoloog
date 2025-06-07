import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt | Alla Hüvenen Podoloog",
  description: "Võtke ühendust OÜ Girsi podoloog Alla Hüveneniga Tartus. Telefon: +372 5895 5153. Anne 44, Tartu. Reg nr: 11350594. Broneeri aeg probleemse pediküüri ja jalgade ravi jaoks. Связаться с подологом в Тарту.",
  keywords: [
    "OÜ Girsi",
    "podoloog kontakt Tartu",
    "Alla Hüvenen telefon",
    "podoloog broneerimine",
    "Anne 44 Tartu",
    "jalgade ravi kontakt",
    "5895 5153",
    "reg nr 11350594",
    "подолог контакты Тарту",
    "записаться к подологу"
  ],
  openGraph: {
    title: "Kontakt | OÜ Girsi - Alla Hüvenen Podoloog",
    description: "Võtke ühendust OÜ Girsi podoloog Alla Hüveneniga Tartus. Telefon: +372 5895 5153. Anne 44, Tartu. Reg nr: 11350594.",
    type: "website",
    url: "https://podoloog.ee/contact",
  },
  alternates: {
    canonical: "https://podoloog.ee/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 