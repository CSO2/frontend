'use client';

import { motion } from 'framer-motion';
import { MapPin, Plus, Edit2, Trash2, Phone, Clock } from 'lucide-react';

const stores = [
  { 
    id: 1, 
    name: 'CS02 Colombo', 
    address: '123 Main Street, Colombo', 
    phone: '+94 11 234 5678', 
    hours: '9:00 AM - 9:00 PM',
    manager: 'Kamal Silva'
  },
  { 
    id: 2, 
    name: 'CS02 Kandy', 
    address: '456 Tech Park, Kandy', 
    phone: '+94 81 222 3456', 
    hours: '9:00 AM - 8:00 PM',
    manager: 'Priya Perera'
  },
  { 
    id: 3, 
    name: 'CS02 Galle', 
    address: '789 Fort Road, Galle', 
    phone: '+94 91 888 9999', 
    hours: '10:00 AM - 7:00 PM',
    manager: 'Roshan De Silva'
  },
];

export default function StoresPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Store Locations</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage physical store locations</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition">
          <Plus className="w-5 h-5" />
          Add Store
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((store, idx) => (
          <motion.div
            key={store.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                <MapPin className="w-6 h-6 text-orange-600 dark:text-orange-500" />
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition">
                  <Edit2 className="w-4 h-4 text-blue-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>

            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{store.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{store.address}</p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Phone className="w-4 h-4 text-orange-600" />
                <span>{store.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Clock className="w-4 h-4 text-orange-600" />
                <span>{store.hours}</span>
              </div>
              <div className="text-gray-600 dark:text-gray-400">Manager: {store.manager}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
