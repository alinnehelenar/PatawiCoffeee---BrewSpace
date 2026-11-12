import React from 'react';
import { Bell, ArrowLeft } from 'lucide-react';
import { ScreenId, UserProfile, ActiveRole } from '../types';

interface HeaderProps {
  currentScreen?: ScreenId;
  activeRole: ActiveRole;
  onChangeRole: (role: ActiveRole) => void;
  onOpenNotifications: () => void;
  onNavigateProfile?: () => void;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  currentUser?: UserProfile;
}

export const Header: React.FC<HeaderProps> = ({
  activeRole,
  onChangeRole,
  onOpenNotifications,
  onNavigateProfile,
  title,
  showBack,
  onBack,
  currentUser,
}) => {
  return (
    <header className="bg-[#FAF8F5] text-[#1A1A1A] border-b border-[#EBE6DF] px-4 pt-3 pb-2.5 sm:px-6">
      {/* Top Brand & Profile Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {showBack && (
            <button
              onClick={onBack}
              aria-label="Kembali"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#4B5563] hover:text-[#1A1A1A] hover:bg-[#EFEAE2] transition-colors -ml-1 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          <div>
            <h1 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#1A1A1A] leading-none">
              Patawi
            </h1>
            <p className="text-[11px] font-medium tracking-wider text-[#7A6A5A] uppercase -mt-0.5">
              Coffee
            </p>
          </div>
        </div>

        {/* Right side: Notification bell & Avatar */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenNotifications}
            aria-label="Notifikasi Roastery"
            className="relative w-8 h-8 rounded-full flex items-center justify-center text-[#4A3E36] hover:bg-[#EFEAE2] transition-colors cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D97706] ring-2 ring-[#FAF8F5]" />
          </button>

          <button
            onClick={onNavigateProfile}
            aria-label="Profil Pengguna"
            className="w-8 h-8 rounded-full bg-[#E5DFD7] border border-[#D5CDC2] overflow-hidden flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-[#8B5A2B] transition-all"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt="Avatar"
              className="w-full h-full object-cover"
              onError={(e) => {
                // If offline or fails, show initials
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="text-xs font-bold text-[#4A3E36]">
              {currentUser?.name ? currentUser.name.charAt(0) : 'P'}
            </span>
          </button>
        </div>
      </div>

      {/* Role Switcher Pill Bar (Customer | Admin | Kurir) */}
      <div className="mt-2.5">
        <div className="grid grid-cols-3 p-1 rounded-2xl bg-[#ECE6DD] border border-[#DDD5C9] shadow-2xs">
          <button
            onClick={() => onChangeRole('customer')}
            className={`py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer text-center ${
              activeRole === 'customer'
                ? 'bg-[#1C1815] text-white shadow-xs'
                : 'text-[#6E5F52] hover:text-[#1A1A1A]'
            }`}
          >
            Customer
          </button>

          <button
            onClick={() => onChangeRole('admin')}
            className={`py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer text-center ${
              activeRole === 'admin'
                ? 'bg-[#1C1815] text-white shadow-xs'
                : 'text-[#6E5F52] hover:text-[#1A1A1A]'
            }`}
          >
            Admin
          </button>

          <button
            onClick={() => onChangeRole('kurir')}
            className={`py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer text-center ${
              activeRole === 'kurir'
                ? 'bg-[#1C1815] text-white shadow-xs'
                : 'text-[#6E5F52] hover:text-[#1A1A1A]'
            }`}
          >
            Kurir
          </button>
        </div>
      </div>
    </header>
  );
};
