export type BiomechanicsCategory = 'exercise' | 'hygiene' | 'physical';

export interface BiomechanicsItem {
  id: string;
  category: BiomechanicsCategory;
  title_et: string;
  title_ru?: string;
  description_et?: string;
  description_ru?: string;
  content_et?: string; // Детальный контент
  content_ru?: string;
  image_url?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface BiomechanicsCategoryInfo {
  id: BiomechanicsCategory;
  titleEt: string;
  titleRu: string;
  descriptionEt: string;
  descriptionRu: string;
  icon: string;
  color: string;
} 