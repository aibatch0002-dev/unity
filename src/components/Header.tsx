import React, { useState } from 'react';
import { PageRoute, Language } from '../types';
import { UGG_LOGO_URL } from '../data/mockData';

interface HeaderProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  cartCount: number;
  onOpenNotifications: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  language,
  onToggleLanguage,
  cartCount,
  onOpenNotifications,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { route: PageRoute; labelBn: string; labelEn: string }[] = [
    { route: 'home', labelBn: 'হোম', labelEn: 'Home' },
    { route: 'about-us', labelBn: 'আমাদের সম্পর্কে', labelEn: 'About Us' },
    { route: 'projects', labelBn: 'প্রকল্পসমূহ', labelEn: 'Projects' },
    { route: 'members', labelBn: 'সদস্য ডিরেক্টরি', labelEn: 'Members' },
    { route: 'super-shop-and-business', labelBn: 'সুপার শপ ও ব্যবসা', labelEn: 'Super Shop' },
    { route: 'financial-reports', labelBn: 'আর্থিক স্বচ্ছতা', labelEn: 'Financial Reports' },
    { route: 'gallery', labelBn: 'গ্যালারি', labelEn: 'Gallery' },
    { route: 'contact', labelBn: 'যোগাযোগ', labelEn: 'Contact' },
    { route: 'member-hub', labelBn: 'সদস্য হাব', labelEn: 'Member Hub' },
    { route: 'admin-portal', labelBn: 'অ্যাডমিন প্যানেল', labelEn: 'Admin' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#faf8ff]/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-all">
      {/* Top Sovereign Institutional Bar */}
      <div className="bg-[#0d1e3a] text-white border-b border-[#0d1e3a]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-10 flex items-center justify-between text-[11px] sm:text-xs">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[#b7c7eb]">
              <span className="material-symbols-outlined text-[15px]">support_agent</span>
              <span>{language === 'bn' ? 'হেল্পলাইন: +৮৮০ ১৭৩৮-১১৪১০১' : 'Helpline: +880 1738-114101'}</span>
            </span>
            <span className="hidden md:inline-block text-[#c5c6ce]/40">|</span>
            <span className="hidden md:inline-block text-[#7786a8] font-normal tracking-wide">
              United in Unity, Rising to Greatness
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="inline-flex items-center bg-[#000514] rounded p-0.5 shadow-inner">
              <button
                type="button"
                onClick={() => onToggleLanguage('bn')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                  language === 'bn'
                    ? 'bg-[#fcd358] text-[#735a00] shadow-sm'
                    : 'text-[#d7e2ff] hover:text-white'
                }`}
              >
                বাংলা
              </button>
              <button
                type="button"
                onClick={() => onToggleLanguage('en')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                  language === 'en'
                    ? 'bg-[#fcd358] text-[#735a00] shadow-sm'
                    : 'text-[#d7e2ff] hover:text-white'
                }`}
              >
                ENG
              </button>
            </div>

            {/* Notifications Button */}
            <button
              type="button"
              onClick={onOpenNotifications}
              aria-label="Notifications"
              className="p-1 text-[#b7c7eb] hover:text-white transition-colors relative"
              title="Notifications"
            >
              <span className="material-symbols-outlined text-[18px]">notifications</span>
              <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-[#fcd358] animate-pulse"></span>
            </button>

            {/* Login Link */}
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="text-[#b7c7eb] hover:text-white transition-colors text-[11px] sm:text-xs font-medium"
            >
              {language === 'bn' ? 'লগইন' : 'Login'}
            </button>

            {/* Apply Button */}
            <button
              type="button"
              onClick={() => onNavigate('apply-for-membership')}
              className="bg-[#745b00] hover:bg-[#fcd358] hover:text-[#735a00] text-white px-3 py-1 rounded text-[11px] sm:text-xs font-bold transition-all shadow-sm"
            >
              {language === 'bn' ? 'সদস্য আবেদন' : 'Apply'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand Crest */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer select-none group flex-shrink-0"
        >
          <img
            src={UGG_LOGO_URL}
            alt="UNITY GROWTH GROUP Official Logo"
            className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col justify-center">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#000514] leading-tight">
              UNITY GROWTH GROUP
            </span>
            <span className="text-[10px] sm:text-[11px] text-[#745b00] font-semibold tracking-widest uppercase">
              United in Unity, Rising to Greatness
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-4 overflow-x-auto py-2">
          {navItems.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                type="button"
                onClick={() => onNavigate(item.route)}
                className={`text-[13px] whitespace-nowrap py-1 transition-all font-medium ${
                  isActive
                    ? 'text-[#000514] font-bold border-b-2 border-[#745b00]'
                    : 'text-[#44474d] hover:text-[#131b2e]'
                }`}
              >
                {language === 'bn' ? item.labelBn : item.labelEn}
              </button>
            );
          })}
        </nav>

        {/* Right CTA: Cart & User Avatar / Mobile Hamburger */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Quick Cart Trigger */}
          <button
            type="button"
            onClick={() => onNavigate('super-shop-and-business')}
            className="relative p-2 rounded-full hover:bg-[#eaedff] text-[#000514] transition-colors"
            title="Shopping Cart"
          >
            <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#745b00] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Profile Avatar Link */}
          <button
            type="button"
            onClick={() => onNavigate('member-hub')}
            className="w-8 h-8 rounded-full bg-[#000514] hover:bg-[#0d1e3a] text-white flex items-center justify-center shadow-sm transition-all"
            title="Member Hub"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-[#000514] hover:bg-[#eaedff]"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Subtle Gold Line Divider */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#745b00]/40 to-transparent"></div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#faf8ff] border-b border-[#eaedff] px-6 py-4 flex flex-col gap-2 shadow-xl animate-in fade-in slide-in-from-top-2">
          {navItems.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                type="button"
                onClick={() => {
                  onNavigate(item.route);
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-2 px-3 rounded text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#eaedff] text-[#000514] font-bold border-l-4 border-[#745b00]'
                    : 'text-[#44474d] hover:bg-[#f2f3ff]'
                }`}
              >
                {language === 'bn' ? item.labelBn : item.labelEn}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
