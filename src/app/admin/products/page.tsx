'use client'

import { useAuth } from '@/components/auth/AuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { productService } from '@/lib/products'
import { Product } from '@/types/product'
import { IconPlus, IconEdit, IconTrash, IconEye, IconEyeOff } from '@tabler/icons-react'
import { useLanguage } from '@/components/i18n/LanguageProvider'
import Link from 'next/link'

export default function AdminProductsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { currentLanguage } = useLanguage();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newBrandName, setNewBrandName] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      loadProducts();
    }
  }, [user]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
      alert('Ошибка при загрузке брендов');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот продукт?')) {
      return;
    }

    try {
      await productService.deleteProduct(id);
      await loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Ошибка при удалении продукта');
    }
  };

  const handleTogglePublished = async (id: string, published: boolean) => {
    try {
      await productService.togglePublished(id, !published);
      await loadProducts();
    } catch (error) {
      console.error('Error toggling published status:', error);
      alert('Ошибка при изменении статуса публикации');
    }
  };

  // Fallback brands for when no products in database
  const fallbackBrands: Product[] = [
    {
      id: "1",
      name: "GEHWOL",
      name_et: "GEHWOL",
      name_ru: "GEHWOL", 
      description: "Saksa kvaliteetne jalgade hoolduse bränd.",
      description_et: "Saksa kvaliteetne jalgade hoolduse bränd. Spetsialiseerunud meditsiinitoodetele jalgade tervise tagamiseks. Kasutame nende professionaalseid vahendeid ja preparaate.",
      description_ru: "Немецкий качественный бренд по уходу за ногами. Специализируется на медицинских продуктах для здоровья стоп. Используем их профессиональные инструменты и препараты.",
      published: true
    },
    {
      id: "2",
      name: "Allpresan",
      name_et: "Allpresan",
      name_ru: "Allpresan",
      description: "Innovaatiline Saksa bränd jalgade hoolduseks.",
      description_et: "Innovaatiline Saksa bränd, mis spetsialiseerub jalgade nahapesu ja hooldusvahenditele. Nende tooted on eriti tõhusad kuiva naha ja pragude korral.",
      description_ru: "Инновационный немецкий бренд, специализирующийся на средствах по уходу за кожей ног. Их продукты особенно эффективны при сухой коже и трещинах.",
      published: true
    },
    {
      id: "3",
      name: "SANAMED",
      name_et: "SANAMED",
      name_ru: "SANAMED",
      description: "Professionaalne meditsiinitehnika ja instrumentide tootja.",
      description_et: "Professionaalne meditsiinitehnika ja instrumentide tootja. Pakume kvaliteetseid ja turvaliseid lahendusi podoloogia valdkonnas.",
      description_ru: "Профессиональный производитель медицинской техники и инструментов. Предлагаем качественные и безопасные решения в области подологии.",
      published: true
    },
    {
      id: "4",
      name: "HFL laboratories",
      name_et: "HFL laboratories",
      name_ru: "HFL laboratories",
      description: "Teaduslik lähenemisega laboratoorium.",
      description_et: "Teaduslik lähenemisega laboratoorium, mis arendab innovaatilisi lahendusi jalgade tervisele. Nende tooted põhinevad uusimatel teadusuuringutel.",
      description_ru: "Лаборатория с научным подходом, разрабатывающая инновационные решения для здоровья стоп. Их продукты основаны на новейших научных исследованиях.",
      published: true
    },
    {
      id: "5",
      name: "BioFeet",
      name_et: "BioFeet",
      name_ru: "BioFeet",
      description: "Ökoloogiliselt puhas bränd jalgade hoolduseks.",
      description_et: "Ökoloogiliselt puhas bränd, mis keskendub looduslikele koostisosadele jalgade hoolduses. Sobib tundliku nahaga klientidele.",
      description_ru: "Экологически чистый бренд, который фокусируется на натуральных ингредиентах для ухода за ногами. Подходит для клиентов с чувствительной кожей.",
      published: true
    }
  ];

  const getLocalizedName = (product: Product) => {
    if (currentLanguage === 'et' && product.name_et) return product.name_et;
    if (currentLanguage === 'ru' && product.name_ru) return product.name_ru;
    return product.name;
  };

  const getLocalizedDescription = (product: Product) => {
    if (currentLanguage === 'et' && product.description_et) return product.description_et;
    if (currentLanguage === 'ru' && product.description_ru) return product.description_ru;
    return product.description;
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
          <div className="text-sage-600">Загрузка брендов...</div>
        </div>
      </div>
    );
  }

  // Use fallback brands if no products in database
  const displayProducts = products.length > 0 ? products : fallbackBrands;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <nav className="text-sm">
          <Link href="/admin" className="text-poppy-500 hover:text-poppy-600">
            Админ
          </Link>
          <span className="mx-2 text-sage-400">›</span>
          <span className="text-sage-700">Управление продукцией</span>
        </nav>
      </div>

      <div className="glass-effect rounded-xl p-6 mb-6">
        <h1 className="text-2xl font-bold text-sage-900 mb-4">
          Управление продукцией
        </h1>

        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-4 py-3 bg-sage-600 text-white rounded-lg hover:bg-sage-700"
          >
            Добавить бренд
          </button>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProducts.map((product) => (
            <div
              key={product.id}
              className="glass-effect rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border"
            >
              {/* Brand Header */}
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-sage-900 mb-2">
                  {getLocalizedName(product)}
                </h3>
                <div className="w-12 h-12 bg-poppy-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🏷️</span>
          </div>
        </div>

              {/* Description */}
              <div className="mb-4">
                <p className="text-sm text-sage-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Link
                  href={`/admin/products/${product.id}`}
                  className="w-full px-4 py-2 bg-poppy-500 text-white rounded-lg hover:bg-poppy-600 transition-colors text-center block"
                >
                  🛠️ Управлять продуктами
                </Link>
                
                
                <button
                  onClick={() => { setEditingProduct(product); setShowCreateForm(true); }}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  ✏️ Редактировать бренд
                </button>
                <button
                  onClick={() => handleTogglePublished(product.id, product.published)}
                  className="w-full px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                >
                  {product.published ? 'Скрыть' : 'Опубликовать'}
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  🗑️ Удалить бренд
                </button>
                          </div>

              {/* Status Badge */}
              <div className="mt-4 text-center">
                <span className={`inline-block px-3 py-1 text-xs rounded-full ${
                              product.published
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                            {product.published ? 'Опубликован' : 'Скрыт'}
                          </span>
                          </div>
            </div>
          ))}
        </div>

        {displayProducts.length === 0 && (
          <div className="text-center py-8 text-sage-600">
            Бренды продукции еще не добавлены
          </div>
        )}
      </div>
      {showCreateForm && (
        <ProductForm
          product={editingProduct}
          onClose={() => { setShowCreateForm(false); setEditingProduct(null); }}
          onSave={async () => {
            setShowCreateForm(false);
            setEditingProduct(null);
            await loadProducts();
          }}
        />
      )}
    </div>
  );
}

// Product Form Component
function ProductForm({ 
  product, 
  onClose, 
  onSave 
}: { 
  product?: Product | null
  onClose: () => void
  onSave: () => void
}) {
  const [formData, setFormData] = useState({
    name: '',
    name_et: '',
    name_ru: '',
    description: '',
    description_et: '',
    description_ru: '',
    published: true,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        name_et: product.name_et || '',
        name_ru: product.name_ru || '',
        description: product.description || '',
        description_et: product.description_et || '',
        description_ru: product.description_ru || '',
        published: product.published,
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submit function called!', { formData, product });
    
    try {
      if (product) {
        console.log('Updating product:', product.id);
        await productService.updateProduct(product.id, formData);
        console.log('Product updated successfully');
      } else {
        console.log('Creating new product');
        await productService.createProduct(formData);
        console.log('Product created successfully');
      }
      onSave();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Ошибка при сохранении продукта: ' + (error as Error).message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {product ? 'Редактировать бренд' : 'Добавить новый бренд'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Short name (visible title) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Название фирмы (латиницей) *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Short description (общая) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Короткое описание (общая)</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Локализованные названия (опционально) */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Название (эстонский)</label>
              <input
                type="text"
                value={formData.name_et}
                onChange={(e) => setFormData({ ...formData, name_et: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Название (русский)</label>
              <input
                type="text"
                value={formData.name_ru}
                onChange={(e) => setFormData({ ...formData, name_ru: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Full descriptions (локализованные) */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Подробное описание (эстонский)</label>
              <textarea
                rows={5}
                value={formData.description_et}
                onChange={(e) => setFormData({ ...formData, description_et: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Подробное описание (русский)</label>
              <textarea
                rows={5}
                value={formData.description_ru}
                onChange={(e) => setFormData({ ...formData, description_ru: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Published */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
              Опубликовать сразу
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {product ? 'Обновить' : 'Создать'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 