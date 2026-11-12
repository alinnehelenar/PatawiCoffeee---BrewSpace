import React, { useState } from 'react';
import { X, Download, Mail, Check, QrCode } from 'lucide-react';
import { OrderState } from '../types';
import { formatRupiah } from '../utils/pricing';

interface DigitalInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderState: OrderState;
}

export const DigitalInvoiceModal: React.FC<DigitalInvoiceModalProps> = ({
  isOpen,
  onClose,
  orderState,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownloadPdf = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const handleSendEmail = () => {
    setEmailSuccess(true);
    setTimeout(() => setEmailSuccess(false), 2500);
  };

  const discount = orderState.couponDiscount || 20000;
  const shipping = orderState.deliveryMethod === 'pickup' ? 0 : orderState.shippingFee || 15000;
  const subtotal = orderState.subtotal || 95000;
  const total = Math.max(0, subtotal - discount + shipping);
  const tax = Math.round((total * 11) / 111);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl border border-[#EBE6DF] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top bar with Status Dot */}
        <div className="px-5 py-3.5 bg-[#FAF8F5] border-b border-[#EBE6DF] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]">
              FAKTUR PEMBELIAN RESMI
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup faktur"
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#7A6A5A] hover:text-[#1A1A1A] hover:bg-[#EAE4DC] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Invoice Body */}
        <div className="p-5 overflow-y-auto custom-scrollbar space-y-4 text-xs text-[#1A1A1A]">
          {/* Header Info */}
          <div className="flex items-start justify-between border-b border-[#F3EFEA] pb-3.5 gap-2">
            <div>
              <h2 className="font-serif font-bold text-base text-[#1A1A1A] leading-tight">
                Patawi Coffee
              </h2>
              <p className="text-[10px] text-[#7A6A5A] font-medium">
                Specialty Coffee Roastery & Lab
              </p>
              <p className="text-[10px] text-[#7A6A5A] mt-0.5">
                Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan 12190
              </p>
              <p className="text-[10px] text-[#7A6A5A] font-mono-numbers">
                NPWP: 09.876.543.2-012.000
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="font-bold text-xs font-mono-numbers text-[#1A1A1A] block">
                {orderState.orderId}
              </span>
              <span className="text-[10px] text-[#7A6A5A] block mt-0.5">
                Hari ini • 01:09 WIB
              </span>
              <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0] mt-1">
                <Check className="w-3 h-3 stroke-[3]" />
                <span>LUNAS (QRIS BCA)</span>
              </span>
            </div>
          </div>

          {/* Recipient & Delivery Meta */}
          <div className="grid grid-cols-2 gap-3 bg-[#FAF8F5] p-3 rounded-2xl border border-[#EFEAE2] text-[11px]">
            <div>
              <span className="text-[9px] uppercase font-bold text-[#7A6A5A] block">
                PENERIMA / PEMESAN:
              </span>
              <strong className="text-[#1A1A1A] block mt-0.5 font-semibold">
                {orderState.customer.name}
              </strong>
              <span className="text-[#7A6A5A] block">{orderState.customer.email || 'budi.pratama@gmail.com'}</span>
              <span className="text-[10px] text-[#D97706] font-medium block mt-0.5">
                {orderState.customer.isGuest ? 'Pelanggan Tamu (Guest)' : 'Member Patawi'}
              </span>
            </div>

            <div>
              <span className="text-[9px] uppercase font-bold text-[#7A6A5A] block">
                METODE PENGIRIMAN:
              </span>
              <strong className="text-[#1A1A1A] block mt-0.5 font-semibold">
                {orderState.deliveryMethod === 'pickup'
                  ? 'Ambil di Toko (Self Pick-up)'
                  : 'GoSend Instant Delivery'}
              </strong>
              <span className="text-[#7A6A5A] block line-clamp-2">
                {orderState.deliveryMethod === 'pickup'
                  ? 'Outlet Roastery Senopati Flagship'
                  : orderState.customer.address}
              </span>
            </div>
          </div>

          {/* Item Table */}
          <div className="border border-[#EBE6DF] rounded-2xl overflow-hidden">
            <div className="bg-[#FAF8F5] px-3.5 py-2 border-b border-[#EBE6DF] flex items-center justify-between text-[10px] font-bold text-[#7A6A5A] uppercase">
              <span className="flex-1">BIJI KOPI & PROFIL</span>
              <span className="w-12 text-center">QTY</span>
              <span className="w-20 text-right">SUBTOTAL</span>
            </div>

            <div className="divide-y divide-[#F3EFEA] p-1">
              {orderState.items.map((it, idx) => (
                <div key={idx} className="px-2.5 py-2 flex items-center justify-between text-xs">
                  <div className="flex-1 pr-2">
                    <div className="font-bold text-[#1A1A1A]">{it.product.name}</div>
                    <div className="text-[10px] text-[#7A6A5A]">
                      Kemasan {it.size} • {it.grind}
                    </div>
                  </div>
                  <span className="w-12 text-center font-mono-numbers text-[#1A1A1A]">
                    {it.quantity}x
                  </span>
                  <span className="w-20 text-right font-bold font-mono-numbers text-[#1A1A1A]">
                    {formatRupiah(it.unitPrice * it.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="space-y-1.5 pt-1 text-xs text-[#55473C] border-t border-[#F3EFEA]">
            <div className="flex items-center justify-between">
              <span>Subtotal Produk</span>
              <span className="font-mono-numbers text-[#1A1A1A]">{formatRupiah(subtotal)}</span>
            </div>

            {discount > 0 && (
              <div className="flex items-center justify-between text-[#B91C1C]">
                <span>Diskon Kupon Promo</span>
                <span className="font-mono-numbers">- {formatRupiah(discount)}</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span>Ongkos Kirim Ekspedisi</span>
              <span className="font-mono-numbers text-[#1A1A1A]">{formatRupiah(shipping)}</span>
            </div>

            <div className="flex items-center justify-between text-[10px] text-[#7A6A5A]">
              <span>Termasuk PPN 11% (Inklusif)</span>
              <span className="font-mono-numbers">{formatRupiah(tax)}</span>
            </div>

            <div className="pt-2 border-t border-[#E8E2D9] flex items-baseline justify-between font-bold text-sm text-[#1A1A1A]">
              <span className="uppercase text-xs tracking-wider">TOTAL PEMBAYARAN</span>
              <span className="font-serif text-base text-[#D97706] font-mono-numbers">
                {formatRupiah(total)}
              </span>
            </div>
          </div>

          {/* QR Validation Code & Digital Signature */}
          <div className="pt-2 border-t border-[#F3EFEA] flex items-center justify-between gap-3 text-[10px] text-[#7A6A5A]">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-[#FAF8F5] border border-[#DDD5C9] flex items-center justify-center text-[#1A1A1A]">
                <QrCode className="w-6 h-6 text-[#1A1A1A]" />
              </div>
              <div>
                <span className="font-bold text-[#1A1A1A] block">Faktur Digital Sah</span>
                <span>Divalidasi Roastery Patawi Senopati</span>
              </div>
            </div>

            <div className="text-right">
              <span className="italic font-serif font-bold text-xs text-[#1A1A1A] block">
                Budi Santoso
              </span>
              <span>Head Roaster & Station Manager</span>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 bg-[#FAF8F5] border-t border-[#EBE6DF] grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={handleDownloadPdf}
            className="py-2.5 px-3 bg-[#1C1815] hover:bg-[#332A24] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                <span className="text-emerald-300">Telah Diunduh</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Unduh PDF</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleSendEmail}
            className="py-2.5 px-3 bg-white hover:bg-[#FAF8F5] text-[#1A1A1A] text-xs font-semibold rounded-xl border border-[#D5CDC2] flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-95"
          >
            {emailSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                <span className="text-emerald-700">Terkirim ke Email</span>
              </>
            ) : (
              <>
                <Mail className="w-3.5 h-3.5 text-[#8C6239]" />
                <span>Kirim ke Email</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
