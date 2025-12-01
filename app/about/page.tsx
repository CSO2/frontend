'use client';

import { motion } from 'framer-motion';
import { Target, Users, Award, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
            About <span className="text-wso2-orange">CS02</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
            We&apos;re passionate about empowering enthusiasts, gamers, and professionals to build their dream PCs with premium components and expert guidance.
          </p>
        </motion.div>

        {/* Mission & Values */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-linear-to-br from-wso2-orange to-wso2-orange-dark text-white rounded-2xl p-6 md:p-8"
          >
            <Target className="h-10 w-10 md:h-12 md:w-12 mb-3 md:mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Our Mission</h2>
            <p className="text-base md:text-lg leading-relaxed opacity-90">
              To make custom PC building accessible to everyone by providing top-quality components, 
              innovative AI-powered tools, and unparalleled customer support.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-700"
          >
            <Award className="h-10 w-10 md:h-12 md:w-12 text-wso2-orange mb-3 md:mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">Our Values</h2>
            <ul className="space-y-2 md:space-y-3 text-gray-600 dark:text-gray-400 text-sm md:text-base">
              <li className="flex items-start gap-2">
                <span className="text-wso2-orange mt-1">✓</span>
                <span>Quality first - Only the best brands and components</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-wso2-orange mt-1">✓</span>
                <span>Customer success - Your satisfaction is our priority</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-wso2-orange mt-1">✓</span>
                <span>Innovation - Leveraging AI to simplify PC building</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-wso2-orange mt-1">✓</span>
                <span>Community - Building a supportive enthusiast community</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16"
        >
          {[
            { icon: Users, value: '10K+', label: 'Happy Customers' },
            { icon: Zap, value: '500+', label: 'Products' },
            { icon: Award, value: '98%', label: 'Satisfaction Rate' },
            { icon: Target, value: '5 Years', label: 'In Business' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 text-center border border-gray-200 dark:border-gray-700"
            >
              <stat.icon className="h-6 w-6 md:h-8 md:w-8 text-wso2-orange mx-auto mb-2 md:mb-3" />
              <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-12 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">Our Story</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-3 md:mb-4">
              Founded in 2020, CS02 began with a simple vision: to demystify custom PC building and make it 
              accessible to everyone, from first-time builders to seasoned enthusiasts.
            </p>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-3 md:mb-4">
              What started as a small online retailer has grown into a comprehensive platform offering not 
              just products, but also innovative tools like our AI-powered BuilderBot, extensive compatibility 
              checking, and a vibrant community of builders sharing their creations.
            </p>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Today, we&apos;re proud to serve thousands of customers with premium components, expert guidance, 
              and a commitment to excellence that sets us apart in the industry.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
