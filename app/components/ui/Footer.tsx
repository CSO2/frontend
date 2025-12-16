'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, ArrowRight } from 'lucide-react';
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
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  ];

  return (
    <footer className="bg-muted/30 border-t border-border mt-auto">
      {/* Newsletter Section - Cleaner Modern Look */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="text-2xl font-heading font-bold text-foreground mb-3">
                Join our community
              </h3>
              <p className="text-muted-foreground">
                Get the latest news on product drops, tech tips, and exclusive deals.
              </p>
            </div>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto min-w-[320px]"
            >
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-4 pr-10 py-3 rounded-full border border-input bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                <Mail className="absolute right-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors whitespace-nowrap flex items-center justify-center gap-2"
              >
                {subscribed ? 'Joined!' : 'Subscribe'}
                {!subscribed && <ArrowRight size={18} />}
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-16">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-bold text-foreground mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-border">
          <div className="flex items-center gap-2">
            <span className="text-xl font-heading font-bold tracking-tight text-foreground">CS02</span>
            <span className="text-sm text-muted-foreground">© 2025</span>
          </div>

          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>

          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
