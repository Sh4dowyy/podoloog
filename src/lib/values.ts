import { supabase, createSupabaseBrowserClient } from '@/lib/supabase';
import { Value, CreateValueData, UpdateValueData } from '@/types/value';

export class ValuesService {
  // Получить клиент Supabase (приоритет - браузерный клиент для аутентификации)
  private static getClient() {
    const browserClient = createSupabaseBrowserClient();
    return browserClient || supabase;
  }

  // Получить все активные ценности, отсортированные по порядку
  static async getActiveValues(): Promise<Value[]> {
    try {
      const client = this.getClient();
      if (!client) throw new Error('Supabase client not initialized');
      
      const { data, error } = await client
        .from('values')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching values:', error);
      throw error;
    }
  }

  // Получить все ценности (для админки)
  static async getAllValues(): Promise<Value[]> {
    try {
      const client = this.getClient();
      if (!client) throw new Error('Supabase client not initialized');
      
      const { data, error } = await client
        .from('values')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching all values:', error);
      throw error;
    }
  }

  // Получить ценность по ID
  static async getValueById(id: number): Promise<Value | null> {
    try {
      const client = this.getClient();
      if (!client) throw new Error('Supabase client not initialized');
      
      const { data, error } = await client
        .from('values')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching value by id:', error);
      throw error;
    }
  }

  // Создать новую ценность
  static async createValue(valueData: CreateValueData): Promise<Value> {
    try {
      const client = this.getClient();
      if (!client) throw new Error('Supabase client not initialized. Please check your environment variables.');
      
      console.log('Creating value with data:', valueData);
      
      const { data, error } = await client
        .from('values')
        .insert([valueData])
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(`Database error: ${error.message} (Code: ${error.code})`);
      }
      
      console.log('Created value:', data);
      return data;
    } catch (error) {
      console.error('Error creating value:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unknown error occurred while creating value');
    }
  }

  // Обновить ценность
  static async updateValue(valueData: UpdateValueData): Promise<Value> {
    try {
      const client = this.getClient();
      if (!client) throw new Error('Supabase client not initialized');
      
      const { id, ...updateData } = valueData;
      const { data, error } = await client
        .from('values')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating value:', error);
      throw error;
    }
  }

  // Удалить ценность
  static async deleteValue(id: number): Promise<void> {
    try {
      const client = this.getClient();
      if (!client) throw new Error('Supabase client not initialized');
      
      const { error } = await client
        .from('values')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting value:', error);
      throw error;
    }
  }

  // Переключить активность ценности
  static async toggleValueStatus(id: number, isActive: boolean): Promise<Value> {
    try {
      const client = this.getClient();
      if (!client) throw new Error('Supabase client not initialized');
      
      const { data, error } = await client
        .from('values')
        .update({ is_active: isActive })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error toggling value status:', error);
      throw error;
    }
  }

  // Обновить порядок ценностей
  static async updateValuesOrder(values: { id: number; order_index: number }[]): Promise<void> {
    try {
      const client = this.getClient();
      if (!client) throw new Error('Supabase client not initialized');
      
      const updates = values.map(value => 
        client
          .from('values')
          .update({ order_index: value.order_index })
          .eq('id', value.id)
      );

      await Promise.all(updates);
    } catch (error) {
      console.error('Error updating values order:', error);
      throw error;
    }
  }
} 