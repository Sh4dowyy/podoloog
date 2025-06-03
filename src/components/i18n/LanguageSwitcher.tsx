"use client";
import React, { useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { Language, getLanguageFlag, getLanguageName } from '@/lib/i18n';
import { IconChevronDown } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages: Language[] = ['et', 'ru'];

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative z-[200]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 text-sm bg-white border border-neutral-200 rounded-md hover:bg-neutral-50 transition-colors relative z-[201]"
      >
        <div className="flex items-center space-x-2 min-w-0">
          <span className="text-lg flex-shrink-0">{getLanguageFlag(currentLanguage)}</span>
          <span className="text-secondary truncate">{getLanguageName(currentLanguage)}</span>
        </div>
        <IconChevronDown 
          className={`h-4 w-4 text-secondary transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-1 left-0 w-full bg-white border border-neutral-200 rounded-md shadow-lg z-[202]"
          >
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-neutral-50 transition-colors first:rounded-t-md last:rounded-b-md relative z-[203] ${
                  currentLanguage === lang ? 'bg-neutral-100' : ''
                }`}
              >
                <span className="text-lg flex-shrink-0">{getLanguageFlag(lang)}</span>
                <span className="text-secondary truncate">{getLanguageName(lang)}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[199]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}; 