import { create } from 'zustand';
import { Product, Order, Review, SavedBuild, StoreLocation } from './types';
import { mockProducts } from '../data/products';
import { mockOrders, mockReviews, mockSavedBuilds, mockStoreLocations } from '../data/mockData';

interface ProductStore {
  products: Product[];
  orders: Order[];
  reviews: Review[];
  savedBuilds: SavedBuild[];
  storeLocations: StoreLocation[];
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (category: string, subcategory?: string) => Product[];
  searchProducts: (query: string) => Product[];
  getRelatedProducts: (productId: string, limit?: number) => Product[];
  getReviewsByProductId: (productId: string) => Review[];
  addReview: (review: Review) => void;
  addSavedBuild: (build: SavedBuild) => void;
  updateSavedBuild: (id: string, build: Partial<SavedBuild>) => void;
  deleteSavedBuild: (id: string) => void;
  getSavedBuildsByUserId: (userId: string) => SavedBuild[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrdersByUserId: (userId: string) => Order[];
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: mockProducts,
  orders: mockOrders,
  reviews: mockReviews,
  savedBuilds: mockSavedBuilds,
  storeLocations: mockStoreLocations,
  
  getProductById: (id) => {
    const state = get();
    return state.products.find((p) => p.id === id);
  },
  
  getProductsByCategory: (category, subcategory) => {
    const state = get();
    return state.products.filter((p) => {
      if (subcategory) {
        return p.category === category && p.subcategory === subcategory;
      }
      return p.category === category;
    });
  },
  
  searchProducts: (query) => {
    const state = get();
    const lowerQuery = query.toLowerCase();
    return state.products.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.brand.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery) ||
        p.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  },
  
  getRelatedProducts: (productId, limit = 4) => {
    const state = get();
    const product = state.getProductById(productId);
    if (!product) return [];
    
    return state.products
      .filter((p) => p.id !== productId && p.subcategory === product.subcategory)
      .slice(0, limit);
  },
  
  getReviewsByProductId: (productId) => {
    const state = get();
    return state.reviews.filter((r) => r.productId === productId);
  },
  
  addReview: (review) =>
    set((state) => ({
      reviews: [...state.reviews, review],
    })),
  
  addSavedBuild: (build) =>
    set((state) => ({
      savedBuilds: [...state.savedBuilds, build],
    })),
  
  updateSavedBuild: (id, buildData) =>
    set((state) => ({
      savedBuilds: state.savedBuilds.map((build) =>
        build.id === id ? { ...build, ...buildData, updatedAt: new Date().toISOString() } : build
      ),
    })),
  
  deleteSavedBuild: (id) =>
    set((state) => ({
      savedBuilds: state.savedBuilds.filter((build) => build.id !== id),
    })),
  
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
