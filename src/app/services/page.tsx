'use client';

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { serviceService } from "@/lib/services";
import { Service } from "@/types/service";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import Image from "next/image";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { t, currentLanguage } = useLanguage();

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await serviceService.getPublishedServices();
      setServices(data);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLocalizedTitle = (service: Service) => {
    if (currentLanguage === 'et' && service.title_et) return service.title_et;
    if (currentLanguage === 'ru' && service.title_ru) return service.title_ru;
    return service.title;
  };

  const getLocalizedDescription = (service: Service) => {
    if (currentLanguage === 'et' && service.description_et) return service.description_et;
    if (currentLanguage === 'ru' && service.description_ru) return service.description_ru;
    return service.description;
  };

  const formatPrice = (price: number, currency: string) => {
    return `${price}${currency === 'EUR' ? '€' : currency}`;
  };

  const formatDuration = (duration?: number) => {
    if (!duration) return '';
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    
    if (hours > 0 && minutes > 0) {
      return `${hours}${currentLanguage === 'et' ? 'h' : 'ч'} ${minutes}${currentLanguage === 'et' ? 'min' : 'мин'}`;
    } else if (hours > 0) {
      return `${hours}${currentLanguage === 'et' ? 'h' : 'ч'}`;
    } else {
      return `${minutes}${currentLanguage === 'et' ? 'min' : 'мин'}`;
    }
  };

  if (loading) {
    return (
      <Container>
        <div className="py-10">
          <Heading as="h1" className="">
            {t('loading')}
          </Heading>
        </div>
      </Container>
    );
  }

  return (
    <Container className="pt-6 md:pt-8 pb-20">
      <div className="py-0 max-w-4xl mx-auto">
        <Heading as="h1" className="text-center font-black mb-2 text-sm md:text-base lg:text-lg tracking-widest uppercase">
          {currentLanguage === 'et' ? 'PAKUTAVAD TEENUSED, HINNAKIRI' : 'УСЛУГИ И ЦЕНЫ'}
        </Heading>

        <div className="space-y-3">
          {services.map((s) => {
            const open = expandedId === s.id;
            return (
              <div key={s.id}>
                <button
                  onClick={() => setExpandedId(open ? null : s.id)}
                  className={`relative w-full rounded-xl border py-2 text-center overflow-hidden cursor-pointer transition-colors shadow-sm ${open ? 'border-sage-700' : 'border-sage-400'} hover:border-sage-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-600`}
                >
                  {open && (
                    <>
                      <div
                        className="absolute inset-0 bg-cover bg-center opacity-30"
                        style={{ backgroundImage: "url(/images/poppy-field.jpg)" }}
                      />
                      <div className="absolute inset-0 bg-white/70" />
                    </>
                  )}
                  <div className="relative z-10">
                    <div className="text-[12px] md:text-[13px] tracking-widest uppercase text-sage-900">{getLocalizedTitle(s)}</div>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-3">
                      <ChevronDown className={`h-4 w-4 text-sage-900 transition-transform ${open ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="relative z-10 mt-2 text-[12px] md:text-[13px] text-sage-700 overflow-hidden"
                    >
                      <div className="py-1">{getLocalizedDescription(s)}</div>
                      <div className="text-xs font-semibold text-sage-900">{formatPrice(s.price, s.currency)}</div>
                    </motion.div>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <div className="text-center text-[12px] text-sage-700 mt-8">
          {currentLanguage === 'et'
            ? 'Leidsite endale sobiva protseduuri või pole kindel, mida täpsemalt vajate? Võtke meiega ühendust ja leiame sobiva viisi ja aja teie mure lahendamiseks!'
            : 'Не нашли нужную услугу или не уверены? Свяжитесь с нами — подберем процедуру и время!'}
        </div>

        <div className="flex justify-center mt-4">
          <a 
            href="tel:+37258955153" 
            className="px-6 py-3 rounded-lg text-sage-900 hover:shadow-md transition-shadow duration-200 inline-block text-center" 
            style={{ backgroundColor: '#CFECD6' }}
          >
            {currentLanguage === 'et' ? 'Helista meile' : 'Позвонить нам'}
          </a>
        </div>
      </div>
    </Container>
  );
}

const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
}; 

const ChevronDown = ({ className = '' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);