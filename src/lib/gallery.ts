import { supabaseClient } from './supabase-client';
import { GalleryItem, CreateGalleryItem, UpdateGalleryItem, GalleryFilters } from '@/types/gallery';

// Get all gallery items with optional filters
export async function getGalleryItems(filters?: GalleryFilters): Promise<GalleryItem[]> {
  try {
    let query = supabaseClient
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching gallery items:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getGalleryItems:', error);
    return [];
  }
}

// Get single gallery item by ID
export async function getGalleryItem(id: string): Promise<GalleryItem | null> {
  try {
    const { data, error } = await supabaseClient
      .from('gallery')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching gallery item:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getGalleryItem:', error);
    return null;
  }
}

// Create new gallery item
export async function createGalleryItem(item: CreateGalleryItem): Promise<GalleryItem | null> {
  try {
    const { data, error } = await supabaseClient
      .from('gallery')
      .insert([item])
      .select()
      .single();

    if (error) {
      console.error('Error creating gallery item:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in createGalleryItem:', error);
    return null;
  }
}

// Update gallery item
export async function updateGalleryItem(id: string, updates: UpdateGalleryItem): Promise<GalleryItem | null> {
  try {
    const { data, error } = await supabaseClient
      .from('gallery')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating gallery item:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in updateGalleryItem:', error);
    return null;
  }
}

// Delete gallery item
export async function deleteGalleryItem(id: string): Promise<boolean> {
  try {
    const { error } = await supabaseClient
      .from('gallery')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting gallery item:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteGalleryItem:', error);
    return false;
  }
}

// Upload image to Supabase Storage
export async function uploadGalleryImage(file: File, fileName: string): Promise<string | null> {
  try {
    const { data, error } = await supabaseClient.storage
      .from('gallery')
      .upload(`images/${fileName}`, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }

    // Get public URL
    const { data: { publicUrl } } = supabaseClient.storage
      .from('gallery')
      .getPublicUrl(`images/${fileName}`);

    return publicUrl;
  } catch (error) {
    console.error('Error in uploadGalleryImage:', error);
    return null;
  }
}

// Delete image from Supabase Storage
export async function deleteGalleryImage(imageUrl: string): Promise<boolean> {
  try {
    // Extract file path from URL
    const path = imageUrl.split('/gallery/')[1];
    if (!path) return false;

    const { error } = await supabaseClient.storage
      .from('gallery')
      .remove([path]);

    if (error) {
      console.error('Error deleting image:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteGalleryImage:', error);
    return false;
  }
}

 