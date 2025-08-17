"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
// Custom arrow icons
const ChevronLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);
import { Credential } from "@/types/credential";
import { useLanguage } from "./i18n/LanguageProvider";

interface CredentialsCarouselProps {
  credentials: Credential[];
  onCredentialClick: (credential: Credential) => void;
}

export function CredentialsCarousel({ credentials, onCredentialClick }: CredentialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { currentLanguage } = useLanguage();

  const totalItems = credentials.length;

  // Auto-advance carousel every 4 seconds
  useEffect(() => {
    if (totalItems <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }, 4000);

    return () => clearInterval(interval);
  }, [totalItems]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const getVisibleItems = () => {
    if (totalItems === 0) return [];
    
    const items = [];
    // Show previous, current, and next items
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + totalItems) % totalItems;
      items.push({
        credential: credentials[index],
        position: i, // -1 = left, 0 = center, 1 = right
        index
      });
    }
    return items;
  };

  if (credentials.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      {/* Carousel Header */}
      <div className="flex items-center justify-center mb-8">
        <h2 className="text-base md:text-lg tracking-widest text-sage-900 uppercase">
          {currentLanguage === 'et' ? 'Diplomid' : 'Дипломы'}
        </h2>
      </div>

      {/* Carousel Content */}
      <div className="relative flex items-center justify-center min-h-[400px]">
        {/* Navigation Arrows - Show on mobile only */}
        {totalItems > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 z-20 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-200 md:hidden"
              aria-label="Previous credential"
            >
              <ChevronLeftIcon className="w-5 h-5 text-sage-700" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 z-20 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-200 md:hidden"
              aria-label="Next credential"
            >
              <ChevronRightIcon className="w-5 h-5 text-sage-700" />
            </button>
          </>
        )}
        
        <div className="flex items-center justify-center gap-4 w-full max-w-4xl">
          {getVisibleItems().map((item) => {
            const isCenter = item.position === 0;
            const isLeft = item.position === -1;
            const isRight = item.position === 1;
            
            return (
              <motion.div
                key={item.index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: isCenter ? 1 : 0.6,
                  scale: isCenter ? 1 : 0.75,
                  zIndex: isCenter ? 10 : 5
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                onClick={() => onCredentialClick(item.credential)}
                className={`cursor-pointer group relative ${
                  isCenter ? 'w-72 h-54 md:w-80 md:h-60' : 'w-64 h-48 hidden md:block'
                }`}
              >
                <div className={`relative w-full h-full overflow-hidden rounded-lg bg-ivory-100 shadow-lg group-hover:shadow-xl transition-all duration-300 ${
                  isCenter ? 'shadow-2xl' : ''
                }`}>
                  <Image
                    src={item.credential.image_url || "/images/sidefolio-aceternity.png"}
                    fill
                    alt={item.credential.title_ru || item.credential.title_et || "certificate"}
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Overlay with title - only on center item */}
                  {isCenter && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-medium text-sm line-clamp-2">
                          {currentLanguage === 'et' 
                            ? item.credential.title_et || item.credential.title_ru 
                            : item.credential.title_ru || item.credential.title_et}
                        </h3>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Dots indicator */}
      {totalItems > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalItems }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={
                "h-1.5 w-1.5 rounded-full transition-colors " +
                (index === currentIndex ? "bg-sage-700" : "bg-sage-400/50 hover:bg-sage-500")
              }
              aria-label={`Go to certificate ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
