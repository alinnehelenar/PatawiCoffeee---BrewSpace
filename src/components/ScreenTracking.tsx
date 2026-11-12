import React, { useState, useEffect } from 'react';
import {
  Copy,
  Check,
  Download,
  Clock,
  Truck,
  Coffee,
  RotateCcw,
  ChevronRight,
  Store,
} from 'lucide-react';
import { OrderState } from '../types';
import { ORDER_STEPS, formatRupiah } from '../utils/pricing';

interface ScreenTrackingProps {
  orderState: OrderState;
  onRestartDemo: () => void;
}

export const ScreenTracking: React.FC<ScreenTrackingProps> = ({
  orderState,
  onRestartDemo,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(orderState.orderStep || 1);
  const [secondsLeft, setSecondsLeft] = useState<number>(14 * 60 + 59); // 14:59 min
  const [copied, setCopied] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [verifyingPayment, setVerifyingPayment] = useState<boolean>(false);

  // Sync with shared orderState when updated by Admin role
  useEffect(() => {
    if (orderState.orderStep && orderState.orderStep !== currentStep) {
      setCurrentStep(orderState.orderStep);
    }
  }, [orderState.orderStep]);

  // Active countdown timer effect
  useEffect(() => {
    if (currentStep > 1) return; // Freeze timer if paid
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [currentStep]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTimer = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const copyOrderId = () => {
    navigator.clipboard?.writeText?.(orderState.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaid = () => {
    setVerifyingPayment(true);
    setTimeout(() => {
      setVerifyingPayment(false);
      setCurrentStep(2); // Payment Verified
      setTimeout(() => {
        setCurrentStep(3); // Processing
      }, 1500);
    }, 900);
  };

  const handleDownloadQR = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const advanceStep = () => {
    setCurrentStep((prev) => (prev < 6 ? prev + 1 : 6));
  };

  const resetStep = () => {
    setCurrentStep(1);
    setSecondsLeft(14 * 60 + 59);
  };

  const isPickup = orderState.deliveryMethod === 'pickup';

  return (
    <div className="bg-[#F8F9FA] text-[#1A1A1A] pb-28 select-none min-h-screen font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 space-y-4">
        {/* Order Header: Order ID "PBS-20261109-0012" */}
        <section className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
              Referensi Pesanan Aktif
            </span>
            <div className="flex items-center gap-1 text-[11px] text-[#6B7280] font-mono-numbers">
              <Clock className="w-3.5 h-3.5 text-[#8B5A2B]" />
              <span>Hari ini, {orderState.createdAt || '21:35'} WIB</span>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between bg-[#F8F9FA] px-3.5 py-2.5 rounded-xl border border-[#E5E7EB]">
            <div>
              <div className="text-[10px] text-[#6B7280] uppercase font-mono-numbers">
                Order ID
              </div>
              <div className="font-display font-bold text-base text-[#1A1A1A] tracking-wide font-mono-numbers">
                {orderState.orderId || 'PBS-20261109-0012'}
              </div>
            </div>

            <button
              onClick={copyOrderId}
              aria-label="Copy order id"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white hover:bg-[#F3F4F6] text-xs font-medium text-[#374151] border border-[#E5E7EB] transition-colors shadow-xs cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600 text-[11px] font-semibold">Tersalin</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#6B7280]" />
                  <span className="text-[11px]">Salin</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Item Summary Pill */}
          <div className="mt-3 flex items-center justify-between text-xs text-[#4B5563]">
            <span>
              2x Fijne Dag 55 · {isPickup ? 'Ambil di Toko (Purwokerto Utara)' : 'GoSend Instant'}
            </span>
            <span className="font-bold text-[#1A1A1A] font-mono-numbers">
              {formatRupiah(orderState.total || 128000)}
            </span>
          </div>
        </section>

        {/* QRIS Box: High-contrast QR Code container with active countdown timer (14:59 min) */}
        <section className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                QRIS Payment Gateway
              </span>
            </div>

            {/* Active countdown timer: 14:59 min */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono-numbers font-bold ${
                currentStep === 1
                  ? 'bg-[#FAF7F2] text-[#8B5A2B] border border-[#E8DFD5]'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{currentStep === 1 ? formattedTimer : 'LUNAS'}</span>
            </div>
          </div>

          {currentStep === 1 ? (
            <div className="pt-4 flex flex-col items-center text-center space-y-3">
              {/* High-contrast QR Code Graphic */}
              <div className="p-3 bg-white rounded-2xl border-2 border-[#1A1A1A] shadow-md inline-block">
                <svg
                  className="w-44 h-44 sm:w-48 sm:h-48"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="100" height="100" fill="white" />
                  {/* Outer corner finder patterns */}
                  <rect x="5" y="5" width="26" height="26" rx="3" fill="#1A1A1A" />
                  <rect x="9" y="9" width="18" height="18" rx="2" fill="white" />
                  <rect x="13" y="13" width="10" height="10" fill="#1A1A1A" />

                  <rect x="69" y="5" width="26" height="26" rx="3" fill="#1A1A1A" />
                  <rect x="73" y="9" width="18" height="18" rx="2" fill="white" />
                  <rect x="77" y="13" width="10" height="10" fill="#1A1A1A" />

                  <rect x="5" y="69" width="26" height="26" rx="3" fill="#1A1A1A" />
                  <rect x="9" y="73" width="18" height="18" rx="2" fill="white" />
                  <rect x="13" y="77" width="10" height="10" fill="#1A1A1A" />

                  {/* QR Matrix Elements */}
                  <rect x="36" y="8" width="6" height="6" fill="#1A1A1A" />
                  <rect x="46" y="8" width="6" height="6" fill="#1A1A1A" />
                  <rect x="56" y="8" width="6" height="6" fill="#1A1A1A" />
                  <rect x="36" y="18" width="6" height="6" fill="#1A1A1A" />
                  <rect x="50" y="18" width="12" height="6" fill="#1A1A1A" />

                  <rect x="8" y="36" width="6" height="6" fill="#1A1A1A" />
                  <rect x="18" y="36" width="6" height="6" fill="#1A1A1A" />
                  <rect x="8" y="46" width="12" height="6" fill="#1A1A1A" />
                  <rect x="8" y="56" width="6" height="6" fill="#1A1A1A" />

                  <rect x="76" y="36" width="6" height="6" fill="#1A1A1A" />
                  <rect x="86" y="36" width="6" height="6" fill="#1A1A1A" />
                  <rect x="68" y="46" width="12" height="6" fill="#1A1A1A" />
                  <rect x="84" y="56" width="8" height="6" fill="#1A1A1A" />

                  <rect x="36" y="76" width="8" height="6" fill="#1A1A1A" />
                  <rect x="48" y="76" width="6" height="6" fill="#1A1A1A" />
                  <rect x="60" y="76" width="6" height="6" fill="#1A1A1A" />
                  <rect x="40" y="86" width="14" height="6" fill="#1A1A1A" />
                  <rect x="76" y="86" width="6" height="6" fill="#1A1A1A" />

                  {/* Center QRIS logo badge */}
                  <rect x="38" y="38" width="24" height="24" rx="4" fill="#1A1A1A" />
                  <text
                    x="50"
                    y="52"
                    textAnchor="middle"
                    fill="white"
                    fontSize="7"
                    fontWeight="bold"
                    fontFamily="sans-serif"
                  >
                    QRIS
                  </text>
                  <text
                    x="50"
                    y="58"
                    textAnchor="middle"
                    fill="#C49A6C"
                    fontSize="4"
                    fontWeight="bold"
                    fontFamily="sans-serif"
                  >
                    PATAWI
                  </text>
                </svg>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-semibold text-[#1A1A1A]">
                  PATAWI ROASTERY PURWOKERTO
                </div>
                <div className="text-[11px] text-[#6B7280]">
                  NMID: ID1024388192837 · A.N. PATAWI BREWSPACE
                </div>
                <div className="text-sm font-bold text-[#1A1A1A] font-mono-numbers pt-1">
                  Total: {formatRupiah(orderState.total || 128000)}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 pt-1 w-full max-w-xs">
                <button
                  onClick={handleDownloadQR}
                  className="flex-1 py-2 px-3 rounded-xl border border-[#E5E7EB] hover:bg-[#F3F4F6] text-xs font-semibold text-[#374151] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {downloadSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600 text-[11px]">Tersimpan</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5 text-[#6B7280]" />
                      <span>Simpan QR</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handlePaid}
                  disabled={verifyingPayment}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#1A1A1A] hover:bg-[#2C2C2C] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  {verifyingPayment ? (
                    <span className="animate-pulse">Memverifikasi...</span>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Saya Sudah Bayar</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-2 flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200 shadow-xs">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h3 className="font-display font-bold text-base text-[#1A1A1A]">
                Pembayaran Terkonfirmasi
              </h3>
              <p className="text-xs text-[#6B7280] mt-1 max-w-xs">
                Settlement QRIS Bank Indonesia berhasil. Pesanan biji kopi Anda saat ini diproses fresh oleh roastery kami.
              </p>
            </div>
          )}
        </section>

        {/* Visual Progress Stepper */}
        <section className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
              Status Pesanan Real-Time
            </span>
            <span className="text-xs font-bold text-[#1A1A1A] font-mono-numbers">
              Tahap {currentStep} dari 6
            </span>
          </div>

          <div className="pt-4 space-y-4">
            {ORDER_STEPS.map((stepItem, idx) => {
              const isPast = stepItem.step < currentStep;
              const isCurrent = stepItem.step === currentStep;

              return (
                <div key={stepItem.step} className="flex items-start gap-3 relative">
                  {/* Vertical connecting line */}
                  {idx < ORDER_STEPS.length - 1 && (
                    <div
                      className={`absolute left-[13px] top-[26px] bottom-[-16px] w-[2px] transition-colors ${
                        isPast ? 'bg-[#1A1A1A]' : 'bg-[#E5E7EB]'
                      }`}
                    />
                  )}

                  {/* Step node indicator */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 transition-all font-mono-numbers text-xs font-bold ${
                      isPast
                        ? 'bg-[#1A1A1A] text-white shadow-xs'
                        : isCurrent
                        ? 'bg-[#1A1A1A] text-white ring-4 ring-[#1A1A1A]/20 shadow-xs animate-pulse'
                        : 'bg-[#F3F4F6] text-[#9CA3AF] border border-[#E5E7EB]'
                    }`}
                  >
                    {isPast ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : stepItem.step}
                  </div>

                  {/* Step details */}
                  <div className="flex-1 pb-1">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-xs font-semibold tracking-tight ${
                          isCurrent
                            ? 'text-[#1A1A1A] font-bold'
                            : isPast
                            ? 'text-[#374151]'
                            : 'text-[#9CA3AF]'
                        }`}
                      >
                        {isPickup && stepItem.step === 4
                          ? 'Siap Diambil di Roastery'
                          : isPickup && stepItem.step === 5
                          ? 'Menunggu Pengambilan di Toko'
                          : stepItem.label}
                      </h4>
                      {isCurrent && (
                        <span className="text-[10px] uppercase font-bold text-[#1A1A1A] bg-[#F3F4F6] px-2 py-0.5 rounded border border-[#E5E7EB]">
                          Aktif
                        </span>
                      )}
                      {isPast && (
                        <span className="text-[10px] text-emerald-600 font-semibold">
                          Selesai
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-[11px] mt-0.5 ${
                        isCurrent
                          ? 'text-[#4B5563]'
                          : isPast
                          ? 'text-[#6B7280]'
                          : 'text-[#9CA3AF]'
                      }`}
                    >
                      {isPickup && stepItem.step === 4
                        ? 'Paket telah selesai digiling dan dikemas fresh. Siap diambil di meja kasir.'
                        : isPickup && stepItem.step === 5
                        ? 'Silakan datang ke Patawi Brewspace Jl. Overste Isdiman No. 22 dan tunjukkan nomor pesanan.'
                        : stepItem.desc}
                    </p>

                    {/* Contextual simulated roastery detail when active */}
                    {isCurrent && stepItem.step === 3 && (
                      <div className="mt-2 p-2 bg-[#F8F9FA] rounded-lg border border-[#E5E7EB] text-[11px] text-[#374151] flex items-center gap-2">
                        <Coffee className="w-3.5 h-3.5 text-[#8B5A2B]" />
                        <span>Fijne Dag 55: Kalibrasi espresso grind berjalan di roastery Purwokerto</span>
                      </div>
                    )}
                    {isCurrent && stepItem.step === 4 && (
                      <div className="mt-2 p-2 bg-[#F8F9FA] rounded-lg border border-[#E5E7EB] text-[11px] text-[#374151] flex items-center gap-2">
                        {isPickup ? (
                          <>
                            <Store className="w-3.5 h-3.5 text-[#8B5A2B]" />
                            <span>Paket siap di kasir Patawi Brewspace (Buka hingga 22:00 WIB)</span>
                          </>
                        ) : (
                          <>
                            <Truck className="w-3.5 h-3.5 text-[#8B5A2B]" />
                            <span>
                              Driver Assigned: {orderState.courierDriver?.name || 'Rian Hidayat (Kurir Independen)'} —{' '}
                              {orderState.courierDriver?.plate || 'B 4521 SRX'}
                            </span>
                          </>
                        )}
                      </div>
                    )}
                    {isCurrent && stepItem.step === 5 && (
                      <div className="mt-2 p-2 bg-[#F8F9FA] rounded-lg border border-[#E5E7EB] text-[11px] text-[#374151] flex items-center gap-2">
                        {isPickup ? (
                          <>
                            <Store className="w-3.5 h-3.5 text-[#8B5A2B]" />
                            <span>Menunggu Anda di Roastery Jl. Overste Isdiman No. 22 Purwokerto Utara</span>
                          </>
                        ) : (
                          <>
                            <Truck className="w-3.5 h-3.5 text-[#8B5A2B]" />
                            <span>
                              Kurir Sedang Menuju Lokasi: {orderState.courierDriver?.name || 'Rian Hidayat (Kurir Independen)'} (~18 menit)
                            </span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stepper Demo Controls for Presentation Verification */}
          <div className="mt-5 pt-3 border-t border-[#F3F4F6] flex items-center justify-between gap-2">
            <button
              onClick={resetStep}
              className="text-[11px] text-[#6B7280] hover:text-[#1A1A1A] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Stepper</span>
            </button>

            <button
              onClick={advanceStep}
              className="px-2.5 py-1 bg-[#F8F9FA] hover:bg-[#E5E7EB] rounded-lg text-[11px] text-[#1A1A1A] font-semibold flex items-center gap-1 transition-colors border border-[#E5E7EB] cursor-pointer"
            >
              <span>Simulasi Tahap Berikutnya</span>
              <ChevronRight className="w-3 h-3 text-[#8B5A2B]" />
            </button>
          </div>
        </section>

        {/* Order Details Accordion / Footer Note */}
        <div className="text-center pt-2 pb-6">
          <p className="text-[11px] text-[#6B7280]">
            Patawi Brewspace Roastery · Purwokerto, Central Java
          </p>
          <button
            onClick={onRestartDemo}
            className="mt-2 text-xs text-[#1A1A1A] hover:text-[#8B5A2B] font-semibold hover:underline cursor-pointer"
          >
            ← Pesan Varian Biji Kopi Lain (Kembali ke Katalog)
          </button>
        </div>
      </div>
    </div>
  );
};
