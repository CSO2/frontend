import apiClient from './client';
import { API_ENDPOINTS } from './endpoints';
import { ApiResponse, WishlistItem } from './types';

interface AddToWishlistRequest {
  productId: string;
}

export const wishlistApi = {
  getWishlist: async (): Promise<WishlistItem[]> => {
    const response = await apiClient.get<ApiResponse<WishlistItem[]>>(
      API_ENDPOINTS.wishlist.get
    );
    return response.data.data;
  },

  addToWishlist: async (data: AddToWishlistRequest): Promise<WishlistItem[]> => {
    const response = await apiClient.post<ApiResponse<WishlistItem[]>>(
      API_ENDPOINTS.wishlist.add,
      data
    );
    return response.data.data;
  },

  removeFromWishlist: async (productId: string): Promise<WishlistItem[]> => {
    const response = await apiClient.delete<ApiResponse<WishlistItem[]>>(
      API_ENDPOINTS.wishlist.remove(productId)
    );
    return response.data.data;
  },

  clearWishlist: async (): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.wishlist.clear);
  },
};
