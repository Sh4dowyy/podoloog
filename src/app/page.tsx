'use client';

import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/Products";
import { TechStack } from "@/components/TechStack";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import Image from "next/image";

export default function Home() {
  const { currentLanguage } = useLanguage();

  return (
    <Container>
      {/* Hero Section */}
      <div className="max-w-4xl mt-8">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-neutral-200">
          <Heading as="h1" className="font-black text-2xl md:text-3xl lg:text-4xl mb-6">
            {currentLanguage === 'et' 
              ? 'Alla Hüvenen - Kogenud Podoloog Tartus' 
              : 'Alla Hüvenen - Опытный Подолог в Тарту'
            }
          </Heading>
          <Paragraph className="mb-4">
            {currentLanguage === 'et' 
              ? 'Spetsialiseerun probleemse pediküüri, sissekasvanud küünte ravi, küünte seenhaiguse ravile ja muudele jalgade probleemidele. Kasutan kaasaegseid meetodeid ja professionaalseid vahendeid teie jalgade tervise tagamiseks.'
              : 'Специализируюсь на проблемном педикюре, лечении вросших ногтей, лечении грибка ногтей и других проблемах стоп. Использую современные методы и профессиональные инструменты для обеспечения здоровья ваших ног.'
            }
          </Paragraph>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-4xl mt-12">
        <Heading as="h2" className="font-black text-lg md:text-xl lg:text-2xl mb-6">
          {currentLanguage === 'et' ? 'Teenused' : 'Услуги'}
        </Heading>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <h3 className="text-lg font-bold text-neutral-700 mb-3 flex items-center">
              {currentLanguage === 'et' ? 'Probleemne Pediküür' : 'Проблемный Педикюр'}
            </h3>
            <Paragraph className="text-sm">
              {currentLanguage === 'et'
                ? 'Professionaalne probleemse pediküüri teenus keerukate jalgade probleemide korral. Turvaliselt ja valutult.'
                : 'Профессиональная услуга проблемного педикюра при сложных проблемах стоп. Безопасно и безболезненно.'
              }
            </Paragraph>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <h3 className="text-lg font-bold text-neutral-700 mb-3 flex items-center">
              {currentLanguage === 'et' ? 'Sissekasvanud Küünte Ravi' : 'Лечение Вросших Ногтей'}
            </h3>
            <Paragraph className="text-sm">
              {currentLanguage === 'et'
                ? 'Sissekasvanud küünte professionaalne ravi. Klamber süsteemide paigaldus ja ortoosiline ravi.'
                : 'Профессиональное лечение вросших ногтей. Установка скобочных систем и ортозное лечение.'
              }
            </Paragraph>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <h3 className="text-lg font-bold text-neutral-700 mb-3 flex items-center">
              {currentLanguage === 'et' ? 'Küünte Seenhaiguse Ravi' : 'Лечение Грибка Ногтей'}
            </h3>
            <Paragraph className="text-sm">
              {currentLanguage === 'et'
                ? 'Küünte seenhaiguse diagnoosimine ja ravi. Kaasaegsete meetodite kasutamine tõhusaks raviks.'
                : 'Диагностика и лечение грибка ногтей. Использование современных методов для эффективного лечения.'
              }
            </Paragraph>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <h3 className="text-lg font-bold text-neutral-700 mb-3 flex items-center">
              {currentLanguage === 'et' ? 'Villidide ja Kanna Lõhede Ravi' : 'Лечение Мозолей и Трещин Пяток'}
            </h3>
            <Paragraph className="text-sm">
              {currentLanguage === 'et'
                ? 'Villidide, konnasilmade, soolatükkade eemaldamine. Kanna lõhede professionaalne hooldus ja ravi.'
                : 'Удаление мозолей, натоптышей. Профессиональный уход и лечение трещин пяток.'
              }
            </Paragraph>
          </div>
        </div>
      </div>

      {/* Professional Info */}
      <div className="max-w-4xl mt-12">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <Heading as="h2" className="font-black text-lg md:text-xl mb-4">
            {currentLanguage === 'et' ? 'Professionaalne Kvalifikatsioon' : 'Профессиональная Квалификация'}
          </Heading>
          <Paragraph className="mb-4">
            <Highlight>
              {currentLanguage === 'et' ? 'Alla Hüvenen, Podoloog, tase 5' : 'Alla Hüvenen, Подолог, уровень 5'}
            </Highlight> (kood 226809)
          </Paragraph>
          <Paragraph className="mb-4">
            {currentLanguage === 'et' 
              ? 'Olen sertifitseeritud podoloog 5. taseme kvalifikatsiooniga. Minu eriala hõlmab probleemsete jalgade hooldust, sissekasvanud küünte korrigeerimist, klamber süsteemide paigaldust, proteseerimine, kanna lõhede hooldust ja professionaalset pediküüri.'
              : 'Я сертифицированный подолог с квалификацией 5 уровня. Моя специализация включает уход за проблемными ногами, коррекцию вросших ногтей, установку скобочных систем, протезирование, уход за трещинами пяток и профессиональный педикюр.'
            }
          </Paragraph>
        </div>
      </div>

      {/* Contact Information */}
      <div className="max-w-4xl mt-12">
        <Heading as="h2" className="font-black text-lg md:text-xl lg:text-2xl mb-6">
          {currentLanguage === 'et' ? 'Kontakt ja Asukoht' : 'Контакты и Расположение'}
        </Heading>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Details */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <h3 className="text-lg font-bold text-neutral-700 mb-4">
               {currentLanguage === 'et' ? 'Kontaktandmed' : 'Контактная информация'}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-medium text-gray-900">Anne 44, Tartu, Estonia</p>
                  <p className="text-sm text-gray-600">
                    {currentLanguage === 'et' ? 'Kesklinnas, hea ligipääsuga' : 'В центре города, хорошая доступность'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📞</span>
                <div>
                  <a href="tel:+37258955153" className="font-medium text-blue-600 hover:text-blue-800">
                    +372 5895 5153
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">💬</span>
                <div>
                  <a href="https://www.facebook.com/profile.php?id=100063781140588" 
                     className="font-medium text-blue-600 hover:text-blue-800"
                     target="_blank" 
                     rel="noopener noreferrer">
                    Facebook
                  </a>
                  <p className="text-sm text-gray-600">
                    {currentLanguage === 'et' ? 'Jälgige uudiseid' : 'Следите за новостями'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">⏰</span>
                <div>
                  <p className="font-medium text-gray-900">
                    {currentLanguage === 'et' ? 'Vastuvõtt kokkuleppel' : 'Прием по договоренности'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {currentLanguage === 'et' ? 'Paindlik ajakava' : 'Гибкий график'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <h3 className="text-lg font-bold text-neutral-700 mb-4">
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
            <p className="text-sm text-gray-600 mt-2">
              {currentLanguage === 'et' 
                ? 'Anne tänavas, Tartu kesklinnas. Hea ühistranspordi ühendus.'
                : 'На улице Анне, в центре Тарту. Хорошее транспортное сообщение.'
              }
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
