import React, { useState } from 'react';
import { Product, ScreenId, CategoryFilter, PriceTier } from '../types';
import { ProductCard } from './ProductCard';

interface ScreenHomeProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCartDirect: (product: Product) => void;
  onNavigate: (screen: ScreenId) => void;
  onSelectCategory?: (category: CategoryFilter) => void;
  addedProductId?: string | null;
  userTier?: PriceTier;
}

export const ScreenHome: React.FC<ScreenHomeProps> = ({
  products,
  onSelectProduct,
  onAddToCartDirect,
  addedProductId,
  userTier = 'regular',
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'premium' | 'komersial' | 'robusta'>('all');

  const filteredProducts = products.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'premium') return p.category === 'premium';
    if (activeFilter === 'komersial') return p.category === 'komersial';
    if (activeFilter === 'robusta') return p.category === 'robusta';
    return true;
  });

  return (
    <div className="bg-[#FAF8F5] text-[#1A1A1A] pb-24 min-h-screen select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 space-y-4">
        {/* Section Header: Koleksi Biji Kopi • Menampilkan N Varian */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <h2 className="font-serif font-bold text-base sm:text-lg text-[#1A1A1A]">
              Koleksi Biji Kopi
            </h2>
            <span className="w-2 h-2 rounded-full bg-[#D97706]" />
          </div>

          <span className="text-[11px] font-medium text-[#7A6A5A]">
            Menampilkan {filteredProducts.length} Varian
          </span>
        </div>

        {/* Filter Chips Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'all', label: 'Semua Koleksi' },
            { id: 'premium', label: 'Premium Espresso' },
            { id: 'komersial', label: 'Komersial Blend (1kg)' },
            { id: 'robusta', label: 'Robusta Series' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as typeof activeFilter)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-[#1C1815] text-white shadow-xs'
                  : 'bg-white text-[#6E5F52] border border-[#E8E2D9] hover:bg-[#F3EFEA]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 2-Column Product Grid (Responsive: 2 cols on mobile, 3-4 cols on desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filteredProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onSelect={onSelectProduct}
              onQuickAdd={onAddToCartDirect}
              userTier={userTier}
              isAdded={addedProductId === prod.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
