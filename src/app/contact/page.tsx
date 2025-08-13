'use client';

import { Contact } from "@/components/Contact";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import Image from "next/image";

export default function ContactPage() {
  const { currentLanguage } = useLanguage();
  
  return (
    <Container className="pt-6 md:pt-8 pb-20">
      <div className="py-0">
        <div className="text-center mb-6">
          <h1 className="text-base md:text-lg tracking-widest uppercase text-sage-900 mb-2">{currentLanguage === 'et' ? 'Kontakt' : 'Контакт'}</h1>
          <p className="text-[12px] md:text-[14px] text-sage-700">{currentLanguage === 'et' ? 'Teenuse broneerimiseks või küsimuste esitamisel võtke meiega julgelt ühendust' : 'Для записи или вопросов свяжитесь с нами'}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 max-w-6xl mx-auto items-start">
          {/* Left: Contact Info */}
          <div className="lg:col-span-1">
            <h2 className="text-[12px] md:text-[13px] tracking-widest uppercase text-sage-900 mb-4">{currentLanguage === 'et' ? 'Kontakt info' : 'Контакт'}</h2>
            <ul className="text-[12px] md:text-[13px] text-sage-800 space-y-3">
              <li>Telefon: +372 5895 5153</li>
              <li>Aadress: Anne 44, Tartu</li>
              <li>Email: a.huvenen@gmail.com</li>
            </ul>
          </div>

          {/* Middle: Company Info */}
          <div className="lg:col-span-1">
            <h2 className="text-[12px] md:text-[13px] tracking-widest uppercase text-sage-900 mb-4">{currentLanguage === 'et' ? 'Ettevõtte andmed' : 'Данные компании'}</h2>
            <ul className="text-[12px] md:text-[13px] text-sage-800 space-y-3">
              <li>Ettevõte: OÜ Girsi</li>
              <li>Registrikood: 11350594</li>
              <li>Pangakonto: EE112200221035550935</li>
            </ul>
          </div>

          {/* Right: Socials */}
          <div className="lg:col-span-3">
            <h2 className="text-[12px] md:text-[13px] tracking-widest uppercase text-sage-900">{currentLanguage === 'et' ? 'Sotsiaalmeedia' : 'Соцсети'}</h2>
            <p className="text-[12px] md:text-[13px] text-sage-700 mb-2">{currentLanguage === 'et' ? 'Jälgi meie tegevusi ka sotsiaalmeedias:' : 'Следите за нами в соцсетях:'}</p>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              {/* Facebook preview clickable (static image). Replace /images/fb-preview.jpg with your uploaded file */}
              <div className="relative rounded-xl overflow-hidden border hover:border-sage-600 transition-colors cursor-pointer h-[150px] md:col-span-3">
                <Image
                  src="/images/fb-preview.jpg"
                  alt="Facebook preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1000px) 100vw, 33vw"
                />
                <a
                  href="https://www.facebook.com/profile.php?id=100063781140588"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0"
                  aria-label="Facebook"
                />
              </div>
              {/* Instagram button */}
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl overflow-hidden border hover:border-sage-600 transition-colors flex items-center justify-center text-[12px] md:text-[13px] text-sage-700 h-[150px] md:col-span-3"
                aria-label="Instagram"
              >
                INSTAGRAM
              </a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
