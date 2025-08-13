'use client';

import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { productService } from "@/lib/products";
import { Product } from "@/types/product";

export default function ProductsPage() {
  const { currentLanguage } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null); // mobile expand instead of immediate navigation

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

  const getShortDescription = (product: Product) => {
    // Prefer short generic description if provided, else fall back to localized text
    if (product.description) return product.description;
    return currentLanguage === 'et' ? (product.description_et || '') : (product.description_ru || '');
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
    <Container className="pt-6 md:pt-8 pb-20">
      <div className="py-0">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-base md:text-lg tracking-widest text-sage-900 uppercase mb-2">
            {currentLanguage === 'et' ? 'Meie töös kasutusel olevad brändid' : 'Бренды, с которыми работаем'}
          </h2>
          <p className="text-[12px] md:text-[13px] text-sage-700">
            {currentLanguage === 'et' 
              ? 'Kasutan ainult kvaliteetseid ja sertifitseeritud tooteid jalgade tervise tagamiseks. Kõik brändid on valitud nende usaldusväärsuse ja tõhususe põhjal.'
              : 'Используем только качественные и сертифицированные продукты. Все бренды выбраны за надежность и эффективность.'}
          </p>
        </div>

        {/* Products Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Mobile card: expand instead of navigate */}
                <div className="md:hidden">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setExpandedId(expandedId === product.id ? null : product.id)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpandedId(expandedId === product.id ? null : product.id); } }}
                    className="relative rounded-xl border border-sage-300 px-4 py-4 text-center overflow-hidden transition duration-200"
                  >
                    <div className="relative z-10">
                      <div className="text-[12px] md:text-[13px] tracking-widest uppercase text-sage-900">{getLocalizedName(product)}</div>
                      <motion.div
                        initial={false}
                        animate={{ height: expandedId === product.id ? 'auto' : 0, opacity: expandedId === product.id ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-2 text-[12px] md:text-[13px] text-sage-700">
                          {getShortDescription(product)}
                        </p>
                        <div className="mt-2">
                          <Link href={`/products/${product.id}`} className="inline-block text-[10px] text-sage-700 underline">
                            {currentLanguage === 'et' ? 'Ava bränd' : 'Открыть бренд'}
                          </Link>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Desktop card: navigate on click with hover reveal */}
                <div className="hidden md:block">
                  <Link href={`/products/${product.id}`} className="block group">
                    <div className="relative rounded-xl border border-sage-300 px-4 py-4 text-center overflow-hidden hover:border-sage-600 transition duration-200 group-hover:scale-[1.03] group-hover:shadow-md">
                      {/* Hover background like Teenused: poppy field + white veil */}
                      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-30 bg-cover bg-center transition-opacity" style={{ backgroundImage: 'url(/images/poppy-field.jpg)' }} />
                      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 bg-white/70 transition-opacity" />
                      <div className="relative z-10">
                        <div className="text-[12px] md:text-[13px] tracking-widest uppercase text-sage-900">{getLocalizedName(product)}</div>
                        <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-200 group-hover:max-h-24 group-hover:opacity-100">
                          <p className="mt-2 text-[12px] md:text-[13px] text-sage-700 line-clamp-3">
                            {getShortDescription(product)}
                          </p>
                          <span className="mt-2 inline-block text-[10px] text-sage-600 underline">{currentLanguage === 'et' ? 'Loe rohkem' : 'Подробнее'}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
} 