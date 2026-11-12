import React, { useState } from 'react';
import {
  Sparkles,
  Plus,
  Edit2,
  TrendingUp,
  BarChart3,
  Coffee,
  CheckCircle2,
  ShieldCheck,
  RefreshCw,
  Award,
  ChevronRight,
  User,
} from 'lucide-react';
import { Product, AdminTab, OrderState } from '../types';
import { formatRupiah } from '../utils/pricing';
import { CoffeeImage } from './CoffeeImage';
import { AdminProductModal } from './AdminProductModal';

interface AdminPanelProps {
  products: Product[];
  orderState: OrderState;
  onUpdateStockKg: (productId: string, deltaKg: number) => void;
  onSaveProduct: (updated: Partial<Product>) => void;
  onSwitchRole: (role: 'customer' | 'admin' | 'kurir') => void;
  onVerifyPayment?: () => void;
  activeTab?: AdminTab;
  onChangeTab?: (tab: AdminTab) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  products,
  orderState,
  onUpdateStockKg,
  onSaveProduct,
  onSwitchRole,
  onVerifyPayment,
  activeTab: controlledTab,
  onChangeTab,
}) => {
  const [internalTab, setInternalTab] = useState<AdminTab>('stok');
  const activeTab = controlledTab ?? internalTab;
  const setActiveTab = (tab: AdminTab) => {
    setInternalTab(tab);
    onChangeTab?.(tab);
  };
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportSubTab, setReportSubTab] = useState<'omzet' | 'operasional'>('omzet');

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-[#FAF8F5] text-[#1A1A1A] pb-24 min-h-screen select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 space-y-4">
        {/* Roastery Station Admin Hero Card */}
        <section className="rounded-3xl bg-gradient-to-br from-[#1C1815] via-[#241F1B] to-[#151210] p-4 sm:p-5 text-white border border-[#332A24] shadow-md relative overflow-hidden">
          {/* Top Badge & Mode Belanja */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E8DFD5]">
                ROASTERY STATION ADMIN
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#D97706]/20 text-[#F59E0B] border border-[#D97706]/30">
                Kelola Promo
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

          {/* Title & Station Description */}
          <div className="pt-3">
            <h2 className="font-serif font-bold text-base sm:text-lg text-white">
              Patawi Roastery Senopati
            </h2>
            <p className="text-xs text-[#C5BBAE] mt-0.5">
              Stasiun manajemen biji kopi, sangrai, antrean produksi, dan dispatch DO.
            </p>
          </div>

          {/* Metrics Trio: Total Antrean (2 Batch), Biji Kopi Aktif (5 Varian), Promo Aktif (3 Kupon) */}
          <div className="mt-4 grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-center">
            <div className="bg-white/5 p-2 rounded-xl">
              <span className="text-[9px] uppercase text-[#A89A8A] block">Total Antrean</span>
              <span className="font-bold text-xs sm:text-sm font-mono-numbers text-white mt-0.5 block">
                2 Batch
              </span>
            </div>

            <div className="bg-white/5 p-2 rounded-xl">
              <span className="text-[9px] uppercase text-[#A89A8A] block">Biji Kopi Aktif</span>
              <span className="font-bold text-xs sm:text-sm font-mono-numbers text-white mt-0.5 block">
                {products.length} Varian
              </span>
            </div>

            <div className="bg-white/5 p-2 rounded-xl">
              <span className="text-[9px] uppercase text-[#A89A8A] block">Promo Aktif</span>
              <span className="font-bold text-xs sm:text-sm font-mono-numbers text-emerald-400 mt-0.5 block">
                3 Kupon
              </span>
            </div>
          </div>
        </section>

        {/* Tab Controls: Antrean | Stok Biji | Laporan | Roaster */}
        <div className="grid grid-cols-4 p-1 rounded-2xl bg-[#ECE6DD] border border-[#DDD5C9] text-center text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('antrean')}
            className={`py-2 rounded-xl transition-all cursor-pointer relative ${
              activeTab === 'antrean'
                ? 'bg-[#1C1815] text-white shadow-xs'
                : 'text-[#6E5F52] hover:text-[#1A1A1A]'
            }`}
          >
            <span>Antrean</span>
            <span className="ml-1 px-1.5 py-0.2 text-[9px] rounded-full bg-[#D97706] text-white font-bold">
              2
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('stok')}
            className={`py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'stok'
                ? 'bg-[#1C1815] text-white shadow-xs'
                : 'text-[#6E5F52] hover:text-[#1A1A1A]'
            }`}
          >
            Stok Biji
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('laporan')}
            className={`py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'laporan'
                ? 'bg-[#1C1815] text-white shadow-xs'
                : 'text-[#6E5F52] hover:text-[#1A1A1A]'
            }`}
          >
            Laporan
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('roaster')}
            className={`py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'roaster'
                ? 'bg-[#1C1815] text-white shadow-xs'
                : 'text-[#6E5F52] hover:text-[#1A1A1A]'
            }`}
          >
            Roaster
          </button>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: STOK BIJI (Screen 7 in Image 3)                          */}
        {/* ============================================================== */}
        {activeTab === 'stok' && (
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-sm text-[#1A1A1A]">
                  Inventaris Biji Kopi
                </h3>
                <p className="text-[10px] text-[#7A6A5A]">
                  Atur stok &amp; harga jual katalog Patawi
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenAdd}
                className="px-3 py-1.5 bg-[#1C1815] hover:bg-[#332A24] active:scale-95 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Tambah Biji Kopi</span>
              </button>
            </div>

            {/* Product Inventory Items */}
            <div className="space-y-2.5">
              {products.map((prod) => {
                const stockKg = prod.stockKg ?? prod.stock ?? 20;

                return (
                  <div
                    key={prod.id}
                    className="bg-white rounded-3xl p-3.5 border border-[#EBE6DF] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#FAF8F5] border border-[#EFEAE2] shrink-0">
                        <CoffeeImage
                          src={prod.image}
                          alt={prod.name}
                          regionTag={prod.regionTag}
                        />
                      </div>

                      <div className="min-w-0">
                        <h4 className="font-serif font-bold text-xs sm:text-sm text-[#1A1A1A] truncate">
                          {prod.name}
                        </h4>
                        <p className="text-[10px] text-[#7A6A5A] truncate">
                          {prod.regionTag} • {prod.roastProfile} • {prod.process}
                        </p>
                        <div className="text-[11px] font-bold text-[#1A1A1A] mt-0.5 font-mono-numbers">
                          {formatRupiah(prod.regularPrice)} / 200g
                        </div>
                      </div>
                    </div>

                    {/* Stock Status & Quick Action Buttons */}
                    <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F3EFEA]">
                      <div className="text-right mr-1">
                        <span className="text-[11px] font-bold font-mono-numbers text-[#1A1A1A] block">
                          Stok: {stockKg} kg
                        </span>
                        <span
                          className={`text-[9px] font-bold uppercase block ${
                            stockKg <= 5 ? 'text-red-600' : 'text-emerald-600'
                          }`}
                        >
                          {stockKg <= 0 ? 'Habis' : stockKg <= 5 ? 'Menipis' : 'Aman'}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onUpdateStockKg(prod.id, 5)}
                        className="px-2.5 py-1.5 rounded-xl bg-[#FAF8F5] hover:bg-[#EFEAE2] text-[11px] font-semibold text-[#1A1A1A] border border-[#DDD5C9] transition-all cursor-pointer"
                      >
                        +5 kg Restock
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenEdit(prod)}
                        className="px-2.5 py-1.5 rounded-xl bg-[#1C1815] hover:bg-[#332A24] text-white text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3 text-[#D97706]" />
                        <span>Edit Harga &amp; Stok</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ============================================================== */}
        {/* TAB 2: LAPORAN FINANSIAL & OMZET (Screen 8 in Image 3)          */}
        {/* ============================================================== */}
        {activeTab === 'laporan' && (
          <section className="space-y-3.5">
            {/* Segment Toggle */}
            <div className="grid grid-cols-2 p-1 rounded-2xl bg-[#ECE6DD] border border-[#DDD5C9] text-xs font-semibold">
              <button
                type="button"
                onClick={() => setReportSubTab('omzet')}
                className={`py-2 rounded-xl transition-all cursor-pointer ${
                  reportSubTab === 'omzet'
                    ? 'bg-[#1C1815] text-white shadow-xs'
                    : 'text-[#6E5F52] hover:text-[#1A1A1A]'
                }`}
              >
                Laporan Omzet &amp; Penjualan
              </button>

              <button
                type="button"
                onClick={() => setReportSubTab('operasional')}
                className={`py-2 rounded-xl transition-all cursor-pointer ${
                  reportSubTab === 'operasional'
                    ? 'bg-[#1C1815] text-white shadow-xs'
                    : 'text-[#6E5F52] hover:text-[#1A1A1A]'
                }`}
              >
                Operasional Roasting
              </button>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white p-3 rounded-2xl border border-[#E8E2D9] shadow-2xs">
                <span className="text-[10px] text-[#7A6A5A] uppercase block font-medium">
                  Total Omzet
                </span>
                <span className="font-serif font-bold text-sm sm:text-base text-[#D97706] font-mono-numbers mt-1 block">
                  Rp 298.000
                </span>
              </div>

              <div className="bg-white p-3 rounded-2xl border border-[#E8E2D9] shadow-2xs">
                <span className="text-[10px] text-[#7A6A5A] uppercase block font-medium">
                  Pesanan Berhasil
                </span>
                <span className="font-serif font-bold text-sm sm:text-base text-[#10B981] font-mono-numbers mt-1 block">
                  2 Selesai
                </span>
              </div>

              <div className="bg-white p-3 rounded-2xl border border-[#E8E2D9] shadow-2xs">
                <span className="text-[10px] text-[#7A6A5A] uppercase block font-medium">
                  Rerata Pesanan
                </span>
                <span className="font-serif font-bold text-sm sm:text-base text-[#1A1A1A] font-mono-numbers mt-1 block">
                  Rp 149.000
                </span>
              </div>
            </div>

            {/* Weekly Sales Trend Bar Chart */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#EBE6DF] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#1A1A1A]">
                    Tren Penjualan Mingguan
                  </h4>
                  <p className="text-[10px] text-[#7A6A5A]">
                    Volume pemesanan biji kopi (Senin - Minggu)
                  </p>
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0] font-mono-numbers">
                  +18.4% MoM
                </span>
              </div>

              {/* Bar Chart Visualization */}
              <div className="pt-4 flex items-end justify-between gap-2 h-44 px-2">
                {[
                  { day: 'Sen', height: '40%', value: 'Rp 380k' },
                  { day: 'Sel', height: '55%', value: 'Rp 520k' },
                  { day: 'Rab', height: '35%', value: 'Rp 310k' },
                  { day: 'Kam', height: '80%', value: 'Rp 750k' },
                  { day: 'Jum', height: '70%', value: 'Rp 680k' },
                  { day: 'Sab', height: '95%', value: 'Rp 920k', active: true },
                  { day: 'Min', height: '90%', value: 'Rp 880k', active: true },
                ].map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                    <div className="w-full flex justify-center">
                      <div
                        className={`w-7 sm:w-9 rounded-t-lg transition-all duration-300 ${
                          item.active
                            ? 'bg-[#8C6239] hover:bg-[#6E4B2B]'
                            : 'bg-[#55473C] hover:bg-[#3D322A]'
                        }`}
                        style={{ height: item.height }}
                        title={`${item.day}: ${item.value}`}
                      />
                    </div>
                    <span className="text-[10px] text-[#7A6A5A] font-medium font-mono-numbers mt-1">
                      {item.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============================================================== */}
        {/* TAB 3: PROFIL HEAD ROASTER & STATION (Screen 9 in Image 3)      */}
        {/* ============================================================== */}
        {activeTab === 'roaster' && (
          <section className="space-y-3">
            <h3 className="font-serif font-bold text-sm text-[#1A1A1A]">
              Profil Head Roaster &amp; Station
            </h3>

            <div className="bg-white rounded-3xl p-5 border border-[#EBE6DF] shadow-xs space-y-4">
              {/* Profile Header */}
              <div className="flex items-center gap-3.5 pb-4 border-b border-[#F3EFEA]">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#D97706] shrink-0 bg-[#332A24]">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80"
                    alt="Budi Santoso"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-serif font-bold text-sm sm:text-base text-[#1A1A1A]">
                      Budi Santoso
                    </h4>
                    <span className="text-xs">☕</span>
                  </div>
                  <p className="text-[11px] text-[#7A6A5A]">
                    Head Roaster &amp; Q-Grader Terlisensi
                  </p>
                  <p className="text-[10px] text-[#8C6239] font-mono-numbers mt-0.5">
                    budi.roaster@patawibrew.com
                  </p>
                </div>
              </div>

              {/* Station Details */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#7A6A5A]">Lokasi Station:</span>
                  <span className="font-bold text-[#1A1A1A]">Patawi Senopati Flagship</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#7A6A5A]">Sertifikasi:</span>
                  <span className="font-medium text-[#1A1A1A] font-mono-numbers">
                    CQI Q Arabica Grader (2024 - 2027)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#7A6A5A]">Total Batch Sangrai:</span>
                  <span className="font-bold text-[#1A1A1A] font-mono-numbers">
                    1.420 Batch
                  </span>
                </div>
              </div>

              {/* Return to Customer CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onSwitchRole('customer')}
                  className="w-full py-2.5 bg-[#F3EFEA] hover:bg-[#EAE4DC] text-[#1A1A1A] text-xs font-semibold rounded-xl border border-[#DDD5C9] transition-all cursor-pointer"
                >
                  Kembali ke Tampilan Pelanggan
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================== */}
        {/* TAB 4: ANTREAN PESANAN BATCH                                   */}
        {/* ============================================================== */}
        {activeTab === 'antrean' && (
          <section className="space-y-3">
            <h3 className="font-serif font-bold text-sm text-[#1A1A1A]">
              Antrean Batch Sangrai &amp; Verifikasi
            </h3>

            {/* Featured Order Card */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#EBE6DF] shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2.5 border-b border-[#F3EFEA]">
                <div>
                  <span className="font-bold text-xs font-mono-numbers text-[#1A1A1A]">
                    {orderState.orderId}
                  </span>
                  <div className="text-[11px] text-[#7A6A5A] mt-0.5">
                    {orderState.customer.name} ({orderState.customer.phone})
                  </div>
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFF7ED] text-[#C2410C] border border-[#FED7AA]">
                  QRIS Instant
                </span>
              </div>

              <div className="text-xs text-[#55473C] space-y-1">
                <div className="flex justify-between">
                  <span>2x Fijne Dag 55 (200g, Espresso)</span>
                  <span className="font-bold text-[#1A1A1A]">Rp 110.000</span>
                </div>
                <div className="text-[10px] text-[#7A6A5A]">
                  Tujuan: {orderState.customer.address}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-[#F3EFEA]">
                <div>
                  <span className="text-[10px] text-[#7A6A5A] block">Total:</span>
                  <span className="font-bold text-sm text-[#D97706] font-mono-numbers">
                    {formatRupiah(orderState.total)}
                  </span>
                </div>

                {onVerifyPayment && (
                  <button
                    type="button"
                    onClick={onVerifyPayment}
                    className="px-4 py-2 bg-[#1C1815] hover:bg-[#332A24] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer"
                  >
                    Verifikasi Pembayaran
                  </button>
                )}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Edit/Add Modal */}
      <AdminProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={editingProduct}
        onSaveProduct={onSaveProduct}
      />
    </div>
  );
};
