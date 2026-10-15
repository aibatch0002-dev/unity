import React from 'react';
import { PageRoute, Language } from '../types';
import {
  HERO_BG_IMAGE,
  SUPER_SHOP_AISLE_IMAGE,
  AGRO_PARK_HERO_IMAGE,
} from '../data/mockData';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
  language: Language;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, language }) => {
  const isBn = language === 'bn';

  return (
    <div className="flex flex-col w-full">
      {/* HERO SECTION: Sovereign Wealth Corporate Hero */}
      <section className="relative w-full -mt-[7.5rem] pt-[7.5rem] min-h-[92vh] flex items-center overflow-hidden bg-[#000514] text-white">
        {/* Background Image with Gradient Scrim */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${HERO_BG_IMAGE}")` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#000514] via-[#000514]/90 to-[#000514]/60 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#000514] via-transparent to-[#000514]/40"></div>
        </div>

        {/* Ambient Geometry Refraction */}
        <div className="absolute -right-32 top-1/4 w-96 h-96 rounded-full bg-[#745b00]/15 blur-3xl pointer-events-none"></div>
        <div className="absolute left-10 bottom-10 w-80 h-80 rounded-full bg-[#d7e2ff]/10 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Crest Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full w-fit border border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#ffe08b] animate-pulse"></span>
                <span className="text-[11px] font-bold tracking-widest text-[#ffe08b] uppercase">
                  {isBn ? 'ইনভেস্টমেন্ট ও টেকসই প্রবৃদ্ধি প্ল্যাটফর্ম' : 'Investment & Sustainable Growth Platform'}
                </span>
                <span className="text-[#b7c7eb] text-[11px] font-normal">| Sovereign Standards</span>
              </div>

              {/* Headline Lockup */}
              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-[0.2em] text-[#ffe08b] font-bold">
                  United in Unity, Rising to Greatness
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight font-semibold leading-tight">
                  {isBn
                    ? 'একতায় অগ্রগতি, সমৃদ্ধির পথে অবিচল যাত্রা'
                    : 'Forward in Unity, Resolute on the Path of Prosperity'}
                </h1>
              </div>

              <p className="text-base sm:text-lg text-[#b7c7eb] max-w-2xl leading-relaxed font-light">
                {isBn ? (
                  <>
                    ঐক্যবদ্ধ বিনিয়োগ, টেকসই বাণিজ্য ও ব্যবসায়িক ক্ষমতায়নের মাধ্যমে জাতীয় অর্থনীতি ও সমবায় রূপান্তরে আত্মনিয়োগ। সততা এবং প্রাতিষ্ঠানিক আর্থিক শৃঙ্খলার সমন্বয়ে সদস্যদের দীর্ঘমেয়াদী অর্থনৈতিক প্রবৃদ্ধি সুনিশ্চিত করে{' '}
                    <span className="text-[#ffe08b] font-semibold">UNITY GROWTH GROUP</span>।
                  </>
                ) : (
                  <>
                    Dedicated to cooperative transformation, ethical enterprise, and sustainable wealth through sovereign collective investment. Ensuring transparent, long-term economic prosperity anchored by fiduciary integrity for all members of{' '}
                    <span className="text-[#ffe08b] font-semibold">UNITY GROWTH GROUP</span>.
                  </>
                )}
              </p>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('projects')}
                  className="bg-[#745b00] text-white hover:bg-[#fcd358] hover:text-[#735a00] px-6 py-3.5 rounded text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">domain</span>
                  <span>{isBn ? 'আমাদের প্রকল্পসমূহ দেখুন' : 'Explore Projects'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('apply-for-membership')}
                  className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-6 py-3.5 rounded text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border border-white/15 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">assignment_ind</span>
                  <span>{isBn ? 'সদস্য পদ আবেদন' : 'Apply for Membership'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('super-shop-and-business')}
                  className="bg-transparent text-[#ffe08b] hover:text-white px-4 py-3.5 rounded text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">storefront</span>
                  <span>{isBn ? 'সুপার শপ ভিজিট' : 'Visit Super Shop'}</span>
                </button>
              </div>
            </div>

            {/* Metric Mosaic Card */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl text-white flex flex-col gap-5 shadow-2xl border border-white/15">
                <div className="flex items-center justify-between pb-1 border-b border-white/10">
                  <span className="text-xs text-[#ffe08b] uppercase tracking-wider font-bold">
                    {isBn ? 'সারসংক্ষেপ তথ্যচিত্র' : 'Executive Overview'}
                  </span>
                  <span className="material-symbols-outlined text-[#ffe08b] text-[20px]">
                    verified_user
                  </span>
                </div>

                <div className="space-y-3.5">
                  <div className="bg-[#000514]/70 p-4 rounded-xl flex items-center justify-between border border-white/5">
                    <div>
                      <div className="font-serif text-2xl font-bold text-white">
                        {isBn ? '৪৫০+' : '450+'}
                      </div>
                      <div className="text-xs text-[#b7c7eb]">
                        {isBn ? 'সক্রিয় সদস্য (Active Members)' : 'Active Verified Members'}
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-[#fcd358]/20 flex items-center justify-center text-[#ffe08b]">
                      <span className="material-symbols-outlined text-[20px]">groups</span>
                    </div>
                  </div>

                  <div className="bg-[#000514]/70 p-4 rounded-xl flex items-center justify-between border border-white/5">
                    <div>
                      <div className="font-serif text-2xl font-bold text-[#ffe08b]">
                        {isBn ? '৳২৫.৪০ কোটি' : 'BDT 25.40 Cr'}
                      </div>
                      <div className="text-xs text-[#b7c7eb]">
                        {isBn ? 'অনুমোদিত বিনিয়োগ তহবিল' : 'Total Capital Pool'}
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-[#fcd358]/20 flex items-center justify-center text-[#ffe08b]">
                      <span className="material-symbols-outlined text-[20px]">account_balance</span>
                    </div>
                  </div>

                  <div className="bg-[#000514]/70 p-4 rounded-xl flex items-center justify-between border border-white/5">
                    <div>
                      <div className="font-serif text-2xl font-bold text-white">
                        {isBn ? '৮ টি উদ্যোগ' : '8 Active Assets'}
                      </div>
                      <div className="text-xs text-[#b7c7eb]">
                        {isBn ? 'সক্রিয় বাণিজ্যিক প্রতিষ্ঠান' : 'Operating Commercial Enterprises'}
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-[#fcd358]/20 flex items-center justify-center text-[#ffe08b]">
                      <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
                    </div>
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between text-xs text-[#b7c7eb]">
                  <span className="flex items-center gap-1 font-semibold text-[#85f8c4]">
                    <span className="material-symbols-outlined text-[15px]">check_circle</span>
                    {isBn ? '১০০% স্বাধীন নিরীক্ষিত' : '100% Independently Audited'}
                  </span>
                  <span className="text-[#ffe08b] font-mono">FY 2024-25</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK STATS RIBBON */}
      <section className="bg-[#e2e7ff] py-4 border-y border-[#dae2fd]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
          <div className="flex items-center gap-3 p-1">
            <span className="material-symbols-outlined text-[#745b00] text-[28px]">shield</span>
            <div>
              <div className="text-xs sm:text-sm font-bold text-[#131b2e]">
                {isBn ? 'সুরক্ষিত মূলধন' : 'Protected Capital'}
              </div>
              <div className="text-[11px] text-[#44474d]">
                {isBn ? 'কঠোর ঝুঁকি নিয়ন্ত্রণ নীতি' : 'Rigorous Risk Control'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-1">
            <span className="material-symbols-outlined text-[#745b00] text-[28px]">monitoring</span>
            <div>
              <div className="text-xs sm:text-sm font-bold text-[#131b2e]">
                {isBn ? 'টেকসই মুনাফা' : 'Sustainable Return'}
              </div>
              <div className="text-[11px] text-[#44474d]">
                {isBn ? 'ত্রৈমাসিক সরাসরি লভ্যাংশ বণ্টন' : 'Quarterly Direct Dividend'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-1">
            <span className="material-symbols-outlined text-[#745b00] text-[28px]">gavel</span>
            <div>
              <div className="text-xs sm:text-sm font-bold text-[#131b2e]">
                {isBn ? 'স্বচ্ছ নীতিমালা' : 'Transparent Governance'}
              </div>
              <div className="text-[11px] text-[#44474d]">
                {isBn ? 'পেশাদার বোর্ড ও অডিট কমিটি' : 'Professional Board & Audit'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-1">
            <span className="material-symbols-outlined text-[#745b00] text-[28px]">
              local_convenience_store
            </span>
            <div>
              <div className="text-xs sm:text-sm font-bold text-[#131b2e]">
                {isBn ? 'কমিউনিটি রিটেইল' : 'Community Retail'}
              </div>
              <div className="text-[11px] text-[#44474d]">
                {isBn ? 'UGG নিজস্ব সুপার শপ চেইন' : 'UGG Sovereign Retail Chain'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE PILLARS & ABOUT SECTION */}
      <section className="py-16 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl flex flex-col gap-1">
              <div className="inline-flex items-center gap-1.5 text-[#745b00] text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#745b00]"></span>
                {isBn ? 'আমাদের দর্শন ও ভিত্তি' : 'Our Philosophy & Bedrock'}
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#000514] font-semibold">
                {isBn
                  ? 'চারটি মৌলিক স্তম্ভের ওপর প্রতিষ্ঠিত আমাদের সমবায় অগ্রযাত্রা'
                  : 'Four Foundational Pillars Guiding Our Sovereign Growth'}
              </h2>
            </div>
            <p className="text-sm text-[#44474d] max-w-md leading-relaxed">
              {isBn
                ? 'UGG কেবল একটি বিনিয়োগ সংঘ নয়; এটি পারস্পরিক সংহতি ও ন্যায়সঙ্গত অর্থনীতি বিনির্মাণের একটি সম্মিলিত প্রচেষ্টা।'
                : 'UGG is not merely an investment fund; it is a collective endeavor to forge economic justice, mutual solidarity, and generational equity.'}
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Pillar 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-[#eaedff]">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#e2e7ff] flex items-center justify-center text-[#000514] mb-4">
                  <span className="material-symbols-outlined text-[26px]">balance</span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#000514]">
                  {isBn ? '১. সততা (Integrity)' : '1. Integrity'}
                </h3>
                <p className="text-xs text-[#44474d] mt-2 leading-relaxed">
                  {isBn
                    ? 'লেনদেন, ব্যবসায়িক অংশীদারিত্ব ও বিনিয়োগ বরাদ্দে প্রশ্নাতীত স্বচ্ছতা ও আন্তর্জাতিক মানের স্বাধীন অডিট প্রয়োগ।'
                    : 'Uncompromising transparency and independent professional audits across all transactions and capital allocation.'}
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#f2f3ff] text-[11px] text-[#745b00] font-bold uppercase tracking-wider flex items-center gap-1">
                <span>{isBn ? 'কঠোর নৈতিকতা' : 'Strict Ethics'}</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-[#eaedff]">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#e2e7ff] flex items-center justify-center text-[#000514] mb-4">
                  <span className="material-symbols-outlined text-[26px]">diversity_3</span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#000514]">
                  {isBn ? '২. একতা (Unity)' : '2. Unity'}
                </h3>
                <p className="text-xs text-[#44474d] mt-2 leading-relaxed">
                  {isBn
                    ? 'সদস্যদের যৌথ কণ্ঠস্বর ও সমঅধিকারের সুদৃঢ় সমবায় কাঠামোর মাধ্যমে বড় আর্থিক প্রকল্পের বাস্তবায়ন ও মুনাফা অংশীদারিত্ব।'
                    : 'Realizing mega commercial enterprises and equitable profit-sharing through democratic member solidarity.'}
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#f2f3ff] text-[11px] text-[#745b00] font-bold uppercase tracking-wider flex items-center gap-1">
                <span>{isBn ? 'সম্মিলিত বল' : 'Collective Power'}</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-[#eaedff]">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#e2e7ff] flex items-center justify-center text-[#000514] mb-4">
                  <span className="material-symbols-outlined text-[26px]">trending_up</span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#000514]">
                  {isBn ? '৩. সমৃদ্ধি (Prosperity)' : '3. Shared Prosperity'}
                </h3>
                <p className="text-xs text-[#44474d] mt-2 leading-relaxed">
                  {isBn
                    ? 'বৈচিত্র্যময় ব্যবসায়িক পোর্টফোলিও থেকে নিয়মিত ও টেকসই লভ্যাংশ অর্জনের মাধ্যমে জীবনমান উন্নয়ন ও মূল্য সংযোজন।'
                    : 'Fostering socio-economic advancement and wealth creation through reliable quarterly dividends from diversified revenue.'}
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#f2f3ff] text-[11px] text-[#745b00] font-bold uppercase tracking-wider flex items-center gap-1">
                <span>{isBn ? 'টেকসই সমৃদ্ধি' : 'Sustainable Wealth'}</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-[#eaedff]">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#e2e7ff] flex items-center justify-center text-[#000514] mb-4">
                  <span className="material-symbols-outlined text-[26px]">lightbulb</span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#000514]">
                  {isBn ? '৪. উদ্ভাবন (Innovation)' : '4. Innovation'}
                </h3>
                <p className="text-xs text-[#44474d] mt-2 leading-relaxed">
                  {isBn
                    ? 'আধুনিক গ্রিন-অ্যাগ্রো প্রযুক্তি, আধুনিক সুপার শপ লজিস্টিকস ও স্মার্ট ডিজিটাল সাপ্লাই চেইনের সফল প্রয়োগ।'
                    : 'Pioneering cutting-edge agro technology, retail cold chain logistics, and automated digital member architecture.'}
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#f2f3ff] text-[11px] text-[#745b00] font-bold uppercase tracking-wider flex items-center gap-1">
                <span>{isBn ? 'ভবিষ্যৎ প্রস্তুতি' : 'Future Ready'}</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS SHOWCASE: Asymmetric Bento Layout */}
      <section className="py-16 bg-[#f2f3ff]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#745b00] uppercase tracking-wider">
                {isBn ? 'বাণিজ্যিক ও সামাজিক প্রকল্প' : 'Commercial & Strategic Projects'}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#000514] font-semibold mt-1">
                {isBn
                  ? 'চলমান ও ভবিষ্যৎমুখী মেগা উদ্যোগসমূহ'
                  : 'Active & Future-Focused Mega Initiatives'}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('projects')}
              className="text-xs font-bold text-[#000514] hover:text-[#745b00] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>{isBn ? 'সকল প্রকল্প এক্সপ্লোর করুন' : 'Explore All Projects'}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_outward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Project 1: Agro-Park (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group border border-[#eaedff]">
              <div className="relative h-64 md:h-72 overflow-hidden">
                <img
                  src={AGRO_PARK_HERO_IMAGE}
                  alt="Modern sustainable agro-farming"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-[#0d1e3a] text-white text-[11px] font-bold px-3 py-1 rounded">
                    {isBn ? 'অ্যাগ্রো অ্যান্ড ফুড ইন্ডাস্ট্রি' : 'Agro & Food Industry'}
                  </span>
                  <span className="bg-[#fcd358] text-[#735a00] text-[11px] font-bold px-2.5 py-1 rounded">
                    {isBn ? 'চলমান প্রকল্প' : 'Active Project'}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 bg-[#000514]/80 backdrop-blur-md px-3 py-1.5 rounded text-white text-[11px] font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#ffe08b]">location_on</span>
                  <span>{isBn ? 'রাজশাহী' : 'Rajshahi Agro Zone'}</span>
                </div>
              </div>

              <div className="p-6 flex flex-col gap-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[#75777e] uppercase tracking-wider font-mono">
                      {isBn ? 'প্রকল্প কোড: UGG-AGR-01' : 'Code: UGG-AGR-01'}
                    </span>
                    <span className="text-xs text-[#745b00] font-bold">
                      {isBn ? 'বাজেট: ৳৪.৮ কোটি' : 'Budget: BDT 4.8 Cr'}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#000514] mt-1">
                    {isBn
                      ? 'ইউজিজি গ্রিন অ্যাগ্রো ও আধুনিক ডেইরি পার্ক'
                      : 'UGG Green Agro & Modern Dairy Park'}
                  </h3>
                  <p className="text-xs text-[#44474d] mt-1.5 leading-relaxed">
                    {isBn
                      ? 'উন্নত প্রযুক্তির গ্রিনহাউস, জৈব শাকসবজি চাষাবাদ, সোলার-পাওয়ার্ড সমন্বিত দুগ্ধ উৎপাদন কেন্দ্র এবং কোল্ড চেইন সাপ্লাই হাব যা সরাসরি UGG সুপার শপের সাথে যুক্ত।'
                      : 'High-tech greenhouse complexes, organic vegetable propagation, solar-assisted dairy center, and integrated cold-chain distribution linking directly to UGG Fresh Mart.'}
                  </p>
                </div>

                {/* Progress Meter */}
                <div className="bg-[#e2e7ff] p-3 rounded-lg flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#131b2e] font-semibold">
                      {isBn ? 'প্রকল্প বাস্তবায়ন অগ্রগতি' : 'Execution Progress'}
                    </span>
                    <span className="text-[#745b00] font-bold">
                      {isBn ? '৭৮% সম্পন্ন' : '78% Completed'}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#dae2fd] overflow-hidden">
                    <div className="h-full bg-[#745b00] rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-[#75777e] pt-0.5">
                    <span>{isBn ? 'বিনিয়োগকারী সদস্য: ১৮২ জন' : 'Stakeholders: 182 Members'}</span>
                    <span>{isBn ? 'প্রত্যাশিত বাণিজ্যিক উৎপাদন: আগস্ট ২০২৫' : 'Commercial Target: August 2025'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-[#68dba9] bg-[#000514] px-3 py-1 rounded inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">eco</span>{' '}
                    {isBn ? 'এসডিজি লক্ষ্যমাত্রা অনুসারী' : 'UN SDG Compliant'}
                  </span>
                  <button
                    type="button"
                    onClick={() => onNavigate('projects')}
                    className="text-xs text-[#000514] font-bold flex items-center gap-1 hover:text-[#745b00] cursor-pointer"
                  >
                    <span>{isBn ? 'বিস্তারিত জানুন' : 'Learn Details'}</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Project 2: Super Shop Network (5 Cols) */}
            <div className="lg:col-span-5 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group border border-[#eaedff]">
              <div className="relative h-64 md:h-72 overflow-hidden">
                <img
                  src={SUPER_SHOP_AISLE_IMAGE}
                  alt="UGG Super Shop Network"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-[#0d1e3a] text-white text-[11px] font-bold px-3 py-1 rounded">
                    {isBn ? 'রিটেইল ও বাণিজ্য' : 'Retail & FMCG'}
                  </span>
                  <span className="bg-[#85f8c4] text-[#002114] text-[11px] font-bold px-2.5 py-1 rounded">
                    {isBn ? 'সম্প্রসারণরত' : 'Expanding'}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 bg-[#000514]/80 backdrop-blur-md px-3 py-1.5 rounded text-white text-[11px] font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#ffe08b]">store</span>
                  <span>{isBn ? 'উপশহর, রাজশাহী' : 'Rajshahi & Uttara'}</span>
                </div>
              </div>

              <div className="p-6 flex flex-col gap-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[#75777e] uppercase tracking-wider font-mono">
                      {isBn ? 'প্রকল্প কোড: UGG-RET-04' : 'Code: UGG-RET-04'}
                    </span>
                    <span className="text-xs text-[#745b00] font-bold">
                      {isBn ? 'বাজেট: ৳৩.৫ কোটি' : 'Budget: BDT 3.5 Cr'}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#000514] mt-1">
                    {isBn
                      ? 'ইউজিজি প্রিমিয়াম এক্সপ্রেস সুপার শপ নেটওয়ার্ক'
                      : 'UGG Premium Express Super Shop Network'}
                  </h3>
                  <p className="text-xs text-[#44474d] mt-1.5 leading-relaxed">
                    {isBn
                      ? 'তাজা অর্গানিক কৃষি খাদ্যপণ্য, প্রাত্যহিক গ্রোসারি এবং মানসম্পন্ন গৃহস্থালি সামগ্রী ন্যায্যমূল্যে সরবরাহের এক আধুনিক রিটেইল অভিজ্ঞতা।'
                      : 'Modern chemical-free retail network delivering direct farmer-to-consumer organic produce, dairy, oils, and daily essentials at fair prices.'}
                  </p>
                </div>

                <div className="bg-[#e2e7ff] p-3 rounded-lg flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#131b2e] font-semibold">
                      {isBn ? 'পরবর্তী শাখা প্রস্তুতি (বনানী)' : 'Next Branch Outfitting (Banani)'}
                    </span>
                    <span className="text-[#745b00] font-bold">
                      {isBn ? '৯২% সম্পন্ন' : '92% Completed'}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#dae2fd] overflow-hidden">
                    <div className="h-full bg-[#745b00] rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-[#75777e] pt-0.5">
                    <span>{isBn ? 'দৈনিক কাস্টমার ফুটফল: ৯৫০+' : 'Daily Footfall: 950+'}</span>
                    <span>{isBn ? 'সদস্য বিশেষ ডিসকাউন্ট: ৮%' : 'Member Discount: 8%'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => onNavigate('super-shop-and-business')}
                    className="text-xs text-[#745b00] font-bold flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <span>{isBn ? 'সুপার শপ পোর্টাল দেখুন' : 'Visit Super Shop'}</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                  <span className="text-[11px] text-[#75777e]">
                    {isBn ? 'সরাসরি বিক্রয় চলমান' : 'Live Point-of-Sale Active'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UGG SUPER SHOP & BUSINESS HIGHLIGHT */}
      <section className="py-16 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="bg-[#0d1e3a] text-white rounded-2xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#745b00]/15 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 flex flex-col gap-5">
              <div className="inline-flex items-center gap-2 bg-[#745b00]/20 text-[#ffe08b] px-3.5 py-1 rounded w-fit text-xs uppercase tracking-wider font-bold">
                <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                {isBn ? 'সরাসরি পাইকারি ও খুচরা বাণিজ্য' : 'Direct Wholesale & Retail Commerce'}
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl text-white font-semibold leading-tight">
                {isBn
                  ? 'UGG সুপার শপ: সততা ও খাঁটি পণ্যের বিশ্বস্ত ঠিকানা'
                  : 'UGG Super Shop: The Trusted Benchmark of Purity & Value'}
              </h2>

              <p className="text-sm text-[#b7c7eb] leading-relaxed">
                {isBn
                  ? 'মধ্যস্বত্বভোগী মুক্ত সরবরাহ ব্যবস্থার মাধ্যমে সরাসরি কৃষকের উৎপাদিত খাদ্যপণ্য ভোক্তার দোরগোড়ায় পৌঁছে দেওয়া আমাদের লক্ষ্য। UGG সদস্যদের জন্য প্রতিটি কেনাকাটায় রয়েছে ক্যাশব্যাক ও বার্ষিক রিটেইল লভ্যাংশ অর্জনের সুযোগ।'
                  : 'Eliminating intermediaries to transport verified organic agricultural harvest straight from farms to family dining tables. Members enjoy lifetime loyalty rebates and patronage dividend shares.'}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="bg-[#000514]/60 p-3.5 rounded-xl border border-white/5">
                  <div className="font-serif text-lg font-bold text-[#ffe08b]">
                    {isBn ? '১০০% অর্গানিক' : '100% Organic'}
                  </div>
                  <div className="text-xs text-[#b7c7eb]">
                    {isBn ? 'রাসায়নিকমুক্ত শাকসবজি ও ফল' : 'Chemical-Free Produce & Dairy'}
                  </div>
                </div>
                <div className="bg-[#000514]/60 p-3.5 rounded-xl border border-white/5">
                  <div className="font-serif text-lg font-bold text-white">
                    {isBn ? 'সদস্য সুবিধা' : 'Member Privilege'}
                  </div>
                  <div className="text-xs text-[#b7c7eb]">
                    {isBn ? 'বিশেষ মূল্যছাড় ও হোম ডেলিভারি' : 'Rebates & Free Express Delivery'}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('super-shop-and-business')}
                  className="bg-[#745b00] hover:bg-[#fcd358] hover:text-[#735a00] text-white px-6 py-3 rounded text-xs font-bold transition-all flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                  <span>{isBn ? 'অনলাইনে অর্ডার করুন' : 'Order Online Now'}</span>
                </button>
                <span className="text-[#b7c7eb] text-xs flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#85f8c4]">verified</span>
                  {isBn ? 'সরাসরি আউটলেট পরিদর্শন উন্মুক্ত' : 'Physical Outlets Open Daily'}
                </span>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-xl overflow-hidden shadow-2xl group">
                <img
                  src={SUPER_SHOP_AISLE_IMAGE}
                  alt="UGG Gourmet Super Shop"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000514]/90 via-transparent to-transparent"></div>
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
                  <div>
                    <div className="text-sm font-bold text-[#ffe08b]">
                      {isBn ? 'কেন্দ্রীয় সুপারস্টোর উত্তরা' : 'Central Superstore Uttara'}
                    </div>
                    <div className="text-xs text-[#b7c7eb]">
                      {isBn ? 'রোড ১১, সেক্টর ৩, উত্তরা, ঢাকা' : 'Road 11, Sector 4, Uttara, Dhaka'}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('super-shop-and-business')}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-[#745b00] text-white transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINANCIAL TRANSPARENCY & AUDIT HIGHLIGHT */}
      <section className="py-16 bg-white border-y border-[#eaedff]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 flex flex-col gap-5">
              <span className="text-xs font-bold text-[#745b00] uppercase tracking-wider">
                {isBn ? 'আর্থিক সুশাসন ও অডিট নিরীক্ষা' : 'Financial Governance & Audit'}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#000514] font-semibold leading-tight">
                {isBn
                  ? 'স্বচ্ছতা যেখানে প্রতিশ্রুতি নয়, আমাদের সার্বক্ষণিক বাস্তবতা'
                  : 'Transparency Is Not Merely a Promise, It Is Our Immutable Practice'}
              </h2>
              <p className="text-sm text-[#44474d] leading-relaxed">
                {isBn
                  ? 'প্রত্যেক সদস্যের গচ্ছিত মূলধনের নিখুঁত হিসাব সংরক্ষণ এবং ডিজিটাল পোর্টালে প্রকাশ করা হয়। ত্রৈমাসিক অভ্যন্তরীণ নিরীক্ষা এবং দেশের শীর্ষস্থানীয় চার্টার্ড অ্যাকাউন্ট্যান্ট ফার্ম দ্বারা বার্ষিক যৌথ হিসাব নিরীক্ষা সম্পন্ন হয়।'
                  : 'Every taka of member capital is immutably logged on sovereign digital ledgers. Quarterly internal audit reports and comprehensive annual scrutiny by premier chartered accountancy firms guarantee fiscal integrity.'}
              </p>

              <div className="space-y-3 pt-1">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#745b00] text-[22px] mt-0.5">
                    verified
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-[#131b2e]">
                      {isBn ? 'স্বাধীন অডিট বোর্ড' : 'Independent Audit Panel'}
                    </h4>
                    <p className="text-xs text-[#44474d]">
                      {isBn
                        ? 'পেশাদার চার্টার্ড অ্যাকাউন্ট্যান্টদের সমন্বয়ে গঠিত নিরীক্ষা কমিটি।'
                        : 'External chartered accountants providing quarterly statutory certification.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#745b00] text-[22px] mt-0.5">
                    lock_clock
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-[#131b2e]">
                      {isBn ? 'রিয়েল-টাইম মেম্বার লেজার' : 'Real-Time Member Vault'}
                    </h4>
                    <p className="text-xs text-[#44474d]">
                      {isBn
                        ? 'প্রত্যেক সদস্য নিজস্ব পোর্টালে তাদের শেয়ার ও লভ্যাংশের ট্র্যাক দেখতে পারেন।'
                        : 'Encrypted personal ledger of share portfolios and quarterly dividend credits.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('financial-reports')}
                  className="inline-flex items-center gap-2 bg-[#000514] text-white px-5 py-2.5 rounded text-xs font-bold hover:bg-[#0d1e3a] transition-colors shadow cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  <span>
                    {isBn ? '২০২৩-২৪ বার্ষিক আর্থিক প্রতিবেদন (PDF)' : 'Download Annual Audit Report (PDF)'}
                  </span>
                </button>
              </div>
            </div>

            {/* Interactive Visual Ledger Donut Card */}
            <div className="lg:col-span-7 bg-[#faf8ff] p-6 md:p-8 rounded-2xl shadow-sm border border-[#eaedff]">
              <div className="flex items-center justify-between pb-4 border-b border-[#eaedff]">
                <div>
                  <div className="text-[11px] text-[#75777e] uppercase tracking-wider font-semibold">
                    {isBn ? 'তহবিল বণ্টন নিরীক্ষা (FY 24-25)' : 'Asset Allocation Audit (FY 24-25)'}
                  </div>
                  <div className="font-serif text-lg font-bold text-[#000514]">
                    {isBn ? 'মোট সম্পদ মূল্যায়ন: ৳২৫.৪০ কোটি' : 'Total Asset Valuation: BDT 25.40 Cr'}
                  </div>
                </div>
                <span className="bg-[#e2e7ff] text-[#000514] px-3 py-1 rounded text-xs font-bold">
                  {isBn ? 'স্বতন্ত্র ভেরিফাইড' : 'Officially Certified'}
                </span>
              </div>

              {/* Minimal SVG Financial Donut */}
              <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-5 flex justify-center">
                  <div className="relative w-40 h-40">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" fill="none" r="15.9155" stroke="#eaedff" strokeWidth="4"></circle>
                      <circle
                        cx="18"
                        cy="18"
                        fill="none"
                        r="15.9155"
                        stroke="#000514"
                        strokeDasharray="45, 100"
                        strokeDashoffset="0"
                        strokeWidth="4.5"
                      ></circle>
                      <circle
                        cx="18"
                        cy="18"
                        fill="none"
                        r="15.9155"
                        stroke="#745b00"
                        strokeDasharray="30, 100"
                        strokeDashoffset="-45"
                        strokeWidth="4.5"
                      ></circle>
                      <circle
                        cx="18"
                        cy="18"
                        fill="none"
                        r="15.9155"
                        stroke="#0e996b"
                        strokeDasharray="25, 100"
                        strokeDashoffset="-75"
                        strokeWidth="4.5"
                      ></circle>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="font-serif text-xl font-bold text-[#000514]">
                        {isBn ? '১০০%' : '100%'}
                      </span>
                      <span className="text-[10px] text-[#75777e] uppercase tracking-wider font-bold">
                        {isBn ? 'অ্যালোকেশন' : 'Allocated'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-7 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#eaedff]">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#000514]"></span>
                      <span className="text-xs text-[#131b2e] font-semibold">
                        {isBn ? 'বাণিজ্যিক ও সুপার শপ রিটেইল' : 'Commercial & Super Shop Retail'}
                      </span>
                    </div>
                    <span className="text-xs text-[#000514] font-bold">{isBn ? '৪৫%' : '45%'}</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#eaedff]">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#745b00]"></span>
                      <span className="text-xs text-[#131b2e] font-semibold">
                        {isBn ? 'গ্রিন অ্যাগ্রো ও ফুড পার্ক' : 'Green Agro & Food Park'}
                      </span>
                    </div>
                    <span className="text-xs text-[#745b00] font-bold">{isBn ? '৩০%' : '30%'}</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#eaedff]">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#0e996b]"></span>
                      <span className="text-xs text-[#131b2e] font-semibold">
                        {isBn ? 'লিকুইডিটি ও রিজার্ভ ক্যাপিটাল' : 'Liquidity & Cash Reserve'}
                      </span>
                    </div>
                    <span className="text-xs text-[#0e996b] font-bold">{isBn ? '২৫%' : '25%'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#eaedff] flex items-center justify-between text-xs text-[#75777e]">
                <span>
                  {isBn ? 'সর্বশেষ স্বাধীন বহিঃনিরীক্ষা: অক্টোবর ২০২৪' : 'Last Independent Audit: October 2024'}
                </span>
                <span className="text-[#000514] font-bold">
                  {isBn ? 'রেটিং: AAA (Institutional Tier 1)' : 'Rating: AAA (Institutional Tier 1)'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEMBER COMMUNITY VOICE & TESTIMONIALS */}
      <section className="py-16 bg-[#eaedff]/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-10">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-1">
            <span className="text-xs font-bold text-[#745b00] uppercase tracking-wider">
              {isBn ? 'সদস্য পরিবার ও অভিমত' : 'Member Voices & Testimonials'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#000514] font-semibold">
              {isBn
                ? 'যৌথ বিশ্বাসের শক্তিতে আমাদের প্রতিটি অর্জন'
                : 'Every Milestone Achieved Through Mutual Trust'}
            </h2>
            <p className="text-xs sm:text-sm text-[#44474d]">
              {isBn
                ? 'UGG সদস্যদের বাস্তব অভিজ্ঞতা ও দায়িত্বশীল নেতৃত্বের দিকনির্দেশনা।'
                : 'Lived experiences of verified stakeholders and leadership stewardship.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col justify-between border border-[#eaedff]">
              <div className="flex flex-col gap-3">
                <div className="text-[#745b00] flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[18px]">
                      star
                    </span>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#44474d] italic leading-relaxed">
                  {isBn
                    ? '"UGG-তে যোগদানের পর সমবায় বিনিয়োগের প্রকৃত স্বচ্ছতা উপলব্ধি করেছি। প্রতি ত্রৈমাসিকে ডিজিটাল লেজার ও নিয়মিত অডিট প্রতিবেদন আমদের আস্থার ভিত্তি আরও মজবুত করেছে।"'
                    : '"Joining UGG demonstrated what true transparency in cooperative economics means. The quarterly digital ledgers and verified audits have reinforced complete confidence."'}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-6 pt-3 border-t border-[#eaedff]">
                <div className="w-10 h-10 rounded-full bg-[#0d1e3a] text-white flex items-center justify-center font-bold text-sm">
                  হা
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-serif font-bold text-[#000514] tracking-wide">
                    {isBn ? 'মোঃ হাফিজুর রহমান' : 'Md. Hafizur Rahman'}
                  </div>
                  <div className="text-[11px] text-[#75777e]">
                    {isBn ? 'প্রতিষ্ঠাতা সদস্য (সদস্য নং ০০১৮)' : 'Founder Member (ID: UGG-M-1001)'}
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 (Executive Highlight) */}
            <div className="bg-[#000514] text-white p-6 rounded-xl shadow-md flex flex-col justify-between">
              <div className="flex flex-col gap-3">
                <div className="text-[#ffe08b] flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[18px]">
                      star
                    </span>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#b7c7eb] italic leading-relaxed">
                  {isBn
                    ? '"আমাদের মূল লক্ষ্য কেবল আর্থিক মুনাফা নয়, জাতীয় অর্থনীতিতে স্বাবলম্বী ব্যবসায়িক মডেল গড়ে তোলা। সততা ও একতাই আমাদের সবচেয়ে বড় মূলধন।"'
                    : '"Our mission transcends mere financial gain; we are pioneering self-sustaining enterprises for the national economy. Integrity and unity remain our greatest wealth."'}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-6 pt-3 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-[#fcd358] text-[#735a00] flex items-center justify-center font-bold text-sm">
                  ফ
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-serif font-bold text-white tracking-wide">
                    {isBn ? 'মোঃ ফরহাদ হোসেন' : 'Md. Farhad Hossain'}
                  </div>
                  <div className="text-[11px] text-[#b7c7eb]">
                    {isBn ? 'চেয়ারপার্সন, নির্বাহী পর্ষদ' : 'Chairperson, Executive Council'}
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col justify-between border border-[#eaedff]">
              <div className="flex flex-col gap-3">
                <div className="text-[#745b00] flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[18px]">
                      star
                    </span>
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#44474d] italic leading-relaxed">
                  {isBn
                    ? '"ইউজিজি সুপার শপ ও গ্রিন অ্যাগ্রো প্রকল্প প্রমাণ করেছে সমবায় উদ্যোগও বিশ্বমানের পেশাদারিত্বের সাথে মুনাফাজনকভাবে পরিচালনা করা সম্ভব।"'
                    : '"The UGG Fresh Mart and agro estates prove that community cooperative ventures can operate with world-class discipline and robust commercial profit."'}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-6 pt-3 border-t border-[#eaedff]">
                <div className="w-10 h-10 rounded-full bg-[#0d1e3a] text-white flex items-center justify-center font-bold text-sm">
                  {isBn ? 'আ' : 'A'}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#000514]">
                    {isBn ? 'আরিফ হাসান চৌধুরী' : 'Arif Hasan Chowdhury'}
                  </div>
                  <div className="text-[11px] text-[#75777e]">
                    {isBn ? 'বাণিজ্যিক বিনিয়োগ অংশীদার' : 'Institutional Investment Partner'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION & APPLICATION INVITATION */}
      <section className="py-16 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="bg-gradient-to-r from-[#000514] to-[#0d1e3a] rounded-2xl p-6 sm:p-10 lg:p-12 text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 flex flex-col gap-2">
              <span className="text-xs font-bold text-[#ffe08b] uppercase tracking-wider">
                {isBn ? 'সদস্য অন্তর্ভুক্তি সেশন ২০২৫' : 'Membership Enrollment 2025'}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold">
                {isBn
                  ? 'ঐক্যের শক্তিতে গড়ে তুলুন আপনার নিরাপদ ভবিষ্যৎ'
                  : 'Build Your Secure Future Through Sovereign Unity'}
              </h2>
              <p className="text-xs sm:text-sm text-[#b7c7eb] max-w-2xl leading-relaxed mt-1">
                {isBn
                  ? 'আপনি কি নৈতিক সমবায় বিনিয়োগ ও টেকসই উদ্যোক্তা প্ল্যাটফর্মে যুক্ত হতে আগ্রহী? UNITY GROWTH GROUP-এর সম্মানিত সাধারণ সদস্যপদের জন্য আজই অনলাইনে আবেদন করুন।'
                  : 'Are you seeking an ethical cooperative investment and sustainable enterprise consortium? Apply online today to enroll as an honored member of UNITY GROWTH GROUP.'}
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-[#b7c7eb]">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#ffe08b]">done_all</span>{' '}
                  {isBn ? 'সহজ ভেরিফিকেশন প্রক্রিয়া' : 'Streamlined Verification Protocol'}
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#ffe08b]">done_all</span>{' '}
                  {isBn ? 'অগ্রাধিকার ভিত্তিক শেয়ার বণ্টন' : 'Priority Share Allotment'}
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#ffe08b]">done_all</span>{' '}
                  {isBn ? '২৪/৭ সাপোর্ট টিম' : '24/7 Dedicated Liaison Secretariat'}
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <button
                type="button"
                onClick={() => onNavigate('apply-for-membership')}
                className="bg-[#745b00] hover:bg-[#fcd358] hover:text-[#735a00] text-white px-6 py-3.5 rounded text-xs font-bold transition-all text-center shadow-lg cursor-pointer"
              >
                {isBn ? 'সদস্য হতে আবেদন করুন' : 'Apply for Membership'}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-6 py-3.5 rounded text-xs font-semibold transition-all text-center border border-white/10 cursor-pointer"
              >
                {isBn ? 'পরামর্শকের সাথে কথা বলুন' : 'Consult Secretariat'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
