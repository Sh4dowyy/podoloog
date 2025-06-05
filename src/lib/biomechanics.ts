import { supabaseClient } from '@/lib/supabase-client';
import { BiomechanicsItem, BiomechanicsCategory } from '@/types/biomechanics';

export const biomechanicsService = {
  // Получить все опубликованные материалы
  async getPublishedItems(): Promise<BiomechanicsItem[]> {
    const { data, error } = await supabaseClient
      .from('biomechanics')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching published biomechanics:', error);
      throw error;
    }

    return data || [];
  },

  // Получить материалы по категории (опубликованные)
  async getPublishedItemsByCategory(category: BiomechanicsCategory): Promise<BiomechanicsItem[]> {
    const { data, error } = await supabaseClient
      .from('biomechanics')
      .select('*')
      .eq('category', category)
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching biomechanics by category:', error);
      throw error;
    }

    return data || [];
  },

  // Получить все материалы (для админки)
  async getAllItems(): Promise<BiomechanicsItem[]> {
    const { data, error } = await supabaseClient
      .from('biomechanics')
      .select('*')
      .order('category', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all biomechanics:', error);
      throw error;
    }

    return data || [];
  },

  // Получить материал по ID
  async getItemById(id: string): Promise<BiomechanicsItem | null> {
    const { data, error } = await supabaseClient
      .from('biomechanics')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching biomechanics item:', error);
      return null;
    }

    return data;
  },

  // Создать новый материал
  async createItem(item: Omit<BiomechanicsItem, 'id' | 'created_at' | 'updated_at'>): Promise<BiomechanicsItem | null> {
    const { data, error } = await supabaseClient
      .from('biomechanics')
      .insert([item])
      .select()
      .single();

    if (error) {
      console.error('Error creating biomechanics item:', error);
      throw error;
    }

    return data;
  },

  // Обновить материал
  async updateItem(id: string, updates: Partial<BiomechanicsItem>): Promise<BiomechanicsItem | null> {
    const { data, error } = await supabaseClient
      .from('biomechanics')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating biomechanics item:', error);
      throw error;
    }

    return data;
  },

  // Удалить материал
  async deleteItem(id: string): Promise<boolean> {
    const { error } = await supabaseClient
      .from('biomechanics')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting biomechanics item:', error);
      return false;
    }

    return true;
  },

  // Загрузить изображение в Supabase Storage
  async uploadImage(file: File, folder: string = 'biomechanics'): Promise<string | null> {
    console.log('Starting image upload:', { 
      fileName: file.name, 
      fileSize: file.size, 
      fileType: file.type,
      folder 
    });

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    console.log('Upload path:', filePath);

    const { data, error } = await supabaseClient.storage
      .from('images')
      .upload(filePath, file);

    if (error) {
      console.error('Supabase storage error:', error);
      throw new Error(`Storage upload failed: ${error.message}`);
    }

    console.log('Upload successful:', data);

    // Получить публичный URL
    const { data: urlData } = supabaseClient.storage
      .from('images')
      .getPublicUrl(data.path);

    console.log('Generated public URL:', urlData.publicUrl);

    return urlData.publicUrl;
  },

  // Удалить изображение из Supabase Storage
  async deleteImage(imageUrl: string): Promise<boolean> {
    try {
      // Извлекаем путь к файлу из URL
      const urlParts = imageUrl.split('/storage/v1/object/public/images/');
      if (urlParts.length !== 2) return false;
      
      const filePath = urlParts[1];

      const { error } = await supabaseClient.storage
        .from('images')
        .remove([filePath]);

      if (error) {
        console.error('Error deleting image:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error deleting image:', error);
      return false;
    }
  }
}; 