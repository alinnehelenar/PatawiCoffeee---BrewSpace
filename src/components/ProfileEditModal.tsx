import React, { useState } from 'react';
import { X, Check, User, Sparkles } from 'lucide-react';
import { UserProfile, PriceTier } from '../types';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onSave: (updatedProfile: UserProfile) => void;
}

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSave,
}) => {
  const [formData, setFormData] = useState<UserProfile>({ ...currentUser });
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => {
      onSave(formData);
      setSavedSuccess(false);
      onClose();
    }, 400);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-profile-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl border border-[#E5E7EB] max-h-[90vh] flex flex-col font-sans">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#F3F4F6] bg-[#F8F9FA]">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#8B5A2B]" />
            <h2 id="edit-profile-title" className="font-serif font-bold text-base text-[#1A1A1A]">
              Edit Profil & Keanggotaan
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup modal edit profil"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#6B7280] hover:text-[#1A1A1A] hover:bg-[#E5E7EB] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 space-y-4 text-xs">
          {/* Membership Tier Selector (Instant Pricing Switch) */}
          <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E8DFD5] space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-[#8B5A2B] text-xs">
                <Sparkles className="w-4 h-4" />
                <span>Status Keanggotaan (Tier Akun)</span>
              </div>
              <span className="text-[10px] font-mono-numbers bg-white px-2 py-0.5 rounded-md text-[#1A1A1A] border border-[#E8DFD5] font-bold">
                {formData.tier === 'member' ? 'VIP MEMBER' : 'REGULER'}
              </span>
            </div>
            <p className="text-[11px] text-[#6B7280] leading-snug">
              Pilih tier akun untuk menguji harga spesial Roastery. Akun VIP Member otomatis menikmati potongan Rp 5.000 – Rp 10.000 per pack di seluruh katalog.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, tier: 'regular' })}
                className={`py-2 px-3 rounded-lg border text-left transition-all cursor-pointer ${
                  formData.tier === 'regular'
                    ? 'bg-white border-[#1A1A1A] shadow-xs text-[#1A1A1A] font-bold ring-1 ring-[#1A1A1A]'
                    : 'bg-white/60 border-[#E8DFD5] text-[#6B7280] hover:bg-white'
                }`}
              >
                <div className="text-xs font-semibold">Pelanggan Reguler</div>
                <div className="text-[10px] text-[#6B7280] mt-0.5">Harga katalog standar</div>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, tier: 'member' })}
                className={`py-2 px-3 rounded-lg border text-left transition-all cursor-pointer ${
                  formData.tier === 'member'
                    ? 'bg-[#1A1A1A] border-[#1A1A1A] shadow-xs text-white font-bold'
                    : 'bg-white/60 border-[#E8DFD5] text-[#6B7280] hover:bg-white'
                }`}
              >
                <div className={`text-xs font-semibold ${formData.tier === 'member' ? 'text-white' : 'text-[#1A1A1A]'}`}>
                  VIP Roastery Member ★
                </div>
                <div className={`text-[10px] mt-0.5 ${formData.tier === 'member' ? 'text-[#E8DFD5]' : 'text-[#8B5A2B]'}`}>
                  Potongan member aktif
                </div>
              </button>
            </div>
          </div>

          {/* Nama Lengkap */}
          <div className="space-y-1">
            <label htmlFor="edit-name" className="block font-semibold text-[#1A1A1A]">
              Nama Lengkap <span className="text-[#8B5A2B]">*</span>
            </label>
            <input
              id="edit-name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-[#F8F9FA] border border-[#E5E7EB] focus:border-[#1A1A1A] focus:bg-white focus:outline-hidden rounded-xl text-xs text-[#1A1A1A]"
              placeholder="Contoh: Rina Kartika"
            />
          </div>

          {/* Email & Phone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="edit-phone" className="block font-semibold text-[#1A1A1A]">
                No. WhatsApp / Telepon <span className="text-[#8B5A2B]">*</span>
              </label>
              <input
                id="edit-phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 bg-[#F8F9FA] border border-[#E5E7EB] focus:border-[#1A1A1A] focus:bg-white focus:outline-hidden rounded-xl text-xs text-[#1A1A1A] font-mono-numbers"
                placeholder="+62 812-xxxx-xxxx"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="edit-email" className="block font-semibold text-[#1A1A1A]">
                Alamat Email
              </label>
              <input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 bg-[#F8F9FA] border border-[#E5E7EB] focus:border-[#1A1A1A] focus:bg-white focus:outline-hidden rounded-xl text-xs text-[#1A1A1A]"
                placeholder="email@example.com"
              />
            </div>
          </div>

          {/* Alamat Pengiriman */}
          <div className="space-y-1">
            <label htmlFor="edit-address" className="block font-semibold text-[#1A1A1A]">
              Alamat Pengiriman Lengkap <span className="text-[#8B5A2B]">*</span>
            </label>
            <textarea
              id="edit-address"
              required
              rows={2}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 bg-[#F8F9FA] border border-[#E5E7EB] focus:border-[#1A1A1A] focus:bg-white focus:outline-hidden rounded-xl text-xs text-[#1A1A1A] resize-none"
              placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan"
            />
          </div>

          {/* Kota & Kode Pos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="edit-city" className="block font-semibold text-[#1A1A1A]">
                Kota / Wilayah
              </label>
              <input
                id="edit-city"
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3 py-2 bg-[#F8F9FA] border border-[#E5E7EB] focus:border-[#1A1A1A] focus:bg-white focus:outline-hidden rounded-xl text-xs text-[#1A1A1A]"
                placeholder="Contoh: Purwokerto Timur"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="edit-postal" className="block font-semibold text-[#1A1A1A]">
                Kode Pos
              </label>
              <input
                id="edit-postal"
                type="text"
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                className="w-full px-3 py-2 bg-[#F8F9FA] border border-[#E5E7EB] focus:border-[#1A1A1A] focus:bg-white focus:outline-hidden rounded-xl text-xs text-[#1A1A1A] font-mono-numbers"
                placeholder="53113"
              />
            </div>
          </div>

          {/* Catatan Pengiriman */}
          <div className="space-y-1">
            <label htmlFor="edit-notes" className="block font-semibold text-[#1A1A1A]">
              Catatan Kurir / Patokan Lokasi
            </label>
            <input
              id="edit-notes"
              type="text"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 bg-[#F8F9FA] border border-[#E5E7EB] focus:border-[#1A1A1A] focus:bg-white focus:outline-hidden rounded-xl text-xs text-[#1A1A1A]"
              placeholder="Contoh: Depan pagar hitam, titip pos satpam"
            />
          </div>

          {/* Modal Action Buttons */}
          <div className="pt-3 border-t border-[#F3F4F6] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#4B5563] hover:bg-[#F3F4F6] cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={savedSuccess}
              className="px-5 py-2 bg-[#1A1A1A] hover:bg-[#2C2C2C] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Tersimpan!</span>
                </>
              ) : (
                <span>Simpan Perubahan</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
