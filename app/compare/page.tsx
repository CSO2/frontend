'use client';

import { motion } from 'framer-motion';
import { useCompareStore } from '@/lib/store/compareStore';
import { useProductStore } from '@/lib/store/productStore';
import { useCartStore } from '@/lib/store/cartStore';
import { Product } from '@/lib/store/types';
import { X, ShoppingCart, Check, Minus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ComparePage() {
  const { items, removeItem, clearCompare } = useCompareStore();
  const { products } = useProductStore();
  const { addItem } = useCartStore();

  // Get full product objects from IDs
  const compareList: Product[] = items
    .map(id => products.find(p => p.id === id))
    .filter((p): p is Product => p !== undefined);

  if (compareList.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Minus className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-3xl font-bold font-heading text-foreground mb-4">
            No Products to Compare
          </h1>
          <p className="text-muted-foreground mb-8">
            Add products from product pages to compare their features
          </p>
          <Link
            href="/components"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 hover:shadow-lg transition"
          >
            Browse Components
          </Link>
        </motion.div>
      </div>
    );
  }

  // Get all unique spec keys
  const allSpecKeys: string[] = Array.from(
    new Set(
      compareList.flatMap((product: Product) => Object.keys(product.specs))
    )
  );

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold font-heading mb-4 bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
            Compare Products
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Side-by-side comparison of {compareList.length} product{compareList.length > 1 ? 's' : ''}
          </p>
          <button
            onClick={clearCompare}
            className="px-6 py-2 text-destructive border-2 border-destructive rounded-lg font-semibold hover:bg-destructive/10 transition"
          >
            Clear All
          </button>
        </motion.div>

        {/* Comparison Table */}
        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card text-card-foreground rounded-2xl shadow-xl border border-border overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-4 text-left sticky left-0 bg-card z-10">
                    <span className="text-muted-foreground font-medium">
                      Specification
                    </span>
                  </th>
                  {compareList.map((product) => (
                    <th key={product.id} className="p-4 min-w-[280px]">
                      <div className="relative">
                        <button
                          onClick={() => removeItem(product.id)}
                          className="absolute -top-2 -right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition z-20"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          width={200}
                          height={200}
                          className="w-full h-40 object-cover rounded-lg mb-3"
                        />
                        <h3 className="font-semibold text-foreground text-left mb-1">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground text-left mb-2">
                          {product.brand}
                        </p>
                        <p className="text-2xl font-bold text-primary text-left mb-3">
                          ${product.price.toLocaleString()}
                        </p>
                        <button
                          onClick={() => addItem(product, 1)}
                          className="w-full py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 hover:shadow-lg transition flex items-center justify-center gap-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Basic Info */}
                <tr className="border-b border-border bg-muted/50">
                  <td className="p-4 font-semibold text-foreground sticky left-0 bg-muted/50">
                    Category
                  </td>
                  {compareList.map((product) => (
                    <td key={product.id} className="p-4 text-muted-foreground">
                      {product.subcategory || product.category}
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-border">
                  <td className="p-4 font-semibold text-foreground sticky left-0 bg-card">
                    Stock
                  </td>
                  {compareList.map((product) => (
                    <td key={product.id} className="p-4">
                      {product.stockLevel > 0 ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold">
                          <Check className="w-4 h-4" />
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-destructive/10 text-destructive rounded-full text-sm font-semibold">
                          <X className="w-4 h-4" />
                          Out of Stock
                        </span>
                      )}
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-border bg-muted/50">
                  <td className="p-4 font-semibold text-foreground sticky left-0 bg-muted/50">
                    Rating
                  </td>
                  {compareList.map((product) => (
                    <td key={product.id} className="p-4 text-muted-foreground">
                      {product.rating ? (
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{product.rating.toFixed(1)}</span>
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm">({product.reviewCount || 0} reviews)</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground/50">No ratings</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Specifications */}
                {allSpecKeys.map((specKey: string, index: number) => (
                  <tr
                    key={specKey}
                    className={`border-b border-border ${index % 2 === 0 ? '' : 'bg-muted/50'
                      }`}
                  >
                    <td className={`p-4 font-semibold text-foreground sticky left-0 ${index % 2 === 0 ? 'bg-card' : 'bg-muted/50'
                      }`}>
                      {specKey.charAt(0).toUpperCase() + specKey.slice(1)}
                    </td>
                    {compareList.map((product: Product) => (
                      <td key={product.id} className="p-4 text-muted-foreground">
                        {product.specs[specKey] !== undefined ? (
                          <span>{product.specs[specKey]}</span>
                        ) : (
                          <span className="text-muted-foreground/50">-</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Description */}
                <tr className="bg-muted/50">
                  <td className="p-4 font-semibold text-foreground sticky left-0 bg-muted/50">
                    Description
                  </td>
                  {compareList.map((product) => (
                    <td key={product.id} className="p-4 text-sm text-muted-foreground">
                      {product.description}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Bottom Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center"
        >
          <p className="text-muted-foreground mb-4">
            You can compare up to 4 products at once
          </p>
          <Link
            href="/components"
            className="inline-block px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition"
          >
            Add More Products
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
