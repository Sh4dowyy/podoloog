"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "./i18n/LanguageProvider";
import { twMerge } from "tailwind-merge";

export function Header() {
  const pathname = usePathname();
  const { currentLanguage, setLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const nav = [
    { href: "/", et: "AVALEHT", ru: "ГЛАВНАЯ" },
    { href: "/about", et: "MEIST", ru: "О НАС" },
    { href: "/services", et: "TEENUSED", ru: "УСЛУГИ" },
    { href: "/products", et: "TOOTED", ru: "ПРОДУКТЫ" },
    { href: "/contact", et: "KONTAKT", ru: "КОНТАКТ" },
  ];

  const LangBtn = ({ code, label }: { code: "et" | "ru"; label: string }) => (
    <button
      onClick={() => setLanguage(code)}
      className={twMerge(
        "text-xs tracking-wide",
        currentLanguage === code ? "font-semibold text-sage-900" : "text-sage-700 hover:text-sage-900"
      )}
      aria-label={`Switch language to ${code}`}
    >
      {label}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 w-full md:pt-6 md:pt-8">
      {/* Mobile header - full width edge to edge */}
      <div className="md:hidden w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-16 flex items-center justify-between px-4 border-b border-sage-200/30" style={{ backgroundColor: '#FFF2E5' }}>
        {/* Brand */}
        <Link href="/" className="flex flex-col leading-none">
          <span className="text-sm tracking-wider text-sage-900 font-semibold uppercase">ALLA HÜVENEN</span>
          <span className="text-[11px] tracking-widest text-sage-700 uppercase">PODOLOGY STUDIO</span>
        </Link>

        {/* burger only on mobile */}
        <div className="relative">
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-sage-300 text-sage-900"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-52 rounded-lg border border-sage-200 bg-white shadow-lg p-2">
              {/* mobile language switcher */}
              <div className="px-2 py-1">
                <div className="flex items-center rounded-full border border-ivory-300 bg-ivory-100 p-0.5">
                  <button
                    type="button"
                    aria-pressed={currentLanguage === 'et'}
                    onClick={() => setLanguage('et')}
                    className={twMerge(
                      "flex-1 py-1.5 text-center text-[12px] rounded-full",
                      currentLanguage === 'et'
                        ? "bg-white text-sage-900 shadow"
                        : "text-sage-700 hover:text-sage-900"
                    )}
                  >
                    EST
                  </button>
                  <button
                    type="button"
                    aria-pressed={currentLanguage === 'ru'}
                    onClick={() => setLanguage('ru')}
                    className={twMerge(
                      "flex-1 py-1.5 text-center text-[12px] rounded-full",
                      currentLanguage === 'ru'
                        ? "bg-white text-sage-900 shadow"
                        : "text-sage-700 hover:text-sage-900"
                    )}
                  >
                    RUS
                  </button>
                </div>
              </div>
              <div className="h-px bg-sage-100 my-1" />
              {nav.map((item) => {
                const active = pathname === item.href;
                const label = currentLanguage === "et" ? item.et : item.ru;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={twMerge(
                      "block px-3 py-2 text-[12px] rounded-md text-sage-700 hover:bg-sage-50",
                      active && "font-semibold text-sage-900"
                    )}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Desktop header - with container and rounded corners */}
      <div className="hidden md:block max-w-6xl mx-auto px-6 md:px-10">
        <div className="rounded-xl border border-ivory-300 h-24 flex items-center justify-between px-20" style={{ backgroundColor: '#FFF2E5' }}>
          {/* Brand */}
          <Link href="/" className="flex flex-col leading-none">
          <span className="text-sm tracking-wider text-sage-900 font-semibold uppercase">ALLA HÜVENEN</span>
          <span className="text-[11px] tracking-widest text-sage-700 uppercase">PODOLOGY STUDIO</span>
        </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-6 text-[14px] tracking-wide">
            {nav.map((item) => {
              const active = pathname === item.href;
              const label = currentLanguage === "et" ? item.et : item.ru;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={twMerge(
                    "text-sage-700 hover:text-sage-900",
                    active && "font-semibold text-sage-900"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Lang + burger */}
          <div className="flex items-center gap-2">
            {/* language visible on desktop */}
            <div className="hidden md:flex items-center gap-2">
              <LangBtn code="et" label="EST" />
              <span className="text-sage-400">|</span>
              <LangBtn code="ru" label="RUS" />
            </div>
            {/* burger only on mobile */}
            <div className="md:hidden relative">
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="ml-2 h-9 w-9 inline-flex items-center justify-center rounded-md border border-sage-300 text-sage-900"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-lg border border-sage-200 bg-white shadow-lg p-2">
                {/* mobile language switcher */}
                <div className="px-2 py-1">
                  <div className="flex items-center rounded-full border border-ivory-300 bg-ivory-100 p-0.5">
                    <button
                      type="button"
                      aria-pressed={currentLanguage === 'et'}
                      onClick={() => setLanguage('et')}
                      className={twMerge(
                        "flex-1 py-1.5 text-center text-[12px] rounded-full",
                        currentLanguage === 'et'
                          ? "bg-white text-sage-900 shadow"
                          : "text-sage-700 hover:text-sage-900"
                      )}
                    >
                      EST
                    </button>
                    <button
                      type="button"
                      aria-pressed={currentLanguage === 'ru'}
                      onClick={() => setLanguage('ru')}
                      className={twMerge(
                        "flex-1 py-1.5 text-center text-[12px] rounded-full",
                        currentLanguage === 'ru'
                          ? "bg-white text-sage-900 shadow"
                          : "text-sage-700 hover:text-sage-900"
                      )}
                    >
                      RUS
                    </button>
                  </div>
                </div>
                <div className="h-px bg-sage-100 my-1" />
                {nav.map((item) => {
                  const active = pathname === item.href;
                  const label = currentLanguage === "et" ? item.et : item.ru;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={twMerge(
                        "block px-3 py-2 text-[12px] rounded-md text-sage-700 hover:bg-sage-50",
                        active && "font-semibold text-sage-900"
                      )}
                    >
                      {label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
    </header>
  );
}


