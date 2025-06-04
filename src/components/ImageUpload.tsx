import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { credentialService } from '@/lib/credentials';

interface ImageUploadProps {
  currentImageUrl?: string;
  onImageChange: (imageUrl: string | null) => void;
  folder?: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  currentImageUrl,
  onImageChange,
  folder = 'uploads',
  width = 400,
  height = 300,
  className = '',
  placeholder = 'Нажмите для загрузки изображения'
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Проверка типа файла
    if (!file.type.startsWith('image/')) {
      setUploadError('Пожалуйста, выберите изображение');
      return;
    }

    // Проверка размера файла (максимум 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Размер файла не должен превышать 5MB');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      // Удаляем старое изображение если есть
      if (currentImageUrl) {
        await credentialService.deleteImage(currentImageUrl);
      }

      // Загружаем новое изображение
      const imageUrl = await credentialService.uploadImage(file, folder);
      if (imageUrl) {
        onImageChange(imageUrl);
      } else {
        setUploadError('Ошибка при загрузке изображения');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      
      // Более детальная обработка ошибок
      let errorMessage = 'Ошибка при загрузке изображения';
      if (error instanceof Error) {
        console.error('Error details:', error.message);
        errorMessage = `Ошибка: ${error.message}`;
      }
      
      setUploadError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = async () => {
    if (!currentImageUrl) return;

    setIsUploading(true);
    try {
      await credentialService.deleteImage(currentImageUrl);
      onImageChange(null);
    } catch (error) {
      console.error('Error removing image:', error);
      setUploadError('Ошибка при удалении изображения');
    } finally {
      setIsUploading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div
        onClick={handleClick}
        className={`
          relative border-2 border-dashed border-gray-300 rounded-lg cursor-pointer
          hover:border-gray-400 transition-colors bg-gray-50 hover:bg-gray-100
          ${isUploading ? 'pointer-events-none opacity-50' : ''}
        `}
        style={{ width, height }}
      >
        {currentImageUrl ? (
          <div className="relative w-full h-full">
            <Image
              src={currentImageUrl}
              alt="Uploaded image"
              fill
              className="object-contain rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center">
              <span className="text-white opacity-0 hover:opacity-100 text-sm font-medium">
                Нажмите для изменения
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <svg
              className="w-12 h-12 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-sm text-center px-4">{placeholder}</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF до 5MB</p>
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-sm text-gray-600">Загрузка...</span>
            </div>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {currentImageUrl && (
        <button
          onClick={handleRemoveImage}
          disabled={isUploading}
          className="px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
        >
          Удалить изображение
        </button>
      )}

      {uploadError && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
          {uploadError}
        </div>
      )}
    </div>
  );
}; 