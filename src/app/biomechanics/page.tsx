'use client';

import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { useState, useEffect, useRef, useId } from "react";
import { IconActivity, IconHeart, IconRun, IconWalk } from "@tabler/icons-react";
import { biomechanicsService } from "@/lib/biomechanics";
import { BiomechanicsItem, BiomechanicsCategory } from "@/types/biomechanics";
import { motion, AnimatePresence } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import Image from "next/image";

const CATEGORY_INFO = {
  exercise: {
    titleEt: 'Harjutused',
    titleRu: 'Упражнения',
    descriptionEt: 'Spetsiaalsed harjutused jalgade tugevdamiseks ja liikuvuse parandamiseks',
    descriptionRu: 'Специальные упражнения для укрепления ног и улучшения подвижности',
    icon: IconRun,
    color: 'bg-blue-50 border-blue-200 text-blue-700',
  },
  hygiene: {
    titleEt: 'Hügieen',
    titleRu: 'Гигиена',
    descriptionEt: 'Jalgade igapäevane hügieen ja hooldus',
    descriptionRu: 'Ежедневная гигиена и уход за ногами',
    icon: IconHeart,
    color: 'bg-green-50 border-green-200 text-green-700',
  },
  physical: {
    titleEt: 'Füüsikaline tervis',
    titleRu: 'Физкультура',
    descriptionEt: 'Kehaline aktiivsus ja liikumine',
    descriptionRu: 'Физическая активность и движение',
    icon: IconWalk,
    color: 'bg-purple-50 border-purple-200 text-purple-700',
  },
};



