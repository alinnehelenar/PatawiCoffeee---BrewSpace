import React, { useState } from 'react';
import {
  ScreenId,
  ActiveRole,
  AdminTab,
  CourierTab,
  Product,
  CartItem,
  OrderState,
  CategoryFilter,
  UserProfile,
} from './types';
import { PRODUCTS, DEFAULT_CUSTOMER, DEFAULT_USER_PROFILE } from './data/products';
import { getProductPrice } from './utils/pricing';
import { Header } from './components/Header';
import { ScreenHome } from './components/ScreenHome';
import { ScreenCatalog } from './components/ScreenCatalog';
import { ScreenCheckout } from './components/ScreenCheckout';
import { ScreenTracking } from './components/ScreenTracking';
import { ScreenProfile } from './components/ScreenProfile';
import { ScreenAuth } from './components/ScreenAuth';
import { BottomNavBar } from './components/BottomNavBar';
import { ProductDetailModal } from './components/ProductDetailModal';
import { GrindGuideModal } from './components/GrindGuideModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { DigitalInvoiceModal } from './components/DigitalInvoiceModal';
import { CourierDashboard } from './components/CourierDashboard';
import { AdminPanel } from './components/AdminPanel';
import { NotificationDrawer } from './components/NotificationDrawer';

