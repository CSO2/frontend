 'use client';

// Module-level fallback timestamp to avoid impure function calls during render
const DEFAULT_NOW = Date.now();

import { motion } from 'framer-motion';
import { Mail, Search, Edit2, Trash2, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAdminStore } from '@/lib/store/adminStore';

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const tickets = useAdminStore((s) => s.supportTickets);
  const isLoading = useAdminStore((s) => s.isLoading);
  const error = useAdminStore((s) => s.error);
  const fetchSupportTickets = useAdminStore((s) => s.fetchSupportTickets);

  useEffect(() => {
    fetchSupportTickets();
  }, [fetchSupportTickets]);
  const filtered = tickets
    ? tickets.filter((t: any) =>
        (t.id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.subject || '').toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Support Tickets</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage customer support tickets</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent text-gray-900 dark:text-white focus:outline-none"
            />
          </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Ticket #</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Subject</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Priority</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Date</th>
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
                filtered.map((ticket: any) => {
                const priorityClass = ticket.priority === 'High'
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                  : ticket.priority === 'Medium'
                  ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                  : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
                const statusClass = ticket.status === 'Open'
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                  : ticket.status === 'In Progress'
                  ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                  : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
                return (
                <tr key={ticket.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <td className="px-6 py-4 font-mono font-semibold text-gray-900 dark:text-white">{ticket.id}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{ticket.userId || ticket.customer}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white">{ticket.subject}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityClass}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClass}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{new Date(ticket.createdAt || ticket.date || DEFAULT_NOW).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-center flex justify-center gap-2">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition">
                      <Mail className="w-4 h-4 text-blue-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition">
                      <Edit2 className="w-4 h-4 text-orange-600" />
                    </button>
                  </td>
                </tr>
                );
              })
            )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
