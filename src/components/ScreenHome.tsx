import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Copy,
  Star,
  Coffee,
  Plus,
  BookOpen,
  Sprout,
  Info,
  X,
} from 'lucide-react';
import { Product, ScreenId, CategoryFilter } from '../types';
import { FIJNE_DAG_IMAGE } from '../data/products';
import { formatRupiah } from '../utils/pricing';

interface ScreenHomeProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCartDirect: (product: Product) => void;
  onNavigate: (screen: ScreenId) => void;
  onSelectCategory?: (category: CategoryFilter) => void;
  addedProductId?: string | null;
}

export const ScreenHome: React.FC<ScreenHomeProps> = ({
  products,
  onSelectProduct,
  onAddToCartDirect,
  onNavigate,
  onSelectCategory,
  addedProductId,
}) => {
  const [couponCopied, setCouponCopied] = useState<boolean>(false);
  const [isGrindGuideOpen, setIsGrindGuideOpen] = useState<boolean>(false);

  // Featured Hero Product: Fijne Dag 55
  const featuredProduct = products.find((p) => p.id === 'fijne-dag-55') || products[0];

  const handleCopyCoupon = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard?.writeText?.('BEANS20');
    setCouponCopied(true);
    setTimeout(() => setCouponCopied(false), 2200);
  };

  const handleCategoryClick = (cat: CategoryFilter) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
    onNavigate('catalog');
  };

  return (
    <div className="bg-[#F8F9FA] text-[#1A1A1A] pb-24 min-h-screen font-sans select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-3.5 space-y-4">
        {/* 1. HERO PROMO BANNER (Authentic Patawi Deep Matte Black & Coffee Brown) */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1A1A1A] via-[#242424] to-[#121212] border border-[#2E2E2E] shadow-md text-white p-4 sm:p-5">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#8B5A2B]/25 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex items-center justify-between gap-3 z-10">
            <div className="flex-1 min-w-0 pr-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-[#E8DFD5] text-[10px] font-bold tracking-wider uppercase mb-1.5 shadow-2xs">
                <Sparkles className="w-3 h-3 text-[#C49A6C]" />
                <span>PROMO ARTISAN ROASTERY</span>
              </div>

              <h2 className="font-serif font-bold text-xl sm:text-2xl text-white tracking-tight leading-tight">
                Batch Sangrai Baru
              </h2>

              <p className="text-xs text-[#E5E0D8]/90 mt-1.5 leading-relaxed">
                Diskon 20% biji kopi sangrai segar pilihan roaster! Gunakan kupon{' '}
                <span className="font-semibold text-white">BEANS20</span> di keranjang.
              </p>

              <div className="flex flex-wrap items-center gap-2 mt-3.5 pt-0.5">
                <button
                  onClick={() => onNavigate('catalog')}
                  className="px-4 py-1.5 bg-[#8B5A2B] hover:bg-[#724822] active:scale-95 text-white text-xs font-semibold rounded-full flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <span>Klaim Promo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleCopyCoupon}
                  title="Klik untuk salin kupon BEANS20"
                  className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 active:scale-95 border border-white/20 text-[#E8DFD5] text-xs font-mono-numbers font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {couponCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300 font-sans text-[11px]">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#C49A6C]" />
                      <span>Kupon BEANS20</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="w-24 h-28 sm:w-28 sm:h-32 shrink-0 relative flex items-center justify-center">
              <div className="w-full h-full rounded-xl bg-white/5 border border-white/10 p-1.5 flex items-center justify-center shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <img
                  src={FIJNE_DAG_IMAGE}
                  alt="Patawi Artisan Coffee Bag"
                  className="w-full h-full object-contain filter drop-shadow-md"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 text-[9px] font-bold px-1.5 py-0.5 bg-[#8B5A2B] text-white rounded-md font-mono-numbers shadow-xs">
                -20%
              </span>
            </div>
          </div>
        </section>

        {/* 2. GUARANTEE BANNER */}
        <section className="bg-white rounded-2xl border border-[#E5E7EB] p-3.5 shadow-2xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] flex items-center justify-center text-[#1A1A1A] shrink-0">
            <ShieldCheck className="w-5 h-5 text-[#8B5A2B] stroke-[2.2]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-bold text-xs text-[#1A1A1A] tracking-tight">
                Jaminan Sangrai Segar
              </h3>
              <span className="text-[10px] font-mono-numbers font-bold text-[#8B5A2B] bg-[#FAF7F2] px-1.5 py-0.2 rounded border border-[#E8DFD5]">
                MAKS. 7 HARI
              </span>
            </div>
            <p className="text-[11px] text-[#6B7280] mt-0.5 leading-snug">
              Dikurasi dan disangrai tepat sebelum masa resting seduhan di roastery Purwokerto
            </p>
          </div>
        </section>

        {/* 3. FEATURED PRODUCT CARD (Fijne Dag 55) */}
        {featuredProduct && (
          <section className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8B5A2B] tracking-wider font-mono-numbers">
                  PRODUK UNGGULAN ROASTERY
                </span>
                <h3 className="font-serif font-bold text-base text-[#1A1A1A]">
                  Fijne Dag 55 — Espresso Blend
                </h3>
              </div>
              <button
                onClick={() => onSelectProduct(featuredProduct)}
                className="text-xs text-[#1A1A1A] hover:text-[#8B5A2B] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Lihat Detail</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div
              onClick={() => onSelectProduct(featuredProduct)}
              className="bg-white rounded-2xl border border-[#E5E7EB] hover:border-[#1A1A1A]/40 shadow-xs p-4 sm:p-5 transition-all cursor-pointer flex flex-col sm:flex-row gap-4 items-center justify-between group"
            >
              <div className="flex gap-4 items-center min-w-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] p-2 flex items-center justify-center shrink-0">
                  <img
                    src={featuredProduct.image}
                    alt={featuredProduct.name}
                    className="w-full h-full object-contain drop-shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-bold text-[#8B5A2B] uppercase font-mono-numbers">
                      {featuredProduct.regionTag}
                    </span>
                    <span className="text-[10px] text-[#9CA3AF]">•</span>
                    <span className="text-[10px] bg-[#F8F9FA] text-[#1A1A1A] border border-[#E5E7EB] font-semibold px-1.5 py-0.2 rounded font-mono-numbers">
                      ★ {featuredProduct.rating}
                    </span>
                  </div>

                  <h4 className="font-serif font-bold text-base text-[#1A1A1A] mt-0.5 group-hover:text-[#8B5A2B] transition-colors">
                    {featuredProduct.name}
                  </h4>
                  <p className="text-xs text-[#6B7280] line-clamp-1 italic mt-0.5">
                    {featuredProduct.tastingNotes.join(', ')}
                  </p>

                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="text-[10px] bg-[#F3F4F6] text-[#374151] font-medium px-2 py-0.5 rounded font-mono-numbers">
                      200g
                    </span>
                    <span className="text-[10px] bg-[#F3F4F6] text-[#374151] font-medium px-2 py-0.5 rounded font-mono-numbers">
                      500g
                    </span>
                    <span className="text-[10px] bg-[#F3F4F6] text-[#374151] font-medium px-2 py-0.5 rounded font-mono-numbers">
                      1kg
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-2.5 sm:pt-0 border-[#F3F4F6] shrink-0 gap-2">
                <div className="sm:text-right">
                  <div className="text-[10px] text-[#6B7280] uppercase font-medium">
                    Regular / Member
                  </div>
                  <div className="font-mono-numbers text-xs sm:text-sm font-bold text-[#1A1A1A]">
                    {formatRupiah(featuredProduct.regularPrice)} /{' '}
                    <span className="text-[#8B5A2B]">
                      {formatRupiah(featuredProduct.memberPrice)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCartDirect(featuredProduct);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                    addedProductId === featuredProduct.id
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#1A1A1A] hover:bg-[#2C2C2C] text-white active:scale-95'
                  }`}
                >
                  {addedProductId === featuredProduct.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Ditambahkan</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Tambah Keranjang</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </section>
        )}

        {/* 4. CATEGORY SHORTCUTS */}
        <section className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-sm sm:text-base text-[#1A1A1A]">
              Kategori Pricelist Resmi 2026
            </h3>
            <button
              onClick={() => onNavigate('catalog')}
              className="text-xs text-[#1A1A1A] hover:text-[#8B5A2B] font-semibold flex items-center gap-0.5 cursor-pointer transition-colors"
            >
              <span>Semua (14)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Category 1: Premium Espresso Blend */}
            <div
              onClick={() => handleCategoryClick('premium')}
              className="p-3.5 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#1A1A1A]/40 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex sm:flex-col justify-between items-start gap-2 group"
            >
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#8B5A2B] bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#E8DFD5] font-mono-numbers">
                  6 VARIAN
                </span>
                <h4 className="font-serif font-bold text-sm text-[#1A1A1A] mt-1.5 group-hover:text-[#8B5A2B] transition-colors">
                  Premium Blend
                </h4>
                <p className="text-[11px] text-[#6B7280] mt-0.5">
                  Fijne Dag Series (Medium Roast) · 200g, 500g, 1000g
                </p>
              </div>
              <span className="text-xs font-semibold text-[#1A1A1A] group-hover:text-[#8B5A2B] flex items-center gap-0.5 sm:mt-2 transition-colors">
                Lihat <ArrowRight className="w-3 h-3" />
              </span>
            </div>

            {/* Category 2: Komersial Espresso Blend */}
            <div
              onClick={() => handleCategoryClick('komersial')}
              className="p-3.5 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#1A1A1A]/40 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex sm:flex-col justify-between items-start gap-2 group"
            >
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A] bg-[#F3F4F6] px-2 py-0.5 rounded border border-[#E5E7EB] font-mono-numbers">
                  6 VARIAN · 1KG
                </span>
                <h4 className="font-serif font-bold text-sm text-[#1A1A1A] mt-1.5 group-hover:text-[#8B5A2B] transition-colors">
                  Komersial Blend
                </h4>
                <p className="text-[11px] text-[#6B7280] mt-0.5">
                  Mazzel Dragger Series (Med-Dark) · 1000g kemasan besar
                </p>
              </div>
              <span className="text-xs font-semibold text-[#1A1A1A] group-hover:text-[#8B5A2B] flex items-center gap-0.5 sm:mt-2 transition-colors">
                Lihat <ArrowRight className="w-3 h-3" />
              </span>
            </div>

            {/* Category 3: Robusta Series */}
            <div
              onClick={() => handleCategoryClick('robusta')}
              className="p-3.5 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#1A1A1A]/40 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex sm:flex-col justify-between items-start gap-2 group"
            >
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#8B5A2B] bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#E8DFD5] font-mono-numbers">
                  2 VARIAN
                </span>
                <h4 className="font-serif font-bold text-sm text-[#1A1A1A] mt-1.5 group-hover:text-[#8B5A2B] transition-colors">
                  Robusta Series
                </h4>
                <p className="text-[11px] text-[#6B7280] mt-0.5">
                  Fine Temanggung & Komersial Robusta Banyumas
                </p>
              </div>
              <span className="text-xs font-semibold text-[#1A1A1A] group-hover:text-[#8B5A2B] flex items-center gap-0.5 sm:mt-2 transition-colors">
                Lihat <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </section>

        {/* 5. HELPFUL FOOTER CARDS */}
        <section className="pt-2 space-y-3">
          {/* Grind Guide Card */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 shadow-2xs flex items-center justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] flex items-center justify-center text-[#1A1A1A] shrink-0 mt-0.5">
                <Coffee className="w-5 h-5 text-[#8B5A2B] stroke-[2]" />
              </div>
              <div className="min-w-0">
                <h4 className="font-serif font-bold text-xs sm:text-sm text-[#1A1A1A]">
                  Butuh Biji yang Digiling?
                </h4>
                <p className="text-[11px] text-[#6B7280] mt-0.5">
                  Pilih gilingan Halus, Sedang, atau Kasar saat pemesanan
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsGrindGuideOpen(true)}
              className="px-3.5 py-1.5 bg-[#F8F9FA] hover:bg-[#E5E7EB] active:scale-95 text-[#1A1A1A] text-xs font-semibold rounded-xl border border-[#E5E7EB] flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#8B5A2B]" />
              <span>Panduan</span>
            </button>
          </div>

          {/* Ethos Card (Black & White Signage Aesthetic) */}
          <div className="bg-gradient-to-br from-[#1A1A1A] via-[#242424] to-[#121212] rounded-2xl border border-[#2E2E2E] p-4 text-white shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <Sprout className="w-4 h-4 text-[#C49A6C]" />
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#E8DFD5]">
                ETIS & BERKELANJUTAN
              </span>
            </div>

            <h4 className="font-serif font-bold text-sm sm:text-base text-white tracking-tight">
              Dari Petani Lokal Langsung ke Cangkir Anda
            </h4>

            <p className="text-xs text-[#E5E0D8]/85 leading-relaxed">
              Patawi Coffee Roastery di Purwokerto bermitra langsung dengan petani di lereng Gunung Slamet & Jawa Tengah untuk perdagangan langsung yang adil dan transparan.
            </p>

            <div className="pt-1 flex items-center gap-3 text-[10px] text-[#C49A6C] font-mono-numbers">
              <span>✓ Direct Trade</span>
              <span>·</span>
              <span>✓ Fresh Batch Roasted</span>
              <span>·</span>
              <span>✓ Cast Iron Drum</span>
            </div>
          </div>
        </section>
      </div>

      {/* Grind Size Guide Modal */}
      {isGrindGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-sm bg-white rounded-2xl border border-[#E5E7EB] shadow-2xl overflow-hidden flex flex-col">
            <div className="px-4 py-3 bg-[#F8F9FA] border-b border-[#E5E7EB] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-[#8B5A2B]" />
                <h3 className="font-serif font-bold text-sm text-[#1A1A1A]">
                  Panduan Ukuran Gilingan (Grind Size)
                </h3>
              </div>
              <button
                onClick={() => setIsGrindGuideOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-[#6B7280] hover:text-[#1A1A1A] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3 text-xs">
              <div className="p-2.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB]">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#1A1A1A]">Giling Halus (Fine ~ 250μm)</span>
                  <span className="text-[10px] text-[#8B5A2B] font-mono-numbers font-bold">ESPRESSO</span>
                </div>
                <p className="text-[11px] text-[#6B7280] mt-1">
                  Ideal untuk Mesin Espresso Komersial, Rok Presso, Flair, Mokapot, dan Tubruk Halus.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB]">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#1A1A1A]">Giling Sedang (Medium ~ 500μm)</span>
                  <span className="text-[10px] text-[#8B5A2B] font-mono-numbers font-bold">FILTER DRIP</span>
                </div>
                <p className="text-[11px] text-[#6B7280] mt-1">
                  Pilihan tepat untuk V60, Kalita Wave, Aeropress, Clever Dripper, dan Chemex.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB]">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#1A1A1A]">Giling Kasar (Coarse ~ 800μm)</span>
                  <span className="text-[10px] text-[#8B5A2B] font-mono-numbers font-bold">COLD BREW</span>
                </div>
                <p className="text-[11px] text-[#6B7280] mt-1">
                  Sangat cocok untuk French Press, Cold Brew perendaman dingin 12–18 jam, dan Syphon.
                </p>
              </div>

              <div className="p-2.5 bg-[#FAF7F2] rounded-xl border border-[#E8DFD5] flex items-start gap-2 text-[11px] text-[#5C4033]">
                <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#8B5A2B]" />
                <span>
                  Biji digiling sesaat sebelum dikemas menggunakan Mahlkönig EK43 di roastery kami.
                </span>
              </div>
            </div>

            <div className="p-3 bg-[#F8F9FA] border-t border-[#E5E7EB]">
              <button
                onClick={() => setIsGrindGuideOpen(false)}
                className="w-full py-2 bg-[#1A1A1A] hover:bg-[#2C2C2C] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Mengerti
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
