'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/store/types';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCartStore } from '@/lib/store/cartStore';
import { useWishlistStore } from '@/lib/store/wishlistStore';
import { useCompareStore } from '@/lib/store/compareStore';

interface ProductCardProps {
  product: Product;
  showCompare?: boolean;
}

export default function ProductCard({ product, showCompare = false }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addItem);
  const canAddToCart = useCartStore((state) => state.canAddToCart);
  const toggleWishlist = useWishlistStore((state) => state.toggleItem);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));
  const toggleCompare = useCompareStore((state) => state.isInCompare(product.id) ? state.removeItem : state.addItem);
  const isInCompare = useCompareStore((state) => state.isInCompare(product.id));

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (canAddToCart(product, 1)) {
      addToCart(product, 1);
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product.id);
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleCompare(product.id);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative bg-card rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.1)]"
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-[#F8F9FA] dark:bg-zinc-900/50">
          <Image
            src={product.imageUrl || '/placeholder-product.png'}
            alt={product.name}
            fill
            className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
            unoptimized
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.stockLevel > 0 && product.stockLevel < 10 && (
              <span className="bg-orange-500/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                Low Stock
              </span>
            )}
            {product.tags?.includes('best-seller') && (
              <span className="bg-primary/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                Best Seller
              </span>
            )}
          </div>

          {/* Quick Actions Overlay (Desktop) */}
          <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2 translate-x-4 group-hover:translate-x-0">
            <button
              onClick={handleToggleWishlist}
              className={`p-2.5 rounded-full shadow-lg backdrop-blur-md transition-all ${isInWishlist
                ? 'bg-destructive text-white'
                : 'bg-white/90 text-gray-700 hover:bg-white dark:bg-black/50 dark:text-white'
                }`}
              aria-label="Add to wishlist"
            >
              <Heart className="h-4 w-4" fill={isInWishlist ? 'currentColor' : 'none'} />
            </button>
            {showCompare && (
              <button
                onClick={handleToggleCompare}
                className={`p-2.5 rounded-full shadow-lg backdrop-blur-md transition-all ${isInCompare
                  ? 'bg-primary text-white'
                  : 'bg-white/90 text-gray-700 hover:bg-white dark:bg-black/50 dark:text-white'
                  }`}
              >
                {isInCompare ? '✓' : '+'}
              </button>
            )}
          </div>

          {product.stockLevel === 0 && (
            <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px] flex items-center justify-center">
              <span className="bg-black text-white px-4 py-2 rounded-full font-bold text-sm">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="p-5">
          <div className="mb-1">
            <span className="text-[10px] font-bold tracking-widest text-primary uppercase">
              {product.brand}
            </span>
          </div>
          <h3 className="font-heading font-semibold text-base text-foreground mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          <div className="flex items-end justify-between mt-4">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground mb-0.5">Price</span>
              <span className="text-lg font-bold text-foreground">
                LKR {product.price.toLocaleString()}
              </span>
            </div>

            {/* Small rating if available */}
            {product.rating > 0 && (
              <div className="flex items-center gap-1 text-xs font-medium bg-secondary/50 px-2 py-1 rounded-md">
                <span className="text-orange-400">★</span> {product.rating}
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="px-5 pb-5 pt-0">
        {product.stockLevel > 0 ? (
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className="w-full bg-foreground text-background dark:bg-primary dark:text-primary-foreground py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </motion.button>
        ) : (
          <button
            disabled
            className="w-full bg-muted text-muted-foreground py-2.5 rounded-xl font-bold text-sm cursor-not-allowed border border-border"
          >
            Sold Out
          </button>
        )}
      </div>
    </motion.div>
  );
}
