import { NextRequest, NextResponse } from 'next/server';
import { getGalleryItems, createGalleryItem } from '@/lib/gallery';
import { CreateGalleryItem } from '@/types/gallery';

// GET /api/gallery - Get all gallery items with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    const offset = searchParams.get('offset');

    const filters = {
      ...(limit && { limit: parseInt(limit) }),
      ...(offset && { offset: parseInt(offset) })
    };

    const galleryItems = await getGalleryItems(filters);
    
    return NextResponse.json({
      success: true,
      data: galleryItems,
      count: galleryItems.length
    });
  } catch (error) {
    console.error('Error in GET /api/gallery:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch gallery items' },
      { status: 500 }
    );
  }
}

// POST /api/gallery - Create new gallery item
export async function POST(request: NextRequest) {
  try {
    const body: CreateGalleryItem = await request.json();
    
    // Validate required fields
    if (!body.title || !body.title_ru || !body.image_url) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newItem = await createGalleryItem(body);
    
    if (!newItem) {
      return NextResponse.json(
        { success: false, error: 'Failed to create gallery item' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: newItem
    }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/gallery:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create gallery item' },
      { status: 500 }
    );
  }
} 