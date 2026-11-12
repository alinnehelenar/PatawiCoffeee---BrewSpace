import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Minus,
  Check,
  AlertTriangle,
  Package,
  Coffee,
  Sparkles,
  Flame,
} from 'lucide-react';
import { Product } from '../types';
import { formatRupiah } from '../utils/pricing';
import { AdminProductModal } from './AdminProductModal';

interface AdminInventoryProps {
  products: Product[];
  onUpdateStock: (productId: string, delta: number) => void;
  onSaveProduct: (updated: Partial<Product>) => void;
  onBackToDashboard: () => void;
}

export const AdminInventory: React.FC<AdminInventoryProps> = ({
  products,
  onUpdateStock,
  onSaveProduct,
  onBackToDashboard,
}) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-[#F9FAFB] text-[#111827] pb-24 select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 space-y-4">
        {/* Header: "Product Catalog & Stock Management" with a primary button "+ Add Product" in Burnt Orange */}
        <section className="flex items-center justify-between gap-2 pb-2 border-b border-[#E5E7EB]">
          <div>
            <h2 className="font-display font-bold text-sm text-[#111827]">
              Product Catalog & Stock
            </h2>
            <p className="text-[10px] text-[#6B7280]">
              Inventory levels across Purwokerto Roastery batches
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-3 py-1.5 bg-[#D95D39] hover:bg-[#C44D2B] active:scale-95 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-all shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>+ Add Product</span>
          </button>
        </section>

        {/* Product list items showing stock levels:
            - Fijne Dag 55: [In Stock: 24 units] with Quick Edit & Stock Counter (-/+).
            - Mazzel Dragger: [Low Stock: 3 units].
            - Fine Robusta Temanggung: [Out of Stock] toggle badge.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {products.map((product) => {
            const isOutOfStock = product.stock <= 0;
            const isLowStock = product.stock > 0 && product.stock <= 5;
            const isInStock = product.stock > 5;

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-4 border border-[#E5E7EB] shadow-xs hover:border-[#D1D5DB] transition-all space-y-3"
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex gap-3 items-start min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] p-1 flex items-center justify-center shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display font-bold text-sm text-[#111827] truncate">
                        {product.name}
                      </h3>
                      <p className="text-[11px] text-[#6B7280] truncate">
                        {product.roastLevel || product.roastProfile}
                      </p>
                      <div className="text-[10px] text-[#6B7280] mt-0.5 font-mono-numbers">
                        Regular {formatRupiah(product.regularPrice)} · Member{' '}
                        {formatRupiah(product.memberPrice)}
                      </div>
                    </div>
                  </div>

                  {/* Stock Status Badge */}
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 font-mono-numbers ${
                      isOutOfStock
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : isLowStock
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {isOutOfStock
                      ? 'Out of Stock'
                      : isLowStock
                      ? `Low Stock: ${product.stock} units`
                      : `In Stock: ${product.stock} units`}
                  </span>
                </div>

                {/* Bottom Row: Quick Edit & Stock Counter (-/+) */}
                <div className="pt-2.5 border-t border-[#F3F4F6] flex items-center justify-between gap-2">
                  {/* Stock Counter (-/+) */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] uppercase font-bold text-[#6B7280] tracking-wider mr-1">
                      Stock:
                    </span>
                    <div className="flex items-center bg-[#F9FAFB] rounded-lg border border-[#E5E7EB] p-0.5">
                      <button
                        onClick={() => onUpdateStock(product.id, -1)}
                        aria-label={`Decrease ${product.name} stock`}
                        disabled={product.stock <= 0}
                        className="w-7 h-7 rounded flex items-center justify-center text-[#4B5563] hover:text-[#111827] hover:bg-white active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer shadow-2xs"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <span className="w-8 text-center text-xs font-bold font-mono-numbers text-[#111827]">
                        {product.stock}
                      </span>

                      <button
                        onClick={() => onUpdateStock(product.id, 1)}
                        aria-label={`Increase ${product.name} stock`}
                        className="w-7 h-7 rounded flex items-center justify-center text-[#4B5563] hover:text-[#111827] hover:bg-white active:scale-95 transition-all cursor-pointer shadow-2xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Quick Edit Button */}
                  <button
                    onClick={() => handleOpenEdit(product)}
                    aria-label={`Quick Edit ${product.name}`}
                    className="px-3 py-1.5 rounded-lg bg-[#F3F4F6] hover:bg-[#E5E7EB] active:scale-95 text-xs font-medium text-[#374151] hover:text-[#111827] flex items-center gap-1.5 border border-[#E5E7EB] transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3 h-3 text-[#D95D39]" />
                    <span>Quick Edit</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Back navigation */}
        <div className="pt-2">
          <button
            onClick={onBackToDashboard}
            className="w-full py-2.5 rounded-xl bg-white hover:bg-[#F3F4F6] text-xs font-medium text-[#4B5563] hover:text-[#111827] border border-[#E5E7EB] shadow-xs transition-colors cursor-pointer"
          >
            ← Back to Admin Order Dashboard
          </button>
        </div>
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
