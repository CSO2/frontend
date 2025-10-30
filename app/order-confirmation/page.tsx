'use client';

import { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, Download, Printer, Package, Truck, Clock, MapPin, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('id');
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!orderId) {
      const timer = setTimeout(() => {
        setCountdown(c => c - 1);
      }, 1000);
      
      if (countdown === 0) {
        router.push('/');
      }
      
      return () => clearTimeout(timer);
    }
  }, [orderId, countdown, router]);

  if (!orderId) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black flex items-center justify-center py-24">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            No order found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Redirecting to homepage in {countdown}...
          </p>
        </div>
      </div>
    );
  }

  // Mock order data
  const orderDate = new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-block p-6 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
            <CheckCircle className="w-24 h-24 text-green-600 dark:text-green-500" />
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent"
          >
            Order Confirmed!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-600 dark:text-gray-400"
          >
            Thank you for your purchase
          </motion.p>
        </motion.div>

        {/* Order Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-8"
        >
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Order Number</p>
                  <p className="font-mono font-semibold text-gray-900 dark:text-white">{orderId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Order Date</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{orderDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Order Total</p>
                  <p className="font-semibold text-orange-600 dark:text-orange-500 text-xl">
                    $2,847.99
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Delivery Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Estimated Delivery</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{estimatedDelivery}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Shipping Address</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    123 Main Street<br />
                    Silicon Valley, CA 94025
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition">
              <Download className="w-5 h-5" />
              Download Invoice
            </button>
            <button className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              <Printer className="w-5 h-5" />
              Print Receipt
            </button>
            <Link
              href="/account/orders"
              className="flex items-center gap-2 px-6 py-3 border-2 border-orange-500 text-orange-600 dark:text-orange-500 rounded-lg font-semibold hover:bg-orange-50 dark:hover:bg-orange-900/20 transition"
            >
              <Package className="w-5 h-5" />
              Track Order
            </Link>
          </div>
        </motion.div>

        {/* Tracking Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Order Timeline</h2>
          
          <div className="space-y-6">
            {[
              { icon: CheckCircle, title: 'Order Placed', desc: 'Your order has been confirmed', time: 'Just now', active: true },
              { icon: Clock, title: 'Processing', desc: 'We\'re preparing your items', time: 'Within 2 hours', active: false },
              { icon: Package, title: 'Packed', desc: 'Your order is being packed', time: 'Within 24 hours', active: false },
              { icon: Truck, title: 'Shipped', desc: 'On its way to you', time: '1-2 days', active: false },
              { icon: MapPin, title: 'Delivered', desc: 'Enjoy your purchase!', time: '3-5 days', active: false }
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${
                    step.active
                      ? 'bg-green-100 dark:bg-green-900/30'
                      : 'bg-gray-100 dark:bg-gray-700/50'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      step.active ? 'text-green-600 dark:text-green-500' : 'text-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${
                      step.active
                        ? 'text-gray-900 dark:text-white'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{step.desc}</p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-500">{step.time}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Contact & Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-gray-800 rounded-2xl p-8 border-2 border-orange-200 dark:border-orange-800 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Need Help?</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            We're here to assist you with your order. Contact us anytime!
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500 rounded-lg">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                <p className="font-semibold text-gray-900 dark:text-white">support@cs02.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500 rounded-lg">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                <p className="font-semibold text-gray-900 dark:text-white">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What's Next?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We've sent you an email confirmation with your order details.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/components"
              className="px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
            >
              Continue Shopping
            </Link>
            <Link
              href="/account/orders"
              className="px-8 py-3 border-2 border-orange-500 text-orange-600 dark:text-orange-500 rounded-lg font-semibold hover:bg-orange-50 dark:hover:bg-orange-900/20 transition"
            >
              View Order History
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black flex items-center justify-center py-24">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}
