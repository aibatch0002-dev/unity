import React from 'react';
import { PageRoute, Language } from '../types';
import { BOARDROOM_MEETING_IMAGE } from '../data/mockData';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
  language: Language;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, language }) => {
  const isBn = language === 'bn';

  return (
    <div className="flex flex-col w-full">
      {/* Breadcrumbs & Ref Strip */}
      <section className="w-full bg-[#f2f3ff] px-6 lg:px-12 py-4 border-b border-[#eaedff]">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-[#44474d]">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="hover:text-[#000514] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-[#745b00]">home</span>
              <span>{isBn ? 'হোম' : 'Home'}</span>
            </button>
            <span className="material-symbols-outlined text-[14px] text-[#c5c6ce]">chevron_right</span>
            <span className="text-[#000514] font-bold">
              {isBn ? 'আমাদের সম্পর্কে' : 'About Us'}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-[#eaedff] text-[#131b2e] text-[10px] uppercase tracking-wider font-bold">
              REF: UGG-CORP-GOV-2025
            </span>
          </div>
        </div>
      </section>

      {/* Editorial Hero Section */}
      <section className="w-full bg-[#f2f3ff] px-6 lg:px-12 pt-8 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 bg-white rounded-full shadow-sm border border-[#eaedff]">
              <span className="w-2 h-2 rounded-full bg-[#745b00]"></span>
              <span className="text-[11px] text-[#745b00] uppercase tracking-widest font-bold">
                {isBn ? 'প্রাতিষ্ঠানিক ঐতিহ্য ও রূপকল্প' : 'Institutional Heritage & Vision'}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#000514] font-bold tracking-tight leading-tight">
              {isBn
                ? 'একতাবদ্ধ শক্তিতে সমৃদ্ধ আগামীর অভিযাত্রা'
                : 'Pioneering Shared Prosperity Through Unified Strength'}
            </h1>

            <p className="font-serif text-lg text-[#745b00] italic -mt-2">
              "United in Unity, Rising to Greatness"
            </p>

            <p className="text-sm sm:text-base text-[#44474d] leading-relaxed max-w-2xl font-light">
              {isBn
                ? 'ইউনাইটি গ্রোথ গ্রুপ (UGG) একটি প্রগতিশীল সমবায় ও প্রাতিষ্ঠানিক অর্থনৈতিক রূপান্তর মঞ্চ। সততা, স্বচ্ছতা এবং যৌথ পুঁজির নৈতিক ব্যবহারের মাধ্যমে তৃণমূল পর্যায় থেকে প্রাতিষ্ঠানিক বিনিয়োগ খাত পর্যন্ত টেকসই আর্থিক প্রাচুর্য বিনির্মাণে আমরা অঙ্গীকারবদ্ধ।'
                : 'Unity Growth Group (UGG) is a forward-thinking cooperative conglomerate and institutional capital platform. Guided by uncompromised integrity, transparent governance, and asset-backed allocations, we empower members across commercial ventures, smart agro-parks, and nationwide retail networks.'}
            </p>

            {/* Dynamic Stat Sparklines */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-[#eaedff] flex flex-col justify-between">
                <span className="text-[11px] text-[#75777e] uppercase font-semibold">
                  {isBn ? 'সদস্য পরিষদ' : 'Members Network'}
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-serif text-2xl font-bold text-[#000514]">
                    {isBn ? '৬৪৫+' : '645+'}
                  </span>
                  <span className="text-xs text-[#0e996b] font-bold">
                    {isBn ? '↑ ১৫%' : '↑ 15%'}
                  </span>
                </div>
                <span className="text-[11px] text-[#75777e] mt-1">
                  {isBn ? 'সক্রিয় অংশীদার' : 'Active Stakeholders'}
                </span>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-[#eaedff] flex flex-col justify-between">
                <span className="text-[11px] text-[#75777e] uppercase font-semibold">
                  {isBn ? 'যৌথ প্রকল্প মূলধন' : 'Portfolio Capital'}
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-serif text-2xl font-bold text-[#745b00]">
                    {isBn ? '৳ ২৫+ কোটি' : '৳ 25+ Cr'}
                  </span>
                </div>
                <span className="text-[11px] text-[#75777e] mt-1">
                  {isBn ? 'সুরক্ষিত পোর্টফোলিও' : 'Protected Assets'}
                </span>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-[#eaedff] flex flex-col justify-between">
                <span className="text-[11px] text-[#75777e] uppercase font-semibold">
                  {isBn ? 'অডিট রেটিং' : 'Audit Rating'}
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-serif text-2xl font-bold text-[#000514]">AAA</span>
                  <span className="text-xs text-[#745b00] font-bold">
                    {isBn ? 'স্বীকৃত' : 'Certified'}
                  </span>
                </div>
                <span className="text-[11px] text-[#75777e] mt-1">
                  {isBn ? 'কমপ্লায়েন্স গ্রেড' : 'Compliance Grade'}
                </span>
              </div>
            </div>
          </div>

          {/* Boardroom Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative bg-white p-2 rounded-2xl shadow-xl overflow-hidden border border-[#eaedff]">
              <img
                src={BOARDROOM_MEETING_IMAGE}
                alt="UGG Executive Board of Directors Meeting"
                className="w-full h-[400px] object-cover rounded-xl"
              />
              <div className="p-4 bg-[#0d1e3a] text-white flex items-center justify-between rounded-b-xl mt-2">
                <div>
                  <p className="text-sm font-bold">
                    {isBn
                      ? 'পরিচালনা পর্ষদের মাসিক নীতি নির্ধারণী অধিবেশন'
                      : 'Monthly Executive Board Strategic Session'}
                  </p>
                  <p className="text-xs text-[#b7c7eb]">
                    {isBn
                      ? 'কর্পোরেট গভর্নেন্স ও দীর্ঘমেয়াদী রূপরেখা পর্যালোচনা'
                      : 'Corporate Governance & Long-Term Roadmap'}
                  </p>
                </div>
                <span className="material-symbols-outlined text-[#fcd358] text-[24px]">verified_user</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Pillars: Mission, Vision, and Values */}
      <section className="w-full bg-white py-16 px-6 lg:px-12 border-b border-[#eaedff]">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs text-[#745b00] uppercase tracking-widest font-bold">
                {isBn ? 'আমাদের পথপ্রদর্শক ফ্রেমওয়ার্ক' : 'Our Guiding Matrix'}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#000514] font-bold mt-1">
                {isBn ? 'লক্ষ্য, দূরদৃষ্টি ও মৌলিক আদর্শ' : 'Vision, Mission & Guiding Principles'}
              </h2>
            </div>
            <p className="text-sm text-[#44474d] max-w-md leading-relaxed">
              {isBn
                ? 'সদস্যদের আস্থা এবং সামাজিক সমৃদ্ধির ভারসাম্য রক্ষায় আমরা প্রতিটি পদক্ষেপে প্রাতিষ্ঠানিক দায়বদ্ধতাকে অগ্রাধিকার দিই।'
                : 'Upholding member trust and social prosperity through rigorous institutional governance and ethical financial stewardship.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Vision */}
            <div className="bg-[#faf8ff] p-8 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow border border-[#eaedff]">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#000514] text-white flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-[24px]">visibility</span>
                </div>
                <span className="text-xs text-[#745b00] uppercase tracking-widest font-bold">
                  {isBn ? 'দূরদৃষ্টি / Vision' : 'Strategic Vision'}
                </span>
                <h3 className="font-serif text-lg text-[#000514] font-bold mt-2 mb-3">
                  {isBn ? 'টেকসই সমবায় নেতৃত্ব' : 'Sustainable Cooperative Leadership'}
                </h3>
                <p className="text-xs sm:text-sm text-[#44474d] leading-relaxed">
                  {isBn
                    ? 'একটি বৈষম্যহীন এবং স্বাবলম্বী অর্থনৈতিক বাস্তুতন্ত্র গড়ে তোলা, যেখানে সদস্যদের সমন্বিত সঞ্চয় এবং বুদ্ধিমান কৌশলগত উদ্যোগ জাতীয় সমৃদ্ধিতে অনুঘটক হিসেবে কাজ করবে।'
                    : 'Building an equitable, self-reliant economic ecosystem where pooled member savings transform into high-impact capital across productive real-economy sectors.'}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#eaedff] flex items-center gap-2 text-xs font-bold text-[#000514]">
                <span className="material-symbols-outlined text-[#745b00] text-[16px]">flag</span>
                <span>{isBn ? '২০৩০ সালের মধ্যে শীর্ষ সমবায় নেটওয়ার্ক' : 'Top Sovereign Cooperative by 2030'}</span>
              </div>
            </div>

            {/* Mission */}
            <div className="bg-[#0d1e3a] text-white p-8 rounded-xl shadow-md flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-white text-[#000514] flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-[24px] text-[#745b00]">rocket_launch</span>
                </div>
                <span className="text-xs text-[#fcd358] uppercase tracking-widest font-bold">
                  {isBn ? 'মিশন / Mission' : 'Institutional Mission'}
                </span>
                <h3 className="font-serif text-lg text-white font-bold mt-2 mb-3">
                  {isBn ? 'যৌথ ক্ষমতায়ন ও প্রবৃদ্ধি' : 'Collective Capital & Empowerment'}
                </h3>
                <p className="text-xs sm:text-sm text-[#b7c7eb] leading-relaxed">
                  {isBn
                    ? 'সদস্যদের মূলধনের সুরক্ষা সুনিশ্চিত করে অ্যাগ্রো-ফার্মিং, রিটেইল সুপারশপ চেইন এবং আধুনিক অবকাঠামো খাতে পরিকল্পিত ঝুঁকিহীন রূপান্তরের মাধ্যমে সর্বোচ্চ লভ্যাংশ বণ্টন।'
                    : 'Safeguarding capital through rigorous risk assessment and deploying resources into commercial agriculture, retail stores, and logistics for resilient, sustainable returns.'}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-bold text-[#ffe08b]">
                <span className="material-symbols-outlined text-[#ffe08b] text-[16px]">task_alt</span>
                <span>{isBn ? '১০০% ডিজিটাল রিপোর্টিং ও ঝুঁকি নিরসন' : '100% Digital Reporting & Zero-Interest'}</span>
              </div>
            </div>

            {/* Core Values */}
            <div className="bg-[#faf8ff] p-8 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow border border-[#eaedff]">
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#000514] text-white flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-[24px]">diamond</span>
                </div>
                <span className="text-xs text-[#745b00] uppercase tracking-widest font-bold">
                  {isBn ? 'মূল্যবোধ / Core Values' : 'Core Sovereign Values'}
                </span>
                <h3 className="font-serif text-lg text-[#000514] font-bold mt-2 mb-3">
                  {isBn ? 'সততা, একতা ও স্থায়িত্ব' : 'Integrity, Unity & Resilience'}
                </h3>
                <ul className="flex flex-col gap-2 text-xs text-[#44474d]">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#745b00] text-[15px] mt-0.5">check_circle</span>
                    <span>
                      <strong>{isBn ? 'সততা (Integrity):' : 'Integrity:'}</strong>{' '}
                      {isBn ? 'প্রতিটি পয়সার সুনির্দিষ্ট হিসাব ও জবাবদিহিতা।' : 'Absolute ledger precision and fiscal honesty.'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#745b00] text-[15px] mt-0.5">check_circle</span>
                    <span>
                      <strong>{isBn ? 'একতা (Unity):' : 'Unity:'}</strong>{' '}
                      {isBn ? 'সম্মিলিত সিদ্ধান্তের ভিত্তিতে যৌথ অগ্রগতি।' : 'Democratic decisions driving shared progress.'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#745b00] text-[15px] mt-0.5">check_circle</span>
                    <span>
                      <strong>{isBn ? 'স্থায়িত্ব (Sustainability):' : 'Sustainability:'}</strong>{' '}
                      {isBn ? 'দীর্ঘমেয়াদী পরিবেশবান্ধব বিনিয়োগ।' : 'Eco-conscious, long-term asset development.'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#745b00] text-[15px] mt-0.5">check_circle</span>
                    <span>
                      <strong>{isBn ? 'দায়বদ্ধতা (Accountability):' : 'Accountability:'}</strong>{' '}
                      {isBn ? 'স্বাধীন নিরীক্ষা ও বার্ষিক সাধারণ সভা।' : 'Independent ICAB audits & transparent AGMs.'}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-[#eaedff] flex items-center gap-2 text-xs font-bold text-[#000514]">
                <span className="material-symbols-outlined text-[#745b00] text-[16px]">handshake</span>
                <span>{isBn ? 'সদস্য-কেন্দ্রিক প্রশাসনিক ন্যায়পরায়ণতা' : 'Member-First Governance Equity'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsible Investment Charter: 5 Core Pillars */}
      <section className="w-full bg-[#f2f3ff] py-16 px-6 lg:px-12 border-b border-[#eaedff]">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-1">
            <span className="text-xs text-[#745b00] uppercase tracking-widest font-bold">
              {isBn ? 'নৈতিক পরিকাঠামো' : 'Ethical Framework'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#000514] font-bold">
              {isBn ? 'দায়িত্বশীল বিনিয়োগ ও প্রাতিষ্ঠানিক পঞ্চস্তম্ভ' : 'Five Pillars of Responsible Investment'}
            </h2>
            <p className="text-xs sm:text-sm text-[#44474d]">
              {isBn
                ? 'যৌথ পুঁজির সুরক্ষা এবং নৈতিক পরিচালনার জন্য আমরা পাঁচটি অপরিহার্য নীতিমালার কঠোর অনুশাসন মেনে চলি।'
                : 'Upholding strict institutional principles to preserve shareholder capital and generate ethical value.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-white p-5 rounded-xl shadow-sm flex flex-col justify-between border border-[#eaedff]">
              <div>
                <span className="font-serif text-2xl text-[#75777e]/30 font-bold block mb-1">
                  {isBn ? '০১' : '01'}
                </span>
                <h4 className="font-serif font-bold text-sm text-[#000514] mb-1.5">
                  {isBn ? 'শূণ্য-সুদ ও নৈতিক পুঁজি' : 'Zero-Riba & Ethical Model'}
                </h4>
                <p className="text-xs text-[#44474d] leading-relaxed">
                  {isBn
                    ? 'শারীয়াহ্-সম্মত এবং শোষণমুক্ত ব্যবসায়িক মডেল। কাল্পনিক মুনাফার পরিবর্তে বাস্তব সম্পদের অংশীদারিত্ব।'
                    : 'Shariah-compliant and non-exploitative model backed by tangible productive real assets.'}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#eaedff] text-[11px] font-bold text-[#0e996b] flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">balance</span>
                <span>Ethical Yield</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm flex flex-col justify-between border border-[#eaedff]">
              <div>
                <span className="font-serif text-2xl text-[#75777e]/30 font-bold block mb-1">
                  {isBn ? '০২' : '02'}
                </span>
                <h4 className="font-serif font-bold text-sm text-[#000514] mb-1.5">
                  {isBn ? 'সম্পদ-সমর্থিত বিনিয়োগ' : 'Asset-Backed Security'}
                </h4>
                <p className="text-xs text-[#44474d] leading-relaxed">
                  {isBn
                    ? 'জমি, রিটেইল দোকান ও আধুনিক এগ্রো-ফার্মের বাস্তব দৃশ্যমান সম্পদে রূপান্তর, যা মূল্যহ্রাস প্রতিরোধী।'
                    : 'Allocations tied to deed-verified land, registered retail stores, and agro cold-chains.'}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#eaedff] text-[11px] font-bold text-[#745b00] flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">domain</span>
                <span>Asset-Backed</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm flex flex-col justify-between border border-[#eaedff]">
              <div>
                <span className="font-serif text-2xl text-[#75777e]/30 font-bold block mb-1">
                  {isBn ? '০৩' : '03'}
                </span>
                <h4 className="font-serif font-bold text-sm text-[#000514] mb-1.5">
                  {isBn ? 'দ্বৈত নিরীক্ষা ও স্বচ্ছতা' : 'Dual Auditing Protocols'}
                </h4>
                <p className="text-xs text-[#44474d] leading-relaxed">
                  {isBn
                    ? 'অভ্যন্তরীণ নিরীক্ষা কমিটি ছাড়াও সরকার-স্বীকৃত চার্টার্ড অ্যাকাউন্ট্যান্ট ফার্ম দ্বারা নিয়মিত অডিট প্রকাশ।'
                    : 'Internal audit boards complemented by certified ICAB external auditors every quarter.'}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#eaedff] text-[11px] font-bold text-[#000514] flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">fact_check</span>
                <span>Dual Auditing</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm flex flex-col justify-between border border-[#eaedff]">
              <div>
                <span className="font-serif text-2xl text-[#75777e]/30 font-bold block mb-1">
                  {isBn ? '০৪' : '04'}
                </span>
                <h4 className="font-serif font-bold text-sm text-[#000514] mb-1.5">
                  {isBn ? 'ঝুঁকি বণ্টন ও সুরক্ষা রিজার্ভ' : 'Risk Reserve Cushion'}
                </h4>
                <p className="text-xs text-[#44474d] leading-relaxed">
                  {isBn
                    ? 'প্রতিটি প্রকল্পের মোট আয়ের অন্তত ১০% আলাদা ইমার্জেন্সি রিজার্ভ ফান্ডে সংরক্ষণ।'
                    : 'Mandatory 10% statutory reserve allocation from operational revenues for contingencies.'}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#eaedff] text-[11px] font-bold text-[#0e996b] flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">shield</span>
                <span>Risk Reserve</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm flex flex-col justify-between border border-[#eaedff]">
              <div>
                <span className="font-serif text-2xl text-[#75777e]/30 font-bold block mb-1">
                  {isBn ? '০৫' : '05'}
                </span>
                <h4 className="font-serif font-bold text-sm text-[#000514] mb-1.5">
                  {isBn ? 'গণতান্ত্রিক ভোটাধিকার' : 'Democratic Voting'}
                </h4>
                <p className="text-xs text-[#44474d] leading-relaxed">
                  {isBn
                    ? 'বড় বা ছোট যেকোনো শেয়ারহোল্ডারের বাৎসরিক সাধারণ সভায় সমান মতপ্রকাশ এবং প্রকল্প অনুমোদন ভোটাধিকার।'
                    : 'One member, one sovereign voice in annual AGMs regardless of investment tier.'}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#eaedff] text-[11px] font-bold text-[#745b00] flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">how_to_vote</span>
                <span>Democratic Vote</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Historical Milestones Timeline */}
      <section className="w-full bg-white py-16 px-6 lg:px-12 border-b border-[#eaedff]">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between">
            <div>
              <span className="text-xs text-[#745b00] uppercase tracking-widest font-bold">
                {isBn ? 'ঐতিহাসিক পরিক্রমা' : 'Historical Odyssey'}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#000514] font-bold mt-1">
                {isBn ? 'গ্রুপের ইতিহাস ও রূপান্তর মাইলফলক' : 'Key Institutional Milestones'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#44474d] max-w-md">
              {isBn
                ? '২০২০ সালের ক্ষুদ্র স্বপ্ন থেকে ২০২৫ সালে বিস্তৃত বহুমুখী কনগ্লোমারেটে রূপান্তরের অনন্য কালানুক্রমিক উপাখ্যান।'
                : 'From grassroots savings in 2020 to a diversified national conglomerate in 2025.'}
            </p>
          </div>

          <div className="relative flex flex-col gap-8 mt-6">
            <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 bg-[#eaedff] -translate-x-1/2"></div>

            {/* 2020 */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center w-full">
              <div className="w-full md:w-1/2 md:pr-12 md:text-right pl-14 md:pl-0">
                <span className="text-xs font-bold text-[#745b00]">
                  {isBn ? '২০২০ • প্রারম্ভিক সূচনা' : '2020 • Foundation'}
                </span>
                <h3 className="font-serif text-base font-bold text-[#000514] mt-1">
                  {isBn ? 'সমবায় অর্থনৈতিক ভাবনার উদ্ভব' : 'Genesis of Cooperative Capital'}
                </h3>
                <p className="text-xs text-[#44474d] mt-1.5 leading-relaxed">
                  {isBn
                    ? 'মাত্র ২৫ জন দূরদর্শী স্বপ্নদ্রষ্টা সদস্যদের ক্ষুদ্র সঞ্চয় একত্রিত করে সমষ্টিগত বিনিয়োগের আনুষ্ঠানিক খসড়া প্রণয়ন ও অনানুষ্ঠানিক যাত্রা।'
                    : '25 founding members unified initial micro-deposits into an organized, ethical investment fund.'}
                </p>
                <div className="inline-flex items-center gap-1 mt-2 px-2.5 py-1 rounded bg-[#f2f3ff] text-xs font-semibold">
                  <span className="material-symbols-outlined text-[14px] text-[#745b00]">group</span>
                  {isBn ? 'প্রাথমিক তহবিল: ৳ ১০ লক্ষ' : 'Initial Seed: ৳ 10 Lakh'}
                </div>
              </div>
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#000514] text-white flex items-center justify-center font-bold text-xs shadow-md">
                01
              </div>
              <div className="hidden md:block w-1/2 pl-12 font-serif text-3xl font-bold text-[#c5c6ce]/50">
                2020
              </div>
            </div>

            {/* 2021 */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center w-full">
              <div className="hidden md:block w-1/2 pr-12 text-right font-serif text-3xl font-bold text-[#c5c6ce]/50">
                2021
              </div>
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#745b00] text-white flex items-center justify-center font-bold text-xs shadow-md">
                02
              </div>
              <div className="w-full md:w-1/2 md:pl-12 pl-14">
                <span className="text-xs font-bold text-[#745b00]">
                  {isBn ? '২০২১ • বৈধ কাঠামোগত ভিত্তি' : '2021 • Legal Formalization'}
                </span>
                <h3 className="font-serif text-base font-bold text-[#000514] mt-1">
                  {isBn ? 'প্রাতিষ্ঠানিক আত্মপ্রকাশ ও নিবন্ধন' : 'Statutory Registration & Charter'}
                </h3>
                <p className="text-xs text-[#44474d] mt-1.5 leading-relaxed">
                  {isBn
                    ? 'আইনি কাঠামোর অধীনে সোসাইটি অ্যাক্ট ও সমবায় অধিদপ্তরের পূর্ণাঙ্গ ছাড়পত্র গ্রহণ। প্রথম কেন্দ্রীয় সচিবালয় স্থাপন এবং সদস্য সংখ্যা ১০০ অতিক্রম।'
                    : 'Secured full regulatory compliance with RJSC and cooperative bylaws, crossing 100 verified members.'}
                </p>
                <div className="inline-flex items-center gap-1 mt-2 px-2.5 py-1 rounded bg-[#f2f3ff] text-xs font-semibold">
                  <span className="material-symbols-outlined text-[14px] text-[#745b00]">verified</span>
                  {isBn ? 'সরকারি নিবন্ধন লাভ' : 'RJSC Registration Certified'}
                </div>
              </div>
            </div>

            {/* 2022 */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center w-full">
              <div className="w-full md:w-1/2 md:pr-12 md:text-right pl-14 md:pl-0">
                <span className="text-xs font-bold text-[#745b00]">
                  {isBn ? '২০২২ • টেকসই খাদ্য নিরাপত্তা' : '2022 • Commercial Agriculture'}
                </span>
                <h3 className="font-serif text-base font-bold text-[#000514] mt-1">
                  {isBn ? 'অ্যাগ্রো ও অর্গানিক ফার্মিং প্রকল্প গ্রহণ' : 'Agro-Industrial Expansion'}
                </h3>
                <p className="text-xs text-[#44474d] mt-1.5 leading-relaxed">
                  {isBn
                    ? 'ময়মনসিংহ ও রাজশাহীতে ৫০ বিঘা জমির সমন্বয়ে আধুনিক ডেইরি ও কৃষি প্রকল্প চালু। প্রথম আর্থিক বছরে সদস্যদের ১৮% নিশ্চিত লভ্যাংশ বণ্টন।'
                    : 'Acquired 50 bighas across Rajshahi and Mymensingh for organic farming and modern dairy processing, yielding 18% annual return.'}
                </p>
                <div className="inline-flex items-center gap-1 mt-2 px-2.5 py-1 rounded bg-[#f2f3ff] text-xs font-semibold">
                  <span className="material-symbols-outlined text-[14px] text-[#0e996b]">agriculture</span>
                  {isBn ? 'কৃষি প্রকল্প সম্প্রসারণ' : '50+ Bigha Agro Park'}
                </div>
              </div>
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#000514] text-white flex items-center justify-center font-bold text-xs shadow-md">
                03
              </div>
              <div className="hidden md:block w-1/2 pl-12 font-serif text-3xl font-bold text-[#c5c6ce]/50">
                2022
              </div>
            </div>

            {/* 2023 */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center w-full">
              <div className="hidden md:block w-1/2 pr-12 text-right font-serif text-3xl font-bold text-[#c5c6ce]/50">
                2023
              </div>
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#745b00] text-white flex items-center justify-center font-bold text-xs shadow-md">
                04
              </div>
              <div className="w-full md:w-1/2 md:pl-12 pl-14">
                <span className="text-xs font-bold text-[#745b00]">
                  {isBn ? '২০২৩ • আধুনিক রিটেইল বিপ্লব' : '2023 • Retail Outlets'}
                </span>
                <h3 className="font-serif text-base font-bold text-[#000514] mt-1">
                  {isBn ? 'সুপার শপ নেটওয়ার্ক ও সরবরাহ শৃঙ্খল' : 'UGG Super Shop Launch'}
                </h3>
                <p className="text-xs text-[#44474d] mt-1.5 leading-relaxed">
                  {isBn
                    ? 'ঢাকা ও রাজশাহীতে ফ্ল্যাগশিপ সুপারশপ আউটলেটের যাত্রা। ফার্ম-টু-টেবিল সরাসরি খাদ্য সরবরাহ ব্যবস্থার স্বয়ংসম্পূর্ণ নেটওয়ার্ক গঠন।'
                    : 'Inaugurated flagship grocery supermarkets in Dhaka and Rajshahi with farm-to-table supply chains.'}
                </p>
                <div className="inline-flex items-center gap-1 mt-2 px-2.5 py-1 rounded bg-[#f2f3ff] text-xs font-semibold">
                  <span className="material-symbols-outlined text-[14px] text-[#745b00]">shopping_cart</span>
                  {isBn ? 'রিটেইল চেইন প্রতিষ্ঠা' : 'Super Shop Network'}
                </div>
              </div>
            </div>

            {/* 2024-2025 */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center w-full">
              <div className="w-full md:w-1/2 md:pr-12 md:text-right pl-14 md:pl-0">
                <span className="text-xs font-bold text-[#745b00]">
                  {isBn ? '২০২৪-২০২৫ • রূপান্তর ও মেগা প্রকল্প' : '2024-2025 • Digital Ecosystem'}
                </span>
                <h3 className="font-serif text-base font-bold text-[#000514] mt-1">
                  {isBn ? 'স্মার্ট ইকোসিস্টেম ও আধুনিক এগ্রো পার্ক' : 'Cold Chain & Sovereign Web Hub'}
                </h3>
                <p className="text-xs text-[#44474d] mt-1.5 leading-relaxed">
                  {isBn
                    ? '৬৪৫+ সক্রিয় সদস্যের আস্থা নিয়ে আধুনিক কোল্ড স্টোরেজ ও সাপ্লাই চেইন প্রকল্প অনুমোদন। ক্লাউড সদস্য পোর্টাল ও অ্যাপ্লিকেশনের সমন্বিত উদ্বোধন।'
                    : '645+ active members, cold storage logistics hub, transparent digital member hub, and ৳25+ Crore aggregate balance.'}
                </p>
                <div className="inline-flex items-center gap-1 mt-2 px-3 py-1 rounded bg-[#ffe08b] text-[#735a00] text-xs font-bold">
                  <span className="material-symbols-outlined text-[15px]">trending_up</span>
                  {isBn ? 'বর্তমান পোর্টফোলিও: ৳ ২৫+ কোটি' : 'Current Portfolio: ৳ 25+ Cr'}
                </div>
              </div>
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#000514] text-[#ffe08b] flex items-center justify-center font-bold text-xs shadow-md">
                05
              </div>
              <div className="hidden md:block w-1/2 pl-12 font-serif text-3xl font-bold text-[#745b00]">
                2025
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Governance Board */}
      <section className="w-full bg-[#f2f3ff] py-16 px-6 lg:px-12 border-b border-[#eaedff]">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between">
            <div>
              <span className="text-xs text-[#745b00] uppercase tracking-widest font-bold">
                {isBn ? 'নির্বাহী পরিচালনা পর্ষদ' : 'Executive Council & Board'}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#000514] font-bold mt-1">
                {isBn ? 'পরিচালনা ও উপদেষ্টা পর্ষদ' : 'Leadership & Governance Board'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#44474d] max-w-md">
              {isBn
                ? 'অভিজ্ঞ শিল্পোদ্যোক্তা, আর্থিক বিশ্লেষক এবং আইনি পরামর্শকদের দ্বারা গঠিত উচ্চক্ষমতাসম্পন্ন গভর্ন্যান্স প্যানেল।'
                : 'Distinguished entrepreneurs, chartered financial analysts, and legal consultants stewarding institutional integrity.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Chairman: রহিদুল ইসলাম (Rohidul Islam) */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-[#eaedff]">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#000514] text-[#ffe08b] flex items-center justify-center overflow-hidden border border-[#c5c6ce] shadow-inner">
                    <span className="material-symbols-outlined text-[36px]">person</span>
                  </div>
                  <div>
                    <span className="px-2 py-0.5 rounded bg-[#fcd358]/20 text-[#745b00] text-[10px] font-bold uppercase tracking-wider">
                      {isBn ? 'চেয়ারম্যান' : 'Chairman'}
                    </span>
                    <h3 className="font-serif text-base font-bold text-[#000514] mt-1">
                      {isBn ? 'রহিদুল ইসলাম' : 'Rohidul Islam'}
                    </h3>
                    <p className="text-xs text-[#75777e]">
                      {isBn ? 'সাবেক ব্যাংকার ও সিনিয়র উদ্যোক্তা' : 'Former Banker & Senior Entrepreneur'}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-[#44474d] leading-relaxed">
                  {isBn
                    ? 'আর্থিক প্রতিষ্ঠান ও কর্পোরেট সেক্টরে দীর্ঘ ব্যবস্থাপনা অভিজ্ঞতা। সমবায় অর্থনীতির নীতি নির্ধারণ ও দীর্ঘমেয়াদী প্রাতিষ্ঠানিক রূপকল্পের প্রধান দিকনির্দেশক।'
                    : 'Over 22 years of leadership in corporate banking and cooperative finance. Spearheads institutional strategy and macro allocation.'}
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#eaedff] flex items-center justify-between text-xs text-[#75777e]">
                <span>ID: UGG-EXEC-001</span>
                <span className="text-[#000514] font-bold">{isBn ? 'পর্ষদ সভাপতি' : 'Board President'}</span>
              </div>
            </div>

            {/* Managing Director: রহিদুল ইসলাম (Rohidul Islam) */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-[#eaedff]">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#0d1e3a] text-white flex items-center justify-center overflow-hidden border border-[#c5c6ce] shadow-inner">
                    <span className="material-symbols-outlined text-[36px]">person</span>
                  </div>
                  <div>
                    <span className="px-2 py-0.5 rounded bg-[#000514] text-white text-[10px] font-bold uppercase tracking-wider">
                      {isBn ? 'ব্যবস্থাপনা পরিচালক' : 'Managing Director'}
                    </span>
                    <h3 className="font-serif text-base font-bold text-[#000514] mt-1">
                      {isBn ? 'রহিদুল ইসলাম' : 'Rohidul Islam'}
                    </h3>
                    <p className="text-xs text-[#75777e]">
                      {isBn ? 'সাপ্লাই চেইন ও শিল্পখাত বিশেষজ্ঞ' : 'Supply Chain & Industrial Operations'}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-[#44474d] leading-relaxed">
                  {isBn
                    ? 'শিল্পখাত ও আধুনিক সাপ্লাই চেইন পরিচালনায় ১৭ বছরের বর্ণাঢ্য ট্র্যাক রেকর্ড। গ্রুপের প্রবৃদ্ধি ও ফিল্ড অপারেশনের প্রধান কান্ডারি।'
                    : '17+ years overseeing large-scale commercial agribusiness and supply chains. Directs executive operations and growth initiatives.'}
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#eaedff] flex items-center justify-between text-xs text-[#75777e]">
                <span>ID: UGG-EXEC-002</span>
                <span className="text-[#000514] font-bold">{isBn ? 'নির্বাহী প্রধান' : 'Chief Executive'}</span>
              </div>
            </div>

            {/* Chief Financial Advisor: রহিদুল ইসলাম (Rohidul Islam, FCA) */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-[#eaedff]">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#eaedff] text-[#000514] flex items-center justify-center overflow-hidden border border-[#c5c6ce]">
                    <span className="material-symbols-outlined text-[36px]">person</span>
                  </div>
                  <div>
                    <span className="px-2 py-0.5 rounded bg-[#eaedff] text-[#000514] text-[10px] font-bold uppercase tracking-wider">
                      {isBn ? 'প্রধান আর্থিক উপদেষ্টা' : 'Chief Financial Advisor'}
                    </span>
                    <h3 className="font-serif text-base font-bold text-[#000514] mt-1">
                      {isBn ? 'রহিদুল ইসলাম' : 'Rohidul Islam, FCA'}
                    </h3>
                    <p className="text-xs text-[#75777e]">
                      {isBn ? 'চার্টার্ড অ্যাকাউন্ট্যান্ট (ICAB)' : 'Chartered Accountant (ICAB)'}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-[#44474d] leading-relaxed">
                  {isBn
                    ? 'কর্পোরেট অডিট, ট্যাক্সেশন এবং মূলধন ঝুঁকি বিশ্লেষণে অভিজ্ঞ। UGG-এর অভ্যন্তরীণ স্বচ্ছতা নীতিমালার তত্ত্বাবধায়ক।'
                    : 'Specialist in corporate statutory audits and risk-mitigated portfolio engineering. Ensures uncompromising treasury compliance.'}
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#eaedff] flex items-center justify-between text-xs text-[#75777e]">
                <span>ID: UGG-ADVR-003</span>
                <span className="text-[#000514] font-bold">{isBn ? 'ট্রেজারি ও অডিট' : 'Treasury & Audit'}</span>
              </div>
            </div>

            {/* Legal Consultant: ব্যারিস্টার তৌফিক এলাহী */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-[#eaedff]">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#eaedff] text-[#000514] flex items-center justify-center overflow-hidden border border-[#c5c6ce]">
                    <span className="material-symbols-outlined text-[36px]">person</span>
                  </div>
                  <div>
                    <span className="px-2 py-0.5 rounded bg-[#eaedff] text-[#000514] text-[10px] font-bold uppercase tracking-wider">
                      {isBn ? 'আইনি উপদেষ্টা' : 'Legal Counsel'}
                    </span>
                    <h3 className="font-serif text-base font-bold text-[#000514] mt-1">
                      {isBn ? 'রহিদুল ইসলাম' : 'Rohidul Islam'}
                    </h3>
                    <p className="text-xs text-[#75777e]">
                      {isBn ? 'অ্যাডভোকেট, বাংলাদেশ সুপ্রিম কোর্ট' : 'Advocate, Supreme Court of Bangladesh'}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-[#44474d] leading-relaxed">
                  {isBn
                    ? 'করপোরেট চুক্তি, সমবায় আইন ও বাণিজ্যিক বিধিবিধানের আইনি বিশেষজ্ঞ। সদস্যদের অধিকার ও চুক্তি সুরক্ষায় নিয়োজিত।'
                    : 'Expert in cooperative society law, land acquisition vetting, and commercial contracts safeguarding member equity.'}
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#eaedff] flex items-center justify-between text-xs text-[#75777e]">
                <span>ID: UGG-ADVR-004</span>
                <span className="text-[#000514] font-bold">{isBn ? 'লিগ্যাল কাউন্সেল' : 'Legal Counsel'}</span>
              </div>
            </div>

            {/* CTO: কাজী তানভীর হাসান */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-[#eaedff]">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-[#eaedff] text-[#000514] flex items-center justify-center overflow-hidden border border-[#c5c6ce]">
                    <span className="material-symbols-outlined text-[36px]">person</span>
                  </div>
                  <div>
                    <span className="px-2 py-0.5 rounded bg-[#eaedff] text-[#000514] text-[10px] font-bold uppercase tracking-wider">
                      {isBn ? 'চিফ টেকনোলজি অফিসার' : 'Chief Technology Officer'}
                    </span>
                    <h3 className="font-serif text-base font-bold text-[#000514] mt-1">
                      {isBn ? 'রহিদুল ইসলাম' : 'Rohidul Islam'}
                    </h3>
                    <p className="text-xs text-[#75777e]">
                      {isBn ? 'বিএসসি ইন সিএসই (বুয়েট)' : 'B.Sc in CSE (BUET)'}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-[#44474d] leading-relaxed">
                  {isBn
                    ? 'সদস্য পোর্টাল, অটোমেটেড সঞ্চয় লেজার ও নিরাপত্তা এনক্রিপশন সিস্টেমের প্রধান আর্কিটেক্ট ও টেকনিক্যাল লিডার।'
                    : 'Architect of UGG digital infrastructure, automated dividend engines, and member portfolio security protocols.'}
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#eaedff] flex items-center justify-between text-xs text-[#75777e]">
                <span>ID: UGG-EXEC-005</span>
                <span className="text-[#000514] font-bold">{isBn ? 'ডিজিটাল সিস্টেমস' : 'Digital Systems'}</span>
              </div>
            </div>

            {/* Ethical Governance Card */}
            <div className="bg-[#0d1e3a] text-white p-6 rounded-xl shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-[#fcd358]">gavel</span>
                  <span className="text-xs text-[#fcd358] uppercase tracking-widest font-bold">
                    {isBn ? 'সুশাসন অঙ্গীকারনামা' : 'Governance Charter'}
                  </span>
                </div>
                <h3 className="font-serif text-base font-bold text-white mb-2">
                  {isBn ? 'স্বার্থের দ্বন্দ্বহীন পরিচালনা' : 'Fiduciary Duty to Members'}
                </h3>
                <p className="text-xs text-[#b7c7eb] leading-relaxed">
                  {isBn
                    ? 'পরিচালনা পর্ষদের সকল সদস্য ব্যক্তিগত স্বার্থের ঊর্ধ্বে উঠে সদস্যদের সাধারণ স্বার্থ রক্ষা করতে আইনত দায়বদ্ধ। প্রতিটি নির্বাহী সিদ্ধান্ত সর্বসম্মত অথবা সংখ্যাগরিষ্ঠ স্বাধীন অডিট যাচাই সাপেক্ষে গৃহীত হয়।'
                    : 'All directors are bound by strict anti-conflict protocols, placing member welfare and security above individual gain.'}
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#b7c7eb]">
                <span>{isBn ? 'পর্ষদ আচরণবিধি ২০২৪-২৫' : 'Board Code of Conduct 2025'}</span>
                <span className="material-symbols-outlined text-[#ffe08b] text-[18px]">verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statutory & Regulatory Compliance Banner */}
      <section className="w-full bg-[#eaedff] py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto bg-white p-8 lg:p-10 rounded-2xl shadow-sm border border-[#dae2fd]">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#fcd358]/20 rounded-xl text-[#745b00] flex-shrink-0">
                <span className="material-symbols-outlined text-3xl">policy</span>
              </div>
              <div>
                <span className="text-xs text-[#745b00] uppercase tracking-widest font-bold">
                  {isBn ? 'আইনি ও নিয়ন্ত্রক বাধ্যবাধকতা' : 'Institutional Compliance'}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#000514] mt-1">
                  {isBn
                    ? 'আইনসম্মত ও নিয়ন্ত্রক সংস্থার অনুমোদন প্রাপ্ত'
                    : 'Fully Registered & Compliant Under Bangladesh Law'}
                </h3>
                <p className="text-xs sm:text-sm text-[#44474d] mt-1.5 max-w-2xl leading-relaxed">
                  {isBn
                    ? 'ইউনাইটি গ্রোথ গ্রুপ (UGG) গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের প্রাসঙ্গিক বিধিমালা, আরজেএসসি (RJSC) এবং সমবায় আইন সম্পূর্ণভাবে মেনে পরিচালিত হয়। সকল প্রকল্প স্বচ্ছ লাইসেন্সপ্রাপ্ত ও রেজিস্টার্ড।'
                    : 'UGG complies strictly with the Cooperative Societies Act, RJSC company registration protocols, and statutory national tax guidelines.'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
              <div className="px-4 py-2 bg-[#f2f3ff] rounded-lg flex items-center gap-2 border border-[#eaedff]">
                <span className="material-symbols-outlined text-[#745b00] text-sm">check_circle</span>
                <span className="text-xs text-[#000514] font-bold">
                  {isBn ? 'RJSC নিবন্ধিত' : 'RJSC Registered'}
                </span>
              </div>
              <div className="px-4 py-2 bg-[#f2f3ff] rounded-lg flex items-center gap-2 border border-[#eaedff]">
                <span className="material-symbols-outlined text-[#745b00] text-sm">check_circle</span>
                <span className="text-xs text-[#000514] font-bold">
                  {isBn ? 'টিন ও ভ্যাট প্রত্যয়িত' : 'TIN & VAT Certified'}
                </span>
              </div>
              <div className="px-4 py-2 bg-[#f2f3ff] rounded-lg flex items-center gap-2 border border-[#eaedff]">
                <span className="material-symbols-outlined text-[#745b00] text-sm">check_circle</span>
                <span className="text-xs text-[#000514] font-bold">
                  {isBn ? 'আইসিএবি স্বাধীন নিরীক্ষা' : 'ICAB Independent Audits'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full bg-[#0d1e3a] text-white py-16 px-6 lg:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="text-xs text-[#ffe08b] uppercase tracking-widest font-bold">
              {isBn ? 'গ্রোথের অংশীদার হোন' : 'Be Part of the Growth'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold">
              {isBn
                ? 'আপনিও হতে পারেন ইউনাইটি গ্রোথ গ্রুপের গর্বিত অংশীদার'
                : 'Join Unity Growth Group as an Accredited Member'}
            </h2>
            <p className="text-xs sm:text-sm text-[#b7c7eb] leading-relaxed">
              {isBn
                ? 'আপনার সঞ্চয়কে রূপান্তর করুন একটি স্থায়ী যৌথ শক্তিতে। নিরাপদ, হালাল ও সমৃদ্ধ অর্থনীতির অংশীদার হতে আজই সদস্যপদ আবেদন করুন।'
                : 'Transform individual savings into permanent cooperative equity. Secure your financial future in verified real assets.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => onNavigate('apply-for-membership')}
              className="w-full sm:w-auto px-6 py-3 bg-[#745b00] hover:bg-[#fcd358] hover:text-[#735a00] text-white rounded text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              {isBn ? 'সদস্য পদের আবেদন করুন' : 'Apply for Membership'}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('members')}
              className="w-full sm:w-auto px-6 py-3 bg-[#000514] hover:bg-white/10 text-white rounded text-xs font-bold transition-all border border-white/10 cursor-pointer"
            >
              {isBn ? 'সদস্য ডিরেক্টরি দেখুন' : 'View Member Directory'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
