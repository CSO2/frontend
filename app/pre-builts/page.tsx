'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';
import ProductCard from '@/app/components/ui/ProductCard';
import { useProductStore } from '@/lib/store/productStore';

export default function PreBuiltsPage() {
  const allProducts = useProductStore((state) => state.products);
  const products = useMemo(
    () => allProducts.filter(p => p.category === 'Pre-Built'),
    [allProducts]
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Pre-Built Gaming PCs
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Ready to ship, expertly built systems for gaming and productivity
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No pre-built systems available at the moment
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
