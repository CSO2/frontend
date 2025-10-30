'use client';

import { motion } from 'framer-motion';
import { Users, Search, Mail, Phone, MapPin, Edit2, Trash2 } from 'lucide-react';
import { useState } from 'react';

const customers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+94 11 234 5678', city: 'Colombo', orders: 5, spent: 15000 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+94 81 222 3456', city: 'Kandy', orders: 3, spent: 8900 },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', phone: '+94 91 888 9999', city: 'Galle', orders: 12, spent: 45000 },
];

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Customers</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage customer accounts and information</p>
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
              placeholder="Search customers..."
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
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Location</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Orders</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Spent</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((customer) => (
                <tr key={customer.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <td className="px-6 py-4 text-gray-900 dark:text-white font-semibold">{customer.name}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{customer.email}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{customer.city}</td>
                  <td className="px-6 py-4 text-gray-900 dark:text-white font-semibold">{customer.orders}</td>
                  <td className="px-6 py-4 text-orange-600 dark:text-orange-500 font-bold">Rs. {customer.spent.toLocaleString()}</td>
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
