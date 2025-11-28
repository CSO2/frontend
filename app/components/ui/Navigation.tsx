'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Moon,
  Sun,
  Menu,
  X,
  LogOut,
} from 'lucide-react';
import { useThemeStore } from '@/lib/store/themeStore';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useCart } from '@/lib/hooks/useCart';
import { useWishlist } from '@/lib/hooks/useWishlist';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Navigation() {
  const { theme, toggleTheme } = useThemeStore();
  const { user, logout } = useAuth();
  const { data: cart } = useCart();
  const { data: wishlist } = useWishlist();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const cartItems = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const wishlistItems = wishlist?.length || 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const navLinks = [
    { href: '/pre-builts', label: 'Pre-builts' },
    { href: '/components', label: 'Components' },
    { href: '/pc-builder', label: 'PC Builder' },
    { href: '/builderbot', label: 'BuilderBot' },
    { href: '/deals', label: 'Deals' },
    { href: '/gallery', label: 'Build Gallery' },
  ];

  if (!mounted) return null;

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl font-bold"
            >
              <span className="text-gray-900 dark:text-white">CS</span>
              <span className="text-wso2-orange">02</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 dark:text-gray-300 hover:text-wso2-orange dark:hover:text-wso2-orange transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md mx-8"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-wso2-orange"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </form>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              )}
            </motion.button>

            {/* Wishlist */}
            <Link href="/wishlist">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Heart className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                {wishlistItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-wso2-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {wishlistItems}
                  </span>
                )}
              </motion.div>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <ShoppingCart className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                {cartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-wso2-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {cartItems}
                  </span>
                )}
              </motion.div>
            </Link>

            {/* User Account */}
            <Link href={user ? '/account' : '/login'}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title={user ? `${user.firstName} ${user.lastName}` : 'Login'}
              >
                <User className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </motion.div>
            </Link>

            {/* Logout Button (only show when logged in) */}
            {user && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={async () => {
                  try {
                    await logout();
                    toast.success('Logged out successfully');
                  } catch (err) {
                    toast.error('Logout failed');
                  }
                }}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Logout"
              >
                <LogOut className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </motion.button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden py-3">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-wso2-orange"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
        >
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-gray-700 dark:text-gray-300 hover:text-wso2-orange dark:hover:text-wso2-orange transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
