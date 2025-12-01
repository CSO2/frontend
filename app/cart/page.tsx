'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/store/cartStore';
import { Trash2, Plus, Minus, ShoppingBag, Loader2 } from 'lucide-react';
import AnimatedButton from '../components/ui/AnimatedButton';
import { useEffect } from 'react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart, fetchCart, isLoading } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.15; // 15% VAT in Sri Lanka
  const total = subtotal + tax;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 py-12 flex justify-center items-center">
        <Loader2 className="h-12 w-12 animate-spin text-wso2-orange" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Add some awesome products to get started!
            </p>
            <AnimatedButton href="/" variant="primary">
              Continue Shopping
            </AnimatedButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Shopping Cart
            </h1>
            <button
              onClick={clearCart}
              className="text-red-500 hover:text-red-600 transition-colors text-sm font-medium"
            >
              Clear Cart
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex gap-6">
                    <Link href={`/product/${item.product.id}`}>
                      <Image
                        src={item.product.imageUrl || '/placeholder-product.png'}
                        alt={item.product.name}
                        width={96}
                        height={96}
                        className="object-cover rounded-lg"
                        unoptimized
                      />
                    </Link>

                    <div className="flex-1">
                      <Link href={`/product/${item.product.id}`}>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 hover:text-wso2-orange transition-colors">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {item.product.brand}
                      </p>
                      <p className="text-2xl font-bold text-wso2-orange">
                        {`LKR ${item.product.price.toLocaleString('en-LK')}`}
                      </p>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>

                      <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-white dark:hover:bg-gray-600 rounded transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stockLevel}
                          className="p-1 hover:bg-white dark:hover:bg-gray-600 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 sticky top-20">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span>{`LKR ${subtotal.toLocaleString('en-LK')}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>VAT (15%)</span>
                    <span>{`LKR ${tax.toLocaleString('en-LK')}`}</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                      <span>Total</span>
                      <span className="text-wso2-orange">{`LKR ${total.toLocaleString('en-LK')}`}</span>
                    </div>
                  </div>
                </div>

                <AnimatedButton href="/checkout" variant="primary" className="w-full">
                  Proceed to Checkout
                </AnimatedButton>

                <Link
                  href="/"
                  className="block text-center mt-4 text-wso2-orange hover:text-wso2-orange-dark transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

