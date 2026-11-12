import React from 'react';
import { Check, Mail, FileText, Send, Home } from 'lucide-react';
import { OrderState } from '../types';
import { formatRupiah } from '../utils/pricing';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderState: OrderState;
  onOpenInvoice: () => void;
  onTrackOrder: () => void;
  onBackToHome: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  orderState,
  onOpenInvoice,
  onTrackOrder,
  onBackToHome,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-md bg-[#FAF8F5] rounded-t-3xl sm:rounded-3xl border border-[#EBE6DF] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        <div className="p-5 sm:p-6 text-center overflow-y-auto custom-scrollbar">
          {/* Green Check Circle */}
          <div className="w-16 h-16 rounded-full bg-[#ECFDF5] border-2 border-[#10B981] flex items-center justify-center mx-auto mb-3 shadow-sm">
            <Check className="w-8 h-8 text-[#10B981] stroke-[2.5]" />
          </div>

          {/* Badge: # PEMBAYARAN QRIS BERHASIL */}
          <div className="inline-block px-3 py-1 rounded-full bg-[#FFF7ED] border border-[#FED7AA] text-[#C2410C] text-[10px] font-bold uppercase tracking-wider mb-2">
            # PEMBAYARAN QRIS BERHASIL
          </div>

          {/* Title */}
          <h2 className="font-serif font-bold text-xl text-[#1A1A1A] tracking-tight">
            Pesanan Diterima Roastery!
          </h2>
          <p className="text-xs text-[#6E5F52] mt-1 max-w-xs mx-auto leading-relaxed">
            Batch pesanan {orderState.orderId} telah masuk ke antrean stasiun roasting Senopati.
          </p>

          {/* Automated Invoice Alert Card */}
          <div className="mt-4 p-3.5 bg-white rounded-2xl border border-[#E8E2D9] text-left shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1A1A1A] mb-1">
              <Mail className="w-4 h-4 text-[#D97706]" />
              <span>Invoice Terkirim Otomatis</span>
            </div>
            <p className="text-[11px] text-[#55473C] leading-snug">
              Faktur digital resmi beserta rincian pesanan telah dikirimkan ke:{' '}
              <strong className="text-[#1A1A1A] font-semibold">
                {orderState.customer.email || 'budi.pratama@gmail.com'}
              </strong>
            </p>
          </div>

          {/* Summary Details */}
          <div className="mt-3.5 bg-white rounded-2xl border border-[#E8E2D9] p-3.5 text-left text-xs space-y-2.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[#7A6A5A]">Nomor Pesanan:</span>
              <span className="font-bold text-[#1A1A1A] font-mono-numbers">
                {orderState.orderId}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#7A6A5A]">Penerima Paket:</span>
              <span className="font-medium text-[#1A1A1A]">
                {orderState.customer.name} {orderState.customer.isGuest ? '(Tamu)' : ''}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#7A6A5A]">Layanan Pengiriman:</span>
              <span className="font-medium text-[#1A1A1A]">
                {orderState.deliveryMethod === 'pickup'
                  ? 'Ambil di Toko (Self Pick-up)'
                  : 'GoSend Instant Delivery (25 - 45 mnt)'}
              </span>
            </div>

            <div className="pt-2 border-t border-[#F3EFEA] flex items-baseline justify-between">
              <span className="font-bold text-[#1A1A1A]">Total Pembayaran:</span>
              <span className="font-serif font-bold text-base text-[#D97706] font-mono-numbers">
                {formatRupiah(orderState.total)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-5 space-y-2.5">
            {/* Button 1: Lihat Pratinjau Invoice Resmi Digital */}
            <button
              type="button"
              onClick={onOpenInvoice}
              className="w-full py-2.5 px-4 bg-white hover:bg-[#FAF8F5] text-[#1A1A1A] text-xs font-semibold rounded-xl border border-[#D5CDC2] shadow-2xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#8C6239]" />
              <span>Lihat Pratinjau Invoice Resmi Digital</span>
            </button>

            {/* Button 2: Lacak Status Pengiriman Real-Time */}
            <button
              type="button"
              onClick={onTrackOrder}
              className="w-full py-3 px-4 bg-[#1C1815] hover:bg-[#332A24] text-white text-xs font-semibold rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#D97706]" />
              <span>Lacak Status Pengiriman Real-Time</span>
            </button>

            {/* Button 3: Kembali Belanja ke Beranda */}
            <button
              type="button"
              onClick={onBackToHome}
              className="w-full py-2 text-xs font-medium text-[#7A6A5A] hover:text-[#1A1A1A] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Kembali Belanja ke Beranda</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
