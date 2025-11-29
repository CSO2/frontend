import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import client from '../api/client';

interface WishlistStore {
  items: string[]; // Product IDs
  isLoading: boolean;
  error: string | null;
  fetchWishlist: () => Promise<void>;
  addItem: (productId: string) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  toggleItem: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      error: null,

      fetchWishlist: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await client.get('/api/wishlist');
          // Assuming backend returns { items: [{productId: string}] }
          const productIds = response.data.items ? response.data.items.map((item: any) => item.productId || item) : [];
          set({ items: productIds, isLoading: false });
        } catch (error: any) {
          set({ isLoading: false, error: error.message });
        }
      },

      addItem: async (productId) => {
        const state = get();
        // If already in wishlist, don't add again
        if (state.items.includes(productId)) {
          return;
        }
        set({ isLoading: true, error: null });
        try {
          // Backend uses toggle pattern: POST /api/wishlist/{productId}
          await client.post(`/api/wishlist/${productId}`);
          set((state) => ({
            items: [...state.items, productId],
            isLoading: false
          }));
        } catch (error: any) {
          set({ isLoading: false, error: error.message });
        }
      },

      removeItem: async (productId) => {
        set({ isLoading: true, error: null });
        try {
          // Backend uses toggle pattern: POST /api/wishlist/{productId}
          await client.post(`/api/wishlist/${productId}`);
          set((state) => ({
            items: state.items.filter((id) => id !== productId),
            isLoading: false
          }));
        } catch (error: any) {
          set({ isLoading: false, error: error.message });
        }
      },

      toggleItem: async (productId) => {
        set({ isLoading: true, error: null });
        try {
          await client.post(`/api/wishlist/${productId}`);
          set((state) => ({
            items: state.items.includes(productId)
              ? state.items.filter((id) => id !== productId)
              : [...state.items, productId],
            isLoading: false
          }));
        } catch (error: any) {
          set({ isLoading: false, error: error.message });
        }
      },

      isInWishlist: (productId) => {
        const state = get();
        return state.items.includes(productId);
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'wishlist-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
);

