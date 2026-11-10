import React, { useState } from 'react';
import {
  Truck,
  MapPin,
  Clock,
  Check,
  User,
  Coffee,
  Store,
  ChevronRight,
  ShieldCheck,
  ArrowRight,
  Phone,
  AlertCircle,
} from 'lucide-react';
import { OrderState } from '../types';
import { formatRupiah } from '../utils/pricing';

interface AdminDispatchProps {
  orderState: OrderState;
  onUpdateCourierStatus: (
    status: 'idle' | 'searching' | 'assigned' | 'on_the_way',
    step: number,
    driver?: { name: string; plate: string; service: string },
    isPickup?: boolean
  ) => void;
  onBackToDashboard: () => void;
}

export const AdminDispatch: React.FC<AdminDispatchProps> = ({
  orderState,
  onUpdateCourierStatus,
  onBackToDashboard,
}) => {
  const [courierState, setCourierState] = useState<'idle' | 'searching' | 'assigned' | 'on_the_way'>(
    orderState.courierStatus || 'idle'
  );
  const [isReadyForPickup, setIsReadyForPickup] = useState<boolean>(
    orderState.isReadyForPickup || false
  );

  // Simulated live courier progression:
  // "Searching Driver..." -> "Driver Assigned: Budi (GoSend) - H 1234 AB" -> "On the Way"
  const handleBookCourier = () => {
    setCourierState('searching');
    onUpdateCourierStatus('searching', 3);

    // After 1.5s, driver assigned: Budi (GoSend) - H 1234 AB
    setTimeout(() => {
      const driver = {
        name: 'Budi (GoSend)',
        plate: 'H 1234 AB',
        service: 'GoSend Instant',
      };
      setCourierState('assigned');
      onUpdateCourierStatus('assigned', 4, driver);

      // After 2.5s, courier on the way
      setTimeout(() => {
        setCourierState('on_the_way');
        onUpdateCourierStatus('on_the_way', 5, driver);
      }, 2500);
    }, 1500);
  };

  const handleTogglePickup = () => {
    const nextVal = !isReadyForPickup;
    setIsReadyForPickup(nextVal);
    onUpdateCourierStatus(
      nextVal ? 'assigned' : 'idle',
      nextVal ? 4 : 3,
      undefined,
      nextVal
    );
  };

  return (
    <div className="bg-[#F9FAFB] text-[#111827] pb-24 select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 space-y-4">
        {/* Order Header Card */}
        <section className="bg-white rounded-2xl p-4 border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
            <div>
              <span className="text-[10px] text-[#6B7280] uppercase font-mono-numbers">
                Order Reference
              </span>
              <h2 className="font-display font-bold text-base text-[#111827] font-mono-numbers">
                {orderState.orderId}
              </h2>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 font-mono-numbers">
              VERIFIED
            </span>
          </div>

          {/* Details for Order PBS-20261109-0012 (Items: 2x Fijne Dag 55, Total: Rp 128.000) */}
          <div className="pt-3 space-y-2 text-xs">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-semibold text-[#111827]">Items Ordered:</span>
                <p className="text-[11px] text-[#4B5563] mt-0.5">
                  2x Fijne Dag 55 (200g, Espresso Grind)
                </p>
              </div>
              <span className="font-mono-numbers font-bold text-[#111827]">
                Rp 110.000
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#F3F4F6]">
              <span className="text-[#6B7280]">Shipping (GoSend Instant):</span>
              <span className="font-mono-numbers text-[#111827]">Rp 18.000</span>
            </div>

            <div className="flex items-baseline justify-between pt-2 border-t border-[#E5E7EB] text-sm">
              <span className="font-display font-bold text-[#111827]">Total Payment:</span>
              <span className="font-display font-bold text-base text-[#D95D39] font-mono-numbers">
                Rp 128.000
              </span>
            </div>
          </div>
        </section>

        {/* Delivery Info: GoSend Instant selected by customer */}
        <section className="bg-white rounded-2xl p-4 border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#FFF7ED] flex items-center justify-center text-[#D95D39]">
                <Truck className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                Delivery Info & Destination
              </span>
            </div>
            <span className="text-[10px] bg-[#FFF7ED] text-[#D95D39] border border-[#FED7AA] font-bold px-2 py-0.5 rounded">
              GoSend Instant
            </span>
          </div>

          <div className="pt-3 space-y-2 text-xs">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-bold text-[#111827]">{orderState.customer.name}</div>
                <div className="text-[11px] text-[#6B7280] font-mono-numbers mt-0.5">
                  {orderState.customer.phone}
                </div>
              </div>
              <a
                href={`tel:${orderState.customer.phone}`}
                className="px-2.5 py-1 bg-[#F3F4F6] hover:bg-[#E5E7EB] rounded-lg text-[11px] text-[#374151] flex items-center gap-1 border border-[#E5E7EB] transition-colors"
              >
                <Phone className="w-3 h-3 text-[#D95D39]" />
                <span>Call</span>
              </a>
            </div>

            <p className="text-[#374151] leading-relaxed text-[11px]">
              {orderState.customer.address}, {orderState.customer.city} · {orderState.customer.postalCode}
            </p>
            <div className="text-[11px] text-[#6B7280] bg-[#F9FAFB] p-2 rounded-lg border border-[#E5E7EB]">
              Note: {orderState.customer.notes}
            </div>
          </div>
        </section>

        {/* Dispatch Action & Courier Controls */}
        <section className="bg-white rounded-2xl p-4 border border-[#E5E7EB] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
              Dispatch Action & Logistics
            </span>
            <span className="text-[10px] text-[#6B7280]">Purwokerto Hub</span>
          </div>

          {/* Courier Action Buttons */}
          <div className="space-y-3">
            {/* Button "Book GoSend Courier (Rp 18.000)" in Burnt Orange */}
            <button
              onClick={handleBookCourier}
              disabled={courierState === 'searching' || courierState === 'on_the_way'}
              className={`w-full h-12 rounded-xl text-white font-semibold text-xs tracking-tight flex items-center justify-center gap-2 shadow-sm transition-all ${
                courierState === 'searching'
                  ? 'bg-[#9CA3AF] text-white cursor-not-allowed'
                  : courierState === 'on_the_way'
                  ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-200'
                  : 'bg-[#D95D39] hover:bg-[#C44D2B] active:scale-[0.98] shadow-orange-200 cursor-pointer'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>
                {courierState === 'idle'
                  ? 'Book GoSend Courier (Rp 18.000)'
                  : courierState === 'searching'
                  ? 'Searching Nearby Drivers in Purwokerto...'
                  : courierState === 'assigned'
                  ? 'Driver Assigned — Preparing Pickup'
                  : 'Courier Dispatched & On the Way'}
              </span>
            </button>

            {/* Toggle Option: "Mark Ready for Pick-Up" (for self pick-up orders) */}
            <div className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
              <div className="flex items-center gap-2.5">
                <Store className="w-4 h-4 text-[#D95D39]" />
                <div>
                  <div className="text-xs font-semibold text-[#111827]">
                    Mark Ready for Pick-Up
                  </div>
                  <div className="text-[10px] text-[#6B7280]">
                    For self pick-up orders at Patawi Roastery
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleTogglePickup}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  isReadyForPickup ? 'bg-[#D95D39]' : 'bg-[#D1D5DB]'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-xs transition-transform ${
                    isReadyForPickup ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Simulated Courier Live Status:
              "Searching Driver..." -> "Driver Assigned: Budi (GoSend) - H 1234 AB" -> "On the Way"
          */}
          <div className="pt-2">
            <span className="text-[10px] uppercase font-bold text-[#6B7280] tracking-wider block mb-2">
              Live Courier Telemetry
            </span>

            <div className="p-3 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] space-y-2.5">
              {courierState === 'idle' && (
                <div className="text-xs text-[#6B7280] flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#9CA3AF]" />
                  <span>Ready to dispatch. Tap "Book GoSend Courier" above.</span>
                </div>
              )}

              {courierState === 'searching' && (
                <div className="flex items-center gap-2 text-xs text-amber-600">
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  <span className="font-semibold">Searching Driver...</span>
                  <span className="text-[10px] text-[#6B7280] ml-auto">
                    Scanning 2km Purwokerto radius
                  </span>
                </div>
              )}

              {courierState === 'assigned' && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-emerald-700">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span className="font-bold">
                      Driver Assigned: Budi (GoSend) - H 1234 AB
                    </span>
                  </div>
                  <p className="text-[11px] text-[#4B5563] pl-5">
                    Motor Honda Vario 160 · Arriving at roastery in 4 mins
                  </p>
                </div>
              )}

              {courierState === 'on_the_way' && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-[#D95D39]">
                    <Truck className="w-4 h-4 animate-bounce" />
                    <span className="font-bold text-[#111827]">On the Way</span>
                    <span className="text-[10px] bg-[#FFF7ED] text-[#D95D39] border border-[#FED7AA] px-2 py-0.5 rounded ml-auto font-mono-numbers font-medium">
                      ETA 18 MINS
                    </span>
                  </div>
                  <p className="text-[11px] text-[#4B5563] pl-6">
                    Driver Budi (H 1234 AB) has picked up the beans from Patawi Roastery and is delivering to Arcawinangun.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Back to Dashboard Navigation */}
        <div className="pt-2">
          <button
            onClick={onBackToDashboard}
            className="w-full py-2.5 rounded-xl bg-white hover:bg-[#F3F4F6] text-xs font-medium text-[#4B5563] hover:text-[#111827] border border-[#E5E7EB] shadow-xs transition-colors cursor-pointer"
          >
            ← Back to Admin Order Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
