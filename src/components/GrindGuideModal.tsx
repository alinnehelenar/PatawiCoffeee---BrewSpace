import React from 'react';
import { X, Coffee, Zap } from 'lucide-react';
import { GRIND_OPTIONS } from '../data/products';

interface GrindGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GrindGuideModal: React.FC<GrindGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-md bg-[#FAF8F5] rounded-t-3xl sm:rounded-3xl border border-[#EBE6DF] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-[#FAF8F5] border-b border-[#EBE6DF] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#1C1815] text-white flex items-center justify-center">
              <Coffee className="w-4 h-4 text-[#D97706]" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm text-[#1A1A1A]">
                Panduan Profil Gilingan
              </h3>
              <p className="text-[10px] text-[#7A6A5A]">
                Patawi Roastery Senopati
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup panduan gilingan"
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#7A6A5A] hover:text-[#1A1A1A] hover:bg-[#ECE6DD] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-4 space-y-3 overflow-y-auto custom-scrollbar">
          {GRIND_OPTIONS.map((opt) => (
            <div
              key={opt.id}
              className={`p-3.5 rounded-2xl border transition-all ${
                opt.badge
                  ? 'bg-[#FFFBF5] border-[#D97706] shadow-xs'
                  : 'bg-white border-[#E8E2D9]'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-[#7A6A5A]" />
                  <span className="font-bold text-xs text-[#1A1A1A]">{opt.name}</span>
                </div>
                {opt.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FEE2E2] text-[#B91C1C] font-semibold border border-[#FECACA]">
                    {opt.badge}
                  </span>
                )}
              </div>

              <p className="text-[11px] text-[#55473C] leading-relaxed mb-2.5">
                {opt.description}
              </p>

              <div className="flex items-start gap-1 text-[10px] text-[#8C6239] bg-[#FAF5EE] p-2 rounded-xl border border-[#EFE5D7]">
                <Zap className="w-3 h-3 text-[#D97706] shrink-0 mt-0.5" />
                <span>
                  <strong className="font-semibold">Cocok untuk:</strong> {opt.suitableFor}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#FAF8F5] border-t border-[#EBE6DF]">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#1C1815] hover:bg-[#332A24] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer"
          >
            Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
};
