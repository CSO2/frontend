import { create } from 'zustand';
import client from '../api/client';
import { Order, Product } from './types';

interface DashboardMetrics {
  totalRevenue: number;
  revenueChange: string;
  revenueTrend: 'up' | 'down';
  newOrders: number;
  newOrdersChange: string;
  newOrdersTrend: 'up' | 'down';
  pendingRMAs: number;
  pendingRMAsChange: string;
  pendingRMAsTrend: 'up' | 'down';
  activeCustomers: number;
  activeCustomersChange: string;
  activeCustomersTrend: 'up' | 'down';
  productsSold: number;
}

interface AdminStore {
  metrics: DashboardMetrics | null;
  recentOrders: any[];
  allOrders: any[];
  users: any[];
  abandonedCarts: any[];
  supportTickets: any[];
  stores: any[];
  topProducts: any[];
  salesSeries: any[];
  rmaRequests: any[];
  promotions: any[];
  lowStockItems: Product[];
  isLoading: boolean;
  error: string | null;
  
  fetchDashboardMetrics: () => Promise<void>;
  fetchAbandonedCarts: () => Promise<void>;
  fetchRecentOrders: () => Promise<void>;
  fetchAllOrders: () => Promise<void>;
  fetchRMARequests: () => Promise<void>;
  fetchLowStockItems: () => Promise<void>;
  fetchUsers: () => Promise<void>;
  fetchSupportTickets: () => Promise<void>;
  fetchPromotions: () => Promise<void>;
  fetchStores: () => Promise<void>;
  fetchTopProducts: (limit?: number) => Promise<void>;
  fetchSalesSeries: (start?: string, end?: string) => Promise<void>;
  fetchAllDashboardData: () => Promise<void>;
}

export const useAdminStore = create<AdminStore>((set) => ({
  metrics: null,
  recentOrders: [],
  allOrders: [],
  users: [],
  abandonedCarts: [],
  supportTickets: [],
  stores: [],
  topProducts: [],
  salesSeries: [],
  rmaRequests: [],
  promotions: [],
  lowStockItems: [],
  isLoading: false,
  error: null,

  fetchDashboardMetrics: async () => {
    try {
      const response = await client.get('/api/analytics/dashboard');
      set({ metrics: response.data });
    } catch (error: any) {
      console.error('Failed to fetch dashboard metrics:', error);
      // Don't set global error to avoid blocking UI, just log
    }
  },

  fetchAbandonedCarts: async () => {
    try {
      const response = await client.get('/api/cart/abandoned');
      set({ abandonedCarts: response.data });
    } catch (error: any) {
      console.error('Failed to fetch abandoned carts:', error);
    }
  },

  fetchRecentOrders: async () => {
    try {
      const response = await client.get('/api/orders/recent');
      set({ recentOrders: response.data });
    } catch (error: any) {
      console.error('Failed to fetch recent orders:', error);
    }
  },

  fetchAllOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await client.get('/api/orders/all');
      set({ allOrders: response.data, isLoading: false });
    } catch (error: any) {
      console.error('Failed to fetch all orders:', error);
      set({ isLoading: false, error: 'Failed to fetch orders' });
    }
  },

  fetchRMARequests: async () => {
    try {
      const response = await client.get('/api/orders/rmas/all');
      set({ rmaRequests: response.data });
    } catch (error: any) {
      console.error('Failed to fetch RMA requests:', error);
    }
  },

  fetchLowStockItems: async () => {
    try {
      const response = await client.get('/api/products/low-stock?threshold=5');
      set({ lowStockItems: response.data });
    } catch (error: any) {
      console.error('Failed to fetch low stock items:', error);
    }
  },

  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await client.get('/api/users');
      set({ users: response.data, isLoading: false });
    } catch (error: any) {
      console.error('Failed to fetch users:', error);
      set({ isLoading: false, error: 'Failed to fetch users' });
    }
  },

  fetchSupportTickets: async () => {
    try {
      const response = await client.get('/api/support/tickets/all');
      set({ supportTickets: response.data });
    } catch (error: any) {
      console.error('Failed to fetch support tickets:', error);
    }
  },

  fetchStores: async () => {
    try {
      const response = await client.get('/api/support/stores');
      set({ stores: response.data });
    } catch (error: any) {
      console.error('Failed to fetch stores:', error);
    }
  },

  fetchPromotions: async () => {
    try {
      const response = await client.get('/api/promotions');
      set({ promotions: response.data });
    } catch (error: any) {
      console.error('Failed to fetch promotions:', error);
    }
  },

  fetchTopProducts: async (limit = 10) => {
    try {
      const response = await client.get(`/api/analytics/sales?limit=${limit}`);
      set({ topProducts: response.data });
    } catch (error: any) {
      console.error('Failed to fetch top products:', error);
    }
  },

  fetchSalesSeries: async (start?: string, end?: string) => {
    try {
      const params = [];
      if (start) params.push(`start=${start}`);
      if (end) params.push(`end=${end}`);
      const path = `/api/analytics/sales/series${params.length ? `?${params.join('&')}` : ''}`;
      const response = await client.get(path);
      set({ salesSeries: response.data });
    } catch (error: any) {
      console.error('Failed to fetch sales time series:', error);
    }
  },

  fetchAllDashboardData: async () => {
    set({ isLoading: true, error: null });
    try {
      await Promise.all([
        useAdminStore.getState().fetchDashboardMetrics(),
        useAdminStore.getState().fetchRecentOrders(),
        useAdminStore.getState().fetchLowStockItems(),
        useAdminStore.getState().fetchAbandonedCarts(),
        useAdminStore.getState().fetchRMARequests(),
        useAdminStore.getState().fetchPromotions(),
      ]);
      set({ isLoading: false });
    } catch (error: any) {
      set({ isLoading: false, error: 'Failed to load dashboard data' });
    }
  },
}));
