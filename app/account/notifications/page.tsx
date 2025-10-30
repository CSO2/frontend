'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, BellOff, Package, Truck, Tag, AlertCircle, X } from 'lucide-react';
import { useUserStore } from '@/lib/store/userStore';

interface Notification {
  id: string;
  type: 'order' | 'shipping' | 'promo' | 'alert';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export default function AccountNotifications() {
  const { user } = useUserStore();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'shipping',
      title: 'Order Shipped!',
      message: 'Your order #ORD-1001 has been shipped and is on its way.',
      timestamp: '2024-01-15T10:30:00',
      read: false
    },
    {
      id: '2',
      type: 'order',
      title: 'Order Confirmation',
      message: 'Your order #ORD-1002 has been confirmed and is being processed.',
      timestamp: '2024-01-14T15:45:00',
      read: false
    },
    {
      id: '3',
      type: 'promo',
      title: 'Special Offer: 20% Off GPUs',
      message: 'Limited time offer on all graphics cards. Shop now and save!',
      timestamp: '2024-01-13T09:00:00',
      read: true
    },
    {
      id: '4',
      type: 'alert',
      title: 'Price Drop Alert',
      message: 'Intel Core i9-13900K is now $50 cheaper! Add it to your cart now.',
      timestamp: '2024-01-12T14:20:00',
      read: true
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'order': return Package;
      case 'shipping': return Truck;
      case 'promo': return Tag;
      case 'alert': return AlertCircle;
      default: return Bell;
    }
  };

  const getColorClasses = (type: string) => {
    switch (type) {
      case 'order': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-500';
      case 'shipping': return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-500';
      case 'promo': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-500';
      case 'alert': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-500';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Notifications</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition"
          >
            Mark All as Read
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            filter === 'all'
              ? 'bg-orange-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            filter === 'unread'
              ? 'bg-orange-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
          }`}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredNotifications.map((notification) => {
            const Icon = getIcon(notification.type);
            const colorClasses = getColorClasses(notification.type);

            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                onClick={() => !notification.read && markAsRead(notification.id)}
                className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 p-6 cursor-pointer transition ${
                  notification.read
                    ? 'border-gray-200 dark:border-gray-700'
                    : 'border-orange-500 dark:border-orange-600'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${colorClasses}`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        {notification.title}
                        {!notification.read && (
                          <span className="ml-2 w-2 h-2 bg-orange-600 rounded-full inline-block" />
                        )}
                      </h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                        className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      >
                        <X className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      {notification.message}
                    </p>

                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      {new Date(notification.timestamp).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredNotifications.length === 0 && (
        <div className="text-center py-12">
          <BellOff className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Notifications
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            You're all caught up!
          </p>
        </div>
      )}
    </div>
  );
}
