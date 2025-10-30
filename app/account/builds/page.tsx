'use client';

import { motion } from 'framer-motion';
import { Wrench, Trash2, ShoppingCart, Eye } from 'lucide-react';
import Link from 'next/link';

export default function SavedBuildsPage() {
  const savedBuilds = [
    {
      id: '1',
      name: '4K Gaming Beast',
      totalPrice: 2847,
      components: {
        cpu: 'Intel Core i9-13900K',
        gpu: 'NVIDIA RTX 4080',
        motherboard: 'ASUS ROG Maximus Z790',
        ram: 'Corsair Vengeance 32GB DDR5',
        storage: 'Samsung 990 Pro 2TB',
        psu: 'Corsair RM1000x',
        case: 'Lian Li O11 Dynamic'
      },
      createdAt: '2025-01-10',
      updatedAt: '2025-01-15'
    },
    {
      id: '2',
      name: 'Budget Workstation',
      totalPrice: 1249,
      components: {
        cpu: 'AMD Ryzen 7 7700X',
        motherboard: 'MSI B650 Gaming Plus',
        ram: 'G.Skill Ripjaws 32GB DDR5',
        storage: 'WD Black SN850X 1TB',
        psu: 'EVGA SuperNOVA 750W',
        case: 'Fractal Design Meshify C'
      },
      createdAt: '2024-12-15',
      updatedAt: '2024-12-20'
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Saved Builds</h2>
          <Link
            href="/pc-builder"
            className="px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
          >
            Create New Build
          </Link>
        </div>

        {savedBuilds.length > 0 ? (
          <div className="space-y-6">
            {savedBuilds.map((build) => (
              <motion.div
                key={build.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-orange-500 transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{build.name}</h3>
                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-500">
                      ${build.totalPrice.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-orange-600 dark:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3 mb-4">
                  {Object.entries(build.components).map(([key, value]) => (
                    <div key={key} className="text-sm">
                      <span className="text-gray-600 dark:text-gray-400 capitalize">{key}: </span>
                      <span className="text-gray-900 dark:text-white font-medium">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Last updated: {new Date(build.updatedAt).toLocaleDateString()}
                  </span>
                  <button className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition">
                    <ShoppingCart className="w-5 h-5" />
                    Add All to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Wrench className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Saved Builds</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Create custom PC builds and save them for later</p>
            <Link
              href="/pc-builder"
              className="inline-block px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
            >
              Start Building
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
