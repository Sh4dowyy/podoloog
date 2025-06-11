export interface Review {
  id: string;
  content: string;
  content_et?: string;
  content_ru?: string;
  rating: number; // 1-5 звезд
  published: boolean;
  author_id: string;
  author_name?: string; // For public reviews
  created_at?: string;
  updated_at?: string;
}

export interface CreateReviewData {
  content: string;
  content_et?: string;
  content_ru?: string;
  rating: number;
  published: boolean;
  author_name?: string; // For public reviews
}

export interface UpdateReviewData extends Partial<CreateReviewData> {
  id: string;
} 