import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Lock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Coffee,
  ArrowLeft,
  Crown,
} from 'lucide-react';
import { UserProfile, PriceTier, ScreenId } from '../types';
import { DEMO_USERS } from '../data/products';

interface ScreenAuthProps {
  onLogin: (user: UserProfile) => void;
  onNavigate: (screen: ScreenId) => void;
  onBack?: () => void;
}

export const ScreenAuth: React.FC<ScreenAuthProps> = ({
  onLogin,
  onNavigate,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('rina.kartika@patawibrew.id');
  const [loginPassword, setLoginPassword] = useState('••••••••');
  const [loginTier, setLoginTier] = useState<PriceTier>('member');

  // Register form state
  const [registerName, setRegisterName] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerAddress, setRegisterAddress] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerTier, setRegisterTier] = useState<PriceTier>('member');

  const [notification, setNotification] = useState<string | null>(null);

  const handleDemoLogin = (userKey: 'rina' | 'budi') => {
    const demoUser = DEMO_USERS[userKey];
    setNotification(`Berhasil masuk sebagai ${demoUser.name} (${demoUser.tier.toUpperCase()})`);
    setTimeout(() => {
      onLogin(demoUser);
    }, 400);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const matchedUser: UserProfile =
      loginIdentifier.toLowerCase().includes('budi')
        ? DEMO_USERS.budi
        : {
            ...DEMO_USERS.rina,
            tier: loginTier,
            email: loginIdentifier.includes('@') ? loginIdentifier : DEMO_USERS.rina.email,
          };

    setNotification(`Berhasil masuk sebagai ${matchedUser.name}!`);
    setTimeout(() => {
      onLogin(matchedUser);
    }, 400);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: registerName || 'Pelanggan Patawi',
      email: registerEmail || 'pelanggan@patawibrew.id',
      phone: registerPhone || '+62 812-0000-0000',
      address: registerAddress || 'Purwokerto, Jawa Tengah',
      city: 'Purwokerto',
      postalCode: '53111',
      notes: 'Pemesanan aplikasi mobile web Patawi Brewspace',
      tier: registerTier,
      memberSince: '2026',
      beansPoints: registerTier === 'member' ? 100 : 25,
      isLoggedIn: true,
    };

    setNotification(`Akun ${newUser.name} berhasil dibuat!`);
    setTimeout(() => {
      onLogin(newUser);
    }, 400);
  };

  return (
    <div className="bg-[#F8F9FA] text-[#1A1A1A] min-h-screen pb-28 font-sans">
      <div className="max-w-md mx-auto px-4 pt-4 sm:pt-6 space-y-4">
        {/* Navigation & Brand Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => (onBack ? onBack() : onNavigate('home'))}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] hover:text-[#1A1A1A] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </button>
          <span className="text-[11px] font-mono-numbers font-bold text-[#8C827A] uppercase tracking-wider">
            Akun Roastery
          </span>
        </div>

        {/* Brand Banner Card (Authentic Patawi Black & White) */}
        <section className="bg-gradient-to-br from-[#1A1A1A] via-[#242424] to-[#121212] rounded-2xl p-5 text-white shadow-md border border-[#2E2E2E] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#8B5A2B]/20 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 space-y-1.5">
            <div className="flex items-center gap-2 text-[#C49A6C]">
              <Coffee className="w-5 h-5" />
              <span className="text-xs font-bold font-display tracking-wider">
                PATAWI BREWSPACE & ROASTERY
              </span>
            </div>
            <h1 className="text-xl font-serif font-bold text-white tracking-tight">
              Akses Portal Pelanggan
            </h1>
            <p className="text-xs text-[#E5E0D8]/90 leading-relaxed">
              Masuk atau daftar untuk menikmati potongan harga keanggotaan dan kemudahan pemesanan biji kopi sangrai segar.
            </p>
          </div>
        </section>

        {/* 1-Click Quick Demo Presets */}
        <section className="bg-white rounded-2xl p-4 border border-[#E5E7EB] shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#8B5A2B]" />
              1-Click Demo Login
            </span>
            <span className="text-[10px] text-[#8C827A]">Uji Akun Instan</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('rina')}
              className="p-2.5 rounded-xl border border-[#E8DFD5] bg-[#FAF7F2] hover:bg-[#F3EFEA] active:scale-98 transition-all text-left flex items-start gap-2.5 cursor-pointer shadow-2xs group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                RK
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-xs text-[#1A1A1A] flex items-center gap-1">
                  <span>Rina Kartika</span>
                  <Crown className="w-3 h-3 text-[#C49A6C]" />
                </div>
                <div className="text-[10px] font-bold text-[#8B5A2B]">VIP Member Tier</div>
                <div className="text-[9px] text-[#8C827A]">Hemat Rp 5k-10k / bag</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin('budi')}
              className="p-2.5 rounded-xl border border-[#E5E7EB] bg-[#F8F9FA] hover:bg-[#F3F4F6] active:scale-98 transition-all text-left flex items-start gap-2.5 cursor-pointer shadow-2xs group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#4B5563] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                BS
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-xs text-[#1A1A1A]">Budi Santoso</div>
                <div className="text-[10px] font-semibold text-[#4B5563]">Member Reguler</div>
                <div className="text-[9px] text-[#8C827A]">Harga katalog standar</div>
              </div>
            </button>
          </div>
        </section>

        {/* Main Auth Form Container with Tabs */}
        <section className="bg-white rounded-2xl border border-[#E5E7EB] shadow-xs overflow-hidden">
          {/* Tab Selector */}
          <div className="grid grid-cols-2 border-b border-[#F3F4F6]">
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`py-3 text-xs font-bold text-center transition-colors cursor-pointer ${
                activeTab === 'login'
                  ? 'text-[#1A1A1A] border-b-2 border-[#1A1A1A] bg-white'
                  : 'text-[#6B7280] hover:text-[#1A1A1A] bg-[#F8F9FA]'
              }`}
            >
              Masuk (Login)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('register')}
              className={`py-3 text-xs font-bold text-center transition-colors cursor-pointer ${
                activeTab === 'register'
                  ? 'text-[#1A1A1A] border-b-2 border-[#1A1A1A] bg-white'
                  : 'text-[#6B7280] hover:text-[#1A1A1A] bg-[#F8F9FA]'
              }`}
            >
              Daftar (Register)
            </button>
          </div>

          {/* Form Content */}
          <div className="p-5">
            {activeTab === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-3.5 text-xs">
                {/* Account Tier Selector (Requirement: test member-tier pricing instantly) */}
                <div className="p-3 bg-[#F8F9FA] rounded-xl border border-[#E5E7EB] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1A1A1A] text-[11px]">
                      Pilih Tier Akun Saat Masuk:
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-[#FAF7F2] text-[#8B5A2B] border border-[#E8DFD5]">
                      {loginTier === 'member' ? 'VIP MEMBER' : 'REGULER'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setLoginTier('regular')}
                      className={`py-1.5 px-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                        loginTier === 'regular'
                          ? 'bg-white border-[#1A1A1A] text-[#1A1A1A] font-bold shadow-2xs'
                          : 'border-[#E5E7EB] bg-white/70 text-[#6B7280]'
                      }`}
                    >
                      Reguler
                    </button>
                    <button
                      type="button"
                      onClick={() => setLoginTier('member')}
                      className={`py-1.5 px-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                        loginTier === 'member'
                          ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white font-bold shadow-2xs'
                          : 'border-[#E5E7EB] bg-white/70 text-[#6B7280]'
                      }`}
                    >
                      VIP Member ★
                    </button>
                  </div>
                </div>

                {/* Email / WhatsApp */}
                <div className="space-y-1">
                  <label className="block font-semibold text-[#1A1A1A]">
                    Email atau No. WhatsApp
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-[#F8F9FA] border border-[#E5E7EB] focus:border-[#1A1A1A] focus:bg-white focus:outline-hidden rounded-xl text-xs text-[#1A1A1A]"
                      placeholder="rina.kartika@patawibrew.id atau 081234567890"
                    />
                    <Mail className="w-4 h-4 text-[#8C827A] absolute left-3 top-2.5" />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="font-semibold text-[#1A1A1A]">Kata Sandi</label>
                    <span className="text-[11px] text-[#8B5A2B] hover:underline cursor-pointer">
                      Lupa sandi?
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-[#F8F9FA] border border-[#E5E7EB] focus:border-[#1A1A1A] focus:bg-white focus:outline-hidden rounded-xl text-xs text-[#1A1A1A]"
                      placeholder="••••••••"
                    />
                    <Lock className="w-4 h-4 text-[#8C827A] absolute left-3 top-2.5" />
                  </div>
                </div>

                {/* Submit CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#1A1A1A] hover:bg-[#2C2C2C] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-98"
                  >
                    <span>Masuk ke Akun</span>
                    <ArrowRight className="w-4 h-4 text-[#C49A6C]" />
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
                {/* Tier Selection on Register */}
                <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DFD5] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#8B5A2B] text-[11px]">
                      Daftar sebagai Member VIP?
                    </span>
                    <span className="text-[10px] text-[#6B7280]">Gratis Biaya Registrasi</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setRegisterTier('regular')}
                      className={`py-1.5 px-2 rounded-lg border text-center transition-all cursor-pointer ${
                        registerTier === 'regular'
                          ? 'bg-white border-[#1A1A1A] text-[#1A1A1A] font-bold shadow-2xs'
                          : 'border-[#E8DFD5] bg-white/70 text-[#6B7280]'
                      }`}
                    >
                      Reguler
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegisterTier('member')}
                      className={`py-1.5 px-2 rounded-lg border text-center transition-all cursor-pointer ${
                        registerTier === 'member'
                          ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white font-bold shadow-2xs'
                          : 'border-[#E8DFD5] bg-white/70 text-[#6B7280]'
                      }`}
                    >
                      VIP Member ★
                    </button>
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-1">
                  <label className="block font-semibold text-[#1A1A1A]">
                    Nama Lengkap <span className="text-[#8B5A2B]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-[#F8F9FA] border border-[#E5E7EB] focus:border-[#1A1A1A] focus:bg-white focus:outline-hidden rounded-xl text-xs text-[#1A1A1A]"
                      placeholder="Contoh: Rina Kartika"
                    />
                    <User className="w-4 h-4 text-[#8C827A] absolute left-3 top-2.5" />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="block font-semibold text-[#1A1A1A]">
                    No. WhatsApp Aktif <span className="text-[#8B5A2B]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={registerPhone}
                      onChange={(e) => setRegisterPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-[#F8F9FA] border border-[#E5E7EB] focus:border-[#1A1A1A] focus:bg-white focus:outline-hidden rounded-xl text-xs text-[#1A1A1A] font-mono-numbers"
                      placeholder="+62 812-3456-7890"
                    />
                    <Phone className="w-4 h-4 text-[#8C827A] absolute left-3 top-2.5" />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="block font-semibold text-[#1A1A1A]">Alamat Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-[#F8F9FA] border border-[#E5E7EB] focus:border-[#1A1A1A] focus:bg-white focus:outline-hidden rounded-xl text-xs text-[#1A1A1A]"
                      placeholder="email@example.com"
                    />
                    <Mail className="w-4 h-4 text-[#8C827A] absolute left-3 top-2.5" />
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-1">
                  <label className="block font-semibold text-[#1A1A1A]">
                    Alamat Pengiriman Utama
                  </label>
                  <input
                    type="text"
                    value={registerAddress}
                    onChange={(e) => setRegisterAddress(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F8F9FA] border border-[#E5E7EB] focus:border-[#1A1A1A] focus:bg-white focus:outline-hidden rounded-xl text-xs text-[#1A1A1A]"
                    placeholder="Jl. Prof. Dr. Suharso, Purwokerto"
                  />
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <label className="block font-semibold text-[#1A1A1A]">
                    Kata Sandi <span className="text-[#8B5A2B]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-[#F8F9FA] border border-[#E5E7EB] focus:border-[#1A1A1A] focus:bg-white focus:outline-hidden rounded-xl text-xs text-[#1A1A1A]"
                      placeholder="Minimal 6 karakter"
                    />
                    <Lock className="w-4 h-4 text-[#8C827A] absolute left-3 top-2.5" />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#1A1A1A] hover:bg-[#2C2C2C] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-98"
                  >
                    <span>Daftar Akun Baru</span>
                    <ArrowRight className="w-4 h-4 text-[#C49A6C]" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* Guest Shopping Option */}
        <div className="text-center pt-2">
          <button
            onClick={() => onNavigate('catalog')}
            className="text-xs text-[#6B7280] hover:text-[#1A1A1A] font-medium transition-colors cursor-pointer"
          >
            Lewati dan lanjutkan melihat katalog tanpa login &rarr;
          </button>
        </div>

        {/* Toast / Notification */}
        {notification && (
          <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 bg-[#1A1A1A] text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{notification}</span>
          </div>
        )}
      </div>
    </div>
  );
};
