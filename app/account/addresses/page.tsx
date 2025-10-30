'use client';

import { motion } from 'framer-motion';
import { MapPin, Plus, Edit2, Trash2, Check } from 'lucide-react';
import { useUserStore } from '@/lib/store/userStore';

export default function AddressesPage() {
  const { addresses, addAddress, updateAddress, deleteAddress } = useUserStore();

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Saved Addresses</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition">
            <Plus className="w-5 h-5" />
            Add New Address
          </button>
        </div>

        {addresses.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {addresses.map((address) => (
              <motion.div
                key={address.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-6 rounded-xl border-2 transition-all ${
                  address.isDefault
                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-orange-500" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">{address.name}</h3>
                  </div>
                  {address.isDefault && (
                    <span className="flex items-center gap-1 px-2 py-1 bg-orange-500 text-white text-xs rounded-full font-semibold">
                      <Check className="w-3 h-3" />
                      Default
                    </span>
                  )}
                </div>

                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1 mb-4">
                  <p>{address.street}</p>
                  <p>{address.city}, {address.state} {address.zipCode}</p>
                  <p>{address.country}</p>
                  <p className="text-gray-600 dark:text-gray-400">{address.phone}</p>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-orange-600 dark:text-orange-500 border-2 border-orange-500 rounded-lg text-sm font-semibold hover:bg-orange-50 dark:hover:bg-orange-900/20 transition">
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button className="px-3 py-2 text-red-600 dark:text-red-500 border-2 border-red-500 rounded-lg text-sm font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Saved Addresses</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Add an address for faster checkout</p>
            <button className="px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition">
              Add Your First Address
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
