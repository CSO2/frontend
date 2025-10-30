'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, AlertTriangle, CheckCircle, Edit2 } from 'lucide-react';
import { useProductStore } from '@/lib/store/productStore';

export default function AdminStock() {
  const { products } = useProductStore();
  const [stockFilter, setStockFilter] = useState('all');

  const filteredProducts = products.filter(product => {
    if (stockFilter === 'out') return product.stockLevel === 0;
    if (stockFilter === 'low') return product.stockLevel > 0 && product.stockLevel < 5;
    if (stockFilter === 'ok') return product.stockLevel >= 5;
    return true;
  });

  const outOfStock = products.filter(p => p.stockLevel === 0).length;
  const lowStock = products.filter(p => p.stockLevel > 0 && p.stockLevel < 5).length;
  const inStock = products.filter(p => p.stockLevel >= 5).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Stock Management</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage inventory levels</p>
      </div>

      {/* Stock Summary */}
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-red-100 dark:bg-red-900/30">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Out of Stock</p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-500">{outOfStock}</p>
            </div>
          </div>
          <button
            onClick={() => setStockFilter('out')}
            className="text-sm text-red-600 dark:text-red-500 hover:underline"
          >
            View Products →
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-yellow-100 dark:bg-yellow-900/30">
              <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Low Stock</p>
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-500">{lowStock}</p>
            </div>
          </div>
          <button
            onClick={() => setStockFilter('low')}
            className="text-sm text-yellow-600 dark:text-yellow-500 hover:underline"
          >
            View Products →
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">In Stock</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-500">{inStock}</p>
            </div>
          </div>
          <button
            onClick={() => setStockFilter('ok')}
            className="text-sm text-green-600 dark:text-green-500 hover:underline"
          >
            View Products →
          </button>
        </motion.div>
      </div>

      {/* Stock Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Inventory List</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setStockFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                stockFilter === 'all'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStockFilter('out')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                stockFilter === 'out'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              Out
            </button>
            <button
              onClick={() => setStockFilter('low')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                stockFilter === 'low'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              Low
            </button>
            <button
              onClick={() => setStockFilter('ok')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                stockFilter === 'ok'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              In Stock
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Current Stock
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{product.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{product.brand}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">
                    {product.category}
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      defaultValue={product.stockLevel}
                      className="w-20 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-center focus:ring-2 focus:ring-orange-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      product.stockLevel === 0
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                        : product.stockLevel < 5
                        ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                        : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    }`}>
                      {product.stockLevel === 0 ? 'Out of Stock' : product.stockLevel < 5 ? 'Low Stock' : 'In Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="px-4 py-2 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700 transition flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
