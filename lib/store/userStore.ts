import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Address, PaymentMethod, Notification } from './types';
import client from '../api/client';

interface UserStore {
  user: User | null;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  notifications: Notification[];
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
  fetchNotifications: () => Promise<void>;
  markNotificationAsRead: (id: string) => Promise<void>;
  markAllNotificationsAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  addToRecentlyViewed: (productId: string) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      addresses: [],
      paymentMethods: [],
      notifications: [],
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
        set({ user: null, addresses: [], paymentMethods: [], notifications: [] });
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

      fetchNotifications: async () => {
        try {
          const response = await client.get('/api/users/me/notifications');
          set({ notifications: response.data });
        } catch (error: any) {
          console.error('Failed to fetch notifications', error);
        }
      },

      markNotificationAsRead: async (id) => {
        try {
          await client.put(`/api/users/me/notifications/${id}/read`);
          set((state) => ({
            notifications: state.notifications.map((n) => 
              n.id === id ? { ...n, read: true } : n
            )
          }));
        } catch (error: any) {
          console.error('Failed to mark notification as read', error);
        }
      },

      markAllNotificationsAsRead: async () => {
        try {
          await client.put('/api/users/me/notifications/read-all');
          set((state) => ({
            notifications: state.notifications.map((n) => ({ ...n, read: true }))
          }));
        } catch (error: any) {
          console.error('Failed to mark all notifications as read', error);
        }
      },

      deleteNotification: async (id) => {
        try {
          await client.delete(`/api/users/me/notifications/${id}`);
          set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id)
          }));
        } catch (error: any) {
          console.error('Failed to delete notification', error);
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
        addresses: state.addresses,
        paymentMethods: state.paymentMethods,
        recentlyViewed: state.recentlyViewed,
        notifications: state.notifications
      }),
    }
  )
);

