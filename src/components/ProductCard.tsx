import React, { useState } from 'react';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Product, PriceTier, SizeOption } from '../types';
import { formatRupiah, getProductPrice } from '../utils/pricing';
import { CoffeeImage } from './CoffeeImage';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  userTier?: PriceTier;
  isAdded?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onQuickAdd,
  userTier = 'regular',
  isAdded = false,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const defaultSize: SizeOption = product.sizes.includes('200g') ? '200g' : product.sizes[0] || '1kg';
  const displayPrice = getProductPrice(product, defaultSize, userTier);
  const sizeLabel = defaultSize === '1kg' ? '1.000 gram' : defaultSize === '500g' ? '500 gram' : '200 gram';

  return (
    <div
      onClick={() => onSelect(product)}
      className="bg-white rounded-2xl border border-[#EBE6DF] p-2.5 sm:p-3 shadow-2xs hover:shadow-md hover:border-[#D5CDC2] transition-all flex flex-col justify-between cursor-pointer group"
    >
      <div>
        {/* Top Image Container with Badges */}
        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#F3EFEA] border border-[#EFEAE2]">
          <CoffeeImage
            src={product.image}
            alt={product.name}
            regionTag={product.regionTag}
          />

          {/* Badge: Fresh Roast, Stok 14, Pilihan Barista, etc. */}
          {product.badge && (
            <span className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#1C1815]/90 text-white backdrop-blur-xs border border-white/20 shadow-xs">
              {product.badge}
            </span>
          )}

          {/* Heart icon button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsWishlisted((prev) => !prev);
            }}
            aria-label="Tambah ke favorit"
            className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-[#4A3E36] backdrop-blur-xs flex items-center justify-center transition-all shadow-xs cursor-pointer"
          >
            <Heart
              className={`w-3.5 h-3.5 ${
                isWishlisted ? 'fill-[#DC2626] text-[#DC2626]' : 'text-[#7A6A5A]'
              }`}
            />
          </button>
        </div>

        {/* Region & Rating */}
        <div className="mt-2.5 flex items-center justify-between text-[10px] font-bold">
          <span className="text-[#8C6239] uppercase tracking-wider truncate">
            {product.regionTag}
          </span>
          <div className="flex items-center gap-0.5 text-[#D97706] shrink-0 font-mono-numbers">
            <Star className="w-3 h-3 fill-[#D97706]" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Product Title */}
        <h3 className="font-serif font-bold text-xs sm:text-sm text-[#1A1A1A] mt-0.5 leading-snug line-clamp-1 group-hover:text-[#8C6239] transition-colors">
          {product.name}
        </h3>

        {/* Tasting Notes */}
        <p className="text-[10px] text-[#7A6A5A] mt-0.5 line-clamp-1 italic">
          {product.tastingNotes.join(', ')}
        </p>

        {/* Chips */}
        <div className="flex items-center gap-1 mt-2 flex-wrap">
          {product.chips.slice(0, 3).map((chip, idx) => (
            <span
              key={idx}
              className="text-[9px] font-medium px-1.5 py-0.5 rounded-md bg-[#FAF5EE] text-[#6E5F52] border border-[#EFE5D7]"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Pricing & Cart Action */}
      <div className="mt-3 pt-2 border-t border-[#F3EFEA] flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1">
            <span className="text-[9px] text-[#7A6A5A] block leading-none">{sizeLabel}</span>
            {userTier === 'member' && (
              <span className="text-[8px] font-bold px-1 py-0.2 rounded bg-amber-100 text-amber-800">
                Member
              </span>
            )}
          </div>
          <span className="font-bold text-xs sm:text-sm text-[#1A1A1A] leading-tight font-mono-numbers">
            {formatRupiah(displayPrice)}
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onQuickAdd(product);
          }}
          aria-label={`Tambah ${product.name} ke keranjang`}
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-90 ${
            isAdded
              ? 'bg-[#10B981] text-white'
              : 'bg-[#1C1815] hover:bg-[#332A24] text-white'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
