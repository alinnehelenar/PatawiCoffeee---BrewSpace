import React from 'react';
import { Home, Coffee, ShoppingBag, Package, User } from 'lucide-react';
import { ScreenId } from '../types';

interface BottomNavBarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  cartCount: number;
  hasActiveOrder?: boolean;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentScreen,
  onNavigate,
  cartCount,
  hasActiveOrder = true,
}) => {
  const tabs = [
    {
      id: 'home' as ScreenId,
      label: 'Beranda',
      icon: Home,
    },
    {
      id: 'catalog' as ScreenId,
      label: 'Katalog',
      icon: Coffee,
    },
    {
      id: 'checkout' as ScreenId,
      label: 'Keranjang',
      icon: ShoppingBag,
      badge: cartCount > 0 ? cartCount : undefined,
    },
    {
      id: 'tracking' as ScreenId,
      label: 'Pesanan',
      icon: Package,
      hasDot: hasActiveOrder,
    },
    {
      id: 'profile' as ScreenId,
      label: 'Profil',
      icon: User,
    },
  ];

  return (
    <nav
      aria-label="Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#E5E7EB] shadow-lg select-none"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-around px-2 py-1.5 sm:py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            currentScreen === tab.id ||
            (tab.id === 'catalog' && currentScreen === 'detail') ||
            (tab.id === 'profile' && currentScreen === 'auth');

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onNavigate(tab.id)}
              className={`flex-1 py-1 px-1 flex flex-col items-center justify-center transition-all cursor-pointer relative ${
                isActive
                  ? 'text-[#1A1A1A] font-bold'
                  : 'text-[#6B7280] hover:text-[#1A1A1A]'
              }`}
            >
              {/* Icon Container with optional badges */}
              <div className="relative flex items-center justify-center">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.4] text-[#1A1A1A]' : 'stroke-[1.8]'
                  }`}
                />

                {/* Cart Badge */}
                {tab.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[17px] h-[17px] px-1 bg-[#1A1A1A] text-white text-[10px] font-bold rounded-full flex items-center justify-center font-mono-numbers shadow-xs">
                    {tab.badge}
                  </span>
                )}

                {/* Order Active Dot Indicator */}
                {tab.hasDot && !tab.badge && (
                  <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-[#8B5A2B] ring-2 ring-white animate-pulse" />
                )}
              </div>

              {/* Label */}
              <span
                className={`text-[10px] sm:text-[11px] mt-1 tracking-tight leading-none ${
                  isActive ? 'text-[#1A1A1A] font-bold' : 'font-medium'
                }`}
              >
                {tab.label}
              </span>

              {/* Active Tab Indicator Bar */}
              {isActive && (
                <span className="w-4 h-0.5 rounded-full bg-[#1A1A1A] mt-1" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