export default function BiomechanicsPage() {
  const { currentLanguage } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<BiomechanicsCategory | null>(null);
  const [items, setItems] = useState<BiomechanicsItem[]>([]);
  const [itemsByCategory, setItemsByCategory] = useState<Record<BiomechanicsCategory, BiomechanicsItem[]>>({
    exercise: [],
    hygiene: [],
    physical: []
  });
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<BiomechanicsItem | boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const loadItems = async () => {
    try {
      const data = await biomechanicsService.getPublishedItems();
      setItems(data);
      
      // Группировка по категориям
      const grouped = data.reduce((acc, item) => {
        acc[item.category] = acc[item.category] || [];
        acc[item.category].push(item);
        return acc;
      }, {} as Record<BiomechanicsCategory, BiomechanicsItem[]>);
      
      setItemsByCategory({
        exercise: grouped.exercise || [],
        hygiene: grouped.hygiene || [],
        physical: grouped.physical || []
      });
    } catch (error) {
      console.error('Error loading biomechanics items:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTitle = (item: any) => {
    return currentLanguage === 'et' ? item.titleEt || item.title_et : item.titleRu || item.title_ru;
  };

  const getDescription = (item: any) => {
    return currentLanguage === 'et' ? item.descriptionEt || item.description_et : item.descriptionRu || item.description_ru;
  };

  const getContent = (item: BiomechanicsItem) => {
    return currentLanguage === 'et' ? item.content_et : item.content_ru;
  };



  if (loading) {
    return (
      <Container>
        <div className="py-10">
          <Heading as="h1" className="">
            {currentLanguage === 'et' ? 'Laadimine...' : 'Загрузка...'}
          </Heading>
        </div>
      </Container>
    );
  }

  return (
    <>
      {/* Modal for detailed view */}
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 z-[100]">
            <div className="fixed inset-y-0 right-0 left-0 lg:left-64 grid place-items-center p-4">
              <motion.div
                layoutId={`card-${active.id}-${id}`}
                ref={ref}
                className="w-full max-w-[800px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-ivory-50 dark:bg-ivory-50 sm:rounded-3xl overflow-hidden border border-sage-200"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {active.image_url && (
                  <div>
                    <Image
                      width={800}
                      height={400}
                      src={active.image_url}
                      alt={active.title_et}
                      className="w-full h-80 lg:h-96 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-center"
                    />
                  </div>
                )}

                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start p-6">
                    <div className="flex-1">
                      <motion.h3
                        layoutId={`title-${active.id}-${id}`}
                        className="font-bold text-neutral-700 dark:text-neutral-900 text-xl mb-4"
                      >
                        {currentLanguage === 'et' ? active.title_et : active.title_ru || active.title_et}
                      </motion.h3>
                      

                    </div>

                    <motion.button
                      onClick={() => setActive(null)}
                      className="px-6 py-3 text-sm rounded-full font-bold bg-gray-200 text-gray-900 hover:bg-gray-300 transition-colors ml-4"
                    >
                      {currentLanguage === 'et' ? 'Sulge' : 'Закрыть'}
                    </motion.button>
                  </div>
                  
                  <div className="flex-1 px-6 pb-6">
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-neutral-600 text-sm md:text-base lg:text-base h-40 md:h-60 overflow-y-auto pr-2 dark:text-neutral-400"
                    >
                      {getContent(active) && (
                        <div dangerouslySetInnerHTML={{ __html: getContent(active) || '' }} />
                      )}
                      {!getContent(active) && (
                        <p>{currentLanguage === 'et' ? active.description_et : active.description_ru || active.description_et}</p>
                      )}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        ) : null}
      </AnimatePresence>

      <Container>
        <div className="mb-8">
          <Heading className="font-black mt-4">
            {currentLanguage === 'et' ? 'Soovitused' : 'Рекомендации'}
          </Heading>
          <Paragraph className="max-w-2xl mt-4">
            {currentLanguage === 'et' 
              ? 'Uurige jala biomehaanika põhialuseid ja õppige, kuidas parandada oma jalgade tervist läbi õigete harjutuste, hügieeni ja kehalisuse.' 
              : 'Изучите основы биомеханики стопы и узнайте, как улучшить здоровье ваших ног через правильные упражнения, гигиену и физическую активность.'
            }
          </Paragraph>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {Object.entries(CATEGORY_INFO).map(([categoryKey, categoryInfo]) => {
            const category = categoryKey as BiomechanicsCategory;
            const itemCount = itemsByCategory[category].length;
            
            return (
              <div
                key={category}
                className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedCategory === category 
                    ? categoryInfo.color 
                    : 'bg-ivory-50 border-sage-200 hover:border-poppy-300'
                }`}
                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              >
                <div className="flex flex-col items-center text-center">
                  <categoryInfo.icon className="h-12 w-12 mb-4" />
                  <Heading as="h3" className="text-xl font-bold mb-2">
                    {getTitle(categoryInfo)}
                  </Heading>
                  <Paragraph className="text-sm mb-2">
                    {getDescription(categoryInfo)}
                  </Paragraph>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Category Details */}
        {selectedCategory && (
          <div className="mt-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
                             <div className="flex items-center mb-6">
                 {(() => {
                   const CategoryIcon = CATEGORY_INFO[selectedCategory].icon;
                   return <CategoryIcon className="h-8 w-8 mr-3 text-gray-600" />;
                 })()}
                 <Heading as="h2" className="text-2xl font-bold">
                   {getTitle(CATEGORY_INFO[selectedCategory])}
                 </Heading>
               </div>
              
              {itemsByCategory[selectedCategory].length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  {currentLanguage === 'et' 
                    ? 'Selles kategoorias pole veel materjale' 
                    : 'В этой категории пока нет материалов'
                  }
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {itemsByCategory[selectedCategory].map((item) => (
                    <motion.div
                      key={item.id}
                      layoutId={`card-${item.id}-${id}`}
                      onClick={() => setActive(item)}
                      className="border border-sage-200 rounded-lg p-6 cursor-pointer hover:shadow-md hover:border-poppy-300 transition-all bg-ivory-50"
                    >
                      {item.image_url && (
                        <div className="mb-4">
                          <Image
                            width={300}
                            height={200}
                            src={item.image_url}
                            alt={item.title_et}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        </div>
                      )}
                      
                      <motion.h4 
                        layoutId={`title-${item.id}-${id}`}
                        className="text-lg font-semibold mb-3"
                      >
                        {currentLanguage === 'et' ? item.title_et : item.title_ru || item.title_et}
                      </motion.h4>
                      
                      <Paragraph className="text-gray-600 text-sm mb-4">
                        {currentLanguage === 'et' ? item.description_et : item.description_ru || item.description_et}
                      </Paragraph>
                      

                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {!selectedCategory && items.length === 0 && (
          <div className="text-center mt-12 p-8 bg-gray-50 rounded-xl">
            <IconActivity className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <Paragraph className="text-gray-600">
              {currentLanguage === 'et' 
                ? 'Materjale pole veel lisatud' 
                : 'Материалы еще не добавлены'
              }
            </Paragraph>
          </div>
        )}

        {!selectedCategory && items.length > 0 && (
          <div className="text-center mt-12 p-8 bg-gray-50 rounded-xl">
            <IconActivity className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <Paragraph className="text-gray-600">
              {currentLanguage === 'et' 
                ? 'Valige kategooria, et näha rohkem teavet ja soovitusi.' 
                : 'Выберите категорию, чтобы увидеть больше информации и рекомендаций.'
              }
            </Paragraph>
          </div>
        )}
      </Container>
    </>
  );
} 