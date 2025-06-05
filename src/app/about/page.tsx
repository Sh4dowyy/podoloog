import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/Products";
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
  const images = [
    "https://images.unsplash.com/photo-1692544350322-ac70cfd63614?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1692374227159-2d3592f274c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1692005561659-cdba32d1e4a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1692445381633-7999ebc03730?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzM3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  ];
  return (
    <Container>
      <span className="text-4xl">💬</span>
      <Heading className="font-black">About Me</Heading>
      <About />
    </Container>
  );
}
