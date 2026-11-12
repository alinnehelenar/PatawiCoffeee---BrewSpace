import React, { useState } from 'react';
import {
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  CheckCircle2,
  Navigation,
  ShieldCheck,
  Bike,
  AlertCircle,
  Gauge,
  History,
  TrendingUp,
  User,
  Check,
} from 'lucide-react';
import { OrderState, CourierTab } from '../types';
import { MAX_DELIVERY_RADIUS_KM, DEFAULT_DELIVERY_DISTANCE_KM } from '../utils/delivery';

interface CourierDashboardProps {
  orderState: OrderState;
  onUpdateDeliveryStatus: (status: OrderState['courierStatus']) => void;
  onSwitchRole: (role: 'customer' | 'admin' | 'kurir') => void;
  activeTab?: CourierTab;
  onChangeTab?: (tab: CourierTab) => void;
}

export const CourierDashboard: React.FC<CourierDashboardProps> = ({
  orderState,
  onUpdateDeliveryStatus,
  onSwitchRole,
  activeTab: controlledTab,
  onChangeTab,
}) => {
  const [internalTab, setInternalTab] = useState<CourierTab>('tugas');
  const activeTab = controlledTab ?? internalTab;
  const setActiveTab = (tab: CourierTab) => {
    setInternalTab(tab);
    onChangeTab?.(tab);
  };

  const deliveryDistance = DEFAULT_DELIVERY_DISTANCE_KM; // 2.8 km
  const currentStatus = orderState.courierStatus || 'menuju_outlet';

  const handleNextStep = () => {
    if (currentStatus === 'idle' || currentStatus === 'menuju_outlet') {
      onUpdateDeliveryStatus('pickup_selesai');
    } else if (currentStatus === 'pickup_selesai') {
      onUpdateDeliveryStatus('menuju_penerima');
    } else if (currentStatus === 'menuju_penerima') {
      onUpdateDeliveryStatus('selesai');
    }
  };

  return (
    <div className="bg-[#FAF8F5] text-[#1A1A1A] pb-28 min-h-screen select-none font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 space-y-4">
        {/* Independent Delivery Hero Header (No Roastery Brand Mention) */}
        <section className="rounded-3xl bg-gradient-to-br from-[#1C1815] via-[#241F1B] to-[#151210] p-4 sm:p-5 text-white border border-[#332A24] shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#D97706]/20 flex items-center justify-center text-[#D97706]">
                <Bike className="w-3.5 h-3.5" />
              </span>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#E8DFD5] block leading-tight">
                  SISTEM PENGIRIMAN INDEPENDEN (DO)
                </span>
                <span className="text-[9px] text-[#A89A8A]">Mitra Logistik Kurir Terverifikasi</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Siap Antar
              </span>

              <button
                type="button"
                onClick={() => onSwitchRole('customer')}
                className="text-[10px] text-[#C49A6C] hover:text-white flex items-center gap-0.5 transition-colors cursor-pointer"
              >
                <span>Mode Belanja &gt;</span>
              </button>
            </div>
          </div>

          {/* Driver Profile */}
          <div className="pt-3.5 flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#D97706] shrink-0 bg-[#332A24]">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                alt="Rian Hidayat"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h2 className="font-serif font-bold text-sm sm:text-base text-white truncate">
                  Rian Hidayat
                </h2>
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              </div>
              <p className="text-[11px] text-[#C5BBAE] font-mono-numbers">
                B 4521 SRX · Honda Vario 160 Hitam
              </p>
            </div>
          </div>

          {/* Logistics Performance & 5 KM Telemetry */}
          <div className="mt-4 grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-center">
            <div className="bg-white/5 p-2 rounded-xl">
              <span className="text-[9px] uppercase text-[#A89A8A] block">Tugas Hari Ini</span>
              <span className="font-bold text-xs font-mono-numbers text-white mt-0.5 block">
                2 Selesai
              </span>
            </div>

            <div className="bg-white/5 p-2 rounded-xl">
              <span className="text-[9px] uppercase text-[#A89A8A] block">Radius Maks.</span>
              <span className="font-bold text-xs font-mono-numbers text-[#FBBF24] mt-0.5 block">
                5.0 KM
              </span>
            </div>

            <div className="bg-white/5 p-2 rounded-xl">
              <span className="text-[9px] uppercase text-[#A89A8A] block">Kepatuhan Rute</span>
              <span className="font-bold text-xs font-mono-numbers text-emerald-400 mt-0.5 block">
                100%
              </span>
            </div>
          </div>
        </section>

        {/* 5 KM Strict Delivery Radius Restriction Banner */}
        <section className="bg-white rounded-2xl p-3.5 border border-[#E8DFD5] shadow-xs">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#FAF5EE] text-[#8C6239] flex items-center justify-center shrink-0">
                <Gauge className="w-4 h-4" />
              </span>
              <div>
                <h4 className="font-bold text-xs text-[#1A1A1A]">
                  Aturan Radius Pengantaran: Maksimal 5.0 KM
                </h4>
                <p className="text-[10px] text-[#7A6A5A]">
                  Sistem logistik independen hanya melayani pesanan dalam radius 5 km dari outlet roastery.
                </p>
              </div>
            </div>

            <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-mono-numbers">
              Status: 2.8 km / 5.0 km (Aman)
            </span>
          </div>

          {/* Progress bar visual indicator of 2.8 km out of 5.0 km */}
          <div className="mt-2.5">
            <div className="w-full bg-[#FAF5EE] h-2 rounded-full overflow-hidden border border-[#EFE5D7]">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all"
                style={{ width: `${(deliveryDistance / MAX_DELIVERY_RADIUS_KM) * 100}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[9px] text-[#7A6A5A] mt-1 font-mono-numbers">
              <span>0 km (Outlet Senopati)</span>
              <span className="font-bold text-emerald-700">Tujuan: 2.8 km</span>
              <span>Batas Maks: 5.0 km</span>
            </div>
          </div>
        </section>

        {/* Tab View: Tugas Antar */}
        {activeTab === 'tugas' && (
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <h3 className="font-serif font-bold text-sm text-[#1A1A1A]">
                  Tugas Pengantaran Hari Ini
                </h3>
                <span className="w-2 h-2 rounded-full bg-[#D97706]" />
              </div>

              <span className="text-[11px] font-medium text-[#7A6A5A]">
                1 Pesanan Aktif
              </span>
            </div>

            {/* Active Delivery Card */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#EBE6DF] shadow-xs space-y-3.5">
              {/* Top row */}
              <div className="flex items-center justify-between pb-2.5 border-b border-[#F3EFEA] flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs font-mono-numbers text-[#1A1A1A]">
                    {orderState.orderId}
                  </span>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#FFF7ED] text-[#C2410C] border border-[#FED7AA]">
                    DO Instant (Radius Maks. 5 km)
                  </span>
                </div>

                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FAF5EE] text-[#8C6239] border border-[#EFE5D7]">
                  {currentStatus === 'selesai'
                    ? 'Pengantaran Selesai ✓'
                    : currentStatus === 'menuju_penerima'
                    ? 'Menuju Alamat Penerima'
                    : currentStatus === 'pickup_selesai'
                    ? 'Barang Diambil di Outlet'
                    : 'Kurir Menuju Outlet'}
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#55473C] bg-[#FAF8F5] p-2.5 rounded-xl border border-[#EFEAE2]">
                <span>1 Paket Specialty Coffee Fresh Roast (DO Dispatch)</span>
                <span className="font-mono-numbers font-semibold text-[#8C6239]">
                  Jarak Antar: 2.8 km
                </span>
              </div>

              {/* Recipient Details & Quick Call/Chat */}
              <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#EFEAE2] flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-[10px] text-[#7A6A5A] uppercase block font-semibold">
                    Penerima Paket:
                  </span>
                  <h4 className="font-bold text-xs text-[#1A1A1A] truncate mt-0.5">
                    {orderState.customer.name} (Tamu)
                  </h4>
                  <p className="text-[10px] text-[#7A6A5A] truncate mt-0.5">
                    Pesanan: {orderState.items[0]?.product.name || 'Fijne Dag 55'} (200g)
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <a
                    href={`tel:${orderState.customer.phone}`}
                    className="w-8 h-8 rounded-xl bg-white border border-[#DDD5C9] text-[#1A1A1A] hover:bg-[#F3EFEA] flex items-center justify-center transition-colors shadow-2xs"
                    title="Telepon Penerima"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={`https://wa.me/${orderState.customer.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-xl bg-[#1C1815] text-white hover:bg-[#332A24] flex items-center justify-center transition-colors shadow-2xs"
                    title="Chat WhatsApp"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Stepper / Timeline: Pick-up -> Drop-off */}
              <div className="space-y-3 pt-1 text-xs">
                {/* Pickup Gate */}
                <div className="flex items-start gap-3">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#10B981] ring-4 ring-[#ECFDF5] shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[11px] text-[#1A1A1A] uppercase tracking-wider">
                        PICK-UP (OUTLET HUB ROASTERY)
                      </span>
                      <span className="text-[10px] text-[#7A6A5A] font-mono-numbers">
                        10:45 WIB
                      </span>
                    </div>
                    <p className="font-semibold text-xs text-[#1A1A1A] mt-0.5">
                      Hub Roastery Senopati
                    </p>
                    <p className="text-[10px] text-[#7A6A5A]">
                      Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan
                    </p>
                  </div>
                </div>

                {/* Dotted connector */}
                <div className="ml-1.5 w-0.5 h-6 bg-[#DDD5C9] -my-1.5" />

                {/* Drop-off Gate */}
                <div className="flex items-start gap-3">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#D97706] ring-4 ring-[#FFF7ED] shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[11px] text-[#1A1A1A] uppercase tracking-wider">
                        DROP-OFF (ALAMAT PENERIMA — RADIUS 2.8 KM)
                      </span>
                      <span className="text-[10px] text-[#D97706] font-mono-numbers font-bold">
                        Estimasi 11:15 WIB
                      </span>
                    </div>
                    <p className="font-semibold text-xs text-[#1A1A1A] mt-0.5">
                      {orderState.customer.address}
                    </p>
                    <p className="text-[10px] text-[#7A6A5A]">
                      Instruksi: {orderState.customer.notes || 'Titip di lobby pos sekuriti'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Handover Gate Action CTA */}
              <div className="pt-2">
                {currentStatus === 'selesai' ? (
                  <div className="w-full py-3 bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0] rounded-2xl text-xs font-bold flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    <span>Pengantaran Telah Diselesaikan (Dalam Batas 5 km)</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full py-3 bg-[#1C1815] hover:bg-[#332A24] active:scale-98 text-white text-xs font-bold rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <Navigation className="w-4 h-4 text-[#D97706]" />
                    <span>
                      {currentStatus === 'menuju_outlet'
                        ? 'Konfirmasi Barang Diterima di Outlet'
                        : currentStatus === 'pickup_selesai'
                        ? 'Mulai Antar ke Alamat Penerima'
                        : 'Konfirmasi Pengantaran Selesai'}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Tab View: Riwayat */}
        {activeTab === 'riwayat' && (
          <section className="bg-white rounded-3xl p-4 sm:p-5 border border-[#EBE6DF] shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#F3EFEA]">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-[#8C6239]" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#1A1A1A]">
                  Riwayat Pengantaran (Radius Maks. 5 km)
                </h3>
              </div>
              <span className="text-[10px] text-[#7A6A5A]">2 Pesanan Hari Ini</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#EFEAE2] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#1A1A1A]">#DO-8831 · Jl. Gunawarman No. 8</div>
                  <div className="text-[10px] text-[#7A6A5A]">
                    Jarak: 1.9 km · Selesai 09:30 WIB
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                  Terkirim ✓
                </span>
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#EFEAE2] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#1A1A1A]">#DO-8824 · Jl. Suryo No. 15</div>
                  <div className="text-[10px] text-[#7A6A5A]">
                    Jarak: 3.4 km · Selesai 08:45 WIB
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                  Terkirim ✓
                </span>
              </div>
            </div>
          </section>
        )}

        {/* Tab View: Performa */}
        {activeTab === 'performa' && (
          <section className="bg-white rounded-3xl p-4 sm:p-5 border border-[#EBE6DF] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#F3EFEA]">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#8C6239]" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#1A1A1A]">
                  Performa & Kepatuhan Rute Logistik
                </h3>
              </div>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Sangat Baik
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#EFEAE2]">
                <span className="text-[10px] text-[#7A6A5A] block">Kepatuhan Radius 5 km</span>
                <span className="text-sm font-bold text-emerald-700 font-mono-numbers mt-0.5 block">
                  100% (0 Pelanggaran)
                </span>
              </div>
              <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#EFEAE2]">
                <span className="text-[10px] text-[#7A6A5A] block">Ketepatan Waktu</span>
                <span className="text-sm font-bold text-[#1A1A1A] font-mono-numbers mt-0.5 block">
                  100% On-Time
                </span>
              </div>
              <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#EFEAE2]">
                <span className="text-[10px] text-[#7A6A5A] block">Rating Pengantaran</span>
                <span className="text-sm font-bold text-[#D97706] font-mono-numbers mt-0.5 block">
                  ★ 4.9 / 5.0
                </span>
              </div>
              <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#EFEAE2]">
                <span className="text-[10px] text-[#7A6A5A] block">Total Jarak Hari Ini</span>
                <span className="text-sm font-bold text-[#1A1A1A] font-mono-numbers mt-0.5 block">
                  8.1 KM
                </span>
              </div>
            </div>
          </section>
        )}

        {/* Tab View: Akun Kurir */}
        {activeTab === 'akun' && (
          <section className="bg-white rounded-3xl p-4 sm:p-5 border border-[#EBE6DF] shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#F3EFEA]">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#8C6239]" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#1A1A1A]">
                  Profil Mitra Logistik Independen
                </h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Terverifikasi
              </span>
            </div>

            <div className="space-y-2 text-xs text-[#55473C]">
              <div className="flex justify-between py-1.5 border-b border-[#F3EFEA]">
                <span>Nama Mitra</span>
                <span className="font-semibold text-[#1A1A1A]">Rian Hidayat</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#F3EFEA]">
                <span>Status Kemitraan</span>
                <span className="font-semibold text-[#1A1A1A]">Mitra Kurir Independen</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#F3EFEA]">
                <span>Kendaraan & Plat</span>
                <span className="font-semibold text-[#1A1A1A]">Honda Vario 160 · B 4521 SRX</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#F3EFEA]">
                <span>Zona Wilayah Operasional</span>
                <span className="font-semibold text-[#1A1A1A]">Radius Maks. 5 km dari Outlet</span>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
