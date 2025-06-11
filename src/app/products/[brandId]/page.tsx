'use client';

import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BrandProductsService } from "@/lib/brand-products";
import { BrandProduct, PRODUCT_CATEGORIES } from "@/types/brand-product";
import { productService } from "@/lib/products";
import { Product } from "@/types/product";

export default function BrandProductsPage() {
  const { currentLanguage } = useLanguage();
  const params = useParams();
  const brandId = params.brandId as string;
  
  const [brandProducts, setBrandProducts] = useState<BrandProduct[]>([]);
  const [brand, setBrand] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    if (brandId) {
      loadBrandData();
    }
  }, [brandId]);

  const loadBrandData = async () => {
    try {
      setLoading(true);
      
      // Загружаем информацию о бренде
      const brandData = await productService.getProduct(brandId);
      setBrand(brandData);
      
      // Загружаем продукты бренда
      const productsData = await BrandProductsService.getBrandProducts(brandId);
      setBrandProducts(productsData);
      
    } catch (error) {
      console.error('Error loading brand data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLocalizedName = (product: Product) => {
    if (currentLanguage === 'et' && product.name_et) return product.name_et;
    if (currentLanguage === 'ru' && product.name_ru) return product.name_ru;
    return product.name;
  };

  const getLocalizedDescription = (product: Product) => {
    if (currentLanguage === 'et' && product.description_et) return product.description_et;
    if (currentLanguage === 'ru' && product.description_ru) return product.description_ru;
    return product.description;
  };

  const getLocalizedProductName = (product: BrandProduct) => {
    if (currentLanguage === 'et' && product.name_et) return product.name_et;
    if (currentLanguage === 'ru' && product.name_ru) return product.name_ru;
    return product.name;
  };

  const getLocalizedProductDescription = (product: BrandProduct) => {
    if (currentLanguage === 'et' && product.description_et) return product.description_et;
    if (currentLanguage === 'ru' && product.description_ru) return product.description_ru;
    return product.description;
  };

  const getCategoryName = (category: string) => {
    const categoryInfo = PRODUCT_CATEGORIES[category as keyof typeof PRODUCT_CATEGORIES];
    if (!categoryInfo) return category;
    
    if (currentLanguage === 'et') return categoryInfo.et;
    if (currentLanguage === 'ru') return categoryInfo.ru;
    return categoryInfo.en;
  };

  const getFilteredProducts = () => {
    if (selectedCategory === 'all') return brandProducts;
    return brandProducts.filter(product => product.category === selectedCategory);
  };

  const getUniqueCategories = () => {
    const categories = brandProducts.map(product => product.category);
    return Array.from(new Set(categories));
  };

  const formatPrice = (price: number, currency: string = 'EUR') => {
    return `${price.toFixed(2)} ${currency === 'EUR' ? '€' : currency}`;
  };

  if (loading) {
    return (
      <Container>
        <div className="py-0">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">
              {currentLanguage === 'et' ? 'Laen tooteid...' : 'Загрузка продукции...'}
            </div>
          </div>
        </div>
      </Container>
    );
  }

  if (!brand) {
    return (
      <Container>
        <div className="py-0">
          <div className="text-center">
            <Heading as="h1" className="font-black mb-4">
              {currentLanguage === 'et' ? 'Brändi ei leitud' : 'Бренд не найден'}
            </Heading>
            <Link href="/products" className="text-poppy-500 hover:text-poppy-600">
              {currentLanguage === 'et' ? 'Tagasi toodete juurde' : 'Назад к продукции'}
            </Link>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="py-0">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <nav className="text-sm">
            <Link href="/products" className="text-poppy-500 hover:text-poppy-600">
              {currentLanguage === 'et' ? 'Produktid' : 'Продукция'}
            </Link>
            <span className="mx-2 text-sage-400">›</span>
            <span className="text-sage-700">{getLocalizedName(brand)}</span>
          </nav>
        </div>

        {/* Brand Header */}
        <div className="glass-effect rounded-xl p-8 mb-8">
          <Heading as="h1" className="font-black mb-4">
            {getLocalizedName(brand)}
          </Heading>
          <Paragraph className="text-lg text-sage-700 max-w-3xl">
            {getLocalizedDescription(brand)}
          </Paragraph>
        </div>

        

                 {/* Products Grid */}
         {brandProducts.length === 0 ? (
          <div className="glass-effect rounded-xl p-8 text-center">
            <Paragraph className="text-sage-600 text-lg">
              {currentLanguage === 'et' 
                ? 'Selle brändi tooteid ei ole veel lisatud.'
                : 'Продукты этого бренда еще не добавлены.'
              }
            </Paragraph>
          </div>
                 ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {brandProducts.map((product, index) => (
                             <motion.div
                 key={product.id}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.5, delay: index * 0.1 }}
                 className="glass-effect rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-auto min-h-[300px] flex flex-col"
               >
                                 {/* Product Image */}
                 {product.image_url && (
                   <div className="mb-4 rounded-lg overflow-hidden flex-shrink-0">
                     <Image
                       src={product.image_url}
                       alt={getLocalizedProductName(product)}
                       width={300}
                       height={200}
                       className="w-full h-48 object-cover"
                     />
                   </div>
                 )}

                 {/* Content wrapper */}
                 <div className="flex-1 flex flex-col">
                   {/* Product Name */}
                   <h3 className="text-lg font-bold text-sage-900 mb-2 flex-shrink-0">
                     {getLocalizedProductName(product)}
                   </h3>

                   {/* Description */}
                   <Paragraph className="text-sm text-sage-700 mb-4 line-clamp-3 flex-1">
                     {getLocalizedProductDescription(product)}
                   </Paragraph>
                 </div>                
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
} 