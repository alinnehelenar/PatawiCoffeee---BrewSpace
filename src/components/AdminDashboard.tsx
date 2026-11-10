import React from 'react';
import {
  TrendingUp,
  Clock,
  PackageCheck,
  Check,
  X,
  ChevronRight,
  ArrowRight,
  AlertCircle,
  QrCode,
  Truck,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { OrderState, AdminScreenId } from '../types';
import { formatRupiah } from '../utils/pricing';

interface AdminDashboardProps {
  orderState: OrderState;
  onVerifyPayment: () => void;
  onRejectPayment: () => void;
  onNavigateAdmin: (screen: AdminScreenId) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  orderState,
  onVerifyPayment,
  onRejectPayment,
  onNavigateAdmin,
}) => {
  const isPendingVerification = orderState.verificationStatus === 'pending';
  const isVerified = orderState.verificationStatus === 'verified';
  const isRejected = orderState.verificationStatus === 'rejected';

  return (
    <div className="bg-[#F8F9FA] text-[#1A1A1A] pb-24 select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 space-y-4">
        {/* Quick Metrics Cards: Today's Sales (Rp 1.250.000), Pending QRIS (1), Ready to Ship (3) */}
        <section className="grid grid-cols-3 gap-2">
          {/* Today's Sales */}
          <div className="bg-white rounded-2xl p-3 border border-[#E5E7EB] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[#6B7280] tracking-wider">
                Sales Today
              </span>
              <TrendingUp className="w-3.5 h-3.5 text-[#8B5A2B]" />
            </div>
            <div className="mt-2">
              <div className="font-display font-bold text-xs sm:text-sm text-[#1A1A1A] font-mono-numbers">
                Rp 1.250.000
              </div>
              <span className="text-[9px] text-emerald-600 font-medium">
                +14% vs yesterday
              </span>
            </div>
          </div>

          {/* Pending QRIS */}
          <div className="bg-white rounded-2xl p-3 border border-[#E5E7EB] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[#6B7280] tracking-wider">
                Pending QRIS
              </span>
              <Clock className="w-3.5 h-3.5 text-[#8B5A2B]" />
            </div>
            <div className="mt-2">
              <div className="font-display font-bold text-sm sm:text-base text-[#1A1A1A] font-mono-numbers">
                {isPendingVerification ? '1' : '0'}
              </div>
              <span className="text-[9px] text-[#6B7280]">
                {isPendingVerification ? 'Requires check' : 'All clear'}
              </span>
            </div>
          </div>

          {/* Ready to Ship */}
          <div className="bg-white rounded-2xl p-3 border border-[#E5E7EB] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[#6B7280] tracking-wider">
                Ready to Ship
              </span>
              <PackageCheck className="w-3.5 h-3.5 text-[#1A1A1A]" />
            </div>
            <div className="mt-2">
              <div className="font-display font-bold text-sm sm:text-base text-[#1A1A1A] font-mono-numbers">
                {isVerified ? '4' : '3'}
              </div>
              <span className="text-[9px] text-[#6B7280]">
                Purwokerto local
              </span>
            </div>
          </div>
        </section>

        {/* Order List Header */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
              Active Orders & Verification
            </span>
          </div>
          <span className="text-[11px] text-[#6B7280] font-mono-numbers">
            Batch #55 Today
          </span>
        </div>

        {/* Featured Order: Rina Kartika (PBS-20261109-0012) */}
        <section className="bg-white rounded-2xl p-4 border border-[#E5E7EB] shadow-xs relative overflow-hidden">
          {/* Subtle indicator bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#1A1A1A]" />

          {/* Header */}
          <div className="flex items-start justify-between pb-3 border-b border-[#F3F4F6]">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-sm text-[#1A1A1A] font-mono-numbers">
                  {orderState.orderId}
                </span>
                <span className="text-[9px] bg-[#F5EBE1] text-[#8B5A2B] px-1.5 py-0.5 rounded border border-[#E6D5C3] font-mono-numbers font-medium">
                  QRIS Instant
                </span>
              </div>
              <div className="text-xs font-semibold text-[#1A1A1A] mt-1">
                {orderState.customer.name}{' '}
                <span className="text-[11px] font-normal text-[#6B7280] font-mono-numbers">
                  ({orderState.customer.phone})
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="text-right">
              <div className="font-display font-bold text-sm text-[#1A1A1A] font-mono-numbers">
                {formatRupiah(orderState.total || 128000)}
              </div>
              <div className="text-[10px] text-[#6B7280]">
                {orderState.deliveryMethod === 'pickup' ? 'Ambil di Toko (Gratis)' : 'GoSend Instant (Rp 18.000)'}
              </div>
            </div>
          </div>

          {/* Order Content Details */}
          <div className="py-3 space-y-1.5 border-b border-[#F3F4F6] text-xs">
            <div className="flex items-center justify-between text-[#374151]">
              <span>2x Fijne Dag 55 (200g, Espresso Grind)</span>
              <span className="font-mono-numbers font-medium text-[#1A1A1A]">Rp 110.000</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#6B7280]">
              <MapPin className="w-3 h-3 text-[#8B5A2B] shrink-0" />
              <span className="truncate">{orderState.customer.address}, {orderState.customer.city}</span>
            </div>
          </div>

          {/* Status Badge & Actions */}
          <div className="pt-3">
            {isPendingVerification ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#6B7280] font-medium">Status:</span>
                  {/* Status Badge: "Payment Verification Needed" */}
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F5EBE1] text-[#8B5A2B] border border-[#E6D5C3] flex items-center gap-1.5 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B5A2B]" />
                    Payment Verification Needed
                  </span>
                </div>

                {/* Action Buttons: "Verify Payment" and "Reject" */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={onVerifyPayment}
                    className="h-10 bg-[#1A1A1A] hover:bg-black active:scale-95 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Verify Payment</span>
                  </button>

                  <button
                    onClick={onRejectPayment}
                    className="h-10 bg-[#F3F4F6] hover:bg-[#E5E7EB] active:scale-95 text-[#4B5563] hover:text-[#1A1A1A] text-xs font-medium rounded-xl flex items-center justify-center gap-1.5 border border-[#E5E7EB] transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            ) : isVerified ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#6B7280]">Status:</span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                    Payment Verified ({formatRupiah(orderState.total || 128000)})
                  </span>
                </div>

                {/* Advance to Dispatch button */}
                <button
                  onClick={() => onNavigateAdmin('dispatch')}
                  className="w-full h-10 bg-[#F8F9FA] hover:bg-[#F3F4F6] text-[#1A1A1A] text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 border border-[#E5E7EB] transition-colors cursor-pointer"
                >
                  <Truck className="w-3.5 h-3.5 text-[#8B5A2B]" />
                  <span>Open Courier Dispatch Screen</span>
                  <ChevronRight className="w-4 h-4 text-[#6B7280] ml-auto" />
                </button>
              </div>
            ) : (
              <div className="p-2.5 bg-red-50 rounded-xl border border-red-200 text-center">
                <span className="text-xs text-red-600 font-medium">Order Rejected / Invalid Settlement</span>
              </div>
            )}
          </div>
        </section>

        {/* Other Orders in Queue for Realism */}
        <div className="space-y-2 pt-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
            Other Recent Roastery Orders
          </span>

          <div className="p-3 bg-white rounded-xl border border-[#E5E7EB] shadow-xs flex items-center justify-between text-xs">
            <div>
              <div className="font-semibold text-[#1A1A1A]">
                Agus Wicaksono · PBS-20261109-0010
              </div>
              <div className="text-[10px] text-[#6B7280]">
                1x Fijne Dag 73 (500g) · GrabExpress
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono-numbers font-medium">
              In Courier
            </span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-[#E5E7EB] shadow-xs flex items-center justify-between text-xs">
            <div>
              <div className="font-semibold text-[#1A1A1A]">
                Dimas Tri · PBS-20261109-0008
              </div>
              <div className="text-[10px] text-[#6B7280]">
                1x Fijne Dag 55 (1kg) · Ambil di Toko
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] bg-[#F5EBE1] text-[#8B5A2B] border border-[#E6D5C3] font-mono-numbers font-medium">
              Ready Pick-Up
            </span>
          </div>
        </div>

        {/* Quick Nav to Inventory */}
        <div className="pt-2">
          <button
            onClick={() => onNavigateAdmin('inventory')}
            className="w-full p-3 rounded-xl bg-white hover:bg-[#F3F4F6] border border-[#E5E7EB] shadow-xs flex items-center justify-between text-xs text-[#374151] hover:text-[#1A1A1A] transition-colors cursor-pointer"
          >
            <span>Manage Product Catalog & Stock (24 units Fijne Dag)</span>
            <ArrowRight className="w-4 h-4 text-[#8B5A2B]" />
          </button>
        </div>
      </div>
    </div>
  );
};
