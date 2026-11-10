import React, { useState } from 'react';
import { X, Check, Coffee, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { formatRupiah } from '../utils/pricing';

interface AdminProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  onSaveProduct: (updated: Partial<Product>) => void;
}

export const AdminProductModal: React.FC<AdminProductModalProps> = ({
  isOpen,
  onClose,
  product,
  onSaveProduct,
}) => {
  if (!isOpen) return null;

  const isNew = !product;

  const [name, setName] = useState<string>(product?.name || '');
  const [roastLevel, setRoastLevel] = useState<string>(product?.roastLevel || 'Medium Roast (25/75)');
  const [flavorNotes, setFlavorNotes] = useState<string>(
    product?.tastingNotes?.join(', ') || 'Chocolate, Nutty, Caramel finish'
  );
  const [regularPrice, setRegularPrice] = useState<number>(product?.regularPrice || 60000);
  const [memberPrice, setMemberPrice] = useState<number>(product?.memberPrice || 55000);
  const [stock, setStock] = useState<number>(product?.stock !== undefined ? product.stock : 24);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const notesArray = flavorNotes
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    let stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock' = 'in_stock';
    if (stock <= 0) stockStatus = 'out_of_stock';
    else if (stock <= 5) stockStatus = 'low_stock';

    onSaveProduct({
      id: product?.id || `blend-${Date.now()}`,
      name: name.trim() || 'New Specialty Roast',
      roastLevel,
      tastingNotes: notesArray.length > 0 ? notesArray : ['Rich Chocolate', 'Smooth finish'],
      regularPrice: Number(regularPrice) || 60000,
      memberPrice: Number(memberPrice) || 55000,
      stock: Number(stock) || 0,
      stockStatus,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-[#E5E7EB] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-5 py-3.5 bg-[#F9FAFB] border-b border-[#E5E7EB] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee className="w-4 h-4 text-[#D95D39]" />
            <h3 className="font-display font-bold text-sm text-[#111827]">
              {isNew ? 'Add New Product Roast' : `Edit: ${product?.name}`}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#6B7280] hover:text-[#111827] hover:bg-[#E5E7EB] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 overflow-y-auto custom-scrollbar text-xs">
          {/* Product Name */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#4B5563] mb-1">
              Product Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Fijne Dag 55"
              required
              className="w-full px-3 py-2 bg-[#F9FAFB] rounded-lg border border-[#D1D5DB] text-[#111827] text-xs focus:border-[#D95D39] focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          {/* Roast Level */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#4B5563] mb-1">
              Roast Level
            </label>
            <input
              type="text"
              value={roastLevel}
              onChange={(e) => setRoastLevel(e.target.value)}
              placeholder="e.g. Medium Roast 25/75"
              required
              className="w-full px-3 py-2 bg-[#F9FAFB] rounded-lg border border-[#D1D5DB] text-[#111827] text-xs focus:border-[#D95D39] focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          {/* Flavor Profile Notes */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#4B5563] mb-1">
              Flavor Notes (comma-separated)
            </label>
            <input
              type="text"
              value={flavorNotes}
              onChange={(e) => setFlavorNotes(e.target.value)}
              placeholder="e.g. Chocolate, Nutty, Caramel finish"
              required
              className="w-full px-3 py-2 bg-[#F9FAFB] rounded-lg border border-[#D1D5DB] text-[#111827] text-xs focus:border-[#D95D39] focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          {/* Price Fields: Regular and Member */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#4B5563] mb-1">
                Regular Price (Rp)
              </label>
              <input
                type="number"
                step="1000"
                value={regularPrice}
                onChange={(e) => setRegularPrice(Number(e.target.value))}
                required
                className="w-full px-3 py-2 bg-[#F9FAFB] rounded-lg border border-[#D1D5DB] text-[#111827] text-xs font-mono-numbers focus:border-[#D95D39] focus:bg-white focus:outline-none transition-colors"
              />
              <span className="text-[10px] text-[#6B7280] mt-0.5 block font-mono-numbers">
                {formatRupiah(regularPrice)}
              </span>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#D95D39] mb-1">
                Member Price (Rp)
              </label>
              <input
                type="number"
                step="1000"
                value={memberPrice}
                onChange={(e) => setMemberPrice(Number(e.target.value))}
                required
                className="w-full px-3 py-2 bg-[#FFF7ED] rounded-lg border border-[#FED7AA] text-[#D95D39] text-xs font-mono-numbers focus:border-[#D95D39] focus:bg-white focus:outline-none transition-colors"
              />
              <span className="text-[10px] text-[#6B7280] mt-0.5 block font-mono-numbers">
                {formatRupiah(memberPrice)}
              </span>
            </div>
          </div>

          {/* Stock Quantity */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#4B5563] mb-1">
              Stock Quantity (Bags in Purwokerto Hub)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                value={stock}
                onChange={(e) => setStock(Math.max(0, Number(e.target.value)))}
                required
                className="flex-1 px-3 py-2 bg-[#F9FAFB] rounded-lg border border-[#D1D5DB] text-[#111827] text-xs font-mono-numbers focus:border-[#D95D39] focus:bg-white focus:outline-none transition-colors"
              />
              <span
                className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase ${
                  stock <= 0
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : stock <= 5
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}
              >
                {stock <= 0 ? 'Out of Stock' : stock <= 5 ? 'Low Stock' : 'In Stock'}
              </span>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-3 border-t border-[#E5E7EB]">
            <button
              type="submit"
              className="w-full py-2.5 bg-[#D95D39] hover:bg-[#C44D2B] active:scale-95 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Save & Update Inventory</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
