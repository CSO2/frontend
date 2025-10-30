'use client';

import { motion } from 'framer-motion';
import { CreditCard, Plus, Trash2, Check } from 'lucide-react';
import { useUserStore } from '@/lib/store/userStore';

export default function PaymentMethodsPage() {
  const { paymentMethods } = useUserStore();

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Methods</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition">
            <Plus className="w-5 h-5" />
            Add New Card
          </button>
        </div>

        {paymentMethods.length > 0 ? (
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-6 rounded-xl border-2 transition-all ${
                  method.isDefault
                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-orange-600 to-orange-500 rounded-xl">
                      <CreditCard className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                          {method.brand} •••• {method.last4}
                        </h3>
                        {method.isDefault && (
                          <span className="flex items-center gap-1 px-2 py-1 bg-orange-500 text-white text-xs rounded-full font-semibold">
                            <Check className="w-3 h-3" />
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Expires {method.expiryMonth.toString().padStart(2, '0')}/{method.expiryYear}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {!method.isDefault && (
                      <button className="px-4 py-2 text-orange-600 dark:text-orange-500 border-2 border-orange-500 rounded-lg text-sm font-semibold hover:bg-orange-50 dark:hover:bg-orange-900/20 transition">
                        Set as Default
                      </button>
                    )}
                    <button className="px-3 py-2 text-red-600 dark:text-red-500 border-2 border-red-500 rounded-lg text-sm font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Payment Methods</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Add a payment method for faster checkout</p>
            <button className="px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition">
              Add Your First Card
            </button>
          </div>
        )}

        {/* Security Notice */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-l-4 border-blue-500">
          <h3 className="font-semibold text-blue-900 dark:text-blue-400 mb-2">Security Notice</h3>
          <p className="text-sm text-blue-800 dark:text-blue-300">
            Your payment information is encrypted and stored securely. We never share your financial details with third parties.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
