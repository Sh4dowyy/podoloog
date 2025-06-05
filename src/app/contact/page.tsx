import { Contact } from "@/components/Contact";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/Products";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Kontakt | Alla Hüvenen - Podoloog Tartus | Tel: 5895 5153",
  description: "Võtke ühendust podoloog Alla Hüveneniga Tartus. Telefon: +372 5895 5153. Anne 44, Tartu. Broneeri aeg probleemse pediküüri ja jalgade ravi jaoks. Связаться с подологом в Тарту.",
  keywords: [
    "podoloog kontakt Tartu",
    "Alla Hüvenen telefon",
    "podoloog broneerimine",
    "Anne 44 Tartu",
    "jalgade ravi kontakt",
    "5895 5153",
    "подолог контакты Тарту",
    "записаться к подологу"
  ],
  openGraph: {
    title: "Kontakt | Alla Hüvenen - Podoloog Tartus",
    description: "Võtke ühendust podoloog Alla Hüveneniga Tartus. Telefon: +372 5895 5153. Anne 44, Tartu.",
    type: "website",
    url: "https://podoloog.ee/contact",
  },
  alternates: {
    canonical: "https://podoloog.ee/contact",
  },
};

export default function Projects() {
  return (
    <Container>
      <span className="text-4xl">✉️</span>
      <Heading className="font-black mb-2">Contact Me</Heading>
      <Paragraph className="mb-10 max-w-xl">
        Reach out to me over email or fill up this contact form. I will get back
        to you ASAP - I promise.{" "}
      </Paragraph>
      <Contact />
    </Container>
  );
}
