import React, { useState } from 'react';
import { ScreenId, AdminScreenId, ActiveRole, Product, CartItem, OrderState, CategoryFilter, UserProfile } from './types';
import { PRODUCTS, DEFAULT_CUSTOMER, DEFAULT_USER_PROFILE, DEMO_USERS } from './data/products';
import { getProductPrice } from './utils/pricing';
import { Header } from './components/Header';
import { AdminHeader } from './components/AdminHeader';
import { ScreenHome } from './components/ScreenHome';
import { ScreenCatalog } from './components/ScreenCatalog';
import { ScreenDetail } from './components/ScreenDetail';
import { ScreenCheckout } from './components/ScreenCheckout';
import { ScreenTracking } from './components/ScreenTracking';
import { ScreenProfile } from './components/ScreenProfile';
import { ScreenAuth } from './components/ScreenAuth';
import { BottomNavBar } from './components/BottomNavBar';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminDispatch } from './components/AdminDispatch';
import { AdminInventory } from './components/AdminInventory';
import { NotificationDrawer } from './components/NotificationDrawer';

export default function App() {
  // Roles: 'customer' or 'admin'
  const [activeRole, setActiveRole] = useState<ActiveRole>('customer');

  // Customer navigation: 'home' | 'catalog' | 'detail' | 'checkout' | 'tracking' | 'profile'
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [catalogCategory, setCatalogCategory] = useState<CategoryFilter>('all');

  // Admin navigation: 'dashboard' | 'dispatch' | 'inventory'
  const [currentAdminScreen, setCurrentAdminScreen] = useState<AdminScreenId>('dashboard');

  // Shared Products & Inventory State (Only the 14 official items)
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[2]); // Default Fijne Dag 55
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);

  // User Session & Profile State (Default: Rina Kartika, VIP Member)
  const [currentUser, setCurrentUser] = useState<UserProfile>(DEFAULT_USER_PROFILE);

  // Cart State (initialized with 2 items of Fijne Dag 55 at member tier)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS.find((p) => p.id === 'fijne-dag-55') || PRODUCTS[0],
      size: '200g',
      grind: 'Espresso',
      tier: 'member',
      quantity: 2,
      unitPrice: 55000,
    },
  ]);

  // Shared Order State between Customer and Admin
  const [orderState, setOrderState] = useState<OrderState>({
    orderId: 'PBS-20261109-0012',
    customer: DEFAULT_CUSTOMER,
    items: [
      {
        product: PRODUCTS.find((p) => p.id === 'fijne-dag-55') || PRODUCTS[0],
        size: '200g',
        grind: 'Espresso',
        tier: 'member',
        quantity: 2,
        unitPrice: 55000,
      },
    ],
    deliveryMethod: 'gosend',
    shippingFee: 18000,
    subtotal: 110000,
    total: 128000,
    paymentMethod: 'qris',
    orderStep: 1, // Payment Pending
    verificationStatus: 'pending',
    courierStatus: 'idle',
    createdAt: '21:35',
    countdownSeconds: 14 * 60 + 59,
  });

  const cartTotalQuantity = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  // Toggle role between Customer and Admin
  const handleToggleRole = () => {
    setActiveRole((prev) => (prev === 'customer' ? 'admin' : 'customer'));
  };

  // Update Profile, Membership Tier, and synchronize pricing across the entire app
  const handleUpdateProfile = (updated: UserProfile) => {
    setCurrentUser(updated);

    // Sync customer shipping info to order state
    setOrderState((prev) => ({
      ...prev,
      customer: {
        name: updated.name,
        phone: updated.phone,
        address: updated.address,
        city: updated.city,
        postalCode: updated.postalCode,
        notes: updated.notes,
      },
    }));

    // If tier changed, dynamically update cart prices and order totals
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        const newUnitPrice = getProductPrice(item.product, item.size, updated.tier);
        return {
          ...item,
          tier: updated.tier,
          unitPrice: newUnitPrice,
        };
      });

      const newSubtotal = updatedItems.reduce(
        (acc, it) => acc + it.unitPrice * it.quantity,
        0
      );

      setOrderState((prev) => ({
        ...prev,
        items: updatedItems,
        subtotal: newSubtotal,
        total: newSubtotal + prev.shippingFee,
      }));

      return updatedItems;
    });
  };

  const handleLogin = (user: UserProfile) => {
    handleUpdateProfile(user);
    setCurrentScreen('profile');
  };

  const handleLogout = () => {
    setCurrentUser((prev) => ({ ...prev, isLoggedIn: false }));
    setCurrentScreen('auth');
  };

  // Customer actions
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen('detail');
  };

  const handleAddToCartDirect = (product: Product) => {
    setAddedProductId(product.id);
    const size = product.sizes.includes('200g') ? '200g' : product.sizes[0];
    const unitPrice = getProductPrice(product, size, currentUser.tier);

    setCartItems((prev) => {
      const existing = prev.find((it) => it.product.id === product.id && it.size === size);
      if (existing) {
        return prev.map((it) =>
          it.product.id === product.id && it.size === size
            ? { ...it, quantity: it.quantity + 1 }
            : it
        );
      }
      return [
        ...prev,
        {
          product,
          size,
          grind: 'Espresso',
          tier: currentUser.tier,
          quantity: 1,
          unitPrice,
        },
      ];
    });
    setTimeout(() => setAddedProductId(null), 1500);
  };

  const handleAddToCartFromDetail = (item: CartItem, proceedToCheckout: boolean) => {
    setCartItems([item]);
    if (proceedToCheckout) {
      setCurrentScreen('checkout');
    }
  };

  const handleCompleteCheckout = (order: OrderState) => {
    setOrderState(order);
    setCurrentScreen('tracking');
  };

  // Admin actions
  const handleVerifyPayment = () => {
    setOrderState((prev) => ({
      ...prev,
      verificationStatus: 'verified',
      orderStep: Math.max(prev.orderStep, 2), // Step 2: Payment Verified
    }));
  };

  const handleRejectPayment = () => {
    setOrderState((prev) => ({
      ...prev,
      verificationStatus: 'rejected',
    }));
  };

  const handleUpdateCourierStatus = (
    courierStatus: 'idle' | 'searching' | 'assigned' | 'on_the_way',
    step: number,
    driver?: { name: string; plate: string; service: string },
    isPickup?: boolean
  ) => {
    setOrderState((prev) => ({
      ...prev,
      courierStatus,
      orderStep: Math.max(prev.orderStep, step),
      courierDriver: driver || prev.courierDriver,
      isReadyForPickup: isPickup !== undefined ? isPickup : prev.isReadyForPickup,
    }));
  };

  const handleUpdateStock = (productId: string, delta: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newStock = Math.max(0, p.stock + delta);
          let stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock' = 'in_stock';
          if (newStock <= 0) stockStatus = 'out_of_stock';
          else if (newStock <= 5) stockStatus = 'low_stock';
          return { ...p, stock: newStock, stockStatus };
        }
        return p;
      })
    );
  };

  const handleSaveProduct = (updated: Partial<Product>) => {
    const prodId = updated.id || `blend-${Date.now()}`;
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === prodId);
      if (exists) {
        return prev.map((p) => (p.id === prodId ? ({ ...p, ...updated } as Product) : p));
      }
      const newProduct: Product = {
        id: prodId,
        name: updated.name || 'New Coffee Blend',
        subtitle: updated.subtitle || 'Specialty Roast',
        category: updated.category || 'premium',
        roastLevel: updated.roastLevel || 'Medium Roast',
        blendRatio: '100% Arabica',
        tastingNotes: updated.tastingNotes || ['Chocolate', 'Smooth'],
        regularPrice: updated.regularPrice || 60000,
        memberPrice: updated.memberPrice || 55000,
        sizes: updated.sizes || ['200g', '500g', '1kg'],
        grinds: ['Whole Beans', 'Espresso', 'Filter', 'Coarse'],
        image: PRODUCTS[0].image,
        description: 'Small batch specialty roast from Patawi Brewspace Purwokerto.',
        origin: 'Purwokerto, Central Java',
        altitude: '1.200 MDPL',
        process: 'Washed',
        acidity: 3,
        body: 4,
        sweetness: 4,
        stock: updated.stock ?? 20,
        stockStatus: updated.stockStatus || 'in_stock',
      };
      return [...prev, newProduct];
    });
  };

  // Render Customer Screen content
  const renderCustomerScreen = (screen: ScreenId) => {
    switch (screen) {
      case 'home':
        return (
          <>
            <Header
              currentScreen={screen}
              cartCount={cartTotalQuantity}
              onNavigate={setCurrentScreen}
              onOpenNotifications={() => setIsNotificationsOpen(true)}
              onOpenAdmin={() => setActiveRole('admin')}
              currentUser={currentUser}
            />
            <ScreenHome
              products={products}
              onSelectProduct={handleSelectProduct}
              onAddToCartDirect={handleAddToCartDirect}
              onNavigate={setCurrentScreen}
              onSelectCategory={(cat) => setCatalogCategory(cat)}
              addedProductId={addedProductId}
            />
          </>
        );

      case 'catalog':
        return (
          <>
            <Header
              currentScreen={screen}
              cartCount={cartTotalQuantity}
              onNavigate={setCurrentScreen}
              onOpenNotifications={() => setIsNotificationsOpen(true)}
              onOpenAdmin={() => setActiveRole('admin')}
              title="Katalog Biji Kopi"
              showBack={true}
              onBack={() => setCurrentScreen('home')}
              currentUser={currentUser}
            />
            <ScreenCatalog
              products={products}
              onSelectProduct={handleSelectProduct}
              onAddToCartDirect={handleAddToCartDirect}
              onNavigate={setCurrentScreen}
              addedProductId={addedProductId}
              initialCategory={catalogCategory}
            />
          </>
        );

      case 'detail':
        return (
          <>
            <Header
              currentScreen={screen}
              cartCount={cartTotalQuantity}
              onNavigate={setCurrentScreen}
              onOpenNotifications={() => setIsNotificationsOpen(true)}
              onOpenAdmin={() => setActiveRole('admin')}
              title={selectedProduct.name}
              showBack={true}
              onBack={() => setCurrentScreen('catalog')}
              currentUser={currentUser}
            />
            <ScreenDetail
              product={selectedProduct}
              onAddToCart={handleAddToCartFromDetail}
              onBack={() => setCurrentScreen('catalog')}
              defaultTier={currentUser.tier}
            />
          </>
        );

      case 'checkout':
        return (
          <>
            <Header
              currentScreen={screen}
              cartCount={cartTotalQuantity}
              onNavigate={setCurrentScreen}
              onOpenNotifications={() => setIsNotificationsOpen(true)}
              onOpenAdmin={() => setActiveRole('admin')}
              title="Keranjang & Checkout"
              showBack={true}
              onBack={() => setCurrentScreen('catalog')}
              currentUser={currentUser}
            />
            <ScreenCheckout
              cartItems={cartItems}
              onCompleteCheckout={handleCompleteCheckout}
              onBack={() => setCurrentScreen('catalog')}
              customerInfo={orderState.customer}
            />
          </>
        );

      case 'tracking':
        return (
          <>
            <Header
              currentScreen={screen}
              cartCount={0}
              onNavigate={setCurrentScreen}
              onOpenNotifications={() => setIsNotificationsOpen(true)}
              onOpenAdmin={() => setActiveRole('admin')}
              title="Status Pesanan"
              showBack={true}
              onBack={() => setCurrentScreen('home')}
              currentUser={currentUser}
            />
            <ScreenTracking
              orderState={orderState}
              onRestartDemo={() => setCurrentScreen('home')}
            />
          </>
        );

      case 'profile':
        return (
          <>
            <Header
              currentScreen={screen}
              cartCount={cartTotalQuantity}
              onNavigate={setCurrentScreen}
              onOpenNotifications={() => setIsNotificationsOpen(true)}
              onOpenAdmin={() => setActiveRole('admin')}
              title="Profil Pengguna"
              showBack={true}
              onBack={() => setCurrentScreen('home')}
              currentUser={currentUser}
            />
            <ScreenProfile
              currentUser={currentUser}
              onUpdateProfile={handleUpdateProfile}
              onLogout={handleLogout}
              onNavigateAuth={() => setCurrentScreen('auth')}
              onSwitchToAdmin={() => setActiveRole('admin')}
              onNavigateOrder={() => setCurrentScreen('tracking')}
              orderState={orderState}
            />
          </>
        );

      case 'auth':
        return (
          <>
            <Header
              currentScreen={screen}
              cartCount={cartTotalQuantity}
              onNavigate={setCurrentScreen}
              onOpenNotifications={() => setIsNotificationsOpen(true)}
              onOpenAdmin={() => setActiveRole('admin')}
              title="Masuk / Daftar"
              showBack={true}
              onBack={() => setCurrentScreen('profile')}
              currentUser={currentUser}
            />
            <ScreenAuth
              onLogin={handleLogin}
              onNavigate={setCurrentScreen}
              onBack={() => setCurrentScreen('profile')}
            />
          </>
        );
    }
  };

  // Render Admin Screen content
  const renderAdminScreen = (screen: AdminScreenId) => {
    switch (screen) {
      case 'dashboard':
        return (
          <>
            <AdminHeader
              currentAdminScreen={screen}
              onNavigateAdmin={setCurrentAdminScreen}
              onSwitchToCustomer={() => setActiveRole('customer')}
              title="Patawi Admin Panel"
            />
            <AdminDashboard
              orderState={orderState}
              onVerifyPayment={handleVerifyPayment}
              onRejectPayment={handleRejectPayment}
              onNavigateAdmin={setCurrentAdminScreen}
            />
          </>
        );

      case 'dispatch':
        return (
          <>
            <AdminHeader
              currentAdminScreen={screen}
              onNavigateAdmin={setCurrentAdminScreen}
              onSwitchToCustomer={() => setActiveRole('customer')}
              title="Order Courier Dispatch"
              showBack={true}
              onBack={() => setCurrentAdminScreen('dashboard')}
            />
            <AdminDispatch
              orderState={orderState}
              onUpdateCourierStatus={handleUpdateCourierStatus}
              onBackToDashboard={() => setCurrentAdminScreen('dashboard')}
            />
          </>
        );

      case 'inventory':
        return (
          <>
            <AdminHeader
              currentAdminScreen={screen}
              onNavigateAdmin={setCurrentAdminScreen}
              onSwitchToCustomer={() => setActiveRole('customer')}
              title="Stock & Inventory"
              showBack={true}
              onBack={() => setCurrentAdminScreen('dashboard')}
            />
            <AdminInventory
              products={products}
              onUpdateStock={handleUpdateStock}
              onSaveProduct={handleSaveProduct}
              onBackToDashboard={() => setCurrentAdminScreen('dashboard')}
            />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-[#1A1A1A] flex flex-col items-center justify-start antialiased selection:bg-[#1A1A1A] selection:text-white">
      {/* Responsive layout: 100% full width on mobile, expands gracefully up to max-w-6xl on desktop */}
      <main className="w-full max-w-6xl min-h-screen bg-[#F8F9FA] shadow-xl sm:border-x sm:border-[#E5E7EB] flex flex-col relative mx-auto">
        {activeRole === 'customer'
          ? renderCustomerScreen(currentScreen)
          : renderAdminScreen(currentAdminScreen)}

        {/* Fixed 5-Tab Bottom Navigation Footer for Customer View (hidden on detail view to give full room to Add-to-Cart sticky bar) */}
        {activeRole === 'customer' && currentScreen !== 'detail' && (
          <BottomNavBar
            currentScreen={currentScreen}
            onNavigate={setCurrentScreen}
            cartCount={cartTotalQuantity}
            hasActiveOrder={true}
          />
        )}
      </main>

      {/* Notifications Drawer */}
      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </div>
  );
}
