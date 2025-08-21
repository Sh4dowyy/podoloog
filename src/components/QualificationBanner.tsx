"use client";

import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";
import { useLanguage } from "./i18n/LanguageProvider";

export function QualificationBanner() {
  const { currentLanguage } = useLanguage();
  return (
    <section className="py-8 md:py-12 bg-poppy-50/30">
      <div className="rounded-xl border border-poppy-200/40 bg-ivory-50 p-6 text-center">
        <Heading as="h2" className="text-[30px] tracking-widest">
          {currentLanguage === 'et' ? 'PROFESSIONAALNE KVALIFIKATSIOON' : 'ПРОФЕССИОНАЛЬНАЯ КВАЛИФИКАЦИЯ'}
        </Heading>
        <Paragraph className="mt-4 text-sage-700 text-xs tracking-widest uppercase">
          {currentLanguage === 'et'
            ? 'Alla Hüvenen, Podoloog, tase 5 (E017089)'
            : 'Алла Хювенен, Подолог, уровень 5 (E017089)'}
        </Paragraph>
        <Paragraph className="mt-4 text-sage-700 text-sm">
          {currentLanguage === 'et'
            ? 'Olen sertifitseeritud podoloog 5. taseme kvalifikatsiooniga. Minu eriala hõlmab probleemsete jalgade hooldust, sissekasvanud küünte korrigeerimist, klamber süsteemide paigaldust, proteseerimist, kannalõhede hooldust ja professionaalset pediküüri.'
            : 'Я сертифицированный подолог с квалификацией 5 уровня. Моя специализация включает уход за проблемными ногами, коррекцию вросших ногтей, установку скобочных систем, протезирование, уход за трещинами пяток и профессиональный педикюр.'}
        </Paragraph>
      </div>
    </section>
  );
}


