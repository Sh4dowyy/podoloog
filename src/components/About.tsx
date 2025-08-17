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
			<h2 className="text-base md:text-lg tracking-widest text-sage-900 uppercase mb-4 text-center font-bold">
        {currentLanguage === 'et' ? 'Meist' : 'О нас'}
      </h2>
      {/* Hero row: intro text + clinic photos collage */}
			<section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8">
				<div>
					<p className="text-base text-sage-800">
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
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[13px] md:text-[14px] text-sage-800 leading-relaxed">
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </section>

      {/* Diplomas Carousel */}
      <div className="my-16">
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
