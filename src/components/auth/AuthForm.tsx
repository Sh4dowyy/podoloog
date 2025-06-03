'use client'

import { useState } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase'
import { useLanguage } from '../i18n/LanguageProvider'

interface AuthFormProps {
  mode?: 'signin' | 'signup'
  onSuccess?: () => void
}

export function AuthForm({ mode = 'signin', onSuccess }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isSignUp, setIsSignUp] = useState(mode === 'signup')
  const { t, currentLanguage } = useLanguage()
  
  const supabase = createSupabaseBrowserClient()

  if (!supabase) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">{currentLanguage === 'et' ? 'Autentimine pole saadaval' : 'Аутентификация недоступна'}</h2>
        <p className="text-center text-gray-600">
          {currentLanguage === 'et' 
            ? 'Supabase konfiguratsioon puudub. Palun seadista keskkonnamuutujad.'
            : 'Конфигурация Supabase не найдена. Пожалуйста, настройте переменные окружения.'
          }
        </p>
      </div>
    )
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        })
        
        if (error) throw error
        
        if (data.user && !data.session) {
          setMessage(currentLanguage === 'et' 
            ? 'Kontrollige oma e-posti kinnituslinki!'
            : 'Проверьте свой email для подтверждения ссылки!'
          )
        } else {
          setMessage(currentLanguage === 'et' 
            ? 'Konto edukalt loodud!'
            : 'Аккаунт успешно создан!'
          )
          onSuccess?.()
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        
        if (error) throw error
        
        setMessage(currentLanguage === 'et' 
          ? 'Sisselogimine õnnestus!'
          : 'Вход выполнен успешно!'
        )
        onSuccess?.()
      }
    } catch (error: any) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) throw error
    } catch (error: any) {
      setMessage(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">
        {isSignUp ? t('signUp') : t('signIn')}
      </h2>
      
      <form onSubmit={handleAuth} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            {t('email')}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            {t('password')}
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? t('loading') : (isSignUp ? t('signUp') : t('signIn'))}
        </button>
      </form>
      
      <div className="mt-4">
        <button
          onClick={handleGoogleAuth}
          disabled={loading}
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
        >
          {t('continueWithGoogle')}
        </button>
      </div>
      
      <div className="mt-4 text-center">
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-blue-600 hover:underline"
        >
          {isSignUp 
            ? t('alreadyHaveAccount')
            : t('dontHaveAccount')
          }
        </button>
      </div>
      
      {message && (
        <div className={`mt-4 p-3 rounded-md ${
          message.includes('error') || message.includes('Error') || message.includes('ошибка')
            ? 'bg-red-100 text-red-700'
            : 'bg-green-100 text-green-700'
        }`}>
          {message}
        </div>
      )}
    </div>
  )
} 