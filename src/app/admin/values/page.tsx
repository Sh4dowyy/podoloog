'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { useRouter } from 'next/navigation';
import { ValuesService } from '@/lib/values';
import { Value, CreateValueData, UpdateValueData } from '@/types/value';
import { useLanguage } from '@/components/i18n/LanguageProvider';

export default function AdminValuesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [values, setValues] = useState<Value[]>([]);
  const [editingValue, setEditingValue] = useState<Value | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<CreateValueData>({
    title_et: '',
    title_ru: '',
    description_et: '',
    description_ru: '',
    icon: '💼',
    order_index: 0,
    is_active: true
  });
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      loadValues();
    }
  }, [user]);

  const loadValues = async () => {
    try {
      setLoading(true);
      const data = await ValuesService.getAllValues();
      setValues(data);
    } catch (error) {
      console.error('Error loading values:', error);
      alert('Ошибка при загрузке ценностей');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingValue) {
        // Обновление существующей ценности
        const updateData: UpdateValueData = {
          id: editingValue.id,
          ...formData
        };
        console.log('Updating value:', updateData);
        await ValuesService.updateValue(updateData);
        alert('Ценность успешно обновлена!');
      } else {
        // Создание новой ценности
        console.log('Creating value:', formData);
        await ValuesService.createValue(formData);
        alert('Ценность успешно создана!');
      }
      
      await loadValues();
      resetForm();
    } catch (error) {
      console.error('Error saving value:', error);
      let errorMessage = 'Ошибка при сохранении ценности';
      
      if (error instanceof Error) {
        errorMessage += ': ' + error.message;
      }
      
      alert(errorMessage);
    }
  };

  const handleEdit = (value: Value) => {
    setEditingValue(value);
    setFormData({
      title_et: value.title_et,
      title_ru: value.title_ru,
      description_et: value.description_et,
      description_ru: value.description_ru,
      icon: value.icon,
      order_index: value.order_index,
      is_active: value.is_active
    });
    setIsCreating(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Вы уверены, что хотите удалить эту ценность?')) {
      try {
        await ValuesService.deleteValue(id);
        await loadValues();
      } catch (error) {
        console.error('Error deleting value:', error);
        alert('Ошибка при удалении ценности');
      }
    }
  };

  const handleToggleStatus = async (id: number, isActive: boolean) => {
    try {
      await ValuesService.toggleValueStatus(id, !isActive);
      await loadValues();
    } catch (error) {
      console.error('Error toggling status:', error);
      alert('Ошибка при изменении статуса');
    }
  };

  const resetForm = () => {
    setEditingValue(null);
    setIsCreating(false);
    setFormData({
      title_et: '',
      title_ru: '',
      description_et: '',
      description_ru: '',
      icon: '💼',
      order_index: values.length,
      is_active: true
    });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600 animate-pulse">Загрузка...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="glass-effect rounded-xl p-8 text-center">
          <div className="text-sage-600">Загрузка ценностей...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      
      <div className="glass-effect rounded-xl p-6 mb-6">
        <h1 className="text-2xl font-bold text-sage-900 mb-6">
          {currentLanguage === 'et' ? 'Väärtuste Haldamine' : 'Управление Ценностями'}
        </h1>
        
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sage-600">Создавайте и редактируйте ценности компании</p>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-2 bg-poppy-500 text-white rounded-lg hover:bg-poppy-600 transition-colors flex items-center space-x-2"
          >
            <span>➕</span>
            <span>{currentLanguage === 'et' ? 'Lisa Uus Väärtus' : 'Добавить Новую Ценность'}</span>
          </button>
        </div>

        {/* Форма создания/редактирования */}
        {isCreating && (
          <div className="mb-8 p-6 bg-sage-50 rounded-lg border">
            <h2 className="text-xl font-semibold text-sage-900 mb-4">
              {editingValue 
                ? (currentLanguage === 'et' ? 'Muuda Väärtust' : 'Редактировать Ценность')
                : (currentLanguage === 'et' ? 'Lisa Uus Väärtus' : 'Добавить Новую Ценность')
              }
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-1">
                    {currentLanguage === 'et' ? 'Pealkiri (Eesti)' : 'Заголовок (Эстонский)'}
                  </label>
                  <input
                    type="text"
                    value={formData.title_et}
                    onChange={(e) => setFormData(prev => ({ ...prev, title_et: e.target.value }))}
                    className="w-full px-3 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-poppy-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-1">
                    {currentLanguage === 'et' ? 'Pealkiri (Vene)' : 'Заголовок (Русский)'}
                  </label>
                  <input
                    type="text"
                    value={formData.title_ru}
                    onChange={(e) => setFormData(prev => ({ ...prev, title_ru: e.target.value }))}
                    className="w-full px-3 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-poppy-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-sage-700 mb-1">
                  {currentLanguage === 'et' ? 'Kirjeldus (Eesti)' : 'Описание (Эстонский)'}
                </label>
                <textarea
                  value={formData.description_et}
                  onChange={(e) => setFormData(prev => ({ ...prev, description_et: e.target.value }))}
                  className="w-full px-3 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-poppy-500"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-sage-700 mb-1">
                  {currentLanguage === 'et' ? 'Kirjeldus (Vene)' : 'Описание (Русский)'}
                </label>
                <textarea
                  value={formData.description_ru}
                  onChange={(e) => setFormData(prev => ({ ...prev, description_ru: e.target.value }))}
                  className="w-full px-3 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-poppy-500"
                  rows={3}
                  required
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-1">
                    {currentLanguage === 'et' ? 'Ikoon' : 'Иконка'}
                  </label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                    className="w-full px-3 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-poppy-500"
                    placeholder="🔥"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-1">
                    {currentLanguage === 'et' ? 'Järjekord' : 'Порядок'}
                  </label>
                  <input
                    type="number"
                    value={formData.order_index}
                    onChange={(e) => setFormData(prev => ({ ...prev, order_index: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-poppy-500"
                    min="0"
                  />
                </div>
                
                <div className="flex items-center">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                      className="w-4 h-4 text-poppy-500 border-sage-300 rounded focus:ring-poppy-500"
                    />
                    <span className="text-sm font-medium text-sage-700">
                      {currentLanguage === 'et' ? 'Aktiivne' : 'Активна'}
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-poppy-500 text-white rounded-lg hover:bg-poppy-600 transition-colors"
                >
                  {editingValue 
                    ? (currentLanguage === 'et' ? 'Uuenda' : 'Обновить')
                    : (currentLanguage === 'et' ? 'Loo' : 'Создать')
                  }
                </button>
                
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 bg-sage-300 text-sage-700 rounded-lg hover:bg-sage-400 transition-colors"
                >
                  {currentLanguage === 'et' ? 'Tühista' : 'Отмена'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Список ценностей */}
        {values.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-sage-600">
              {currentLanguage === 'et' ? 'Väärtuseid pole veel lisatud' : 'Ценности еще не добавлены'}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => (
              <div 
                key={value.id}
                className={`glass-effect rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border ${
                  value.is_active ? '' : 'opacity-60'
                }`}
              >
                {/* Value Header */}
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-sage-900 mb-2 line-clamp-2">
                    {currentLanguage === 'et' ? value.title_et : value.title_ru}
                  </h3>
                  <div className="w-12 h-12 bg-poppy-100 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl">{value.icon}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <p className="text-sm text-sage-700 line-clamp-3 text-center">
                    {currentLanguage === 'et' ? value.description_et : value.description_ru}
                  </p>
                </div>

                {/* Status and Order */}
                <div className="mb-4 text-center">
                  <span className={`inline-block px-3 py-1 text-xs rounded-full mb-2 ${
                    value.is_active 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {value.is_active 
                      ? (currentLanguage === 'et' ? 'Aktiivne' : 'Активна')
                      : (currentLanguage === 'et' ? 'Passiivne' : 'Неактивна')
                    }
                  </span>
                  <div className="text-xs text-sage-600">
                    Порядок: {value.order_index}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={() => handleEdit(value)}
                    className="w-full px-4 py-2 bg-poppy-500 text-white rounded-lg hover:bg-poppy-600 transition-colors"
                  >
                    ✏️ {currentLanguage === 'et' ? 'Muuda' : 'Редактировать'}
                  </button>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleToggleStatus(value.id, value.is_active)}
                      className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                        value.is_active 
                          ? 'bg-orange-500 text-white hover:bg-orange-600' 
                          : 'bg-green-500 text-white hover:bg-green-600'
                      }`}
                    >
                      {value.is_active 
                        ? `🙈 ${currentLanguage === 'et' ? 'Peida' : 'Скрыть'}`
                        : `👁️ ${currentLanguage === 'et' ? 'Näita' : 'Показать'}`
                      }
                    </button>
                    <button
                      onClick={() => handleDelete(value.id)}
                      className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      🗑️ {currentLanguage === 'et' ? 'Kustuta' : 'Удалить'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 