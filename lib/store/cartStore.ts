import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from './types';
import client from '../api/client';

interface CartStore {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addItem: (product: Product, quantity?: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  canAddToCart: (product: Product, quantity: number) => boolean;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      error: null,

      fetchCart: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await client.get('/api/cart');
          set({ items: response.data.items || [], isLoading: false });
        } catch (error: any) {
          set({ isLoading: false, error: error.message });
        }
      },

      addItem: async (product, quantity = 1) => {
        set({ isLoading: true, error: null });
        try {
          await client.post('/api/cart/items', { productId: product.id, quantity });
          // Refresh cart after adding
          const response = await client.get('/api/cart');
          set({ items: response.data.items || [], isLoading: false });
        } catch (error: any) {
          set({ isLoading: false, error: error.message });
        }
      },

      removeItem: async (productId) => {
        set({ isLoading: true, error: null });
        try {
          await client.delete(`/api/cart/items/${productId}`);
          // Optimistic update
          set((state) => ({
            items: state.items.filter((item) => item.product.id !== productId),
            isLoading: false
          }));
        } catch (error: any) {
          set({ isLoading: false, error: error.message });
          // Revert or re-fetch on error if needed
          get().fetchCart();
        }
      },

      updateQuantity: async (productId, quantity) => {
        set({ isLoading: true, error: null });
        try {
          await client.put(`/api/cart/items/${productId}`, { quantity });
          // Optimistic update
          set((state) => ({
            items: state.items.map((item) =>
              item.product.id === productId ? { ...item, quantity } : item
            ),
            isLoading: false
          }));
        } catch (error: any) {
          set({ isLoading: false, error: error.message });
          get().fetchCart();
        }
      },

      clearCart: async () => {
        set({ isLoading: true, error: null });
        try {
          await client.delete('/api/cart/clear');
          set({ items: [], isLoading: false });
        } catch (error: any) {
          set({ isLoading: false, error: error.message });
        }
      },

      getTotalItems: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        const state = get();
        return state.items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      canAddToCart: (product, quantity) => {
        const state = get();
        const existingItem = state.items.find((item) => item.product.id === product.id);
        const currentQuantity = existingItem ? existingItem.quantity : 0;
        return currentQuantity + quantity <= product.stockLevel;
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }), // Only persist items
    }
  )
);

