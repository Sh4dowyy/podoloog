'use client'

import { useAuth } from '@/components/auth/AuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { serviceService } from '@/lib/services'
import { Service, CreateServiceData } from '@/types/service'
import { IconPlus, IconEdit, IconTrash, IconStar } from '@tabler/icons-react'
import { ImageUpload } from '@/components/ImageUpload'

export default function ServiceManagementPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [services, setServices] = useState<Service[]>([])
  const [loadingServices, setLoadingServices] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      loadServices()
    }
  }, [user])

  const loadServices = async () => {
    try {
      const data = await serviceService.getAllServices()
      setServices(data)
    } catch (error) {
      console.error('Error loading services:', error)
    } finally {
      setLoadingServices(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены?')) {
      return
    }

    try {
      await serviceService.deleteService(id)
      await loadServices()
    } catch (error) {
      console.error('Error deleting service:', error)
      alert('Ошибка при удалении услуги')
    }
  }

  const formatPrice = (price: number, currency: string) => {
    return `${price}${currency === 'EUR' ? '€' : currency}`;
  };

  if (loading) {
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
    <div className="max-w-6xl mx-auto p-6">
      <div className="glass-effect rounded-xl p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-sage-900 mb-2">Управление услугами</h1>
            <p className="text-sage-600">Создавайте и редактируйте услуги</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-4 py-2 bg-poppy-500 text-white rounded-lg hover:bg-poppy-600 transition-colors flex items-center space-x-2"
          >
            <IconPlus className="h-4 w-4" />
            <span>Новая услуга</span>
          </button>
        </div>

        {/* Services Grid */}
        {loadingServices ? (
          <div className="text-center py-8">
            <div className="text-lg text-sage-600 animate-pulse">Загрузка...</div>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-sage-600">Услуги не найдены</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="glass-effect rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border"
              >
                {/* Service Header */}
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-sage-900 mb-2 line-clamp-2">
                    {service.title}
                  </h3>
                  <div className="w-12 h-12 bg-poppy-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl">💼</span>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <p className="text-sm text-sage-700 line-clamp-3 text-center">
                    {service.description}
                  </p>
                </div>

                {/* Price and Duration */}
                <div className="mb-4 text-center">
                  <div className="text-lg font-bold text-sage-900">
                    {formatPrice(service.price, service.currency)}
                  </div>
                  {service.duration && (
                    <div className="text-sm text-sage-600">
                      {service.duration} мин
                    </div>
                  )}
                </div>

                {/* Status */}
                <div className="mb-4 text-center">
                  <span className={`inline-block px-3 py-1 text-xs rounded-full ${
                    service.published 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {service.published ? 'Опубликована' : 'Скрыта'}
                  </span>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={() => setEditingService(service)}
                    className="w-full px-4 py-2 bg-poppy-500 text-white rounded-lg hover:bg-poppy-600 transition-colors"
                  >
                    ✏️ Редактировать
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    🗑️ Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Form Modal */}
      {(showCreateForm || editingService) && (
        <ServiceForm
          service={editingService}
          onClose={() => {
            setShowCreateForm(false)
            setEditingService(null)
          }}
          onSave={async () => {
            setShowCreateForm(false)
            setEditingService(null)
            await loadServices()
          }}
        />
      )}
    </div>
  )
}

// Service Form Component
function ServiceForm({ 
  service, 
  onClose, 
  onSave 
}: { 
  service?: Service | null
  onClose: () => void
  onSave: () => void
}) {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    title: service?.title_et || service?.title || '',
    title_et: service?.title_et || '',
    title_ru: service?.title_ru || '',
    description: service?.description_et || service?.description || '',
    description_et: service?.description_et || '',
    description_ru: service?.description_ru || '',
    price: service?.price || 0,
    currency: service?.currency || 'EUR',
    duration: service?.duration || 60,
    image_url: service?.image_url || '',
    published: service?.published || false,
  })
  const [saving, setSaving] = useState(false)

  const handleImageChange = (imageUrl: string | null) => {
    setFormData(prev => ({
      ...prev,
      image_url: imageUrl || ''
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    console.log('Form submission started');
    console.log('User from auth context:', user);
    console.log('User ID:', user?.id);

    try {
      if (!user) {
        throw new Error('User not authenticated');
      }

      if (service) {
        // Update existing service
        await serviceService.updateService({
          id: service.id,
          title: formData.title_et || formData.title,
          title_et: formData.title_et,
          title_ru: formData.title_ru,
          description: formData.description_et || formData.description,
          description_et: formData.description_et,
          description_ru: formData.description_ru,
          price: formData.price,
          currency: formData.currency,
          duration: formData.duration,
          image_url: formData.image_url,
          published: formData.published,
        }, user.id)
      } else {
        // Create new service
        await serviceService.createService({
          title: formData.title_et || formData.title,
          title_et: formData.title_et,
          title_ru: formData.title_ru,
          description: formData.description_et || formData.description,
          description_et: formData.description_et,
          description_ru: formData.description_ru,
          price: formData.price,
          currency: formData.currency,
          duration: formData.duration,
          image_url: formData.image_url,
          published: formData.published,
        }, user.id)
      }
      
      onSave()
    } catch (error) {
      console.error('Error saving service:', error)
      
      // Show more detailed error message
      let errorMessage = 'Ошибка при сохранении услуги';
      if (error instanceof Error) {
        errorMessage += ': ' + error.message;
      }
      
      if (error instanceof Error && error.message.includes('relation "services" does not exist')) {
        errorMessage = 'Таблица services не создана в базе данных. Выполните SQL-скрипт в Supabase Dashboard.';
      }
      
      alert(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed inset-y-0 right-0 left-0 lg:left-64 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {service ? 'Редактировать услугу' : 'Новая услуга'}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Название (ET)
                  </label>
                  <input
                    type="text"
                    value={formData.title_et}
                    onChange={(e) => setFormData({...formData, title_et: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Название (RU)
                  </label>
                  <input
                    type="text"
                    value={formData.title_ru}
                    onChange={(e) => setFormData({...formData, title_ru: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              {/* Price and Duration */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Цена
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Валюта
                  </label>
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData({...formData, currency: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="EUR">EUR (€)</option>
                    <option value="USD">USD ($)</option>
                    <option value="RUB">RUB (₽)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Продолжительность (мин)
                  </label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    min="0"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Изображение услуги
                </label>
                <ImageUpload
                  currentImageUrl={formData.image_url}
                  onImageChange={handleImageChange}
                  folder="services"
                  width={400}
                  height={300}
                  placeholder="Загрузите изображение услуги"
                />
              </div>

              {/* Description Fields */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Описание услуги</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Описание (ET)
                  </label>
                  <textarea
                    value={formData.description_et}
                    onChange={(e) => setFormData({...formData, description_et: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={6}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Описание (RU)
                  </label>
                  <textarea
                    value={formData.description_ru}
                    onChange={(e) => setFormData({...formData, description_ru: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={6}
                  />
                </div>
              </div>

              {/* Published Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({...formData, published: e.target.checked})}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="published" className="ml-2 text-sm text-gray-700">
                  Опубликована
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-3 pt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Отменить
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {saving ? 'Загрузка...' : 'Сохранить изменения'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 