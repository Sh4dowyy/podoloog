'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { GalleryItem } from "@/types/gallery";
import Image from "next/image";
import { IconX } from "@tabler/icons-react";
import { lockScroll, unlockScroll } from "@/utils/scrollLock";

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const { currentLanguage } = useLanguage();

  // Fetch gallery items
  useEffect(() => {
    fetchGalleryItems();
  }, []);

  // Manage scroll when modal is open
  useEffect(() => {
    if (selectedImage) {
      lockScroll();
    } else {
      unlockScroll();
    }
    
    // Cleanup on unmount
    return () => {
      unlockScroll();
    };
  }, [selectedImage]);

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/gallery');
      const data = await response.json();
      
      if (data.success) {
        setGalleryItems(data.data);
      }
    } catch (error) {
      console.error('Error fetching gallery items:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTitle = (item: GalleryItem) => {
    return currentLanguage === 'et' ? item.title : item.title_ru;
  };

  const getDescription = (item: GalleryItem) => {
    return currentLanguage === 'et' ? item.description : item.description_ru;
  };

  return (
    <>
      {/* Modal for enlarged image */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] bg-white rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
              >
                <IconX className="h-5 w-5" />
              </button>
              
              <Image
                src={selectedImage.image_url}
                alt={getTitle(selectedImage)}
                width={800}
                height={600}
                className="w-full h-auto object-contain"
              />
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{getTitle(selectedImage)}</h3>
                <p className="text-gray-600">{getDescription(selectedImage)}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Container>
        <div className="py-0">
          {/* Header */}
          <div className="mb-8">
            <Heading as="h1" className="font-black mb-4">
              {currentLanguage === 'et' ? 'Galerii' : 'Галерея'}
            </Heading>
            <Paragraph className="max-w-2xl text-lg">
              {currentLanguage === 'et' 
                ? 'Tutvu meie professionaalse töökeskkonna ja teenustega läbi fotogalerii. Näed kvaliteetseid tööriistu ja puhtaid ruume.'
                : 'Ознакомьтесь с нашей профессиональной рабочей средой и услугами через фотогалерею. Вы увидите качественные инструменты и чистые помещения.'
              }
            </Paragraph>
          </div>



          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-poppy-500"></div>
            </div>
          )}

          {/* Empty State */}
          {!loading && galleryItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-sage-600 text-lg">
                {currentLanguage === 'et' 
                  ? 'Galerii on tühi või vastavaid pilte ei leitud.'
                  : 'Галерея пуста или не найдено подходящих изображений.'}
              </p>
            </div>
          )}

          {/* Gallery Grid */}
          {!loading && galleryItems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {galleryItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedImage(item)}
                >
                  <div className="relative overflow-hidden rounded-xl bg-ivory-100 aspect-square hover:shadow-xl transition-all duration-300 border border-sage-200 hover:border-poppy-300">
                    <Image
                      src={item.image_url}
                      alt={getTitle(item)}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    

                    

                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end">
                      <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="font-semibold text-sm mb-1">{getTitle(item)}</h3>
                        {getDescription(item) && (
                          <p className="text-xs opacity-90">{getDescription(item)}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </>
  );
} 