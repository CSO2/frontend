import apiClient from './client';
import { API_ENDPOINTS } from './endpoints';
import { ApiResponse, Cart } from './types';

interface AddToCartRequest {
  productId: number;
  quantity: number;
}

interface UpdateCartItemRequest {
  quantity: number;
}

// Session ID management for guest carts
const SESSION_ID_KEY = 'cart_session_id';

export const getOrCreateSessionId = (): string => {
  if (typeof window === 'undefined') return '';
  
  let sessionId = localStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
};

export const clearSessionId = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SESSION_ID_KEY);
  }
};

export const cartApi = {
  getCart: async (): Promise<Cart> => {
    const response = await apiClient.get<ApiResponse<Cart>>(
      API_ENDPOINTS.cart.get,
      {
        headers: {
          'Cookie': `sessionId=${getOrCreateSessionId()}`
        }
      }
    );
    return response.data.data;
  },

  addToCart: async (data: AddToCartRequest): Promise<Cart> => {
    const response = await apiClient.post<ApiResponse<Cart>>(
      API_ENDPOINTS.cart.add,
      data,
      {
        headers: {
          'Cookie': `sessionId=${getOrCreateSessionId()}`
        }
      }
    );
    return response.data.data;
  },

  updateCartItem: async (itemId: number, data: UpdateCartItemRequest): Promise<Cart> => {
    const response = await apiClient.patch<ApiResponse<Cart>>(
      API_ENDPOINTS.cart.update(itemId.toString()),
      data,
      {
        headers: {
          'Cookie': `sessionId=${getOrCreateSessionId()}`
        }
      }
    );
    return response.data.data;
  },

  removeFromCart: async (itemId: number): Promise<Cart> => {
    const response = await apiClient.delete<ApiResponse<Cart>>(
      API_ENDPOINTS.cart.remove(itemId.toString()),
      {
        headers: {
          'Cookie': `sessionId=${getOrCreateSessionId()}`
        }
      }
    );
    return response.data.data;
  },

  clearCart: async (): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.cart.clear, {
      headers: {
        'Cookie': `sessionId=${getOrCreateSessionId()}`
      }
    });
  },

  syncCart: async (): Promise<Cart> => {
    const response = await apiClient.post<ApiResponse<Cart>>(
      API_ENDPOINTS.cart.sync,
      {},
      {
        headers: {
          'Cookie': `sessionId=${getOrCreateSessionId()}`
        }
      }
    );
    // Clear session ID after successful sync
    clearSessionId();
    return response.data.data;
  },
};
