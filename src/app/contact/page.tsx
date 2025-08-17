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
        <div className="text-center mb-16">
          <h1 className="text-base md:text-lg tracking-widest uppercase text-sage-900 mb-8 font-bold">
            {currentLanguage === 'et' ? 'KONTAKT' : 'КОНТАКТЫ'}
          </h1>
          <p className="text-xs md:text-sm text-sage-700 max-w-md mx-auto leading-relaxed">
            {currentLanguage === 'et' 
              ? 'Teenuse broneerimiseks või küsimuste esitamisel võtke meiega julgelt ühendust.'
              : 'Для записи на услуги или по вопросам свяжитесь с нами.'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto items-start">
          {/* Left: Contact Info */}
          <div className="lg:col-span-1">
            <h2 className="text-xs md:text-sm tracking-widest uppercase text-sage-900 mb-6">
              {currentLanguage === 'et' ? 'KONTAKT INFO' : 'КОНТАКТНАЯ ИНФОРМАЦИЯ'}
            </h2>
            <ul className="text-xs md:text-sm text-sage-800 space-y-6">
              <li>{currentLanguage === 'et' ? 'Telefon' : 'Телефон'}: +372 5895 5153</li>
              <li>{currentLanguage === 'et' ? 'Aadress' : 'Адрес'}: Anne 44, Tartu</li>
              <li>{currentLanguage === 'et' ? 'Email' : 'Эл. почта'}: podologystudio15@gmail.com</li>
            </ul>
          </div>

          {/* Middle: Company Info */}
          <div className="lg:col-span-1">
            <h2 className="text-xs md:text-sm tracking-widest uppercase text-sage-900 mb-6">
              {currentLanguage === 'et' ? 'ETTEVÕTTE ANDMED' : 'ДАННЫЕ КОМПАНИИ'}
            </h2>
            <ul className="text-xs md:text-sm text-sage-800 space-y-6">
              <li>{currentLanguage === 'et' ? 'Ettevõte' : 'Компания'}: OÜ Girsi</li>
              <li>{currentLanguage === 'et' ? 'Registrikood' : 'Рег. код'}: 11350594</li>
              <li>{currentLanguage === 'et' ? 'Pangakonto' : 'Банк. счет'}: EE112200221035550935</li>
            </ul>
          </div>

          {/* Right: Socials */}
          <div className="lg:col-span-3">
            <p className="text-xs md:text-sm text-sage-700 mb-8 leading-relaxed">
              {currentLanguage === 'et' 
                ? 'Jälgi meie tegevusi ka sotsiaalmeedias:'
                : 'Следите за нашей деятельностью в социальных сетях:'
              }
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Facebook preview clickable (static image). Replace /images/fb-preview.jpg with your uploaded file */}
              <div className="relative rounded-xl overflow-hidden border hover:border-sage-600 transition-colors cursor-pointer h-[150px] group">
                <Image
                  src="/images/fb-preview.jpg"
                  alt="Facebook preview"
                  fill
                  className="object-cover transition-all duration-300 group-hover:brightness-50"
                  sizes="(max-width: 1000px) 100vw, 50vw"
                />
                {/* Overlay with text */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-semibold text-lg tracking-wider">FACEBOOK</span>
                </div>
                <a
                  href="https://www.facebook.com/profile.php?id=100063781140588"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0"
                  aria-label="Facebook"
                />
              </div>
              {/* Instagram preview clickable */}
              <div className="relative rounded-xl overflow-hidden border hover:border-sage-600 transition-colors cursor-pointer h-[150px] group">
                <Image
                  src="/images/instagram-preview.jpg"
                  alt="Instagram preview"
                  fill
                  className="object-cover transition-all duration-300 group-hover:brightness-50"
                  sizes="(max-width: 1000px) 100vw, 50vw"
                />
                {/* Overlay with text */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-semibold text-lg tracking-wider">INSTAGRAM</span>
                </div>
                <a
                  href="https://www.instagram.com/explore/locations/538189129570924/anne-salong"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0"
                  aria-label="Instagram"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
