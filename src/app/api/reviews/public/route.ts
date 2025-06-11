import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, author_name } = body;

    console.log('📝 Получен запрос на создание отзыва:', { content: content?.substring(0, 50), author_name });

    // Validate required fields
    if (!author_name || !content) {
      console.log('❌ Отсутствуют обязательные поля');
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name and content are required' },
        { status: 400 }
      );
    }

    // Validate content is not empty (removed minimum length requirement)
    if (content.trim().length === 0) {
      console.log('❌ Пустое содержание отзыва');
      return NextResponse.json(
        { success: false, error: 'Review content cannot be empty' },
        { status: 400 }
      );
    }

    if (content.length > 1000) {
      console.log('❌ Слишком длинное содержание отзыва');
      return NextResponse.json(
        { success: false, error: 'Review content too long (maximum 1000 characters)' },
        { status: 400 }
      );
    }

    const supabase = createSupabaseServerClient();
    
    if (!supabase) {
      console.log('❌ Supabase клиент недоступен');
      return NextResponse.json(
        { success: false, error: 'Database connection not available - check environment variables' },
        { status: 500 }
      );
    }

    console.log('✅ Supabase клиент инициализирован');

    // Create the review record - only with necessary fields
    const reviewData = {
      content: content.trim(),
      rating: 5, // Default rating since we removed rating system
      published: true, // Auto-publish public reviews
      author_name: author_name.trim(),
    };

    console.log('📝 Данные для вставки:', reviewData);

    // Cast to any to bypass TypeScript strict typing issues
    const { data, error } = await (supabase as any)
      .from('reviews')
      .insert(reviewData)
      .select()
      .maybeSingle();

    if (error) {
      console.error('❌ Ошибка базы данных:', error);
      
      // More specific error messages
      if (error.message.includes('relation "reviews" does not exist')) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Reviews table not found',
            details: 'Please create the reviews table in your database',
            code: 'TABLE_NOT_FOUND'
          },
          { status: 503 }
        );
      }
      
      if (error.message.includes('permission denied')) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Database permission denied',
            details: 'Please check Row Level Security policies',
            code: 'PERMISSION_DENIED'
          },
          { status: 403 }
        );
      }

      if (error.message.includes('column') && error.message.includes('does not exist')) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Database schema error',
            details: 'Missing required columns. Please run the migration.',
            code: 'SCHEMA_ERROR'
          },
          { status: 503 }
        );
      }
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to submit review',
          details: error.message,
          code: 'DATABASE_ERROR'
        },
        { status: 500 }
      );
    }

    console.log('✅ Отзыв создан успешно:', data?.id);

    return NextResponse.json({
      success: true,
      message: 'Review published successfully',
      data: data
    });

  } catch (error) {
    console.error('❌ Неожиданная ошибка в API:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
} 