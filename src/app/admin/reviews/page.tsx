'use client'

import { useAuth } from '@/components/auth/AuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { reviewService } from '@/lib/reviews'
import { Review, CreateReviewData } from '@/types/review'
import { IconPlus, IconEdit, IconTrash, IconStar, IconCheck, IconX } from '@tabler/icons-react'

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

  const handleTogglePublished = async (review: Review) => {
    try {
      await reviewService.updateReview({
        id: review.id,
        content: review.content,
        author_name: review.author_name,
        rating: review.rating || 5,
        published: !review.published,
      })
      await loadReviews()
    } catch (error) {
      console.error('Error updating review:', error)
      alert('Ошибка при обновлении отзыва')
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

  // Count hidden public reviews - public reviews are auto-published now
  const hiddenPublicReviews = reviews.filter(review => 
    !review.published && review.author_name
  ).length;

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
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-sage-900">Управление отзывами</h1>
              {hiddenPublicReviews > 0 && (
                <span className="bg-sage-100 text-sage-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {hiddenPublicReviews} скрыто
                </span>
              )}
            </div>
            <p className="text-sage-600 mt-2">Создавайте и редактируйте отзывы клиентов.</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-4 py-2 bg-poppy-500 text-white rounded-lg hover:bg-poppy-600 transition-colors flex items-center space-x-2"
          >
            <IconPlus className="h-4 w-4" />
            <span>Новый отзыв</span>
          </button>
        </div>

        {/* Reviews Grid */}
        {loadingReviews ? (
          <div className="text-center py-8">
            <div className="text-lg text-sage-600 animate-pulse">Загрузка...</div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-sage-600">Отзывы не найдены</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="glass-effect rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border"
              >
                {/* Review Header */}
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-sage-900 mb-2">
                    {review.author_name || 'Администратор'}
                  </h3>
                  <div className="w-12 h-12 bg-poppy-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl">⭐</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-4 text-center">
                  {renderStars(review.rating)}
                </div>

                {/* Content */}
                <div className="mb-4">
                  <p className="text-sm text-sage-700 line-clamp-3 text-center">
                    {review.content}
                  </p>
                </div>

                {/* Status and Date */}
                <div className="mb-4 text-center">
                  <span className={`inline-block px-3 py-1 text-xs rounded-full mb-2 ${
                    review.published 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {review.published ? 'Опубликован' : 'Скрыт'}
                  </span>
                  <div className="text-xs text-sage-600">
                    {review.created_at ? new Date(review.created_at).toLocaleDateString('ru-RU') : 'Н/Д'}
                  </div>
                  {review.author_name && (
                    <div className="text-xs text-sage-500 mt-1">Публичный отзыв</div>
                  )}
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={() => setEditingReview(review)}
                    className="w-full px-4 py-2 bg-poppy-500 text-white rounded-lg hover:bg-poppy-600 transition-colors"
                  >
                    ✏️ Редактировать
                  </button>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleTogglePublished(review)}
                      className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                        review.published 
                          ? 'bg-orange-500 text-white hover:bg-orange-600' 
                          : 'bg-green-500 text-white hover:bg-green-600'
                      }`}
                    >
                      {review.published ? '🙈 Скрыть' : '👁️ Показать'}
                    </button>
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      🗑️ Удалить
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
    author_name: review?.author_name || '',
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
          content: formData.content,
          author_name: formData.author_name,
          rating: 5, // Default rating
          published: formData.published,
        })
      } else {
        // Create new review
        await reviewService.createReview({
          content: formData.content,
          author_name: formData.author_name,
          rating: 5, // Default rating
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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed inset-y-0 right-0 left-0 lg:left-64 flex items-center justify-center p-4">
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
              {/* Author Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Имя автора
                </label>
                <input
                  type="text"
                  value={formData.author_name}
                  onChange={(e) => setFormData({...formData, author_name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Введите имя автора отзыва"
                  required
                />
              </div>

              {/* Content Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Текст отзыва
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={4}
                  placeholder="Введите текст отзыва"
                  required
                />
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
    </div>
  )
} 