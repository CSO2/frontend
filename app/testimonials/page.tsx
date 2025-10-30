'use client';

import { motion } from 'framer-motion';
import { Quote, Star, Building2 } from 'lucide-react';

const testimonials = [
  {
    id: '1',
    name: 'Alex Thompson',
    role: 'Software Engineer',
    company: 'Tech Corp',
    rating: 5,
    text: "CS02 helped me build the perfect workstation. The BuilderBot recommendations were spot-on, and the compatibility checker saved me from making costly mistakes. Best PC buying experience I've ever had!",
    avatar: 'AT'
  },
  {
    id: '2',
    name: 'Maria Garcia',
    role: 'Professional Gamer',
    company: 'Esports Team',
    rating: 5,
    text: "As a competitive gamer, I need the best hardware. CS02's expert team helped me spec out a machine that gives me every advantage. The custom PC builder is incredibly intuitive!",
    avatar: 'MG'
  },
  {
    id: '3',
    name: 'James Wilson',
    role: 'Video Editor',
    company: 'Creative Studio',
    rating: 5,
    text: "I purchased a workstation for 4K video editing. The performance is outstanding, and CS02's support team was incredibly helpful throughout the entire process. Highly recommend!",
    avatar: 'JW'
  },
  {
    id: '4',
    name: 'Sarah Chen',
    role: ' 3D Artist',
    company: 'Animation Studio',
    rating: 5,
    text: "The pre-built workstations are powerful and reliable. My rendering times have been cut in half! CS02 truly understands what professionals need.",
    avatar: 'SC'
  },
  {
    id: '5',
    name: 'Michael Brown',
    role: 'Streamer',
    company: 'Content Creator',
    rating: 5,
    text: "My streaming PC from CS02 handles everything I throw at it. Gaming at max settings while streaming? No problem. The RGB setup is gorgeous too!",
    avatar: 'MB'
  },
  {
    id: '6',
    name: 'Emma Davis',
    role: 'Student',
    company: 'University',
    rating: 5,
    text: "Built my first gaming PC with CS02's help. The step-by-step builder made it easy, and I stayed within my budget. Couldn't be happier with the results!",
    avatar: 'ED'
  }
];

export default function Testimonials() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-4">
            Customer Stories
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it. Hear what our customers have to say about their CS02 experience.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
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
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-6 text-center"
            >
              <p className="text-4xl font-bold text-orange-600 dark:text-orange-500 mb-2">
                {stat.value}
              </p>
              <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 p-8 hover:border-orange-500 transition"
            >
              {/* Quote Icon */}
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 mb-6">
                <Quote className="w-6 h-6 text-orange-600 dark:text-orange-500" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-600 to-orange-500 flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    {testimonial.company}
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
          className="mt-16 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-3xl border-2 border-orange-200 dark:border-orange-800 p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Build Your Dream PC?
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who've built their perfect system with CS02. Start your journey today!
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/pc-builder"
              className="px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition"
            >
              Start Building
            </a>
            <a
              href="/builder-quiz"
              className="px-8 py-4 border-2 border-orange-600 text-orange-600 dark:text-orange-500 rounded-xl font-bold text-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition"
            >
              Take the Quiz
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
