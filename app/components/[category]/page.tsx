'use client';

import { motion } from 'framer-motion';
import ProductCard from '@/app/components/ui/ProductCard';
import { useProductStore } from '@/lib/store/productStore';
import { useState, useMemo } from 'react';
import { Filter } from 'lucide-react';

export default function ComponentsCategoryPage({ params }: { params: { category: string } }) {
  const categoryMap: Record<string, string> = {
    cpu: 'CPU',
    gpu: 'GPU',
    motherboard: 'Motherboard',
    ram: 'RAM',
    storage: 'Storage',
    psu: 'PSU',
    cooler: 'Cooler',
    case: 'Case',
  };

  const subcategory = categoryMap[params.category];
  const allStoreProducts = useProductStore((state) => state.products);
  const allProducts = useMemo(
    () => allStoreProducts.filter(p => p.category === 'Components' && p.subcategory === subcategory),
    [allStoreProducts, subcategory]
  );

  const [sortBy, setSortBy] = useState<string>('featured');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Get unique brands
  const brands = Array.from(new Set(allProducts.map((p) => p.brand)));

  // Filter and sort products
  let filteredProducts = allProducts.filter((product) => {
    if (product.price < minPrice || product.price > maxPrice) return false;
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
    if (inStockOnly && product.stockLevel === 0) return false;
    return true;
  });

  // Sort products
  if (sortBy === 'price-low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  const toggleBrand = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {subcategory}s
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {filteredProducts.length} products found
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-64 shrink-0"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 sticky top-20">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="h-5 w-5 text-wso2-orange" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Filters
                </h2>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Price Range
                </h3>
                <div className="space-y-2">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    placeholder="Min"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    placeholder="Max"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Brand
                </h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="mr-2 accent-wso2-orange"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        {brand}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Stock Filter */}
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="mr-2 accent-wso2-orange"
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    In Stock Only
                  </span>
                </label>
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="flex items-center justify-between mb-6">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
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

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No products found matching your filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
