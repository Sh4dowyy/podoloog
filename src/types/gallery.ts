export interface GalleryItem {
  id: string;
  title: string;
  title_ru: string;
  description?: string;
  description_ru?: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface CreateGalleryItem {
  title: string;
  title_ru: string;
  description?: string;
  description_ru?: string;
  image_url: string;
}

export interface UpdateGalleryItem {
  title?: string;
  title_ru?: string;
  description?: string;
  description_ru?: string;
  image_url?: string;
}

export interface GalleryFilters {
  limit?: number;
  offset?: number;
} 