export interface Service {
  id: string;
  title: string;
  title_et?: string;
  title_ru?: string;
  description: string;
  description_et?: string;
  description_ru?: string;
  price: number;
  currency: string;
  duration?: number; // duration in minutes
  image_url?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  author_id: string;
}

export interface CreateServiceData {
  title: string;
  title_et?: string;
  title_ru?: string;
  description: string;
  description_et?: string;
  description_ru?: string;
  price: number;
  currency: string;
  duration?: number;
  image_url?: string;
  published: boolean;
}

export interface UpdateServiceData extends CreateServiceData {
  id: string;
} 