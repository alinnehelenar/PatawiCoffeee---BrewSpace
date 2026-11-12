import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Star,
  Plus,
  Check,
  Heart,
  X,
  Coffee,
} from 'lucide-react';
import { Product, ScreenId, CategoryFilter, RoastProfileFilter } from '../types';
import { formatRupiah } from '../utils/pricing';
import { CoffeeImage } from './CoffeeImage';

interface ScreenCatalogProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCartDirect: (product: Product) => void;
  onNavigate: (screen: ScreenId) => void;
  addedProductId?: string | null;
  initialCategory?: CategoryFilter;
}

const CATEGORY_TABS: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'Semua Koleksi' },
  { id: 'premium', label: 'Premium Blend' },
  { id: 'komersial', label: 'Komersial (1kg)' },
  { id: 'robusta', label: 'Robusta' },
];

const ROAST_FILTERS: { id: RoastProfileFilter; label: string }[] = [
  { id: 'all', label: 'Semua Sangrai' },
  { id: 'medium', label: 'Medium Roast' },
  { id: 'medium-dark', label: 'Medium to Dark' },
];

export const ScreenCatalog: React.FC<ScreenCatalogProps> = ({
  products,
  onSelectProduct,
  onAddToCartDirect,
  onNavigate,
  addedProductId,
  initialCategory = 'all',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>(initialCategory);
  const [activeRoast, setActiveRoast] = useState<RoastProfileFilter>('all');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const toggleFavorite = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  // Filtered Products List
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search query (name, subtitle, tasting notes, region tag)
      if (searchQuery.trim().length > 0) {
        const query = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchSubtitle = product.subtitle.toLowerCase().includes(query);
        const matchNotes = product.tastingNotes.some((n) => n.toLowerCase().includes(query));
        const matchOrigin = product.origin.toLowerCase().includes(query);
        const matchRegion = product.regionTag?.toLowerCase().includes(query) ?? false;
        if (!matchName && !matchSubtitle && !matchNotes && !matchOrigin && !matchRegion) {
          return false;
        }
      }

      // Category filter (premium, komersial, robusta)
      if (activeCategory !== 'all') {
        if (product.category !== activeCategory) {
          return false;
        }
      }

      // Roast Profile filter
      if (activeRoast !== 'all') {
        if (product.roastProfile !== activeRoast) {
          return false;
        }
      }

      // Stock filter
      if (onlyInStock && product.stock <= 0) {
        return false;
      }

      return true;
    });
  }, [products, searchQuery, activeCategory, activeRoast, onlyInStock]);

  const hasActiveFilters =
    activeCategory !== 'all' ||
    activeRoast !== 'all' ||
    onlyInStock ||
    searchQuery.trim().length > 0;

  const resetFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setActiveRoast('all');
    setOnlyInStock(false);
  };

  return (
    <div className="bg-[#F8F9FA] text-[#1A1A1A] pb-28 select-none min-h-screen font-sans">
      {/* 1. SEARCH BAR & HEADER CONTAINER */}
      <section className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-3.5 pb-2.5">
          <div className="flex items-center gap-2">
            {/* Search Input Box */}
            <div className="relative flex-1 flex items-center bg-[#F8F9FA] rounded-xl border border-[#E5E7EB] focus-within:border-[#1A1A1A] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#1A1A1A]/10 shadow-xs transition-all">
              <Search className="w-4 h-4 text-[#8C827A] ml-3 shrink-0 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari blend, robusta, sangrai, rasa..."
                className="w-full py-2.5 pl-2.5 pr-8 bg-transparent text-xs text-[#1A1A1A] placeholder:text-[#9CA3AF] focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-2.5 w-5 h-5 rounded-full bg-[#E5E7EB] hover:bg-[#D1D5DB] text-[#4B5563] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setIsFilterDrawerOpen((prev) => !prev)}
              aria-label="Filter options"
              className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all cursor-pointer shrink-0 ${
                isFilterDrawerOpen || hasActiveFilters
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-xs'
                  : 'bg-white text-[#4B5563] hover:text-[#1A1A1A] border-[#E5E7EB] hover:bg-[#F3F4F6] shadow-xs'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Filter Drawer */}
          {isFilterDrawerOpen && (
            <div className="mt-2.5 pt-2.5 border-t border-[#E5E7EB] animate-fadeIn space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider">
                  Filter Cepat
                </span>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-[11px] text-[#8B5A2B] font-medium hover:underline cursor-pointer"
                  >
                    Reset Semua
                  </button>
                )}
              </div>

              {/* Toggle Only In-Stock */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-[#374151]">Hanya Biji Kopi Tersedia (In Stock)</span>
                <button
                  type="button"
                  onClick={() => setOnlyInStock((prev) => !prev)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${
                    onlyInStock ? 'bg-[#1A1A1A]' : 'bg-[#D1D5DB]'
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                      onlyInStock ? 'translate-x-4.5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Content Body */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-3.5 space-y-4">
        {/* Category Filter Chips */}
        <section className="space-y-2">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`whitespace-nowrap shrink-0 px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer font-medium ${
                    isActive
                      ? 'bg-[#1A1A1A] text-white shadow-xs font-semibold'
                      : 'bg-white text-[#4B5563] hover:text-[#1A1A1A] hover:bg-[#F3F4F6] border border-[#E5E7EB]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Roast Profile Sub-filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {ROAST_FILTERS.map((rf) => {
              const isActive = activeRoast === rf.id;
              return (
                <button
                  key={rf.id}
                  onClick={() => setActiveRoast(rf.id)}
                  className={`whitespace-nowrap shrink-0 px-3 py-1 rounded-lg text-[11px] transition-all cursor-pointer font-medium ${
                    isActive
                      ? 'bg-[#FAF7F2] text-[#8B5A2B] border border-[#E8DFD5] font-semibold'
                      : 'bg-white text-[#6B7280] hover:text-[#1A1A1A] border border-[#E5E7EB]'
                  }`}
                >
                  {rf.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Product Catalog Grid */}
        <section id="koleksi-biji-kopi" className="pt-1 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-sm sm:text-base text-[#1A1A1A]">
                Pricelist Resmi Januari 2026
              </h3>
              <span className="text-[10px] bg-[#FAF7F2] text-[#8B5A2B] border border-[#E8DFD5] font-mono-numbers font-bold px-2 py-0.5 rounded-md">
                {filteredProducts.length} Pilihan
              </span>
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[11px] text-[#8B5A2B] font-medium hover:underline cursor-pointer"
              >
                Tampilkan Semua
              </button>
            )}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 text-center space-y-2">
              <Coffee className="w-8 h-8 text-[#9CA3AF] mx-auto opacity-60" />
              <h4 className="text-sm font-semibold text-[#1A1A1A]">
                Tidak ada biji kopi yang cocok
              </h4>
              <p className="text-xs text-[#6B7280]">
                Coba ubah kata kunci pencarian atau reset filter kategori.
              </p>
              <button
                onClick={resetFilters}
                className="mt-2 px-3 py-1.5 bg-[#1A1A1A] text-white text-xs font-semibold rounded-lg cursor-pointer"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            /* Responsive 2-column mobile, 3-4 column desktop grid */
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {filteredProducts.map((product) => {
                const isFavorite = !!favorites[product.id];
                const isOutOfStock = product.stock <= 0;

                return (
                  <div
                    key={product.id}
                    onClick={() => onSelectProduct(product)}
                    className="group bg-white rounded-2xl border border-[#E5E7EB] hover:border-[#1A1A1A]/40 shadow-2xs hover:shadow-sm p-3 transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden"
                  >
                    <div>
                      {/* Top: Region & Rating */}
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className="text-[9px] font-bold text-[#8B5A2B] tracking-wider uppercase truncate max-w-[95px]">
                          {product.category === 'komersial' ? 'KOMERSIAL 1KG' : product.regionTag || 'PURWOKERTO'}
                        </span>

                        <div className="flex items-center gap-0.5 text-amber-500 font-mono-numbers text-[10px] font-semibold shrink-0">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{product.rating ?? 4.8}</span>
                        </div>
                      </div>

                      {/* Product Image Container */}
                      <div className="relative aspect-square w-full rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] overflow-hidden mb-2.5">
                        <CoffeeImage
                          src={product.image}
                          alt={product.name}
                          regionTag={product.regionTag}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Badges on image */}
                        <div className="absolute top-1.5 left-1.5 flex flex-col gap-1 items-start z-10">
                          {product.isFreshRoast !== false && (
                            <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-[#1A1A1A]/90 text-[#E8DFD5] tracking-tight backdrop-blur-xs font-mono-numbers">
                              Fresh Roast
                            </span>
                          )}
                          <span
                            className={`text-[8px] font-bold px-1.5 py-0.5 rounded backdrop-blur-xs font-mono-numbers ${
                              isOutOfStock
                                ? 'bg-red-500/90 text-white'
                                : product.stock <= 5
                                ? 'bg-amber-500/90 text-white'
                                : 'bg-[#1A1A1A]/75 text-white'
                            }`}
                          >
                            {isOutOfStock ? 'Habis' : `Stok ${product.stock}`}
                          </span>
                        </div>

                        {/* Heart Favorite Button */}
                        <button
                          type="button"
                          onClick={(e) => toggleFavorite(product.id, e)}
                          aria-label={`Favorite ${product.name}`}
                          className={`absolute top-1.5 right-1.5 w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer z-10 ${
                            isFavorite
                              ? 'bg-red-50 text-red-500 shadow-xs'
                              : 'bg-white/80 text-[#8C827A] hover:text-red-500 hover:bg-white shadow-2xs'
                          }`}
                        >
                          <Heart
                            className={`w-3.5 h-3.5 ${
                              isFavorite ? 'fill-red-500 stroke-red-500' : ''
                            }`}
                          />
                        </button>
                      </div>

                      {/* Product Name */}
                      <h4 className="font-serif font-bold text-sm text-[#1A1A1A] group-hover:text-[#8B5A2B] transition-colors line-clamp-1 leading-snug">
                        {product.name}
                      </h4>

                      {/* Tasting Notes */}
                      <p className="text-[11px] text-[#6B7280] line-clamp-1 italic mt-0.5">
                        {product.tastingNotes.join(', ')}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-1 mt-1.5">
                        <span className="text-[9px] bg-[#F3F4F6] text-[#374151] font-medium px-1.5 py-0.5 rounded font-mono-numbers">
                          {product.roastProfile}
                        </span>
                        <span className="text-[9px] bg-[#F3F4F6] text-[#374151] font-medium px-1.5 py-0.5 rounded font-mono-numbers">
                          {product.sizes.length === 1 ? '1000g' : '200g–1kg'}
                        </span>
                      </div>
                    </div>

                    {/* Bottom: Price + Quick Add to Cart button */}
                    <div className="mt-2.5 pt-2 border-t border-[#F3F4F6] flex items-end justify-between gap-1">
                      <div>
                        <div className="text-[9px] text-[#8C827A] font-medium">
                          {product.sizes.length === 1 ? 'Ukuran 1000g' : 'Mulai 200g'}
                        </div>
                        <div className="font-mono-numbers font-bold text-xs sm:text-sm text-[#1A1A1A]">
                          {formatRupiah(product.regularPrice)}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isOutOfStock) {
                            onAddToCartDirect(product);
                          }
                        }}
                        disabled={isOutOfStock}
                        aria-label={`Tambah ${product.name} ke keranjang`}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shrink-0 shadow-xs cursor-pointer ${
                          isOutOfStock
                            ? 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
                            : addedProductId === product.id
                            ? 'bg-emerald-700 text-white scale-105'
                            : 'bg-[#1A1A1A] hover:bg-[#2C2C2C] text-white active:scale-90'
                        }`}
                      >
                        {addedProductId === product.id ? (
                          <Check className="w-4 h-4 stroke-[3]" />
                        ) : (
                          <Plus className="w-4 h-4 stroke-[2.5]" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
