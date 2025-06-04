const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function checkStorage() {
  console.log('🔍 Проверка Supabase Storage...\n')

  try {
    // Проверка buckets
    const { data: buckets, error } = await supabase.storage.listBuckets()
    
    if (error) {
      console.log('❌ Ошибка:', error.message)
      return
    }

    console.log('📁 Найденные buckets:', buckets.map(b => `${b.name} (${b.public ? 'публичный' : 'приватный'})`))
    
    const imagesBucket = buckets.find(b => b.name === 'images')
    
    if (!imagesBucket) {
      console.log('❌ Bucket "images" не найден!')
      console.log('💡 Создайте bucket "images" в Supabase Dashboard → Storage')
      console.log('💡 Подробная инструкция: SUPABASE_SETUP.md')
      return
    }

    if (!imagesBucket.public) {
      console.log('⚠️  Bucket "images" не публичный!')
      console.log('💡 Сделайте bucket публичным в настройках')
      return
    }

    console.log('✅ Bucket "images" настроен правильно')
    
    // Проверка папок
    const { data: folders } = await supabase.storage.from('images').list('')
    const folderNames = folders?.map(f => f.name) || []
    
    console.log('📂 Папки в bucket:', folderNames)
    
    const requiredFolders = ['credentials', 'services', 'blog']
    const missingFolders = requiredFolders.filter(f => !folderNames.includes(f))
    
    if (missingFolders.length > 0) {
      console.log('⚠️  Отсутствуют папки:', missingFolders)
      console.log('💡 Создайте недостающие папки в bucket "images"')
    } else {
      console.log('✅ Все необходимые папки созданы')
    }

    console.log('\n🎉 Storage настроен корректно! Загрузка изображений должна работать.')

  } catch (error) {
    console.log('❌ Ошибка при проверке:', error.message)
    console.log('💡 Проверьте настройки в .env.local')
  }
}

checkStorage() 