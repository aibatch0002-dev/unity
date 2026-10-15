import React, { useState } from 'react';
import { PageRoute, Language } from '../types';
import { UGG_LOGO_URL } from '../data/mockData';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, language }) => {
  const [modalContent, setModalContent] = useState<string | null>(null);

  return (
    <footer className="w-full bg-[#0d1e3a] text-[#7786a8] pt-12 pb-8 border-t border-[#0d1e3a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-[#7786a8]/20">
        {/* Column 1 & 2: Brand Lockup & Mission */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-white rounded shadow-sm">
              <img
                src={UGG_LOGO_URL}
                alt="UNITY GROWTH GROUP Official Logo"
                className="h-8 w-auto object-contain"
              />
            </div>
            <span className="font-serif text-xl text-white font-bold tracking-tight">
              UNITY GROWTH GROUP
            </span>
          </div>

          <p className="text-xs font-semibold text-[#ffe08b] uppercase tracking-wider">
            United in Unity, Rising to Greatness
          </p>

          <p className="text-xs text-[#b7c7eb] leading-relaxed max-w-md">
            {language === 'bn'
              ? 'ইউনাইটি গ্রোথ গ্রুপ (UGG) একটি সমন্বিত আর্থিক সংহতি ও টেকসই কমিউনিটি ইনভেস্টমেন্ট প্ল্যাটফর্ম। স্বচ্ছতা, সততা এবং সমবায় অর্থনীতির সমন্বয়ে সদস্যদের দীর্ঘমেয়াদী অর্থনৈতিক প্রবৃদ্ধি নিশ্চিত করতে আমরা প্রতিশ্রুতিবদ্ধ।'
              : 'Unity Growth Group (UGG) is an integrated fiscal synergy and sustainable community investment platform committed to ensuring long-term cooperative prosperity through integrity, transparency, and innovation.'}
          </p>

          <div className="flex items-center gap-2 mt-1">
            <a
              href="#web"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
              className="w-8 h-8 rounded bg-[#000514] flex items-center justify-center text-[#d7e2ff] hover:text-[#ffe08b] transition-colors"
              title="Official Web"
            >
              <span className="material-symbols-outlined text-[18px]">public</span>
            </a>
            <a
              href="mailto:info@unitygrowthgroup.com"
              className="w-8 h-8 rounded bg-[#000514] flex items-center justify-center text-[#d7e2ff] hover:text-[#ffe08b] transition-colors"
              title="Email Secretariat"
            >
              <span className="material-symbols-outlined text-[18px]">mail</span>
            </a>
            <button
              type="button"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Unity Growth Group',
                    text: 'United in Unity, Rising to Greatness',
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert(
                    language === 'bn'
                      ? 'ওয়েবসাইটের লিংক কপি করা হয়েছে!'
                      : 'Website link copied to clipboard!'
                  );
                }
              }}
              className="w-8 h-8 rounded bg-[#000514] flex items-center justify-center text-[#d7e2ff] hover:text-[#ffe08b] transition-colors"
              title="Share"
            >
              <span className="material-symbols-outlined text-[18px]">share</span>
            </button>
          </div>
        </div>

        {/* Column 3: বিভাগ ও সেবা (Departments & Services) */}
        <div className="flex flex-col gap-2">
          <span className="text-sm text-white font-semibold mb-1">
            {language === 'bn' ? 'বিভাগ ও সেবা' : 'Services & Units'}
          </span>
          <ul className="flex flex-col gap-2 text-xs text-[#b7c7eb]">
            <li>
              <button
                type="button"
                onClick={() => onNavigate('about-us')}
                className="hover:text-white transition-colors text-left"
              >
                {language === 'bn' ? 'আমাদের পরিচয়' : 'About Us'}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('projects')}
                className="hover:text-white transition-colors text-left"
              >
                {language === 'bn' ? 'চলমান প্রকল্পসমূহ' : 'Active Projects'}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('super-shop-and-business')}
                className="hover:text-white transition-colors text-left"
              >
                {language === 'bn' ? 'সুপার শপ ও রিটেইল' : 'Super Shop & Retail'}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('members')}
                className="hover:text-white transition-colors text-left"
              >
                {language === 'bn' ? 'সদস্য পরিষদ ডিরেক্টরি' : 'Member Directory'}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('gallery')}
                className="hover:text-white transition-colors text-left"
              >
                {language === 'bn' ? 'কার্যক্রম ও ফটো গ্যালারি' : 'Photo Gallery'}
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: প্রশাসন ও সুরক্ষা (Governance & Security) */}
        <div className="flex flex-col gap-2">
          <span className="text-sm text-white font-semibold mb-1">
            {language === 'bn' ? 'প্রশাসন ও সুরক্ষা' : 'Governance & Assurance'}
          </span>
          <ul className="flex flex-col gap-2 text-xs text-[#b7c7eb]">
            <li>
              <button
                type="button"
                onClick={() => onNavigate('financial-reports')}
                className="hover:text-white transition-colors text-left"
              >
                {language === 'bn' ? 'বার্ষিক আর্থিক নিরীক্ষা' : 'Financial Audits'}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('member-hub')}
                className="hover:text-white transition-colors text-left"
              >
                {language === 'bn' ? 'সদস্য পোর্টাল ড্যাশবোর্ড' : 'Member Hub Portal'}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('apply-for-membership')}
                className="hover:text-white transition-colors text-left"
              >
                {language === 'bn' ? 'নতুন সদস্যপদ আবেদন' : 'Apply for Membership'}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('admin-portal')}
                className="hover:text-white transition-colors text-left"
              >
                {language === 'bn' ? 'কেন্দ্রীয় প্রশাসন শাখা' : 'Admin Operations'}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="hover:text-white transition-colors text-left"
              >
                {language === 'bn' ? 'অভিযোগ ও পরামর্শ ডেস্ক' : 'Support & Inquiries'}
              </button>
            </li>
          </ul>
        </div>

        {/* Column 5: যোগাযোগ ঠিকানা (Contact Coordinates) */}
        <div className="flex flex-col gap-2">
          <span className="text-sm text-white font-semibold mb-1">
            {language === 'bn' ? 'যোগাযোগ ঠিকানা' : 'Official Coordinates'}
          </span>
          <div className="flex flex-col gap-2 text-xs text-[#b7c7eb]">
            <p className="flex items-start gap-1.5">
              <span className="material-symbols-outlined text-[16px] mt-0.5 text-[#ffe08b] flex-shrink-0">
                location_on
              </span>
              <span>
                {language === 'bn'
                  ? 'প্রধান কার্যালয়: ইউজিজি টাওয়ার, সেক্টর ৩, উপশহর, রাজশাহী -১২৩০'
                  : 'Corporate HQ: UGG Tower, Sector 3, Upashahar, Rajshahi - 1230'}
              </span>
            </p>
            <p className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#ffe08b] flex-shrink-0">
                call
              </span>
              <span>+৮৮০ ১৭৩৮-১১৪১০১, 01722731944</span>
            </p>
            <p className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#ffe08b] flex-shrink-0">
                mail
              </span>
              <span>info@unitygrowthgroup.com</span>
            </p>
            <p className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#ffe08b] flex-shrink-0">
                schedule
              </span>
              <span>
                {language === 'bn'
                  ? 'রবিবার - বৃহস্পতিবার: ৯:০০ - ১৭:০০'
                  : 'Sun - Thu: 9:00 AM - 5:00 PM'}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Copyright Strip */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#b7c7eb]">
        <div>
          © 2025 UNITY GROWTH GROUP (UGG). {language === 'bn' ? 'সর্বস্বত্ব সংরক্ষিত' : 'All rights reserved.'}
        </div>
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() =>
              setModalContent(
                language === 'bn'
                  ? 'ইউজিজি গোপনীয়তা নীতি: সদস্যদের ব্যক্তিগত ব্যাংক তথ্য, জাতীয় পরিচয়পত্র ও এনক্রিপ্টেড ডাটা পূর্ণাঙ্গভাবে সংরক্ষিত।'
                  : 'UGG Privacy Policy: Full encryption guarantees confidentiality of member bank data and national identities.'
              )
            }
            className="hover:text-white transition-colors"
          >
            {language === 'bn' ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}
          </button>
          <button
            type="button"
            onClick={() =>
              setModalContent(
                language === 'bn'
                  ? 'ব্যবহারের শর্তাবলী: সমবায় আইন ও ইউজিজি গঠনতন্ত্র অনুসারে সকল লেনদেন ও প্রকল্পের লাভ-ক্ষতির অংশীদারিত্ব নির্ধারিত।'
                  : 'Terms of Use: All joint ventures are governed by UGG cooperative constitution and bylaws.'
              )
            }
            className="hover:text-white transition-colors"
          >
            {language === 'bn' ? 'ব্যবহারের শর্তাবলী' : 'Terms of Use'}
          </button>
          <button
            type="button"
            onClick={() =>
              setModalContent(
                language === 'bn'
                  ? 'শৃঙ্খলা বিধিমালা: স্বার্থের দ্বন্দ্বহীন পরিচালনা এবং নিরপেক্ষ দ্বৈত নিরীক্ষার মাধ্যমে প্রাতিষ্ঠানিক সুশাসন নিশ্চিত।'
                  : 'Code of Governance: Independent dual audits and strict adherence to fiduciary discipline.'
              )
            }
            className="hover:text-white transition-colors"
          >
            {language === 'bn' ? 'শৃঙ্খলা বিধিমালা' : 'Code of Conduct'}
          </button>
        </div>
      </div>

      {/* Simple Policy Modal Dialog */}
      {modalContent && (
        <div className="fixed inset-0 z-50 bg-[#000514]/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-[#131b2e] rounded-xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#745b00]">policy</span>
                <h3 className="font-serif font-bold text-lg text-[#000514]">
                  {language === 'bn' ? 'প্রাতিষ্ঠানিক নীতিমালা' : 'Institutional Policy'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalContent(null)}
                className="text-gray-400 hover:text-gray-700"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <p className="text-sm text-[#44474d] leading-relaxed mb-5">{modalContent}</p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setModalContent(null)}
                className="px-4 py-2 rounded bg-[#000514] text-white text-xs font-bold hover:bg-[#0d1e3a]"
              >
                {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
