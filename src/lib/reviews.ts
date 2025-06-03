import { createSupabaseBrowserClient } from './supabase';
import { Review, CreateReviewData, UpdateReviewData } from '@/types/review';

export class ReviewService {
  private supabase = createSupabaseBrowserClient();

  async getAllReviews(): Promise<Review[]> {
    if (!this.supabase) return [];
    
    const { data, error } = await this.supabase
      .from('reviews')
      .select('*')
      .order('rating', { ascending: false });

    if (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }

    return data || [];
  }

  async getPublishedReviews(): Promise<Review[]> {
    if (!this.supabase) return [];
    
    const { data, error } = await this.supabase
      .from('reviews')
      .select('*')
      .eq('published', true)
      .order('rating', { ascending: false });

    if (error) {
      console.error('Error fetching published reviews:', error);
      return [];
    }

    return data || [];
  }

  async createReview(reviewData: CreateReviewData): Promise<Review | null> {
    if (!this.supabase) return null;
    
    const { data: userData } = await this.supabase.auth.getUser();
    if (!userData.user) throw new Error('User not authenticated');

    const { data, error } = await this.supabase
      .from('reviews')
      .insert([{ ...reviewData, author_id: userData.user.id }])
      .select()
      .single();

    if (error) {
      console.error('Error creating review:', error);
      throw error;
    }

    return data;
  }

  async updateReview(reviewData: UpdateReviewData): Promise<Review | null> {
    if (!this.supabase) return null;
    
    const { id, ...updateData } = reviewData;
    const { data, error } = await this.supabase
      .from('reviews')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating review:', error);
      throw error;
    }

    return data;
  }

  async deleteReview(id: string): Promise<boolean> {
    if (!this.supabase) return false;
    
    const { error } = await this.supabase
      .from('reviews')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting review:', error);
      throw error;
    }

    return true;
  }
}

export const reviewService = new ReviewService(); 