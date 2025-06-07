'use client';

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { reviewService } from "@/lib/reviews";
import { Review } from "@/types/review";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { IconStar } from "@tabler/icons-react";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentLanguage } = useLanguage();

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

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center justify-center space-x-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <IconStar
            key={i}
            className={`h-5 w-5 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <Container>
        <div className="py-10">
          <Heading as="h1" className="">
            Загрузка...
          </Heading>
        </div>
      </Container>
    );
  }

  if (reviews.length === 0) {
    return (
      <Container>
        <div className="py-10">
          <Heading as="h1" className="font-black mb-8">
            {currentLanguage === 'et' ? 'Arvustused' : 'Отзывы'}
          </Heading>
          <div className="text-center text-gray-600">
            {currentLanguage === 'et' ? 'Arvustusi ei leitud' : 'Отзывы не найдены'}
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="py-0">
        {/* Header */}
        <div className="mb-8">
          <Heading as="h1" className="font-black">
            {currentLanguage === 'et' ? 'Arvustused' : 'Отзывы'}
          </Heading>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-ivory-50 rounded-xl shadow-lg border border-sage-200 p-6 hover:shadow-xl hover:border-poppy-300 transition-all duration-200 min-h-[240px] flex flex-col"
              >
                {/* Rating
                <div className="mb-4">
                  {renderStars(review.rating)}
                </div> */}

                {/* Content */}
                <blockquote className="text-sage-700 leading-relaxed text-center flex-grow flex items-center justify-center">
                  &ldquo;{getLocalizedContent(review)}&rdquo;
                </blockquote>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
} 