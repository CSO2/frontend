'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Product } from '@/lib/store/types';
import { ShoppingCart, Heart } from 'lucide-react';
import { useAddToCart } from '@/lib/hooks/useCart';
import { useAddToWishlist, useRemoveFromWishlist, useWishlist } from '@/lib/hooks/useWishlist';
import { useCompareStore } from '@/lib/store/compareStore';

interface ProductCardProps {
  product: Product;
  showCompare?: boolean;
}

export default function ProductCard({ product, showCompare = false }: ProductCardProps) {
  const addToCart = useAddToCart();
  const addToWishlist = useAddToWishlist();
  const removeFromWishlist = useRemoveFromWishlist();
  const { data: wishlistItems = [] } = useWishlist();
  const toggleCompare = useCompareStore((state) => state.isInCompare(product.id) ? state.removeItem : state.addItem);
  const isInCompare = useCompareStore((state) => state.isInCompare(product.id));
  
  const isInWishlist = wishlistItems.some((item) => item.productId === parseInt(product.id));

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const productId = parseInt(product.id);
    if (!isNaN(productId) && product.stockLevel > 0) {
      addToCart.mutate({ productId, quantity: 1 });
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    const productId = parseInt(product.id);
    if (!isNaN(productId)) {
      if (isInWishlist) {
        removeFromWishlist.mutate(productId);
      } else {
        addToWishlist.mutate(productId);
      }
    }
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleCompare(product.id);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-product.png';
            }}
          />
          {product.stockLevel === 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
          {product.stockLevel > 0 && product.stockLevel < 10 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
              Only {product.stockLevel} left!
            </div>
          )}
          {product.tags?.includes('best-seller') && (
            <div className="absolute top-2 right-2 bg-wso2-orange text-white px-2 py-1 rounded text-xs font-semibold">
              Best Seller
            </div>
          )}
        </div>

        <div className="p-3 sm:p-4">
          <div className="mb-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">
              {product.brand}
            </span>
          </div>
          <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white mb-2 line-clamp-2 h-10 sm:h-12">
            {product.name}
          </h3>
          
          {product.rating && (
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400 text-sm sm:text-base">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                ({product.reviewCount})
              </span>
            </div>
          )}

          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <span className="text-xl sm:text-2xl font-bold text-wso2-orange">
              LKR {product.price.toLocaleString()}
            </span>
          </div>
        </div>
      </Link>

      <div className="px-3 sm:px-4 pb-3 sm:pb-4 flex gap-2">
        {product.stockLevel > 0 ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className="flex-1 bg-wso2-orange text-white py-2 rounded-lg font-semibold hover:bg-wso2-orange-dark transition-colors flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Add to Cart</span>
            <span className="sm:hidden">Add</span>
          </motion.button>
        ) : (
          <button
            disabled
            className="flex-1 bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 py-2 rounded-lg font-semibold cursor-not-allowed text-sm sm:text-base"
          >
            <span className="hidden sm:inline">Out of Stock</span>
            <span className="sm:hidden">Sold Out</span>
          </button>
        )}
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleToggleWishlist}
          className={`p-2 rounded-lg transition-colors ${
            isInWishlist
              ? 'bg-red-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
          aria-label="Add to wishlist"
        >
          <Heart className="h-5 w-5" fill={isInWishlist ? 'currentColor' : 'none'} />
        </motion.button>
        
        {showCompare && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleToggleCompare}
            className={`p-2 rounded-lg transition-colors text-xs font-semibold ${
              isInCompare
                ? 'bg-wso2-orange text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {isInCompare ? '✓' : '+'}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
