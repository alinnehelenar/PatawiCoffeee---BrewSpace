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
  Tag,
  Check,
} from 'lucide-react';
import { CartItem, CustomerInfo, DeliveryMethod, OrderState } from '../types';
import { DEFAULT_CUSTOMER } from '../data/products';
import { formatRupiah } from '../utils/pricing';
import {
  MAX_DELIVERY_RADIUS_KM,
  DEFAULT_DELIVERY_DISTANCE_KM,
  isWithinDeliveryRadius,
} from '../utils/delivery';

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
  const [couponCode, setCouponCode] = useState<string>('BEANS20');
  const [isCouponApplied, setIsCouponApplied] = useState<boolean>(true);
  const [deliveryDistanceKm, setDeliveryDistanceKm] = useState<number>(DEFAULT_DELIVERY_DISTANCE_KM);

  const isDeliveryEligible = isWithinDeliveryRadius(deliveryDistanceKm, MAX_DELIVERY_RADIUS_KM);

  React.useEffect(() => {
    setCustomer(customerInfo);
  }, [customerInfo]);

  const totalItemCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);
  const itemsSubtotal = cartItems.reduce((acc, it) => acc + it.unitPrice * it.quantity, 0);

  const couponDiscount = isCouponApplied ? 20000 : 0;
  const shippingFee = deliveryMethod === 'pickup' ? 0 : 15000;
  const totalPayment = Math.max(0, itemsSubtotal - couponDiscount + shippingFee);
  const taxAmount = Math.round((totalPayment * 11) / 111);

  const handlePay = () => {
    const orderState: OrderState = {
      orderId: '#PTW-74747',
      invoiceNumber: '#PTW-74747',
      customer,
      items: cartItems,
      deliveryMethod,
      shippingFee,
      couponDiscount,
      subtotal: itemsSubtotal,
      taxAmount,
      total: totalPayment,
      paymentMethod: 'qris',
      orderStep: 2, // Payment Verified
      verificationStatus: 'verified',
      courierStatus: 'menuju_outlet',
      courierDriver: {
        name: 'Rian Hidayat',
        plate: 'B 4521 SRX',
        service: 'Kurir Instan Independen (Radius 5 km)',
        phone: '+62 813-9876-5432',
      },
      createdAt: 'Hari ini • 01:09 WIB',
    };

    onCompleteCheckout(orderState);
  };

  return (
    <div className="bg-[#FAF8F5] text-[#1A1A1A] pb-32 min-h-screen font-sans select-none">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 space-y-4">
        {/* Customer Information Card */}
        <section className="bg-white rounded-3xl p-4 sm:p-5 border border-[#EBE6DF] shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#F3EFEA]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#FAF5EE] flex items-center justify-center text-[#8C6239]">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#55473C]">
                {deliveryMethod === 'pickup' ? 'Informasi Kontak Pemesan' : 'Alamat Pengiriman'}
              </span>
            </div>
            <span className="text-[11px] font-mono-numbers px-2 py-0.5 rounded-full bg-[#FAF5EE] text-[#8C6239] font-medium border border-[#EFE5D7]">
              Alamat Utama
            </span>
          </div>

          <div className="pt-3 space-y-1">
            <div className="flex items-baseline justify-between">
              <h3 className="font-bold text-sm text-[#1A1A1A]">{customer.name}</h3>
              <span className="text-xs text-[#7A6A5A] font-mono-numbers">{customer.phone}</span>
            </div>
            <p className="text-xs text-[#55473C] leading-relaxed">{customer.address}</p>
            <p className="text-[11px] text-[#7A6A5A]">
              {customer.city} · {customer.postalCode}
            </p>
            {customer.notes && (
              <div className="mt-2 text-[11px] text-[#6E5F52] bg-[#FAF8F5] p-2 rounded-xl border border-[#EBE6DF]">
                Catatan: {customer.notes}
              </div>
            )}
          </div>
        </section>

        {/* Delivery Method Selection */}
        <section className="bg-white rounded-3xl p-4 sm:p-5 border border-[#EBE6DF] shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#F3EFEA]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#FAF5EE] flex items-center justify-center text-[#8C6239]">
                <Truck className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#55473C]">
                Metode Pengiriman / Pengambilan
              </span>
            </div>
            <span className="text-[11px] text-[#7A6A5A]">Senopati &amp; Sekitarnya</span>
          </div>

          {/* 5 KM Restriction Policy Alert */}
          <div className="mt-3 p-3 bg-[#FAF8F5] rounded-2xl border border-[#E8DFD5] space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-1">
              <span className="text-[11px] font-bold text-[#1A1A1A] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                Sistem Pengiriman Independen (Radius Maks. 5.0 km)
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono-numbers ${
                  isDeliveryEligible
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                {isDeliveryEligible
                  ? `Jarak ${deliveryDistanceKm} km: Memenuhi Syarat`
                  : `Jarak ${deliveryDistanceKm} km: Di Luar Batas 5 km`}
              </span>
            </div>

            <p className="text-[11px] text-[#6E5F52] leading-relaxed">
              Mitra kurir logistik independen hanya melayani area pengantaran maksimal radius 5 km dari outlet roastery untuk menjaga kualitas fresh roast.
            </p>

            {/* Simulated Distance Checker */}
            <div className="pt-1 flex items-center justify-between text-[10px] text-[#7A6A5A] border-t border-[#EFEAE2]">
              <span>Simulasi Jarak Pengantaran:</span>
              <div className="flex items-center gap-1.5 font-mono-numbers">
                <button
                  type="button"
                  onClick={() => {
                    setDeliveryDistanceKm(2.8);
                    setDeliveryMethod('gosend');
                  }}
                  className={`px-2 py-0.5 rounded-lg border text-[10px] font-semibold cursor-pointer transition-colors ${
                    deliveryDistanceKm <= 5
                      ? 'bg-[#1C1815] text-white border-[#1C1815]'
                      : 'bg-white text-[#55473C] border-[#DDD5C9] hover:bg-[#FAF8F5]'
                  }`}
                >
                  2.8 km (Aman)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDeliveryDistanceKm(6.4);
                    setDeliveryMethod('pickup');
                  }}
                  className={`px-2 py-0.5 rounded-lg border text-[10px] font-semibold cursor-pointer transition-colors ${
                    deliveryDistanceKm > 5
                      ? 'bg-[#B91C1C] text-white border-[#B91C1C]'
                      : 'bg-white text-[#55473C] border-[#DDD5C9] hover:bg-[#FAF8F5]'
                  }`}
                >
                  6.4 km (&gt;5 km)
                </button>
              </div>
            </div>
          </div>

          <div className="pt-3 space-y-2">
            {/* 1. GoSend Instant (Kurir Independen) */}
            <label
              onClick={() => {
                if (isDeliveryEligible) {
                  setDeliveryMethod('gosend');
                }
              }}
              className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                !isDeliveryEligible
                  ? 'opacity-50 cursor-not-allowed bg-gray-50 border-gray-200'
                  : deliveryMethod === 'gosend'
                  ? 'bg-[#FFFBF5] border-[#D97706] ring-1 ring-[#D97706] shadow-xs cursor-pointer'
                  : 'bg-white border-[#EBE6DF] hover:border-[#D5CDC2] cursor-pointer'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="delivery"
                  disabled={!isDeliveryEligible}
                  checked={deliveryMethod === 'gosend' && isDeliveryEligible}
                  onChange={() => {
                    if (isDeliveryEligible) setDeliveryMethod('gosend');
                  }}
                  className="accent-[#D97706] w-4 h-4 cursor-pointer"
                />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-[#1A1A1A]">
                      Kurir Instan Independen (GoSend)
                    </span>
                    <span className="text-[9px] px-2 py-0.5 bg-[#FFF7ED] text-[#C2410C] rounded-full font-bold border border-[#FED7AA]">
                      MAKS. 5 KM
                    </span>
                  </div>
                  <div className="text-[11px] text-[#7A6A5A] mt-0.5">
                    {isDeliveryEligible
                      ? `Jarak ${deliveryDistanceKm} km · Estimasi tiba 25–45 menit langsung dari outlet`
                      : 'Alamat melebihi radius batas 5 km. Wajib gunakan Ambil di Toko.'}
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-[#1A1A1A] font-mono-numbers">
                Rp 15.000
              </span>
            </label>

            {/* 2. Ambil di Toko / Self Pick-up */}
            <label
              onClick={() => setDeliveryMethod('pickup')}
              className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                deliveryMethod === 'pickup'
                  ? 'bg-[#FFFBF5] border-[#D97706] ring-1 ring-[#D97706] shadow-xs'
                  : 'bg-white border-[#EBE6DF] hover:border-[#D5CDC2]'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryMethod === 'pickup'}
                  onChange={() => setDeliveryMethod('pickup')}
                  className="accent-[#D97706] w-4 h-4 cursor-pointer"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#1A1A1A]">
                      Ambil di Toko (Self Pick-up)
                    </span>
                    <Store className="w-3.5 h-3.5 text-[#8C6239]" />
                  </div>
                  <div className="text-[11px] text-[#7A6A5A] mt-0.5">
                    Patawi Roastery Senopati Flagship
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-mono-numbers">
                Gratis (Rp 0)
              </span>
            </label>

            {/* Self Pick-Up Instructions */}
            {deliveryMethod === 'pickup' && (
              <div className="mt-3 p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#E8DFD5] text-xs text-[#55473C] space-y-2 animate-in fade-in duration-150">
                <div className="flex items-center gap-2 font-bold text-[#1A1A1A]">
                  <Store className="w-4 h-4 text-[#8C6239]" />
                  <span>Petunjuk Pengambilan Langsung di Roastery:</span>
                </div>
                <div className="space-y-1.5 pl-6 text-[11px] leading-relaxed text-[#6E5F52]">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#8C6239] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#1A1A1A]">Lokasi Roastery:</strong> Patawi Senopati Flagship, Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan.
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#8C6239] shrink-0" />
                    <span>
                      <strong className="text-[#1A1A1A]">Jam Operasional:</strong> Buka setiap hari pukul 07:30 – 22:00 WIB.
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Promo Coupon Card */}
        <section className="bg-white rounded-3xl p-4 sm:p-5 border border-[#EBE6DF] shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#D97706]" />
              <span className="text-xs font-bold text-[#1A1A1A]">Kupon Promo Roastery</span>
            </div>
            {isCouponApplied ? (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0] flex items-center gap-1">
                <Check className="w-3 h-3 stroke-[3]" />
                <span>BEANS20 Aktif (-Rp 20.000)</span>
              </span>
            ) : null}
          </div>

          <div className="mt-2.5 flex items-center gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              placeholder="Masukkan kode kupon"
              className="flex-1 py-2 px-3 bg-[#FAF8F5] border border-[#DDD5C9] rounded-xl text-xs font-mono-numbers text-[#1A1A1A] uppercase focus:outline-none focus:border-[#1A1A1A]"
            />
            <button
              type="button"
              onClick={() => setIsCouponApplied((prev) => !prev)}
              className="px-4 py-2 bg-[#1C1815] hover:bg-[#332A24] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer"
            >
              {isCouponApplied ? 'Hapus' : 'Gunakan'}
            </button>
          </div>
        </section>

        {/* Order Summary Card */}
        <section className="bg-white rounded-3xl p-4 sm:p-5 border border-[#EBE6DF] shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2.5 border-b border-[#F3EFEA]">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#55473C]">
              Ringkasan Pesanan
            </span>
            <span className="text-[11px] text-[#7A6A5A] font-mono-numbers">
              {totalItemCount} Item
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {cartItems.map((item, idx) => (
              <div key={idx} className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-[#1A1A1A]">
                    {item.quantity}x {item.product.name}
                  </div>
                  <div className="text-[11px] text-[#7A6A5A]">
                    Kemasan {item.size} • {item.grind}
                  </div>
                </div>
                <span className="font-mono-numbers font-bold text-[#1A1A1A]">
                  {formatRupiah(item.unitPrice * item.quantity)}
                </span>
              </div>
            ))}

            <div className="pt-2 border-t border-[#F3EFEA] space-y-1.5 text-[#55473C]">
              <div className="flex justify-between">
                <span>Subtotal Produk</span>
                <span className="font-mono-numbers">{formatRupiah(itemsSubtotal)}</span>
              </div>

              {couponDiscount > 0 && (
                <div className="flex justify-between text-[#B91C1C]">
                  <span>Diskon Kupon Promo</span>
                  <span className="font-mono-numbers">- {formatRupiah(couponDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Ongkos Kirim Ekspedisi</span>
                <span className="font-mono-numbers">
                  {shippingFee === 0 ? 'Gratis (Rp 0)' : formatRupiah(shippingFee)}
                </span>
              </div>

              <div className="flex justify-between text-[10px] text-[#7A6A5A]">
                <span>Termasuk PPN 11% (Inklusif)</span>
                <span className="font-mono-numbers">{formatRupiah(taxAmount)}</span>
              </div>
            </div>

            <div className="pt-2.5 border-t border-[#E8E2D9] flex items-baseline justify-between font-bold text-sm text-[#1A1A1A]">
              <span>Total Pembayaran</span>
              <span className="font-serif text-base text-[#D97706] font-mono-numbers">
                {formatRupiah(totalPayment)}
              </span>
            </div>
          </div>
        </section>

        {/* Payment Method: QRIS */}
        <section className="bg-white rounded-3xl p-4 sm:p-5 border border-[#EBE6DF] shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#F3EFEA]">
            <div className="flex items-center gap-2">
              <QrCode className="w-4 h-4 text-[#8C6239]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#55473C]">
                Metode Pembayaran
              </span>
            </div>
            <span className="text-[10px] bg-[#1C1815] text-white px-2 py-0.5 rounded-full font-bold">
              INSTANT QRIS
            </span>
          </div>

          <div className="pt-3">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#DDD5C9]">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  checked
                  readOnly
                  className="accent-[#D97706] w-4 h-4"
                />
                <div>
                  <span className="text-xs font-bold text-[#1A1A1A]">
                    QRIS (Quick Response Code Indonesia Standard)
                  </span>
                  <p className="text-[11px] text-[#7A6A5A] mt-0.5">
                    Mendukung BCA Mobile, GoPay, OVO, ShopeePay, Livin by Mandiri, Dana
                  </p>
                </div>
              </div>
              <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0" />
            </div>
          </div>
        </section>

        {/* Primary Checkout Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handlePay}
            className="w-full h-12 bg-[#1C1815] hover:bg-[#332A24] active:scale-98 text-white font-semibold text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <QrCode className="w-4 h-4 text-[#D97706]" />
            <span>Bayar Sekarang ({formatRupiah(totalPayment)})</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};
