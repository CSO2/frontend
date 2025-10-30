'use client';

import { motion } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, Tag } from 'lucide-react';
import { useState } from 'react';

const categories = [
  { id: 1, name: 'CPUs', slug: 'cpus', itemCount: 45, icon: '⚙️' },
  { id: 2, name: 'Graphics Cards', slug: 'graphics-cards', itemCount: 32, icon: '🎮' },
  { id: 3, name: 'Motherboards', slug: 'motherboards', itemCount: 28, icon: '🖥️' },
  { id: 4, name: 'Memory (RAM)', slug: 'memory', itemCount: 56, icon: '💾' },
  { id: 5, name: 'Storage', slug: 'storage', itemCount: 72, icon: '💿' },
  { id: 6, name: 'Power Supplies', slug: 'psu', itemCount: 38, icon: '⚡' },
];

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Categories</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage product categories</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition">
          <Plus className="w-5 h-5" />
          Add Category
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent text-gray-900 dark:text-white focus:outline-none"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-orange-500 transition"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="text-3xl">{category.icon}</div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition">
                    <Edit2 className="w-4 h-4 text-blue-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">{category.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">/{category.slug}</p>
              <p className="text-xs font-semibold text-orange-600 dark:text-orange-500">{category.itemCount} items</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
