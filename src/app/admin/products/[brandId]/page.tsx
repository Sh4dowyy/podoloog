'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { useRouter, useParams } from 'next/navigation';
import { BrandProductsService } from '@/lib/brand-products';
import { BrandProduct, CreateBrandProductData, UpdateBrandProductData, PRODUCT_CATEGORIES } from '@/types/brand-product';
import { productService } from '@/lib/products';
import { Product } from '@/types/product';
import { useLanguage } from '@/components/i18n/LanguageProvider';
import Link from 'next/link';

export default function AdminBrandProductsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const brandId = params.brandId as string;
  const { currentLanguage } = useLanguage();
  
  const [brandProducts, setBrandProducts] = useState<BrandProduct[]>([]);
  const [brand, setBrand] = useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = useState<BrandProduct | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<CreateBrandProductData>({
    brand_id: brandId,
    name: '',
    name_et: '',
    name_ru: '',
    description: '',
    description_et: '',
    description_ru: '',
    category: 'cream',
    image_url: '',
    published: true
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user && brandId) {
      loadBrandData();
    }
  }, [user, brandId]);

  const loadBrandData = async () => {
    try {
      setLoading(true);
      
      // Загружаем информацию о бренде
      const brandData = await productService.getProduct(brandId);
      setBrand(brandData);
      
      // Загружаем продукты бренда
      const productsData = await BrandProductsService.getAllBrandProducts(brandId);
      setBrandProducts(productsData);
      
    } catch (error) {
      console.error('Error loading brand data:', error);
      alert('Ошибка при загрузке данных бренда');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let imageUrl = formData.image_url;
      
      // Загружаем изображение, если выбран новый файл
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }
      
      const finalFormData = {
        ...formData,
        image_url: imageUrl,
        // Устанавливаем английские значения равными эстонским для совместимости
        name: formData.name_et || formData.name,
        description: formData.description_et || formData.description
      };
      
      if (editingProduct) {
        // Обновление существующего продукта
        const updateData: UpdateBrandProductData = {
          id: editingProduct.id,
          ...finalFormData
        };
        console.log('Updating brand product:', updateData);
        await BrandProductsService.updateBrandProduct(updateData);
        alert('Продукт успешно обновлен!');
      } else {
        // Создание нового продукта
        console.log('Creating brand product:', finalFormData);
        await BrandProductsService.createBrandProduct(finalFormData);
        alert('Продукт успешно создан!');
      }
      
      await loadBrandData();
      resetForm();
    } catch (error) {
      console.error('Error saving brand product:', error);
      let errorMessage = 'Ошибка при сохранении продукта';
      
      if (error instanceof Error) {
        errorMessage += ': ' + error.message;
      }
      
      alert(errorMessage);
    }
  };

  const handleEdit = (product: BrandProduct) => {
    setEditingProduct(product);
    setFormData({
      brand_id: product.brand_id,
      name: product.name,
      name_et: product.name_et || '',
      name_ru: product.name_ru || '',
      description: product.description,
      description_et: product.description_et || '',
      description_ru: product.description_ru || '',
      category: product.category,
      image_url: product.image_url || '',
      published: product.published
    });
    setImagePreview(product.image_url || '');
    setImageFile(null);
    setIsCreating(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Вы уверены, что хотите удалить этот продукт?')) {
      try {
        await BrandProductsService.deleteBrandProduct(id);
        await loadBrandData();
      } catch (error) {
        console.error('Error deleting brand product:', error);
        alert('Ошибка при удалении продукта');
      }
    }
  };

  const resetForm = () => {
    setEditingProduct(null);
    setIsCreating(false);
    setFormData({
      brand_id: brandId,
      name: '',
      name_et: '',
      name_ru: '',
      description: '',
      description_et: '',
      description_ru: '',
      category: 'cream',
      image_url: '',
      published: true
    });
    setImageFile(null);
    setImagePreview('');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      
      // Создаем preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }
      
      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const getCategoryName = (category: string) => {
    const categoryInfo = PRODUCT_CATEGORIES[category as keyof typeof PRODUCT_CATEGORIES];
    if (!categoryInfo) return category;
    
    if (currentLanguage === 'et') return categoryInfo.et;
    if (currentLanguage === 'ru') return categoryInfo.ru;
    return categoryInfo.en;
  };

  const formatPrice = (price: number, currency: string = 'EUR') => {
    return `${price.toFixed(2)} ${currency === 'EUR' ? '€' : currency}`;
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600 animate-pulse">Загрузка...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="glass-effect rounded-xl p-8 text-center">
          <div className="text-sage-600">Загрузка продуктов бренда...</div>
        </div>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="glass-effect rounded-xl p-8 text-center">
          <h1 className="text-2xl font-bold text-sage-900 mb-4">Бренд не найден</h1>
          <Link href="/admin/products" className="text-poppy-500 hover:text-poppy-600">
            Назад к управлению продукцией
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <nav className="text-sm">
          <Link href="/admin" className="text-poppy-500 hover:text-poppy-600">
            Админ
          </Link>
          <span className="mx-2 text-sage-400">›</span>
          <Link href="/admin" className="text-poppy-500 hover:text-poppy-600">
            Продукция
          </Link>
          <span className="mx-2 text-sage-400">›</span>
          <span className="text-sage-700">{brand.name}</span>
        </nav>
      </div>

      <div className="glass-effect rounded-xl p-6 mb-6">
        <h1 className="text-2xl font-bold text-sage-900 mb-2">
          Управление продуктами: {brand.name}
        </h1>
        <p className="text-sage-600 mb-6">{brand.description}</p>
        
        <button
          onClick={() => setIsCreating(true)}
          className="mb-6 px-4 py-2 bg-poppy-500 text-white rounded-lg hover:bg-poppy-600 transition-colors"
        >
          ➕ Добавить Новый Продукт
        </button>

        {/* Форма создания/редактирования  */}
        {isCreating && (
          <div className="mb-8 p-6 bg-sage-50 rounded-lg border">
            <h2 className="text-xl font-semibold text-sage-900 mb-4">
              {editingProduct ? 'Редактировать Продукт' : 'Добавить Новый Продукт'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Названия */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-1">
                    Название (Эстонский) *
                  </label>
                  <input
                    type="text"
                    value={formData.name_et}
                    onChange={(e) => setFormData(prev => ({ ...prev, name_et: e.target.value }))}
                    className="w-full px-3 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-poppy-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-1">
                    Название (Русский) *
                  </label>
                  <input
                    type="text"
                    value={formData.name_ru}
                    onChange={(e) => setFormData(prev => ({ ...prev, name_ru: e.target.value }))}
                    className="w-full px-3 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-poppy-500"
                    required
                  />
                </div>
              </div>

              {/* Описания */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-1">
                    Описание (Эстонский) *
                  </label>
                  <textarea
                    value={formData.description_et}
                    onChange={(e) => setFormData(prev => ({ ...prev, description_et: e.target.value }))}
                    className="w-full px-3 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-poppy-500"
                    rows={4}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-1">
                    Описание (Русский) *
                  </label>
                  <textarea
                    value={formData.description_ru}
                    onChange={(e) => setFormData(prev => ({ ...prev, description_ru: e.target.value }))}
                    className="w-full px-3 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-poppy-500"
                    rows={4}
                    required
                  />
                </div>
              </div>

              {/* Загрузка изображения */}
              <div>
                <label className="block text-sm font-medium text-sage-700 mb-1">
                  Изображение продукта
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-sage-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    {imagePreview ? (
                      <div className="mb-4">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="mx-auto h-32 w-32 object-cover rounded-lg"
                        />
                      </div>
                    ) : (
                      <svg
                        className="mx-auto h-12 w-12 text-sage-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    <div className="flex text-sm text-sage-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-poppy-600 hover:text-poppy-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-poppy-500">
                        <span>{imagePreview ? 'Изменить изображение' : 'Загрузить изображение'}</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-sage-500">PNG, JPG, GIF до 10MB</p>
                  </div>
                </div>
              </div>

              {/* Публикация */}
              <div className="flex items-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                    className="w-4 h-4 text-poppy-500 border-sage-300 rounded focus:ring-poppy-500"
                  />
                  <span className="text-sm font-medium text-sage-700">Опубликовано</span>
                </label>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-poppy-500 text-white rounded-lg hover:bg-poppy-600 transition-colors"
                >
                  {editingProduct ? 'Обновить' : 'Создать'}
                </button>
                
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 bg-sage-300 text-sage-700 rounded-lg hover:bg-sage-400 transition-colors"
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Список продуктов */}
        <div className="space-y-4">
          {brandProducts.map((product) => (
            <div 
              key={product.id}
              className={`p-4 rounded-lg border-2 min-h-[150px] ${
                product.published ? 'border-sage-200 bg-white' : 'border-gray-200 bg-gray-50 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Превью изображения */}
                  {product.image_url && (
                    <div className="mb-3">
                      <img
                        src={product.image_url}
                        alt={product.name_et || product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  
                  <h3 className="font-semibold text-sage-900 mb-1">
                    {product.name_et || product.name} {product.name_ru && `/ ${product.name_ru}`}
                  </h3>
                  
                  <p className="text-sage-700 text-sm mb-2 line-clamp-2">
                    {product.description_et || product.description}
                  </p>
                  
                  {product.description_ru && (
                    <p className="text-sage-600 text-xs line-clamp-2">
                      {product.description_ru}
                    </p>
                  )}
                </div>

                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    title="Редактировать"
                  >
                    ✏️
                  </button>
                  
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    title="Удалить"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {brandProducts.length === 0 && (
          <div className="text-center py-8 text-sage-600">
            Продукты для этого бренда еще не добавлены
          </div>
        )}
      </div>
    </div>
  );
} 