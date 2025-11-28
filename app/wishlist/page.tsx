'use client';

import { motion } from 'framer-motion';
import { useWishlist, useRemoveFromWishlist } from '@/lib/hooks/useWishlist';
import { wishlistApi } from '@/lib/api/wishlist';
import { Heart, ShoppingCart, Trash2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import AnimatedButton from '../components/ui/AnimatedButton';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/hooks/useProducts';
import toast from 'react-hot-toast';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function WishlistPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const { data: wishlistItems = [], isLoading, error } = useWishlist();
  const removeFromWishlist = useRemoveFromWishlist();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast.error('Please login to view your wishlist');
      router.push('/login?redirect=/wishlist');
    }
  }, [isAuthenticated, authLoading, router]);

  const handleMoveToCart = async (productId: number) => {
    try {
      await wishlistApi.moveToCart(productId);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.wishlist.all });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.cart.all });
      toast.success('Moved to cart');
    } catch (err: any) {
      toast.error(err.message || 'Failed to move to cart');
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 py-12 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-wso2-orange" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">Error loading wishlist: {error.message}</p>
            <AnimatedButton href="/" variant="primary">
              Continue Shopping
            </AnimatedButton>
          </div>
        </div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <Heart className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Save your favorite items for later!
            </p>
            <AnimatedButton href="/" variant="primary">
              Start Shopping
            </AnimatedButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            My Wishlist
            <span className="text-gray-500 dark:text-gray-400 text-2xl ml-4">
              ({wishlistItems.length} items)
            </span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 group"
              >
                <Link href={`/product/${item.productId}`}>
                  <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-product.png';
                      }}
                    />
                  </div>
                </Link>

                <div className="p-4">
                  <Link href={`/product/${item.productId}`}>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 min-h-12 hover:text-wso2-orange transition-colors">
                      {item.productName}
                    </h3>
                  </Link>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-wso2-orange">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleMoveToCart(item.productId)}
                      disabled={removeFromWishlist.isPending}
                      className="flex-1 bg-wso2-orange text-white py-2 rounded-lg font-semibold hover:bg-wso2-orange-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Move to Cart
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFromWishlist.mutate(item.productId)}
                      disabled={removeFromWishlist.isPending}
                      className="p-2 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
