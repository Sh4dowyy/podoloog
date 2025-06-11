'use client';

import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/Products";
import { TechStack } from "@/components/TechStack";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { FloralDecorations, WatercolorBorder } from "@/components/FloralDecorations";
import { ValuesSection } from "@/components/ValuesSection";
import Image from "next/image";

export default function Home() {
  const { currentLanguage } = useLanguage();

  return (
    <Container>
      {/* Hero Section */}
      <div className="max-w-4xl mt-8">
        <div className="glass-effect rounded-xl p-8 shadow-lg relative overflow-hidden backdrop-blur-sm">
          {/* Welcome Header with Floral Accent */}
          <div className="relative mb-6">
            <Heading as="h1" className="font-black text-2xl md:text-3xl lg:text-4xl text-center text-sage-900 relative z-10">
              {currentLanguage === 'et' 
                ? 'Alla Hüvenen' 
                : 'Alla Hüvenen'
              }
            </Heading>
            <div className="text-center mt-3">
              <span className="text-lg font-medium text-poppy-500">
                {currentLanguage === 'et' ? 'Kogenud Podoloog Tartus' : 'Опытный Подолог в Тарту'}
              </span>
            </div>
            
            {/* Decorative line with flower */}
            <div className="flex items-center justify-center mt-4 space-x-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-sage-300"></div>
              <svg className="w-8 h-8" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                {/* Central decorative poppy */}
                <path
                  d="M15 15 Q20 10, 25 15 Q30 20, 25 25 Q20 30, 15 25 Q10 20, 15 15"
                  fill="url(#centerPoppy)"
                />
                <circle cx="20" cy="20" r="3" fill="#2d1810" opacity="0.6"/>
                <defs>
                  <radialGradient id="centerPoppy" cx="0.3" cy="0.3">
                    <stop offset="0%" stopColor="#ff8c69"/>
                    <stop offset="70%" stopColor="#ff6347"/>
                    <stop offset="100%" stopColor="#ff4500"/>
                  </radialGradient>
                </defs>
              </svg>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-sage-300"></div>
            </div>
          </div>
          {/* Slogan */}
          <div className="mb-6 p-4 bg-poppy-50 rounded-lg border-l-4 border-poppy-400">
            <Paragraph className="text-lg font-medium italic text-poppy-900">
              {currentLanguage === 'et' 
                ? '"Teie usaldus - Minu kätes. Samm sammult leian lahenduse."'
                : '"Ваше доверие - в моих руках. Шаг за шагом нахожу решение."'
              }
            </Paragraph>
          </div>

          <Paragraph className="mb-4">
            {currentLanguage === 'et' 
              ? 'Spetsialiseerun probleemse pediküüri, sissekasvanud küünte ravi, küünte seenhaiguse ravile ja muudele jalgade probleemidele. Kasutan kaasaegseid meetodeid ja professionaalseid vahendeid teie jalgade tervise tagamiseks.'
              : 'Специализируюсь на проблемном педикюре, лечении вросших ногтей, лечении грибка ногтей и других проблемах стоп. Использую современные методы и профессиональные инструменты для обеспечения здоровья ваших ног.'
            }
          </Paragraph>
        </div>
      </div>

      {/* Professional Info */}
      <div className="max-w-4xl mt-12">
        <div className="glass-effect rounded-xl p-6 shadow-lg backdrop-blur-sm">
          <Heading as="h2" className="font-black text-lg md:text-xl mb-4 text-sage-900">
            {currentLanguage === 'et' ? 'Professionaalne Kvalifikatsioon' : 'Профессиональная Квалификация'}
          </Heading>
          <Paragraph className="mb-4">
            <Highlight>
              {currentLanguage === 'et' ? 'Alla Hüvenen, Podoloog, tase 5' : 'Alla Hüvenen, Подолог, уровень 5'}
            </Highlight> (E017089)
          </Paragraph>
          <Paragraph className="mb-4">
            {currentLanguage === 'et' 
              ? 'Olen sertifitseeritud podoloog 5. taseme kvalifikatsiooniga. Minu eriala hõlmab probleemsete jalgade hooldust, sissekasvanud küünte korrigeerimist, klamber süsteemide paigaldust, proteseerimine, kanna lõhede hooldust ja professionaalset pediküüri.'
              : 'Я сертифицированный подолог с квалификацией 5 уровня. Моя специализация включает уход за проблемными ногами, коррекцию вросших ногтей, установку скобочных систем, протезирование, уход за трещинами пяток и профессиональный педикюр.'
            }
          </Paragraph>
        </div>
      </div>

      {/* Decorative Divider */}
      <div className="max-w-4xl mt-12 mb-8">
        <div className="flex items-center justify-center space-x-6">
          <div className="h-px w-20 bg-gradient-to-r from-sage-200 to-poppy-200"></div>
          <svg className="w-12 h-12" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
            {/* Decorative flower cluster */}
            <g opacity="0.7">
              <path d="M25 25 Q30 20, 35 25 Q40 30, 35 35 Q30 40, 25 35 Q20 30, 25 25" fill="url(#dividerPoppy1)"/>
              <path d="M15 30 Q18 27, 21 30 Q24 33, 21 36 Q18 39, 15 36 Q12 33, 15 30" fill="url(#dividerPoppy2)"/>
              <path d="M39 30 Q42 27, 45 30 Q48 33, 45 36 Q42 39, 39 36 Q36 33, 39 30" fill="url(#dividerPoppy3)"/>
              <circle cx="30" cy="30" r="2" fill="#2d1810" opacity="0.5"/>
              <circle cx="18" cy="33" r="1.5" fill="#2d1810" opacity="0.4"/>
              <circle cx="42" cy="33" r="1.5" fill="#2d1810" opacity="0.4"/>
            </g>
            <defs>
              <radialGradient id="dividerPoppy1">
                <stop offset="0%" stopColor="#ff8c69"/>
                <stop offset="100%" stopColor="#ff6347"/>
              </radialGradient>
              <radialGradient id="dividerPoppy2">
                <stop offset="0%" stopColor="#ffa07a"/>
                <stop offset="100%" stopColor="#ff7f50"/>
              </radialGradient>
              <radialGradient id="dividerPoppy3">
                <stop offset="0%" stopColor="#ffa07a"/>
                <stop offset="100%" stopColor="#ff7f50"/>
              </radialGradient>
            </defs>
          </svg>
          <div className="h-px w-20 bg-gradient-to-l from-sage-200 to-poppy-200"></div>
        </div>
      </div>

      {/* Values Section */}
      <ValuesSection />

      {/* Contact Information */}
      <div className="max-w-4xl mt-12">
        <Heading as="h2" className="font-black text-lg md:text-xl lg:text-2xl mb-6">
          {currentLanguage === 'et' ? 'Kontakt ja Asukoht' : 'Контакты и Расположение'}
        </Heading>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Details */}
          <div className="glass-effect rounded-xl p-6 shadow-lg backdrop-blur-sm">
            <h3 className="text-lg font-bold text-sage-800 mb-4">
               {currentLanguage === 'et' ? 'Kontaktandmed' : 'Контактная информация'}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-poppy-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <span className="text-sage-800 font-medium">
                    {currentLanguage === 'et' ? 'Aadress:' : 'Адрес:'}
                  </span>
                  <span className="ml-2 text-sage-700">Anne 44, Tartu, Estonia</span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-poppy-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <span className="text-sage-800 font-medium">
                    {currentLanguage === 'et' ? 'Telefon:' : 'Телефон:'}
                  </span>
                  <a href="tel:+37258955153" className="ml-2 text-sage-700 font-medium hover:text-poppy-600">
                    +372 5895 5153
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-poppy-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <span className="text-sage-800 font-medium">
                    {currentLanguage === 'et' ? 'Facebook:' : 'Фейсбук:'}
                  </span>
                  <a href="https://www.facebook.com/profile.php?id=100063781140588" 
                     className="ml-2 text-sage-700 hover:text-poppy-600"
                     target="_blank" 
                     rel="noopener noreferrer">
                    {currentLanguage === 'et' ? 'Jälgige uudiseid' : 'Следите за новостями'}
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-poppy-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <span className="text-sage-800 font-medium">
                    {currentLanguage === 'et' ? 'Vastuvõtuaeg:' : 'Прием:'}
                  </span>
                  <span className="ml-2 text-sage-700">
                    {currentLanguage === 'et' ? 'Kokkuleppel' : 'По договоренности'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps */}
          <div className="glass-effect rounded-xl p-6 shadow-lg backdrop-blur-sm">
            <h3 className="text-lg font-bold text-sage-800 mb-4">
              🗺️ {currentLanguage === 'et' ? 'Asukoht Tartus' : 'Расположение в Тарту'}
            </h3>
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2092.8364910744383!2d26.722621276707756!3d58.37786727471819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46eb36f0d4d4c5c5%3A0x4a51c5b1e1a4b7f8!2sAnne%2044%2C%20Tartu%2C%20Estonia!5e0!3m2!1sen!2s!4v1703123456789!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
                title={currentLanguage === 'et' ? 'Alla Hüvenen podoloog asukoht Tartus' : 'Расположение подолога Alla Hüvenen в Тарту'}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
