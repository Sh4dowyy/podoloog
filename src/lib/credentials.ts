import { supabaseClient } from '@/lib/supabase-client';
import { Credential } from '@/types/credential';

export const credentialService = {
  // Получить все опубликованные дипломы
  async getPublishedCredentials(): Promise<Credential[]> {
    const { data, error } = await supabaseClient
      .from('credentials')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching credentials:', error);
      throw error;
    }

    return data || [];
  },

  // Получить все дипломы (для админки)
  async getAllCredentials(): Promise<Credential[]> {
    const { data, error } = await supabaseClient
      .from('credentials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all credentials:', error);
      throw error;
    }

    return data || [];
  },

  // Получить диплом по ID
  async getCredentialById(id: string): Promise<Credential | null> {
    const { data, error } = await supabaseClient
      .from('credentials')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching credential:', error);
      return null;
    }

    return data;
  },

  // Создать новый диплом
  async createCredential(credential: Omit<Credential, 'id' | 'created_at' | 'updated_at'>): Promise<Credential | null> {
    const { data, error } = await supabaseClient
      .from('credentials')
      .insert([credential])
      .select()
      .single();

    if (error) {
      console.error('Error creating credential:', error);
      throw error;
    }

    return data;
  },

  // Обновить диплом
  async updateCredential(id: string, updates: Partial<Credential>): Promise<Credential | null> {
    const { data, error } = await supabaseClient
      .from('credentials')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating credential:', error);
      throw error;
    }

    return data;
  },

  // Удалить диплом
  async deleteCredential(id: string): Promise<boolean> {
    const { error } = await supabaseClient
      .from('credentials')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting credential:', error);
      return false;
    }

    return true;
  },

  // Загрузить изображение в Supabase Storage
  async uploadImage(file: File, folder: string = 'credentials'): Promise<string | null> {
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