"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ValuesService } from "@/lib/values";
import { Value } from "@/types/value";
import { useLanguage } from "./i18n/LanguageProvider";

export function ValuesStrip() {
  const [values, setValues] = useState<Value[]>([]);
  const [active, setActive] = useState<number>(0);
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    ValuesService.getActiveValues()
      .then((list) => setValues(list))
      .catch(() => setValues([]));
  }, []);

  const total = values.length;

  const prevIdx = useMemo(() => (total ? (active - 1 + total) % total : 0), [active, total]);
  const nextIdx = useMemo(() => (total ? (active + 1) % total : 0), [active, total]);

  const t = (v?: Value) => {
    if (!v) return { title: "", desc: "" };
    return {
      title: currentLanguage === "et" ? v.title_et : v.title_ru,
      desc: currentLanguage === "et" ? v.description_et : v.description_ru,
    };
  };

  const prev = t(values[prevIdx]);
  const current = t(values[active]);
  const next = t(values[nextIdx]);

  const [direction, setDirection] = useState<1 | -1>(1);
  const swipeVariants = {
    enter: (dir: 1 | -1) => ({ opacity: 0, x: dir * 24 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: 1 | -1) => ({ opacity: 0, x: -dir * 24 }),
  };

  // touch swipe support (mobile)
  const touchStartXRef = useRef<number | null>(null);
  const swipeThreshold = 30; // px

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
      // swipe left -> next
      setActive((prev) => (total ? (prev + 1) % total : prev));
    } else {
      setDirection(-1);
      // swipe right -> prev
      setActive((prev) => (total ? (prev - 1 + total) % total : prev));
    }
  };

  return (
    <section className="py-8 md:py-12 bg-ivory-50">
      <div className="rounded-xl border border-ivory-300 py-10" style={{ backgroundColor: '#FFF2E5' }}>
        <div className="max-w-6xl mx-auto px-6" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <h2 className="text-center text-sage-900 text-sm tracking-widest mb-6 md:mb-8">
            {currentLanguage === "et" ? "MEIE VÄÄRTUSED" : "НАШИ ЦЕННОСТИ"}
          </h2>

          {/* Три колонки на десктопе; на мобильном показываем только активный */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/* Left (prev) */}
            <div className="hidden md:block text-center px-2 opacity-50">
              <div className="text-[11px] tracking-widest text-sage-700 mb-2 uppercase">
                {prev.title}
              </div>
              <p className="text-sage-700/80 text-xs leading-relaxed line-clamp-3">
                {prev.desc}
              </p>
            </div>

            {/* Center (active) */}
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
                  <div className="text-[11px] tracking-widest text-sage-900 font-medium mb-2 uppercase">
                    {current.title}
                  </div>
                  <p className="text-sage-800 text-sm leading-relaxed max-w-[46ch] mx-auto">
                    {current.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right (next) */}
            <div className="hidden md:block text-center px-2 opacity-50">
              <div className="text-[11px] tracking-widest text-sage-700 mb-2 uppercase">
                {next.title}
              </div>
              <p className="text-sage-700/80 text-xs leading-relaxed line-clamp-3">
                {next.desc}
              </p>
            </div>
          </div>

          {/* Dots */}
          {total > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              {values.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
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
          )}
        </div>
      </div>
    </section>
  );
}


