'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Edit, Trash2, Package } from 'lucide-react';
import { useProductStore } from '@/lib/store/productStore';
import Image from 'next/image';

export default function AdminProducts() {
  const { products } = useProductStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Products</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your product catalog</p>
        </div>
        <button className="px-6 py-3 bg-linear-to-r from-orange-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:border-orange-500 transition"
          >
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                {product.imageUrl ? (
                  <Image src={product.imageUrl} alt={product.name} width={96} height={96} className="object-cover" />
                ) : (
                  <Package className="w-12 h-12 text-gray-400" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{product.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{product.brand}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400">
                    {product.category}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Price</p>
                    <p className="text-lg font-bold text-orange-600 dark:text-orange-500">
                      ${product.price}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Stock</p>
                    <p className={`text-lg font-bold ${
                      product.stockLevel === 0 ? 'text-red-600 dark:text-red-500' :
                      product.stockLevel < 5 ? 'text-yellow-600 dark:text-yellow-500' :
                      'text-green-600 dark:text-green-500'
                    }`}>
                      {product.stockLevel}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Rating</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {product.rating} ⭐
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Reviews</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {product.reviewCount}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-500 hover:bg-orange-200 dark:hover:bg-orange-800 transition">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-500 hover:bg-red-200 dark:hover:bg-red-800 transition">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
