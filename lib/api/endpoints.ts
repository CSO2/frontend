export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    signup: '/auth/signup',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    me: '/auth/me',
    verifyEmail: '/auth/verify-email',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  },
  
  products: {
    list: '/products',
    get: (id: string) => `/products/${id}`,
    search: '/products/search',
    featured: '/products/featured',
    byCategory: (category: string) => `/products/category/${category}`,
  },

  cart: {
    get: '/cart',
    add: '/cart/items',
    update: (itemId: string) => `/cart/items/${itemId}`,
    remove: (itemId: string) => `/cart/items/${itemId}`,
    clear: '/cart/clear',
    sync: '/cart/sync',
  },

  wishlist: {
    get: '/wishlist',
    add: '/wishlist/items',
    remove: (productId: string) => `/wishlist/items/${productId}`,
    clear: '/wishlist/clear',
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
