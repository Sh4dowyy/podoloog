import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teenused | Alla Hüvenen - Podoloog Tartus",
  description: "Podoloogia teenused Tartus: probleemne pediküür, sissekasvanud küünte ravi, küünte seenhaiguse ravi, villidide eemaldamine. Профессиональные услуги подолога в Тарту.",
  keywords: [
    "podoloogia teenused Tartu",
    "probleemne pediküür",
    "sissekasvanud küünte ravi",
    "küünte seenhaigus",
    "villidide ravi",
    "kanna lõhed",
    "услуги подолога Тарту",
    "проблемный педикюр",
    "лечение вросших ногтей"
  ],
  openGraph: {
    title: "Teenused | Alla Hüvenen - Podoloog Tartus",
    description: "Podoloogia teenused Tartus: probleemne pediküür, sissekasvanud küünte ravi, küünte seenhaiguse ravi.",
    type: "website",
    url: "https://podoloog.ee/services",
  },
  alternates: {
    canonical: "https://podoloog.ee/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 