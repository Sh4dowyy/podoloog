"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BrandProduct } from "@/types/brand-product";
import { useLanguage } from "./i18n/LanguageProvider";

interface ProductsCarouselProps {
  products: BrandProduct[];
  brand: {
    name: string;
    name_et?: string;
    name_ru?: string;
    description: string;
    description_et?: string;
    description_ru?: string;
  } | null;
}

export function ProductsCarousel({ products, brand }: ProductsCarouselProps) {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { currentLanguage } = useLanguage();

  const total = products.length;

  // Auto-advance carousel every 8 seconds, but pause on hover
  useEffect(() => {
    if (total <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
      setDirection(1);
    }, 8000);

    return () => clearInterval(interval);
  }, [total, isPaused]);

  const prevIdx = useMemo(() => (total ? (active - 1 + total) % total : 0), [active, total]);
  const nextIdx = useMemo(() => (total ? (active + 1) % total : 0), [active, total]);

  const getLocalizedProductName = (product: BrandProduct) => {
    if (currentLanguage === 'et' && product.name_et) return product.name_et;
    if (currentLanguage === 'ru' && product.name_ru) return product.name_ru;
    return product.name;
  };

  const getLocalizedProductDescription = (product: BrandProduct) => {
    if (currentLanguage === 'et' && product.description_et) return product.description_et;
    if (currentLanguage === 'ru' && product.description_ru) return product.description_ru;
    return product.description;
  };

  const getLocalizedBrandName = () => {
    if (!brand) return "BIOFEET";
    if (currentLanguage === 'et' && brand.name_et) return brand.name_et;
    if (currentLanguage === 'ru' && brand.name_ru) return brand.name_ru;
    return brand.name;
  };

  const getLocalizedBrandDescription = () => {
    let description = '';
    if (!brand) {
      description = "BioFeet® tootevahik on spetsiaalselt välja töötatud podoloogidele ja teie jalgade jaoks.";
    } else {
      if (currentLanguage === 'et' && brand.description_et) {
        description = brand.description_et;
      } else if (currentLanguage === 'ru' && brand.description_ru) {
        description = brand.description_ru;
      } else {
        description = brand.description || '';
      }
    }
    
    return description;
  };

  const pick = (p?: BrandProduct) => {
    if (!p) return { name: "", description: "", image: "" };
    return {
      name: getLocalizedProductName(p),
      description: getLocalizedProductDescription(p),
      image: p.image_url || ""
    };
  };

  const prev = pick(products[prevIdx]);
  const current = pick(products[active]);
  const next = pick(products[nextIdx]);

  // Reset expansion when active product changes
  useEffect(() => {
    setIsExpanded(false);
  }, [active]);

  // touch swipe support
  const touchStartXRef = useRef<number | null>(null);
  const swipeThreshold = 30;
  const [direction, setDirection] = useState<1 | -1>(1);
  const swipeVariants = {
    enter: (dir: 1 | -1) => ({ opacity: 0, x: dir * 24 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: 1 | -1) => ({ opacity: 0, x: -dir * 24 }),
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (total < 2) return;
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (total < 2) return;
    const startX = touchStartXRef.current;
    touchStartXRef.current = null;
    if (startX == null) return;
    const endX = e.changedTouches[0]?.clientX ?? startX;
    const deltaX = endX - startX;
    if (Math.abs(deltaX) < swipeThreshold) return;
    if (deltaX < 0) {
      setDirection(1);
      setActive((p) => (total ? (p + 1) % total : p));
    } else {
      setDirection(-1);
      setActive((p) => (total ? (p - 1 + total) % total : p));
    }
  };

  if (total === 0) return null;

  return (
          <section className="py-8 md:py-12">
        {/* Top section with text and image */}
        <div className="max-w-6xl mx-auto px-6 mb-12 mt-8 md:mt-0">
        <h2 className="text-[18px] md:text-[30px] tracking-widest text-center mb-8 text-sage-900 uppercase">
          {getLocalizedBrandName()}
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8">
          {/* Left: Text content */}
          <div className="space-y-6">
            <p className="text-xs md:text-sm text-sage-700 leading-relaxed text-center md:text-left">
              {getLocalizedBrandDescription()}
            </p>
          </div>
          
          {/* Right: Image */}
          <div className="relative h-32 lg:h-80 rounded-lg overflow-hidden">
            <Image
              src="/images/feet-care.jpg"
              alt="Feet care"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Bottom section with products carousel */}
      <div className="py-10" style={{ backgroundColor: '#FFF2E5' }}>
        <div 
          className="max-w-5xl mx-auto px-6" 
          onTouchStart={handleTouchStart} 
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <h2 className="text-[16px] md:text-[30px] tracking-widest text-center -mb-4 text-sage-900 uppercase">
            {currentLanguage === "et" ? "KASUTUSEL OLEVAD TOOTED" : "ИСПОЛЬЗУЕМЫЕ ПРОДУКТЫ"}
          </h2>

          {/* Карусель продуктов */}
          <div className={`grid grid-cols-1 md:grid-cols-7 gap-2 transition-all duration-300 ${
            isExpanded ? 'items-start min-h-[280px]' : 'items-center h-[280px]'
          }`}>
            {/* left */}
            <div className="hidden md:block text-center px-0 opacity-20">
              <div className="mx-auto mb-1 h-20 w-20">
                {prev.image && (
                  <Image
                    src={prev.image}
                    alt={prev.name}
                    width={80}
                    height={80}
                    className="h-20 w-20 object-contain"
                  />
                )}
              </div>
              <div className="text-[10px] md:text-[10px] font-medium text-sage-700 mb-1 truncate" style={{ fontSize: '14px' }}>{prev.name}</div>
              <p className="text-[9px] text-sage-700/80 line-clamp-2 leading-tight">{prev.description}</p>
            </div>

            {/* center */}
            <div className={`text-center px-4 md:col-span-5 ${isExpanded ? 'self-start' : 'self-center'}`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  custom={direction}
                  variants={swipeVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <div className="mx-auto mb-3 h-40 w-40">
                    {current.image && (
                      <Image
                        src={current.image}
                        alt={current.name}
                        width={160}
                        height={160}
                        className="h-40 w-40 object-contain"
                      />
                    )}
                  </div>
                  <div className="text-sm md:text-sm font-semibold text-sage-800 mb-2" style={{ fontSize: '14px' }}>{current.name}</div>
                  <div className="max-w-lg mx-auto">
                    <p className={`text-sage-800 text-xs leading-relaxed ${
                      isExpanded 
                        ? '' 
                        : 'line-clamp-6 max-h-24 overflow-hidden'
                    }`}>
                      {current.description}
                    </p>
                    {current.description && current.description.length > 400 && (
                      <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="mt-2 text-[10px] text-sage-600 hover:text-sage-800 underline hover:no-underline px-2 py-1 rounded-md hover:bg-sage-50 transition-all duration-200 font-medium"
                      >
                        {isExpanded 
                          ? (currentLanguage === "et" ? "Näita vähem" : "Скрыть")
                          : (currentLanguage === "et" ? "Loe edasi" : "Читать больше")
                        }
                      </button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* right */}
            <div className="hidden md:block text-center px-0 opacity-20">
              <div className="mx-auto mb-1 h-20 w-20">
                {next.image && (
                  <Image
                    src={next.image}
                    alt={next.name}
                    width={80}
                    height={80}
                    className="h-20 w-20 object-contain"
                  />
                )}
              </div>
              <div className="text-[10px] md:text-[10px] font-medium text-sage-700 mb-1 truncate" style={{ fontSize: '14px' }}>{next.name}</div>
              <p className="text-[9px] text-sage-700/80 line-clamp-2 leading-tight">{next.description}</p>
            </div>
          </div>

          {/* dots */}
          {total > 1 && (
            <div className="mt-14 flex items-center justify-center gap-2">
              {products.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to product ${i + 1}`}
                  className={
                    "h-3 w-3 md:h-1.5 md:w-1.5 rounded-full transition-colors " +
                    (i === active ? "bg-sage-700" : "bg-sage-400/50 hover:bg-sage-500")
                  }
                  onClick={() => {
                    if (i === active) return;
                    setDirection(i > active ? 1 : -1);
                    setActive(i);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
