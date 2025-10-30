'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { useProductStore } from '@/lib/store/productStore';
import { Search } from 'lucide-react';
import ProductCard from '@/app/components/ui/ProductCard';
import { useSearchParams } from 'next/navigation';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const searchProducts = useProductStore((state) => state.searchProducts);
  const results = query ? searchProducts(query) : [];

  return (
    <>
      <div className="flex items-center gap-3 mb-8">
        <Search className="h-8 w-8 text-wso2-orange" />
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Search Results
          </h1>
          {query && (
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
              Results for "<span className="text-wso2-orange">{query}</span>" ({results.length}{' '}
              found)
            </p>
          )}
        </div>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
            >
              <ProductCard product={product} showCompare />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-6">🔍</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            No results found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search terms or browse our categories
          </p>
        </div>
      )}
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Suspense
            fallback={
              <div className="flex items-center gap-3 mb-8">
                <Search className="h-8 w-8 text-wso2-orange animate-pulse" />
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Loading...</h1>
                </div>
              </div>
            }
          >
            <SearchResults />
          </Suspense>
        </motion.div>
      </div>
    </div>
  );
}
