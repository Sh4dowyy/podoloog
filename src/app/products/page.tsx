'use client';

import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { productService } from "@/lib/products";
import { Product } from "@/types/product";

export default function ProductsPage() {
  const { currentLanguage } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await productService.getPublishedProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fallback brands for when no products in database
  const fallbackBrands: Product[] = [
    {
      id: "1",
      name: "GEHWOL",
      name_et: "GEHWOL",
      name_ru: "GEHWOL", 
      description: "Saksa kvaliteetne jalgade hoolduse bränd.",
      description_et: "Saksa kvaliteetne jalgade hoolduse bränd. Spetsialiseerunud meditsiinitoodetele jalgade tervise tagamiseks. Kasutame nende professionaalseid vahendeid ja preparaate.",
      description_ru: "Немецкий качественный бренд по уходу за ногами. Специализируется на медицинских продуктах для здоровья стоп. Используем их профессиональные инструменты и препараты.",
      published: true
    },
    {
      id: "2",
      name: "Allpresan",
      name_et: "Allpresan",
      name_ru: "Allpresan",
      description: "Innovaatiline Saksa bränd jalgade hoolduseks.",
      description_et: "Innovaatiline Saksa bränd, mis spetsialiseerub jalgade nahapesu ja hooldusvahenditele. Nende tooted on eriti tõhusad kuiva naha ja pragude korral.",
      description_ru: "Инновационный немецкий бренд, специализирующийся на средствах по уходу за кожей ног. Их продукты особенно эффективны при сухой коже и трещинах.",
      published: true
    },
    {
      id: "3",
      name: "SANAMED",
      name_et: "SANAMED",
      name_ru: "SANAMED",
      description: "Professionaalne meditsiinitehnika ja instrumentide tootja.",
      description_et: "Professionaalne meditsiinitehnika ja instrumentide tootja. Pakume kvaliteetseid ja turvaliseid lahendusi podoloogia valdkonnas.",
      description_ru: "Профессиональный производитель медицинской техники и инструментов. Предлагаем качественные и безопасные решения в области подологии.",
      published: true
    },
    {
      id: "4",
      name: "HFL laboratories",
      name_et: "HFL laboratories",
      name_ru: "HFL laboratories",
      description: "Teaduslik lähenemisega laboratoorium.",
      description_et: "Teaduslik lähenemisega laboratoorium, mis arendab innovaatilisi lahendusi jalgade tervisele. Nende tooted põhinevad uusimatel teadusuuringutel.",
      description_ru: "Лаборатория с научным подходом, разрабатывающая инновационные решения для здоровья стоп. Их продукты основаны на новейших научных исследованиях.",
      published: true
    },
    {
      id: "5",
      name: "BioFeet",
      name_et: "BioFeet",
      name_ru: "BioFeet",
      description: "Ökoloogiliselt puhas bränd jalgade hoolduseks.",
      description_et: "Ökoloogiliselt puhas bränd, mis keskendub looduslikele koostisosadele jalgade hoolduses. Sobib tundliku nahaga klientidele.",
      description_ru: "Экологически чистый бренд, который фокусируется на натуральных ингредиентах для ухода за ногами. Подходит для клиентов с чувствительной кожей.",
      published: true
    }
  ];

  const getLocalizedName = (product: Product) => {
    if (currentLanguage === 'et' && product.name_et) return product.name_et;
    if (currentLanguage === 'ru' && product.name_ru) return product.name_ru;
    return product.name;
  };

  const getLocalizedDescription = (product: Product) => {
    if (currentLanguage === 'et' && product.description_et) return product.description_et;
    if (currentLanguage === 'ru' && product.description_ru) return product.description_ru;
    return product.description;
  };



  if (loading) {
    return (
      <Container>
        <div className="py-0">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">
              {currentLanguage === 'et' ? 'Laen tooteid...' : 'Загрузка продукции...'}
            </div>
          </div>
        </div>
      </Container>
    );
  }

  // Use fallback brands if no products in database
  const displayProducts = products.length > 0 ? products : fallbackBrands;

  return (
    <Container>
      <div className="py-0">
        {/* Header */}
        <div className="mb-8">
          <Heading as="h1" className="font-black mb-4">
            {currentLanguage === 'et' ? 'Kasutatud Produktid' : 'Используемая Продукция'}
          </Heading>
          <Paragraph className="max-w-2xl text-lg">
            {currentLanguage === 'et' 
              ? 'Kasutan ainult kvaliteetseid ja sertifitseeritud tooteid jalgade tervise tagamiseks. Kõik bränded on valitud nende usaldusväärsuse ja tõhususe põhjal.'
              : 'Использую только качественные и сертифицированные продукты для обеспечения здоровья стоп. Все бренды выбраны на основе их надежности и эффективности.'
            }
          </Paragraph>
        </div>

        {/* Products Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Brand Logo/Icon */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {getLocalizedName(product)}
                  </h3>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <Paragraph className="text-sm text-gray-700 leading-relaxed">
                    {getLocalizedDescription(product)}
                  </Paragraph>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-blue-50 rounded-xl p-8 border-l-4 border-blue-400">
            <h3 className="text-lg font-bold text-blue-900 mb-4">
              {currentLanguage === 'et' ? 'Miks need bränded?' : 'Почему эти бренды?'}
            </h3>
            <Paragraph className="text-blue-800 mb-4">
              {currentLanguage === 'et'
                ? 'Olen hoolikalt valinud need bränded nende kvaliteedi, ohutuse ja tõhususe põhjal. Iga toode on testitud ja kinnitatud professionaalses kasutuses.'
                : 'Я тщательно выбрал эти бренды на основе их качества, безопасности и эффективности. Каждый продукт протестирован и подтвержден в профессиональном использовании.'
              }
            </Paragraph>
            <Paragraph className="text-blue-800">
              {currentLanguage === 'et'
                ? 'Kõik tooted vastavad Euroopa meditsiiniseadmete direktiividele ja on sertifitseeritud kasutamiseks podoloogia praktikas.'
                : 'Все продукты соответствуют европейским директивам по медицинским устройствам и сертифицированы для использования в подологической практике.'
              }
            </Paragraph>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {currentLanguage === 'et' ? 'Küsimused toodete kohta?' : 'Вопросы о продукции?'}
            </h3>
            <Paragraph className="text-gray-700 mb-6">
              {currentLanguage === 'et'
                ? 'Kui teil on küsimusi kasutatavate toodete või nende toimise kohta, võtke julgelt ühendust.'
                : 'Если у вас есть вопросы об используемых продуктах или их действии, смело обращайтесь.'
              }
            </Paragraph>
            <a
              href="tel:+37258955153"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <span>📞</span>
              <span>+372 5895 5153</span>
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
} 