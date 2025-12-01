'use client';

import { motion } from 'framer-motion';
import { Star, Edit2, Trash2, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import { useProductStore } from '@/lib/store/productStore';
import { useUserStore } from '@/lib/store/userStore';
import { useEffect } from 'react';

export default function ReviewsPage() {
  const { userReviews, fetchReviewsByUserId } = useProductStore();
  const { user } = useUserStore();

  useEffect(() => {
    if (user?.id) {
      fetchReviewsByUserId(user.id);
    }
  }, [fetchReviewsByUserId, user?.id]);

  const myReviews = userReviews;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Reviews</h2>

        {myReviews.length > 0 ? (
          <div className="space-y-6">
            {myReviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <Link
                      href={`/product/${review.productId}`}
                      className="text-lg font-semibold text-orange-600 dark:text-orange-500 hover:underline"
                    >
                      {/* ProductName is not in Review type, might need to fetch product or store it in review. 
                          Assuming review object might have it extended or we just show Product ID for now if name is missing.
                          Ideally Review type should be extended or we fetch product details.
                          For now using a placeholder if missing or assuming API returns it. */}
                      {(review as any).productName || 'Product Review'}
                    </Link>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      {review.verified && (
                        <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full font-semibold">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-orange-600 dark:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition">
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{review.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{review.comment}</p>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Posted on {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{review.helpful} found this helpful</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Reviews Yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Share your experience with products you&apos;ve purchased</p>
            <Link
              href="/account/orders"
              className="inline-block px-8 py-3 bg-linear-to-r from-orange-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
            >
              View Your Orders
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
