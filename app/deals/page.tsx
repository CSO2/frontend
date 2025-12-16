'use client';

import { motion } from 'framer-motion';
import { Tag, Clock, Percent, Package } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { useProductStore } from '@/lib/store/productStore';
import { useEffect } from 'react';

export default function DealsPage() {
  const { deals, bundles, fetchDeals, fetchBundles } = useProductStore();

  useEffect(() => {
    fetchDeals();
    fetchBundles();
  }, [fetchDeals, fetchBundles]);

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold font-heading mb-4 bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
            Deals & Promotions
          </h1>
          <p className="text-xl text-muted-foreground">
            Save big on top components and bundles
          </p>
        </motion.div>

        {/* Flash Deals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold font-heading text-foreground flex items-center gap-3">
              <Tag className="w-8 h-8 text-primary" />
              Flash Deals
            </h2>
            <div className="flex items-center gap-2 text-primary font-semibold">
              <Clock className="w-5 h-5" />
              <span>Limited Time Only</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deals.map((deal) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                className="bg-card text-card-foreground rounded-2xl shadow-lg border border-border p-6 relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-bold">
                  -{deal.discountPercentage}%
                </div>

                <Image
                  src={deal.imageUrl}
                  alt={deal.name}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />

                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-semibold">
                  {deal.category}
                </span>

                <h3 className="text-lg font-bold text-card-foreground mt-3 mb-2">
                  {deal.name}
                </h3>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl font-bold text-primary">
                    ${deal.salePrice}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    ${deal.price}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="text-muted-foreground">
                    Ends in {deal.saleEndDate ? new Date(deal.saleEndDate).toLocaleDateString() : 'Soon'}
                  </span>
                  <span className="text-green-600 dark:text-green-500 font-semibold">
                    {deal.stockLevel} in stock
                  </span>
                </div>

                <Link
                  href={`/product/${deal.id}`}
                  className="block w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 hover:shadow-lg transition text-center"
                >
                  View Deal
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bundle Deals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold font-heading text-foreground mb-6 flex items-center gap-3">
            <Package className="w-8 h-8 text-primary" />
            Bundle Deals
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {bundles.map((bundle) => (
              <motion.div
                key={bundle.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02 }}
                className="bg-card text-card-foreground rounded-2xl shadow-lg border-2 border-primary/20 p-8"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-card-foreground mb-2">
                      {bundle.name}
                    </h3>
                    <p className="text-muted-foreground">{bundle.description}</p>
                  </div>
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold">
                    {bundle.items} Items
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Individual Price</p>
                    <p className="text-xl text-muted-foreground line-through">
                      ${bundle.originalPrice}
                    </p>
                  </div>
                  <div className="text-4xl text-primary">→</div>
                  <div>
                    <p className="text-sm text-muted-foreground">Bundle Price</p>
                    <p className="text-3xl font-bold text-primary">
                      ${bundle.bundlePrice}
                    </p>
                  </div>
                </div>

                <div className="bg-green-100 dark:bg-green-900/30 rounded-xl p-4 mb-6">
                  <p className="text-green-800 dark:text-green-400 font-bold flex items-center gap-2">
                    <Percent className="w-5 h-5" />
                    Save ${bundle.savings} with this bundle!
                  </p>
                </div>

                <button className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 hover:shadow-lg transition">
                  Add Bundle to Cart
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
