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
    <Container className="pt-10 md:pt-24 pb-24">
      <Hero />

      <div className="my-12" />
      
      <ValuesStrip />
      
      <div className="my-10" />
      
      <QualificationBanner />

      <div className="my-16" />

      <Testimonials />
    </Container>
  );
}
