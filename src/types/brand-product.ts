export interface BrandProduct {
  id: string;
  brand_id: string; // ID бренда, к которому относится продукт
  name: string;
  name_et?: string;
  name_ru?: string;
  description: string;
  description_et?: string;
  description_ru?: string;
  category: 'cream' | 'tool' | 'solution' | 'device' | 'other';
  price?: number;
  price_currency?: string;
  image_url?: string;
  is_featured?: boolean; // Рекомендуемый продукт
  in_stock?: boolean;
  usage_instructions?: string;
  usage_instructions_et?: string;
  usage_instructions_ru?: string;
  ingredients?: string; // Для кремов и растворов
  ingredients_et?: string;
  ingredients_ru?: string;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateBrandProductData {
  brand_id: string;
  name: string;
  name_et?: string;
  name_ru?: string;
  description: string;
  description_et?: string;
  description_ru?: string;
  category: 'cream' | 'tool' | 'solution' | 'device' | 'other';
  price?: number;
  price_currency?: string;
  image_url?: string;
  is_featured?: boolean;
  in_stock?: boolean;
  usage_instructions?: string;
  usage_instructions_et?: string;
  usage_instructions_ru?: string;
  ingredients?: string;
  ingredients_et?: string;
  ingredients_ru?: string;
  published?: boolean;
}

export interface UpdateBrandProductData extends Partial<CreateBrandProductData> {
  id: string;
}

// Категории продуктов с локализацией
export const PRODUCT_CATEGORIES = {
  cream: {
    et: 'Kreem',
    ru: 'Крем',
    en: 'Cream'
  },
  tool: {
    et: 'Tööriist',
    ru: 'Инструмент', 
    en: 'Tool'
  },
  solution: {
    et: 'Lahus',
    ru: 'Раствор',
    en: 'Solution'
  },
  device: {
    et: 'Seade',
    ru: 'Устройство',
    en: 'Device'
  },
  other: {
    et: 'Muu',
    ru: 'Другое',
    en: 'Other'
  }
} as const; 