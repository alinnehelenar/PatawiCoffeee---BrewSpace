import React, { useState } from 'react';
import { Minus, Plus, Flame, ShieldCheck, Share2, Sparkles, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { Product, SizeOption, GrindOption, PriceTier, CartItem } from '../types';
import { getProductPrice, formatRupiah } from '../utils/pricing';

interface ScreenDetailProps {
  product: Product;
  onAddToCart: (item: CartItem, proceedToCheckout: boolean) => void;
  onBack: () => void;
  defaultTier?: PriceTier;
}

export const ScreenDetail: React.FC<ScreenDetailProps> = ({
  product,
  onAddToCart,
  onBack,
  defaultTier = 'member',
}) => {
  const [selectedSize, setSelectedSize] = useState<SizeOption>(
    product.sizes.includes('200g') ? '200g' : product.sizes[0] || '1kg'
  );
  const [selectedGrind, setSelectedGrind] = useState<GrindOption>('Espresso');
  const [selectedTier, setSelectedTier] = useState<PriceTier>(defaultTier);
  const [quantity, setQuantity] = useState<number>(2);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  React.useEffect(() => {
    setSelectedTier(defaultTier);
  }, [defaultTier]);

  // Dynamic price based on product, size, and tier
  const unitPrice = getProductPrice(product, selectedSize, selectedTier);
  const subtotal = unitPrice * quantity;
  const regularPriceForSize = getProductPrice(product, selectedSize, 'regular');
  const memberPriceForSize = getProductPrice(product, selectedSize, 'member');
  const memberSavings = regularPriceForSize - memberPriceForSize;

  const handleAdd = (proceed: boolean) => {
    const item: CartItem = {
      product,
      size: selectedSize,
      grind: selectedGrind,
      tier: selectedTier,
      quantity,
      unitPrice,
    };
    setAddedSuccess(true);
    setTimeout(() => {
      onAddToCart(item, proceed);
    }, 250);
  };

  return (
    <div className="bg-[#F8F9FA] text-[#1A1A1A] pb-32 min-h-screen font-sans">
      {/* Desktop / Mobile Responsive Shell */}
      <div className="max-w-5xl mx-auto md:p-6 lg:p-8">
        <div className="md:grid md:grid-cols-12 md:gap-8 md:items-start">
          {/* Left Column (Desktop) / Top Section (Mobile): Product Image */}
          <div className="md:col-span-5 lg:col-span-5">
            <section className="relative w-full bg-white md:rounded-2xl border-b md:border border-[#E5E7EB] flex items-center justify-center p-6 md:p-8 overflow-hidden shadow-xs">
              {/* Ambient subtle glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#8B5A2B]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain drop-shadow-xl transform hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Industrial Badge Overlay */}
              <div className="absolute top-3 left-4 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-md border border-[#E5E7EB] text-[10px] font-mono-numbers text-[#1A1A1A] flex items-center gap-1.5 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5A2B]" />
                <span className="font-semibold">ROASTED IN PURWOKERTO</span>
              </div>

              {/* Roast batch details */}
              <div className="absolute bottom-3 right-4 px-2 py-0.5 bg-[#F8F9FA] rounded-md border border-[#E5E7EB] text-[10px] text-[#6B7280] font-mono-numbers shadow-2xs">
                BATCH #55 · PROBAT CAST DRUM
              </div>
            </section>
          </div>

          {/* Right Column (Desktop) / Lower Section (Mobile): Product Details & Configuration */}
          <div className="md:col-span-7 lg:col-span-7 px-4 pt-4 md:px-0 md:pt-0 space-y-5">
            {/* Title & Info */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold text-[#8B5A2B] uppercase tracking-wider bg-[#FAF7F2] px-2 py-0.5 rounded-md border border-[#E8DFD5] font-mono-numbers">
                  {product.regionTag || 'PURWOKERTO'}
                </span>
                <span className="text-xs text-[#9CA3AF]">•</span>
                <span className="text-xs text-[#6B7280] font-mono-numbers">
                  Altitude {product.altitude}
                </span>
              </div>

              <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1A1A] tracking-tight">
                {product.name}
              </h1>
              <p className="text-xs sm:text-sm text-[#8B5A2B] font-semibold tracking-wide mt-1">
                {product.subtitle} · {product.roastLevel}
              </p>

              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mt-2.5">
                {product.description}
              </p>
            </div>

            {/* Flavor Profile Notes */}
            <div className="bg-white rounded-2xl p-4 border border-[#E5E7EB] shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
                  Flavor Profile Notes
                </span>
                <span className="text-[11px] text-[#8B5A2B] font-mono-numbers font-medium">
                  {product.blendRatio}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {product.tastingNotes.map((note, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-[#FAF7F2] text-[#5C4033] border border-[#E8DFD5] text-xs font-medium"
                  >
                    {note}
                  </span>
                ))}
              </div>

              {/* Cup Attributes */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#F3F4F6] text-center">
                <div className="p-2 rounded-xl bg-[#F8F9FA]">
                  <div className="text-[10px] text-[#6B7280] uppercase">Acidity</div>
                  <div className="font-bold text-xs text-[#1A1A1A] font-mono-numbers mt-0.5">
                    {product.acidity}/5 ({product.acidity <= 2 ? 'Low-Med' : 'Bright'})
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-[#F8F9FA]">
                  <div className="text-[10px] text-[#6B7280] uppercase">Body</div>
                  <div className="font-bold text-xs text-[#1A1A1A] font-mono-numbers mt-0.5">
                    {product.body}/5 ({product.body >= 4 ? 'Full' : 'Medium'})
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-[#F8F9FA]">
                  <div className="text-[10px] text-[#6B7280] uppercase">Sweetness</div>
                  <div className="font-bold text-xs text-[#1A1A1A] font-mono-numbers mt-0.5">
                    {product.sweetness}/5 ({product.sweetness >= 4 ? 'High' : 'Smooth'})
                  </div>
                </div>
              </div>
            </div>

            {/* Price Tier Selector/Toggle: Regular Price vs Member Price */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                  Tingkat Harga (Price Tier)
                </label>
                {memberSavings > 0 && (
                  <span className="text-[11px] text-[#8B5A2B] font-semibold font-mono-numbers">
                    Member Hemat {formatRupiah(memberSavings)}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2.5 p-1 bg-[#F3F4F6] rounded-xl border border-[#E5E7EB]">
                <button
                  type="button"
                  onClick={() => setSelectedTier('regular')}
                  className={`py-2 px-3 rounded-lg text-xs font-medium transition-all text-left flex flex-col cursor-pointer ${
                    selectedTier === 'regular'
                      ? 'bg-white text-[#1A1A1A] border border-[#1A1A1A] shadow-xs ring-1 ring-[#1A1A1A]'
                      : 'text-[#6B7280] hover:text-[#1A1A1A]'
                  }`}
                >
                  <span className="text-[10px] text-[#6B7280] uppercase font-semibold">
                    Regular Price
                  </span>
                  <span className="text-sm sm:text-base font-bold font-mono-numbers text-[#1A1A1A] mt-0.5">
                    {formatRupiah(regularPriceForSize)}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedTier('member')}
                  className={`py-2 px-3 rounded-lg text-xs font-medium transition-all text-left flex flex-col cursor-pointer ${
                    selectedTier === 'member'
                      ? 'bg-[#1A1A1A] text-white shadow-xs'
                      : 'text-[#6B7280] hover:text-[#1A1A1A]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] uppercase font-semibold ${
                        selectedTier === 'member' ? 'text-[#E8DFD5]' : 'text-[#8B5A2B]'
                      }`}
                    >
                      Member Price
                    </span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-bold font-mono-numbers ${
                        selectedTier === 'member'
                          ? 'bg-white/20 text-white'
                          : 'bg-[#8B5A2B]/10 text-[#8B5A2B]'
                      }`}
                    >
                      VIP
                    </span>
                  </div>
                  <span
                    className={`text-sm sm:text-base font-bold font-mono-numbers mt-0.5 ${
                      selectedTier === 'member' ? 'text-white' : 'text-[#8B5A2B]'
                    }`}
                  >
                    {formatRupiah(memberPriceForSize)}
                  </span>
                </button>
              </div>
            </div>

            {/* Size Variant Selector: [200g], [500g], [1kg] */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                  Pilihan Ukuran Kemasan (Size Variant)
                </label>
                <span className="text-xs font-mono-numbers text-[#1A1A1A] font-semibold">
                  {selectedSize === '1kg' ? '1kg (1000 gram)' : selectedSize}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  const price = getProductPrice(product, size, selectedTier);
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-mono-numbers font-medium transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-[#FAF7F2] text-[#1A1A1A] border-[#1A1A1A] shadow-xs ring-1 ring-[#1A1A1A]'
                          : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:border-[#D1D5DB] hover:text-[#1A1A1A]'
                      }`}
                    >
                      <div className="font-bold text-sm">
                        {size === '1kg' ? '1kg / 1000g' : size}
                      </div>
                      <div className="text-[10px] text-[#6B7280] mt-0.5 font-medium">
                        {formatRupiah(price)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Grind Type Selector: [Whole Beans], [Espresso], [Filter], [Coarse] */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                  Pilihan Gilingan (Grind Type)
                </label>
                <span className="text-xs text-[#1A1A1A] font-semibold">
                  {selectedGrind}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {product.grinds.map((grind) => {
                  const isSelected = selectedGrind === grind;
                  return (
                    <button
                      key={grind}
                      type="button"
                      onClick={() => setSelectedGrind(grind)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-medium transition-all text-left border cursor-pointer ${
                        isSelected
                          ? 'bg-[#FAF7F2] text-[#1A1A1A] border-[#1A1A1A] shadow-xs ring-1 ring-[#1A1A1A]'
                          : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:border-[#D1D5DB] hover:text-[#1A1A1A]'
                      }`}
                    >
                      <div className="font-semibold text-xs flex items-center justify-between">
                        <span>{grind}</span>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8B5A2B]" />
                        )}
                      </div>
                      <div className="text-[10px] text-[#6B7280] mt-0.5">
                        {grind === 'Whole Beans'
                          ? 'Kesegaran maksimal biji sangrai'
                          : grind === 'Espresso'
                          ? 'Kalibrasi halus 250μm mesin'
                          : grind === 'Filter'
                          ? 'V60 / Kalita Wave / Aeropress'
                          : 'French Press / Cold Brew'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar: Quantity selector & main CTA button in Sleek Matte Black */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E5E7EB] p-3 sm:p-4 shadow-lg">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          {/* Back button for convenience on desktop */}
          <button
            type="button"
            onClick={onBack}
            className="hidden sm:flex items-center gap-1.5 px-3 h-12 rounded-xl border border-[#E5E7EB] hover:bg-[#F3F4F6] text-xs font-medium text-[#4B5563] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Katalog</span>
          </button>

          {/* Quantity Selector: - 2 + */}
          <div className="flex items-center bg-[#F8F9FA] rounded-xl border border-[#E5E7EB] p-1 shrink-0">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-[#4B5563] hover:bg-white active:scale-95 transition-all cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center text-sm font-bold font-mono-numbers text-[#1A1A1A]">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Increase quantity"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-[#4B5563] hover:bg-white active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Main CTA button: Add to Cart in Sleek Patawi Matte Black */}
          <button
            type="button"
            onClick={() => handleAdd(true)}
            className="flex-1 h-12 bg-[#1A1A1A] hover:bg-[#2C2C2C] active:scale-[0.98] text-white font-semibold text-xs sm:text-sm tracking-tight rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            {addedSuccess ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Berhasil Ditambahkan</span>
              </>
            ) : (
              <>
                <span>Tambah ke Keranjang — {formatRupiah(subtotal)}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
