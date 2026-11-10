import React from 'react';
import { Bell, ShoppingBag, ArrowLeft, ArrowRightLeft } from 'lucide-react';
import { ScreenId, UserProfile } from '../types';

interface HeaderProps {
  currentScreen: ScreenId;
  cartCount: number;
  onNavigate: (screen: ScreenId) => void;
  onOpenNotifications: () => void;
  onOpenAdmin: () => void;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  currentUser?: UserProfile;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  cartCount,
  onNavigate,
  onOpenNotifications,
  onOpenAdmin,
  title,
  showBack,
  onBack,
  currentUser,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md text-[#1A1A1A] border-b border-[#E5E7EB] shadow-2xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-2">
        {/* Left slot: Back button or Brand Wordmark */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {showBack ? (
            <button
              onClick={onBack}
              aria-label="Go back"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#4B5563] hover:text-[#1A1A1A] hover:bg-[#F3F4F6] transition-colors shrink-0 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          ) : null}

          {title ? (
            <div className="flex items-center gap-2 truncate">
              <h1 className="font-display font-bold text-sm text-[#1A1A1A] truncate tracking-tight">
                {title}
              </h1>
              {currentUser && (
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-md text-[9px] font-bold uppercase font-mono-numbers bg-[#F3F4F6] text-[#1A1A1A] border border-[#E5E7EB]">
                  {currentUser.name.split(' ')[0]} · {currentUser.tier.toUpperCase()}
                </span>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 min-w-0">
              <button
                onClick={() => onNavigate('home')}
                className="text-left font-display font-black text-sm tracking-tight text-[#1A1A1A] hover:text-[#8B5A2B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                PATAWI BREWSPACE
              </button>
              {currentUser && (
                <button
                  type="button"
                  onClick={() => onNavigate('profile')}
                  className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F8F9FA] hover:bg-[#F3F4F6] text-[#1A1A1A] border border-[#E5E7EB] transition-all cursor-pointer truncate max-w-[140px] sm:max-w-[200px]"
                  title={`Akun: ${currentUser.name} (${currentUser.tier})`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B5A2B]" />
                  <span className="truncate">{currentUser.name}</span>
                  {currentUser.tier === 'member' && (
                    <span className="text-[8px] px-1 py-0.2 bg-[#1A1A1A] text-white rounded-xs font-bold">
                      VIP
                    </span>
                  )}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right slot: Switch Role button + Notifications + Cart */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Authentic Clean Switch Role Button */}
          <button
            onClick={onOpenAdmin}
            aria-label="Switch Role to Admin"
            title="Switch Role to Admin / Owner View"
            className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold tracking-tight text-[#1A1A1A] hover:text-white bg-[#F8F9FA] hover:bg-[#1A1A1A] rounded-lg border border-[#E5E7EB] hover:border-[#1A1A1A] transition-all cursor-pointer shadow-2xs active:scale-95"
          >
            <ArrowRightLeft className="w-3 h-3 text-[#8B5A2B]" />
            <span>Switch Role</span>
          </button>

          {/* Notification Bell */}
          <button
            onClick={onOpenNotifications}
            aria-label="Notifications"
            className="relative w-8 h-8 rounded-full flex items-center justify-center text-[#4B5563] hover:text-[#1A1A1A] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#8B5A2B]" />
          </button>

          {/* Shopping Cart with Badge */}
          <button
            onClick={() => onNavigate('checkout')}
            aria-label={`Shopping cart with ${cartCount} items`}
            className="relative w-8 h-8 rounded-full flex items-center justify-center text-[#4B5563] hover:text-[#1A1A1A] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 bg-[#1A1A1A] text-white text-[10px] font-bold rounded-full flex items-center justify-center font-mono-numbers shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
