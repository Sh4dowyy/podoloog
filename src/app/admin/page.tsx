'use client'

import { useAuth } from '@/components/auth/AuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

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
      title: 'Управление услугами',
      description: 'Создавайте и редактируйте услуги',
      href: '/admin/services',
      icon: '💼',
      status: 'Доступно'
    },
    {
      title: 'Управление продукцией',
      description: 'Создавайте и редактируйте используемые бренды и продукты',
      href: '/admin/products',
      icon: '🏷️',
      status: 'Доступно'
    },
    {
      title: 'Управление дипломами',
      description: 'Создавайте и редактируйте дипломы и сертификаты',
      href: '/admin/credentials',
      icon: '🏆',
      status: 'Доступно'
    },
    {
      title: 'Управление биомеханикой',
      description: 'Создавайте и редактируйте материалы по упражнениям, гигиене и физкультуре',
      href: '/admin/biomechanics',
      icon: '🦶',
      status: 'Доступно'
    },
    {
      title: 'Управление галереей',
      description: 'Добавляйте и редактируйте изображения в галерее',
      href: '/admin/gallery',
      icon: '🖼️',
      status: 'Доступно'
    },
    {
      title: 'Управление ценностями',
      description: 'Создавайте и редактируйте ценности компании',
      href: '/admin/values',
      icon: '💎',
      status: 'Доступно'
    }
  ]

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="glass-effect rounded-xl p-6 mb-6">
        <h1 className="text-2xl font-bold text-sage-900 mb-4">
          Панель администратора
        </h1>
        <p className="text-sage-600 mb-6">
          Управляйте содержимым и настройками вашего портфолио
        </p>

        {/* Admin Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminFeatures.map((feature, index) => (
            <div
              key={index}
              className="glass-effect rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border"
            >
              {/* Feature Header */}
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-sage-900 mb-2">
                  {feature.title}
                </h3>
                <div className="w-12 h-12 bg-poppy-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <p className="text-sm text-sage-700 leading-relaxed text-center">
                  {feature.description}
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                {feature.status === 'Доступно' ? (
                  <Link
                    href={feature.href}
                    className="w-full px-4 py-2 bg-poppy-500 text-white rounded-lg hover:bg-poppy-600 transition-colors text-center block"
                  >
                    🛠️ Управлять
                  </Link>
                ) : (
                  <div className="w-full px-4 py-2 bg-sage-300 text-sage-600 rounded-lg text-center cursor-not-allowed">
                    ⏳ Скоро
                  </div>
                )}
              </div>

              {/* Status Badge */}
              <div className="mt-4 text-center">
                <span className={`inline-block px-3 py-1 text-xs rounded-full ${
                  feature.status === 'Доступно' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {feature.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 