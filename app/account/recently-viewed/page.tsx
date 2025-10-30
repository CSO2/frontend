'use client';

import { motion } from 'framer-motion';
import { Eye, Clock } from 'lucide-react';
import { useUserStore } from '@/lib/store/userStore';
import { useProductStore } from '@/lib/store/productStore';
import ProductCard from '@/app/components/ui/ProductCard';

export default function AccountRecentlyViewed() {
  const { user, recentlyViewed } = useUserStore();
  const { products } = useProductStore();

  if (!user) {
    return (
      <div className="text-center py-12">
        <Eye className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Please Log In
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          You need to be logged in to view your browsing history
        </p>
      </div>
    );
  }

  const recentProducts = recentlyViewed
    .map(id => products.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Recently Viewed</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {recentProducts.length} product{recentProducts.length !== 1 ? 's' : ''} in your history
          </p>
        </div>

        {recentProducts.length > 0 && (
          <button
            onClick={() => {}}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            Clear History
          </button>
        )}
      </div>

      {recentProducts.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {recentProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Recently Viewed Products
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Products you view will appear here for easy access
          </p>
          <a
            href="/components"
            className="inline-block px-6 py-3 bg-linear-to-r from-orange-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
          >
            Browse Products
          </a>
        </div>
      )}

      {recentProducts.length > 0 && (
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Eye className="w-6 h-6 text-orange-600 dark:text-orange-500 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                Your Browsing History
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                We keep track of the last 10 products you've viewed to help you find what you're looking for faster. 
                Your browsing history is private and only visible to you.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
