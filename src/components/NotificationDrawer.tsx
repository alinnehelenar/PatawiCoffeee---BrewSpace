import React from 'react';
import { X, Bell, Coffee, Flame, Truck, Check } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-[#E5E7EB] shadow-2xl overflow-hidden flex flex-col">
        <div className="px-4 py-3 bg-[#F9FAFB] border-b border-[#E5E7EB] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#D95D39]" />
            <h3 className="font-display font-semibold text-sm text-[#111827]">
              Roastery Notifications
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close notifications"
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#6B7280] hover:text-[#111827] hover:bg-[#E5E7EB] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          <div className="p-3 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#D95D39] uppercase font-mono-numbers">
                FRESH ROAST
              </span>
              <span className="text-[10px] text-[#6B7280]">15 min ago</span>
            </div>
            <h4 className="text-xs font-semibold text-[#111827]">
              Fijne Dag 55 Just Dropped from Roaster
            </h4>
            <p className="text-[11px] text-[#4B5563]">
              Batch #55 is rested, packed, and ready for instant delivery in Purwokerto.
            </p>
          </div>

          <div className="p-3 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-emerald-700 uppercase font-mono-numbers">
                INSTANT DISPATCH
              </span>
              <span className="text-[10px] text-[#6B7280]">1 hour ago</span>
            </div>
            <h4 className="text-xs font-semibold text-[#111827]">
              GoSend & GrabExpress Couriers Active
            </h4>
            <p className="text-[11px] text-[#4B5563]">
              Instant local deliveries dispatched from Patawi Brewspace, Purwokerto.
            </p>
          </div>
        </div>

        <div className="p-3 bg-[#F9FAFB] border-t border-[#E5E7EB]">
          <button
            onClick={onClose}
            className="w-full py-2 bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#374151] hover:text-[#111827] text-xs font-medium rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
