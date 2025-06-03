import { createSupabaseBrowserClient } from './supabase';
import { BlogPost, CreateBlogPostData, UpdateBlogPostData } from '@/types/blog';

export class BlogService {
  private supabase = createSupabaseBrowserClient();

  async getAllPosts(): Promise<BlogPost[]> {
    if (!this.supabase) return [];
    
    const { data, error } = await this.supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }

    return data || [];
  }

  async getPublishedPosts(): Promise<BlogPost[]> {
    if (!this.supabase) return [];
    
    const { data, error } = await this.supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching published blog posts:', error);
      return [];
    }

    return data || [];
  }

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    if (!this.supabase) return null;
    
    const { data, error } = await this.supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }

    return data;
  }

  async createPost(postData: CreateBlogPostData): Promise<BlogPost | null> {
    if (!this.supabase) return null;
    
    const { data: userData } = await this.supabase.auth.getUser();
    if (!userData.user) throw new Error('User not authenticated');

    const { data, error } = await this.supabase
      .from('blog_posts')
      .insert([{ ...postData, author_id: userData.user.id }])
      .select()
      .single();

    if (error) {
      console.error('Error creating blog post:', error);
      throw error;
    }

    return data;
  }

  async updatePost(postData: UpdateBlogPostData): Promise<BlogPost | null> {
    if (!this.supabase) return null;
    
    const { id, ...updateData } = postData;
    const { data, error } = await this.supabase
      .from('blog_posts')
      .update({ ...updateData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating blog post:', error);
      throw error;
    }

    return data;
  }

  async deletePost(id: string): Promise<boolean> {
    if (!this.supabase) return false;
    
    const { error } = await this.supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting blog post:', error);
      throw error;
    }

    return true;
  }

  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}

export const blogService = new BlogService(); 