'use client';

import { motion } from 'framer-motion';
import AnimatedButton from '../ui/AnimatedButton';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-linear-to-br from-gray-100 via-white to-gray-200 dark:from-black dark:via-gray-900 dark:to-gray-800 transition-colors">
        {/* Animated gradient blobs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-wso2-orange/15 dark:bg-wso2-orange/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-wso2-orange/10 dark:bg-wso2-orange/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, -50, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-orange-400/15 dark:bg-orange-500/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"
        />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,115,0,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,115,0,0.08)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,115,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,115,0,0.05)_1px,transparent_1px)] bg-size-[50px_50px] mask-[radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)] transition-colors" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white px-4 transition-colors drop-shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{
              textShadow: '0 4px 20px rgba(0,0,0,0.3), 0 0 40px rgba(255,115,0,0.2)',
            }}
          >
            Build Your Dream.
            <br />
            <span className="text-wso2-orange" style={{ textShadow: '0 0 40px rgba(255,115,0,0.5)' }}>
              Forge Your Power.
            </span>
          </motion.h1>
          
          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto px-4 transition-colors drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{
              textShadow: '0 2px 10px rgba(0,0,0,0.3)',
            }}
          >
            Premium computer components and custom PC builds. Experience unmatched performance with CS02.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <AnimatedButton href="/builderbot" variant="primary" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
              Try the BuilderBot
            </AnimatedButton>
            <AnimatedButton href="/pre-builts" variant="outlineContrast" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
              Shop Pre-Built Rigs
            </AnimatedButton>
          </motion.div>
        </motion.div>

        {/* Floating stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 px-4"
        >
          {[
            { value: '10K+', label: 'Builds Delivered' },
            { value: '500+', label: 'Products' },
            { value: '98%', label: 'Satisfaction' },
            { value: '24/7', label: 'Support' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center backdrop-blur-md bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-wso2-orange mb-1 sm:mb-2" style={{ textShadow: '0 0 20px rgba(255,115,0,0.4)' }}>
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
