 'use client';

 import { motion } from 'framer-motion';
 import { BarChart3, TrendingUp, DollarSign, Users, Package, ShoppingCart } from 'lucide-react';
 import { useEffect } from 'react';
 import { useAdminStore } from '@/lib/store/adminStore';

 export default function AdminAnalytics() {
   const metrics = useAdminStore((s) => s.metrics);
   const topProducts = useAdminStore((s) => s.topProducts);
   const salesSeries = useAdminStore((s) => s.salesSeries);
   const fetchTopProducts = useAdminStore((s) => s.fetchTopProducts);
   const fetchMetrics = useAdminStore((s) => s.fetchDashboardMetrics);
   const fetchSalesSeries = useAdminStore((s) => s.fetchSalesSeries);

   useEffect(() => {
     fetchMetrics().catch((e) => console.error(e));
     fetchTopProducts(5).catch((e) => console.error(e));
     fetchSalesSeries().catch((e) => console.error(e));
   }, [fetchTopProducts, fetchMetrics, fetchSalesSeries]);

   const kpis = [
     { label: 'Total Revenue', value: metrics ? `$${metrics.totalRevenue.toLocaleString()}` : '$0', icon: DollarSign, color: 'green' },
     { label: 'Total Orders', value: metrics ? `${metrics.newOrders}` : '0', icon: ShoppingCart, color: 'blue' },
     { label: 'Customers', value: metrics ? `${metrics.activeCustomers}` : '0', icon: Users, color: 'purple' },
     { label: 'Products Sold', value: metrics ? `${metrics.productsSold.toLocaleString()}` : '0', icon: Package, color: 'orange' }
   ];

   return (
     <div className="space-y-8">
       <div>
         <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Analytics</h1>
         <p className="text-gray-600 dark:text-gray-400">Track your store performance</p>
       </div>

       <div className="grid md:grid-cols-4 gap-6">
         {kpis.map((metric, index) => {
           const Icon = metric.icon;
           const badgeClasses = `p-3 rounded-xl inline-flex mb-4 ${
             metric.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
             metric.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
             metric.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30' :
             'bg-orange-100 dark:bg-orange-900/30'
           }`;
           const iconClasses = `w-6 h-6 ${
             metric.color === 'green' ? 'text-green-600 dark:text-green-500' :
             metric.color === 'blue' ? 'text-blue-600 dark:text-blue-500' :
             metric.color === 'purple' ? 'text-purple-600 dark:text-purple-500' :
             'text-orange-600 dark:text-orange-500'
           }`;
           return (
             <motion.div
               key={metric.label}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: index * 0.1 }}
               className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
             >
               <div className={badgeClasses}>
                 <Icon className={iconClasses} />
               </div>
               <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{metric.label}</p>
               <p className="text-3xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
             </motion.div>
           );
         })}
       </div>

       {/* Sales chart */}
       <motion.div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
         <div className="flex items-center justify-between mb-6">
           <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Revenue Overview</h2>
         </div>
         <div className="h-80 flex items-end justify-between gap-4">
           {salesSeries && salesSeries.length > 0 ? (
             salesSeries.map((d: any, i: number) => (
               <div key={i} className="flex-1 flex items-end justify-center">
                 <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-t-md" style={{ height: `${Math.min(100, (Number(d.totalRevenue || 0) / 1000))}%` }} />
                 <p className="text-xs mt-2 text-gray-500 dark:text-gray-400">{d.date}</p>
               </div>
             ))
           ) : (
             <div className="text-gray-500">No sales data available</div>
           )}
         </div>
       </motion.div>

       {/* Top Products */}
       <motion.div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
         <div className="flex items-center gap-3 mb-6">
           <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-500" />
           <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Top Selling Products</h2>
         </div>
         <div className="space-y-4">
           {topProducts && topProducts.length > 0 ? (
             topProducts.map((product: any, index: number) => (
               <div key={product.productId || product.name || index} className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-orange-500 transition">
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-lg bg-linear-to-br from-orange-600 to-orange-500 text-white flex items-center justify-center font-bold">{index + 1}</div>
                   <div>
                     <p className="font-semibold text-gray-900 dark:text-white">{product.name || product.productId}</p>
                     <p className="text-sm text-gray-600 dark:text-gray-400">{product.sales || product.salesCount} units sold</p>
                   </div>
                 </div>
                 <div className="text-right">
                   <p className="font-bold text-orange-600 dark:text-orange-500">${product.revenue?.toLocaleString ? product.revenue.toLocaleString() : product.revenue}</p>
                   <p className="text-xs text-gray-500 dark:text-gray-500">Revenue</p>
                 </div>
               </div>
             ))
           ) : (
             <div className="text-gray-500">No top products found</div>
           )}
         </div>
       </motion.div>
     </div>
  );
}
