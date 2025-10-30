'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Package, Search, Edit2, Trash2 } from 'lucide-react';
import { useState } from 'react';

const alerts = [
  { id: 1, product: 'Intel Core i9-13900K', stock: 2, reorderLevel: 5, status: 'Critical' },
  { id: 2, product: 'NVIDIA RTX 4090', stock: 1, reorderLevel: 3, status: 'Critical' },
  { id: 3, product: 'Corsair RM1000x PSU', stock: 4, reorderLevel: 5, status: 'Warning' },
];

export default function InventoryAlertsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = alerts.filter(a =>
    a.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Inventory Alerts</h1>
        <p className="text-gray-600 dark:text-gray-400">Monitor low stock levels</p>
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
              placeholder="Search products..."
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
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Product</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Current Stock</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Reorder Level</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((alert) => (
                <tr key={alert.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{alert.product}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{alert.stock} units</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{alert.reorderLevel} units</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit ${
                      alert.status === 'Critical' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                      'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                    }`}>
                      <AlertTriangle className="w-3 h-3" />
                      {alert.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center flex justify-center gap-2">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition">
                      <Edit2 className="w-4 h-4 text-blue-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition">
                      <Package className="w-4 h-4 text-green-600" />
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
