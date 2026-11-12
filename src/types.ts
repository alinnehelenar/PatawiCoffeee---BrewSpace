export type ScreenId = 'home' | 'catalog' | 'detail' | 'checkout' | 'success' | 'tracking' | 'profile' | 'auth';
export type NavTabId = 'beranda' | 'katalog' | 'keranjang' | 'pesanan' | 'profil';

export type ActiveRole = 'customer' | 'admin' | 'kurir';

export type AdminScreenId = 'dashboard' | 'dispatch' | 'inventory';
export type AdminTab = 'antrean' | 'stok' | 'laporan' | 'roaster';
export type CourierTab = 'tugas' | 'riwayat' | 'performa' | 'akun';

export type CategoryFilter = 'all' | 'single-origin' | 'blend' | 'premium' | 'komersial' | 'robusta' | 'espresso';
export type RoastProfileFilter = 'all' | 'medium' | 'medium-dark';
export type BrewMethodCategory = 'all' | 'espresso' | 'manual' | 'both';

export type PriceTier = 'regular' | 'member';
export type DeliveryMethod = 'gosend' | 'grab' | 'pickup';

export type SizeOption = '200g' | '500g' | '1kg';
export type GrindOption =
  | 'Biji Utuh (Whole Bean)'
  | 'Giling Kasar (Coarse)'
  | 'Giling Sedang (Medium)'
  | 'Giling Halus (Fine)'
  | 'Whole Beans'
  | 'Espresso'
  | 'Filter'
  | 'Coarse';

export interface CuppingProfile {
  score: number;
  roastDate: string;
  acidity: 'Low' | 'Medium' | 'High' | 'Bright';
  acidityLevel: number; // 1-5
  body: 'Light' | 'Medium' | 'Bold' | 'Heavy';
  bodyLevel: number; // 1-5
  sweetness: 'Rendah' | 'Sedang' | 'Tinggi';
  sweetnessLevel: number; // 1-5
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: CategoryFilter;
  regionTag: string; // e.g. "ACEH TENGAH"
  altitude: string; // e.g. "1.500 MDPL"
  rating: number; // e.g. 4.9
  reviewCount: number;
  badge?: 'Fresh Roast' | 'Pilihan Barista' | 'House Blend' | 'Stok 14' | 'Favorit';
  tastingNotes: string[];
  chips: string[];
  roastProfile: 'Light' | 'Light-Med' | 'Medium' | 'Medium-Dark' | 'Dark' | 'medium' | 'medium-dark';
  roastLevel?: string;
  process: string;
  brewMethod?: 'espresso' | 'manual' | 'both';
  blendRatio?: string;
  regularPrice: number;
  memberPrice: number;
  sizes: SizeOption[];
  grinds: GrindOption[];
  image: string;
  description: string;
  origin: string;
  stock: number;
  stockKg?: number;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  isFreshRoast?: boolean;
  acidity?: number;
  body?: number;
  sweetness?: number;
  cuppingProfile?: CuppingProfile;
  sizePricing: Record<SizeOption, { regular: number; member: number; discountLabel?: string }>;
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
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes: string;
  isGuest?: boolean;
}

export interface UserProfile extends CustomerInfo {
  id: string;
  tier: PriceTier;
  memberSince?: string;
  beansPoints: number;
  isLoggedIn: boolean;
}

export interface OrderState {
  orderId: string;
  customer: CustomerInfo;
  items: CartItem[];
  deliveryMethod: DeliveryMethod;
  shippingFee: number;
  couponDiscount?: number;
  subtotal: number;
  taxAmount?: number;
  total: number;
  paymentMethod: 'qris';
  orderStep: number;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  courierStatus?: 'idle' | 'searching' | 'assigned' | 'on_the_way' | 'menuju_outlet' | 'pickup_selesai' | 'menuju_penerima' | 'selesai';
  courierDriver?: {
    name: string;
    plate: string;
    service: string;
    phone?: string;
  };
  createdAt: string;
  invoiceNumber?: string;
  isReadyForPickup?: boolean;
  countdownSeconds?: number;
}

export interface CourierTask {
  id: string;
  orderId: string;
  service: string;
  status: 'menuju_outlet' | 'pickup_selesai' | 'menuju_penerima' | 'selesai';
  customerName: string;
  customerPhone: string;
  itemsSummary: string;
  pickupLocation: {
    name: string;
    address: string;
    time: string;
  };
  dropoffLocation: {
    address: string;
    instructions: string;
    estimatedTime: string;
  };
}
