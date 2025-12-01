 'use client';

// Capture a stable now value on module load so Date.now is not invoked in render
const DEFAULT_NOW = Date.now();

import { motion } from 'framer-motion';
import { FileText, Download, Eye, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAdminStore } from '@/lib/store/adminStore';


export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const allOrders = useAdminStore((s) => s.allOrders);
  const isLoading = useAdminStore((s) => s.isLoading);
  const error = useAdminStore((s) => s.error);
  const fetchAllOrders = useAdminStore((s) => s.fetchAllOrders);

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  const invoices = allOrders || [];
  const filtered = invoices.filter((inv: any) =>
    (inv.id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (inv.userId || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Invoices</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage and view all invoices</p>
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
              placeholder="Search invoices..."
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
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Invoice ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Order #</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center">Loading...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-red-600">{error}</td>
                </tr>
              ) : (
                filtered.map((invoice: any) => (
                <tr key={invoice.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <td className="px-6 py-4 font-mono font-semibold text-gray-900 dark:text-white">{invoice.id}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{invoice.orderNumber}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">{invoice.userId || invoice.customer}</td>
                  <td className="px-6 py-4 text-orange-600 dark:text-orange-500 font-bold">Rs. {(invoice.total || 0).toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{new Date(invoice.date || invoice.createdAt || DEFAULT_NOW).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      invoice.status === 'Paid' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                      'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center flex justify-center gap-2">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition">
                      <Eye className="w-4 h-4 text-blue-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition">
                      <Download className="w-4 h-4 text-green-600" />
                    </button>
                  </td>
                </tr>
              ))) }
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
