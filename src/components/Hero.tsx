"use client";

import Image from "next/image";
import Link from "next/link";
import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";
import { useLanguage } from "./i18n/LanguageProvider";

export function Hero() {
  const { currentLanguage } = useLanguage();

  return (
    <section className="w-full mt-6 md:mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left: copy + CTAs */}
        <div className="space-y-6">
          <Heading as="h1" className="text-3xl md:text-4xl lg:text-5xl font-bold text-sage-900">
            {currentLanguage === "et"
              ? "Teie jalgade heaolu – meie kätes. Samm sammult tervete jalataldadeni"
              : "Ваше здоровье стоп – в наших руках. Шаг за шагом к здоровым стопам"}
          </Heading>
          <Paragraph className="text-sage-700">
            {currentLanguage === "et"
              ? "Kaasaegsed meetodid ja professionaalsed vahendid teie jalgade tervise tagamiseks."
              : "Современные методы и профессиональные инструменты для здоровья ваших ног."}
          </Paragraph>

          {/* Quick services row (plain text, not links) */}
          <div className="flex flex-wrap gap-6 text-[11px] tracking-wide uppercase text-sage-700">
            <span>{currentLanguage === 'et' ? 'Pediküür' : 'Педикюр'}</span>
            <span>{currentLanguage === 'et' ? 'Sissekasvanud küünte ravi' : 'Лечение вросшего ногтя'}</span>
            <span>{currentLanguage === 'et' ? 'Küünte seenhaiguse ravi' : 'Лечение грибка ногтей'}</span>
          </div>

          {/* Booking button */}
          <div className="pt-4">
            <a 
              href="tel:+37258955153" 
              className="inline-block px-8 py-4 rounded-lg text-sage-900 font-semibold text-base hover:shadow-lg transform hover:scale-105 transition-all duration-200" 
              style={{ backgroundColor: '#CFECD6' }}
            >
              {currentLanguage === 'et' ? 'Broneeri aeg' : 'Забронировать'}
            </a>
          </div>
        </div>

        {/* Right: image */}
        <div className="relative h-56 sm:h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow-sm">
          <Image
            src="/images/"
            alt={currentLanguage === "et" ? "Kliiniku foto" : "Фото клиники"}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}


