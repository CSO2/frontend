import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Address, PaymentMethod } from './types';

interface UserStore {
  user: User | null;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  recentlyViewed: string[];
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  addAddress: (address: Address) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  addPaymentMethod: (method: PaymentMethod) => void;
  deletePaymentMethod: (id: string) => void;
  addToRecentlyViewed: (productId: string) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: {
        id: 'demo-customer-001',
        name: 'Demo User',
        email: 'demo@cs02.lk',
        loyaltyPoints: 2500,
        tier: 'gold',
      },
      addresses: [],
      paymentMethods: [],
      recentlyViewed: [],
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
      addAddress: (address) =>
        set((state) => ({
          addresses: [...state.addresses, address],
        })),
      updateAddress: (id, addressData) =>
        set((state) => ({
          addresses: state.addresses.map((addr) =>
            addr.id === id ? { ...addr, ...addressData } : addr
          ),
        })),
      deleteAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.filter((addr) => addr.id !== id),
        })),
      addPaymentMethod: (method) =>
        set((state) => ({
          paymentMethods: [...state.paymentMethods, method],
        })),
      deletePaymentMethod: (id) =>
        set((state) => ({
          paymentMethods: state.paymentMethods.filter((method) => method.id !== id),
        })),
      addToRecentlyViewed: (productId) =>
        set((state) => {
          const filtered = state.recentlyViewed.filter((id) => id !== productId);
          return {
            recentlyViewed: [productId, ...filtered].slice(0, 10),
          };
        }),
    }),
    {
      name: 'user-storage',
    }
  )
);
