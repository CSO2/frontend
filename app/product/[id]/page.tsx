'use client';

import { motion } from 'framer-motion';
import { useProductStore } from '@/lib/store/productStore';
import { useCartStore } from '@/lib/store/cartStore';
import { useWishlistStore } from '@/lib/store/wishlistStore';
import { useUserStore } from '@/lib/store/userStore';
import { ShoppingCart, Heart, Star, Check, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
      <div className="min-h-screen bg-background py-12 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!productId || !product) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              Product not found
            </h2>
            <Link href="/" className="text-primary hover:underline">
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
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/components" className="hover:text-primary">{product.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        {/* Product Main Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-square bg-muted rounded-xl overflow-hidden border border-border">
              <Image
                src={product.imageUrl || '/placeholder-product.png'}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
                unoptimized
              />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm text-muted-foreground uppercase mb-2">
              {product.brand}
            </p>
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-yellow-500 text-lg">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(avgRating) ? 'fill-current' : ''}`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">
                {avgRating.toFixed(1)} ({reviews.length} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-5xl font-bold text-primary">
                LKR {product.price.toLocaleString()}
              </span>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.stockLevel === 0 ? (
                <div className="flex items-center gap-2 text-destructive">
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
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity & Add to Cart */}
            {product.stockLevel > 0 && (
              <div className="flex gap-4 mb-6">
                <div className="flex items-center border border-border rounded-lg bg-card text-card-foreground">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-muted transition-colors"
                  >
                    -
                  </button>
                  <span className="px-6 py-3 border-x border-border font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockLevel, quantity + 1))}
                    className="px-4 py-3 hover:bg-muted transition-colors"
                  >
                    +
                  </button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </motion.button>
              </div>
            )}

            {product.stockLevel === 0 && (
              <button
                disabled
                className="w-full bg-muted text-muted-foreground py-3 rounded-lg font-semibold cursor-not-allowed mb-6"
              >
                Out of Stock
              </button>
            )}

            {/* Wishlist Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleWishlist(product.id)}
              className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${isInWishlist
                  ? 'bg-destructive/10 text-destructive border-2 border-destructive'
                  : 'border-2 border-border text-foreground hover:border-primary hover:text-primary'
                }`}
            >
              <Heart className="h-5 w-5" fill={isInWishlist ? 'currentColor' : 'none'} />
              {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </motion.button>
          </motion.div>
        </div>

        {/* Tabs Section */}
        <div className="mb-16">
          <div className="border-b border-border mb-8">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-4 font-semibold transition-colors ${activeTab === 'specs'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                Detailed Specs
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-4 font-semibold transition-colors ${activeTab === 'reviews'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
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
              className="bg-card text-card-foreground rounded-xl p-8 border border-border"
            >
              <h3 className="text-2xl font-heading font-bold text-foreground mb-6">
                Technical Specifications
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between py-3 border-b border-border"
                  >
                    <span className="font-semibold text-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-muted-foreground">{value}</span>
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
                <div className="bg-muted/30 rounded-xl p-6 border border-border mb-8">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Write a Review</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                            className={`text-2xl ${star <= reviewForm.rating ? 'text-yellow-500' : 'text-muted-foreground/30'}`}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Title</label>
                      <input
                        type="text"
                        value={reviewForm.title}
                        onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-input bg-background/50 text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                        placeholder="Summarize your experience"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Review</label>
                      <textarea
                        value={reviewForm.comment}
                        onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-input bg-background/50 text-foreground h-32 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                        placeholder="Tell us what you liked or disliked"
                      />
                    </div>
                    <button
                      onClick={async () => {
                        if (!reviewForm.title || !reviewForm.comment) return;
                        await addReview({
                          id: Date.now().toString(),
                          productId: product.id,
                          userId: 'current-user-id',
                          userName: 'Current User',
                          rating: reviewForm.rating,
                          title: reviewForm.title,
                          comment: reviewForm.comment,
                          createdAt: new Date().toISOString(),
                          verified: true,
                          helpful: 0
                        });
                        setReviewForm({ rating: 5, title: '', comment: '' });
                      }}
                      className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
                    >
                      Submit Review
                    </button>
                  </div>
                </div>

                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-card text-card-foreground rounded-xl p-6 border border-border"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {review.userName}
                        </h4>
                        <div className="flex text-yellow-500 text-sm mt-1">
                          {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h5 className="font-semibold text-foreground mb-2">
                      {review.title}
                    </h5>
                    <p className="text-muted-foreground">{review.comment}</p>
                    {review.verified && (
                      <span className="inline-block mt-3 text-xs bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-1 rounded">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                ))}

                {reviews.length === 0 && (
                  <div className="text-center py-12 bg-card text-card-foreground rounded-xl border border-border">
                    <p className="text-muted-foreground">
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
            <h2 className="text-3xl font-heading font-bold text-foreground mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-card text-card-foreground rounded-xl shadow-md hover:shadow-xl transition-all border border-border overflow-hidden"
                  >
                    <div className="aspect-square bg-muted">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
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
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-xl font-bold text-primary">
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
