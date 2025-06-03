'use client'

import { useAuth } from '@/components/auth/AuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { UserProfile } from '@/components/auth/UserProfile'

export default function AdminPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

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

  const adminFeatures = [
    {
      title: 'Управление блогом',
      description: 'Создавайте и редактируйте записи в блоге',
      href: '/admin/blog',
      icon: '📝',
      status: 'Доступно'
    },
    {
      title: 'Управление отзывами',
      description: 'Создавайте и редактируйте отзывы клиентов',
      href: '/admin/reviews',
      icon: '⭐',
      status: 'Доступно'
    },
    {
      title: 'Загрузка изображений',
      description: 'Управляйте изображениями портфолио и галереей',
      href: '/admin/images',
      icon: '🖼️',
      status: 'Скоро'
    },
    {
      title: 'Управление проектами',
      description: 'Добавляйте и обновляйте проекты портфолио',
      href: '/admin/projects',
      icon: '🚀',
      status: 'Скоро'
    }
  ]

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
              <span className="text-gray-600">Панель администратора</span>
            </div>
            <UserProfile />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Добро пожаловать!</h1>
          <p className="text-gray-600 mt-2">
            Управляйте содержимым и настройками вашего портфолио
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{feature.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        feature.status === 'Доступно'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {feature.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {feature.description}
                  </p>
                  {feature.status === 'Доступно' ? (
                    <Link
                      href={feature.href}
                      className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Перейти →
                    </Link>
                  ) : (
                    <span className="text-sm text-gray-400">
                      Скоро
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 