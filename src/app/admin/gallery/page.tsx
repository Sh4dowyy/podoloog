'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/components/auth/AuthProvider';
import { useRouter } from 'next/navigation';
import { 
  IconPlus, 
  IconEdit, 
  IconTrash, 
  IconPhoto, 
  IconX,
  IconCheck,
  IconUpload
} from '@tabler/icons-react';
import { GalleryItem, UpdateGalleryItem } from '@/types/gallery';
import Image from 'next/image';

export default function AdminGalleryPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    title_ru: '',
    description: '',
    description_ru: '',
    image_url: ''
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>('');

  // Auth check
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // Fetch gallery items
  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/gallery');
      const data = await response.json();
      
      if (data.success) {
        setGalleryItems(data.data);
      }
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      setError('Ошибка загрузки галереи');
    } finally {
      setLoading(false);
    }
  };

  // Handle file upload
  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true);
      setError('');

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/gallery/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setFormData(prev => ({ ...prev, image_url: data.data.imageUrl }));
      } else {
        setError(data.error || 'Ошибка загрузки изображения');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Ошибка загрузки изображения');
    } finally {
      setUploading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.title_ru || !formData.image_url) {
      setError('Заполните все обязательные поля');
      return;
    }

    try {
      setError('');
      
      const url = editingItem ? `/api/gallery/${editingItem.id}` : '/api/gallery';
      const method = editingItem ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        await fetchGalleryItems();
        resetForm();
        setIsModalOpen(false);
      } else {
        setError(data.error || 'Ошибка сохранения');
      }
    } catch (error) {
      console.error('Error saving gallery item:', error);
      setError('Ошибка сохранения');
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот элемент?')) {
      return;
    }

    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        await fetchGalleryItems();
      } else {
        setError(data.error || 'Ошибка удаления');
      }
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      setError('Ошибка удаления');
    }
  };



  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      title_ru: '',
      description: '',
      description_ru: '',
      image_url: ''
    });
    setEditingItem(null);
    setError('');
  };

  // Open edit modal
  const openEditModal = (item: GalleryItem) => {
    setFormData({
      title: item.title,
      title_ru: item.title_ru,
      description: item.description || '',
      description_ru: item.description_ru || '',
      image_url: item.image_url
    });
    setEditingItem(item);
    setIsModalOpen(true);
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

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="glass-effect rounded-xl p-6 mb-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-sage-900 mb-2">Управление галереей</h1>
            <p className="text-sage-600">Добавляйте, редактируйте и удаляйте изображения галереи</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
            className="px-4 py-2 bg-poppy-500 text-white rounded-lg hover:bg-poppy-600 transition-colors flex items-center space-x-2"
          >
            <IconPlus className="h-4 w-4" />
            <span>Добавить изображение</span>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}



        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="text-lg text-sage-600 animate-pulse">Загрузка...</div>
          </div>
        )}

        {/* Gallery Items Grid */}
        {!loading && (
          galleryItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-sage-600">Изображения не найдены</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="glass-effect rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border"
                >
                  {/* Image Header */}
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-sage-900 mb-2 line-clamp-1">
                      {item.title}
                    </h3>
                    <div className="w-12 h-12 bg-poppy-100 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-2xl">🖼️</span>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="mb-4 text-center">
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      width={200}
                      height={150}
                      className="w-full h-32 object-cover rounded mx-auto"
                    />
                  </div>

                  {/* Titles */}
                  <div className="mb-4 text-center">
                    <div className="text-sm font-medium text-sage-900 mb-1">
                      {item.title}
                    </div>
                    <div className="text-sm text-sage-600">
                      {item.title_ru}
                    </div>
                  </div>

                  {/* Description */}
                  {(item.description || item.description_ru) && (
                    <div className="mb-4">
                      <p className="text-sm text-sage-700 line-clamp-2 text-center">
                        {item.description || item.description_ru}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="space-y-3">
                    <button
                      onClick={() => openEditModal(item)}
                      className="w-full px-4 py-2 bg-poppy-500 text-white rounded-lg hover:bg-poppy-600 transition-colors"
                    >
                      ✏️ Редактировать
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      🗑️ Удалить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}


      </div>

      {/* Modal for Add/Edit */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingItem ? 'Редактировать изображение' : 'Добавить изображение'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <IconX className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-sage-700 mb-2">
                    Изображение *
                  </label>
                  {formData.image_url ? (
                    <div className="relative">
                      <Image
                        src={formData.image_url}
                        alt="Preview"
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, image_url: '' }))}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-lg hover:bg-red-600"
                      >
                        <IconX className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file);
                        }}
                        className="hidden"
                        id="image-upload"
                        disabled={uploading}
                      />
                      <label
                        htmlFor="image-upload"
                        className={`cursor-pointer flex flex-col items-center ${
                          uploading ? 'pointer-events-none opacity-50' : ''
                        }`}
                      >
                        <IconUpload className="h-12 w-12 text-gray-400 mb-2" />
                        <span className="text-gray-600">
                          {uploading ? 'Загрузка...' : 'Выберите изображение'}
                        </span>
                        <span className="text-xs text-gray-500 mt-1">
                          JPEG, PNG, WebP до 5MB
                        </span>
                      </label>
                    </div>
                  )}
                </div>

                {/* Title Estonian */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Название (эстонский) *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Title Russian */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Название (русский) *
                  </label>
                  <input
                    type="text"
                    value={formData.title_ru}
                    onChange={(e) => setFormData(prev => ({ ...prev, title_ru: e.target.value }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Description Estonian */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Описание (эстонский)
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 h-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Description Russian */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Описание (русский)
                  </label>
                  <textarea
                    value={formData.description_ru}
                    onChange={(e) => setFormData(prev => ({ ...prev, description_ru: e.target.value }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 h-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>





                {/* Error */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={uploading || !formData.image_url}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <IconCheck className="h-4 w-4" />
                    <span>{editingItem ? 'Обновить' : 'Добавить'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300"
                  >
                    Отмена
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 