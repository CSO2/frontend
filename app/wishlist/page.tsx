'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWishlistStore } from '@/lib/store/wishlistStore';
import { useProductStore } from '@/lib/store/productStore';
import { useCartStore } from '@/lib/store/cartStore';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import Link from 'next/link';
import AnimatedButton from '../components/ui/AnimatedButton';

export default function WishlistPage() {
  const { items: wishlistItems, fetchWishlist } = useWishlistStore();
  const removeFromWishlist = useWishlistStore((state) => state.removeItem);
  const { getProductById, fetchProducts, products } = useProductStore();
  const addToCart = useCartStore((state) => state.addItem);

  useEffect(() => {
    fetchWishlist();
    if (products.length === 0) {
      fetchProducts();
    }
  }, [fetchWishlist, fetchProducts, products.length]);

  const productList = wishlistItems.map((id) => getProductById(id)).filter((p) => p !== undefined);

  const handleMoveToCart = (productId: string) => {
    const product = getProductById(productId);
    if (product && product.stockLevel > 0) {
      addToCart(product, 1);
      removeFromWishlist(productId);
    }
  };

  if (productList.length === 0) {
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
              ({productList.length} items)
            </span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productList.map((product, index) => (
              <motion.div
                key={product!.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 group"
              >
                <Link href={`/product/${product!.id}`}>
                  <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
                    <img
                      src={product!.imageUrl}
                      alt={product!.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-product.png';
                      }}
                    />
                    {product!.stockLevel === 0 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">Out of Stock</span>
                      </div>
                    )}
                  </div>
                </Link>

                <div className="p-4">
                  <Link href={`/product/${product!.id}`}>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">
                      {product!.brand}
                    </p>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 min-h-12 hover:text-wso2-orange transition-colors">
                      {product!.name}
                    </h3>
                  </Link>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-wso2-orange">
                      ${product!.price.toFixed(2)}
                    </span>
                    {product!.stockLevel > 0 && product!.stockLevel < 10 && (
                      <span className="text-xs text-red-500 font-semibold">
                        Only {product!.stockLevel} left
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {product!.stockLevel > 0 ? (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleMoveToCart(product!.id)}
                        className="flex-1 bg-wso2-orange text-white py-2 rounded-lg font-semibold hover:bg-wso2-orange-dark transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Move to Cart
                      </motion.button>
                    ) : (
                      <button
                        disabled
                        className="flex-1 bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 py-2 rounded-lg font-semibold cursor-not-allowed"
                      >
                        Out of Stock
                      </button>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFromWishlist(product!.id)}
                      className="p-2 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
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
