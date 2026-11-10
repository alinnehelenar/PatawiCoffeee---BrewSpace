import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  Award,
  MapPin,
  Clock,
  Phone,
  ArrowRightLeft,
  Coffee,
  Sparkles,
  ChevronRight,
  Edit3,
  LogOut,
  Crown,
  Check,
} from 'lucide-react';
import { UserProfile, OrderState } from '../types';
import { DEFAULT_USER_PROFILE, DEMO_USERS } from '../data/products';
import { ProfileEditModal } from './ProfileEditModal';

interface ScreenProfileProps {
  currentUser?: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onLogout: () => void;
  onNavigateAuth: () => void;
  onSwitchToAdmin: () => void;
  onNavigateOrder: () => void;
  orderState: OrderState;
}

export const ScreenProfile: React.FC<ScreenProfileProps> = ({
  currentUser = DEFAULT_USER_PROFILE,
  onUpdateProfile,
  onLogout,
  onNavigateAuth,
  onSwitchToAdmin,
  onNavigateOrder,
  orderState,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [quickToast, setQuickToast] = useState<string | null>(null);

  // Derive initials for avatar
  const initials = currentUser.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const handleQuickSwitchUser = (userKey: 'rina' | 'budi') => {
    const targetUser = DEMO_USERS[userKey];
    onUpdateProfile(targetUser);
    setQuickToast(`Beralih ke akun ${targetUser.name} (${targetUser.tier.toUpperCase()})`);
    setTimeout(() => setQuickToast(null), 2500);
  };

  const handleToggleTier = () => {
    const newTier = currentUser.tier === 'member' ? 'regular' : 'member';
    const updated: UserProfile = {
      ...currentUser,
      tier: newTier,
      beansPoints: newTier === 'member' ? 450 : 120,
    };
    onUpdateProfile(updated);
    setQuickToast(
      newTier === 'member'
        ? 'Status ditingkatkan ke VIP Member! Harga member aktif.'
        : 'Status diubah ke Reguler. Harga standar aktif.'
    );
    setTimeout(() => setQuickToast(null), 2500);
  };

  return (
    <div className="bg-[#F8F9FA] text-[#1A1A1A] pb-28 min-h-screen font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 space-y-4">
        {/* Profile Card Header */}
        <section className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E5E7EB] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 font-display font-bold text-xl shadow-2xs border ${
                currentUser.tier === 'member'
                  ? 'bg-[#FAF7F2] border-[#E8DFD5] text-[#8B5A2B]'
                  : 'bg-[#F3F4F6] border-[#E5E7EB] text-[#4B5563]'
              }`}
            >
              {initials || 'PK'}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-serif font-bold text-lg text-[#1A1A1A]">
                  {currentUser.name}
                </h2>
                {currentUser.tier === 'member' ? (
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-[#1A1A1A] text-white font-mono-numbers flex items-center gap-1">
                    <Crown className="w-2.5 h-2.5 text-[#C49A6C]" />
                    VIP MEMBER
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-[#F3F4F6] text-[#4B5563] border border-[#E5E7EB] font-mono-numbers">
                    MEMBER REGULER
                  </span>
                )}
              </div>
              <p className="text-xs text-[#6B7280] font-mono-numbers mt-0.5">
                {currentUser.phone} · {currentUser.email}
              </p>
              <p className="text-[11px] text-[#8C827A] mt-0.5">
                {currentUser.city} · Bergabung {currentUser.memberSince || '2024'}
              </p>
            </div>
          </div>

          {/* Action buttons on header */}
          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              onClick={() => setIsEditModalOpen(true)}
              aria-label="Edit Profil Pengguna"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#1A1A1A] bg-[#F8F9FA] hover:bg-[#F3F4F6] border border-[#E5E7EB] rounded-xl transition-all cursor-pointer shadow-2xs active:scale-95"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#8B5A2B]" />
              <span>Edit Profil</span>
            </button>

            <button
              onClick={onNavigateAuth}
              aria-label="Keluar atau Ganti Akun"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#6B7280] hover:text-[#DC2626] bg-[#F8F9FA] hover:bg-red-50 border border-[#E5E7EB] rounded-xl transition-all cursor-pointer shadow-2xs active:scale-95"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Ganti Akun</span>
            </button>
          </div>
        </section>

        {/* Digital Roastery Membership Card (Dynamic Member vs Regular) */}
        <section
          className={`relative overflow-hidden rounded-2xl border p-5 text-white shadow-md space-y-4 transition-all ${
            currentUser.tier === 'member'
              ? 'bg-gradient-to-br from-[#1A1A1A] via-[#242424] to-[#121212] border-[#2E2E2E]'
              : 'bg-gradient-to-br from-[#2E2E2E] via-[#242424] to-[#1A1A1A] border-[#3E3E3E]'
          }`}
        >
          <div
            className={`absolute top-0 right-0 w-44 h-44 rounded-full blur-3xl pointer-events-none ${
              currentUser.tier === 'member' ? 'bg-[#8B5A2B]/25' : 'bg-gray-500/10'
            }`}
          />

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
              <Coffee className={`w-5 h-5 ${currentUser.tier === 'member' ? 'text-[#C49A6C]' : 'text-gray-300'}`} />
              <span className="font-display font-bold text-xs tracking-wider text-white">
                {currentUser.tier === 'member' ? 'PATAWI BREWSPACE VIP' : 'PATAWI ROASTERY REGULER'}
              </span>
            </div>
            <span
              className={`text-[10px] font-mono-numbers font-semibold tracking-widest ${
                currentUser.tier === 'member' ? 'text-[#C49A6C]' : 'text-gray-400'
              }`}
            >
              #PBS-{currentUser.id.replace('usr-', '').toUpperCase()}-PWR
            </span>
          </div>

          <div className="pt-2 relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[#A39990]">
                Saldo Poin Roastery
              </div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="font-display font-bold text-2xl sm:text-3xl font-mono-numbers text-white">
                  {currentUser.beansPoints}
                </span>
                <span
                  className={`text-xs font-medium ${
                    currentUser.tier === 'member' ? 'text-[#C49A6C]' : 'text-gray-300'
                  }`}
                >
                  Beans Points
                </span>
              </div>
              <p className="text-[11px] text-[#D4CDC5] mt-1 leading-snug">
                {currentUser.tier === 'member'
                  ? 'Hemat otomatis Rp 5.000 – Rp 10.000 setiap pembelian kemasan biji kopi.'
                  : 'Dapatkan poin setiap pesanan. Upgrade ke VIP untuk potongan harga langsung!'}
              </p>
            </div>

            {/* Direct Quick Toggle for VIP status */}
            <button
              onClick={handleToggleTier}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all shrink-0 self-start sm:self-auto ${
                currentUser.tier === 'member'
                  ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  : 'bg-[#8B5A2B] hover:bg-[#724822] text-white shadow-xs'
              }`}
            >
              {currentUser.tier === 'member' ? 'Ubah ke Reguler' : 'Aktifkan VIP Member ★'}
            </button>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-[#A39990] relative z-10 font-mono-numbers">
            <span>
              STATUS HARGA: {currentUser.tier === 'member' ? 'VIP DISCOUNT ACTIVE' : 'STANDARD PRICING'}
            </span>
            <span
              className={`font-semibold ${
                currentUser.tier === 'member' ? 'text-emerald-400' : 'text-amber-300'
              }`}
            >
              {currentUser.tier === 'member' ? '● POTONGAN MEMBER OTOMATIS' : '○ HARGA REGULER'}
            </span>
          </div>
        </section>

        {/* Quick Testing Switcher */}
        <section className="bg-white rounded-2xl p-4 border border-[#E5E7EB] shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#4B5563] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#8B5A2B]" />
              Uji Coba Akun & Harga Tier
            </span>
            <span className="text-[10px] text-[#8C827A]">Pilih cepat untuk demo</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickSwitchUser('rina')}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                currentUser.id === DEMO_USERS.rina.id && currentUser.tier === 'member'
                  ? 'bg-[#FAF7F2] border-[#1A1A1A] ring-1 ring-[#1A1A1A]'
                  : 'bg-[#F8F9FA] border-[#E5E7EB] hover:bg-white'
              }`}
            >
              <div className="text-xs font-bold text-[#1A1A1A]">Rina Kartika</div>
              <div className="text-[10px] font-semibold text-[#8B5A2B]">VIP Member Tier</div>
              <div className="text-[9px] text-[#8C827A]">Harga member otomatis</div>
            </button>

            <button
              onClick={() => handleQuickSwitchUser('budi')}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                currentUser.id === DEMO_USERS.budi.id && currentUser.tier === 'regular'
                  ? 'bg-[#F3F4F6] border-[#1A1A1A] ring-1 ring-[#1A1A1A]'
                  : 'bg-[#F8F9FA] border-[#E5E7EB] hover:bg-white'
              }`}
            >
              <div className="text-xs font-bold text-[#1A1A1A]">Budi Santoso</div>
              <div className="text-[10px] font-semibold text-[#4B5563]">Member Reguler</div>
              <div className="text-[9px] text-[#8C827A]">Harga katalog standar</div>
            </button>
          </div>
        </section>

        {/* Saved Address Card */}
        <section className="bg-white rounded-2xl p-4 border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#8B5A2B]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                Alamat Pengiriman Utama
              </span>
            </div>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="text-xs text-[#1A1A1A] hover:text-[#8B5A2B] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Ubah Alamat</span>
              <Edit3 className="w-3 h-3 text-[#8B5A2B]" />
            </button>
          </div>

          <div className="pt-3 space-y-1 text-xs">
            <div className="font-semibold text-[#1A1A1A]">{currentUser.name}</div>
            <div className="text-[#4B5563] leading-relaxed">{currentUser.address}</div>
            <div className="text-[11px] text-[#6B7280]">
              {currentUser.city} · {currentUser.postalCode}
            </div>
            {currentUser.notes && (
              <div className="mt-2 text-[11px] text-[#4B5563] bg-[#F8F9FA] p-2.5 rounded-xl border border-[#E5E7EB]">
                Catatan: {currentUser.notes}
              </div>
            )}
          </div>
        </section>

        {/* Quick Order Shortcut Card */}
        <section className="bg-white rounded-2xl p-4 border border-[#E5E7EB] shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#F3F4F6]">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
              Pesanan Terakhir
            </span>
            <button
              onClick={onNavigateOrder}
              className="text-xs text-[#1A1A1A] hover:text-[#8B5A2B] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Lacak Pesanan</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#8B5A2B]" />
            </button>
          </div>

          <div className="pt-3 flex items-center justify-between">
            <div>
              <div className="font-display font-bold text-xs sm:text-sm text-[#1A1A1A] font-mono-numbers">
                {orderState.orderId}
              </div>
              <div className="text-[11px] text-[#6B7280] mt-0.5">
                2x Fijne Dag 55 · {orderState.deliveryMethod === 'pickup' ? 'Self Pick-Up' : 'GoSend Instant'}
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold font-mono-numbers bg-[#F3F4F6] text-[#1A1A1A] border border-[#E5E7EB]">
              {orderState.verificationStatus === 'verified'
                ? 'Diproses Roastery'
                : 'Menunggu Verifikasi'}
            </span>
          </div>
        </section>

        {/* Roastery Information Card */}
        <section className="bg-white rounded-2xl p-4 border border-[#E5E7EB] shadow-xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-[#F3F4F6]">
            <Clock className="w-4 h-4 text-[#8B5A2B]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
              Patawi Brewspace & Roastery
            </span>
          </div>

          <div className="space-y-2 text-xs text-[#4B5563]">
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#8B5A2B] shrink-0 mt-0.5" />
              <span>Jl. Overste Isdiman No. 22, Purwokerto Utara, Jawa Tengah</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#8B5A2B] shrink-0" />
              <span>Buka Setiap Hari: 08:00 – 22:00 WIB</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#8B5A2B] shrink-0" />
              <span>Customer Care Roastery: +62 812-3456-7890</span>
            </div>
          </div>
        </section>

        {/* Admin Switch Role Banner on Mobile */}
        <div className="pt-2">
          <button
            onClick={onSwitchToAdmin}
            className="w-full py-3 bg-[#1A1A1A] hover:bg-[#2C2C2C] active:scale-[0.99] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-[#C49A6C]" />
            <span>Beralih ke Admin View (Owner Panel)</span>
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentUser={currentUser}
        onSave={onUpdateProfile}
      />

      {/* Quick Toast feedback */}
      {quickToast && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 bg-[#1A1A1A] text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{quickToast}</span>
        </div>
      )}
    </div>
  );
};
