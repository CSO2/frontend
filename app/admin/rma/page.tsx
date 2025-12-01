'use client';

import { motion } from 'framer-motion';
import { AlertCircle, Search, Edit2, Trash2, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAdminStore } from '@/lib/store/adminStore';

export default function RMAPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { rmaRequests, isLoading, fetchRMARequests } = useAdminStore((s) => ({
    rmaRequests: s.rmaRequests,
    isLoading: s.isLoading,
    fetchRMARequests: s.fetchRMARequests,
  }));

  useEffect(() => {
    fetchRMARequests().catch((e) => console.error(e));
  }, [fetchRMARequests]);

  const filtered = rmaRequests.filter((r: any) =>
    (r.id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (r.customer || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Returns Management (RMA)</h1>
        <p className="text-gray-600 dark:text-gray-400">Handle return and warranty claims</p>
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
              placeholder="Search RMA requests..."
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
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">RMA #</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Order #</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Reason</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Date</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((rma) => (
                <tr key={rma.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <td className="px-6 py-4 font-mono font-semibold text-gray-900 dark:text-white">{rma.id}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{rma.orderNumber}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">{rma.customer}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{rma.reason}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      rma.status === 'Pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                      rma.status === 'Approved' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                      'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    }`}>
                      {rma.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{new Date(rma.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-center flex justify-center gap-2">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition">
                      <Edit2 className="w-4 h-4 text-blue-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition">
                      <CheckCircle className="w-4 h-4 text-green-600" />
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
