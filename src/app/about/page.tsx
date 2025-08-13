import { Container } from "@/components/Container";
import { Metadata } from "next";
import Image from "next/image";

import { motion } from "framer-motion";
import About from "@/components/About";

export const metadata: Metadata = {
  title: "Minust | Alla Hüvenen - Kogenud Podoloog Tartus",
  description: "Tutvuge Alla Hüveneniga - kogenud podoloogiga Tartus üle 15 aasta kogemusega. Probleemne pediküür, sissekasvanud küüned, jalgade tervise spetsialist. О подологе Alla Hüvenen в Тарту.",
  keywords: [
    "Alla Hüvenen podoloog",
    "podoloog Tartu kogemus",
    "jalgade tervise spetsialist",
    "probleemne pediküür Tartu",
    "подолог Тарту опыт",
    "специалист здоровья стоп"
  ],
  openGraph: {
    title: "Minust | Alla Hüvenen - Kogenud Podoloog Tartus",
    description: "Tutvuge Alla Hüveneniga - kogenud podoloogiga Tartus üle 15 aasta kogemusega.",
    type: "website",
    url: "https://podoloog.ee/about",
  },
  alternates: {
    canonical: "https://podoloog.ee/about",
  },
};

export default function AboutPage() {
  return (
    <Container className="pt-6 md:pt-8 pb-20">
      <About />
    </Container>
  );
}
