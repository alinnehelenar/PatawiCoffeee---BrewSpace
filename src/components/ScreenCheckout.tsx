import React, { useState } from 'react';
import {
  MapPin,
  Truck,
  QrCode,
  CheckCircle2,
  ArrowRight,
  Store,
  Clock,
  Info,
} from 'lucide-react';
import { CartItem, CustomerInfo, DeliveryMethod, OrderState } from '../types';
import { DEFAULT_CUSTOMER } from '../data/products';
import { DELIVERY_FEES, formatRupiah } from '../utils/pricing';

interface ScreenCheckoutProps {
  cartItems: CartItem[];
  onCompleteCheckout: (orderState: OrderState) => void;
  onBack: () => void;
  customerInfo?: CustomerInfo;
}

export const ScreenCheckout: React.FC<ScreenCheckoutProps> = ({
  cartItems,
  onCompleteCheckout,
  onBack,
  customerInfo = DEFAULT_CUSTOMER,
}) => {
  const [customer, setCustomer] = useState<CustomerInfo>(customerInfo);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('gosend');
  const [paymentOption, setPaymentOption] = useState<'qris'>('qris');

  React.useEffect(() => {
    setCustomer(customerInfo);
  }, [customerInfo]);

  const totalItemCount =
    cartItems.length > 0 ? cartItems.reduce((acc, it) => acc + it.quantity, 0) : 2;
  const itemsSubtotal =
    cartItems.length > 0
      ? cartItems.reduce((acc, it) => acc + it.unitPrice * it.quantity, 0)
      : 110000;

  const shippingFee = DELIVERY_FEES[deliveryMethod];
  const totalPayment = itemsSubtotal + shippingFee;

  const handlePay = () => {
    const orderState: OrderState = {
      orderId: 'PBS-20261109-0012',
      customer,
      items: cartItems.length > 0 ? cartItems : [
        {
          product: {
            id: 'fijne-dag-55',
            name: 'Fijne Dag 55',
            subtitle: 'Premium Espresso Blend (Medium Roast)',
            category: 'premium',
            roastLevel: 'Medium Roast (25/75)',
            blendRatio: '25% Arabica / 75% Robusta',
            tastingNotes: ['Dark Chocolate', 'Toasted Hazelnut', 'Caramel Finish'],
            regularPrice: 60000,
            memberPrice: 55000,
            sizes: ['200g', '500g', '1kg'],
            grinds: ['Whole Beans', 'Espresso', 'Filter', 'Coarse'],
            image: '/src/assets/images/fijne_dag_bag_1794288956381.jpg',
            description: 'Engineered specifically for heavy crema and rich milk texture.',
            origin: 'Purwokerto, Central Java',
            altitude: '1.450 MDPL',
            process: 'Washed / Dry',
            acidity: 2,
            body: 5,
            sweetness: 4,
            stock: 24,
            stockStatus: 'in_stock',
          },
          size: '200g',
          grind: 'Espresso',
          tier: 'member',
          quantity: 2,
          unitPrice: 55000,
        },
      ],
      deliveryMethod,
      shippingFee,
      subtotal: itemsSubtotal,
      total: totalPayment,
      paymentMethod: 'qris',
      orderStep: 1, // Payment Pending
      verificationStatus: 'pending',
      courierStatus: 'idle',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      countdownSeconds: 14 * 60 + 59, // 14:59
      isReadyForPickup: deliveryMethod === 'pickup',
    };

    onCompleteCheckout(orderState);
  };

  return (
    <div className="bg-[#F8F9FA] text-[#1A1A1A] pb-32 min-h-screen font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 space-y-4">
        {/* Customer Information Card */}
        <section className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#F3F4F6] flex items-center justify-center text-[#1A1A1A]">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                {deliveryMethod === 'pickup' ? 'Informasi Kontak Pemesan' : 'Alamat Pengiriman'}
              </span>
            </div>
            <span className="text-[11px] font-mono-numbers px-2 py-0.5 rounded-md bg-[#F3F4F6] text-[#4B5563] font-medium">
              Alamat Utama
            </span>
          </div>

          <div className="pt-3 space-y-1">
            <div className="flex items-baseline justify-between">
              <h3 className="font-display font-bold text-sm text-[#1A1A1A]">
                {customer.name}
              </h3>
              <span className="text-xs text-[#6B7280] font-mono-numbers">
                {customer.phone}
              </span>
            </div>
            <p className="text-xs text-[#374151] leading-relaxed">
              {customer.address}
            </p>
            <p className="text-[11px] text-[#6B7280]">
              {customer.city} · {customer.postalCode}
            </p>
            {customer.notes && (
              <div className="mt-2 text-[11px] text-[#4B5563] bg-[#F8F9FA] p-2 rounded-lg border border-[#E5E7EB]">
                Catatan: {customer.notes}
              </div>
            )}
          </div>
        </section>

        {/* Delivery Method Selection */}
        <section className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#F3F4F6] flex items-center justify-center text-[#1A1A1A]">
                <Truck className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                Metode Pengiriman / Pengambilan
              </span>
            </div>
            <span className="text-[11px] text-[#6B7280]">Purwokerto Area</span>
          </div>

          <div className="pt-3 space-y-2">
            {/* 1. GoSend Instant */}
            <label
              onClick={() => setDeliveryMethod('gosend')}
              className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                deliveryMethod === 'gosend'
                  ? 'bg-[#FDFBF7] border-[#1A1A1A] ring-1 ring-[#1A1A1A] shadow-xs'
                  : 'bg-white border-[#E5E7EB] hover:border-[#D1D5DB]'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryMethod === 'gosend'}
                  onChange={() => setDeliveryMethod('gosend')}
                  className="accent-[#1A1A1A] w-4 h-4 cursor-pointer"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#1A1A1A]">
                      GoSend Instant
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 bg-[#8B5A2B]/10 text-[#8B5A2B] rounded-md font-bold">
                      TERCEPAT
                    </span>
                  </div>
                  <div className="text-[11px] text-[#6B7280] mt-0.5">
                    Estimasi tiba 30–45 menit radius Purwokerto
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-[#1A1A1A] font-mono-numbers">
                Rp 18.000
              </span>
            </label>

            {/* 2. GrabExpress Instant */}
            <label
              onClick={() => setDeliveryMethod('grab')}
              className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                deliveryMethod === 'grab'
                  ? 'bg-[#FDFBF7] border-[#1A1A1A] ring-1 ring-[#1A1A1A] shadow-xs'
                  : 'bg-white border-[#E5E7EB] hover:border-[#D1D5DB]'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryMethod === 'grab'}
                  onChange={() => setDeliveryMethod('grab')}
                  className="accent-[#1A1A1A] w-4 h-4 cursor-pointer"
                />
                <div>
                  <span className="text-xs font-semibold text-[#1A1A1A]">
                    GrabExpress Instant
                  </span>
                  <div className="text-[11px] text-[#6B7280] mt-0.5">
                    Estimasi tiba 35–50 menit
                  </div>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#4B5563] font-mono-numbers">
                Rp 19.000
              </span>
            </label>

            {/* 3. Ambil di Toko / Self Pick-Up - Patawi Purwokerto Utara (Requirement 2) */}
            <label
              onClick={() => setDeliveryMethod('pickup')}
              className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                deliveryMethod === 'pickup'
                  ? 'bg-[#FDFBF7] border-[#1A1A1A] ring-1 ring-[#1A1A1A] shadow-xs'
                  : 'bg-white border-[#E5E7EB] hover:border-[#D1D5DB]'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryMethod === 'pickup'}
                  onChange={() => setDeliveryMethod('pickup')}
                  className="accent-[#1A1A1A] w-4 h-4 cursor-pointer"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#1A1A1A]">
                      Ambil di Toko (Self Pick-Up - Patawi Purwokerto Utara)
                    </span>
                    <Store className="w-3.5 h-3.5 text-[#8B5A2B]" />
                  </div>
                  <div className="text-[11px] text-[#6B7280] mt-0.5">
                    Patawi Brewspace (Jl. Overste Isdiman No. 22)
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 font-mono-numbers">
                Gratis (Rp 0)
              </span>
            </label>

            {/* Self Pick-Up Instructions & Location Callout */}
            {deliveryMethod === 'pickup' && (
              <div className="mt-3 p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E8DFD5] text-xs text-[#374151] space-y-2 animate-in fade-in duration-150">
                <div className="flex items-center gap-2 font-bold text-[#1A1A1A]">
                  <Store className="w-4 h-4 text-[#8B5A2B]" />
                  <span>Petunjuk Pengambilan Langsung di Roastery:</span>
                </div>
                <div className="space-y-1.5 pl-6 text-[11px] leading-relaxed text-[#4B5563]">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#8B5A2B] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#1A1A1A]">Lokasi Roastery:</strong> Patawi Brewspace, Jl. Overste Isdiman No. 22, Purwokerto Utara, Kab. Banyumas.
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#8B5A2B] shrink-0" />
                    <span>
                      <strong className="text-[#1A1A1A]">Jam Operasional:</strong> Buka setiap hari pukul 08:00 – 22:00 WIB.
                    </span>
                  </div>
                  <div className="flex items-start gap-1.5 pt-0.5">
                    <Info className="w-3.5 h-3.5 text-[#8B5A2B] shrink-0 mt-0.5" />
                    <span>
                      Tunjukkan <strong>Nomor Pesanan (Order ID)</strong> ke barista / kasir saat tiba di roastery. Paket biji kopi Anda sudah disiapkan fresh roast tanpa perlu mengantre.
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Order Summary Card */}
        <section className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
              Ringkasan Pesanan
            </span>
            <span className="text-[11px] text-[#6B7280] font-mono-numbers">
              {totalItemCount} Item
            </span>
          </div>

          <div className="pt-3 space-y-2.5">
            {cartItems.length > 0 ? (
              cartItems.map((item, idx) => (
                <div key={idx} className="flex items-start justify-between text-xs">
                  <div>
                    <div className="font-semibold text-[#1A1A1A]">
                      {item.quantity}x {item.product.name}
                    </div>
                    <div className="text-[11px] text-[#6B7280]">
                      {item.size} · {item.grind} Grind · {item.tier === 'member' ? 'VIP Member Tier' : 'Regular Tier'}
                    </div>
                  </div>
                  <span className="font-mono-numbers font-semibold text-[#1A1A1A]">
                    {formatRupiah(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))
            ) : (
              <div className="flex items-start justify-between text-xs">
                <div>
                  <div className="font-semibold text-[#1A1A1A]">
                    2x Fijne Dag 55
                  </div>
                  <div className="text-[11px] text-[#6B7280]">
                    200g · Espresso Grind · Member Tier
                  </div>
                </div>
                <span className="font-mono-numbers font-semibold text-[#1A1A1A]">
                  {formatRupiah(110000)}
                </span>
              </div>
            )}

            {/* Shipping line item */}
            <div className="flex items-center justify-between text-xs pt-2 border-t border-[#F3F4F6]">
              <span className="text-[#6B7280]">
                {deliveryMethod === 'pickup'
                  ? 'Pengambilan di Toko (Purwokerto Utara)'
                  : deliveryMethod === 'grab'
                  ? 'Ongkos Kirim (GrabExpress Instant)'
                  : 'Ongkos Kirim (GoSend Instant)'}
              </span>
              <span className="font-mono-numbers font-medium text-[#1A1A1A]">
                {shippingFee === 0 ? (
                  <span className="text-emerald-700 font-bold">Gratis (Rp 0)</span>
                ) : (
                  formatRupiah(shippingFee)
                )}
              </span>
            </div>

            {/* Total Payment */}
            <div className="flex items-baseline justify-between text-sm pt-2.5 border-t border-[#E5E7EB]">
              <span className="font-display font-bold text-[#1A1A1A]">
                Total Pembayaran
              </span>
              <span className="font-display font-bold text-base text-[#1A1A1A] font-mono-numbers">
                {formatRupiah(totalPayment)}
              </span>
            </div>
          </div>
        </section>

        {/* Payment Option: QRIS */}
        <section className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#F3F4F6] flex items-center justify-center text-[#1A1A1A]">
                <QrCode className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                Metode Pembayaran
              </span>
            </div>
            <span className="text-[10px] bg-[#1A1A1A] text-white px-2 py-0.5 rounded-md font-bold">
              INSTANT QRIS
            </span>
          </div>

          <div className="pt-3">
            <label
              onClick={() => setPaymentOption('qris')}
              className="flex items-center justify-between p-3.5 rounded-xl bg-[#F8F9FA] border border-[#1A1A1A] cursor-pointer shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentOption === 'qris'}
                  readOnly
                  className="accent-[#1A1A1A] w-4 h-4 cursor-pointer"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#1A1A1A] tracking-wide">
                      QRIS (Quick Response Code Indonesia Standard)
                    </span>
                  </div>
                  <div className="text-[11px] text-[#6B7280] mt-0.5">
                    Mendukung BCA, GoPay, OVO, ShopeePay, Mandiri, Dana, LinkAja
                  </div>
                </div>
              </div>
              <CheckCircle2 className="w-4 h-4 text-[#8B5A2B] shrink-0" />
            </label>
          </div>
        </section>

        {/* Primary Checkout Button in Sleek Patawi Matte Black */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handlePay}
            className="w-full h-12 bg-[#1A1A1A] hover:bg-[#2C2C2C] active:scale-[0.98] text-white font-semibold text-xs sm:text-sm tracking-tight rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <QrCode className="w-4 h-4 text-[#C49A6C]" />
            <span>Bayar Sekarang ({formatRupiah(totalPayment)})</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};
