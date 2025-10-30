'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, Users, FileText } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: [
        'Personal identification information (Name, email address, phone number, etc.)',
        'Billing and shipping addresses',
        'Payment information (processed securely through third-party providers)',
        'Purchase history and product preferences',
        'Technical data (IP address, browser type, device information)',
        'Cookies and usage data to improve your experience'
      ]
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: [
        'Process and fulfill your orders',
        'Send order confirmations and shipping updates',
        'Provide customer support and respond to inquiries',
        'Improve our website and services',
        'Send promotional emails (with your consent)',
        'Detect and prevent fraud',
        'Comply with legal obligations'
      ]
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: [
        'We use industry-standard SSL encryption for all transactions',
        'Payment information is never stored on our servers',
        'Regular security audits and vulnerability assessments',
        'Restricted access to personal data on a need-to-know basis',
        'Secure data centers with 24/7 monitoring',
        'Regular backups and disaster recovery procedures'
      ]
    },
    {
      icon: Users,
      title: 'Information Sharing',
      content: [
        'We do NOT sell your personal information to third parties',
        'Shipping information shared with delivery partners only for fulfillment',
        'Payment processing through trusted partners (Stripe, PayPal)',
        'Analytics providers to improve our services (anonymized data)',
        'Law enforcement when legally required',
        'Business transfers (mergers, acquisitions) with notice'
      ]
    },
    {
      icon: FileText,
      title: 'Your Rights',
      content: [
        'Access your personal data at any time',
        'Request correction of inaccurate information',
        'Request deletion of your account and data',
        'Opt-out of marketing communications',
        'Export your data in a portable format',
        'Lodge a complaint with supervisory authorities'
      ]
    },
    {
      icon: Shield,
      title: 'Cookies & Tracking',
      content: [
        'Essential cookies for website functionality',
        'Performance cookies to analyze site usage',
        'Marketing cookies for personalized ads (with consent)',
        'You can manage cookie preferences in your browser',
        'Third-party cookies from Google Analytics, Facebook Pixel',
        'Do Not Track signals are respected'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 pt-24 pb-12"
      >
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-block p-3 bg-orange-100 dark:bg-orange-900/30 rounded-2xl mb-6"
          >
            <Shield className="w-8 h-8 text-orange-600 dark:text-orange-500" />
          </motion.div>
          <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Last Updated: January 2025
          </p>
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            At CS02, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information.
          </p>
        </div>
      </motion.section>

      {/* Policy Sections */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-5xl mx-auto space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                  <section.icon className="w-6 h-6 text-orange-600 dark:text-orange-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{section.title}</h2>
                </div>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-linear-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-gray-800 rounded-2xl p-8 border-2 border-orange-200 dark:border-orange-800"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Children's Privacy</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Our services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us immediately.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">Changes to This Policy</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We may update this privacy policy from time to time. We will notify you of significant changes by posting a notice on our website or sending an email. Your continued use of our services after changes indicates acceptance of the updated policy.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">Contact Us</h2>
            <p className="text-gray-700 dark:text-gray-300">
              If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
            </p>
            <div className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
              <p>📧 Email: privacy@cs02.com</p>
              <p>📞 Phone: +1 (555) 123-4567</p>
              <p>📍 Address: 123 Tech Street, Silicon Valley, CA 94025</p>
            </div>
          </motion.div>

          {/* GDPR & CCPA Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">GDPR & CCPA Compliance</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We comply with GDPR (European Union) and CCPA (California) regulations. You have the right to:
            </p>
            <ul className="grid md:grid-cols-2 gap-4">
              {[
                'Request access to your data',
                'Request data portability',
                'Request data deletion',
                'Opt-out of data sale (we don\'t sell)',
                'Withdraw consent anytime',
                'File complaints with authorities'
              ].map((right, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Shield className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>{right}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
