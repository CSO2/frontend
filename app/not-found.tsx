'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedButton from './components/ui/AnimatedButton';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-9xl font-bold text-wso2-orange mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <div className="flex gap-4 justify-center">
          <AnimatedButton href="/" variant="primary">
            Back to Home
          </AnimatedButton>
          <AnimatedButton href="/components" variant="outline">
            Browse Components
          </AnimatedButton>
        </div>
      </motion.div>
    </div>
  );
}
