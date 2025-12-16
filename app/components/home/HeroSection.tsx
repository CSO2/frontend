'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[650px]"
      >
        {/* Left Column Group */}
        <div className="lg:col-span-2 flex flex-col gap-6 h-full">
          {/* Main Hero Banner */}
          <motion.div
            variants={itemVariants}
            className="relative group rounded-3xl overflow-hidden h-[400px] lg:h-[60%] flex-shrink-0"
          >
            <Image
              src="/images/hero/hero-setup.png"
              alt="Premium Gaming Setup"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent p-8 sm:p-12 flex flex-col justify-center text-white">
              <span className="inline-block px-3 py-1 bg-primary/20 backdrop-blur-md border border-primary/30 rounded-full text-xs sm:text-sm font-medium text-primary-foreground mb-4 w-fit">
                New Arrival
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4 leading-tight">
                Ultimate Gaming <br /> Experience
              </h1>
              <p className="text-gray-200 mb-8 max-w-md text-sm sm:text-base">
                Discover our premium collection of custom builds and high-performance components designed for the modern gamer.
              </p>
              <Link
                href="/pre-builts"
                className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors w-fit"
              >
                Shop Now <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>

          {/* Bottom Split Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-[auto] lg:h-[40%] flex-grow">
            {/* Bottom Left: Peripherals */}
            <motion.div
              variants={itemVariants}
              className="relative group rounded-3xl overflow-hidden min-h-[250px] lg:min-h-0 bg-[#F5F5F7] dark:bg-card"
            >
              <div className="absolute top-0 left-0 p-6 z-10">
                <h3 className="text-xl font-bold text-foreground mb-1">Peripherals</h3>
                <p className="text-muted-foreground text-sm">Click in style</p>
                <Link
                  href="/components"
                  className="mt-4 inline-flex items-center text-sm font-bold text-primary hover:underline"
                >
                  View Collection
                </Link>
              </div>
              <div className="absolute inset-0 flex items-center justify-end translate-y-8 translate-x-8 sm:translate-y-0 sm:translate-x-0">
                <Image
                  src="/images/hero/hero-peripherals.png"
                  alt="Gaming User Gear"
                  width={300}
                  height={300}
                  className="object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
                />
              </div>
            </motion.div>

            {/* Bottom Right: Components */}
            <motion.div
              variants={itemVariants}
              className="relative group rounded-3xl overflow-hidden min-h-[250px] lg:min-h-0 bg-[#F0F4F8] dark:bg-muted"
            >
              <div className="absolute top-0 right-0 max-w-[60%] p-6 z-10 text-right">
                <h3 className="text-xl font-bold text-foreground mb-1">Components</h3>
                <p className="text-muted-foreground text-sm">Power your dream</p>
                <Link
                  href="/components"
                  className="mt-4 inline-flex items-center text-sm font-bold text-primary hover:underline"
                >
                  Upgrade Now
                </Link>
              </div>
              <div className="absolute bottom-0 left-0 p-4">
                <Image
                  src="/images/hero/hero-gpu.png"
                  alt="High End GPU"
                  width={280}
                  height={200}
                  className="object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-2"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Column: Tall Banner */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-1 relative group rounded-3xl overflow-hidden min-h-[500px] lg:min-h-auto flex flex-col justify-end bg-[#E8E8E8] dark:bg-card"
        >
          <Image
            src="/images/hero/hero-case.png"
            alt="Sleek PC Case"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          <div className="relative z-10 p-8 text-white">
            <span className="text-orange-400 font-bold text-sm tracking-wider uppercase mb-2 block">
              Limited Edition
            </span>
            <h2 className="text-3xl font-heading font-bold mb-3">
              Compact & <br /> Powerful
            </h2>
            <p className="text-gray-300 mb-6 text-sm">
              Discover the new era of ITX builds. Small footprint, massive performance.
            </p>
            <Link
              href="/pc-builder"
              className="inline-block w-full text-center bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-primary/20"
            >
              Start Building
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
