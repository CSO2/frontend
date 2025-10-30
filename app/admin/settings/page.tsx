'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Save, Mail, CreditCard, Truck, Globe, Bell } from 'lucide-react';

export default function AdminSettings() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Configure your store settings</p>
      </div>

      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-6 py-4 rounded-xl flex items-center gap-3"
        >
          <Save className="w-5 h-5" />
          Settings saved successfully!
        </motion.div>
      )}

      {/* Store Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-6 h-6 text-orange-600 dark:text-orange-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Store Information</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Store Name
            </label>
            <input
              type="text"
              defaultValue="CS02 Computer Store"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Support Email
            </label>
            <input
              type="email"
              defaultValue="support@cs02.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Support Phone
            </label>
            <input
              type="tel"
              defaultValue="1-800-CS02-HELP"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Time Zone
            </label>
            <select className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500">
              <option>America/Los_Angeles (PST)</option>
              <option>America/New_York (EST)</option>
              <option>America/Chicago (CST)</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Email Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Mail className="w-6 h-6 text-orange-600 dark:text-orange-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Email Templates</h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Order Confirmation Template
            </label>
            <textarea
              rows={4}
              defaultValue="Thank you for your order! Your order #{ORDER_ID} has been received and is being processed."
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Shipping Notification Template
            </label>
            <textarea
              rows={4}
              defaultValue="Great news! Your order #{ORDER_ID} has been shipped. Track it here: {TRACKING_LINK}"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
      </motion.div>

      {/* Payment Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <CreditCard className="w-6 h-6 text-orange-600 dark:text-orange-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Gateways</h2>
        </div>

        <div className="space-y-6">
          <div className="p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-5 h-5 text-orange-600 rounded" />
                <span className="font-semibold text-gray-900 dark:text-white">Stripe</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold">
                Active
              </span>
            </div>
            <input
              type="password"
              placeholder="Stripe API Key"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <input type="checkbox" className="w-5 h-5 text-orange-600 rounded" />
                <span className="font-semibold text-gray-900 dark:text-white">PayPal</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-semibold">
                Inactive
              </span>
            </div>
            <input
              type="password"
              placeholder="PayPal Client ID"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
      </motion.div>

      {/* Shipping Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Truck className="w-6 h-6 text-orange-600 dark:text-orange-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Shipping</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Flat Rate Shipping
            </label>
            <input
              type="number"
              defaultValue="15"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Free Shipping Threshold
            </label>
            <input
              type="number"
              defaultValue="100"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
      </motion.div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full py-4 bg-linear-to-r from-orange-600 to-orange-500 text-white rounded-xl font-bold text-lg hover:shadow-lg transition flex items-center justify-center gap-3"
      >
        <Save className="w-6 h-6" />
        Save All Settings
      </button>
    </div>
  );
}
