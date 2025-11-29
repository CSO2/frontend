import { create } from 'zustand';
import { Product, Order, Review, SavedBuild, StoreLocation, Category } from './types';
import client from '@/lib/api/client';

interface ProductStore {
  products: Product[];
  categories: Category[];
  selectedProduct: Product | null;
  orders: Order[];
  reviews: Review[];
  savedBuilds: SavedBuild[];
  publicBuilds: SavedBuild[];
  
  
  featuredProducts: Product[];
  deals: Product[];
  relatedProducts: Product[];
  currentProductReviews: Review[];
  
  storeLocations: StoreLocation[];
  isLoading: boolean;
  error: string | null;
  
  fetchProducts: (params?: any) => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchProductById: (id: string) => Promise<Product | undefined>;
  getProductById: (id: string) => Product | undefined;
  fetchProductsByCategory: (category: string, subcategory?: string) => Promise<void>;
  searchProducts: (query: string) => Promise<void>;
  fetchRelatedProducts: (productId: string) => Promise<void>;
  fetchReviewsByProductId: (productId: string) => Promise<void>;
  
  // Keep these as is for now or update later
  fetchFeaturedProducts: () => Promise<void>;
  fetchDeals: () => Promise<void>;
  fetchStoreLocations: () => Promise<void>;
  fetchSavedBuilds: (userId: string) => Promise<void>;
  fetchPublicBuilds: () => Promise<void>;
  
  // Keep these as is for now or update later
  getRelatedProducts: (productId: string, limit?: number) => Product[];
  getReviewsByProductId: (productId: string) => Review[];
  addReview: (review: Review) => Promise<void>;
  addSavedBuild: (build: Omit<SavedBuild, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateSavedBuild: (id: string, build: Partial<SavedBuild>) => Promise<void>;
  deleteSavedBuild: (id: string) => Promise<void>;
  getSavedBuildsByUserId: (userId: string) => SavedBuild[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrdersByUserId: (userId: string) => Order[];
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  categories: [],
  selectedProduct: null,
  orders: [],
  reviews: [],
  savedBuilds: [],
  publicBuilds: [],
  storeLocations: [],
  isLoading: false,
  error: null,
  
  featuredProducts: [],
  deals: [],
  relatedProducts: [],
  currentProductReviews: [],

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await client.get('/api/products');
      set({ products: response.data, isLoading: false });
    } catch (error: any) {
      set({ isLoading: false, error: error.message });
    }
  },

