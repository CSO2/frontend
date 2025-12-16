'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Cpu,
  HardDrive,
  Cpu as Gpu,
  MemoryStick,
  Box,
  Zap,
  Fan,
  Monitor,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useRef } from 'react';

export default function CategoriesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories = [
    {
      name: 'CPUs',
      description: 'The brain of your computer. Handle complex tasks with ease.',
      icon: Cpu,
      href: '/components/cpu'
    },
    {
      name: 'GPUs',
      description: 'Immersive graphics for gaming and professional rendering.',
      icon: Gpu,
      href: '/components/gpu'
    },
    {
      name: 'Motherboards',
      description: 'The foundation connecting all your components together.',
      icon: Monitor,
      href: '/components/motherboard'
    },
    {
      name: 'RAM',
      description: 'High-speed memory for seamless multitasking.',
      icon: MemoryStick,
      href: '/components/ram'
    },
    {
      name: 'Storage',
      description: 'Secure and fast storage for all your data needs.',
      icon: HardDrive,
      href: '/components/storage'
    },
    {
      name: 'Power Supply',
      description: 'Reliable power delivery for stable system performance.',
      icon: Zap,
      href: '/components/psu'
    },
    {
      name: 'Cooling',
      description: 'Keep your temperatures low and performance high.',
      icon: Fan,
      href: '/components/cooler'
    },
    {
      name: 'Cases',
      description: 'Stylish protection for your high-performance build.',
      icon: Box,
      href: '/components/case'
    },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8 sm:mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-3 sm:mb-4">
              Shop by Category
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Find the perfect components for your build
            </p>
          </motion.div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full border border-border bg-background hover:bg-muted transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full border border-border bg-background hover:bg-muted transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 sm:gap-6 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="min-w-[280px] sm:min-w-[350px] md:min-w-[400px] snap-start"
            >
              <Link href={category.href} className="block h-full">
                <motion.div
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative h-full flex items-center justify-between p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-secondary/30 to-background border border-border hover:border-primary/50 hover:from-secondary/50 hover:to-background transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute -right-4 -bottom-4 text-primary/5 rotate-12 transform group-hover:scale-110 group-hover:text-primary/10 transition-all duration-500">
                    <category.icon className="w-32 h-32" strokeWidth={1} />
                  </div>

                  <div className="relative z-10 flex-1 pr-4">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                  <div className="relative z-10 flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-xl bg-background/80 backdrop-blur-sm shadow-sm group-hover:scale-105 transition-transform duration-300 border border-primary/10">
                    <category.icon className="h-8 w-8 sm:h-10 sm:w-10 text-primary" strokeWidth={1.5} />
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
