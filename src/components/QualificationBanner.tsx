"use client";

import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";
import { useLanguage } from "./i18n/LanguageProvider";

export function QualificationBanner() {
  const { currentLanguage } = useLanguage();
  return (
    <section className="py-8 md:py-12 bg-poppy-50/30">
      <div className="rounded-xl border border-poppy-200/40 bg-ivory-50 p-6 text-center">
        <h2 className="text-base font-semibold leading-none text-center uppercase tracking-wide md:text-[30px] md:tracking-widest md:font-bold" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: '16px', letterSpacing: '0.05em' }}>
          {currentLanguage === 'et' ? 'PROFESSIONAALNE KVALIFIKATSIOON' : 'ПРОФЕССИОНАЛЬНАЯ КВАЛИФИКАЦИЯ'}
        </h2>
        <p className="mt-4 text-sage-700 text-sm font-normal leading-none text-center uppercase md:text-xs md:tracking-widest" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '14px' }}>
          {currentLanguage === 'et'
            ? 'Alla Hüvenen'
            : 'Алла Хювенен'}
          <br />
          {currentLanguage === 'et'
            ? 'Podoloog, tase 5 (E017089)'
            : 'Подолог, уровень 5 (E017089)'}
        </p>
        <p className="mt-4 text-sage-700 text-sm font-normal leading-snug text-center" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '1.25' }}>
          {currentLanguage === 'et'
            ? 'Olen sertifitseeritud podoloog 5. taseme kvalifikatsiooniga. Minu eriala hõlmab probleemsete jalgade hooldust, sissekasvanud küünte korrigeerimist, klamber süsteemide paigaldust, proteseerimist, kannalõhede hooldust ja professionaalset pediküüri.'
            : 'Я сертифицированный подолог с квалификацией 5 уровня. Моя специализация включает уход за проблемными ногами, коррекцию вросших ногтей, установку скобочных систем, протезирование, уход за трещинами пяток и профессиональный педикюр.'}
        </p>
      </div>
    </section>
  );
}


