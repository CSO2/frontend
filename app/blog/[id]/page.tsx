'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
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

export default function BlogPost() {
  const params = useParams();
  const postId = params?.id as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;
      setIsLoading(true);
      try {
        const response = await client.get(`/api/content/blog/id/${postId}`);
        setPost(response.data);
        
        // Fetch related posts (for now just fetch all and filter, ideally backend should support this)
        const allPostsResponse = await client.get('/api/content/blog');
        const allPosts = allPostsResponse.data as BlogPost[];
        setRelatedPosts(allPosts.filter(p => p.id !== postId).slice(0, 3));
      } catch (err) {
        console.error('Failed to fetch blog post:', err);
        setError('Failed to load blog post');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <h1 className="text-3xl font-bold mb-4">Post not found</h1>
        <Link href="/blog" className="text-orange-600 hover:text-orange-700 font-semibold">
          Back to Blog
        </Link>
      </div>
    );
  }

  const readTime = Math.ceil(post.content.length / 1000) + ' min read'; // Rough estimate

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link href="/blog" className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-500 hover:text-orange-700 dark:hover:text-orange-400 font-semibold mb-8 transition">
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-block px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 font-semibold text-sm mb-4">
            {post.category}
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">{post.title}</h1>
          <div className="flex flex-wrap gap-6 text-gray-600 dark:text-gray-400 mb-8">
            <div className="flex items-center gap-2"><User className="w-5 h-5" /> <span>{post.author}</span></div>
            <div className="flex items-center gap-2"><Calendar className="w-5 h-5" /> <span>{new Date(post.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span></div>
            <div className="flex items-center gap-2"><Clock className="w-5 h-5" /> <span>{readTime}</span></div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-12">
            <article className="space-y-6 text-gray-900 dark:text-white" dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
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
                    <span>{Math.ceil(relatedPost.content.length / 1000)} min read</span>
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
