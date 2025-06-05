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
      {/* Language-specific Information Section */}
      <div className="max-w-4xl mt-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <Paragraph className="mb-4">
            <Highlight>
              {currentLanguage === 'et' ? 'Alla Hüvenen, Podoloog, tase 5' : 'Alla Hüvenen, Подолог, уровень 5'}
            </Highlight> (kood 226809)
          </Paragraph>
          <Paragraph className="mb-4">
            {currentLanguage === 'et' 
              ? 'Probleemsete jalgade hooldus, sissekasvanud küünte korrigeerimine, klamber süsteemide paigaldus; proteseerimine, kanna lõhede hooldus, konnasilmad/soolatüükad, pediküür.'
              : 'Уход за проблемными ногами, коррекция вросших ногтей, установка скобочных систем, протезирование, уход за трещинами пяток, мозоли/натоптыши, педикюр.'
            }
          </Paragraph>
        </div>
      </div>

      {/* Contact Information */}
      <div className="max-w-4xl mt-12">
        <Heading as="h2" className="font-black text-lg md:text-xl lg:text-2xl mb-6">
          {currentLanguage === 'et' ? 'Kontakt' : 'Контакты'}
        </Heading>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Details */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <h3 className="text-lg font-bold text-neutral-700 mb-4">
               {currentLanguage === 'et' ? 'Kontaktandmed' : 'Контактная информация'}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-medium text-gray-900">Anne 44, Tartu, Estonia</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">💬</span>
                <div>
                  <a href="https://www.facebook.com/profile.php?id=100063781140588" className="font-medium text-blue-600 hover:text-blue-800">
                    Facebook
                  </a>
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
            </div>
          </div>

          {/* Google Maps */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
            <h3 className="text-lg font-bold text-neutral-700 mb-4">
              🗺️ {currentLanguage === 'et' ? 'Asukoht kaardil' : 'Расположение на карте'}
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
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
