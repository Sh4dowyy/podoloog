"use client";

import Image from "next/image";
import Link from "next/link";
import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";
import { useLanguage } from "./i18n/LanguageProvider";
import { useState, useRef } from "react";

export function Hero() {
  const { currentLanguage } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartXRef = useRef<number | null>(null);
  
  const services = currentLanguage === 'et' 
    ? ['Pediküür', 'Sissekasvanud küünte ravi', 'Küünte seenhaiguse ravi']
    : ['Педикюр', 'Лечение вросшего ногтя', 'Лечение грибка ногтей'];

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const startX = touchStartXRef.current;
    touchStartXRef.current = null;
    if (startX == null) return;
    
    const endX = e.changedTouches[0]?.clientX ?? startX;
    const deltaX = endX - startX;
    const swipeThreshold = 50;
    
    if (Math.abs(deltaX) < swipeThreshold) return;
    
    if (deltaX > 0) {
      // Swipe right - previous
      setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
    } else {
      // Swipe left - next
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }
  };

  return (
    <section className="w-full mt-6 md:mt-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
        {/* Left: copy + CTAs with padding */}
        <div className="md:col-span-2 space-y-6 text-center md:text-left md:pl-16">
          <h1 className="text-xl font-semibold leading-none text-center md:text-left md:text-5xl lg:text-6xl md:font-bold text-sage-900" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: '20px' }}>
            {currentLanguage === "et"
              ? "Teie jalgade heaolu – meie kätes. Samm sammult tervete jalataldadeni"
              : "Ваше здоровье стоп – в наших руках. Шаг за шагом к здоровым стопам"}
          </h1>
                      <p className="text-sm font-normal leading-none text-center md:text-left text-sage-700" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '14px' }}>
              {currentLanguage === "et"
                ? "Kaasaegsed meetodid ja professionaalsed vahendid teie jalgade tervise tagamiseks."
                : "Современные методы и профессиональные инструменты для здоровья ваших ног."}
            </p>

          {/* Quick services row (plain text, not links) */}
          <div className="md:flex md:flex-wrap md:gap-6 md:text-[11px] md:tracking-wide md:uppercase md:text-sage-700 md:justify-start hidden">
            {services.map((service, index) => (
              <span key={index}>{service}</span>
            ))}
          </div>
          
          {/* Mobile swipeable services */}
          <div className="md:hidden -mx-6">
            <div 
              className="overflow-x-auto scrollbar-hide touch-pan-x"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="flex gap-6 px-6 py-2 w-max">
                {services.map((service, index) => (
                  <span 
                    key={index}
                    className="text-[11px] tracking-wide uppercase text-sage-700 whitespace-nowrap"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
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

      </div>
    </section>
  );
}


