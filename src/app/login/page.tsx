'use client'

import { AuthForm } from '@/components/auth/AuthForm'
import { useAuth } from '@/components/auth/AuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/components/i18n/LanguageProvider'

export default function LoginPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { t, currentLanguage } = useLanguage()

  useEffect(() => {
    if (!loading && user) {
      router.push('/admin')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-lg text-gray-600 animate-pulse">{t('loading')}</div>
      </div>
    )
  }

  if (user) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              {t('profession')}
            </h1>
          </Link>
          <p className="mt-2 text-gray-600">
            {t('signInToManage')}
          </p>
        </div>
        
        <AuthForm 
          mode="signin" 
          onSuccess={() => router.push('/admin')} 
        />
        
        <div className="text-center">
          <Link 
            href="/" 
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← {t('backToPortfolio')}
          </Link>
        </div>
      </div>
    </div>
  )
} 