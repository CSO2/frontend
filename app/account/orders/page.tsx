'use client';

import { motion } from 'framer-motion';
import { useProductStore } from '@/lib/store/productStore';
import { Package, Eye, Download, Truck } from 'lucide-react';
import Link from 'next/link';

export default function OrdersPage() {
  const { orders } = useProductStore();

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Order History</h2>

        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-orange-500 transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-mono font-semibold text-gray-900 dark:text-white mb-1">
                      Order #{order.id}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    order.status === 'Delivered'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : order.status === 'Shipped'
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                      : order.status === 'Processing'
                      ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}>
                    {order.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700 dark:text-gray-300">
                        {item.productName} × {item.quantity}
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Total: </span>
                    <span className="text-xl font-bold text-orange-600 dark:text-orange-500">
                      ${order.total.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/account/track?orderId=${order.id}`}
                      className="flex items-center gap-2 px-4 py-2 text-orange-600 dark:text-orange-500 border-2 border-orange-500 rounded-lg font-semibold hover:bg-orange-50 dark:hover:bg-orange-900/20 transition text-sm"
                    >
                      <Truck className="w-4 h-4" />
                      Track
                    </Link>
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition text-sm">
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition text-sm">
                      <Download className="w-4 h-4" />
                      Invoice
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Orders Yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Start shopping to see your orders here</p>
            <Link
              href="/components"
              className="inline-block px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
            >
              Browse Products
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
