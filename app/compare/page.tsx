'use client';

import { motion } from 'framer-motion';
import { useCompareStore } from '@/lib/store/compareStore';
import { useProductStore } from '@/lib/store/productStore';
import { useCartStore } from '@/lib/store/cartStore';
import { Product } from '@/lib/store/types';
import { X, ShoppingCart, Check, Minus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ComparePage() {
  const { items, removeItem, clearCompare } = useCompareStore();
  const { products } = useProductStore();
  const { addItem } = useCartStore();
  
  // Get full product objects from IDs
  const compareList: Product[] = items
    .map(id => products.find(p => p.id === id))
    .filter((p): p is Product => p !== undefined);

  if (compareList.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black flex items-center justify-center py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-32 h-32 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Minus className="w-16 h-16 text-orange-600 dark:text-orange-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            No Products to Compare
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Add products from product pages to compare their features
          </p>
          <Link
            href="/components"
            className="inline-block px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
          >
            Browse Components
          </Link>
        </motion.div>
      </div>
    );
  }

  // Get all unique spec keys
  const allSpecKeys: string[] = Array.from(
    new Set(
      compareList.flatMap((product: Product) => Object.keys(product.specs))
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black py-24">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
            Compare Products
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            Side-by-side comparison of {compareList.length} product{compareList.length > 1 ? 's' : ''}
          </p>
          <button
            onClick={clearCompare}
            className="px-6 py-2 text-red-600 dark:text-red-500 border-2 border-red-600 dark:border-red-500 rounded-lg font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition"
          >
            Clear All
          </button>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="p-4 text-left sticky left-0 bg-white dark:bg-gray-800 z-10">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                      Specification
                    </span>
                  </th>
                  {compareList.map((product) => (
                    <th key={product.id} className="p-4 min-w-[280px]">
                      <div className="relative">
                        <button
                          onClick={() => removeItem(product.id)}
                          className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition z-20"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          width={200}
                          height={200}
                          className="w-full h-40 object-cover rounded-lg mb-3"
                        />
                        <h3 className="font-semibold text-gray-900 dark:text-white text-left mb-1">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 text-left mb-2">
                          {product.brand}
                        </p>
                        <p className="text-2xl font-bold text-orange-600 dark:text-orange-500 text-left mb-3">
                          ${product.price.toLocaleString()}
                        </p>
                        <button
                          onClick={() => addItem(product, 1)}
                          className="w-full py-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Basic Info */}
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                  <td className="p-4 font-semibold text-gray-900 dark:text-white sticky left-0 bg-gray-50 dark:bg-gray-700/50">
                    Category
                  </td>
                  {compareList.map((product) => (
                    <td key={product.id} className="p-4 text-gray-600 dark:text-gray-400">
                      {product.subcategory || product.category}
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="p-4 font-semibold text-gray-900 dark:text-white sticky left-0 bg-white dark:bg-gray-800">
                    Stock
                  </td>
                  {compareList.map((product) => (
                    <td key={product.id} className="p-4">
                      {product.stockLevel > 0 ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold">
                          <Check className="w-4 h-4" />
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-sm font-semibold">
                          <X className="w-4 h-4" />
                          Out of Stock
                        </span>
                      )}
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                  <td className="p-4 font-semibold text-gray-900 dark:text-white sticky left-0 bg-gray-50 dark:bg-gray-700/50">
                    Rating
                  </td>
                  {compareList.map((product) => (
                    <td key={product.id} className="p-4 text-gray-600 dark:text-gray-400">
                      {product.rating ? (
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{product.rating.toFixed(1)}</span>
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm">({product.reviewCount || 0} reviews)</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">No ratings</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Specifications */}
                {allSpecKeys.map((specKey: string, index: number) => (
                  <tr
                    key={specKey}
                    className={`border-b border-gray-200 dark:border-gray-700 ${
                      index % 2 === 0 ? '' : 'bg-gray-50 dark:bg-gray-700/50'
                    }`}
                  >
                    <td className={`p-4 font-semibold text-gray-900 dark:text-white sticky left-0 ${
                      index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/50'
                    }`}>
                      {specKey.charAt(0).toUpperCase() + specKey.slice(1)}
                    </td>
                    {compareList.map((product: Product) => (
                      <td key={product.id} className="p-4 text-gray-600 dark:text-gray-400">
                        {product.specs[specKey] !== undefined ? (
                          <span>{product.specs[specKey]}</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Description */}
                <tr className="bg-gray-50 dark:bg-gray-700/50">
                  <td className="p-4 font-semibold text-gray-900 dark:text-white sticky left-0 bg-gray-50 dark:bg-gray-700/50">
                    Description
                  </td>
                  {compareList.map((product) => (
                    <td key={product.id} className="p-4 text-sm text-gray-600 dark:text-gray-400">
                      {product.description}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Bottom Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You can compare up to 4 products at once
          </p>
          <Link
            href="/components"
            className="inline-block px-8 py-3 border-2 border-orange-500 text-orange-600 dark:text-orange-500 rounded-lg font-semibold hover:bg-orange-50 dark:hover:bg-orange-900/20 transition"
          >
            Add More Products
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
