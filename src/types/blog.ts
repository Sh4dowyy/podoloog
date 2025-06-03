export interface BlogPost {
  id: string;
  title: string;
  title_et?: string;
  title_ru?: string;
  description: string;
  description_et?: string;
  description_ru?: string;
  content: string;
  content_et?: string;
  content_ru?: string;
  image_url?: string;
  slug: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  author_id: string;
  tags?: string[];
}

export interface CreateBlogPostData {
  title: string;
  title_et?: string;
  title_ru?: string;
  description: string;
  description_et?: string;
  description_ru?: string;
  content: string;
  content_et?: string;
  content_ru?: string;
  image_url?: string;
  slug: string;
  published: boolean;
  tags?: string[];
}

export interface UpdateBlogPostData extends Partial<CreateBlogPostData> {
  id: string;
} 