'use client';

import { motion } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, Percent } from 'lucide-react';
import { useState } from 'react';

const promotions = [
  { id: 1, name: 'Summer Sale 2024', code: 'SUMMER20', discount: 20, type: 'Percentage', status: 'Active' },
  { id: 2, name: 'First-Time Buyer', code: 'FIRST10', discount: 10, type: 'Percentage', status: 'Active' },
  { id: 3, name: 'Clearance Sale', code: 'CLEAR50', discount: 50, type: 'Fixed', status: 'Scheduled' },
];

export default function PromotionsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = promotions.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Promotions</h1>
          <p className="text-gray-600 dark:text-gray-400">Create and manage promotional codes</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition">
          <Plus className="w-5 h-5" />
          New Promotion
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search promotions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent text-gray-900 dark:text-white focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Code</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Discount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((promo) => (
                <tr key={promo.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <td className="px-6 py-4 text-gray-900 dark:text-white font-semibold">{promo.name}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400 font-mono">{promo.code}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-orange-600 dark:text-orange-500 font-bold">
                      <Percent className="w-4 h-4" />
                      {promo.discount}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{promo.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      promo.status === 'Active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                      'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                    }`}>
                      {promo.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center flex justify-center gap-2">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition">
                      <Edit2 className="w-4 h-4 text-blue-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
