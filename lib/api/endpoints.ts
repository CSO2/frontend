export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    signup: '/api/auth/signup',
    logout: '/api/auth/logout',
    refresh: '/api/auth/refresh-token',
    me: '/api/users/profile',
    verifyEmail: '/api/auth/verify-email',
    forgotPassword: '/api/auth/forgot-password',
    resetPassword: '/api/auth/reset-password',
  },
  
  products: {
    list: '/products',
    get: (id: string) => `/products/${id}`,
    search: '/products/search',
    featured: '/products/featured',
    byCategory: (category: string) => `/products/category/${category}`,
  },

  cart: {
    get: '/api/cart',
    add: '/api/cart/items',
    update: (itemId: string) => `/api/cart/items/${itemId}`,
    remove: (itemId: string) => `/api/cart/items/${itemId}`,
    clear: '/api/cart/clear',
    sync: '/api/cart/sync',
  },

  wishlist: {
    get: '/api/wishlist',
    add: '/api/wishlist/items',
    remove: (productId: string) => `/api/wishlist/items/${productId}`,
    clear: '/api/wishlist/clear',
    moveToCart: (productId: string) => `/api/wishlist/move-to-cart/${productId}`,
  },

  orders: {
    list: '/orders',
    get: (id: string) => `/orders/${id}`,
    create: '/orders',
    cancel: (id: string) => `/orders/${id}/cancel`,
    track: (id: string) => `/orders/${id}/track`,
  },

  user: {
    profile: '/users/profile',
    updateProfile: '/users/profile',
    addresses: '/users/addresses',
    addAddress: '/users/addresses',
    updateAddress: (id: string) => `/users/addresses/${id}`,
    deleteAddress: (id: string) => `/users/addresses/${id}`,
    paymentMethods: '/users/payment-methods',
  },

  reviews: {
    list: (productId: string) => `/reviews/product/${productId}`,
    create: '/reviews',
    update: (id: string) => `/reviews/${id}`,
    delete: (id: string) => `/reviews/${id}`,
    helpful: (id: string) => `/reviews/${id}/helpful`,
  },

  admin: {
    products: {
      list: '/admin/products',
      get: (id: string) => `/admin/products/${id}`,
      create: '/admin/products',
      update: (id: string) => `/admin/products/${id}`,
      delete: (id: string) => `/admin/products/${id}`,
    },
    orders: {
      list: '/admin/orders',
      get: (id: string) => `/admin/orders/${id}`,
      updateStatus: (id: string) => `/admin/orders/${id}/status`,
    },
    customers: {
      list: '/admin/customers',
      get: (id: string) => `/admin/customers/${id}`,
    },
    analytics: {
      dashboard: '/admin/analytics/dashboard',
      sales: '/admin/analytics/sales',
    },
  },
} as const;
