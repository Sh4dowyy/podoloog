import { supabase } from './supabase';
import { Product } from '@/types/product';

export const productService = {
  async getProducts(): Promise<Product[]> {
    if (!supabase) {
      throw new Error('Supabase client not initialized');
    }
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      throw error;
    }

    return data || [];
  },

  async getPublishedProducts(): Promise<Product[]> {
    if (!supabase) {
      throw new Error('Supabase client not initialized');
    }
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching published products:', error);
      throw error;
    }

    return data || [];
  },

  async getProduct(id: string): Promise<Product | null> {
    if (!supabase) {
      throw new Error('Supabase client not initialized');
    }
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      return null;
    }

    return data;
  },

  async createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
    if (!supabase) {
      throw new Error('Supabase client not initialized');
    }
    
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single();

    if (error) {
      console.error('Error creating product:', error);
      throw error;
    }

    return data;
  },

  // Create minimal brand (firm) by name only
  async createBrand(name: string): Promise<Product> {
    if (!supabase) {
      throw new Error('Supabase client not initialized');
    }

    const payload = {
      name,
      description: '',
      published: true,
    } as Omit<Product, 'id' | 'created_at' | 'updated_at'>;

    const { data, error } = await supabase
      .from('products')
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error('Error creating brand:', error);
      throw error;
    }

    return data as Product;
  },

  async updateProduct(id: string, updates: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>): Promise<Product> {
    if (!supabase) {
      throw new Error('Supabase client not initialized');
    }
    
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating product:', error);
      throw error;
    }

    return data;
  },

  async deleteProduct(id: string): Promise<void> {
    if (!supabase) {
      throw new Error('Supabase client not initialized');
    }
    
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  async togglePublished(id: string, published: boolean): Promise<Product> {
    return this.updateProduct(id, { published });
  },
}; 