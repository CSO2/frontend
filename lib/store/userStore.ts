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
      addresses: [
        {
          id: 'addr-001',
          name: 'Home',
          street: '123 Main Street',
          city: 'Colombo',
          state: 'Western Province',
          zipCode: '00700',
          country: 'Sri Lanka',
          phone: '+94 11 234 5678',
          isDefault: true,
        },
        {
          id: 'addr-002',
          name: 'Work',
          street: '456 Tech Park, Building A',
          city: 'Kandy',
          state: 'Central Province',
          zipCode: '20000',
          country: 'Sri Lanka',
          phone: '+94 81 222 3456',
          isDefault: false,
        },
      ],
      paymentMethods: [
        {
          id: 'pm-001',
          type: 'credit',
          brand: 'Visa',
          last4: '4242',
          expiryMonth: 12,
          expiryYear: 2026,
          isDefault: true,
        },
        {
          id: 'pm-002',
          type: 'credit',
          brand: 'Mastercard',
          last4: '8888',
          expiryMonth: 6,
          expiryYear: 2027,
          isDefault: false,
        },
      ],
      recentlyViewed: ['gpu-rtx-4090', 'cpu-i9-13900k', 'mb-z790'],
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
