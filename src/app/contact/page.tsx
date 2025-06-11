'use client';

import { Contact } from "@/components/Contact";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function ContactPage() {
  const { currentLanguage } = useLanguage();
  
  return (
    <Container>
      <div className="py-0">
        {/* Header */}
        <div className="mb-8">
          <Heading as="h1" className="font-black mb-4">
            {currentLanguage === 'et' ? 'Kontaktandmed' : 'Контактные данные'}
          </Heading>
          <Paragraph className="max-w-2xl text-lg">
            {currentLanguage === 'et' 
              ? 'Võtke ühendust professionaalse podoloogia teenuse broneerimiseks või küsimuste esitamiseks.'
              : 'Свяжитесь с нами для записи на профессиональную подологическую процедуру или для вопросов.'
            }
          </Paragraph>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="glass-effect rounded-xl p-6">
              <h2 className="text-2xl font-bold text-sage-900 mb-6">
                {currentLanguage === 'et' ? 'Kontakt info' : 'Контактная информация'}
              </h2>
              
              <div className="space-y-4">
                {/* Phone */}
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-poppy-500 rounded-full"></span>
                  <div>
                    <span className="font-semibold text-sage-800">
                      {currentLanguage === 'et' ? 'Telefon:' : 'Телефон:'}
                    </span>
                    <span className="ml-2 text-sage-700 font-medium">+372 5895 5153</span>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-poppy-500 rounded-full"></span>
                  <div>
                    <span className="font-semibold text-sage-800">
                      {currentLanguage === 'et' ? 'Aadress:' : 'Адрес:'}
                    </span>
                    <span className="ml-2 text-sage-700">Anne 44, Tartu</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-poppy-500 rounded-full"></span>
                  <div>
                    <span className="font-semibold text-sage-800">
                      {currentLanguage === 'et' ? 'Email:' : 'Электронная почта:'}
                    </span>
                    <span className="ml-2 text-sage-700">a.huvenen@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div className="space-y-8">
            <div className="glass-effect rounded-xl p-6">
              <h2 className="text-2xl font-bold text-sage-900 mb-6">
                {currentLanguage === 'et' ? 'Ettevõtte andmed' : 'Данные компании'}
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-poppy-500 rounded-full"></span>
                  <div>
                    <span className="font-semibold text-sage-800">
                      {currentLanguage === 'et' ? 'Ettevõte:' : 'Компания:'}
                    </span>
                    <span className="ml-2 text-sage-700">OÜ Girsi</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-poppy-500 rounded-full"></span>
                  <div>
                    <span className="font-semibold text-sage-800">
                      {currentLanguage === 'et' ? 'Registrikood:' : 'Регистрационный номер:'}
                    </span>
                    <span className="ml-2 text-sage-700">11350594</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-poppy-500 rounded-full"></span>
                  <div>
                    <span className="font-semibold text-sage-800">
                      {currentLanguage === 'et' ? 'Pangakonto:' : 'Банковский счет:'}
                    </span>
                    <span className="ml-2 text-sage-700 font-mono text-sm">EE112200221035550935</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
