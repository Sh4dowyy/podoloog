"use client";
import { Paragraph } from "@/components/Paragraph";
import Image from "next/image";
import { useEffect, useState } from "react";
import { credentialService } from "@/lib/credentials";
import { Credential } from "@/types/credential";
import { motion } from "framer-motion";
import { useLanguage } from "./i18n/LanguageProvider";
import { CredentialsCarousel } from "./CredentialsCarousel";

export default function About() {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [active, setActive] = useState<Credential | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    credentialService
      .getPublishedCredentials()
      .then(setCredentials)
      .catch(() => setCredentials([]));
  }, []);

  return (
		<div>
			{/* Page title */}
			<h2 className="text-base font-semibold leading-none uppercase text-center md:text-[30px] md:tracking-widest text-sage-900 mt-8 mb-8 md:mb-12 md:font-bold" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: '16px' }}>
        {currentLanguage === 'et' ? 'MEIST' : 'О НАС'}
      </h2>

      {/* Name and qualification block */}
      <div className="text-center mb-8">
        <p className="text-base font-normal leading-none text-center uppercase text-sage-700" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '16px' }}>
          {currentLanguage === 'et'
            ? 'Alla Hüvenen'
            : 'Алла Хювенен'}
          <br />
          {currentLanguage === 'et'
            ? 'Podoloog, tase 5 (E017089)'
            : 'Подолог, уровень 5 (E017089)'}
        </p>
      </div>

      {/* Hero row: intro text + clinic photos collage */}
			<section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8">
				<div className="text-center lg:text-left">
					<p className="text-base font-normal leading-none text-center lg:text-left text-sage-800" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '16px' }}>
            {currentLanguage === 'et' 
              ? 'Olen sertifitseeritud podoloog 5. taseme kvalifikatsiooniga. Minu eriala hõlmab probleemsete jalgade hooldust, sissekasvanud küünte korrigeerimist, klamber süsteemide paigaldust, proteseerimist, kannalõhede hooldust ja professionaalset pediküüri.'
              : 'Я сертифицированный подолог с квалификацией 5-го уровня. Моя специальность включает в себя уход за проблемными стопами, коррекцию вросших ногтей, установку скобочных систем, протезирование, уход за трещинами пяток и профессиональный педикюр.'
            }
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="aspect-[4/3] rounded-lg bg-ivory-200" />
          <div className="aspect-[4/3] rounded-lg bg-ivory-200" />
        </div>
      </section>

      {/* Two text columns under hero */}
      <section className="grid grid-cols-1 gap-6">
        <div className="text-center">
          <p className={`text-base font-normal leading-none text-center text-sage-800 ${
            isExpanded ? '' : 'line-clamp-8 max-h-32 overflow-hidden'
          }`} style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '1.2' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 text-base text-sage-600 hover:text-sage-800 underline hover:no-underline px-2 py-1 rounded-md hover:bg-sage-50 transition-all duration-200 font-medium"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {isExpanded 
              ? (currentLanguage === "et" ? "Näita vähem" : "Скрыть")
              : (currentLanguage === "et" ? "Loe edasi" : "Читать больше")
            }
          </button>
        </div>
      </section>

      {/* Diplomas Carousel */}
      <div className="mt-12 md:mt-24 mb-0 md:mb-16">
        <CredentialsCarousel 
          credentials={credentials}
          onCredentialClick={setActive}
        />
      </div>

      <div className="max-w-4xl"></div>

      {/* Modal */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-xl bg-ivory-50 p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute top-3 right-3 h-8 w-8 rounded-full bg-ivory-100 hover:bg-ivory-200 flex items-center justify-center text-sage-900"
            >
              ×
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                <Image
                  src={active.image_url || "/images/sidefolio-aceternity.png"}
                  alt={active.title_ru || active.title_et || "certificate"}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-sage-900 mb-2">
                  {currentLanguage === 'et' ? active.title_et || active.title_ru : active.title_ru || active.title_et}
                </h4>
                <p className="text-sage-800 text-sm whitespace-pre-line">
                  {currentLanguage === 'et' ? active.description_et || active.description_ru : active.description_ru || active.description_et}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
