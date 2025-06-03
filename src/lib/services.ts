import { supabase } from './supabase';
import { supabaseClient } from './supabase-client';
import { Service, CreateServiceData, UpdateServiceData } from '@/types/service';

export const serviceService = {
  // Get all services (for admin)
  async getAllServices(): Promise<Service[]> {
    const client = supabaseClient || supabase;
    if (!client) {
      throw new Error('Supabase client not initialized');
    }

    const { data, error } = await client
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching services:', error);
      throw error;
    }

    return data || [];
  },

  // Get published services (for public)
  async getPublishedServices(): Promise<Service[]> {
    const client = supabaseClient || supabase;
    if (!client) {
      throw new Error('Supabase client not initialized');
    }

    const { data, error } = await client
      .from('services')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching published services:', error);
      throw error;
    }

    return data || [];
  },

  // Get service by ID
  async getServiceById(id: string): Promise<Service | null> {
    const client = supabaseClient || supabase;
    if (!client) {
      throw new Error('Supabase client not initialized');
    }

    const { data, error } = await client
      .from('services')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching service:', error);
      return null;
    }

    return data;
  },

  // Create new service
  async createService(serviceData: CreateServiceData, userId?: string): Promise<Service> {
    const client = supabaseClient || supabase;
    if (!client) {
      throw new Error('Supabase client not initialized');
    }

    let authorId = userId;
    
    // If userId not provided, try to get from auth
    if (!authorId) {
      const { data: { user } } = await client.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated and no userId provided');
      }
      authorId = user.id;
    }

    console.log('Creating service with data:', serviceData);
    console.log('Author ID:', authorId);

    const { data, error } = await client
      .from('services')
      .insert([
        {
          ...serviceData,
          author_id: authorId,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Detailed error creating service:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error details:', error.details);
      console.error('Error hint:', error.hint);
      throw new Error(`Failed to create service: ${error.message}`);
    }

    return data;
  },

  // Update service
  async updateService(serviceData: UpdateServiceData, userId?: string): Promise<Service> {
    const client = supabaseClient || supabase;
    if (!client) {
      throw new Error('Supabase client not initialized');
    }

    const { id, ...updateData } = serviceData;
    
    console.log('Updating service with data:', updateData);
    console.log('Service ID:', id);
    console.log('User ID:', userId);
    
    const { data, error } = await client
      .from('services')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Detailed error updating service:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error details:', error.details);
      console.error('Error hint:', error.hint);
      throw new Error(`Failed to update service: ${error.message}`);
    }

    return data;
  },

  // Delete service
  async deleteService(id: string): Promise<void> {
    const client = supabaseClient || supabase;
    if (!client) {
      throw new Error('Supabase client not initialized');
    }

    const { error } = await client
      .from('services')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting service:', error);
      throw error;
    }
  },

  // Generate slug from title (if needed)
  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
}; 