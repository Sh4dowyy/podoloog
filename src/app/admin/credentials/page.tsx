'use client'

import { useAuth } from '@/components/auth/AuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { credentialService } from '@/lib/credentials'
import { Credential } from '@/types/credential'
import { IconPlus, IconEdit, IconTrash } from '@tabler/icons-react'
import { ImageUpload } from '@/components/ImageUpload'

export default function CredentialsManagementPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [credentials, setCredentials] = useState<Credential[]>([])
  const [loadingCredentials, setLoadingCredentials] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingCredential, setEditingCredential] = useState<Credential | null>(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      loadCredentials()
    }
  }, [user])

  const loadCredentials = async () => {
    try {
      const data = await credentialService.getAllCredentials()
      setCredentials(data)
    } catch (error) {
      console.error('Error loading credentials:', error)
    } finally {
      setLoadingCredentials(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот диплом?')) {
      return
    }

    try {
      await credentialService.deleteCredential(id)
      await loadCredentials()
    } catch (error) {
      console.error('Error deleting credential:', error)
      alert('Ошибка при удалении диплома')
    }
  }

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
            <h1 className="text-2xl font-bold text-sage-900 mb-2">Управление дипломами</h1>
            <p className="text-sage-600">Создавайте и редактируйте дипломы и сертификаты</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-4 py-2 bg-poppy-500 text-white rounded-lg hover:bg-poppy-600 transition-colors flex items-center space-x-2"
          >
            <IconPlus className="h-4 w-4" />
            <span>Новый диплом</span>
          </button>
        </div>

        {/* Credentials Grid */}
        {loadingCredentials ? (
          <div className="text-center py-8">
            <div className="text-lg text-sage-600 animate-pulse">Загрузка...</div>
          </div>
        ) : credentials.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-sage-600">Дипломы не найдены</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {credentials.map((credential) => (
              <div
                key={credential.id}
                className="glass-effect rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border"
              >
                {/* Credential Header */}
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-sage-900 mb-2 line-clamp-2">
                    {credential.title_et}
                  </h3>
                  <div className="w-12 h-12 bg-poppy-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl">🏆</span>
                  </div>
                </div>

                {/* Image */}
                {credential.image_url && (
                  <div className="mb-4 text-center">
                    <img 
                      src={credential.image_url} 
                      alt="Diploma" 
                      className="w-20 h-20 object-cover rounded mx-auto"
                    />
                  </div>
                )}

                {/* Description */}
                {credential.description_et && (
                  <div className="mb-4">
                    <p className="text-sm text-sage-700 line-clamp-3 text-center">
                      {credential.description_et}
                    </p>
                  </div>
                )}

                {/* Status */}
                <div className="mb-4 text-center">
                  <span className={`inline-block px-3 py-1 text-xs rounded-full ${
                    credential.is_published 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {credential.is_published ? 'Опубликован' : 'Черновик'}
                  </span>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={() => setEditingCredential(credential)}
                    className="w-full px-4 py-2 bg-poppy-500 text-white rounded-lg hover:bg-poppy-600 transition-colors"
                  >
                    ✏️ Редактировать
                  </button>
                  <button
                    onClick={() => handleDelete(credential.id)}
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
      {(showCreateForm || editingCredential) && (
        <CredentialForm
          credential={editingCredential}
          onClose={() => {
            setShowCreateForm(false)
            setEditingCredential(null)
          }}
          onSave={async () => {
            setShowCreateForm(false)
            setEditingCredential(null)
            await loadCredentials()
          }}
        />
      )}
    </div>
  )
}

// Credential Form Component
function CredentialForm({ 
  credential, 
  onClose, 
  onSave 
}: { 
  credential?: Credential | null
  onClose: () => void
  onSave: () => void
}) {
  const [formData, setFormData] = useState({
    title_et: credential?.title_et || '',
    title_ru: credential?.title_ru || '',
    description_et: credential?.description_et || '',
    description_ru: credential?.description_ru || '',
    image_url: credential?.image_url || '',
    is_published: credential?.is_published || false
  })
  const [saving, setSaving] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleImageChange = (imageUrl: string | null) => {
    setFormData(prev => ({
      ...prev,
      image_url: imageUrl || ''
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (credential) {
        await credentialService.updateCredential(credential.id, formData)
      } else {
        await credentialService.createCredential(formData)
      }
      onSave()
    } catch (error) {
      console.error('Error saving credential:', error)
      alert('Ошибка при сохранении диплома')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            {credential ? 'Редактировать диплом' : 'Новый диплом'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <span className="sr-only">Закрыть</span>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Изображение диплома
            </label>
            <ImageUpload
              currentImageUrl={formData.image_url}
              onImageChange={handleImageChange}
              folder="credentials"
              width={400}
              height={300}
              placeholder="Загрузите скан диплома или сертификата"
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
                rows={4}
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
                rows={4}
                value={formData.description_ru}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
              Опубликовать диплом
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Отменить
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {saving ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 