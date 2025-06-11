import { supabase, createSupabaseBrowserClient } from '@/lib/supabase';
import { BrandProduct, CreateBrandProductData, UpdateBrandProductData } from '@/types/brand-product';

export class BrandProductsService {
  // Получить клиент Supabase (приоритет - браузерный клиент для аутентификации)
  private static getClient() {
    const browserClient = createSupabaseBrowserClient();
    return browserClient || supabase;
  }

  // Получить все продукты бренда
  static async getBrandProducts(brandId: string): Promise<BrandProduct[]> {
    try {
      const client = this.getClient();
      if (!client) throw new Error('Supabase client not initialized');
      
      const { data, error } = await client
        .from('brand_products')
        .select('*')
        .eq('brand_id', brandId)
        .eq('published', true)
        .order('name', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching brand products:', error);
      throw error;
    }
  }

  // Получить все продукты бренда (для админки)
  static async getAllBrandProducts(brandId: string): Promise<BrandProduct[]> {
    try {
      const client = this.getClient();
      if (!client) throw new Error('Supabase client not initialized');
      
      const { data, error } = await client
        .from('brand_products')
        .select('*')
        .eq('brand_id', brandId)
        .order('name', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching all brand products:', error);
      throw error;
    }
  }

  // Получить продукт по ID
  static async getBrandProductById(id: string): Promise<BrandProduct | null> {
    try {
      const client = this.getClient();
      if (!client) throw new Error('Supabase client not initialized');
      
      const { data, error } = await client
        .from('brand_products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching brand product by id:', error);
      throw error;
    }
  }

  // Создать новый продукт
  static async createBrandProduct(productData: CreateBrandProductData): Promise<BrandProduct> {
    try {
      const client = this.getClient();
      if (!client) throw new Error('Supabase client not initialized');
      
      console.log('Creating brand product with data:', productData);
      
      const { data, error } = await client
        .from('brand_products')
        .insert([productData])
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(`Database error: ${error.message} (Code: ${error.code})`);
      }
      
      console.log('Created brand product:', data);
      return data;
    } catch (error) {
      console.error('Error creating brand product:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unknown error occurred while creating brand product');
    }
  }

  // Обновить продукт
  static async updateBrandProduct(productData: UpdateBrandProductData): Promise<BrandProduct> {
    try {
      const client = this.getClient();
      if (!client) throw new Error('Supabase client not initialized');
      
      const { id, ...updateData } = productData;
      const { data, error } = await client
        .from('brand_products')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating brand product:', error);
      throw error;
    }
  }

  // Удалить продукт
  static async deleteBrandProduct(id: string): Promise<void> {
    try {
      const client = this.getClient();
      if (!client) throw new Error('Supabase client not initialized');
      
      const { error } = await client
        .from('brand_products')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting brand product:', error);
      throw error;
    }
  }

  // Переключить статус публикации
  static async togglePublished(id: string, published: boolean): Promise<BrandProduct> {
    try {
      const client = this.getClient();
      if (!client) throw new Error('Supabase client not initialized');
      
      const { data, error } = await client
        .from('brand_products')
        .update({ published })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error toggling published status:', error);
      throw error;
    }
  }

  // Переключить статус "рекомендуемый"
  static async toggleFeatured(id: string, isFeatured: boolean): Promise<BrandProduct> {
    try {
      const client = this.getClient();
      if (!client) throw new Error('Supabase client not initialized');
      
      const { data, error } = await client
        .from('brand_products')
        .update({ is_featured: isFeatured })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error toggling featured status:', error);
      throw error;
    }
  }

  // Получить рекомендуемые продукты
  static async getFeaturedProducts(): Promise<BrandProduct[]> {
    try {
      const client = this.getClient();
      if (!client) throw new Error('Supabase client not initialized');
      
      const { data, error } = await client
        .from('brand_products')
        .select('*')
        .eq('published', true)
        .eq('is_featured', true)
        .order('name', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }
  }

  // Получить продукты по категории
  static async getProductsByCategory(category: string): Promise<BrandProduct[]> {
    try {
      const client = this.getClient();
      if (!client) throw new Error('Supabase client not initialized');
      
      const { data, error } = await client
        .from('brand_products')
        .select('*')
        .eq('published', true)
        .eq('category', category)
        .order('name', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  }
} 