  fetchCategories: async () => {
    try {
      const response = await client.get('/api/products/categories');
      set({ categories: response.data });
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  },

  fetchProductById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await client.get(`/api/products/${id}`);
      set({ selectedProduct: response.data, isLoading: false });
      return response.data;
    } catch (error: any) {
      set({ isLoading: false, error: error.message });
      return undefined;
    }
  },

  getProductById: (id) => {
    const state = get();
    return state.products.find((p) => p.id === id) || (state.selectedProduct?.id === id ? state.selectedProduct : undefined);
  },
  
  fetchProductsByCategory: async (category, subcategory) => {
    set({ isLoading: true, error: null });
    try {
      let url = `/api/products?category=${category}`;
      if (subcategory) {
        url += `&subcategory=${subcategory}`;
      }
      const response = await client.get(url);
      set({ products: response.data, isLoading: false });
    } catch (error: any) {
      set({ isLoading: false, error: error.message });
    }
  },
  
  searchProducts: async (query) => {
    set({ isLoading: true, error: null });
    try {
      const response = await client.get(`/api/products/search?q=${query}`);
      set({ products: response.data, isLoading: false });
    } catch (error: any) {
      set({ isLoading: false, error: error.message });
    }
  },
  
  fetchRelatedProducts: async (productId) => {
    // set({ isLoading: true, error: null }); // Don't set global loading for this
    try {
      const response = await client.get(`/api/products/${productId}/related`);
      set({ relatedProducts: response.data });
    } catch (error: any) {
      console.error('Failed to fetch related products:', error);
      // Fallback to local filtering if API fails or not implemented yet
      const state = get();
      const product = state.products.find(p => p.id === productId) || state.selectedProduct;
      if (product) {
        const related = state.products
          .filter(p => p.category === product.category && p.id !== product.id)
          .slice(0, 4);
        set({ relatedProducts: related });
      }
    }
  },
  
  fetchReviewsByProductId: async (productId) => {
    try {
      const response = await client.get(`/api/products/${productId}/reviews`);
      set({ currentProductReviews: response.data });
    } catch (error: any) {
      console.error('Failed to fetch reviews:', error);
      set({ currentProductReviews: [] });
    }
  },
  
  addReview: async (review) => {
    try {
      const response = await client.post(`/api/products/${review.productId}/reviews`, review);
      set((state) => ({
        currentProductReviews: [response.data, ...state.currentProductReviews],
        reviews: [...state.reviews, response.data]
      }));
    } catch (error: any) {
      console.error('Failed to add review:', error);
      throw error;
    }
  },
  
  // Deprecated synchronous getters, kept for compatibility but should be replaced
  getRelatedProducts: (productId, limit = 4) => {
    const state = get();
    return state.relatedProducts.length > 0 ? state.relatedProducts : state.products.slice(0, limit); 
  },
  
  getReviewsByProductId: (productId) => {
    const state = get();
    return state.currentProductReviews;
  },
  
  fetchFeaturedProducts: async () => {
    try {
      const response = await client.get('/api/products/featured');
      if (Array.isArray(response.data)) {
         set({ featuredProducts: response.data });
      }
    } catch (error) {
      console.error('Failed to fetch featured products:', error);
    }
  },

  fetchStoreLocations: async () => {
    try {
      const response = await client.get('/api/support/stores');
      set({ storeLocations: response.data });
    } catch (error) {
      console.error('Failed to fetch store locations:', error);
    }
  },

  fetchDeals: async () => {
    try {
      const response = await client.get('/api/products/deals');
      set({ deals: response.data });
    } catch (error) {
      console.error('Failed to fetch deals:', error);
    }
  },

  fetchSavedBuilds: async (userId: string) => {
      try {
          const response = await client.get(`/api/wishlist/builds/user/${userId}`);
          set({ savedBuilds: response.data });
      } catch (error) {
          console.error('Failed to fetch saved builds:', error);
      }
  },

  fetchPublicBuilds: async () => {
      try {
          const response = await client.get('/api/wishlist/builds/public');
          set({ publicBuilds: response.data });
      } catch (error) {
          console.error('Failed to fetch public builds:', error);
      }
  },

  addSavedBuild: async (build) => {
      try {
          const response = await client.post('/api/wishlist/builds', build);
          set((state) => ({
              savedBuilds: [...state.savedBuilds, response.data],
          }));
      } catch (error) {
          console.error('Failed to save build:', error);
          throw error;
      }
  },
  
  updateSavedBuild: async (id, buildData) => {
      try {
          const response = await client.put(`/api/wishlist/builds/${id}`, buildData);
          set((state) => ({
              savedBuilds: state.savedBuilds.map((build) =>
                  build.id === id ? response.data : build
              ),
          }));
      } catch (error) {
          console.error('Failed to update build:', error);
          throw error;
      }
  },
  
  deleteSavedBuild: async (id) => {
      try {
          await client.delete(`/api/wishlist/builds/${id}`);
          set((state) => ({
              savedBuilds: state.savedBuilds.filter((build) => build.id !== id),
          }));
      } catch (error) {
          console.error('Failed to delete build:', error);
          throw error;
      }
  },
  
  getSavedBuildsByUserId: (userId) => {
    const state = get();
    return state.savedBuilds.filter((b) => b.userId === userId);
  },
  
  addOrder: (order) =>
    set((state) => ({
      orders: [...state.orders, order],
    })),
  
  updateOrderStatus: (orderId, status) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      ),
    })),
  
  getOrdersByUserId: (userId) => {
    const state = get();
    return state.orders.filter((o) => o.userId === userId);
  },
}));

