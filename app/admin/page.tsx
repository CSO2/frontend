'use client';

import { motion } from 'framer-motion';
import { DollarSign, ShoppingCart, AlertCircle, Users, TrendingUp, TrendingDown, Package, Eye } from 'lucide-react';
import Link from 'next/link';
import { useAdminStore } from '@/lib/store/adminStore';
import { useEffect } from 'react';

export default function AdminDashboard() {
  const { 
    metrics, 
    recentOrders, 
    lowStockItems, 
    isLoading, 
    fetchAllDashboardData 
  } = useAdminStore();

  useEffect(() => {
    fetchAllDashboardData();
  }, [fetchAllDashboardData]);

  const kpiData = [
    {
      label: 'Total Revenue',
      value: metrics ? `$${metrics.totalRevenue.toLocaleString()}` : '$0',
      change: metrics?.revenueChange || '0%',
      trend: metrics?.revenueTrend || 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      label: 'New Orders',
      value: metrics?.newOrders.toString() || '0',
      change: metrics?.newOrdersChange || '0%',
      trend: metrics?.newOrdersTrend || 'up',
      icon: ShoppingCart,
      color: 'blue'
    },
    {
      label: 'Pending RMAs',
      value: metrics?.pendingRMAs.toString() || '0',
      change: metrics?.pendingRMAsChange || '0%',
      trend: metrics?.pendingRMAsTrend || 'down',
      icon: AlertCircle,
      color: 'orange'
    },
    {
      label: 'Active Customers',
      value: metrics?.activeCustomers.toLocaleString() || '0',
      change: metrics?.activeCustomersChange || '0%',
      trend: metrics?.activeCustomersTrend || 'up',
      icon: Users,
      color: 'purple'
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here&apos;s your store overview.</p>
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
            {recentOrders.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No recent orders found.</p>
            ) : (
              recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-orange-500 transition"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono font-semibold text-gray-900 dark:text-white">
                        {order.id.substring(0, 8)}...
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'DELIVERED' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                        order.status === 'SHIPPED' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                        'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total: ${order.total}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <button className="text-sm text-orange-600 dark:text-orange-500 hover:underline flex items-center gap-1 mt-1">
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </div>
                </div>
              ))
            )}
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
            {lowStockItems.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No low stock items.</p>
            ) : (
              lowStockItems.map((item, idx) => (
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
                    <p className="text-2xl font-bold text-red-600 dark:text-red-500">{item.stockLevel}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">in stock</p>
                  </div>
                </div>
              ))
            )}
          </div>

          <button className="w-full mt-6 py-3 bg-linear-to-r from-orange-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition">
            Reorder Stock
          </button>
        </motion.div>
      </div>
    </div>
  );
}
