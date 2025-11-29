'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight, Tag } from 'lucide-react';
import Link from 'next/link';

import { useState, useEffect } from 'react';
import client from '@/lib/api/client';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  publishDate: string;
  category: string;
  image: string;
  featured: boolean;
  content: string;
}

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await client.get('/api/content/blog');
        setBlogPosts(response.data);
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const categories = ['All', 'Reviews', 'Guides', 'News', 'Buying Guides', 'Tutorials'];

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
                            {new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {'5 min read'}
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
                        <span>{'5 min read'}</span>
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
