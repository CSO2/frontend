'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Package, Truck, CheckCircle, Clock, MapPin, AlertCircle } from 'lucide-react';

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'ORD-12345';

  const trackingSteps = [
    { icon: CheckCircle, title: 'Order Placed', date: 'Jan 15, 2025 10:30 AM', completed: true },
    { icon: Clock, title: 'Processing', date: 'Jan 15, 2025 2:15 PM', completed: true },
    { icon: Package, title: 'Packed', date: 'Jan 16, 2025 9:00 AM', completed: true },
    { icon: Truck, title: 'Shipped', date: 'Jan 16, 2025 3:45 PM', completed: true },
    { icon: MapPin, title: 'Out for Delivery', date: 'Expected: Jan 18, 2025', completed: false },
    { icon: CheckCircle, title: 'Delivered', date: 'Pending', completed: false }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
      >
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Track Your Order</h2>
            <p className="text-gray-600 dark:text-gray-400">Order #{orderId}</p>
          </div>
          <button className="px-4 py-2 text-orange-600 dark:text-orange-500 border-2 border-orange-500 rounded-lg font-semibold hover:bg-orange-50 dark:hover:bg-orange-900/20 transition text-sm">
            Contact Support
          </button>
        </div>

        {/* Tracking Timeline */}
        <div className="space-y-6">
          {trackingSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="flex items-start gap-4">
                <div className={`p-3 rounded-full ${
                  step.completed
                    ? 'bg-green-100 dark:bg-green-900/30'
                    : 'bg-gray-100 dark:bg-gray-700/50'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    step.completed ? 'text-green-600 dark:text-green-500' : 'text-gray-400'
                  }`} />
                </div>
                <div className="flex-1 pb-6 border-b border-gray-200 dark:border-gray-700 last:border-0">
                  <h3 className={`font-semibold mb-1 ${
                    step.completed
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{step.date}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Estimated Delivery */}
        <div className="mt-8 bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border-l-4 border-orange-500">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Estimated Delivery</h3>
          <p className="text-gray-700 dark:text-gray-300">January 18, 2025 by 8:00 PM</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Tracking Number: <span className="font-mono">1Z999AA10123456784</span>
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-4">
          <button className="flex-1 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition">
            View Order Details
          </button>
          <button className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            Cancel Order
          </button>
        </div>
      </motion.div>

      {/* Order Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Items</h3>
        <div className="space-y-4">
          {[
            { name: 'Intel Core i9-13900K', qty: 1, price: 589 },
            { name: 'NVIDIA RTX 4080 16GB', qty: 1, price: 1199 },
            { name: 'Corsair Vengeance 32GB DDR5', qty: 2, price: 159 }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{item.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Quantity: {item.qty}</p>
              </div>
              <p className="font-semibold text-gray-900 dark:text-white">${(item.price * item.qty).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
