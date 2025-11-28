import apiClient from './client';
import { API_ENDPOINTS } from './endpoints';
import { ApiResponse, WishlistItem, Cart } from './types';

interface AddToWishlistRequest {
  productId: number;
}

interface WishlistResponse {
  id: number;
  userId: number;
  items: WishlistItem[];
  createdAt: string;
  updatedAt: string;
}

export const wishlistApi = {
  getWishlist: async (): Promise<WishlistItem[]> => {
    const response = await apiClient.get<ApiResponse<WishlistResponse>>(
      API_ENDPOINTS.wishlist.get
    );
    return response.data.data.items;
  },

  addToWishlist: async (data: AddToWishlistRequest): Promise<WishlistItem[]> => {
    const response = await apiClient.post<ApiResponse<WishlistResponse>>(
      API_ENDPOINTS.wishlist.add,
      data
    );
    return response.data.data.items;
  },

  removeFromWishlist: async (productId: number): Promise<WishlistItem[]> => {
    const response = await apiClient.delete<ApiResponse<WishlistResponse>>(
      API_ENDPOINTS.wishlist.remove(productId.toString())
    );
    return response.data.data.items;
  },

  clearWishlist: async (): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.wishlist.clear);
  },

  moveToCart: async (productId: number): Promise<Cart> => {
    const response = await apiClient.post<ApiResponse<Cart>>(
      API_ENDPOINTS.wishlist.moveToCart(productId.toString())
    );
    return response.data.data;
  },
};
