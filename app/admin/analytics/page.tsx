'use client';

import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, DollarSign, Users, Package, ShoppingCart } from 'lucide-react';

export default function AdminAnalytics() {
  const salesData = [
    { month: 'Jan', revenue: 45000, orders: 120 },
    { month: 'Feb', revenue: 52000, orders: 145 },
    { month: 'Mar', revenue: 48000, orders: 135 },
    { month: 'Apr', revenue: 61000, orders: 178 },
    { month: 'May', revenue: 58000, orders: 162 },
    { month: 'Jun', revenue: 67000, orders: 195 }
  ];

  const topProducts = [
    { name: 'Intel Core i9-13900K', sales: 87, revenue: 47826 },
    { name: 'NVIDIA RTX 4090', sales: 45, revenue: 89955 },
    { name: 'AMD Ryzen 9 7950X', sales: 62, revenue: 37820 },
    { name: 'Corsair DDR5 32GB', sales: 134, revenue: 32164 },
    { name: 'Samsung 980 Pro 2TB', sales: 98, revenue: 24598 }
  ];

  const maxRevenue = Math.max(...salesData.map(d => d.revenue));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400">Track your store performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '$331,000', icon: DollarSign, color: 'green' },
          { label: 'Total Orders', value: '935', icon: ShoppingCart, color: 'blue' },
          { label: 'Customers', value: '1,847', icon: Users, color: 'purple' },
          { label: 'Products Sold', value: '2,456', icon: Package, color: 'orange' }
        ].map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className={`p-3 rounded-xl inline-flex mb-4 ${
                metric.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                metric.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                metric.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30' :
                'bg-orange-100 dark:bg-orange-900/30'
              }`}>
                <Icon className={`w-6 h-6 ${
                  metric.color === 'green' ? 'text-green-600 dark:text-green-500' :
                  metric.color === 'blue' ? 'text-blue-600 dark:text-blue-500' :
                  metric.color === 'purple' ? 'text-purple-600 dark:text-purple-500' :
                  'text-orange-600 dark:text-orange-500'
                }`} />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{metric.label}</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Sales Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Revenue Overview</h2>
          <select className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
            <option>Last 6 Months</option>
            <option>Last 12 Months</option>
            <option>This Year</option>
          </select>
        </div>

        <div className="h-80 flex items-end justify-between gap-4">
          {salesData.map((data, index) => (
            <motion.div
              key={data.month}
              initial={{ height: 0 }}
              animate={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex-1 bg-linear-to-t from-orange-600 to-orange-400 rounded-t-lg relative group"
            >
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap">
                ${data.revenue.toLocaleString()}
                <div className="text-xs text-gray-300 dark:text-gray-600">{data.orders} orders</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-between mt-4">
          {salesData.map(data => (
            <div key={data.month} className="flex-1 text-center text-sm text-gray-600 dark:text-gray-400">
              {data.month}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Top Products */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Top Selling Products</h2>
        </div>

        <div className="space-y-4">
          {topProducts.map((product, index) => (
            <div
              key={product.name}
              className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-orange-500 transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-orange-600 to-orange-500 text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{product.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{product.sales} units sold</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-orange-600 dark:text-orange-500">
                  ${product.revenue.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">Revenue</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
