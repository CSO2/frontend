'use client';

import { motion } from 'framer-motion';
import { useProductStore } from '@/lib/store/productStore';
import { useCartStore } from '@/lib/store/cartStore';
import { useWishlistStore } from '@/lib/store/wishlistStore';
import { useUserStore } from '@/lib/store/userStore';
import { ShoppingCart, Heart, Star, Check, AlertCircle } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ProductDetailsPage() {
  const params = useParams<{ id: string }>();
  const paramValue = params?.id;
  const productId = Array.isArray(paramValue) ? paramValue[0] : paramValue;

  const { 
    selectedProduct, 
    fetchProductById, 
    isLoading, 
    fetchReviewsByProductId, 
    fetchRelatedProducts,
    currentProductReviews,
    relatedProducts: storeRelatedProducts,
    addReview
  } = useProductStore();
  
  useEffect(() => {
    if (productId) {
      fetchProductById(productId);
      fetchReviewsByProductId(productId);
      fetchRelatedProducts(productId);
    }
  }, [productId, fetchProductById, fetchReviewsByProductId, fetchRelatedProducts]);

  const product = selectedProduct;
  
  const reviews = currentProductReviews;
  const relatedProducts = storeRelatedProducts;
  const addToCart = useCartStore((state) => state.addItem);
  const canAddToCart = useCartStore((state) => state.canAddToCart);
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);
  const wishlistChecker = useWishlistStore((state) => state.isInWishlist);
  const isInWishlist = productId ? wishlistChecker(productId) : false;
  const addToRecentlyViewed = useUserStore((state) => state.addToRecentlyViewed);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews'>('specs');
  const [reviewForm, setReviewForm] = useState({ rating: 5, title: '', comment: '' });

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product.id);
    }
  }, [product, addToRecentlyViewed]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 py-12 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-wso2-orange"></div>
      </div>
    );
  }

  if (!productId || !product) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Product not found
            </h2>
            <Link href="/" className="text-wso2-orange hover:underline">
              Return to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (canAddToCart(product, quantity)) {
      addToCart(product, quantity);
    }
  };

  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : product.rating || 0;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-wso2-orange">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/components" className="hover:text-wso2-orange">{product.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white">{product.name}</span>
        </div>

        {/* Product Main Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder-product.png';
                }}
              />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase mb-2">
              {product.brand}
            </p>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-yellow-400 text-lg">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(avgRating) ? 'fill-current' : ''}`}
                  />
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-400">
                {avgRating.toFixed(1)} ({reviews.length} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-5xl font-bold text-wso2-orange">
                LKR {product.price.toLocaleString()}
              </span>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.stockLevel === 0 ? (
                <div className="flex items-center gap-2 text-red-500">
                  <AlertCircle className="h-5 w-5" />
                  <span className="font-semibold">Out of Stock</span>
                </div>
              ) : product.stockLevel < 10 ? (
                <div className="flex items-center gap-2 text-orange-500">
                  <AlertCircle className="h-5 w-5" />
                  <span className="font-semibold">Only {product.stockLevel} left in stock!</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-green-500">
                  <Check className="h-5 w-5" />
                  <span className="font-semibold">In Stock</span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity & Add to Cart */}
            {product.stockLevel > 0 && (
              <div className="flex gap-4 mb-6">
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-6 py-3 border-x border-gray-300 dark:border-gray-600 font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockLevel, quantity + 1))}
                    className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    +
                  </button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="flex-1 bg-wso2-orange text-white py-3 rounded-lg font-semibold hover:bg-wso2-orange-dark transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </motion.button>
              </div>
            )}

            {product.stockLevel === 0 && (
              <button
                disabled
                className="w-full bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 py-3 rounded-lg font-semibold cursor-not-allowed mb-6"
              >
                Out of Stock
              </button>
            )}

            {/* Wishlist Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleWishlist(product.id)}
              className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                isInWishlist
                  ? 'bg-red-50 dark:bg-red-900/20 text-red-500 border-2 border-red-500'
                  : 'border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-wso2-orange dark:hover:border-wso2-orange'
              }`}
            >
              <Heart className="h-5 w-5" fill={isInWishlist ? 'currentColor' : 'none'} />
              {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </motion.button>
          </motion.div>
        </div>

        {/* Tabs Section */}
        <div className="mb-16">
          <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-4 font-semibold transition-colors ${
                  activeTab === 'specs'
                    ? 'text-wso2-orange border-b-2 border-wso2-orange'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Detailed Specs
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-4 font-semibold transition-colors ${
                  activeTab === 'reviews'
                    ? 'text-wso2-orange border-b-2 border-wso2-orange'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Reviews ({reviews.length})
              </button>
            </div>
          </div>

          {activeTab === 'specs' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Technical Specifications
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700"
                  >
                    <span className="font-semibold text-gray-700 dark:text-gray-300 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'reviews' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-6">
                {/* Write a Review Section */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Write a Review</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                            className={`text-2xl ${star <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                      <input
                        type="text"
                        value={reviewForm.title}
                        onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="Summarize your experience"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Review</label>
                      <textarea
                        value={reviewForm.comment}
                        onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white h-32"
                        placeholder="Tell us what you liked or disliked"
                      />
                    </div>
                    <button
                      onClick={async () => {
                        if (!reviewForm.title || !reviewForm.comment) return;
                        await addReview({
                          id: Date.now().toString(), // Temporary ID generation
                          productId: product.id,
                          userId: 'current-user-id', // Should get from userStore
                          userName: 'Current User', // Should get from userStore
                          rating: reviewForm.rating,
                          title: reviewForm.title,
                          comment: reviewForm.comment,
                          createdAt: new Date().toISOString(),
                          verified: true,
                          helpful: 0
                        });
                        setReviewForm({ rating: 5, title: '', comment: '' });
                      }}
                      className="px-6 py-2 bg-wso2-orange text-white rounded-lg font-semibold hover:bg-wso2-orange-dark transition"
                    >
                      Submit Review
                    </button>
                  </div>
                </div>

                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {review.userName}
                        </h4>
                        <div className="flex text-yellow-400 text-sm mt-1">
                          {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {review.title}
                    </h5>
                    <p className="text-gray-600 dark:text-gray-400">{review.comment}</p>
                    {review.verified && (
                      <span className="inline-block mt-3 text-xs bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-1 rounded">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                ))}

                {reviews.length === 0 && (
                  <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400">
                      No reviews yet. Be the first to review this product!
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    <div className="aspect-square bg-gray-100 dark:bg-gray-700">
                      <img
                        src={relatedProduct.imageUrl}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder-product.png';
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-xl font-bold text-wso2-orange">
                        LKR {relatedProduct.price.toLocaleString()}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
