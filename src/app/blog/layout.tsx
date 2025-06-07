import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uudised | Alla Hüvenen - Podoloog Tartus | Jalgade tervise nõuanded",
  description: "Lugege uusimaid uudiseid ja nõuandeid jalgade tervise kohta podoloog Alla Hüveneni poolt. Professionaalsed soovitused ja kasulikud artiklid. Новости и советы по здоровью стоп от подолога в Тарту.",
  keywords: [
    "podoloogia uudised Tartu",
    "jalgade tervise nõuanded",
    "Alla Hüvenen artiklid",
    "podoloogia blogi",
    "jalgade hooldus soovitused",
    "новости подологии Тарту",
    "советы по уходу за ногами"
  ],
  openGraph: {
    title: "Uudised | Alla Hüvenen - Podoloog Tartus",
    description: "Lugege uusimaid uudiseid ja nõuandeid jalgade tervise kohta podoloog Alla Hüveneni poolt.",
    type: "website",
    url: "https://podoloog.ee/blog",
  },
  alternates: {
    canonical: "https://podoloog.ee/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 