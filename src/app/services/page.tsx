'use client';

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { serviceService } from "@/lib/services";
import { Service } from "@/types/service";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import Image from "next/image";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<Service | boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const { t, currentLanguage } = useLanguage();

  useEffect(() => {
    loadServices();
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

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
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 z-[100]">
            <div className="fixed inset-y-0 right-0 left-0 lg:left-64 grid place-items-center p-4">
              <motion.button
                key={`button-${active.title}-${id}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                onClick={() => setActive(null)}
              >
                <CloseIcon />
              </motion.button>
              <motion.div
                layoutId={`card-${active.title}-${id}`}
                ref={ref}
                className="w-full max-w-[800px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-ivory-50 dark:bg-ivory-50 sm:rounded-3xl overflow-hidden border border-sage-200"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {active.image_url && (
                  <div>
                    <Image
                      width={800}
                      height={400}
                      src={active.image_url}
                      alt={getLocalizedTitle(active)}
                      className="w-full h-60 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                    />
                  </div>
                )}

                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start p-6">
                    <div className="flex-1">
                      <motion.h3
                        layoutId={`title-${active.title}-${id}`}
                        className="font-bold text-neutral-700 dark:text-neutral-900 text-xl mb-2"
                      >
                        {getLocalizedTitle(active)}
                      </motion.h3>
                      <div className="flex items-center space-x-4 mb-4">
                        <motion.div
                          layoutId={`price-${active.id}-${id}`}
                          className="text-2xl font-bold text-gray-900"
                        >
                          {formatPrice(active.price, active.currency)}
                        </motion.div>
                        {active.duration && (
                          <div className="text-gray-500">
                            {formatDuration(active.duration)}
                          </div>
                        )}
                      </div>
                    </div>

                    <motion.button
                      layoutId={`button-${active.title}-${id}`}
                      onClick={() => setActive(null)}
                      className="px-6 py-3 text-sm rounded-full font-bold bg-gray-200 text-gray-900 hover:bg-gray-300 transition-colors ml-4"
                    >
                      {currentLanguage === 'et' ? 'Sulge' : 'Закрыть'}
                    </motion.button>
                  </div>
                  <div className="flex-1 px-6 pb-6">
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-neutral-600 text-sm md:text-base lg:text-base h-60 md:h-80 overflow-y-auto pr-2 dark:text-neutral-400 [scrollbar-width:thin] [scrollbar-color:#cbd5e1_transparent] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
                    >
                      <div dangerouslySetInnerHTML={{ __html: getLocalizedDescription(active) }} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        ) : null}
      </AnimatePresence>

    <Container>
        <div className="py-0">
          <Heading as="h1" className="font-black mb-8">
            {t('services')}
          </Heading>
          
          {services.length === 0 ? (
            <div className="text-center text-gray-600">
              {currentLanguage === 'et' ? 'Teenuseid ei leitud' : 'Услуги не найдены'}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {services.map((service) => (
                <motion.div
                  layoutId={`card-${service.title}-${id}`}
                  key={`card-${service.title}-${id}`}
                  onClick={() => setActive(service)}
                  className="glass-effect rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 flex flex-col"
                >
                  {service.image_url && (
                    <div className="aspect-video overflow-hidden">
                      <Image
                        width={400}
                        height={250}
                        src={service.image_url}
                        alt={getLocalizedTitle(service)}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                  )}
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <motion.h3
                      layoutId={`title-${service.title}-${id}`}
                      className="font-semibold text-sage-900 dark:text-sage-900 text-lg mb-3 line-clamp-2"
                    >
                      {getLocalizedTitle(service)}
                    </motion.h3>
                    
                    <div className="flex-1"></div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <motion.div
                        layoutId={`price-${service.id}-${id}`}
                        className="text-xl font-bold text-poppy-600"
                      >
                        {formatPrice(service.price, service.currency)}
                      </motion.div>
                      
                      {service.duration && (
                        <div className="text-sage-600 text-sm">
                          {formatDuration(service.duration)}
                        </div>
                      )}
                    </div>
                    
                    <motion.button
                      layoutId={`button-${service.title}-${id}`}
                      className="mt-4 w-full py-2 text-sm rounded-lg font-medium bg-sage-100 hover:bg-poppy-100 hover:text-poppy-800 text-sage-700 transition-all duration-200"
                    >
                      {currentLanguage === 'et' ? 'Vaata teenust' : 'Подробнее'}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
    </Container>
    </>
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