import apiClient from './client';
import { API_ENDPOINTS } from './endpoints';
import { ApiResponse, Cart } from './types';

interface AddToCartRequest {
  productId: string;
  quantity: number;
}

interface UpdateCartItemRequest {
  quantity: number;
}

interface SyncCartRequest {
  items: {
    productId: string;
    quantity: number;
  }[];
}

export const cartApi = {
  getCart: async (): Promise<Cart> => {
    const response = await apiClient.get<ApiResponse<Cart>>(
      API_ENDPOINTS.cart.get
    );
    return response.data.data;
  },

  addToCart: async (data: AddToCartRequest): Promise<Cart> => {
    const response = await apiClient.post<ApiResponse<Cart>>(
      API_ENDPOINTS.cart.add,
      data
    );
    return response.data.data;
  },

  updateCartItem: async (itemId: string, data: UpdateCartItemRequest): Promise<Cart> => {
    const response = await apiClient.patch<ApiResponse<Cart>>(
      API_ENDPOINTS.cart.update(itemId),
      data
    );
    return response.data.data;
  },

  removeFromCart: async (itemId: string): Promise<Cart> => {
    const response = await apiClient.delete<ApiResponse<Cart>>(
      API_ENDPOINTS.cart.remove(itemId)
    );
    return response.data.data;
  },

  clearCart: async (): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.cart.clear);
  },

  syncCart: async (data: SyncCartRequest): Promise<Cart> => {
    const response = await apiClient.post<ApiResponse<Cart>>(
      API_ENDPOINTS.cart.sync,
      data
    );
    return response.data.data;
  },
};
