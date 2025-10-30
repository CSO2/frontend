'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Cpu, HardDrive, Cpu as Gpu, MemoryStick, Box, Zap, Fan, Monitor } from 'lucide-react';

export default function CategoriesSection() {
  const categories = [
    { name: 'CPUs', icon: Cpu, href: '/components/cpu', color: 'from-blue-500 to-blue-600' },
    { name: 'GPUs', icon: Gpu, href: '/components/gpu', color: 'from-green-500 to-green-600' },
    { name: 'Motherboards', icon: Monitor, href: '/components/motherboard', color: 'from-purple-500 to-purple-600' },
    { name: 'RAM', icon: MemoryStick, href: '/components/ram', color: 'from-yellow-500 to-yellow-600' },
    { name: 'Storage', icon: HardDrive, href: '/components/storage', color: 'from-red-500 to-red-600' },
    { name: 'Power Supply', icon: Zap, href: '/components/psu', color: 'from-orange-500 to-orange-600' },
    { name: 'Cooling', icon: Fan, href: '/components/cooler', color: 'from-cyan-500 to-cyan-600' },
    { name: 'Cases', icon: Box, href: '/components/case', color: 'from-pink-500 to-pink-600' },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Shop by Category
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            Find the perfect components for your build
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link href={category.href}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group overflow-hidden rounded-lg sm:rounded-xl bg-linear-to-br p-4 sm:p-5 md:p-6 h-full min-h-[120px] sm:min-h-[140px] md:min-h-40 flex flex-col items-center justify-center text-white shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                  }}
                >
                  <div className={`absolute inset-0 bg-linear-to-br ${category.color} opacity-90 group-hover:opacity-100 transition-opacity`} />
                  <div className="relative z-10 flex flex-col items-center">
                    <category.icon className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 mb-2 sm:mb-3" />
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-center">{category.name}</h3>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
