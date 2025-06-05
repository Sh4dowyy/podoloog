import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produktid | Alla Hüvenen - Podoloog Tartus | Kasutatav Produktsioon",
  description: "Kvaliteetsed podoloogia tooted ja bränded: GEHWOL, Allpresan, SANAMED, HFL laboratories, BioFeet. Sertifitseeritud ja ohutu produktsioon jalgade raviks Tartus. Качественная продукция для подолога в Тарту.",
  keywords: [
    "podoloogia tooted",
    "GEHWOL Tartu",
    "Allpresan",
    "SANAMED",
    "HFL laboratories",
    "BioFeet",
    "jalgade hooldus tooted",
    "meditsiinitehnika",
    "подологические продукты",
    "продукция для ног"
  ],
  openGraph: {
    title: "Produktid | Alla Hüvenen - Podoloog Tartus",
    description: "Kvaliteetsed podoloogia tooted ja bränded: GEHWOL, Allpresan, SANAMED. Sertifitseeritud produktsioon jalgade raviks.",
    type: "website",
    url: "https://podoloog.ee/products",
  },
  alternates: {
    canonical: "https://podoloog.ee/products",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 