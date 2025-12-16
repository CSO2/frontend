'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/store/cartStore';
import { Trash2, Plus, Minus, ShoppingBag, Loader2 } from 'lucide-react';
import AnimatedButton from '../components/ui/AnimatedButton';
import { useEffect } from 'react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart, fetchCart, isLoading } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.15; // 15% VAT in Sri Lanka
  const total = subtotal + tax;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-12 flex justify-center items-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground mb-8">
              Add some awesome products to get started!
            </p>
            <AnimatedButton href="/" variant="primary">
              Continue Shopping
            </AnimatedButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-heading font-bold text-foreground">
              Shopping Cart
            </h1>
            <button
              onClick={clearCart}
              className="text-destructive hover:text-destructive/80 transition-colors text-sm font-medium"
            >
              Clear Cart
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-card text-card-foreground rounded-xl p-6 shadow-md border border-border"
                >
                  <div className="flex gap-6">
                    <Link href={`/product/${item.product.id}`}>
                      <Image
                        src={item.product.imageUrl || '/placeholder-product.png'}
                        alt={item.product.name}
                        width={96}
                        height={96}
                        className="object-cover rounded-lg"
                        unoptimized
                      />
                    </Link>

                    <div className="flex-1">
                      <Link href={`/product/${item.product.id}`}>
                        <h3 className="font-semibold text-foreground mb-2 hover:text-primary transition-colors">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.product.brand}
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        {`LKR ${item.product.price.toLocaleString('en-LK')}`}
                      </p>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>

                      <div className="flex items-center gap-3 bg-muted rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-background rounded transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stockLevel}
                          className="p-1 hover:bg-background rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="bg-card text-card-foreground rounded-xl p-6 shadow-md border border-border sticky top-20">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{`LKR ${subtotal.toLocaleString('en-LK')}`}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>VAT (15%)</span>
                    <span>{`LKR ${tax.toLocaleString('en-LK')}`}</span>
                  </div>
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between text-xl font-bold text-foreground">
                      <span>Total</span>
                      <span className="text-primary">{`LKR ${total.toLocaleString('en-LK')}`}</span>
                    </div>
                  </div>
                </div>

                <AnimatedButton href="/checkout" variant="primary" className="w-full">
                  Proceed to Checkout
                </AnimatedButton>

                <Link
                  href="/"
                  className="block text-center mt-4 text-primary hover:text-primary/80 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

