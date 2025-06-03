'use client'

import { useAuth } from '@/components/auth/AuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { UserProfile } from '@/components/auth/UserProfile'

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

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

  const handleSaveProfile = async () => {
    setSaving(true)
    setMessage('')
    
    // TODO: Implement profile update functionality
    setTimeout(() => {
      setSaving(false)
      setMessage('Функциональность обновления профиля скоро появится!')
    }, 1000)
  }

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
              <span className="text-gray-600">Настройки профиля</span>
            </div>
            <UserProfile />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Настройки профиля</h1>
          <p className="text-gray-600 mt-2">
            Управляйте информацией об аккаунте и предпочтениями.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Информация об аккаунте</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email адрес
                  </label>
                  <input
                    type="email"
                    value={user.email || ''}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Email нельзя изменить напрямую. Обратитесь в поддержку при необходимости.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Полное имя
                  </label>
                  <input
                    type="text"
                    defaultValue={user.user_metadata?.full_name || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Введите ваше полное имя"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    О себе
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Расскажите о себе..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Веб-сайт
                  </label>
                  <input
                    type="url"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Местоположение
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Город, Страна"
                  />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {saving ? 'Сохранение...' : 'Сохранить изменения'}
                  </button>
                  
                  {message && (
                    <span className="text-sm text-gray-600">{message}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Информация об аккаунте</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-500">Участник с:</span>
                  <br />
                  <span className="text-gray-900">
                    {new Date(user.created_at).toLocaleDateString('ru-RU')}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Последний вход:</span>
                  <br />
                  <span className="text-gray-900">
                    {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString('ru-RU') : 'Н/Д'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">ID пользователя:</span>
                  <br />
                  <span className="text-gray-900 font-mono text-xs">
                    {user.id}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Быстрые действия</h3>
              <div className="space-y-3">
                <Link
                  href="/admin"
                  className="block w-full text-center bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Вернуться к панели
                </Link>
                <Link
                  href="/demo"
                  className="block w-full text-center bg-blue-100 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 transition-colors"
                >
                  Попробовать демо
                </Link>
                <Link
                  href="/"
                  className="block w-full text-center bg-green-100 text-green-700 px-4 py-2 rounded-md hover:bg-green-200 transition-colors"
                >
                  Посмотреть портфолио
                </Link>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-900 mb-4">Опасная зона</h3>
              <p className="text-sm text-red-700 mb-4">
                Эти действия нельзя отменить.
              </p>
              <button className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
                Удалить аккаунт
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 