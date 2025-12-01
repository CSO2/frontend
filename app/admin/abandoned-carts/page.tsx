'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Search, Edit2, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAdminStore } from '@/lib/store/adminStore';

export default function AbandonedCartsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { abandonedCarts, isLoading, fetchAbandonedCarts } = useAdminStore((s) => ({
    abandonedCarts: s.abandonedCarts,
    isLoading: s.isLoading,
    fetchAbandonedCarts: s.fetchAbandonedCarts,
  }));

  useEffect(() => {
    fetchAbandonedCarts().catch((e) => console.error(e));
  }, [fetchAbandonedCarts]);

  const filtered = abandonedCarts.filter((c: any) =>
    (c.customer || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalValue = abandonedCarts.reduce((sum: number, cart: any) => sum + (cart.cartValue || 0), 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Abandoned Carts</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Recover lost sales by following up with customers who left items in their carts
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-1">Total Abandoned</p>
          <p className="text-4xl font-bold text-gray-900 dark:text-white">{abandonedCarts.length}</p>
          <p className="text-sm text-orange-600 dark:text-orange-500 mt-2">Active carts</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-1">Total Value</p>
          <p className="text-4xl font-bold text-gray-900 dark:text-white">Rs. {totalValue.toLocaleString()}</p>
          <p className="text-sm text-green-600 dark:text-green-500 mt-2">Potential revenue</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-1">Recovery Rate</p>
          <p className="text-4xl font-bold text-gray-900 dark:text-white">0%</p>
          <p className="text-sm text-blue-600 dark:text-blue-500 mt-2">Feature pending</p>
        </motion.div>
      </div>

      {/* Carts Table */}
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
              placeholder="Search carts..."
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
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Items</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Cart Value</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Abandoned</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Last Reminder</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((cart) => (
                <tr key={cart.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{cart.customer}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{cart.email}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{cart.items} items</td>
                  <td className="px-6 py-4 text-orange-600 dark:text-orange-500 font-bold">Rs. {cart.cartValue.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{new Date(cart.abandonedAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${
                      cart.lastReminder === 'Not sent' ? 'text-red-600 dark:text-red-400 font-semibold' : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {cart.lastReminder}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center flex justify-center gap-2">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition" title="Send reminder">
                      <Mail className="w-4 h-4 text-blue-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition" title="View cart">
                      <ShoppingCart className="w-4 h-4 text-green-600" />
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
