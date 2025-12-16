'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Cpu, HardDrive, Cpu as Gpu, MemoryStick, Box, Zap, Fan, Monitor } from 'lucide-react';

export default function CategoriesSection() {
  const categories = [
    { name: 'CPUs', icon: Cpu, href: '/components/cpu' },
    { name: 'GPUs', icon: Gpu, href: '/components/gpu' },
    { name: 'Motherboards', icon: Monitor, href: '/components/motherboard' },
    { name: 'RAM', icon: MemoryStick, href: '/components/ram' },
    { name: 'Storage', icon: HardDrive, href: '/components/storage' },
    { name: 'Power Supply', icon: Zap, href: '/components/psu' },
    { name: 'Cooling', icon: Fan, href: '/components/cooler' },
    { name: 'Cases', icon: Box, href: '/components/case' },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-3 sm:mb-4">
            Shop by Category
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Find the perfect components for your build
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <Link href={category.href}>
                <motion.div
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-card to-secondary/5 border border-primary/10 shadow-sm hover:shadow-lg hover:border-primary/50 transition-all duration-300 h-full min-h-[160px]"
                >
                  <div className="mb-4 text-primary group-hover:scale-110 transition-transform duration-300 bg-primary/10 p-4 rounded-xl">
                    <category.icon className="h-8 w-8" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
