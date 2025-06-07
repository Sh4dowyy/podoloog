import { NextRequest, NextResponse } from 'next/server';
import { getGalleryItem, updateGalleryItem, deleteGalleryItem, deleteGalleryImage } from '@/lib/gallery';
import { UpdateGalleryItem } from '@/types/gallery';

// GET /api/gallery/[id] - Get single gallery item
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const galleryItem = await getGalleryItem(params.id);
    
    if (!galleryItem) {
      return NextResponse.json(
        { success: false, error: 'Gallery item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: galleryItem
    });
  } catch (error) {
    console.error('Error in GET /api/gallery/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch gallery item' },
      { status: 500 }
    );
  }
}

// PUT /api/gallery/[id] - Update gallery item
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body: UpdateGalleryItem = await request.json();
    
    const updatedItem = await updateGalleryItem(params.id, body);
    
    if (!updatedItem) {
      return NextResponse.json(
        { success: false, error: 'Failed to update gallery item' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedItem
    });
  } catch (error) {
    console.error('Error in PUT /api/gallery/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update gallery item' },
      { status: 500 }
    );
  }
}

// DELETE /api/gallery/[id] - Delete gallery item
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // First get the item to access the image URL
    const galleryItem = await getGalleryItem(params.id);
    
    if (!galleryItem) {
      return NextResponse.json(
        { success: false, error: 'Gallery item not found' },
        { status: 404 }
      );
    }

    // Delete the item from database
    const deleteSuccess = await deleteGalleryItem(params.id);
    
    if (!deleteSuccess) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete gallery item' },
        { status: 500 }
      );
    }

    // Try to delete the associated image (optional - don't fail if this fails)
    try {
      await deleteGalleryImage(galleryItem.image_url);
    } catch (imageError) {
      console.warn('Failed to delete image file:', imageError);
    }

    return NextResponse.json({
      success: true,
      message: 'Gallery item deleted successfully'
    });
  } catch (error) {
    console.error('Error in DELETE /api/gallery/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete gallery item' },
      { status: 500 }
    );
  }
} 