export default function App() {
  // Active Role: 'customer' | 'admin' | 'kurir'
  const [activeRole, setActiveRole] = useState<ActiveRole>('customer');

  // Customer Screen State
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [catalogCategory, setCatalogCategory] = useState<CategoryFilter>('all');

  // Admin & Courier sub-tabs
  const [currentAdminTab, setCurrentAdminTab] = useState<AdminTab>('stok');
  const [currentCourierTab, setCurrentCourierTab] = useState<CourierTab>('tugas');

  // Products Dataset
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // Modals
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isGrindGuideOpen, setIsGrindGuideOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // User Profile
  const [currentUser, setCurrentUser] = useState<UserProfile>(DEFAULT_USER_PROFILE);

  // Cart State (Initialized with official Fijne Dag 55)
  const initialProduct = PRODUCTS.find((p) => p.id === 'fijne-dag-55') || PRODUCTS[0];
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: initialProduct,
      size: '200g',
      grind: 'Biji Utuh (Whole Bean)',
      tier: 'regular',
      quantity: 1,
      unitPrice: initialProduct.regularPrice,
    },
  ]);

  // Shared Order State (matching official Fijne Dag 55)
  const [orderState, setOrderState] = useState<OrderState>({
    orderId: '#PTW-74747',
    customer: DEFAULT_CUSTOMER,
    items: [
      {
        product: initialProduct,
        size: '200g',
        grind: 'Biji Utuh (Whole Bean)',
        tier: 'regular',
        quantity: 2,
        unitPrice: initialProduct.regularPrice,
      },
    ],
    deliveryMethod: 'gosend',
    shippingFee: 15000,
    couponDiscount: 20000,
    subtotal: 120000,
    taxAmount: 11396,
    total: 115000,
    paymentMethod: 'qris',
    orderStep: 2,
    verificationStatus: 'verified',
    courierStatus: 'menuju_outlet',
    courierDriver: {
      name: 'Rian Hidayat',
      plate: 'B 4521 SRX',
      service: 'GoSend Instant',
      phone: '+62 813-9876-5432',
    },
    createdAt: 'Hari ini • 01:09 WIB',
    invoiceNumber: '#PTW-74747',
  });

  const cartTotalQuantity = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  // Product Selection -> Open Detail Modal
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  // Quick Add Direct from Card
  const handleAddToCartDirect = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  // Add Item to Cart from Customization Modal
  const handleAddToCartFromModal = (item: CartItem) => {
    setAddedProductId(item.product.id);
    setCartItems((prev) => {
      const existing = prev.find(
        (it) =>
          it.product.id === item.product.id &&
          it.size === item.size &&
          it.grind === item.grind
      );
      if (existing) {
        return prev.map((it) =>
          it === existing ? { ...it, quantity: it.quantity + item.quantity } : it
        );
      }
      return [...prev, item];
    });

    setTimeout(() => setAddedProductId(null), 1500);
  };

  // Checkout Completion -> Triggers Order Success Modal
  const handleCompleteCheckout = (order: OrderState) => {
    setOrderState(order);
    setIsSuccessModalOpen(true);
  };

  // Admin Stock Update (+5 kg Restock)
  const handleUpdateStockKg = (productId: string, deltaKg: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const currentKg = p.stockKg ?? p.stock ?? 20;
          const newKg = Math.max(0, currentKg + deltaKg);
          return {
            ...p,
            stockKg: newKg,
            stock: newKg,
            stockStatus: newKg <= 0 ? 'out_of_stock' : newKg <= 5 ? 'low_stock' : 'in_stock',
          };
        }
        return p;
      })
    );
  };

  // Admin Save / Edit Product
  const handleSaveProduct = (updated: Partial<Product>) => {
    const prodId = updated.id || `blend-${Date.now()}`;
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === prodId);
      if (exists) {
        return prev.map((p) => (p.id === prodId ? ({ ...p, ...updated } as Product) : p));
      }
      const newProduct: Product = {
        id: prodId,
        name: updated.name || 'New Specialty Roast',
        subtitle: updated.subtitle || 'Roastery Specialty',
        category: updated.category || 'single-origin',
        regionTag: updated.regionTag || 'INDONESIA SPECIALTY',
        altitude: updated.altitude || '1.400 MDPL',
        rating: 4.9,
        reviewCount: 12,
        tastingNotes: updated.tastingNotes || ['Caramel', 'Chocolate'],
        chips: ['Medium', 'Washed', '1.400 MDPL'],
        roastProfile: 'Medium',
        process: 'Washed',
        regularPrice: updated.regularPrice || 90000,
        memberPrice: updated.memberPrice || 85000,
        sizes: ['200g', '500g', '1kg'],
        grinds: [
          'Biji Utuh (Whole Bean)',
          'Giling Kasar (Coarse)',
          'Giling Sedang (Medium)',
          'Giling Halus (Fine)',
        ],
        image: PRODUCTS[0].image,
        description: 'Biji kopi pilihan sangrai artisanal Patawi Roastery.',
        origin: 'Patawi Brewspace Lab',
        stock: updated.stock ?? 20,
        stockKg: updated.stockKg ?? updated.stock ?? 20,
        stockStatus: 'in_stock',
        sizePricing: {
          '200g': { regular: updated.regularPrice || 90000, member: updated.memberPrice || 85000 },
          '500g': { regular: 200000, member: 190000 },
          '1kg': { regular: 360000, member: 340000 },
        },
      };
      return [...prev, newProduct];
    });
  };

  // Courier Status Progression
  const handleUpdateDeliveryStatus = (status: OrderState['courierStatus']) => {
    setOrderState((prev) => ({
      ...prev,
      courierStatus: status,
      orderStep:
        status === 'selesai'
          ? 6
          : status === 'menuju_penerima'
          ? 5
          : status === 'pickup_selesai'
          ? 4
          : 3,
    }));
  };

  return (
    <div className="min-h-screen bg-[#F0ECE6] text-[#1A1A1A] flex flex-col items-center justify-start antialiased selection:bg-[#1A1A1A] selection:text-white">
      {/* Responsive mobile container (fluid up to 100% on mobile, max-w-4xl/6xl centered on desktop) */}
      <main className="w-full max-w-4xl min-h-screen bg-[#FAF8F5] shadow-2xl sm:border-x sm:border-[#E8E2D9] flex flex-col relative mx-auto">
        {/* Top Header with Wordmark, Avatar, and 3-Pill Role Switcher */}
        <Header
          activeRole={activeRole}
          onChangeRole={(role) => setActiveRole(role)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onNavigateProfile={() => {
            setActiveRole('customer');
            setCurrentScreen('profile');
          }}
          currentUser={currentUser}
          showBack={currentScreen !== 'home' && activeRole === 'customer'}
          onBack={() => setCurrentScreen('home')}
        />

        {/* View Routing based on Active Role */}
        {activeRole === 'customer' && (
          <>
            {currentScreen === 'home' && (
              <ScreenHome
                products={products}
                onSelectProduct={handleSelectProduct}
                onAddToCartDirect={handleAddToCartDirect}
                onNavigate={setCurrentScreen}
                onSelectCategory={(cat) => setCatalogCategory(cat)}
                addedProductId={addedProductId}
                userTier={currentUser.tier}
              />
            )}

            {currentScreen === 'catalog' && (
              <ScreenCatalog
                products={products}
                onSelectProduct={handleSelectProduct}
                onAddToCartDirect={handleAddToCartDirect}
                onNavigate={setCurrentScreen}
                addedProductId={addedProductId}
                initialCategory={catalogCategory}
              />
            )}

            {currentScreen === 'checkout' && (
              <ScreenCheckout
                cartItems={cartItems}
                onCompleteCheckout={handleCompleteCheckout}
                onBack={() => setCurrentScreen('home')}
                customerInfo={currentUser}
              />
            )}

            {currentScreen === 'tracking' && (
              <ScreenTracking
                orderState={orderState}
                onRestartDemo={() => setCurrentScreen('home')}
              />
            )}

            {currentScreen === 'profile' && (
              <ScreenProfile
                currentUser={currentUser}
                onUpdateProfile={(updated) => setCurrentUser(updated)}
                onLogout={() => setCurrentScreen('auth')}
                onNavigateAuth={() => setCurrentScreen('auth')}
                onSwitchToAdmin={() => setActiveRole('admin')}
                onNavigateOrder={() => setCurrentScreen('tracking')}
                orderState={orderState}
              />
            )}

            {currentScreen === 'auth' && (
              <ScreenAuth
                onLogin={(user) => {
                  setCurrentUser(user);
                  setCurrentScreen('profile');
                }}
                onNavigate={setCurrentScreen}
                onBack={() => setCurrentScreen('profile')}
              />
            )}
          </>
        )}

        {activeRole === 'admin' && (
          <AdminPanel
            products={products}
            orderState={orderState}
            onUpdateStockKg={handleUpdateStockKg}
            onSaveProduct={handleSaveProduct}
            onSwitchRole={(role) => setActiveRole(role)}
            activeTab={currentAdminTab}
            onChangeTab={setCurrentAdminTab}
            onVerifyPayment={() => {
              setOrderState((prev) => ({
                ...prev,
                verificationStatus: 'verified',
                orderStep: Math.max(prev.orderStep, 2),
              }));
            }}
          />
        )}

        {activeRole === 'kurir' && (
          <CourierDashboard
            orderState={orderState}
            activeTab={currentCourierTab}
            onChangeTab={setCurrentCourierTab}
            onUpdateDeliveryStatus={handleUpdateDeliveryStatus}
            onSwitchRole={(role) => setActiveRole(role)}
          />
        )}

        {/* Dynamic Multi-Role Bottom Navigation Footer */}
        <BottomNavBar
          currentScreen={currentScreen}
          onNavigateCustomer={setCurrentScreen}
          cartCount={cartTotalQuantity}
          activeRole={activeRole}
          currentAdminTab={currentAdminTab}
          onNavigateAdmin={setCurrentAdminTab}
          currentCourierTab={currentCourierTab}
          onNavigateCourier={setCurrentCourierTab}
        />
      </main>

      {/* Product Customization Modal (Screen 2 in Image 1) */}
      <ProductDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        product={selectedProduct}
        onAddToCart={handleAddToCartFromModal}
        onOpenGrindGuide={() => setIsGrindGuideOpen(true)}
        userTier={currentUser.tier}
      />

      {/* Grind Guide Modal (Screen 3 in Image 1) */}
      <GrindGuideModal
        isOpen={isGrindGuideOpen}
        onClose={() => setIsGrindGuideOpen(false)}
      />

      {/* Order Confirmation & Email Alert Modal (Screen 4 in Image 2) */}
      <OrderSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        orderState={orderState}
        onOpenInvoice={() => setIsInvoiceModalOpen(true)}
        onTrackOrder={() => {
          setIsSuccessModalOpen(false);
          setActiveRole('customer');
          setCurrentScreen('tracking');
        }}
        onBackToHome={() => {
          setIsSuccessModalOpen(false);
          setCurrentScreen('home');
        }}
      />

      {/* Official Digital Invoice Modal (Screen 5 in Image 2) */}
      <DigitalInvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        orderState={orderState}
      />

      {/* Notification Drawer */}
      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </div>
  );
}
