'use client';

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { reviewService } from "@/lib/reviews";
import { Review } from "@/types/review";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { IconStar } from "@tabler/icons-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arvustused | Alla Hüvenen - Podoloog Tartus | Klientide tagasiside",
  description: "Lugege klientide arvustusi podoloog Alla Hüveneni kohta Tartus. Professionaalne teenindus, positiivsed kogemused probleemse pediküüri ja jalgade raviga. Отзывы о подологе в Тарту.",
  keywords: [
    "podoloog arvustused Tartu",
    "Alla Hüvenen arvustused", 
    "klientide tagasiside",
    "positiivsed kogemused",
    "professionaalne teenindus",
    "отзывы подолог Тарту",
    "отзывы клиентов"
  ],
  openGraph: {
    title: "Arvustused | Alla Hüvenen - Podoloog Tartus",
    description: "Lugege klientide arvustusi podoloog Alla Hüveneni kohta Tartus. Professionaalne teenindus ja positiivsed kogemused.",
    type: "website",
    url: "https://podoloog.ee/reviews",
  },
  alternates: {
    canonical: "https://podoloog.ee/reviews",
  },
};

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
          <Heading as="h1" className="text-center">
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
          <Heading as="h1" className="text-center mb-8">
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
          <Heading as="h1" className="text-center">
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
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-200 min-h-[240px] flex flex-col"
              >
                {/* Rating
                <div className="mb-4">
                  {renderStars(review.rating)}
                </div> */}

                {/* Content */}
                <blockquote className="text-gray-700 leading-relaxed text-center flex-grow flex items-center justify-center">
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