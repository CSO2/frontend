import apiClient from './client';
import { API_ENDPOINTS } from './endpoints';
import { ApiResponse, PaginatedResponse, Product } from './types';

interface GetProductsParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  featured?: boolean;
  sortBy?: 'price' | 'name' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export const productsApi = {
  getProducts: async (params?: GetProductsParams): Promise<PaginatedResponse<Product>> => {
    const response = await apiClient.get<PaginatedResponse<Product>>(
      API_ENDPOINTS.products.list,
      { params }
    );
    return response.data;
  },

  getProduct: async (id: string): Promise<Product> => {
    const response = await apiClient.get<ApiResponse<Product>>(
      API_ENDPOINTS.products.get(id)
    );
    return response.data.data;
  },

  getFeaturedProducts: async (): Promise<Product[]> => {
    const response = await apiClient.get<ApiResponse<Product[]>>(
      API_ENDPOINTS.products.featured
    );
    return response.data.data;
  },

  searchProducts: async (query: string): Promise<Product[]> => {
    const response = await apiClient.get<ApiResponse<Product[]>>(
      API_ENDPOINTS.products.search,
      { params: { q: query } }
    );
    return response.data.data;
  },

  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const response = await apiClient.get<ApiResponse<Product[]>>(
      API_ENDPOINTS.products.byCategory(category)
    );
    return response.data.data;
  },
};
