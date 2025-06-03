'use client'

import { useAuth } from '@/components/auth/AuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { UserProfile } from '@/components/auth/UserProfile'
import { reviewService } from '@/lib/reviews'
import { Review, CreateReviewData } from '@/types/review'
import { IconPlus, IconEdit, IconTrash, IconEye, IconStar } from '@tabler/icons-react'

export default function ReviewManagementPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loadingReviews, setLoadingReviews] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingReview, setEditingReview] = useState<Review | null>(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      loadReviews()
    }
  }, [user])

  const loadReviews = async () => {
    try {
      const data = await reviewService.getAllReviews()
      setReviews(data)
    } catch (error) {
      console.error('Error loading reviews:', error)
    } finally {
      setLoadingReviews(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены?')) {
      return
    }

    try {
      await reviewService.deleteReview(id)
      await loadReviews()
    } catch (error) {
      console.error('Error deleting review:', error)
      alert('Ошибка при удалении отзыва')
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <IconStar
            key={i}
            className={`h-3 w-3 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
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
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                Подолог
              </Link>
              <span className="text-gray-500">•</span>
              <Link href="/admin" className="text-gray-600 hover:text-blue-600 transition-colors">
                Панель администратора
              </Link>
              <span className="text-gray-500">•</span>
              <span className="text-gray-600">Управление отзывами</span>
            </div>
            <UserProfile />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Управление отзывами</h1>
            <p className="text-gray-600 mt-2">Создавайте и редактируйте отзывы клиентов</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <IconPlus className="h-4 w-4" />
            <span>Новый отзыв</span>
          </button>
        </div>

        {/* Reviews Table */}
        {loadingReviews ? (
          <div className="text-center py-8">
            <div className="text-lg text-gray-600 animate-pulse">Загрузка...</div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Отзыв
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Рейтинг
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reviews.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                      Отзывы не найдены
                    </td>
                  </tr>
                ) : (
                  reviews.map((review) => (
                    <tr key={review.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-md">
                          {review.content.substring(0, 100)}
                          {review.content.length > 100 && '...'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {renderStars(review.rating)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          review.published 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {review.published ? 'Опубликован' : 'Скрыт'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link
                            href={`/reviews`}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="Просмотр"
                          >
                            <IconEye className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => setEditingReview(review)}
                            className="text-indigo-600 hover:text-indigo-900 p-1"
                            title="Редактировать"
                          >
                            <IconEdit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(review.id)}
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
        )}
      </div>

      {/* Create/Edit Form Modal */}
      {(showCreateForm || editingReview) && (
        <ReviewForm
          review={editingReview}
          onClose={() => {
            setShowCreateForm(false)
            setEditingReview(null)
          }}
          onSave={async () => {
            setShowCreateForm(false)
            setEditingReview(null)
            await loadReviews()
          }}
        />
      )}
    </div>
  )
}

// Review Form Component
function ReviewForm({ 
  review, 
  onClose, 
  onSave 
}: { 
  review?: Review | null
  onClose: () => void
  onSave: () => void
}) {
  const [formData, setFormData] = useState({
    content: review?.content_et || review?.content || '',
    content_et: review?.content_et || '',
    content_ru: review?.content_ru || '',
    rating: review?.rating || 5,
    published: review?.published || false,
  })
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (review) {
        // Update existing review
        await reviewService.updateReview({
          id: review.id,
          content: formData.content_et || formData.content,
          content_et: formData.content_et,
          content_ru: formData.content_ru,
          rating: formData.rating,
          published: formData.published,
        })
      } else {
        // Create new review
        await reviewService.createReview({
          content: formData.content_et || formData.content,
          content_et: formData.content_et,
          content_ru: formData.content_ru,
          rating: formData.rating,
          published: formData.published,
        })
      }
      
      onSave()
    } catch (error) {
      console.error('Error saving review:', error)
      alert('Ошибка при сохранении отзыва')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {review ? 'Редактировать отзыв' : 'Новый отзыв'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Рейтинг
              </label>
              <select
                value={formData.rating}
                onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value={1}>1 звезда</option>
                <option value={2}>2 звезды</option>
                <option value={3}>3 звезды</option>
                <option value={4}>4 звезды</option>
                <option value={5}>5 звезд</option>
              </select>
            </div>

            {/* Content Fields */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Содержание отзыва</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Отзыв (ET)
                </label>
                <textarea
                  value={formData.content_et}
                  onChange={(e) => setFormData({...formData, content_et: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={4}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Отзыв (RU)
                </label>
                <textarea
                  value={formData.content_ru}
                  onChange={(e) => setFormData({...formData, content_ru: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={4}
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
                Опубликован
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
  )
} 