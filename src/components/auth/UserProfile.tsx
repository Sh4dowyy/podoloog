'use client'

import { useAuth } from './AuthProvider'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '../i18n/LanguageProvider'

export function UserProfile() {
  const { user, loading, signOut } = useAuth()
  const { t } = useLanguage()

  if (loading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center space-x-2">
        <Link 
          href="/login"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          {t('signIn')}
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2">
        {user.user_metadata?.avatar_url ? (
          <Image
            src={user.user_metadata.avatar_url}
            alt={t('profile')}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user.email?.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {user.user_metadata?.full_name || user.email}
        </span>
      </div>
      
      <button
        onClick={signOut}
        className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
      >
        {t('signOut')}
      </button>
    </div>
  )
} 