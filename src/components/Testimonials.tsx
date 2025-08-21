"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Paragraph } from "./Paragraph";
import { Heading } from "./Heading";
import { useLanguage } from "./i18n/LanguageProvider";
import { reviewService } from "@/lib/reviews";
import { Review } from "@/types/review";

// User icon component
const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
);

export function Testimonials() {
  const { currentLanguage } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    reviewService
      .getPublishedReviews()
      .then((r) => setReviews(r))
      .catch(() => setReviews([]));
  }, []);

  const total = reviews.length;

  // Auto-advance carousel every 8 seconds (increased from 5), but pause on hover
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

  const pick = (r?: Review) => {
    if (!r) return { text: "", name: "" };
    const text = r.content || "";
    const name = r.author_name || "Аноним";
    return { text, name };
  };

  const prev = pick(reviews[prevIdx]);
  const current = pick(reviews[active]);
  const next = pick(reviews[nextIdx]);

  // Reset expansion when active review changes
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
    <section className="py-8 md:py-12 bg-ivory-50">
      <div className="rounded-xl border border-poppy-200/40 py-10" style={{ backgroundColor: '#FFF2E5' }}>
        <div 
          className="max-w-5xl mx-auto px-6" 
          onTouchStart={handleTouchStart} 
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <Heading as="h2" className="text-[30px] tracking-widest text-center mb-8">
            {currentLanguage === "et" ? "TAGASISIDE" : "ОТЗЫВЫ"}
          </Heading>

          {/* Три колонки на десктопе; на мобильном показываем только активный */}
          <div className={`grid grid-cols-1 md:grid-cols-7 gap-2 transition-all duration-300 ${
            isExpanded ? 'items-start min-h-[280px]' : 'items-center h-[280px]'
          }`}>
            {/* left */}
            <div className="hidden md:block text-center px-0 opacity-20">
              <div className="mx-auto mb-0.5 h-4 w-4 rounded-full bg-sage-100 flex items-center justify-center">
                <UserIcon className="h-2 w-2 text-sage-600" />
              </div>
              <div className="text-[8px] font-medium text-sage-700 mb-0.5 truncate">{prev.name}</div>
              <Paragraph className="text-[7px] text-sage-700/80 line-clamp-2 leading-tight">{prev.text}</Paragraph>
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
                  <div className="mx-auto mb-1 h-6 w-6 rounded-full bg-sage-200 flex items-center justify-center">
                    <UserIcon className="h-3 w-3 text-sage-700" />
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-sage-800 mb-1">{current.name}</div>
                  <div className="max-w-lg mx-auto">
                    <Paragraph className={`text-sage-800 text-sm sm:text-base leading-relaxed ${
                      isExpanded 
                        ? '' 
                        : 'line-clamp-25 max-h-40 overflow-hidden'
                    }`}>
                      {current.text}
                    </Paragraph>
                    {current.text && current.text.length > 400 && (
                      <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="mt-2 text-xs sm:text-sm text-sage-600 hover:text-sage-800 underline hover:no-underline px-2 py-1 rounded-md hover:bg-sage-50 transition-all duration-200 font-medium"
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
              <div className="mx-auto mb-0.5 h-4 w-4 rounded-full bg-sage-100 flex items-center justify-center">
                <UserIcon className="h-2 w-2 text-sage-600" />
              </div>
              <div className="text-[8px] font-medium text-sage-700 mb-0.5 truncate">{next.name}</div>
              <Paragraph className="text-[7px] text-sage-700/80 line-clamp-2 leading-tight">{next.text}</Paragraph>
            </div>
          </div>

          {/* dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to testimonial ${i + 1}`}
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
        </div>
      </div>
    </section>
  );
}


