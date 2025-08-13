'use client';

import { useEffect, useState } from 'react';
import { ValuesService } from '@/lib/values';
import { Value } from '@/types/value';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';
import { WatercolorBorder } from '@/components/FloralDecorations';

export function ValuesSection() {
  const [values, setValues] = useState<Value[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    loadValues();
  }, []);

  const loadValues = async () => {
    try {
      setLoading(true);
      const data = await ValuesService.getActiveValues();
      setValues(data);
    } catch (error) {
      console.error('Error loading values:', error);
      // Fallback к статичным данным при ошибке
      setValues([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mt-0 py-12 bg-poppy-50/20 relative">
        <WatercolorBorder />
        <Heading as="h2" className="font-black text-lg md:text-xl lg:text-2xl mb-8 text-left relative z-10">
          {currentLanguage === 'et' ? 'Meie Väärtused' : 'Наши Ценности'}
        </Heading>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="glass-effect rounded-xl p-6 shadow-lg backdrop-blur-sm animate-pulse">
              <div className="h-6 bg-sage-200 rounded mb-3"></div>
              <div className="space-y-2">
                <div className="h-4 bg-sage-200 rounded"></div>
                <div className="h-4 bg-sage-200 rounded"></div>
                <div className="h-4 bg-sage-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (values.length === 0) {
    return (
      <div className="max-w-6xl mt-0 py-12 bg-poppy-50/20 relative">
        <WatercolorBorder />
        <Heading as="h2" className="font-black text-lg md:text-xl lg:text-2xl mb-8 text-left relative z-10">
          {currentLanguage === 'et' ? 'Meie Väärtused' : 'Наши Ценности'}
        </Heading>
        
        <div className="glass-effect rounded-xl p-8 text-center relative z-10">
          <Paragraph className="text-sage-600">
            {currentLanguage === 'et' 
              ? 'Väärtuseid hetkel ei kuvata.' 
              : 'Ценности в данный момент не отображаются.'
            }
          </Paragraph>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mt-0 py-12 bg-poppy-50/20 relative">
      <WatercolorBorder />
      <Heading as="h2" className="font-black text-lg md:text-xl lg:text-2xl mb-8 text-left relative z-10">
        {currentLanguage === 'et' ? 'Meie Väärtused' : 'Наши Ценности'}
      </Heading>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {values.map((value) => (
          <div 
            key={value.id} 
            className="glass-effect rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
          >
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-3">{value.icon}</span>
              <h3 className="text-lg font-bold text-sage-800">
                {currentLanguage === 'et' ? value.title_et : value.title_ru}
              </h3>
            </div>
            <Paragraph className="text-sm">
              {currentLanguage === 'et' ? value.description_et : value.description_ru}
            </Paragraph>
          </div>
        ))}
      </div>
    </div>
  );
} 