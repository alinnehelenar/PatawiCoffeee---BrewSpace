import React from 'react';
import {
  Home,
  BookOpen,
  ShoppingBag,
  Clock,
  User,
  Package,
  BarChart3,
  Coffee,
  Bike,
  CheckCircle,
  TrendingUp,
} from 'lucide-react';
import { ScreenId, ActiveRole, AdminTab, CourierTab } from '../types';

interface BottomNavBarProps {
  currentScreen?: ScreenId;
  onNavigateCustomer: (screen: ScreenId) => void;
  cartCount: number;
  hasActiveOrder?: boolean;
  activeRole: ActiveRole;
  currentAdminTab?: AdminTab;
  onNavigateAdmin?: (tab: AdminTab) => void;
  currentCourierTab?: CourierTab;
  onNavigateCourier?: (tab: CourierTab) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentScreen = 'home',
  onNavigateCustomer,
  cartCount,
  activeRole,
  currentAdminTab = 'stok',
  onNavigateAdmin,
  currentCourierTab = 'tugas',
  onNavigateCourier,
}) => {
  // 1. Customer Navigation (5 Tabs matching Image 1)
  if (activeRole === 'customer') {
    return (
      <nav
        aria-label="Bottom Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-[#EBE6DF] shadow-lg py-1.5 px-4"
      >
        <div className="max-w-md mx-auto grid grid-cols-5 items-center gap-1">
          {/* 1. Beranda */}
          <button
            onClick={() => onNavigateCustomer('home')}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
              currentScreen === 'home'
                ? 'bg-[#1C1815] text-white shadow-xs'
                : 'text-[#7A6A5A] hover:text-[#1A1A1A]'
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="text-[10px] font-semibold mt-0.5">Beranda</span>
          </button>

          {/* 2. Katalog */}
          <button
            onClick={() => onNavigateCustomer('catalog')}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
              currentScreen === 'catalog'
                ? 'bg-[#1C1815] text-white shadow-xs'
                : 'text-[#7A6A5A] hover:text-[#1A1A1A]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-[10px] font-semibold mt-0.5">Katalog</span>
          </button>

          {/* 3. Keranjang */}
          <button
            onClick={() => onNavigateCustomer('checkout')}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer relative ${
              currentScreen === 'checkout'
                ? 'bg-[#1C1815] text-white shadow-xs'
                : 'text-[#7A6A5A] hover:text-[#1A1A1A]'
            }`}
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 min-w-[14px] h-[14px] px-1 bg-[#D97706] text-white text-[9px] font-bold rounded-full flex items-center justify-center font-mono-numbers">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-semibold mt-0.5">Keranjang</span>
          </button>

          {/* 4. Pesanan */}
          <button
            onClick={() => onNavigateCustomer('tracking')}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer relative ${
              currentScreen === 'tracking'
                ? 'bg-[#1C1815] text-white shadow-xs'
                : 'text-[#7A6A5A] hover:text-[#1A1A1A]'
            }`}
          >
            <div className="relative">
              <Clock className="w-4 h-4" />
              <span className="absolute -top-1 -right-2 min-w-[14px] h-[14px] px-1 bg-[#D97706] text-white text-[9px] font-bold rounded-full flex items-center justify-center font-mono-numbers">
                4
              </span>
            </div>
            <span className="text-[10px] font-semibold mt-0.5">Pesanan</span>
          </button>

          {/* 5. Profil */}
          <button
            onClick={() => onNavigateCustomer('profile')}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
              currentScreen === 'profile'
                ? 'bg-[#1C1815] text-white shadow-xs'
                : 'text-[#7A6A5A] hover:text-[#1A1A1A]'
            }`}
          >
            <User className="w-4 h-4" />
            <span className="text-[10px] font-semibold mt-0.5">Profil</span>
          </button>
        </div>
      </nav>
    );
  }

  // 2. Admin Navigation (4 Tabs matching Image 3)
  if (activeRole === 'admin') {
    return (
      <nav
        aria-label="Admin Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-[#EBE6DF] shadow-lg py-1.5 px-4"
      >
        <div className="max-w-md mx-auto grid grid-cols-4 items-center gap-1">
          {/* Antrean */}
          <button
            onClick={() => onNavigateAdmin?.('antrean')}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer relative ${
              currentAdminTab === 'antrean'
                ? 'bg-[#1C1815] text-white shadow-xs'
                : 'text-[#7A6A5A] hover:text-[#1A1A1A]'
            }`}
          >
            <div className="relative">
              <Clock className="w-4 h-4" />
              <span className="absolute -top-1 -right-2 min-w-[14px] h-[14px] px-1 bg-[#D97706] text-white text-[9px] font-bold rounded-full flex items-center justify-center font-mono-numbers">
                2
              </span>
            </div>
            <span className="text-[10px] font-semibold mt-0.5">Antrean</span>
          </button>

          {/* Stok Biji */}
          <button
            onClick={() => onNavigateAdmin?.('stok')}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
              currentAdminTab === 'stok'
                ? 'bg-[#1C1815] text-white shadow-xs'
                : 'text-[#7A6A5A] hover:text-[#1A1A1A]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span className="text-[10px] font-semibold mt-0.5">Stok Biji</span>
          </button>

          {/* Laporan */}
          <button
            onClick={() => onNavigateAdmin?.('laporan')}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
              currentAdminTab === 'laporan'
                ? 'bg-[#1C1815] text-white shadow-xs'
                : 'text-[#7A6A5A] hover:text-[#1A1A1A]'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span className="text-[10px] font-semibold mt-0.5">Laporan</span>
          </button>

          {/* Roaster */}
          <button
            onClick={() => onNavigateAdmin?.('roaster')}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
              currentAdminTab === 'roaster'
                ? 'bg-[#1C1815] text-white shadow-xs'
                : 'text-[#7A6A5A] hover:text-[#1A1A1A]'
            }`}
          >
            <Coffee className="w-4 h-4" />
            <span className="text-[10px] font-semibold mt-0.5">Roaster</span>
          </button>
        </div>
      </nav>
    );
  }

  // 3. Courier Navigation (4 Tabs matching Image 2 Screen 6)
  return (
    <nav
      aria-label="Courier Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-[#EBE6DF] shadow-lg py-1.5 px-4"
    >
      <div className="max-w-md mx-auto grid grid-cols-4 items-center gap-1">
        {/* Tugas Antar */}
        <button
          onClick={() => onNavigateCourier?.('tugas')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer relative ${
            currentCourierTab === 'tugas'
              ? 'bg-[#8C6239] text-white shadow-xs'
              : 'text-[#7A6A5A] hover:text-[#1A1A1A]'
          }`}
        >
          <div className="relative">
            <Bike className="w-4 h-4" />
            <span className="absolute -top-1 -right-2 min-w-[14px] h-[14px] px-1 bg-[#D97706] text-white text-[9px] font-bold rounded-full flex items-center justify-center font-mono-numbers">
              3
            </span>
          </div>
          <span className="text-[10px] font-semibold mt-0.5">Tugas Antar</span>
        </button>

        {/* Riwayat */}
        <button
          onClick={() => onNavigateCourier?.('riwayat')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
            currentCourierTab === 'riwayat'
              ? 'bg-[#8C6239] text-white shadow-xs'
              : 'text-[#7A6A5A] hover:text-[#1A1A1A]'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span className="text-[10px] font-semibold mt-0.5">Riwayat</span>
        </button>

        {/* Performa */}
        <button
          onClick={() => onNavigateCourier?.('performa')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
            currentCourierTab === 'performa'
              ? 'bg-[#8C6239] text-white shadow-xs'
              : 'text-[#7A6A5A] hover:text-[#1A1A1A]'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span className="text-[10px] font-semibold mt-0.5">Performa</span>
        </button>

        {/* Akun Kurir */}
        <button
          onClick={() => onNavigateCourier?.('akun')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
            currentCourierTab === 'akun'
              ? 'bg-[#8C6239] text-white shadow-xs'
              : 'text-[#7A6A5A] hover:text-[#1A1A1A]'
          }`}
        >
          <User className="w-4 h-4" />
          <span className="text-[10px] font-semibold mt-0.5">Akun Kurir</span>
        </button>
      </div>
    </nav>
  );
};
