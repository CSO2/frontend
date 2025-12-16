'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Moon,
  Sun,
  Menu,
  X,
  Cpu,
} from 'lucide-react';
import { useThemeStore } from '@/lib/store/themeStore';
import { useCartStore } from '@/lib/store/cartStore';
import { useWishlistStore } from '@/lib/store/wishlistStore';
import { useUserStore } from '@/lib/store/userStore';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const { theme, toggleTheme } = useThemeStore();
  const cartItems = useCartStore((state) => state.getTotalItems());
  const wishlistItems = useWishlistStore((state) => state.items.length);
  const user = useUserStore((state) => state.user);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    { href: '/gallery', label: 'Gallery' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled
          ? 'py-4'
          : 'py-6'
          }`}
      >
        <div
          className={`mx-auto px-6 transition-all duration-500 ${isScrolled
            ? 'max-w-7xl bg-background/70 backdrop-blur-xl border border-white/10 shadow-lg rounded-2xl'
            : 'max-w-[1440px] bg-background/10 backdrop-blur-md border-b border-white/5'
            }`}
        >
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="text-primary"
              >
                <Cpu size={28} strokeWidth={2.5} />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl font-heading font-bold tracking-tight leading-none group-hover:text-primary transition-colors">
                  CS02
                </span>
                <span className="text-[0.6rem] font-bold tracking-widest uppercase text-muted-foreground group-hover:text-primary/80 transition-colors">
                  Systems
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Search Bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-xs mx-6">
              <form onSubmit={handleSearch} className="relative w-full group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="block w-full pl-10 pr-3 py-1.5 border border-input rounded-full leading-5 bg-secondary/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-background transition-all duration-200 sm:text-sm"
                />
              </form>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>

              {/* Wishlist */}
              <Link href="/wishlist">
                <div className="relative p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
                  <Heart size={20} />
                  {wishlistItems > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-primary-foreground transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full">
                      {wishlistItems}
                    </span>
                  )}
                </div>
              </Link>

              {/* Cart */}
              <Link href="/cart">
                <div className="relative p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
                  <ShoppingCart size={20} />
                  {cartItems > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-primary-foreground transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full">
                      {cartItems}
                    </span>
                  )}
                </div>
              </Link>

              {/* User Account */}
              <Link href={user ? '/account' : '/login'}>
                <div className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
                  <User size={20} />
                </div>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-border bg-background/95 backdrop-blur-md overflow-hidden"
            >
              <div className="px-4 pt-4 pb-6 space-y-4">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full px-4 py-3 rounded-xl border border-input bg-secondary/50 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                  <Search className="absolute right-3 top-3.5 h-5 w-5 text-muted-foreground" />
                </form>

                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-3 text-base font-medium text-foreground hover:bg-muted rounded-xl transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      {/* Spacer to prevent content jump when nav becomes fixed/sticky relative to content flow if needed, 
          but here we use fixed nav so we might need padding on body or main. 
          The layout has 'pt-16' or similar usually, or we can add a div here. 
      */}
    </>
  );
}
