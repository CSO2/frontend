'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowLeft, Share2, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import client from '@/lib/api/client';

const blogPosts = [
  {
    id: '1',
    title: 'AMD Ryzen 9 7950X3D Review: The Ultimate Gaming CPU',
    excerpt: "AMD's new 3D V-Cache technology takes gaming performance to unprecedented heights. We put it through its paces.",
    author: 'John Smith',
    date: '2025-10-25',
    readTime: '8 min read',
    category: 'Reviews',
    content: `
      <p>AMD's latest flagship processor, the Ryzen 9 7950X3D, represents a significant leap in gaming performance. The addition of their innovative 3D V-Cache technology has allowed them to create what may be the fastest gaming CPU on the market today.</p>
      
      <h2>Performance Metrics</h2>
      <p>In our testing, we found that the 7950X3D outperforms the previous generation by up to 25% in gaming workloads. The 3D V-Cache adds an additional 96MB of cache, which significantly improves performance in cache-sensitive applications.</p>
      
      <h2>Power Consumption</h2>
      <p>Despite its impressive performance, the chip remains relatively power-efficient, with a TDP of 162W. This makes it a practical choice for high-end builds without requiring excessive cooling solutions.</p>
      
      <h2>Verdict</h2>
      <p>The Ryzen 9 7950X3D is an excellent choice for gamers and content creators who need top-tier performance. While it comes with a premium price tag, the performance improvements justify the investment for those building high-end systems.</p>
    `
  },
  {
    id: '2',
    title: 'Building Your First PC: Complete Beginner Guide 2025',
    excerpt: 'Step-by-step instructions for building a gaming PC from scratch, including tool recommendations and common mistakes to avoid.',
    author: 'Sarah Johnson',
    date: '2025-10-20',
    readTime: '12 min read',
    category: 'Guides',
    content: `
      <p>Building your first PC can seem intimidating, but with the right guidance and tools, anyone can do it. In this comprehensive guide, we'll walk you through every step of the process.</p>
      
      <h2>Tools You'll Need</h2>
      <p>Before you begin, gather the following tools: a Phillips screwdriver (non-magnetic preferred), an anti-static wrist strap, and a clean, well-lit workspace.</p>
      
      <h2>Step-by-Step Build Process</h2>
      <p>Start by installing the power supply, then the motherboard standoffs. Next, install the CPU and RAM into the motherboard before placing it in the case. Install storage drives, connect all power cables, and finally install the cooler.</p>
      
      <h2>Common Mistakes to Avoid</h2>
      <p>Don't forget the I/O shield, avoid over-tightening screws, and always check power connections twice. Make sure your CPU cooler is properly secured and making good contact with the processor.</p>
    `
  },
  {
    id: '3',
    title: 'NVIDIA RTX 5000 Series: Everything We Know So Far',
    excerpt: 'Rumors, leaks, and confirmed information about NVIDIA\'s next-generation graphics cards expected in early 2026.',
    author: 'Mike Chen',
    date: '2025-10-18',
// Blog post will be loaded via API
export default function BlogPost() {
  const params = useParams();
  const postId = params.id as string;
  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await client.get(`/api/content/blog/${postId}`);
        setPost(response.data);
        // Also fetch related posts (all posts and filter out current)
        try {
          const allResp = await client.get('/api/content/blog');
          setRelatedPosts(allResp.data.filter((p: any) => p.slug !== postId));
        } catch (allErr) {
          console.warn('Failed to fetch related posts', allErr);
        }
      } catch (err: any) {
        console.error('Failed to fetch post', err);
        setError('Unable to load blog post');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  if (error || !post) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">{error || 'Post not found'}</div>;
  }
      
      <h2>Expected Release Timeline</h2>
      <p>Based on NVIDIA's typical release schedule, we expect to see announcements in January 2026 with availability beginning in March of that year.</p>
      
      <h2>Architecture Changes</h2>
      <p>The new series is expected to feature improved ray tracing performance and enhanced DLSS 4 support with better upscaling capabilities.</p>
      
      <h2>Performance Expectations</h2>
      <p>Early reports suggest that the RTX 5090 could deliver up to 50% performance improvement over the current RTX 4090, making it a significant generational upgrade.</p>
    `
  },
];

export default function BlogPost() {
  const params = useParams();
  const postId = params.id as string;
  const post = blogPosts.find(p => p.id === postId) || blogPosts[0];

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
            {post.category}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link href="/blog" className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-500 hover:text-orange-700 dark:hover:text-orange-400 font-semibold mb-8 transition">
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
              <span>{new Date(post.date || post.publishedAt).toLocaleDateString('en-US', { 
        >
          <div className="inline-block px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 font-semibold text-sm mb-4">
            {post.category}
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-gray-600 dark:text-gray-400 mb-8">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full h-96 bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl mb-12 flex items-center justify-center"
        >
          <div className="text-gray-400 text-center">
            <div className="text-6xl mb-4">📰</div>
            <p className="text-xl font-semibold">Featured Image</p>
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg dark:prose-invert max-w-none mb-12"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-12">
            <article className="space-y-6 text-gray-900 dark:text-white">
              {post.content.split('<h2>').map((section, idx) => {
                if (idx === 0) {
                  return (
                    <div key={idx} className="space-y-4">
                      {section.split('<p>').map((p, pIdx) => 
                        p.trim() ? (
                          <p key={pIdx} className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                            {p.replace('</p>', '').trim()}
                          </p>
                        ) : null
                      )}
                    </div>
                  );
                }
                
                const [title, ...content] = section.split('</h2>');
                return (
                  <div key={idx}>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                      {title.trim()}
                    </h2>
                    {content.join('</h2>').split('<p>').map((p, pIdx) =>
                      p.trim() ? (
                        <p key={pIdx} className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                          {p.replace('</p>', '').trim()}
                        </p>
                      ) : null
                    )}
                  </div>
                );
              })}
            </article>
          </div>
        </motion.div>

        {/* Article Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 flex flex-wrap gap-4 items-center justify-between"
        >
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-orange-500 text-orange-600 dark:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition font-semibold">
              <ThumbsUp className="w-5 h-5" />
              Helpful
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-orange-500 transition font-semibold">
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Updated on {new Date(post.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </motion.div>

        {/* Related Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.slice(0, 3).map((relatedPost) => (
              <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:border-orange-500 transition h-full">
                  <div className="text-sm font-semibold text-orange-600 dark:text-orange-500 mb-2">
                    {relatedPost.category}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                    {relatedPost.excerpt}
                  </p>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500">
                    <span>{relatedPost.author}</span>
                    <span>{relatedPost.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
