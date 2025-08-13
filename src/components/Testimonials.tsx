"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Paragraph } from "./Paragraph";
import { Heading } from "./Heading";
import { useLanguage } from "./i18n/LanguageProvider";
import { reviewService } from "@/lib/reviews";
import { Review } from "@/types/review";

export function Testimonials() {
  const { currentLanguage } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    reviewService
      .getPublishedReviews()
      .then((r) => setReviews(r))
      .catch(() => setReviews([]));
  }, []);

  const total = reviews.length;
  const prevIdx = useMemo(() => (total ? (active - 1 + total) % total : 0), [active, total]);
  const nextIdx = useMemo(() => (total ? (active + 1) % total : 0), [active, total]);

  const pick = (r?: Review) => {
    if (!r) return { text: "", name: "" };
    const text =
      currentLanguage === "et"
        ? r.content_et || r.content || ""
        : r.content_ru || r.content || "";
    const name = r.author_name || "";
    return { text, name };
  };

  const prev = pick(reviews[prevIdx]);
  const current = pick(reviews[active]);
  const next = pick(reviews[nextIdx]);

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
        <div className="max-w-5xl mx-auto px-6" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <Heading as="h2" className="text-sm tracking-widest text-center mb-8">
            {currentLanguage === "et" ? "TAGASISIDE" : "ОТЗЫВЫ"}
          </Heading>

          {/* Три колонки на десктопе; на мобильном показываем только активный */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/* left */}
            <div className="hidden md:block text-center px-2 opacity-50">
              <div className="mx-auto mb-3 h-6 w-6 rounded-full border border-sage-400/50" />
              <Paragraph className="text-xs text-sage-700/80 line-clamp-4">{prev.text}</Paragraph>
            </div>

            {/* center */}
            <div className="text-center px-4">
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
                  <div className="mx-auto mb-3 h-7 w-7 rounded-full border border-sage-600" />
                  <Paragraph className="text-sage-800 text-sm leading-relaxed">
                    {current.text}
                  </Paragraph>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* right */}
            <div className="hidden md:block text-center px-2 opacity-50">
              <div className="mx-auto mb-3 h-6 w-6 rounded-full border border-sage-400/50" />
              <Paragraph className="text-xs text-sage-700/80 line-clamp-4">{next.text}</Paragraph>
            </div>
          </div>

          {/* dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to testimonial ${i + 1}`}
                className={
                  "h-1.5 w-1.5 rounded-full transition-colors " +
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


