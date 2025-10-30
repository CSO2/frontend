'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle, XCircle, Edit, Trash2, ThumbsUp } from 'lucide-react';
import { useProductStore } from '@/lib/store/productStore';
import Link from 'next/link';

export default function AdminReviews() {
  const { reviews, products } = useProductStore();
  const [statusFilter, setStatusFilter] = useState('all');

  const pendingReviews = reviews.filter(r => !r.verified);
  const approvedReviews = reviews.filter(r => r.verified);

  const filteredReviews = statusFilter === 'pending' ? pendingReviews :
                         statusFilter === 'approved' ? approvedReviews :
                         reviews;

  const getProduct = (productId: string) => products.find(p => p.id === productId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Review Moderation</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage customer reviews</p>
      </div>

      {/* Status Summary */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-yellow-100 dark:bg-yellow-900/30">
              <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending Reviews</p>
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-500">
                {pendingReviews.length}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Approved Reviews</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-500">
                {approvedReviews.length}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex gap-2">
          {['all', 'pending', 'approved'].map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-6 py-3 rounded-lg text-sm font-semibold transition ${
                statusFilter === filter
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => {
          const product = getProduct(review.productId);
          return (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Link
                      href={`/product/${product?.id}`}
                      className="font-semibold text-orange-600 dark:text-orange-500 hover:underline"
                    >
                      {product?.name}
                    </Link>
                    {review.verified && (
                      <span className="px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      by {review.userName}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{review.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>

                  <div className="flex items-center gap-2 mt-3">
                    <ThumbsUp className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {review.helpful} people found this helpful
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  {!review.verified && (
                    <button className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                  )}
                  <button className="px-4 py-2 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700 transition flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition flex items-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
