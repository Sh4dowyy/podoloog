'use client'

import { useAuth } from '@/components/auth/AuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { biomechanicsService } from '@/lib/biomechanics'
import { BiomechanicsItem, BiomechanicsCategory } from '@/types/biomechanics'
import { IconPlus, IconEdit, IconTrash, IconActivity, IconHeart, IconWalk, IconRun } from '@tabler/icons-react'
import Image from 'next/image'
import { ImageUpload } from '@/components/ImageUpload'

// Константы для категорий
const CATEGORY_INFO = {
  exercise: { 
    label: 'Упражнения', 
    labelEt: 'Harjutused',
    icon: IconRun, 
    color: 'bg-blue-50 text-blue-700' 
  },
  hygiene: { 
    label: 'Гигиена', 
    labelEt: 'Hügieen',
    icon: IconHeart, 
    color: 'bg-green-50 text-green-700' 
  },
  physical: { 
    label: 'Физкультура', 
    labelEt: 'Füsikalisierung',
    icon: IconWalk, 
    color: 'bg-purple-50 text-purple-700' 
  },
}



export default function BiomechanicsAdminPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [items, setItems] = useState<BiomechanicsItem[]>([])
  const [filteredItems, setFilteredItems] = useState<BiomechanicsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingItem, setEditingItem] = useState<BiomechanicsItem | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<BiomechanicsCategory | 'all'>('all')

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    loadItems()
  }, [])

  useEffect(() => {
    if (categoryFilter === 'all') {
      setFilteredItems(items)
    } else {
      setFilteredItems(items.filter(item => item.category === categoryFilter))
    }
  }, [items, categoryFilter])

  const loadItems = async () => {
    try {
      const data = await biomechanicsService.getAllItems()
      setItems(data)
    } catch (error) {
      console.error('Error loading items:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Вы уверены, что хотите удалить этот материал?')) {
      const success = await biomechanicsService.deleteItem(id)
      if (success) {
        await loadItems()
      }
    }
  }

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600 animate-pulse">Загрузка...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Управление биомеханикой</h1>
            <p className="text-gray-600 mt-2">Создавайте и редактируйте материалы по упражнениям, гигиене и физкультуре</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <IconPlus className="h-4 w-4" />
            <span>Новый материал</span>
          </button>
        </div>

        {/* Category Filter */}
        <div className="mb-6 flex space-x-2 flex-wrap">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              categoryFilter === 'all' 
                ? 'bg-gray-900 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Все категории ({items.length})
          </button>
          {Object.entries(CATEGORY_INFO).map(([category, info]) => {
            const count = items.filter(item => item.category === category).length
            const Icon = info.icon
            return (
              <button
                key={category}
                onClick={() => setCategoryFilter(category as BiomechanicsCategory)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
                  categoryFilter === category 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{info.label} ({count})</span>
              </button>
            )
          })}
        </div>

        {/* Items Table */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <IconActivity className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {categoryFilter === 'all' ? 'Материалы не найдены' : `Нет материалов в категории "${CATEGORY_INFO[categoryFilter as BiomechanicsCategory]?.label}"`}
            </h3>
            <p className="text-gray-500 mb-4">
              Создайте первый материал для начала работы
            </p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Создать материал
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Материал
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Категория
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Статус
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Дата создания
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-24 sm:w-auto">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredItems.map((item) => {
                    const categoryInfo = CATEGORY_INFO[item.category]
                    const CategoryIcon = categoryInfo.icon
                    
                    return (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {item.image_url && (
                              <div className="flex-shrink-0 h-12 w-12 mr-4">
                                <Image
                                  width={48}
                                  height={48}
                                  src={item.image_url}
                                  alt={item.title_et}
                                  className="h-12 w-12 rounded-lg object-cover"
                                />
                              </div>
                            )}
                            <div>
                              <div className="text-sm font-medium text-gray-900">{item.title_et}</div>
                              {item.title_ru && (
                                <div className="text-sm text-gray-500">{item.title_ru}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryInfo.color}`}>
                            <CategoryIcon className="h-3 w-3 mr-1" />
                            {categoryInfo.label}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            item.is_published 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {item.is_published ? 'Опубликован' : 'Черновик'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(item.created_at).toLocaleDateString('ru-RU')}
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex justify-end space-x-1 sm:space-x-2">
                            <button
                              onClick={() => setEditingItem(item)}
                              className="text-indigo-600 hover:text-indigo-900 p-1"
                              title="Редактировать"
                            >
                              <IconEdit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-red-600 hover:text-red-900 p-1"
                              title="Удалить"
                            >
                              <IconTrash className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Create/Edit Form Modal */}
      {(showCreateForm || editingItem) && (
        <BiomechanicsForm
          item={editingItem}
          onClose={() => {
            setShowCreateForm(false)
            setEditingItem(null)
          }}
          onSave={async () => {
            setShowCreateForm(false)
            setEditingItem(null)
            await loadItems()
          }}
        />
      )}
    </div>
  )
}

// Компонент формы для создания/редактирования
function BiomechanicsForm({
  item,
  onClose,
  onSave,
}: {
  item: BiomechanicsItem | null
  onClose: () => void
  onSave: () => void
}) {
  const [formData, setFormData] = useState({
    category: item?.category || 'exercise' as BiomechanicsCategory,
    title_et: item?.title_et || '',
    title_ru: item?.title_ru || '',
    description_et: item?.description_et || '',
    description_ru: item?.description_ru || '',
    content_et: item?.content_et || '',
    content_ru: item?.content_ru || '',
    image_url: item?.image_url || '',
    is_published: item?.is_published || false
  })

  const [uploading, setUploading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked 
             : type === 'number' ? (value ? parseInt(value) : undefined)
             : value
    }))
  }

  const handleImageChange = (imageUrl: string | null) => {
    setFormData(prev => ({ ...prev, image_url: imageUrl || '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)

    try {
      if (item) {
        await biomechanicsService.updateItem(item.id, formData)
      } else {
        await biomechanicsService.createItem(formData)
      }
      onSave()
    } catch (error) {
      console.error('Error saving item:', error)
      alert('Ошибка при сохранении')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {item ? 'Редактировать материал' : 'Создать новый материал'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Категория *
            </label>
            <select
              name="category"
              id="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              {Object.entries(CATEGORY_INFO).map(([value, info]) => (
                <option key={value} value={value}>{info.label}</option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Изображение
            </label>
            <ImageUpload
              currentImageUrl={formData.image_url}
              onImageChange={handleImageChange}
              folder="biomechanics"
              width={400}
              height={300}
              placeholder="Загрузите изображение для материала"
            />
          </div>

          {/* Titles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title_et" className="block text-sm font-medium text-gray-700">
                Название (эстонский) *
              </label>
              <input
                type="text"
                name="title_et"
                id="title_et"
                required
                value={formData.title_et}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="title_ru" className="block text-sm font-medium text-gray-700">
                Название (русский)
              </label>
              <input
                type="text"
                name="title_ru"
                id="title_ru"
                value={formData.title_ru}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Descriptions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="description_et" className="block text-sm font-medium text-gray-700">
                Описание (эстонский)
              </label>
              <textarea
                name="description_et"
                id="description_et"
                rows={3}
                value={formData.description_et}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="description_ru" className="block text-sm font-medium text-gray-700">
                Описание (русский)
              </label>
              <textarea
                name="description_ru"
                id="description_ru"
                rows={3}
                value={formData.description_ru}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="content_et" className="block text-sm font-medium text-gray-700">
                Детальный контент (эстонский)
              </label>
              <textarea
                name="content_et"
                id="content_et"
                rows={6}
                value={formData.content_et}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Подробное описание упражнения/техники..."
              />
            </div>

            <div>
              <label htmlFor="content_ru" className="block text-sm font-medium text-gray-700">
                Детальный контент (русский)
              </label>
              <textarea
                name="content_ru"
                id="content_ru"
                rows={6}
                value={formData.content_ru}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Подробное описание упражнения/техники..."
              />
            </div>
          </div>

          {/* Publish Status */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="is_published"
              id="is_published"
              checked={formData.is_published}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="is_published" className="ml-2 block text-sm text-gray-900">
              Опубликовать материал
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Отменить
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {uploading ? 'Сохранение...' : (item ? 'Обновить' : 'Создать')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 