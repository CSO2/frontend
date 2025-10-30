'use client';

import { motion } from 'framer-motion';
import { DollarSign, ShoppingCart, AlertCircle, Users, TrendingUp, TrendingDown, Package, Eye } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const kpiData = [
    {
      label: 'Total Revenue',
      value: '$127,849',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      label: 'New Orders',
      value: '248',
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'blue'
    },
    {
      label: 'Pending RMAs',
      value: '12',
      change: '-3.1%',
      trend: 'down',
      icon: AlertCircle,
      color: 'orange'
    },
    {
      label: 'Active Customers',
      value: '1,847',
      change: '+15.8%',
      trend: 'up',
      icon: Users,
      color: 'purple'
    }
  ];

  const recentOrders = [
    { id: 'ORD-1001', customer: 'John Doe', total: 2847, status: 'Processing', time: '5 min ago' },
    { id: 'ORD-1002', customer: 'Jane Smith', total: 1249, status: 'Shipped', time: '12 min ago' },
    { id: 'ORD-1003', customer: 'Bob Wilson', total: 3499, status: 'Processing', time: '1 hour ago' },
    { id: 'ORD-1004', customer: 'Alice Brown', total: 899, status: 'Delivered', time: '2 hours ago' }
  ];

  const lowStockItems = [
    { name: 'Intel Core i9-13900K', stock: 3, category: 'CPU' },
    { name: 'NVIDIA RTX 4090', stock: 1, category: 'GPU' },
    { name: 'Corsair RM1000x PSU', stock: 4, category: 'PSU' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's your store overview.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${
                  kpi.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                  kpi.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                  kpi.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30' :
                  'bg-purple-100 dark:bg-purple-900/30'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    kpi.color === 'green' ? 'text-green-600 dark:text-green-500' :
                    kpi.color === 'blue' ? 'text-blue-600 dark:text-blue-500' :
                    kpi.color === 'orange' ? 'text-orange-600 dark:text-orange-500' :
                    'text-purple-600 dark:text-purple-500'
                  }`} />
                </div>
                <span className={`flex items-center gap-1 text-sm font-semibold ${
                  kpi.trend === 'up' ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'
                }`}>
                  <TrendIcon className="w-4 h-4" />
                  {kpi.change}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{kpi.label}</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{kpi.value}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Orders</h2>
            <Link
              href="/admin/orders"
              className="text-orange-600 dark:text-orange-500 font-semibold hover:underline text-sm"
            >
              View All →
            </Link>
          </div>

          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-orange-500 transition"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-semibold text-gray-900 dark:text-white">
                      {order.id}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'Delivered' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                      order.status === 'Shipped' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                      'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{order.customer}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">{order.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 dark:text-white">${order.total}</p>
                  <button className="text-sm text-orange-600 dark:text-orange-500 hover:underline flex items-center gap-1 mt-1">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Low Stock Alerts */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Low Stock Alerts</h2>
            <Link
              href="/admin/inventory-alerts"
              className="text-orange-600 dark:text-orange-500 font-semibold hover:underline text-sm"
            >
              View All →
            </Link>
          </div>

          <div className="space-y-4">
            {lowStockItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 rounded-xl border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20"
              >
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-500" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{item.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-red-600 dark:text-red-500">{item.stock}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">in stock</p>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 py-3 bg-linear-to-r from-orange-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition">
            Reorder Stock
          </button>
        </motion.div>
      </div>
    </div>
  );
}
