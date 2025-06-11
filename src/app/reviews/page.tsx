'use client';

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { reviewService } from "@/lib/reviews";
import { Review } from "@/types/review";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";
import { IconStar, IconUser, IconMessage } from "@tabler/icons-react";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string>('');
  const { currentLanguage } = useLanguage();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    content: ''
  });

  // Temporary mock data for testing
  const mockReviews: Review[] = [
    {
      id: '1',
      content: 'Suurepärane teenindus ja professionaalne lähenemine. Soovitan soojalt!',
      content_et: 'Suurepärane teenindus ja professionaalne lähenemine. Soovitan soojalt!',
      content_ru: 'Отличное обслуживание и профессиональный подход. Горячо рекомендую!',
      rating: 5,
      published: true,
      author_id: 'test'
    },
    {
      id: '2',
      content: 'Väga hea kogemus, aitäh professionaalse abi eest!',
      content_et: 'Väga hea kogemus, aitäh professionaalse abi eest!',
      content_ru: 'Очень хороший опыт, спасибо за профессиональную помощь!',
      rating: 5,
      published: true,
      author_id: 'test'
    },
    {
      id: '3',
      content: 'Täiuslik teenindus ja sõbralik personal. Tulen kindlasti tagasi!',
      content_et: 'Täiuslik teenindus ja sõbralik personal. Tulen kindlasti tagasi!',
      content_ru: 'Идеальное обслуживание и дружелюбный персонал. Обязательно вернусь!',
      rating: 5,
      published: true,
      author_id: 'test'
    },
    {
      id: '4',
      content: 'Väga professionaalne ja asjatundlik. Soovitan kõigile!',
      content_et: 'Väga professionaalne ja asjatundlik. Soovitan kõigile!',
      content_ru: 'Очень профессионально и компетентно. Рекомендую всем!',
      rating: 4,
      published: true,
      author_id: 'test'
    },
    {
      id: '5',
      content: 'Olen väga rahul tulemustega. Aitäh!',
      content_et: 'Olen väga rahul tulemustega. Aitäh!',
      content_ru: 'Очень доволен результатами. Спасибо!',
      rating: 5,
      published: true,
      author_id: 'test'
    }
  ];

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const data = await reviewService.getPublishedReviews();
      setReviews(data.length > 0 ? data : mockReviews);
    } catch (error) {
      console.error('Error loading reviews:', error);
      setReviews(mockReviews);
    } finally {
      setLoading(false);
    }
  };

  const getLocalizedContent = (review: Review) => {
    if (currentLanguage === 'et' && review.content_et) return review.content_et;
    if (currentLanguage === 'ru' && review.content_ru) return review.content_ru;
    return review.content;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage('');

    try {
      // Create a public review submission
      const reviewData = {
        content: formData.content,
        author_name: formData.name
      };

      await submitPublicReview(reviewData);
      
      setSubmitMessage(
        currentLanguage === 'et' 
          ? 'Aitäh arvustuse eest! Teie arvustus on nüüd avaldatud.'
          : 'Спасибо за отзыв! Ваш отзыв теперь опубликован.'
      );
      
      // Reset form
      setFormData({
        name: '',
        content: ''
      });
      
      setShowForm(false);
      
      // Reload reviews to show the new one
      await loadReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
      setSubmitMessage(
        currentLanguage === 'et' 
          ? 'Viga arvustuse saatmisel. Palun proovige uuesti.'
          : 'Ошибка при отправке отзыва. Пожалуйста, попробуйте снова.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const submitPublicReview = async (reviewData: any) => {
    try {
      console.log('🚀 Отправка отзыва:', reviewData);
      
      const response = await fetch('/api/reviews/public', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      const result = await response.json();
      console.log('📥 Ответ от сервера:', result);

      if (!response.ok) {
        // More detailed error handling
        let errorMessage = result.error || 'Failed to submit review';
        
        if (result.code === 'TABLE_NOT_FOUND') {
          errorMessage = currentLanguage === 'et' 
            ? 'Andmebaas pole seadistatud. Võtke ühendust administraatoriga.'
            : 'База данных не настроена. Обратитесь к администратору.';
        } else if (result.code === 'PERMISSION_DENIED') {
          errorMessage = currentLanguage === 'et' 
            ? 'Juurdepääs keelatud. Võtke ühendust administraatoriga.'
            : 'Доступ запрещен. Обратитесь к администратору.';
        } else if (result.code === 'SCHEMA_ERROR') {
          errorMessage = currentLanguage === 'et' 
            ? 'Andmebaasi struktuur on vigane. Võtke ühendust administraatoriga.'
            : 'Структура базы данных некорректна. Обратитесь к администратору.';
        } else if (result.details) {
          // Show details in development
          if (process.env.NODE_ENV === 'development') {
            errorMessage += ` (${result.details})`;
          }
        }
        
        throw new Error(errorMessage);
      }

      return result;
    } catch (error) {
      console.error('❌ Ошибка при отправке отзыва:', error);
      throw error;
    }
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
    <Container>
      <div className="py-0">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <Heading as="h1" className="font-black">
            {currentLanguage === 'et' ? 'Arvustused' : 'Отзывы'}
          </Heading>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-poppy-500 hover:bg-poppy-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            {currentLanguage === 'et' ? 'Jäta arvustus' : 'Оставить отзыв'}
          </button>
        </div>

        {/* Review Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8 glass-effect rounded-xl p-6"
          >
            <Heading as="h2" className="font-bold text-lg mb-4">
              {currentLanguage === 'et' ? 'Jäta oma arvustus' : 'Оставьте свой отзыв'}
            </Heading>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-sage-800 mb-1">
                  <IconUser className="inline h-4 w-4 mr-1" />
                  {currentLanguage === 'et' ? 'Nimi' : 'Имя'}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-sage-300 rounded-md focus:outline-none focus:ring-2 focus:ring-poppy-500"
                  placeholder={currentLanguage === 'et' ? 'Teie nimi' : 'Ваше имя'}
                />
              </div>

              {/* Review Content */}
              <div>
                <label className="block text-sm font-medium text-sage-800 mb-1">
                  <IconMessage className="inline h-4 w-4 mr-1" />
                  {currentLanguage === 'et' ? 'Arvustus' : 'Отзыв'}
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  rows={4}
                  required
                  className="w-full px-3 py-2 border border-sage-300 rounded-md focus:outline-none focus:ring-2 focus:ring-poppy-500"
                  placeholder={currentLanguage === 'et' ? 'Kirjutage oma kogemus...' : 'Напишите ваш опыт...'}
                />
              </div>

              {/* Submit buttons */}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-sage-700 border border-sage-300 rounded-md hover:bg-sage-50 transition-colors"
                >
                  {currentLanguage === 'et' ? 'Tühista' : 'Отмена'}
                </button>
                <button
                  type="submit"
                  disabled={submitting || !formData.content.trim() || !formData.name.trim()}
                  className="px-6 py-2 bg-poppy-500 text-white rounded-md hover:bg-poppy-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {submitting 
                    ? (currentLanguage === 'et' ? 'Saadan...' : 'Отправляю...') 
                    : (currentLanguage === 'et' ? 'Saada arvustus' : 'Отправить отзыв')
                  }
                </button>
              </div>
            </form>

            {/* Submit Message */}
            {submitMessage && (
              <div className={`mt-4 p-3 rounded-md ${
                submitMessage.includes('Viga') || submitMessage.includes('Ошибка')
                  ? 'bg-red-100 text-red-700'
                  : 'bg-green-100 text-green-700'
              }`}>
                {submitMessage}
              </div>
            )}
          </motion.div>
        )}

        {/* Reviews Display */}
        {reviews.length === 0 ? (
          <div className="text-center text-gray-600 py-8">
            {currentLanguage === 'et' ? 'Arvustusi ei leitud' : 'Отзывы не найдены'}
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-effect rounded-xl p-6 hover:shadow-xl transition-all duration-200 min-h-[240px] flex flex-col"
                >
                  {/* Content */}
                  <blockquote className="text-sage-700 leading-relaxed text-center flex-grow flex items-center justify-center">
                    &ldquo;{getLocalizedContent(review)}&rdquo;
                  </blockquote>
                  
                  {/* Author name and date for public reviews */}
                  {review.author_name && (
                    <div className="mt-4 text-center text-sm text-sage-600 border-t border-sage-200 pt-3">
                      <div>— {review.author_name}</div>
                      {review.created_at && (
                        <div className="text-xs text-sage-500 mt-1">
                          {new Date(review.created_at).toLocaleDateString(currentLanguage === 'et' ? 'et-EE' : 'ru-RU', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
} 