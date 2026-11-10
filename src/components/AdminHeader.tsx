import React from 'react';
import { ArrowLeft, ArrowRightLeft, Package, LayoutDashboard, Truck } from 'lucide-react';
import { AdminScreenId } from '../types';

interface AdminHeaderProps {
  currentAdminScreen: AdminScreenId;
  onNavigateAdmin: (screen: AdminScreenId) => void;
  onSwitchToCustomer: () => void;
  showBack?: boolean;
  onBack?: () => void;
  title?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  currentAdminScreen,
  onNavigateAdmin,
  onSwitchToCustomer,
  showBack,
  onBack,
  title,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md text-[#1A1A1A] border-b border-[#E5E7EB] shadow-2xs font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        {/* Top Bar: Title & Role Switcher */}
        <div className="flex items-center justify-between gap-1.5">
          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            {showBack ? (
              <button
                onClick={onBack}
                aria-label="Back to dashboard"
                className="w-7 h-7 rounded-full flex items-center justify-center text-[#4B5563] hover:text-[#1A1A1A] hover:bg-[#F3F4F6] transition-colors shrink-0 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            ) : null}

            <div className="flex items-center gap-1.5 min-w-0">
              <span className="font-display font-bold text-xs sm:text-sm tracking-tight text-[#1A1A1A] whitespace-nowrap">
                {title || 'Patawi Admin'}
              </span>
              <span className="px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider uppercase bg-[#1A1A1A] text-white shrink-0 font-mono-numbers">
                OWNER
              </span>
            </div>
          </div>

          {/* Visible prominent toggle to Customer View */}
          <button
            onClick={onSwitchToCustomer}
            aria-label="Switch Role to Customer View"
            className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold tracking-tight text-white bg-[#1A1A1A] hover:bg-[#2C2C2C] active:scale-95 rounded-lg shadow-xs transition-all shrink-0 cursor-pointer whitespace-nowrap"
          >
            <ArrowRightLeft className="w-3 h-3 text-[#C49A6C]" />
            <span>Switch Role</span>
          </button>
        </div>

        {/* Subnav Pills for Admin screens */}
        <div className="mt-2 pt-2 border-t border-[#F3F4F6] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => onNavigateAdmin('dashboard')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1 whitespace-nowrap cursor-pointer ${
              currentAdminScreen === 'dashboard'
                ? 'bg-[#1A1A1A] text-white shadow-xs font-semibold'
                : 'text-[#6B7280] hover:text-[#1A1A1A] hover:bg-[#F8F9FA]'
            }`}
          >
            <LayoutDashboard className={`w-3 h-3 ${currentAdminScreen === 'dashboard' ? 'text-[#C49A6C]' : 'text-[#8B5A2B]'}`} />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => onNavigateAdmin('dispatch')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1 whitespace-nowrap cursor-pointer ${
              currentAdminScreen === 'dispatch'
                ? 'bg-[#1A1A1A] text-white shadow-xs font-semibold'
                : 'text-[#6B7280] hover:text-[#1A1A1A] hover:bg-[#F8F9FA]'
            }`}
          >
            <Truck className={`w-3 h-3 ${currentAdminScreen === 'dispatch' ? 'text-[#C49A6C]' : 'text-[#8B5A2B]'}`} />
            <span>Dispatch (PBS-0012)</span>
          </button>

          <button
            onClick={() => onNavigateAdmin('inventory')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1 whitespace-nowrap cursor-pointer ${
              currentAdminScreen === 'inventory'
                ? 'bg-[#1A1A1A] text-white shadow-xs font-semibold'
                : 'text-[#6B7280] hover:text-[#1A1A1A] hover:bg-[#F8F9FA]'
            }`}
          >
            <Package className={`w-3 h-3 ${currentAdminScreen === 'inventory' ? 'text-[#C49A6C]' : 'text-[#8B5A2B]'}`} />
            <span>Stock & Catalog</span>
          </button>
        </div>
      </div>
    </header>
  );
};
