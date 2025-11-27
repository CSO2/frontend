import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../api/products';

export const QUERY_KEYS = {
  products: {
    all: ['products'] as const,
    list: (params?: any) => ['products', 'list', params] as const,
    detail: (id: string) => ['products', 'detail', id] as const,
    featured: ['products', 'featured'] as const,
    search: (query: string) => ['products', 'search', query] as const,
    category: (category: string) => ['products', 'category', category] as const,
  },
  cart: {
    all: ['cart'] as const,
  },
  wishlist: {
    all: ['wishlist'] as const,
  },
  orders: {
    all: ['orders'] as const,
    detail: (id: string) => ['orders', 'detail', id] as const,
  },
  user: {
    profile: ['user', 'profile'] as const,
    addresses: ['user', 'addresses'] as const,
    paymentMethods: ['user', 'payment-methods'] as const,
  },
  reviews: {
    product: (productId: string) => ['reviews', 'product', productId] as const,
  },
};

export const useProducts = (params?: any) => {
  return useQuery({
    queryKey: QUERY_KEYS.products.list(params),
    queryFn: () => productsApi.getProducts(params),
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.products.detail(id),
    queryFn: () => productsApi.getProduct(id),
    enabled: !!id,
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: QUERY_KEYS.products.featured,
    queryFn: () => productsApi.getFeaturedProducts(),
  });
};

export const useSearchProducts = (query: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.products.search(query),
    queryFn: () => productsApi.searchProducts(query),
    enabled: query.length > 2,
  });
};

export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.products.category(category),
    queryFn: () => productsApi.getProductsByCategory(category),
    enabled: !!category,
  });
};
