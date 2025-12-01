'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Save, Lock, Mail, Bell, Eye, EyeOff, Download, Trash2 } from 'lucide-react';
import { useUserStore } from '@/lib/store/userStore';

export default function AccountSettings() {
  const { user, updateUser } = useUserStore();
  const [saved, setSaved] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [emailPreferences, setEmailPreferences] = useState(() =>
    user?.preferences || {
      orderUpdates: true,
      promotions: true,
      newsletter: false,
      productRecommendations: true
    }
  );

  const handleSave = async () => {
    await updateUser({ preferences: emailPreferences });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <SettingsIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Please Log In
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          You need to be logged in to access settings
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Account Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your account preferences</p>
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

      {/* Change Password */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-6 h-6 text-orange-600 dark:text-orange-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Change Password</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              New Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <button
            onClick={handleSave}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition"
          >
            Update Password
          </button>
        </div>
      </motion.div>

      {/* Email Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-orange-600 dark:text-orange-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Email Preferences</h2>
        </div>

        <div className="space-y-4">
          {[
            { key: 'orderUpdates', label: 'Order Updates', description: 'Receive notifications about your orders' },
            { key: 'promotions', label: 'Promotions & Deals', description: 'Get notified about special offers and sales' },
            { key: 'newsletter', label: 'Newsletter', description: 'Monthly newsletter with tech news and tips' },
            { key: 'productRecommendations', label: 'Product Recommendations', description: 'Personalized product suggestions' }
          ].map((pref) => (
            <div key={pref.key} className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex-1">
                <p className="font-semibold text-gray-900 dark:text-white">{pref.label}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{pref.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailPreferences[pref.key as keyof typeof emailPreferences]}
                  onChange={(e) => setEmailPreferences({ ...emailPreferences, [pref.key]: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
              </label>
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          className="mt-6 px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition"
        >
          Save Preferences
        </button>
      </motion.div>

      {/* Data & Privacy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Mail className="w-6 h-6 text-orange-600 dark:text-orange-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data & Privacy</h2>
        </div>

        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-orange-500 transition text-left">
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Download Your Data</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Get a copy of all your account data</p>
              </div>
            </div>
            <span className="text-orange-600 dark:text-orange-500 font-semibold">Download</span>
          </button>

          <button className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-red-200 dark:border-red-800 hover:border-red-500 transition text-left">
            <div className="flex items-center gap-3">
              <Trash2 className="w-5 h-5 text-red-600 dark:text-red-500" />
              <div>
                <p className="font-semibold text-red-600 dark:text-red-500">Delete Account</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Permanently delete your account and data</p>
              </div>
            </div>
            <span className="text-red-600 dark:text-red-500 font-semibold">Delete</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
