import { create } from 'zustand';
import { Order } from './types';
import client from '../api/client';

interface OrderStore {
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  error: string | null;

  createOrder: (orderData: any) => Promise<Order>;
  fetchOrders: () => Promise<void>;
  fetchOrderById: (id: string) => Promise<void>;
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  currentOrder: null,
  isLoading: false,
  error: null,

  createOrder: async (orderData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await client.post('/api/orders', orderData);
      set((state) => ({
        orders: [...state.orders, response.data],
        currentOrder: response.data,
        isLoading: false,
      }));
      return response.data;
    } catch (error: any) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },

  fetchOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await client.get('/api/orders');
      set({ orders: response.data, isLoading: false });
    } catch (error: any) {
      set({ isLoading: false, error: error.message });
    }
  },

  fetchOrderById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await client.get(`/api/orders/${id}`);
      set({ currentOrder: response.data, isLoading: false });
    } catch (error: any) {
      set({ isLoading: false, error: error.message });
    }
  },
}));
