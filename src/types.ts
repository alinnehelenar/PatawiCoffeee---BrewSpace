export type ScreenId = 'home' | 'catalog' | 'detail' | 'checkout' | 'tracking' | 'profile' | 'auth';
export type NavTabId = 'beranda' | 'katalog' | 'keranjang' | 'pesanan' | 'profil';
export type AdminScreenId = 'dashboard' | 'dispatch' | 'inventory';
export type ActiveRole = 'customer' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes: string;
  tier: PriceTier;
  memberSince?: string;
  beansPoints: number;
  isLoggedIn: boolean;
}

export type CategoryFilter = 'all' | 'premium' | 'komersial' | 'robusta' | 'espresso';
export type RoastProfileFilter = 'all' | 'medium' | 'medium-dark';
export type BrewMethodCategory = 'all' | 'espresso' | 'manual';

export type SizeOption = '200g' | '500g' | '1kg';
export type GrindOption = 'Whole Beans' | 'Espresso' | 'Filter' | 'Coarse';
export type PriceTier = 'regular' | 'member';
export type DeliveryMethod = 'gosend' | 'grab' | 'pickup';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: CategoryFilter;
  roastLevel: string;
  roastProfile?: 'light' | 'medium' | 'medium-dark';
  brewMethod?: BrewMethodCategory;
  blendRatio: string;
  tastingNotes: string[];
  regularPrice: number;
  memberPrice: number;
  sizes: SizeOption[];
  grinds: GrindOption[];
  image: string;
  description: string;
  origin: string;
  regionTag?: string;
  rating?: number;
  reviewCount?: number;
  weight?: string;
  altitude: string;
  process: string;
  acidity: number; // 1-5
  body: number; // 1-5
  sweetness: number; // 1-5
  stock: number;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  isFreshRoast?: boolean;
  sizePricing?: Partial<Record<SizeOption, { regular: number; member: number }>>;
}

export interface CartItem {
  product: Product;
  size: SizeOption;
  grind: GrindOption;
  tier: PriceTier;
  quantity: number;
  unitPrice: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes: string;
}

export interface OrderState {
  orderId: string;
  customer: CustomerInfo;
  items: CartItem[];
  deliveryMethod: DeliveryMethod;
  shippingFee: number;
  subtotal: number;
  total: number;
  paymentMethod: 'qris';
  orderStep: number; // 1 to 6
  verificationStatus: 'pending' | 'verified' | 'rejected';
  courierStatus: 'idle' | 'searching' | 'assigned' | 'on_the_way';
  courierDriver?: {
    name: string;
    plate: string;
    service: string;
  };
  isReadyForPickup?: boolean;
  createdAt: string;
  countdownSeconds: number;
}

