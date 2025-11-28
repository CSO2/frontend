'use client';

import { ReactNode, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';
import { 
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Star,
  Tag,
  BarChart3,
  Settings,
  FileText,
  MapPin,
  AlertCircle,
  Mail,
  Activity,
  Database,
  Upload,
  Archive,
  Loader2
} from 'lucide-react';

const adminLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/categories', label: 'Categories', icon: Tag },
  { href: '/admin/stock', label: 'Stock Management', icon: Database },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/reviews', label: 'Review Moderation', icon: Star },
  { href: '/admin/promotions', label: 'Promotions', icon: Tag },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/invoices', label: 'Invoices', icon: FileText },
  { href: '/admin/stores', label: 'Store Locations', icon: MapPin },
  { href: '/admin/rma', label: 'Returns (RMA)', icon: AlertCircle },
  { href: '/admin/support', label: 'Support Tickets', icon: Mail },
  { href: '/admin/inventory-alerts', label: 'Inventory Alerts', icon: Activity },
  { href: '/admin/bulk', label: 'Bulk Import/Export', icon: Upload },
  { href: '/admin/abandoned-carts', label: 'Abandoned Carts', icon: Archive },
  { href: '/admin/settings', label: 'Settings', icon: Settings }
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login?redirect=' + encodeURIComponent(pathname));
    } else if (!isLoading && user && user.role !== 'ADMIN') {
      router.push('/unauthorized');
    }
  }, [user, isLoading, router, pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-orange-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'ADMIN') {
    return null;
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      <div className="flex">
        
        {/* Sidebar */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="w-64 min-h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 fixed left-0 top-0 overflow-y-auto"
        >
          <div className="p-6">
            <h1 className="text-2xl font-bold bg-linear-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              CS02 Admin
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Management Portal</p>
          </div>

          <nav className="px-3 pb-6">
            {adminLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all mb-1 ${
                    isActive
                      ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-500 font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 ml-64">
          <div className="p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
