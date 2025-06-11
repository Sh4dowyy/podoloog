'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function SupabaseTest() {
  const [status, setStatus] = useState<string>('Проверка подключения...');
  const [details, setDetails] = useState<string[]>([]);

  useEffect(() => {
    testSupabaseConnection();
  }, []);

  const testSupabaseConnection = async () => {
    const testResults: string[] = [];
    
    try {
      // Проверка клиента Supabase
      if (!supabase) {
        setStatus('❌ Ошибка: Supabase клиент не инициализирован');
        testResults.push('Проверьте переменные окружения NEXT_PUBLIC_SUPABASE_URL и NEXT_PUBLIC_SUPABASE_ANON_KEY');
        setDetails(testResults);
        return;
      }
      
      testResults.push('✅ Supabase клиент инициализирован');
      
      // Проверка аутентификации
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError) {
        testResults.push(`⚠️ Ошибка проверки аутентификации: ${authError.message}`);
      } else if (user) {
        testResults.push(`✅ Пользователь аутентифицирован: ${user.email}`);
      } else {
        testResults.push('⚠️ Пользователь не аутентифицирован (анонимный доступ)');
      }
      
      // Проверка подключения к базе данных
      const { data: connectionTest, error: connectionError } = await supabase
        .from('values')
        .select('count')
        .limit(1);
      
      if (connectionError) {
        setStatus('❌ Ошибка подключения к базе данных');
        testResults.push(`Ошибка: ${connectionError.message}`);
        
        if (connectionError.code === 'PGRST116') {
          testResults.push('❌ Таблица "values" не найдена');
          testResults.push('Необходимо выполнить SQL скрипт создания таблицы');
        }
      } else {
        testResults.push('✅ Подключение к базе данных работает');
        testResults.push('✅ Таблица "values" существует');
        
        // Проверка количества записей
        const { data: countData, error: countError } = await supabase
          .from('values')
          .select('*', { count: 'exact' });
          
        if (!countError) {
          testResults.push(`📊 Количество записей в таблице: ${countData?.length || 0}`);
        }
        
        // Проверка возможности записи
        const testValue = {
          title_et: 'Test Value',
          title_ru: 'Тестовая ценность',
          description_et: 'Test description',
          description_ru: 'Тестовое описание',
          icon: '🧪',
          order_index: 999,
          is_active: false
        };
        
        const { error: insertError } = await supabase
          .from('values')
          .insert([testValue])
          .select();
          
        if (insertError) {
          testResults.push(`❌ Ошибка записи: ${insertError.message}`);
          if (insertError.code === '42501') {
            testResults.push('❌ Проблема с RLS политиками - выполните fix-values-rls.sql');
          }
        } else {
          testResults.push('✅ Запись в таблицу работает');
          
          // Удаляем тестовую запись
          await supabase
            .from('values')
            .delete()
            .eq('title_et', 'Test Value')
            .eq('order_index', 999);
        }
        
        setStatus('✅ Все проверки пройдены успешно');
      }
      
    } catch (error) {
      setStatus('❌ Критическая ошибка');
      testResults.push(`Ошибка: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
    }
    
    setDetails(testResults);
  };

  return (
    <div className="glass-effect rounded-xl p-6 mb-6">
      <h2 className="text-xl font-bold text-sage-900 mb-4">
        🔧 Диагностика Supabase
      </h2>
      
      <div className="mb-4">
        <div className="text-lg font-semibold mb-2">{status}</div>
        <div className="space-y-1">
          {details.map((detail, index) => (
            <div key={index} className="text-sm text-sage-700">
              {detail}
            </div>
          ))}
        </div>
      </div>
      
      <button
        onClick={testSupabaseConnection}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        🔄 Повторить проверку
      </button>
    </div>
  );
} 