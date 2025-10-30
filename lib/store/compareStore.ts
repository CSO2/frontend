import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CompareStore {
  items: string[]; // Product IDs
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (productId) =>
        set((state) => {
          if (state.items.includes(productId) || state.items.length >= 4) {
            return state; // Max 4 items to compare
          }
          return {
            items: [...state.items, productId],
          };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((id) => id !== productId),
        })),
      clearCompare: () => set({ items: [] }),
      isInCompare: (productId) => {
        const state = get();
        return state.items.includes(productId);
      },
    }),
    {
      name: 'compare-storage',
    }
  )
);
