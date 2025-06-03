'use client';

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { blogService } from "@/lib/blog";
import { BlogPost } from "@/types/blog";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import Image from "next/image";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<BlogPost | boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const { t, currentLanguage } = useLanguage();

  useEffect(() => {
    loadPosts();
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

  const loadPosts = async () => {
    try {
      const data = await blogService.getPublishedPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLocalizedTitle = (post: BlogPost) => {
    if (currentLanguage === 'et' && post.title_et) return post.title_et;
    if (currentLanguage === 'ru' && post.title_ru) return post.title_ru;
    return post.title;
  };

  const getLocalizedDescription = (post: BlogPost) => {
    if (currentLanguage === 'et' && post.description_et) return post.description_et;
    if (currentLanguage === 'ru' && post.description_ru) return post.description_ru;
    return post.description;
  };

  const getLocalizedContent = (post: BlogPost) => {
    if (currentLanguage === 'et' && post.content_et) return post.content_et;
    if (currentLanguage === 'ru' && post.content_ru) return post.content_ru;
    return post.content;
  };

  if (loading) {
    return (
      <Container>
        <div className="py-10">
          <Heading as="h1" className="text-center">
            {t('loading')}
          </Heading>
        </div>
      </Container>
    );
  }

  return (
    <>
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
              <motion.button
                key={`button-${active.title}-${id}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                onClick={() => setActive(null)}
              >
                <CloseIcon />
              </motion.button>
              <motion.div
                layoutId={`card-${active.title}-${id}`}
                ref={ref}
                className="w-full max-w-[800px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-white sm:rounded-3xl overflow-hidden"
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
                      alt={getLocalizedTitle(active)}
                      className="w-full h-60 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                    />
                  </div>
                )}

                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start p-6">
                    <div className="flex-1">
                      <motion.h3
                        layoutId={`title-${active.title}-${id}`}
                        className="font-bold text-neutral-700 dark:text-neutral-800 text-xl mb-2"
                      >
                        {getLocalizedTitle(active)}
                      </motion.h3>
                    </div>

                    <motion.button
                      layoutId={`button-${active.title}-${id}`}
                      onClick={() => setActive(null)}
                      className="px-6 py-3 text-sm rounded-full font-bold bg-gray-100 hover:bg-gray-200 hover:text-gray-900 text-gray-700 transition-colors ml-4"
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
                      className="text-gray-600 text-sm md:text-base lg:text-base h-60 md:h-80 overflow-y-auto pr-2 dark:text-neutral-400 [scrollbar-width:thin] [scrollbar-color:#cbd5e1_transparent] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
                    >
                      <div dangerouslySetInnerHTML={{ __html: getLocalizedContent(active) }} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        ) : null}
      </AnimatePresence>

      <Container>
        <div className="py-0">
          <Heading as="h1" className="text-center mb-8">
            {currentLanguage === 'et' ? 'Blogi' : 'Блог'}
          </Heading>

          {posts.length === 0 ? (
            <div className="text-center text-gray-600">
              {currentLanguage === 'et' ? 'Blogi postitusi ei leitud' : 'Записи блога не найдены'}
            </div>
          ) : (
            <ul className="max-w-6xl mx-auto w-full gap-6 space-y-6">
              {posts.map((post) => (
                <motion.li
                  layoutId={`card-${post.title}-${id}`}
                  key={`card-${post.title}-${id}`}
                  onClick={() => setActive(post)}
                  className="p-6 flex flex-col md:flex-row justify-between items-center rounded-xl cursor-pointer bg-white shadow-sm border border-neutral-200 transition-all duration-200"
                  whileHover={{ 
                    boxShadow: "0 10px 25px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)" // shadow-lg
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex gap-6 flex-col md:flex-row flex-1">
                    {post.image_url && (
                      <div className="overflow-hidden rounded-lg">
                        <Image
                          width={120}
                          height={120}
                          src={post.image_url}
                          alt={getLocalizedTitle(post)}
                          className="h-32 w-32 md:h-20 md:w-20 rounded-lg object-cover object-top flex-shrink-0 hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <motion.h3
                        layoutId={`title-${post.title}-${id}`}
                        className="font-semibold text-gray-900 dark:text-neutral-900 text-center md:text-left text-lg mb-3 line-clamp-2"
                      >
                        {getLocalizedTitle(post)}
                      </motion.h3>
                      <motion.p
                        layoutId={`description-${post.description}-${id}`}
                        className="text-gray-600 text-center md:text-left text-base leading-relaxed mb-2"
                      >
                        {getLocalizedDescription(post)}
                      </motion.p>
                      <p className="text-gray-500 text-sm mt-2 text-center md:text-left">
                        {new Date(post.created_at).toLocaleDateString('et-EE', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    layoutId={`button-${post.title}-${id}`}
                    className="px-6 py-3 text-sm rounded-full font-medium bg-gray-100 hover:bg-gray-200 hover:text-gray-900 text-gray-700 mt-4 md:mt-0 transition-all duration-200 flex-shrink-0"
                  >
                    {currentLanguage === 'et' ? 'Loe' : 'Читать'}
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </>
  );
}

const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};