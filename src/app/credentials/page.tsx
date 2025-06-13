'use client';

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { credentialService } from "@/lib/credentials";
import { Credential } from "@/types/credential";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import Image from "next/image";
import { lockScroll, unlockScroll } from "@/utils/scrollLock";

export default function CredentialsPage() {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<Credential | boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const { t, currentLanguage } = useLanguage();

  // Manage scroll when modal is open
  useEffect(() => {
    if (active && typeof active === "object") {
      lockScroll();
    } else {
      unlockScroll();
    }
    
    // Cleanup on unmount
    return () => {
      unlockScroll();
    };
  }, [active]);

  useEffect(() => {
    loadCredentials();
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const loadCredentials = async () => {
    try {
      const data = await credentialService.getPublishedCredentials();
      setCredentials(data);
    } catch (error) {
      console.error('Error loading credentials:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLocalizedTitle = (credential: Credential) => {
    if (currentLanguage === 'et' && credential.title_et) return credential.title_et;
    if (currentLanguage === 'ru' && credential.title_ru) return credential.title_ru;
    return credential.title_et; // Fallback to Estonian as it's required
  };

  const getLocalizedDescription = (credential: Credential) => {
    if (currentLanguage === 'et' && credential.description_et) return credential.description_et;
    if (currentLanguage === 'ru' && credential.description_ru) return credential.description_ru;
    return credential.description_et || '';
  };

  if (loading) {
    return (
      <Container>
        <div className="py-10">
          <Heading as="h1" className="">
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
                key={`button-${active.title_et}-${id}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                className="flex absolute top-2 right-2 items-center justify-center bg-white rounded-full h-8 w-8 shadow-lg hover:bg-gray-100 transition-colors z-10"
                onClick={() => setActive(null)}
              >
                <CloseIcon />
              </motion.button>
              <motion.div
                layoutId={`card-${active.title_et}-${id}`}
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
                      height={600}
                      src={active.image_url}
                      alt={getLocalizedTitle(active)}
                      className="w-full h-80 lg:h-96 sm:rounded-tr-lg sm:rounded-tl-lg object-contain object-center bg-gray-50"
                    />
                  </div>
                )}

                <div className="flex-1 flex flex-col">
                  <div className="p-6">
                      <motion.h3
                        layoutId={`title-${active.title_et}-${id}`}
                        className="font-bold text-neutral-700 dark:text-neutral-900 text-xl mb-2"
                      >
                        {getLocalizedTitle(active)}
                      </motion.h3>
                  </div>
                  {getLocalizedDescription(active) && (
                    <div className="flex-1 px-6 pb-6">
                      <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-neutral-600 text-sm md:text-base lg:text-base h-40 md:h-60 overflow-y-auto pr-2 dark:text-neutral-400 [scrollbar-width:thin] [scrollbar-color:#cbd5e1_transparent] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
                      >
                        <div dangerouslySetInnerHTML={{ __html: getLocalizedDescription(active) }} />
                      </motion.div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        ) : null}
      </AnimatePresence>

      <Container>
        <div className="py-0">
          <Heading as="h1" className="font-black mb-8">
            {t('credentials')}
          </Heading>
          
          {credentials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {currentLanguage === 'et' ? 'Diplomid ei ole veel lisatud' : 'Дипломы еще не добавлены'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {credentials.map((credential) => (
                <motion.div
                  layoutId={`card-${credential.title_et}-${id}`}
                  key={credential.id}
                  onClick={() => setActive(credential)}
                  className="p-6 glass-effect rounded-xl cursor-pointer hover:shadow-md transition-all duration-200"
                >
                  {credential.image_url && (
                    <div className="mb-4">
                      <Image
                        width={300}
                        height={200}
                        src={credential.image_url}
                        alt={getLocalizedTitle(credential)}
                        className="w-full h-48 object-contain object-center bg-gray-50 rounded-lg"
                      />
                    </div>
                  )}
                  
                  <motion.h3
                    layoutId={`title-${credential.title_et}-${id}`}
                    className="font-bold text-sage-900 text-lg mb-2"
                  >
                    {getLocalizedTitle(credential)}
                  </motion.h3>
                  
                  {getLocalizedDescription(credential) && (
                    <p className="text-sage-600 text-sm line-clamp-2">
                      {getLocalizedDescription(credential).substring(0, 100)}...
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
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