'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight, Tag } from 'lucide-react';
import Link from 'next/link';

const blogPosts = [
  {
    id: '1',
    title: 'AMD Ryzen 9 7950X3D Review: The Ultimate Gaming CPU',
    excerpt: "AMD's new 3D V-Cache technology takes gaming performance to unprecedented heights. We put it through its paces.",
    author: 'John Smith',
    date: '2025-10-25',
    readTime: '8 min read',
    category: 'Reviews',
    image: '/blog/ryzen.jpg',
    featured: true
  },
  {
    id: '2',
    title: 'Building Your First PC: Complete Beginner Guide 2025',
    excerpt: 'Step-by-step instructions for building a gaming PC from scratch, including tool recommendations and common mistakes to avoid.',
    author: 'Sarah Johnson',
    date: '2025-10-20',
    readTime: '12 min read',
    category: 'Guides',
    image: '/blog/build-guide.jpg',
    featured: true
  },
  {
    id: '3',
    title: 'NVIDIA RTX 5000 Series: Everything We Know So Far',
    excerpt: 'Rumors, leaks, and confirmed information about NVIDIA\'s next-generation graphics cards expected in early 2026.',
    author: 'Mike Chen',
    date: '2025-10-18',
    readTime: '6 min read',
    category: 'News',
    image: '/blog/nvidia.jpg',
    featured: false
  },
  {
    id: '4',
    title: 'DDR5 vs DDR4: Is It Time to Upgrade Your RAM?',
    excerpt: 'A detailed comparison of DDR5 and DDR4 memory, including performance benchmarks and value analysis.',
    author: 'Emily Rodriguez',
    date: '2025-10-15',
    readTime: '10 min read',
    category: 'Guides',
    image: '/blog/ram.jpg',
    featured: false
  },
  {
    id: '5',
    title: 'Best PC Cases of 2025: Airflow, Design, and Value',
    excerpt: 'Our top picks for PC cases across all price ranges, with a focus on cooling performance and aesthetics.',
    author: 'David Park',
    date: '2025-10-10',
    readTime: '15 min read',
    category: 'Buying Guides',
    image: '/blog/cases.jpg',
    featured: false
  },
  {
    id: '6',
    title: 'How Much Power Supply Do You Really Need?',
    excerpt: 'Calculate your PSU requirements accurately and learn about efficiency ratings, modular vs non-modular designs.',
    author: 'Lisa Wong',
    date: '2025-10-05',
    readTime: '7 min read',
    category: 'Guides',
    image: '/blog/psu.jpg',
    featured: false
  }
];

const categories = ['All', 'Reviews', 'Guides', 'News', 'Buying Guides', 'Tutorials'];

export default function Blog() {
  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-linear-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-4">
            Tech Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Latest news, reviews, and guides from the PC building community
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              className="px-6 py-2 rounded-full border-2 border-gray-200 dark:border-gray-700 hover:border-orange-500 transition font-semibold text-gray-700 dark:text-gray-300"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Posts */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Featured Articles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.filter(p => p.featured).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.id}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 overflow-hidden hover:border-orange-500 transition-all hover:shadow-2xl group">
                    <div className="relative h-64 bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <Tag className="w-24 h-24" />
                      </div>
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-orange-600 text-white text-sm font-semibold">
                        {post.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-orange-600 transition">
                        {post.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Posts */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Recent Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.filter(p => !p.featured).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.id}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 overflow-hidden hover:border-orange-500 transition-all group h-full">
                    <div className="relative h-48 bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <Tag className="w-16 h-16" />
                      </div>
                      <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-orange-600 text-white text-xs font-semibold">
                        {post.category}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 transition line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                        <span>{post.author}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 bg-linear-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-3xl border-2 border-orange-200 dark:border-orange-800 p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest tech news, product reviews, and exclusive deals delivered to your inbox.
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
            />
            <button className="px-6 py-3 bg-linear-to-r from-orange-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center gap-2">
              Subscribe
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
