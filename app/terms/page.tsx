'use client';

import { motion } from 'framer-motion';
import { FileText, AlertCircle, CheckCircle, XCircle, Scale } from 'lucide-react';

export default function TermsOfServicePage() {
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
            <FileText className="w-8 h-8 text-orange-600 dark:text-orange-500" />
          </motion.div>
          <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Last Updated: January 2025
          </p>
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            Please read these terms carefully before using CS02 services.
          </p>
        </div>
      </motion.section>

      {/* Terms Content */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Acceptance of Terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
          >
            <div className="flex items-start gap-4 mb-4">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  By accessing or using CS02&apos;s website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Use License */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Use License</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Permission is granted to temporarily access and use CS02 services for personal, non-commercial purposes. This license shall automatically terminate if you violate any restrictions.
            </p>
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border-l-4 border-orange-500">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">You may NOT:</h3>
              <ul className="space-y-2">
                {[
                  'Modify or copy materials without authorization',
                  'Use materials for commercial purposes',
                  'Attempt to reverse engineer any software',
                  'Remove copyright or proprietary notations',
                  'Transfer materials to another person',
                  'Use automated systems to scrape content'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Account Terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Account Terms</h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-orange-500 mt-2" />
                <span>You must be 13 years or older to create an account</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-orange-500 mt-2" />
                <span>You are responsible for maintaining account security</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-orange-500 mt-2" />
                <span>You must provide accurate and complete information</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-orange-500 mt-2" />
                <span>One person may not maintain multiple accounts</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-orange-500 mt-2" />
                <span>CS02 reserves the right to terminate accounts for violations</span>
              </li>
            </ul>
          </motion.div>

          {/* Purchases & Payment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Purchases & Payment</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              All purchases are subject to product availability and acceptance. We reserve the right to refuse or cancel orders at any time.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Pricing</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Prices are subject to change without notice. Promotional prices are valid only during specified periods.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Payment Methods</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We accept major credit cards, PayPal, and financing options. Payment is due at time of order.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Shipping & Returns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Shipping & Returns</h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-orange-500 mt-2" />
                <span>Standard shipping: 3-7 business days</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-orange-500 mt-2" />
                <span>30-day return policy for unopened products</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-orange-500 mt-2" />
                <span>Restocking fee may apply (15% for opened items)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-orange-500 mt-2" />
                <span>Custom-built PCs are non-returnable after assembly begins</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-orange-500 mt-2" />
                <span>See our Returns Policy for complete details</span>
              </li>
            </ul>
          </motion.div>

          {/* Warranties */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Warranties & Limitations</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Products are covered by manufacturer warranties. CS02 provides additional warranty options at time of purchase.
            </p>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border-l-4 border-yellow-500">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-500 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Disclaimer</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    CS02 makes no warranties regarding uninterrupted or error-free service. We are not liable for indirect, incidental, or consequential damages. Maximum liability is limited to the purchase price of products.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Intellectual Property */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Intellectual Property</h2>
            <p className="text-gray-600 dark:text-gray-400">
              All content on CS02, including text, graphics, logos, images, and software, is the property of CS02 or its licensors and is protected by copyright and trademark laws. Unauthorized use is prohibited.
            </p>
          </motion.div>

          {/* Governing Law */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-linear-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-gray-800 rounded-2xl p-8 border-2 border-orange-200 dark:border-orange-800"
          >
            <div className="flex items-start gap-4 mb-4">
              <Scale className="w-8 h-8 text-orange-600 dark:text-orange-500" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Governing Law</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  These terms are governed by the laws of the State of California, without regard to conflict of law provisions. Any disputes shall be resolved in the courts of Santa Clara County, California.
                </p>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Changes to Terms</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  CS02 reserves the right to modify these terms at any time. Continued use of services after changes constitutes acceptance of new terms.
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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Questions?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              If you have questions about these Terms of Service, contact us:
            </p>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p>📧 legal@cs02.com</p>
              <p>📞 +1 (555) 123-4567</p>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
