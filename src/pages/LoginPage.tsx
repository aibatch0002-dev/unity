import React, { useState } from 'react';
import { PageRoute, Language } from '../types';
import { UGG_LOGO_URL } from '../data/mockData';

interface LoginPageProps {
  onNavigate: (route: PageRoute) => void;
  language: Language;
  onLoginSuccess?: (role: 'member' | 'admin') => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onNavigate,
  language,
  onLoginSuccess,
}) => {
  const isBn = language === 'bn';
  const [role, setRole] = useState<'member' | 'admin'>('member');
  const [identifier, setIdentifier] = useState('UGG-M-1048');
  const [pin, setPin] = useState('••••••');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLoginSuccess) {
      onLoginSuccess(role);
    }
    if (role === 'admin') {
      onNavigate('admin-portal');
    } else {
      onNavigate('member-hub');
    }
  };

  const handleDemoMember = () => {
    setRole('member');
    setIdentifier('UGG-M-1048');
    setPin('123456');
    if (onLoginSuccess) onLoginSuccess('member');
    onNavigate('member-hub');
  };

  const handleDemoAdmin = () => {
    setRole('admin');
    setIdentifier('admin@unitygrowthgroup.com');
    setPin('admin123');
    if (onLoginSuccess) onLoginSuccess('admin');
    onNavigate('admin-portal');
  };

  return (
    <div className="min-h-screen bg-[#000514] text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-900 flex items-center justify-center p-4 py-16">
      <div className="max-w-md w-full bg-[#040e24] border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full pointer-events-none"></div>

        {/* Brand Crest */}
        <div className="text-center mb-6">
          <img
            src={UGG_LOGO_URL}
            alt="UGG Logo"
            className="h-16 w-16 mx-auto object-contain mb-3 drop-shadow-md"
          />
          <h2 className="text-xl font-serif font-bold text-white tracking-wide">
            {isBn ? 'ইউনাইটি গ্রোথ গ্রুপ' : 'United Growth Group'}
          </h2>
          <p className="text-xs text-amber-400/90 font-serif italic mt-0.5">
            United in Unity, Rising to Greatness
          </p>
          <div className="mt-2 inline-block px-3 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[10px] rounded-full uppercase tracking-wider">
            {isBn ? 'নিরাপদ মেম্বার ও বোর্ড লগইন' : 'Secure Sovereign Gateway'}
          </div>
        </div>

        {/* Role Switcher */}
        <div className="grid grid-cols-2 gap-2 bg-[#020714] p-1 rounded-xl border border-slate-800 mb-6">
          <button
            type="button"
            onClick={() => {
              setRole('member');
              setIdentifier('UGG-M-1048');
            }}
            className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              role === 'member'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">person</span>
            {isBn ? 'সদস্য পোর্টাল' : 'Member Portal'}
          </button>
          <button
            type="button"
            onClick={() => {
              setRole('admin');
              setIdentifier('admin@unitygrowthgroup.com');
            }}
            className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              role === 'admin'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
            {isBn ? 'বোর্ড / এডমিন' : 'Board / Admin'}
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              {role === 'member'
                ? isBn
                  ? 'সদস্য কোড / মোবাইল নম্বর *'
                  : 'Member Code / Mobile *'
                : isBn
                ? 'এডমিন ইমেইল / ইউজার আইডি *'
                : 'Admin Email / Username *'}
            </label>
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full bg-[#020714] border border-slate-800 focus:border-amber-400 rounded-lg px-3.5 py-2.5 text-white outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              {isBn ? 'গোপন পিন / পাসওয়ার্ড *' : 'Secret PIN / Password *'}
            </label>
            <input
              type="password"
              required
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full bg-[#020714] border border-slate-800 focus:border-amber-400 rounded-lg px-3.5 py-2.5 text-white outline-none font-mono"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-amber-400 rounded" />
              <span>{isBn ? 'আমাকে মনে রাখুন' : 'Remember Session'}</span>
            </label>
            <button
              type="button"
              onClick={() => alert(isBn ? 'অনুগ্রহ করে হটলাইনে (+880 1711-000000) যোগাযোগ করে পিন রিসেট করুন।' : 'Please contact the secretariat hotline to reset PIN.')}
              className="text-amber-400 hover:underline cursor-pointer"
            >
              {isBn ? 'পিন ভুলে গেছেন?' : 'Forgot PIN?'}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold uppercase tracking-wider rounded-lg shadow-lg shadow-amber-500/20 transition-all cursor-pointer mt-2"
          >
            {isBn ? 'নিরাপদ প্রবেশ' : 'Sign In Securely'}
          </button>
        </form>

        {/* Instant One-Click Demo Logins */}
        <div className="mt-6 pt-5 border-t border-slate-800 text-center space-y-2">
          <p className="text-[11px] text-slate-400 font-mono">
            {isBn ? 'দ্রুত পরীক্ষামূলক প্রবেশের জন্য ক্লিক করুন:' : 'Instant One-Click Demo Access:'}
          </p>
          <div className="flex flex-col gap-2">
            <button
              onClick={handleDemoMember}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-amber-500/30 text-amber-300 text-xs rounded font-semibold cursor-pointer transition-colors flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">badge</span>
              {isBn ? 'সদস্য ড্যাশবোর্ডে প্রবেশ (তানভীর আহমেদ)' : 'Demo Member Hub (Engr. Tanvir)'}
            </button>
            <button
              onClick={handleDemoAdmin}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-red-500/30 text-red-300 text-xs rounded font-semibold cursor-pointer transition-colors flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">security</span>
              {isBn ? 'এডমিন কন্ট্রোল সেন্টারে প্রবেশ (Super Admin)' : 'Demo Admin Control Center'}
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-400">
          {isBn ? 'এখনও সদস্য নন?' : 'Not a registered member yet?'}{' '}
          <button
            onClick={() => onNavigate('apply-for-membership')}
            className="text-amber-400 font-bold hover:underline cursor-pointer ml-1"
          >
            {isBn ? 'সদস্যপদ আবেদন করুন' : 'Apply for Membership'}
          </button>
        </div>
      </div>
    </div>
  );
};
