export interface Value {
  id: number;
  title_et: string;
  title_ru: string;
  description_et: string;
  description_ru: string;
  icon: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateValueData {
  title_et: string;
  title_ru: string;
  description_et: string;
  description_ru: string;
  icon?: string;
  order_index?: number;
  is_active?: boolean;
}

export interface UpdateValueData extends Partial<CreateValueData> {
  id: number;
} 