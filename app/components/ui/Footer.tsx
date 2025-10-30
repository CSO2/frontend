'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  const footerSections = [
    {
      title: 'Shop',
      links: [
        { href: '/pre-builts', label: 'Pre-Built PCs' },
        { href: '/components', label: 'Components' },
        { href: '/deals', label: 'Deals & Promotions' },
        { href: '/gallery', label: 'Build Gallery' },
      ],
    },
    {
      title: 'Build',
      links: [
        { href: '/pc-builder', label: 'PC Builder' },
        { href: '/builderbot', label: 'BuilderBot' },
        { href: '/builder-quiz', label: 'System Builder Quiz' },
        { href: '/compatibility-guide', label: 'Compatibility Guide' },
      ],
    },
    {
      title: 'Support',
      links: [
        { href: '/support', label: 'Help Center' },
        { href: '/contact', label: 'Contact Us' },
        { href: '/faq', label: 'FAQ' },
        { href: '/warranty', label: 'Warranty' },
        { href: '/stores', label: 'Store Locator' },
      ],
    },
    {
      title: 'Company',
      links: [
        { href: '/about', label: 'About Us' },
        { href: '/blog', label: 'Blog' },
        { href: '/careers', label: 'Careers' },
        { href: '/testimonials', label: 'Testimonials' },
      ],
    },
    {
      title: 'Services',
      links: [
        { href: '/price-match', label: 'Price Match' },
        { href: '/financing', label: 'Financing' },
        { href: '/trade-in', label: 'Trade-In' },
        { href: '/bulk-orders', label: 'Bulk Orders' },
      ],
    },
  ];

  const legalLinks = [
    { href: '/returns', label: 'Returns & Refunds' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      {/* Newsletter Section */}
      <div className="bg-wso2-orange py-8 sm:py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Stay Updated
              </h3>
              <p className="text-sm sm:text-base text-white/90">
                Subscribe to get special offers, tech news, and more.
              </p>
            </div>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md w-full md:w-auto"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-6 py-3 bg-white text-wso2-orange font-semibold rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                {subscribed ? 'Subscribed!' : 'Subscribe'}
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 mb-8 sm:mb-10 md:mb-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white mb-3 sm:mb-4">
                {section.title}
              </h4>
              <ul className="space-y-1.5 sm:space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-wso2-orange dark:hover:text-wso2-orange transition-colors block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-4 sm:space-x-6 mb-6 sm:mb-8">
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2.5 sm:p-3 bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-wso2-orange dark:hover:bg-wso2-orange hover:text-white transition-colors"
              aria-label={social.label}
            >
              <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </motion.a>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 gap-4">
            <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm text-center md:text-left">
              <p>© 2025 CS02. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
              {legalLinks.map((link, index) => (
                <span key={link.href} className="flex items-center">
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-wso2-orange dark:hover:text-wso2-orange transition-colors whitespace-nowrap"
                  >
                    {link.label}
                  </Link>
                  {index < legalLinks.length - 1 && (
                    <span className="ml-3 sm:ml-4 text-gray-400">|</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
