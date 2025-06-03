'use client'

import { useAuth } from '@/components/auth/AuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { blogService } from '@/lib/blog'
import { BlogPost, CreateBlogPostData } from '@/types/blog'
import { IconPlus, IconEdit, IconTrash } from '@tabler/icons-react'

export default function BlogManagementPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loadingPosts, setLoadingPosts] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      loadPosts()
    }
  }, [user])

  const loadPosts = async () => {
    try {
      const data = await blogService.getAllPosts()
      setPosts(data)
    } catch (error) {
      console.error('Error loading posts:', error)
    } finally {
      setLoadingPosts(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены?')) {
      return
    }

    try {
      await blogService.deletePost(id)
      await loadPosts()
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Ошибка при удалении поста')
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
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Управление блогом</h1>
            <p className="text-gray-600 mt-2">Создавайте и редактируйте записи в блоге</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <IconPlus className="h-4 w-4" />
            <span>Новый пост</span>
          </button>
        </div>

        {/* Posts Table */}
        {loadingPosts ? (
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
                      Заголовок
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Статус
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Дата
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-24 sm:w-auto">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {posts.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                        Записи не найдены
                      </td>
                    </tr>
                  ) : (
                    posts.map((post) => (
                      <tr key={post.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{post.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{post.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            post.published 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {post.published ? 'Опубликовано' : 'Черновик'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(post.created_at).toLocaleDateString('ru-RU')}
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex justify-end space-x-1 sm:space-x-2">
                            <button
                              onClick={() => setEditingPost(post)}
                              className="text-indigo-600 hover:text-indigo-900 p-1"
                              title="Редактировать"
                            >
                              <IconEdit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(post.id)}
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
      {(showCreateForm || editingPost) && (
        <BlogPostForm
          post={editingPost}
          onClose={() => {
            setShowCreateForm(false)
            setEditingPost(null)
          }}
          onSave={async () => {
            setShowCreateForm(false)
            setEditingPost(null)
            await loadPosts()
          }}
        />
      )}
    </div>
  )
}

// Blog Post Form Component
function BlogPostForm({ 
  post, 
  onClose, 
  onSave 
}: { 
  post?: BlogPost | null
  onClose: () => void
  onSave: () => void
}) {
  const [formData, setFormData] = useState({
    title: post?.title_et || post?.title || '', // Default to ET title
    title_et: post?.title_et || '',
    title_ru: post?.title_ru || '',
    description: post?.description_et || post?.description || '', // Default to ET description
    description_et: post?.description_et || '',
    description_ru: post?.description_ru || '',
    content: post?.content_et || post?.content || '', // Default to ET content
    content_et: post?.content_et || '',
    content_ru: post?.content_ru || '',
    image_url: post?.image_url || '',
    published: post?.published || false,
  })
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const slug = blogService.generateSlug(formData.title_et || formData.title)
      
      if (post) {
        // Update existing post
        await blogService.updatePost({
          id: post.id,
          title: formData.title_et || formData.title, // Use ET as primary
          title_et: formData.title_et,
          title_ru: formData.title_ru,
          description: formData.description_et || formData.description,
          description_et: formData.description_et,
          description_ru: formData.description_ru,
          content: formData.content_et || formData.content,
          content_et: formData.content_et,
          content_ru: formData.content_ru,
          image_url: formData.image_url,
          published: formData.published,
          slug,
        })
      } else {
        // Create new post
        await blogService.createPost({
          title: formData.title_et || formData.title,
          title_et: formData.title_et,
          title_ru: formData.title_ru,
          description: formData.description_et || formData.description,
          description_et: formData.description_et,
          description_ru: formData.description_ru,
          content: formData.content_et || formData.content,
          content_et: formData.content_et,
          content_ru: formData.content_ru,
          image_url: formData.image_url,
          published: formData.published,
          slug,
        })
      }
      
      onSave()
    } catch (error) {
      console.error('Error saving post:', error)
      alert('Ошибка при сохранении записи')
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
                {post ? 'Редактировать запись' : 'Новая статья'}
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
                    Заголовок (ET)
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
                    Заголовок (RU)
                  </label>
                  <input
                    type="text"
                    value={formData.title_ru}
                    onChange={(e) => setFormData({...formData, title_ru: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              {/* Description Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Описание (ET)
                  </label>
                  <textarea
                    value={formData.description_et}
                    onChange={(e) => setFormData({...formData, description_et: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={3}
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
                    rows={3}
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL изображения
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              {/* Content Fields */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Содержание</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Содержание (ET)
                  </label>
                  <textarea
                    value={formData.content_et}
                    onChange={(e) => setFormData({...formData, content_et: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={8}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Содержание (RU)
                  </label>
                  <textarea
                    value={formData.content_ru}
                    onChange={(e) => setFormData({...formData, content_ru: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={8}
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
                  Опубликовано
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