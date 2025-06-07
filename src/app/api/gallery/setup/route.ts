import { NextRequest, NextResponse } from 'next/server';
import { supabaseClient } from '@/lib/supabase-client';

// POST /api/gallery/setup - Setup gallery storage and database
export async function POST(request: NextRequest) {
  try {
    // Create storage bucket
    const { data: bucketData, error: bucketError } = await supabaseClient.storage
      .createBucket('gallery', {
        public: true,
        allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
        fileSizeLimit: 5242880 // 5MB
      });

    if (bucketError && bucketError.message !== 'Bucket already exists') {
      console.error('Error creating bucket:', bucketError);
      return NextResponse.json(
        { success: false, error: `Failed to create storage bucket: ${bucketError.message}` },
        { status: 500 }
      );
    }

    // Test bucket access
    const { data: buckets, error: listError } = await supabaseClient.storage.listBuckets();
    
    if (listError) {
      console.error('Error listing buckets:', listError);
      return NextResponse.json(
        { success: false, error: 'Failed to verify bucket creation' },
        { status: 500 }
      );
    }

    const galleryBucket = buckets?.find(bucket => bucket.name === 'gallery');
    
    if (!galleryBucket) {
      return NextResponse.json(
        { success: false, error: 'Gallery bucket was not created properly' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Gallery storage setup completed successfully',
      data: {
        bucket: galleryBucket,
        bucketCreated: bucketError?.message !== 'Bucket already exists'
      }
    });

  } catch (error) {
    console.error('Error in gallery setup:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to setup gallery storage' },
      { status: 500 }
    );
  }
} 