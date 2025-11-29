export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  subcategory?: string;
  specs: Record<string, string | number>;
  imageUrl: string;
  stockLevel: number;
  description: string;
  brand: string;
  rating?: number;
  reviewCount?: number;
  tags?: string[];
  compatibility?: {
    socketType?: string;
    formFactor?: string;
    interface?: string;
    powerRequirement?: number;
  };
  salePrice?: number;
  discountPercentage?: number;
  saleEndDate?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  iconName?: string;
  parentId?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  loyaltyPoints?: number;
  tier?: 'bronze' | 'silver' | 'gold' | 'platinum';
  role?: string;
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'credit' | 'debit';
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault?: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: 'Processing' | 'Ready for Pickup' | 'Shipped' | 'Delivered' | 'Cancelled';
  orderType: 'pickup' | 'delivery';
  total: number;
  subtotal: number;
  tax: number;
  shippingAddress?: Address;
  pickupLocation?: string;
  createdAt: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  helpful: number;
  verified: boolean;
}

export interface SavedBuild {
  id: string;
  name: string;
  userId: string;
  components: {
    cpu?: Product;
    motherboard?: Product;
    gpu?: Product;
    ram?: Product;
    storage?: Product;
    psu?: Product;
    cooler?: Product;
    case?: Product;
  };
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  isPublic?: boolean;
  likes?: number;
  views?: number;
  category?: string;
  description?: string;
  builderName?: string;
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  hours: string;
  coordinates: { lat: number; lng: number };
}
