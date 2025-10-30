'use client';

import { motion } from 'framer-motion';
import ProductCard from '../ui/ProductCard';
import { useProductStore } from '@/lib/store/productStore';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function FeaturedProductsSection() {
  const products = useProductStore((state) => state.products);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Get featured products (best sellers and high ratings)
  const featuredProducts = products
    .filter((p) => p.rating && p.rating >= 4.7)
    .slice(0, 12);

  const itemsPerView = 4;
  const maxIndex = Math.max(0, featuredProducts.length - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-10 md:mb-12 gap-4"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Featured Products
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
              Our most popular and highly-rated components
            </p>
          </div>

          <div className="hidden lg:flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="p-2 rounded-lg bg-white dark:bg-gray-700 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-gray-900 dark:text-white" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="p-2 rounded-lg bg-white dark:bg-gray-700 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-gray-900 dark:text-white" />
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
            {featuredProducts.map((product, index) => (
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
              className={`h-2 w-2 rounded-full transition-all ${
                currentIndex === index
                  ? 'bg-wso2-orange w-8'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
