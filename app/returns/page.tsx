'use client';

import { motion } from 'framer-motion';
import { Package, RotateCcw, CheckCircle, Clock, AlertTriangle, TrendingUp } from 'lucide-react';

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 pt-24 pb-12"
      >
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-block p-3 bg-orange-100 dark:bg-orange-900/30 rounded-2xl mb-6"
          >
            <RotateCcw className="w-8 h-8 text-orange-600 dark:text-orange-500" />
          </motion.div>
          <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
            Returns & Refunds Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            We stand behind our products. Easy returns within 30 days.
          </p>
        </div>
      </motion.section>

      {/* Quick Summary */}
      <section className="container mx-auto px-4 pb-12">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { icon: Clock, title: '30-Day Returns', desc: 'Full refund or exchange within 30 days of purchase' },
            { icon: Package, title: 'Free Return Shipping', desc: 'We cover return shipping for defective items' },
            { icon: TrendingUp, title: 'Easy Process', desc: 'Simple online return initiation in your account' }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 text-center"
            >
              <div className="inline-block p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl mb-4">
                <item.icon className="w-6 h-6 text-orange-600 dark:text-orange-500" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Eligibility */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
          >
            <div className="flex items-start gap-4 mb-6">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Return Eligibility</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Returnable Items:</h3>
                <ul className="space-y-2">
                  {[
                    'Unopened products in original packaging with all accessories',
                    'Defective or damaged items (photo evidence required)',
                    'Wrong item shipped (we cover all costs)',
                    'Products not matching description',
                    'DOA (Dead on Arrival) components'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border-l-4 border-red-500">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-500 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Non-Returnable Items:</h3>
                    <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                      {[
                        'Opened software, games, or digital products',
                        'Custom-built PCs after assembly begins',
                        'Products with missing serial numbers or UPC codes',
                        'Items damaged due to misuse or improper installation',
                        'Clearance or final sale items (marked clearly)',
                        'Gift cards and promotional items'
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-red-500">✗</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Return Process */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">How to Return</h2>
            
            <div className="space-y-6">
              {[
                {
                  step: '1',
                  title: 'Initiate Return Request',
                  desc: 'Log in to your account and go to Order History. Click "Return Item" and select reason for return.'
                },
                {
                  step: '2',
                  title: 'Get RMA Number',
                  desc: 'You\'ll receive an RMA (Return Merchandise Authorization) number via email within 24 hours.'
                },
                {
                  step: '3',
                  title: 'Pack the Item',
                  desc: 'Securely pack the item in original packaging. Include all accessories, manuals, and free gifts.'
                },
                {
                  step: '4',
                  title: 'Ship the Return',
                  desc: 'Use provided prepaid shipping label (for defective items) or ship at your cost. Include RMA number.'
                },
                {
                  step: '5',
                  title: 'Refund Processing',
                  desc: 'Once received and inspected (2-3 days), refund will be issued to original payment method within 5-7 business days.'
                }
              ].map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-linear-to-br from-orange-600 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Refund Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Refund Options</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Full Refund', desc: 'Original payment method', time: '5-7 business days' },
                { title: 'Store Credit', desc: '+5% bonus credit', time: 'Instant' },
                { title: 'Exchange', desc: 'Swap for different item', time: 'Ships immediately' }
              ].map((option, idx) => (
                <div key={idx} className="bg-linear-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-gray-700 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{option.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{option.desc}</p>
                  <div className="flex items-center gap-2 text-xs text-orange-600 dark:text-orange-500 font-medium">
                    <Clock className="w-4 h-4" />
                    {option.time}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Restocking Fees */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Restocking Fees</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 text-gray-900 dark:text-white">Condition</th>
                  <th className="text-right py-3 text-gray-900 dark:text-white">Fee</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3">Unopened, sealed box</td>
                  <td className="text-right font-semibold text-green-600 dark:text-green-500">No Fee</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3">Opened, all contents present</td>
                  <td className="text-right font-semibold text-orange-600 dark:text-orange-500">15%</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3">Missing accessories</td>
                  <td className="text-right font-semibold text-red-600 dark:text-red-500">25%</td>
                </tr>
                <tr>
                  <td className="py-3">Defective or DOA</td>
                  <td className="text-right font-semibold text-green-600 dark:text-green-500">No Fee</td>
                </tr>
              </tbody>
            </table>
          </motion.div>

          {/* Warranty vs Returns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-linear-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-gray-800 rounded-2xl p-8 border-2 border-orange-200 dark:border-orange-800"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Warranty vs. Returns</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Return Policy (30 days)</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  For buyer&apos;s remorse, unopened products, or DOA items within 30 days of purchase.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Warranty Claims (1-3 years)</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  For defects appearing after 30 days. Handled by manufacturer or CS02 extended warranty.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Need Help with a Return?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Our support team is here to assist you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-linear-to-r from-orange-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition">
                Start Return Request
              </button>
              <button className="px-6 py-3 border-2 border-orange-500 text-orange-600 dark:text-orange-500 rounded-lg font-semibold hover:bg-orange-50 dark:hover:bg-orange-900/20 transition">
                Contact Support
              </button>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
