import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from './types';

// Sample products for demo cart
const demoProducts: Product[] = [
  {
    id: 'demo-cpu-1',
    name: 'Intel Core i9-13900K',
    brand: 'Intel',
    price: 589,
    category: 'CPUs',
    stockLevel: 5,
    description: 'Premium gaming and productivity CPU',
    imageUrl: 'https://via.placeholder.com/200?text=Intel+i9',
    specs: { cores: '24 cores', socket: 'LGA1700', tdp: '125W' },
  },
  {
    id: 'demo-gpu-1',
    name: 'NVIDIA GeForce RTX 4090',
    brand: 'NVIDIA',
    price: 1599,
    category: 'GPUs',
    stockLevel: 2,
    description: 'Flagship gaming graphics card',
    imageUrl: 'https://via.placeholder.com/200?text=RTX+4090',
    specs: { vram: '24GB GDDR6X', cuda: '16384 cores', power: '450W' },
  },
];

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  canAddToCart: (product: Product, quantity: number) => boolean;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [
        { product: demoProducts[0], quantity: 1 },
        { product: demoProducts[1], quantity: 1 },
      ],
      addItem: (product, quantity = 1) =>
        set((state) => {
          // Check stock availability
          if (product.stockLevel < quantity) {
            return state; // Don't add if insufficient stock
          }

          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          );

          if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;
            // Check if new quantity exceeds stock
            if (newQuantity > product.stockLevel) {
              return state;
            }
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: newQuantity }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { product, quantity }],
          };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((item) => item.product.id !== productId),
            };
          }

          return {
            items: state.items.map((item) => {
              if (item.product.id === productId) {
                // Check stock
                if (quantity > item.product.stockLevel) {
                  return item; // Keep old quantity
                }
                return { ...item, quantity };
              }
              return item;
            }),
          };
        }),
      clearCart: () => set({ items: [] }),
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
        return product.stockLevel >= quantity;
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
