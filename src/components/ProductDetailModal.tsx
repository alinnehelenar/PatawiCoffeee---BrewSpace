import React, { useState } from 'react';
import { X, Sparkles, HelpCircle, Minus, Plus, ShoppingBag, Coffee } from 'lucide-react';
import { Product, SizeOption, GrindOption, PriceTier, CartItem } from '../types';
import { formatRupiah, getProductPrice } from '../utils/pricing';
import { CoffeeImage } from './CoffeeImage';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToCart: (item: CartItem) => void;
  onOpenGrindGuide: () => void;
  userTier?: PriceTier;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  isOpen,
  onClose,
  product,
  onAddToCart,
  onOpenGrindGuide,
  userTier = 'regular',
}) => {
  if (!isOpen || !product) return null;

  const availableSizes: SizeOption[] = product.sizes && product.sizes.length > 0 ? product.sizes : ['200g', '500g', '1kg'];
  const defaultInitialSize: SizeOption = availableSizes.includes('200g') ? '200g' : availableSizes[0];

  const [selectedSize, setSelectedSize] = useState<SizeOption>(defaultInitialSize);
  const [selectedGrind, setSelectedGrind] = useState<GrindOption>('Biji Utuh (Whole Bean)');
  const [quantity, setQuantity] = useState<number>(1);

  // Sync selectedSize if current selectedSize is not available in product
  const activeSize = availableSizes.includes(selectedSize) ? selectedSize : defaultInitialSize;

  const unitPrice = getProductPrice(product, activeSize, userTier);
  const subtotal = unitPrice * quantity;

  const handleAdd = () => {
    onAddToCart({
      product,
      size: activeSize,
      grind: selectedGrind,
      tier: userTier,
      quantity,
      unitPrice,
    });
    onClose();
  };

  const cupping = product.cuppingProfile || {
    score: 86.5,
    roastDate: 'Sangrai: 2 Hari Lalu',
    acidity: 'Medium',
    acidityLevel: 3,
    body: 'Bold',
    bodyLevel: 4,
    sweetness: 'Tinggi',
    sweetnessLevel: 4,
  };

  const sizes: SizeOption[] = ['200g', '500g', '1kg'];

  const grinds: { id: GrindOption; title: string; badge?: string; desc: string }[] = [
    {
      id: 'Biji Utuh (Whole Bean)',
      title: 'Biji Utuh (Whole Bean)',
      badge: '# Sangat Dianjurkan',
      desc: 'Kesegaran maksimal, giling mandiri sebelum seduh.',
    },
    {
      id: 'Giling Kasar (Coarse)',
      title: 'Giling Kasar (Coarse)',
      desc: 'French Press, Cold Brew, Cupping.',
    },
    {
      id: 'Giling Sedang (Medium)',
      title: 'Giling Sedang (Medium)',
      desc: 'V60, Aeropress, Kalita Wave, Clever Dripper.',
    },
    {
      id: 'Giling Halus (Fine)',
      title: 'Giling Halus (Fine)',
      desc: 'Espresso Machine, Moka Pot, Tubruk Halus.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-lg bg-[#FAF8F5] rounded-t-3xl sm:rounded-3xl border border-[#EBE6DF] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Header with Product Summary */}
        <div className="p-4 bg-white border-b border-[#EBE6DF] flex items-start gap-3 relative">
          <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-[#E8E2D9]">
            <CoffeeImage
              src={product.image}
              alt={product.name}
              regionTag={product.regionTag}
            />
          </div>

          <div className="flex-1 min-w-0 pr-6">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D97706]">
              {product.regionTag} • {product.altitude}
            </span>
            <h2 className="font-serif font-bold text-base text-[#1A1A1A] leading-tight mt-0.5 truncate">
              {product.name}
            </h2>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-bold text-sm text-[#1A1A1A]">
                {formatRupiah(unitPrice)}
              </span>
              <span className="text-[10px] text-[#7A6A5A]">/{selectedSize}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup modal"
            className="w-7 h-7 rounded-full bg-[#F3EFEA] hover:bg-[#EAE4DC] text-[#4A3E36] flex items-center justify-center transition-colors absolute top-4 right-4 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 space-y-4 overflow-y-auto custom-scrollbar">
          {/* Cupping Profile Section */}
          <section className="bg-white p-3.5 rounded-2xl border border-[#E8E2D9] space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#1A1A1A]">
                <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                <span className="uppercase tracking-wider text-[11px]">
                  Profil Rasa (Cupping Score {cupping.score})
                </span>
              </div>
              <span className="text-[10px] text-[#7A6A5A] font-medium">
                {cupping.roastDate}
              </span>
            </div>

            {/* 3 Metric Cards */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {/* Acidity */}
              <div className="bg-[#FAF8F5] p-2 rounded-xl border border-[#EFEAE2]">
                <span className="text-[9px] uppercase font-bold text-[#7A6A5A]">Keasaman</span>
                <div className="font-bold text-xs text-[#1A1A1A] mt-0.5">{cupping.acidity}</div>
                <div className="w-full bg-[#E5DFD7] h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="bg-[#D97706] h-full rounded-full"
                    style={{ width: `${(cupping.acidityLevel / 5) * 100}%` }}
                  />
                </div>
              </div>

              {/* Body */}
              <div className="bg-[#FAF8F5] p-2 rounded-xl border border-[#EFEAE2]">
                <span className="text-[9px] uppercase font-bold text-[#7A6A5A]">Ketebalan</span>
                <div className="font-bold text-xs text-[#1A1A1A] mt-0.5">{cupping.body}</div>
                <div className="w-full bg-[#E5DFD7] h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="bg-[#1C1815] h-full rounded-full"
                    style={{ width: `${(cupping.bodyLevel / 5) * 100}%` }}
                  />
                </div>
              </div>

              {/* Sweetness */}
              <div className="bg-[#FAF8F5] p-2 rounded-xl border border-[#EFEAE2]">
                <span className="text-[9px] uppercase font-bold text-[#7A6A5A]">Manis</span>
                <div className="font-bold text-xs text-[#1A1A1A] mt-0.5">{cupping.sweetness}</div>
                <div className="w-full bg-[#E5DFD7] h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="bg-[#D97706] h-full rounded-full"
                    style={{ width: `${(cupping.sweetnessLevel / 5) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Sizing Section */}
          <section className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#1A1A1A]">Pilih Berat / Ukuran Kemasan</span>
              <span className="text-[10px] text-[#7A6A5A]">
                {availableSizes.length === 1 ? 'Khusus 1.000 gram (1kg)' : 'Zipper Bag + Degassing Valve'}
              </span>
            </div>

            <div
              className={`grid gap-2 ${
                availableSizes.length === 1
                  ? 'grid-cols-1'
                  : availableSizes.length === 2
                  ? 'grid-cols-2'
                  : 'grid-cols-3'
              }`}
            >
              {availableSizes.map((s) => {
                const isSelected = activeSize === s;
                const pPrice = getProductPrice(product, s, userTier);
                const discountTag = product.sizePricing?.[s]?.discountLabel;

                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative ${
                      isSelected
                        ? 'bg-[#1C1815] text-white border-[#1C1815] shadow-sm'
                        : 'bg-white text-[#1A1A1A] border-[#E8E2D9] hover:border-[#D1C7BA]'
                    }`}
                  >
                    <div className="text-xs font-bold">{s === '1kg' ? '1kg (1.000g)' : s}</div>
                    <div
                      className={`text-[11px] font-semibold mt-0.5 ${
                        isSelected ? 'text-[#D97706]' : 'text-[#7A6A5A]'
                      }`}
                    >
                      {formatRupiah(pPrice)}
                    </div>
                    {discountTag && (
                      <span
                        className={`inline-block text-[9px] px-1.5 py-0.2 rounded-full font-bold mt-1.5 ${
                          isSelected
                            ? 'bg-[#D97706] text-white'
                            : 'bg-[#FEE2E2] text-[#B91C1C]'
                        }`}
                      >
                        {discountTag}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Grind Size Section */}
          <section className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#1A1A1A]">Pilih Profil Gilingan (Grind Size)</span>
              <button
                type="button"
                onClick={onOpenGrindGuide}
                className="text-[11px] text-[#D97706] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Panduan Gilingan</span>
                <HelpCircle className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2">
              {grinds.map((g) => {
                const isSelected = selectedGrind === g.id;

                return (
                  <label
                    key={g.id}
                    onClick={() => setSelectedGrind(g.id)}
                    className={`flex items-start gap-3 p-3 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#FFFBF5] border-[#D97706] ring-1 ring-[#D97706]'
                        : 'bg-white border-[#E8E2D9] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#FAF5EE] border border-[#EAE2D5] flex items-center justify-center shrink-0 mt-0.5 text-[#7A6A5A]">
                      <Coffee className="w-3.5 h-3.5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-[#1A1A1A]">{g.title}</span>
                        {g.badge && (
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#FFEDD5] text-[#C2410C] font-bold border border-[#FED7AA]">
                            {g.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#55473C] mt-0.5 leading-snug">
                        {g.desc}
                      </p>
                    </div>

                    <div className="pt-1">
                      <input
                        type="radio"
                        checked={isSelected}
                        onChange={() => setSelectedGrind(g.id)}
                        className="accent-[#D97706] w-4 h-4 cursor-pointer"
                      />
                    </div>
                  </label>
                );
              })}
            </div>
          </section>
        </div>

        {/* Modal Sticky Bottom Action Bar */}
        <div className="p-4 bg-white border-t border-[#EBE6DF] flex items-center justify-between gap-3 shadow-lg">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#7A6A5A] block">
              Subtotal Pesanan
            </span>
            <div className="font-serif font-bold text-base text-[#1A1A1A]">
              {formatRupiah(subtotal)}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quantity Counter */}
            <div className="flex items-center bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] p-0.5">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Kurangi kuantitas"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[#4A3E36] hover:bg-white active:scale-95 transition-all cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-7 text-center font-bold text-xs text-[#1A1A1A]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Tambah kuantitas"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[#4A3E36] hover:bg-white active:scale-95 transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Add to Cart button */}
            <button
              type="button"
              onClick={handleAdd}
              className="px-5 py-2.5 bg-[#1C1815] hover:bg-[#332A24] active:scale-95 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Tambah</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
