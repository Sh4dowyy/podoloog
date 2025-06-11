import { NextRequest, NextResponse } from 'next/server';
import { supabase, createSupabaseBrowserClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Проверяем размер файла (максимум 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large. Maximum size is 10MB.' }, { status: 400 });
    }

    // Проверяем тип файла
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only images are allowed.' }, { status: 400 });
    }

    // Генерируем уникальное имя файла
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = file.name.split('.').pop() || 'jpg';
    const fileName = `product-${timestamp}-${randomString}.${fileExtension}`;

    // Преобразуем File в ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Используем браузерный клиент или серверный клиент
    const client = createSupabaseBrowserClient() || supabase;
    
    if (!client) {
      return NextResponse.json({ error: 'Storage service not available' }, { status: 500 });
    }

    // Загружаем файл в Supabase Storage
    const { data, error } = await client.storage
      .from('product-images')
      .upload(fileName, uint8Array, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }

    // Получаем публичный URL
    const { data: urlData } = client.storage
      .from('product-images')
      .getPublicUrl(fileName);

    return NextResponse.json({ 
      url: urlData.publicUrl,
      fileName: fileName 
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 