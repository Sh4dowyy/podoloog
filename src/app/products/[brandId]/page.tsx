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
import { ProductsCarousel } from "@/components/ProductsCarousel";

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
        <div className="-mb-6 max-w-6xl mx-auto px-6">
          <nav className="text-sm">
            <Link href="/products" className="text-poppy-500 hover:text-poppy-600">
              {currentLanguage === 'et' ? 'Tooted' : 'Продукция'}
            </Link>
            <span className="mx-2 text-sage-400">›</span>
            <span className="text-sage-700">{getLocalizedName(brand)}</span>
          </nav>
        </div>


        {/* Products Carousel */}
        {brandProducts.length === 0 ? (
          <div className="glass-effect rounded-xl p-8 text-center">
            <Paragraph className="text-sage-600 text-[8px]">
              {currentLanguage === 'et' 
                ? 'Selle brändi tooteid ei ole veel lisatud.'
                : 'Продукты этого бренда еще не добавлены.'
              }
            </Paragraph>
          </div>
        ) : (
          <ProductsCarousel products={brandProducts} brand={brand} />
        )}
      </div>
    </Container>
  );
} 