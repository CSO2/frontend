'use client';

import { motion } from 'framer-motion';
import { Quote, Star, Building2 } from 'lucide-react';

import { useState, useEffect } from 'react';
import client from '@/lib/api/client';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
  avatar: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await client.get('/api/content/testimonials');
        setTestimonials(response.data);
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-linear-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-3 sm:mb-4 px-4">
            Customer Stories
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
            Don&apos;t just take our word for it. Hear what our customers have to say about their CS02 experience.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12 lg:mb-16">
          {[
            { label: 'Happy Customers', value: '50,000+' },
            { label: 'Average Rating', value: '4.9/5' },
            { label: 'Systems Built', value: '125,000+' },
            { label: 'Return Rate', value: '<1%' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-4 sm:p-6 text-center"
            >
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-500 mb-1 sm:mb-2">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-5 sm:p-6 md:p-8 hover:border-orange-500 transition flex flex-col"
            >
              {/* Quote Icon */}
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 mb-4 sm:mb-6 shrink-0">
                <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 dark:text-orange-500" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-3 sm:mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400 shrink-0" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed line-clamp-6 grow wrap-break-word overflow-hidden">
                &quot;{testimonial.text}&quot;
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700 mt-auto">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-linear-to-br from-orange-600 to-orange-500 flex items-center justify-center text-white font-bold text-sm sm:text-base shrink-0">
                  {testimonial.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-sm sm:text-base text-gray-900 dark:text-white truncate">
                    {testimonial.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                    {testimonial.role}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 flex items-center gap-1">
                    <Building2 className="w-3 h-3 shrink-0" />
                    <span className="truncate">{testimonial.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 sm:mt-12 lg:mt-16 bg-linear-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-2xl sm:rounded-3xl border-2 border-orange-200 dark:border-orange-800 p-6 sm:p-8 md:p-10 lg:p-12 text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-4">
            Ready to Build Your Dream PC?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Join thousands of satisfied customers who&apos;ve built their perfect system with CS02. Start your journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <a
              href="/pc-builder"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-orange-600 to-orange-500 text-white rounded-lg sm:rounded-xl font-bold text-base sm:text-lg hover:shadow-2xl transition"
            >
              Start Building
            </a>
            <a
              href="/builder-quiz"
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-orange-600 text-orange-600 dark:text-orange-500 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition"
            >
              Take the Quiz
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
