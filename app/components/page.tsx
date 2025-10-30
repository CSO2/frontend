'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Cpu, HardDrive, Cpu as Gpu, MemoryStick, Box, Zap, Fan, Monitor } from 'lucide-react';

export default function ComponentsPage() {
  const categories = [
    { name: 'CPUs', icon: Cpu, href: '/components/cpu', description: 'Processors from Intel and AMD' },
    { name: 'GPUs', icon: Gpu, href: '/components/gpu', description: 'Graphics cards for gaming and work' },
    { name: 'Motherboards', icon: Monitor, href: '/components/motherboard', description: 'The foundation of your build' },
    { name: 'RAM', icon: MemoryStick, href: '/components/ram', description: 'DDR4 and DDR5 memory kits' },
    { name: 'Storage', icon: HardDrive, href: '/components/storage', description: 'SSDs and HDDs' },
    { name: 'Power Supply', icon: Zap, href: '/components/psu', description: 'Reliable power for your system' },
    { name: 'Cooling', icon: Fan, href: '/components/cooler', description: 'Air and liquid cooling solutions' },
    { name: 'Cases', icon: Box, href: '/components/case', description: 'ATX, Micro-ATX, and Mini-ITX cases' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8 sm:py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            PC Components
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            Find the perfect parts for your custom build
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link href={category.href}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 shadow-md hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 group h-full"
                >
                  <div className="flex flex-col items-center text-center h-full justify-center">
                    <div className="p-3 sm:p-4 bg-wso2-orange/10 rounded-full mb-3 sm:mb-4 group-hover:bg-wso2-orange/20 transition-colors">
                      <category.icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-wso2-orange" />
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1.5 sm:mb-2">
                      {category.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      {category.description}
                    </p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
