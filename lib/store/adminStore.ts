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
}

interface AdminStore {
  metrics: DashboardMetrics | null;
  recentOrders: any[];
  allOrders: any[];
  lowStockItems: Product[];
  isLoading: boolean;
  error: string | null;
  
  fetchDashboardMetrics: () => Promise<void>;
  fetchRecentOrders: () => Promise<void>;
  fetchAllOrders: () => Promise<void>;
  fetchLowStockItems: () => Promise<void>;
  fetchAllDashboardData: () => Promise<void>;
}

export const useAdminStore = create<AdminStore>((set) => ({
  metrics: null,
  recentOrders: [],
  allOrders: [],
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

  fetchLowStockItems: async () => {
    try {
      const response = await client.get('/api/products/low-stock?threshold=5');
      set({ lowStockItems: response.data });
    } catch (error: any) {
      console.error('Failed to fetch low stock items:', error);
    }
  },

  fetchAllDashboardData: async () => {
    set({ isLoading: true, error: null });
    try {
      await Promise.all([
        useAdminStore.getState().fetchDashboardMetrics(),
        useAdminStore.getState().fetchRecentOrders(),
        useAdminStore.getState().fetchLowStockItems(),
      ]);
      set({ isLoading: false });
    } catch (error: any) {
      set({ isLoading: false, error: 'Failed to load dashboard data' });
    }
  },
}));
