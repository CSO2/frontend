'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  User, 
  Package, 
  MapPin, 
  CreditCard, 
  Star, 
  FileText, 
  Wrench, 
  Bell, 
  Gift,
  Eye,
  Settings
} from 'lucide-react';

const sidebarLinks = [
  { href: '/account', label: 'My Profile', icon: User },
  { href: '/account/orders', label: 'Order History', icon: Package },
  { href: '/account/track', label: 'Track Order', icon: MapPin },
  { href: '/account/reviews', label: 'My Reviews', icon: Star },
  { href: '/account/invoices', label: 'Invoices', icon: FileText },
  { href: '/account/builds', label: 'Saved Builds', icon: Wrench },
  { href: '/account/payment-methods', label: 'Payment Methods', icon: CreditCard },
  { href: '/account/addresses', label: 'Addresses', icon: MapPin },
  { href: '/account/notifications', label: 'Notifications', icon: Bell },
  { href: '/account/rewards', label: 'My Rewards', icon: Gift },
  { href: '/account/recently-viewed', label: 'Recently Viewed', icon: Eye },
  { href: '/account/settings', label: 'Settings', icon: Settings }
];

export default function AccountLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black py-24">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-2">
            My Account
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your profile, orders, and preferences</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 sticky top-24">
              <nav className="space-y-1">
                {sidebarLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-500 font-semibold'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
