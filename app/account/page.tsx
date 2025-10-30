'use client';

import { motion } from 'framer-motion';
import { useUserStore } from '@/lib/store/userStore';
import { Edit2, Mail, User as UserIcon, Award } from 'lucide-react';

export default function AccountPage() {
  const { user } = useUserStore();

  return (
    <div className="space-y-6">
      
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
      >
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Information</h2>
          <button className="flex items-center gap-2 px-4 py-2 text-orange-600 dark:text-orange-500 border-2 border-orange-500 rounded-lg font-semibold hover:bg-orange-50 dark:hover:bg-orange-900/20 transition">
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </button>
        </div>

        {user ? (
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-600 to-orange-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </p>
                {user.tier && (
                  <div className="flex items-center gap-2 mt-2">
                    <Award className="w-5 h-5 text-orange-500" />
                    <span className="text-sm font-semibold text-orange-600 dark:text-orange-500 uppercase">
                      {user.tier} Member
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Full Name</label>
                <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Email Address</label>
                <p className="font-semibold text-gray-900 dark:text-white">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Member Since</label>
                <p className="font-semibold text-gray-900 dark:text-white">January 2024</p>
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Loyalty Points</label>
                <p className="font-semibold text-orange-600 dark:text-orange-500">{user.loyaltyPoints || 0} pts</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <UserIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Not Logged In</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Please log in to view your profile</p>
            <button className="px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition">
              Sign In
            </button>
          </div>
        )}
      </motion.div>

      {/* Account Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { label: 'Total Orders', value: '12', color: 'blue' },
          { label: 'Total Spent', value: '$8,947', color: 'green' },
          { label: 'Reviews Written', value: '5', color: 'orange' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 text-center"
          >
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</p>
            <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <button className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition text-left">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Change Password</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Update your account security</p>
          </button>
          <button className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition text-left">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email Preferences</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Manage newsletter subscriptions</p>
          </button>
          <button className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition text-left">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Download Data</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Export your account information</p>
          </button>
          <button className="p-4 border-2 border-red-500 dark:border-red-600 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition text-left">
            <h3 className="font-semibold text-red-600 dark:text-red-500 mb-1">Delete Account</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Permanently remove your account</p>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
