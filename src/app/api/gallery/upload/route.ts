import { NextRequest, NextResponse } from 'next/server';
import { uploadGalleryImage } from '@/lib/gallery';
import { supabaseClient } from '@/lib/supabase-client';

// POST /api/gallery/upload - Upload image to gallery
export async function POST(request: NextRequest) {
  try {
    // Check user authentication
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    console.log('Upload attempt - User:', user ? user.id : 'Not authenticated');
    console.log('Auth error:', authError);

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const fileName = `${timestamp}_${randomString}.${fileExtension}`;

    // Upload to Supabase Storage
    const imageUrl = await uploadGalleryImage(file, fileName);
    
    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: 'Failed to upload image' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        imageUrl,
        fileName
      }
    });
  } catch (error) {
    console.error('Error in POST /api/gallery/upload:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload image' },
      { status: 500 }
    );
  }
} 