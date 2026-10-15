import React, { useState } from 'react';
import { PageRoute, Language, Member } from '../types';
import { membersData, BOARDROOM_MEETING_IMAGE } from '../data/mockData';
import { MemberWizard } from '../components/MemberWizard';

interface MembersPageProps {
  onNavigate: (route: PageRoute) => void;
  language: Language;
}

export const MembersPage: React.FC<MembersPageProps> = ({ onNavigate, language }) => {
  const isBn = language === 'bn';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [activeProfile, setActiveProfile] = useState<Member | null>(null);

  const filteredMembers = membersData.filter((member) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      member.nameBn.toLowerCase().includes(query) ||
      member.nameEn.toLowerCase().includes(query) ||
      member.id.toLowerCase().includes(query) ||
      member.roleBn.toLowerCase().includes(query) ||
      member.roleEn.toLowerCase().includes(query);

    const matchesCategory =
      selectedCategory === 'all' || member.category === selectedCategory;

    const matchesSector =
      selectedSector === 'all' || member.sector === selectedSector;

    return matchesSearch && matchesCategory && matchesSector;
  });

  const categories = [
    { key: 'all', labelBn: 'সবাই (৪৫০+)', labelEn: 'All (450+)' },
    { key: 'founder', labelBn: 'প্রতিষ্ঠাতা সদস্য (২১)', labelEn: 'Founders (21)' },
    { key: 'life', labelBn: 'আজীবন সদস্য (৮৫)', labelEn: 'Life Members (85)' },
    { key: 'general', labelBn: 'সাধারণ সদস্য (৩৩২)', labelEn: 'General Members (332)' },
    { key: 'advisor', labelBn: 'উপদেষ্টা পরিষদ (১২)', labelEn: 'Advisors (12)' },
  ];

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedSector('all');
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Sovereign Strip & Header Section */}
      <section className="relative w-full bg-[#f2f3ff] py-12 px-6 lg:px-12 overflow-hidden border-b border-[#eaedff]">
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-6">
          {/* Breadcrumb & Tag */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#44474d]">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="hover:text-[#000514] transition-colors cursor-pointer"
              >
                {isBn ? 'নীড়পাতা' : 'Home'}
              </button>
              <span className="material-symbols-outlined text-[14px] text-[#c5c6ce]">chevron_right</span>
              <span className="text-[#000514] font-bold">
                {isBn ? 'সদস্য ডিরেক্টরি ও নিবন্ধন' : 'Member Directory & Registration'}
              </span>
            </div>

            <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full text-[#745b00] text-xs font-semibold shadow-sm border border-[#eaedff]">
              <span className="w-2 h-2 rounded-full bg-[#745b00] animate-pulse"></span>
              <span>{isBn ? 'প্রাতিষ্ঠানিক গভর্ন্যান্স ভেরিফায়েড ডিরেক্টরি' : 'Fiduciary Verified Registry'}</span>
            </div>
          </div>

          {/* Main Headline Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <h1 className="font-serif text-3xl sm:text-4xl text-[#000514] font-bold tracking-tight">
                {isBn ? 'ইউজিজি সম্মানিত সদস্য ডিরেক্টরি' : 'Distinguished Members & Stakeholders Directory'}
              </h1>
              <p className="text-sm text-[#44474d] leading-relaxed max-w-xl font-light">
                {isBn
                  ? 'ইউনাইটি গ্রোথ গ্রুপ (UGG)-এর ৪৫০+ সক্রিয় উদ্যোক্তা, বিনিয়োগকারী ও পেশাজীবীদের নির্ভরযোগ্য নেতৃত্ব পরিষদ। একতাবদ্ধ শক্তিতে আমরা উন্মোচন করছি টেকসই অর্থনৈতিক সমবায় মডেল।'
                  : 'Empowering 450+ verified cooperative entrepreneurs, investors, and accredited professionals steering sustainable wealth through unified fiduciary leadership.'}
              </p>

              {/* Core Metas */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3.5 bg-white rounded-xl shadow-sm border border-[#eaedff] flex flex-col">
                  <span className="font-serif text-2xl font-bold text-[#000514]">
                    {isBn ? '৪৫০+' : '450+'}
                  </span>
                  <span className="text-[11px] text-[#75777e] mt-0.5">
                    {isBn ? 'নিবন্ধিত সদস্য' : 'Verified Members'}
                  </span>
                </div>
                <div className="p-3.5 bg-white rounded-xl shadow-sm border border-[#eaedff] flex flex-col">
                  <span className="font-serif text-2xl font-bold text-[#745b00]">
                    {isBn ? '৯৮.৪%' : '98.4%'}
                  </span>
                  <span className="text-[11px] text-[#75777e] mt-0.5">
                    {isBn ? 'ভেরিফায়েড স্ট্যাটাস' : 'Good Standing'}
                  </span>
                </div>
                <div className="p-3.5 bg-white rounded-xl shadow-sm border border-[#eaedff] flex flex-col">
                  <span className="font-serif text-2xl font-bold text-[#000514]">
                    {isBn ? '৳১২.৮ কোটি' : '৳ 12.8 Cr'}
                  </span>
                  <span className="text-[11px] text-[#75777e] mt-0.5">
                    {isBn ? 'সমবায় ইকুইটি' : 'Member Equity'}
                  </span>
                </div>
                <div className="p-3.5 bg-white rounded-xl shadow-sm border border-[#eaedff] flex flex-col">
                  <span className="font-serif text-2xl font-bold text-[#0e996b]">
                    {isBn ? '৮ টি' : '8 Units'}
                  </span>
                  <span className="text-[11px] text-[#75777e] mt-0.5">
                    {isBn ? 'সক্রিয় প্রকল্প' : 'Active Projects'}
                  </span>
                </div>
              </div>
            </div>

            {/* Boardroom Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[16/11] border border-[#eaedff]">
                <img
                  src={BOARDROOM_MEETING_IMAGE}
                  alt="Annual Executive Conference"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000514]/85 via-transparent to-transparent flex flex-col justify-end p-5">
                  <div className="flex items-center gap-1.5 text-[#ffe08b] mb-1 text-xs uppercase tracking-wider font-bold">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    {isBn ? 'বার্ষিক নির্বাহী সম্মেলন' : 'Annual General Assembly'}
                  </div>
                  <p className="font-serif text-base text-white font-bold">
                    {isBn ? 'উদ্ভাবন ও টেকসই প্রবৃদ্ধির সংহতি' : 'Sovereign Integrity & Shared Capital'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Shield Banner */}
      <section className="w-full bg-[#0d1e3a] text-white py-3 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs">
          <div className="flex items-center gap-2 text-[#b7c7eb]">
            <span className="material-symbols-outlined text-[#ffe08b] text-[20px]">shield</span>
            <span>
              <strong className="text-white">
                {isBn ? 'প্রাইভেসি গার্ড সক্রিয়: ' : 'Privacy Guard Active: '}
              </strong>
              {isBn
                ? 'সদস্যদের ব্যক্তিগত তথ্য সম্পূর্ণ এনক্রিপ্টেড ও সুরক্ষিত।'
                : 'Sensitive member credentials, phone numbers, and bank records are encrypted.'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('register-flow');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1 text-xs text-[#ffe08b] hover:underline whitespace-nowrap font-bold cursor-pointer"
          >
            <span>{isBn ? 'সদস্যপদ নিয়মাবলী দেখুন' : 'View Membership Criteria'}</span>
            <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
          </button>
        </div>
      </section>

      {/* Search & Filter Terminal */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-4 w-full">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#75777e] text-[20px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isBn ? 'নাম, মেম্বার আইডি (e.g. UGG-M-1042) বা পেশা...' : 'Search by name, ID (e.g. UGG-M-1042), role...'}
                className="w-full pl-10 pr-4 py-2.5 bg-[#f2f3ff] rounded-xl text-xs text-[#131b2e] placeholder:text-[#75777e] focus:outline-none focus:bg-[#eaedff]"
              />
            </div>

            {/* Category Dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#f2f3ff] rounded-xl text-xs text-[#131b2e] focus:outline-none cursor-pointer"
              >
                <option value="all">{isBn ? 'সকল সদস্য ক্যাটাগরি' : 'All Member Categories'}</option>
                <option value="founder">{isBn ? 'প্রতিষ্ঠাতা সদস্য (Founder)' : 'Founder Members'}</option>
                <option value="life">{isBn ? 'আজীবন সদস্য (Life)' : 'Life Members'}</option>
                <option value="general">{isBn ? 'সাধারণ সদস্য (General)' : 'General Members'}</option>
                <option value="advisor">{isBn ? 'উপদেষ্টা পরিষদ (Advisory)' : 'Advisory Council'}</option>
              </select>
            </div>

            {/* Sector Dropdown */}
            <div className="md:col-span-2">
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#f2f3ff] rounded-xl text-xs text-[#131b2e] focus:outline-none cursor-pointer"
              >
                <option value="all">{isBn ? 'পেশাগত খাত (All Sectors)' : 'All Professional Sectors'}</option>
                <option value="tech">{isBn ? 'তথ্যপ্রযুক্তি ও সফটওয়্যার' : 'IT & Tech'}</option>
                <option value="retail">{isBn ? 'সুপারশপ ও রিটেইল' : 'Retail & FMCG'}</option>
                <option value="agro">{isBn ? 'কৃষি ও খাদ্য' : 'Agribusiness'}</option>
                <option value="finance">{isBn ? 'ব্যাংকিং ও ফাইন্যান্স' : 'Banking & Finance'}</option>
              </select>
            </div>

            {/* Reset Button */}
            <div className="md:col-span-2 flex items-center">
              <button
                type="button"
                onClick={handleReset}
                className="w-full py-2.5 px-4 bg-[#eaedff] hover:bg-[#dae2fd] text-[#000514] text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">filter_alt_off</span>
                <span>{isBn ? 'রিসেট' : 'Reset'}</span>
              </button>
            </div>
          </div>

          {/* Quick Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1 text-xs">
            <span className="text-[#75777e] whitespace-nowrap uppercase tracking-wider font-bold mr-1">
              {isBn ? 'ফিল্টার:' : 'Filter:'}
            </span>
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.key
                    ? 'bg-[#000514] text-white shadow-sm'
                    : 'bg-[#f2f3ff] text-[#44474d] hover:bg-[#eaedff]'
                }`}
              >
                {isBn ? cat.labelBn : cat.labelEn}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Members Cards Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-6 w-full">
        {filteredMembers.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl p-8 border border-[#eaedff]">
            <span className="material-symbols-outlined text-[#75777e] text-[48px] mb-2">
              person_search
            </span>
            <h4 className="font-serif text-lg text-[#000514] font-bold">
              {isBn ? 'কোন সদস্যের প্রোফাইল পাওয়া যায়নি' : 'No Member Profiles Found'}
            </h4>
            <p className="text-xs text-[#75777e] max-w-md mx-auto mt-1">
              {isBn
                ? 'অনুগ্রহ করে সঠিক নাম, মেম্বার আইডি অথবা পেশাগত ফিল্টার পুনরায় চেক করে অনুসন্ধান করুন।'
                : 'Try adjusting your search criteria, name, or category filters.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="member-card bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group border border-[#eaedff]"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-[#eaedff] shadow-inner border border-[#eaedff]">
                        <img
                          src={member.imageUrl}
                          alt={member.nameEn}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {member.verified && (
                        <span
                          className="material-symbols-outlined absolute bottom-0 right-0 bg-white text-[#745b00] text-[18px] rounded-full p-0.5 shadow-sm"
                          title={isBn ? 'ভেরিফায়েড সদস্য' : 'Verified Member'}
                        >
                          verified
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="px-2.5 py-0.5 rounded bg-[#ffe08b] text-[#735a00] text-[10px] font-bold">
                        {isBn ? member.categoryLabelBn : member.categoryLabelEn}
                      </span>
                      <span className="text-[11px] text-[#75777e] mt-1 tracking-wide font-mono">
                        ID: {member.id}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <h3 className="font-serif text-base font-bold text-[#000514] group-hover:text-[#745b00] transition-colors">
                      {isBn ? member.nameBn : member.nameEn}
                    </h3>
                    <span className="text-xs text-[#75777e]">{isBn ? member.nameEn : member.nameBn}</span>
                    <p className="text-xs text-[#131b2e] mt-2 font-semibold">
                      {isBn ? member.roleBn : member.roleEn}
                    </p>
                    <p className="text-[11px] text-[#75777e] mt-0.5">{member.sectorBn}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 my-3">
                    {member.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-[#f2f3ff] text-[#131b2e] text-[10px] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#f2f3ff] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[#0e996b] text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-[#0e996b]"></span>
                    <span>{isBn ? 'নিয়মিত বিনিয়োগকারী' : 'Active Investor'}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveProfile(member)}
                    className="px-3 py-1 rounded bg-[#eaedff] hover:bg-[#000514] hover:text-white text-[#000514] text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isBn ? 'প্রোফাইল' : 'View Profile'}</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Interactive 7-Step Membership Application Workflow */}
      <section className="w-full bg-[#f2f3ff] py-16 my-8 border-y border-[#eaedff]" id="register-flow">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-1 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-[#745b00] text-xs font-bold uppercase tracking-widest">
                <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
                {isBn ? 'মেম্বারশিপ আবেদন পোর্টাল' : 'Membership Application Portal'}
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#000514] font-bold">
                {isBn ? 'ইউনাইটি গ্রোথ গ্রুপ (UGG)-এর নতুন সদস্যপদ আবেদন' : 'Apply for Official UGG Membership'}
              </h2>
              <p className="text-xs sm:text-sm text-[#44474d] leading-relaxed">
                {isBn
                  ? '৭-ধাপের সুরক্ষিত প্রক্রিয়ায় সরাসরি সদস্যপদে আবেদন করুন। প্রাতিষ্ঠানিক নীতি অনুসারে প্রতিটি আবেদন স্ক্রিনিং ও যাচাই বাছাইয়ের মাধ্যমে নিশ্চিত করা হয়।'
                  : 'Submit your formal enrollment via our 7-step verified protocol. Vetted under cooperative regulatory bylaws.'}
              </p>
            </div>

            <div className="bg-white p-3.5 rounded-xl shadow-sm border border-[#eaedff] flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#000514]">
                <span className="material-symbols-outlined text-[22px]">verified_user</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#75777e] uppercase font-bold">
                  {isBn ? 'নিরাপদ ভেরিফিকেশন' : 'Secure Verification'}
                </span>
                <span className="font-serif text-sm text-[#000514] font-bold">
                  {isBn ? '১০০% স্বচ্ছ ও আইনসম্মত' : '100% Statutory Compliant'}
                </span>
              </div>
            </div>
          </div>

          {/* Render 7-Step Wizard */}
          <MemberWizard language={language} />
        </div>
      </section>

      {/* Member Profile Drawer Modal */}
      {activeProfile && (
        <div className="fixed inset-0 z-50 bg-[#000514]/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-[#eaedff]">
            {/* Modal Header */}
            <div className="p-6 bg-[#000514] text-white flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#eaedff] flex items-center justify-center overflow-hidden border border-[#ffe08b]">
                  <img
                    src={activeProfile.imageUrl}
                    alt={activeProfile.nameEn}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-lg font-bold text-white">
                      {isBn ? activeProfile.nameBn : activeProfile.nameEn}
                    </h3>
                    <span className="material-symbols-outlined text-[#ffe08b] text-[18px]">verified</span>
                  </div>
                  <p className="text-xs text-[#ffe08b] font-semibold">
                    {isBn ? activeProfile.nameEn : activeProfile.nameBn}
                  </p>
                  <p className="text-[11px] text-[#b7c7eb] font-mono">
                    ID: {activeProfile.id} • {isBn ? activeProfile.categoryLabelBn : activeProfile.categoryLabelEn}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveProfile(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 overflow-y-auto space-y-5">
              <div>
                <span className="text-[11px] text-[#75777e] uppercase tracking-wider font-bold">
                  {isBn ? 'বর্তমান পদবী ও প্রাতিষ্ঠানিক দায়িত্ব' : 'Designation & Professional Scope'}
                </span>
                <p className="text-sm text-[#000514] font-bold mt-0.5">
                  {isBn ? activeProfile.roleBn : activeProfile.roleEn}
                </p>
                <p className="text-xs text-[#75777e]">{activeProfile.sectorBn}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 bg-[#f2f3ff] rounded-xl border border-[#eaedff]">
                <div>
                  <span className="text-[11px] text-[#75777e]">
                    {isBn ? 'অন্তর্ভুক্তি সন' : 'Joined Year'}
                  </span>
                  <p className="font-serif text-base text-[#000514] font-bold mt-0.5">
                    {activeProfile.joinedYear}
                  </p>
                </div>
                <div>
                  <span className="text-[11px] text-[#75777e]">
                    {isBn ? 'সদস্য স্ট্যাটাস' : 'Standing'}
                  </span>
                  <p className="font-serif text-base text-[#0e996b] font-bold mt-0.5">
                    {activeProfile.status}
                  </p>
                </div>
              </div>

              <div>
                <span className="text-[11px] text-[#75777e] uppercase tracking-wider font-bold">
                  {isBn ? 'ইউজিজি সম্পৃক্ত প্রকল্প ও কমিটি' : 'Associated Projects & Governance Tasks'}
                </span>
                <p className="text-xs text-[#131b2e] mt-1 leading-relaxed bg-[#faf8ff] p-3.5 rounded-lg border border-[#eaedff]">
                  {activeProfile.projectsBn}
                </p>
              </div>

              <div>
                <span className="text-[11px] text-[#75777e] uppercase tracking-wider font-bold">
                  {isBn ? 'পেশাগত অভিজ্ঞতা ও সংক্ষিপ্ত পরিচয়' : 'Executive Bio & Experience'}
                </span>
                <p className="text-xs text-[#44474d] mt-1 leading-relaxed">
                  {activeProfile.bioBn}
                </p>
              </div>

              <div className="p-3 bg-[#eaedff] rounded-lg flex items-center gap-2 text-[11px] text-[#000514]">
                <span className="material-symbols-outlined text-[16px] text-[#745b00]">verified_user</span>
                <span>
                  {isBn
                    ? 'প্রাইভেসি নীতিমালা অনুযায়ী এই সদস্যের ব্যক্তিগত ফোন নম্বর ও ঠিকানা সংরক্ষিত রাখা হয়েছে।'
                    : 'In compliance with privacy policies, personal contact numbers and private residential data are protected.'}
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#f2f3ff] border-t border-[#eaedff] flex justify-end">
              <button
                type="button"
                onClick={() => setActiveProfile(null)}
                className="px-5 py-2 rounded-lg bg-[#000514] text-white text-xs font-bold hover:bg-[#0d1e3a] cursor-pointer"
              >
                {isBn ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
