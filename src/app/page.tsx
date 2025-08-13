'use client';

import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { ValuesSection } from "@/components/ValuesSection";
import { Hero } from "@/components/Hero";
import { QualificationBanner } from "@/components/QualificationBanner";
import { Testimonials } from "@/components/Testimonials";
import { ValuesStrip } from "@/components/ValuesStrip";

export default function Home() {
  const { currentLanguage } = useLanguage();

  return (
    <Container className="pt-4 md:pt-6 pb-20">
      <Hero />

      <ValuesStrip />
      <QualificationBanner />

      <div className="my-8" />

      <Testimonials />
    </Container>
  );
}
