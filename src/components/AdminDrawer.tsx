import React from 'react';
import { X, Flame, Truck, Coffee, CheckCircle2, ShieldCheck, ArrowLeft, RefreshCw } from 'lucide-react';

interface AdminDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  orderId?: string;
}

export const AdminDrawer: React.FC<AdminDrawerProps> = ({
  isOpen,
  onClose,
  orderId = 'PBS-20261109-0012',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md bg-[#171717] rounded-2xl border border-[#333333] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-[#121212] border-b border-[#262626] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#D95D39]/20 flex items-center justify-center text-[#D95D39]">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display font-bold text-sm text-white">
                Patawi Roastery — Admin View
              </h2>
              <p className="text-[10px] text-[#A3A3A3]">
                Purwokerto Facility Operator Console
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close admin view"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#A3A3A3] hover:text-white hover:bg-[#262626] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 overflow-y-auto custom-scrollbar text-xs">
          {/* Roaster Machine Telemetry */}
          <div className="bg-[#1F1F1F] rounded-xl p-3.5 border border-[#2E2E2E]">
            <div className="flex items-center justify-between pb-2 border-b border-[#2A2A2A]">
              <span className="font-semibold text-white uppercase text-[10px] tracking-wider">
                Drum Roaster Probat UG22
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono-numbers">
                DRUM 204°C · READY
              </span>
            </div>
            <div className="mt-2.5 grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-[#737373]">Current Batch:</span>
                <p className="font-semibold text-[#E5E5E5] font-mono-numbers">
                  Fijne Dag 55 (Batch #55)
                </p>
              </div>
              <div>
                <span className="text-[#737373]">Profile Target:</span>
                <p className="font-semibold text-[#D95D39]">
                  Medium Roast (25/75)
                </p>
              </div>
            </div>
          </div>

          {/* Incoming Customer Order Queue */}
          <div className="bg-[#1F1F1F] rounded-xl p-3.5 border border-[#2E2E2E]">
            <div className="flex items-center justify-between pb-2 border-b border-[#2A2A2A]">
              <span className="font-semibold text-white uppercase text-[10px] tracking-wider">
                Live Customer Dispatch Queue
              </span>
              <span className="text-[10px] text-[#D95D39] font-mono-numbers font-bold">
                1 Pending
              </span>
            </div>

            <div className="mt-3 p-3 bg-[#171717] rounded-lg border border-[#2A2A2A] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white font-mono-numbers">
                  {orderId}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#D95D39]/20 text-[#D95D39] font-semibold">
                  QRIS Verified
                </span>
              </div>
              <div className="text-[11px] text-[#E5E5E5]">
                <strong>Rina Kartika</strong> (+62 812-3456-7890)
                <p className="text-[10px] text-[#737373]">
                  Arcawinangun, Purwokerto Timur · GoSend Instant
                </p>
              </div>
              <div className="p-2 bg-[#222222] rounded border border-[#2D2D2D] text-[11px] text-[#A3A3A3] flex items-center justify-between">
                <span>2x Fijne Dag 55 (200g, Espresso)</span>
                <span className="font-mono-numbers text-white font-bold">
                  Rp 128.000
                </span>
              </div>
            </div>
          </div>

          {/* Role Presentation Notice */}
          <div className="p-3 bg-[#242424] rounded-xl border border-[#333333] text-[11px] text-[#A3A3A3]">
            <div className="flex items-center gap-1.5 text-white font-semibold mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D95D39]" />
              <span>Presentation Mode Active</span>
            </div>
            This admin view allows reviewers to see how roasters in Purwokerto receive and fulfill the customer flow order in real time.
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#121212] border-t border-[#262626]">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#D95D39] hover:bg-[#C44D2B] active:scale-[0.98] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Switch Back to Customer Flow</span>
          </button>
        </div>
      </div>
    </div>
  );
};
