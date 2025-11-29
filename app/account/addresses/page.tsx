'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Plus, Edit2, Trash2, Check } from 'lucide-react';
import { useUserStore } from '@/lib/store/userStore';

export default function AddressesPage() {
  const { addresses, fetchAddresses, addAddress, updateAddress, deleteAddress } = useUserStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Sri Lanka',
    phone: '',
    isDefault: false
  });

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const handleSaveAddress = async () => {
    if (!newAddress.name || !newAddress.street || !newAddress.city) return;
    await addAddress(newAddress);
    setIsAdding(false);
    setNewAddress({
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Sri Lanka',
      phone: '',
      isDefault: false
    });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Saved Addresses</h2>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-orange-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
          >
            <Plus className="w-5 h-5" />
            {isAdding ? 'Cancel' : 'Add New Address'}
          </button>
        </div>

        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-8 p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900/50"
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">New Address</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Address Name (e.g., Home)"
                value={newAddress.name}
                onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Street Address"
                value={newAddress.street}
                onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="City"
                value={newAddress.city}
                onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="State/Province"
                value={newAddress.state}
                onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Zip Code"
                value={newAddress.zipCode}
                onChange={(e) => setNewAddress({...newAddress, zipCode: e.target.value})}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Phone"
                value={newAddress.phone}
                onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={newAddress.isDefault}
                onChange={(e) => setNewAddress({...newAddress, isDefault: e.target.checked})}
                className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
              />
              <label className="text-gray-700 dark:text-gray-300">Set as default address</label>
            </div>
            <button 
              onClick={handleSaveAddress}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition"
            >
              Save Address
            </button>
          </motion.div>
        )}

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
                  <button 
                    onClick={() => deleteAddress(address.id)}
                    className="px-3 py-2 text-red-600 dark:text-red-500 border-2 border-red-500 rounded-lg text-sm font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                  >
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
            <button 
              onClick={() => setIsAdding(true)}
              className="px-8 py-3 bg-linear-to-r from-orange-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
            >
              Add Your First Address
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
