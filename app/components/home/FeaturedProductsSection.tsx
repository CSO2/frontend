'use client';

import { motion } from 'framer-motion';
import ProductCard from '../ui/ProductCard';
import { useProductStore } from '@/lib/store/productStore';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FeaturedProductsSection() {
  const { featuredProducts, fetchFeaturedProducts, isLoading } = useProductStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  // Use featured products from store
  const productsToDisplay = featuredProducts.length > 0 ? featuredProducts : [];

  const itemsPerView = 4;
  const maxIndex = Math.max(0, productsToDisplay.length - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 bg-muted/20 flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-10 md:mb-12 gap-4"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
              Featured Products
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Our most popular and highly-rated components
            </p>
          </div>

          <div className="hidden lg:flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="p-2 rounded-lg bg-card border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-foreground" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="p-2 rounded-lg bg-card border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-foreground" />
            </motion.button>
          </div>
        </motion.div>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-4 sm:gap-5 md:gap-6"
            animate={{
              x: `-${currentIndex * (100 / itemsPerView)}%`,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {productsToDisplay.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex-none w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile navigation dots */}
        <div className="flex lg:hidden justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full transition-all ${currentIndex === index
                  ? 'bg-primary w-8'
                  : 'bg-muted-foreground/30'
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

