import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Address, PaymentMethod } from './types';
import client from '../api/client';

interface UserStore {
  user: User | null;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  recentlyViewed: string[];
  isLoading: boolean;
  error: string | null;
  login: (credentials: any) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  fetchAddresses: () => Promise<void>;
  addAddress: (address: Omit<Address, 'id'>) => Promise<void>;
  updateAddress: (id: string, address: Partial<Address>) => Promise<void>;
  deleteAddress: (id: string) => Promise<void>;
  fetchPaymentMethods: () => Promise<void>;
  addPaymentMethod: (method: Omit<PaymentMethod, 'id'>) => Promise<void>;
  deletePaymentMethod: (id: string) => Promise<void>;
  addToRecentlyViewed: (productId: string) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      addresses: [],
      paymentMethods: [],
      recentlyViewed: [],
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await client.post('/api/auth/login', credentials);
          const { token, user } = response.data;
          
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
          }
          
          set({ user, isLoading: false });
        } catch (error: any) {
          set({ 
            isLoading: false, 
            error: error.response?.data?.message || 'Login failed' 
          });
          throw error;
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await client.post('/api/auth/register', userData);
          const { token, user } = response.data;
          
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
          }
          
          set({ user, isLoading: false });
        } catch (error: any) {
          set({ 
            isLoading: false, 
            error: error.response?.data?.message || 'Registration failed' 
          });
          throw error;
        }
      },

      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
        }
        set({ user: null, addresses: [], paymentMethods: [] });
      },

      updateUser: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await client.put('/api/users/me', userData);
          set({ user: response.data, isLoading: false });
        } catch (error: any) {
          set({ 
            isLoading: false, 
            error: error.response?.data?.message || 'Profile update failed' 
          });
          throw error;
        }
      },

      fetchAddresses: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await client.get('/api/users/me/addresses');
          set({ addresses: response.data, isLoading: false });
        } catch (error: any) {
          set({ isLoading: false, error: error.message });
        }
      },

      addAddress: async (address) => {
        set({ isLoading: true, error: null });
        try {
          const response = await client.post('/api/users/me/addresses', address);
          set((state) => ({
            addresses: [...state.addresses, response.data],
            isLoading: false
          }));
        } catch (error: any) {
          set({ isLoading: false, error: error.message });
        }
      },

      updateAddress: async (id, addressData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await client.put(`/api/users/me/addresses/${id}`, addressData);
          set((state) => ({
            addresses: state.addresses.map((addr) =>
              addr.id === id ? response.data : addr
            ),
            isLoading: false
          }));
        } catch (error: any) {
          set({ isLoading: false, error: error.message });
        }
      },

      deleteAddress: async (id) => {
        set({ isLoading: true, error: null });
        try {
          await client.delete(`/api/users/me/addresses/${id}`);
          set((state) => ({
            addresses: state.addresses.filter((addr) => addr.id !== id),
            isLoading: false
          }));
        } catch (error: any) {
          set({ isLoading: false, error: error.message });
        }
      },

      fetchPaymentMethods: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await client.get('/api/users/me/payment-methods');
          set({ paymentMethods: response.data, isLoading: false });
        } catch (error: any) {
          set({ isLoading: false, error: error.message });
        }
      },

      addPaymentMethod: async (method) => {
        set({ isLoading: true, error: null });
        try {
          const response = await client.post('/api/users/me/payment-methods', method);
          set((state) => ({
            paymentMethods: [...state.paymentMethods, response.data],
            isLoading: false
          }));
        } catch (error: any) {
          set({ isLoading: false, error: error.message });
        }
      },

      deletePaymentMethod: async (id) => {
        set({ isLoading: true, error: null });
        try {
          await client.delete(`/api/users/me/payment-methods/${id}`);
          set((state) => ({
            paymentMethods: state.paymentMethods.filter((method) => method.id !== id),
            isLoading: false
          }));
        } catch (error: any) {
          set({ isLoading: false, error: error.message });
        }
      },

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
      partialize: (state) => ({ 
        user: state.user, 
        // addresses and paymentMethods are now fetched from API, so maybe don't persist them?
        // But keeping them for offline support/faster load is fine if we sync on mount.
        // Let's keep them for now.
        addresses: state.addresses,
        paymentMethods: state.paymentMethods,
        recentlyViewed: state.recentlyViewed 
      }),
    }
  )
);

