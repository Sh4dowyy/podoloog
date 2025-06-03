'use client'

import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { UserProfile } from '@/components/auth/UserProfile'
import Link from 'next/link'
import { useState } from 'react'

function BlogManagementContent() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Начало работы в подологии',
      status: 'published',
      date: '2024-01-15',
      excerpt: 'Изучите основы ухода за ногами и здоровья...'
    },
    {
      id: 2,
      title: 'Распространенные проблемы стоп и их решения',
      status: 'draft',
      date: '2024-01-10',
      excerpt: 'Изучаем наиболее частые проблемы со стопами...'
    }
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                ← Панель администратора
              </Link>
              <span className="text-gray-500">•</span>
              <span className="text-gray-600">Управление блогом</span>
            </div>
            <UserProfile />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Статьи блога</h1>
            <p className="text-gray-600 mt-2">
              Управляйте содержимым блога и статьями.
            </p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            + Новая статья
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-blue-600">2</div>
            <div className="text-sm text-gray-600">Всего статей</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-green-600">1</div>
            <div className="text-sm text-gray-600">Опубликовано</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-yellow-600">1</div>
            <div className="text-sm text-gray-600">Черновики</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-purple-600">0</div>
            <div className="text-sm text-gray-600">Просмотры сегодня</div>
          </div>
        </div>

        {/* Posts Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Последние статьи</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Название
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Дата
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {post.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {post.excerpt}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          post.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {post.status === 'published' ? 'Опубликовано' : 'Черновик'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString('ru-RU')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        Редактировать
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">🚧 Скоро</h3>
          <p className="text-blue-700 mb-4">
            Полная функциональность управления блогом находится в разработке. Это включает:
          </p>
          <ul className="list-disc list-inside text-blue-700 space-y-1 mb-4">
            <li>Редактор rich-text для создания статей</li>
            <li>Загрузка и управление изображениями</li>
            <li>Инструменты SEO оптимизации</li>
            <li>Модерация комментариев</li>
            <li>Публикация и планирование</li>
          </ul>
          <p className="text-blue-700">
            Эта страница демонстрирует защищенный админ-интерфейс.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function BlogManagementPage() {
  return (
    <ProtectedRoute>
      <BlogManagementContent />
    </ProtectedRoute>
  )
} 