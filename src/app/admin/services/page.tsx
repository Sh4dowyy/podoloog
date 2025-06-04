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
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Управление услугами</h1>
            <p className="text-gray-600 mt-2">Создавайте и редактируйте услуги</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <IconPlus className="h-4 w-4" />
            <span>Новая услуга</span>
          </button>
        </div>

        {/* Services Table */}
        {loadingServices ? (
          <div className="text-center py-8">
            <div className="text-lg text-gray-600 animate-pulse">Загрузка...</div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Услуга
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Цена
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Статус
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-24 sm:w-auto">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {services.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                        Услуги не найдены
                      </td>
                    </tr>
                  ) : (
                    services.map((service) => (
                      <tr key={service.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{service.title}</div>
                          <div className="text-sm text-gray-500 max-w-md">
                            {service.description.substring(0, 100)}
                            {service.description.length > 100 && '...'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {formatPrice(service.price, service.currency)}
                          </div>
                          {service.duration && (
                            <div className="text-sm text-gray-500">
                              {service.duration} мин
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            service.published 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {service.published ? 'Опубликована' : 'Скрыта'}
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex justify-end space-x-1 sm:space-x-2">
                            <button
                              onClick={() => setEditingService(service)}
                              className="text-indigo-600 hover:text-indigo-900 p-1"
                              title="Редактировать"
                            >
                              <IconEdit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(service.id)}
                              className="text-red-600 hover:text-red-900 p-1"
                              title="Удалить"
                            >
                              <IconTrash className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
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