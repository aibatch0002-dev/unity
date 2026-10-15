import React, { useState } from 'react';
import { PageRoute, Language } from '../types';
import { toBanglaNumber, UGG_LOGO_URL } from '../data/mockData';

interface MemberHubPageProps {
  onNavigate: (route: PageRoute) => void;
  language: Language;
}

export const MemberHubPage: React.FC<MemberHubPageProps> = ({
  onNavigate: _onNavigate,
  language,
}) => {
  const isBn = language === 'bn';
  const [activeTab, setActiveTab] = useState<'overview' | 'slips' | 'certificate' | 'notices'>('overview');
  const [showSlipModal, setShowSlipModal] = useState(false);
  const [slipSuccessMessage, setSlipSuccessMessage] = useState<string | null>(null);

  // Demo user data
  const member = {
    nameBn: 'ইঞ্জি: তানভীর আহমেদ',
    nameEn: 'Engr. Tanvir Ahmed',
    code: 'UGG-M-1048',
    categoryBn: 'আজীবন সদস্য',
    categoryEn: 'Life Member',
    tierBn: 'টায়ার-১ এলিট ইনভেস্টর',
    tierEn: 'Tier-1 Elite Investor',
    joinedDateBn: '১৫ জুলাই ২০২১',
    joinedDateEn: '15 July 2021',
    shareCount: 125,
    shareValue: 1250000, // ৳12,50,000
    accumulatedDividend: 231250, // ৳2,31,250
    walletBalance: 58400, // ৳58,400
    email: 't.ahmed@investor.ugg.com',
    phone: '+880 1712-889900',
    nid: '5543209871124',
  };

  const [slips, setSlips] = useState([
    {
      id: 'TRX-98214',
      dateBn: '০৫ জানুয়ারি ২০২৫',
      dateEn: '05 Jan 2025',
      bankBn: 'ইসলামী ব্যাংক বাংলাদেশ পিএলসি (উত্তরা শাখা)',
      bankEn: 'Islami Bank Bangladesh PLC (Uttara Branch)',
      amountBn: '৳১,০০,০০০',
      amountEn: '৳100,000',
      typeBn: 'অতিরিক্ত ১০টি শেয়ার ক্রয়',
      typeEn: 'Purchase of 10 Additional Shares',
      statusBn: 'অনুমোদিত',
      statusEn: 'Audited & Approved',
      statusColor: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30',
    },
    {
      id: 'TRX-87612',
      dateBn: '১২ অক্টোবর ২০২৪',
      dateEn: '12 Oct 2024',
      bankBn: 'ব্র্যাক ব্যাংক পিএলসি (গুলশান শাখা)',
      bankEn: 'BRAC Bank PLC (Gulshan Branch)',
      amountBn: '৳৫,০০,০০০',
      amountEn: '৳500,000',
      typeBn: '৫০টি মূল শেয়ার বরাদ্দ',
      typeEn: 'Primary Allotment (50 Shares)',
      statusBn: 'অনুমোদিত',
      statusEn: 'Audited & Approved',
      statusColor: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30',
    },
    {
      id: 'TRX-74190',
      dateBn: '২৮ জানুয়ারি ২০২৫',
      dateEn: '28 Jan 2025',
      bankBn: 'ঢাকা ব্যাংক লিমিটেড (বনানী শাখা)',
      bankEn: 'Dhaka Bank Ltd (Banani Branch)',
      amountBn: '৳৫২,০০০',
      amountEn: '৳52,000',
      typeBn: 'সুপারশপ ইনভেস্টমেন্ট পুল',
      typeEn: 'Super Shop Pool Injection',
      statusBn: 'যাচাইাধীন (Pending)',
      statusEn: 'Under Review',
      statusColor: 'text-amber-400 bg-amber-950/40 border-amber-500/30',
    },
  ]);

  const [newSlip, setNewSlip] = useState({
    bank: 'Islami Bank Bangladesh PLC',
    branch: '',
    amount: '',
    trxId: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSlipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rawTrx = `TRX-${Math.floor(10000 + Math.random() * 90000)}`;
    const newEntry = {
      id: rawTrx,
      dateBn: 'আজকে',
      dateEn: 'Today',
      bankBn: newSlip.bank,
      bankEn: newSlip.bank,
      amountBn: `৳${toBanglaNumber(newSlip.amount)}`,
      amountEn: `৳${newSlip.amount}`,
      typeBn: 'শেয়ার মূলধন জমা',
      typeEn: 'Share Capital Deposit',
      statusBn: 'যাচাইাধীন (Pending)',
      statusEn: 'Under Audit Review',
      statusColor: 'text-amber-400 bg-amber-950/40 border-amber-500/30',
    };
    setSlips([newEntry, ...slips]);
    setShowSlipModal(false);
    setSlipSuccessMessage(
      isBn
        ? 'ব্যাংক ডিপোজিট স্লিপ ও ট্রানজেকশন সফলভাবে জমা হয়েছে। অডিট টিম ৪৮ ঘণ্টার মধ্যে যাচাই করবে।'
        : 'Deposit slip recorded successfully. Audit desk will verify within 48 hours.'
    );
    setTimeout(() => setSlipSuccessMessage(null), 6000);
  };

  return (
    <div className="min-h-screen bg-[#000514] text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-900 pb-20">
      {/* Top Banner with Member ID & Welcome */}
      <div className="border-b border-amber-500/20 bg-gradient-to-b from-[#030d22] via-[#020917] to-[#000514] pt-8 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <span className="material-symbols-outlined text-sm">badge</span>
              <span>UGG-MEMBER-SECURE-VAULT</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-300">{member.code}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-mono text-emerald-400">
                {isBn ? 'সেশন নিরাপদ ও এনক্রিপ্টেড' : 'Encrypted Session Active'}
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#040e24] border border-amber-500/30 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-bl-full pointer-events-none"></div>

            <div className="flex items-center gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-xl">
                <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center text-amber-400">
                  <span className="material-symbols-outlined text-3xl sm:text-4xl">person</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-xl sm:text-2xl font-serif font-bold text-white">
                    {isBn ? member.nameBn : member.nameEn}
                  </h1>
                  <span className="px-2 py-0.5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono rounded">
                    {isBn ? 'সদস্যপদ সক্রিয়' : 'Good Standing'}
                  </span>
                </div>
                <p className="text-xs text-amber-400/90 font-mono">
                  {member.code} • {isBn ? member.categoryBn : member.categoryEn} • {isBn ? member.tierBn : member.tierEn}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {isBn ? `যোগদানের তারিখ: ${member.joinedDateBn}` : `Member Since: ${member.joinedDateEn}`}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowSlipModal(true)}
                className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">receipt_long</span>
                {isBn ? 'ব্যাংক স্লিপ আপলোড' : 'Upload Deposit Slip'}
              </button>
              <button
                onClick={() => setActiveTab('certificate')}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">workspace_premium</span>
                {isBn ? 'শেয়ার সনদ' : 'Share Certificate'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Success Alert if present */}
        {slipSuccessMessage && (
          <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-3 animate-fadeIn">
            <span className="material-symbols-outlined text-emerald-400 text-lg">check_circle</span>
            <span>{slipSuccessMessage}</span>
          </div>
        )}

        {/* 4 Primary Financial Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-[#040e24] border border-amber-500/20 rounded-xl p-5">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
              {isBn ? 'বিনিয়োগিত মোট মূলধন' : 'Total Share Capital'}
            </div>
            <div className="text-2xl font-bold font-serif text-amber-300">
              ৳{isBn ? toBanglaNumber(member.shareValue.toLocaleString()) : member.shareValue.toLocaleString()}
            </div>
            <div className="text-xs text-slate-400 mt-2 font-mono">
              {isBn ? toBanglaNumber(member.shareCount) : member.shareCount} {isBn ? 'টি অনুমোদিত শেয়ার' : 'Active Shares'}
            </div>
          </div>

          <div className="bg-[#040e24] border border-amber-500/20 rounded-xl p-5">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
              {isBn ? 'অর্জিত সর্বমোট লভ্যাংশ' : 'Accumulated Dividend'}
            </div>
            <div className="text-2xl font-bold font-serif text-emerald-400">
              ৳{isBn ? toBanglaNumber(member.accumulatedDividend.toLocaleString()) : member.accumulatedDividend.toLocaleString()}
            </div>
            <div className="text-xs text-slate-400 mt-2 font-mono">
              {isBn ? 'গড় বার্ষিক আয়: ১৮.৫%' : 'Avg Annual Yield: 18.5%'}
            </div>
          </div>

          <div className="bg-[#040e24] border border-amber-500/20 rounded-xl p-5">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
              {isBn ? 'ওয়ালেট / উত্তোলনযোগ্য লভ্যাংশ' : 'Withdrawable Dividend'}
            </div>
            <div className="text-2xl font-bold font-serif text-white">
              ৳{isBn ? toBanglaNumber(member.walletBalance.toLocaleString()) : member.walletBalance.toLocaleString()}
            </div>
            <div className="text-xs text-slate-400 mt-2 font-mono">
              {isBn ? 'সর্বশেষ কিস্তি: Q4 2024' : 'Last credited: Q4 2024'}
            </div>
          </div>

          <div className="bg-[#040e24] border border-amber-500/20 rounded-xl p-5">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
              {isBn ? 'ভোটের অধিকার ও মর্যাদা' : 'AGM Voting Weight'}
            </div>
            <div className="text-2xl font-bold font-serif text-amber-400">
              {isBn ? '১০০% সক্রিয়' : '100% Active'}
            </div>
            <div className="text-xs text-slate-400 mt-2 font-mono">
              {isBn ? '১২৫টি ভোটিং ব্যালট' : '125 AGM Ballots'}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-3 text-xs font-semibold rounded-t-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'bg-amber-400/10 border-b-2 border-amber-400 text-amber-300 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">dashboard</span>
            {isBn ? 'পোর্টফোলিও ও লভ্যাংশ খতিয়ান' : 'Portfolio & Returns'}
          </button>
          <button
            onClick={() => setActiveTab('slips')}
            className={`px-5 py-3 text-xs font-semibold rounded-t-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'slips'
                ? 'bg-amber-400/10 border-b-2 border-amber-400 text-amber-300 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">receipt_long</span>
            {isBn ? 'ব্যাংক স্লিপ ও ডিপোজিট হিস্ট্রি' : 'Bank Deposit Slips'}
          </button>
          <button
            onClick={() => setActiveTab('certificate')}
            className={`px-5 py-3 text-xs font-semibold rounded-t-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'certificate'
                ? 'bg-amber-400/10 border-b-2 border-amber-400 text-amber-300 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">workspace_premium</span>
            {isBn ? 'শেয়ার সার্টিফিকেট ও সনদ' : 'Share Certificate'}
          </button>
          <button
            onClick={() => setActiveTab('notices')}
            className={`px-5 py-3 text-xs font-semibold rounded-t-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'notices'
                ? 'bg-amber-400/10 border-b-2 border-amber-400 text-amber-300 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">notifications</span>
            {isBn ? 'সদস্য নোটিশ বোর্ড ও ভোটিং' : 'Notices & Voting'}
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-[#040e24] border border-amber-500/20 rounded-xl p-6">
              <h3 className="text-lg font-serif font-bold text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400">query_stats</span>
                {isBn ? 'প্রকল্পভিত্তিক বিনিয়োগ ও লভ্যাংশ অর্জনের বিবরণ' : 'Project Capital Deployment & Yield Breakdown'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#020714] p-4 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 font-mono">
                    {isBn ? 'প্রকল্প: ইউজিজি গ্রিন এগ্রো পার্ক' : 'Project: UGG Green Agro Park'}
                  </div>
                  <div className="text-lg font-bold text-amber-300 mt-1">
                    {isBn ? '৳৫,০০,০০০ (৫০ শেয়ার)' : '৳500,000 (50 Shares)'}
                  </div>
                  <div className="text-xs text-emerald-400 mt-2">
                    {isBn ? 'অর্জিত লভ্যাংশ: ৳৯২,৫০০' : 'Yield to date: ৳92,500'}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {isBn ? 'স্ট্যাটাস: উৎপাদনে ও নিয়মিত লভ্যাংশ প্রদান' : 'Status: Commercial Yield Active'}
                  </div>
                </div>

                <div className="bg-[#020714] p-4 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 font-mono">
                    {isBn ? 'প্রকল্প: ইউজিজি ফ্রেশ মার্ট রিটেইল' : 'Project: UGG Fresh Mart Retail'}
                  </div>
                  <div className="text-lg font-bold text-amber-300 mt-1">
                    {isBn ? '৳৫,০০,০০০ (৫০ শেয়ার)' : '৳500,000 (50 Shares)'}
                  </div>
                  <div className="text-xs text-emerald-400 mt-2">
                    {isBn ? 'অর্জিত লভ্যাংশ: ৳৯৮,৭৫০' : 'Yield to date: ৳98,750'}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {isBn ? 'স্ট্যাটাস: ৫টি ফ্ল্যাগশিপ স্টোরে সফল কার্যক্রম' : 'Status: 5 Operating Outlets'}
                  </div>
                </div>

                <div className="bg-[#020714] p-4 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 font-mono">
                    {isBn ? 'প্রকল্প: ইউজিজি এন্টারপ্রাইজ টেক পার্ক' : 'Project: UGG Enterprise Tech Park'}
                  </div>
                  <div className="text-lg font-bold text-amber-300 mt-1">
                    {isBn ? '৳২,৫০,০০০ (২৫ শেয়ার)' : '৳250,000 (25 Shares)'}
                  </div>
                  <div className="text-xs text-emerald-400 mt-2">
                    {isBn ? 'অর্জিত লভ্যাংশ: ৳৪০,০০০' : 'Yield to date: ৳40,000'}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {isBn ? 'স্ট্যাটাস: প্রথম পর্যায় সম্পূর্ণ' : 'Status: Phase-1 Delivered'}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#040e24] border border-amber-500/20 rounded-xl p-5 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white text-sm">
                    {isBn ? 'লভ্যাংশ ব্যাংক অ্যাকাউন্টে উত্তোলন' : 'Withdraw Dividend to Bank'}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {isBn ? 'ওয়ালেট ব্যালেন্স: ৳৫৮,৪০০ | বিইএফটিএন ট্রান্সফার' : 'Available: ৳58,400 via BEFTN'}
                  </p>
                </div>
                <button
                  onClick={() => alert(isBn ? 'আপনার ব্যাংক অ্যাকাউন্টে ৳৫৮,৪০০ উত্তোলনের আবেদন গৃহীত হয়েছে।' : 'Withdrawal request of ৳58,400 submitted to treasury.')}
                  className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded uppercase tracking-wider cursor-pointer"
                >
                  {isBn ? 'উত্তোলন' : 'Withdraw'}
                </button>
              </div>

              <div className="bg-[#040e24] border border-amber-500/20 rounded-xl p-5 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white text-sm">
                    {isBn ? 'আরও শেয়ার ক্রয় করুন' : 'Purchase Additional Shares'}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {isBn ? 'টায়ার-১ মূলধন বৃদ্ধি ও বর্ধিত বার্ষিক রিটার্ন' : 'Expand your equity stake in sovereign projects'}
                  </p>
                </div>
                <button
                  onClick={() => setShowSlipModal(true)}
                  className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded uppercase tracking-wider cursor-pointer"
                >
                  {isBn ? 'শেয়ার কিনুন' : 'Add Shares'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Slips */}
        {activeTab === 'slips' && (
          <div className="bg-[#040e24] border border-amber-500/20 rounded-xl overflow-hidden p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-400">account_balance_wallet</span>
                  {isBn ? 'ব্যাংক ডিপোজিট স্লিপ ও লেনদেন তালিকা' : 'Deposit Slip Records & Transaction Verifications'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {isBn ? 'ব্যাংক মারফত জমাকৃত অর্থ ও অডিট যাচাইকরণ হিস্ট্রি' : 'Bank deposits reconciled by sovereign accounting desk'}
                </p>
              </div>
              <button
                onClick={() => setShowSlipModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-bold rounded uppercase cursor-pointer"
              >
                {isBn ? '+ নতুন স্লিপ যুক্ত করুন' : '+ Submit New Slip'}
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#020714] font-mono uppercase text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">{isBn ? 'ট্রানজেকশন আইডি' : 'TRX ID'}</th>
                    <th className="px-4 py-3">{isBn ? 'তারিখ' : 'Date'}</th>
                    <th className="px-4 py-3">{isBn ? 'ব্যাংক বিবরণ' : 'Bank Details'}</th>
                    <th className="px-4 py-3">{isBn ? 'উদ্দেশ্য' : 'Purpose'}</th>
                    <th className="px-4 py-3">{isBn ? 'পরিমাণ' : 'Amount'}</th>
                    <th className="px-4 py-3 text-right">{isBn ? 'স্ট্যাটাস' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {slips.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-900/40">
                      <td className="px-4 py-3 font-mono font-bold text-amber-300">{item.id}</td>
                      <td className="px-4 py-3 font-mono text-slate-400">
                        {isBn ? item.dateBn : item.dateEn}
                      </td>
                      <td className="px-4 py-3 text-white">
                        {isBn ? item.bankBn : item.bankEn}
                      </td>
                      <td className="px-4 py-3 text-slate-300">
                        {isBn ? item.typeBn : item.typeEn}
                      </td>
                      <td className="px-4 py-3 font-mono font-bold text-white">
                        {isBn ? item.amountBn : item.amountEn}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className={`inline-flex px-2 py-0.5 rounded border text-[11px] font-semibold ${item.statusColor}`}>
                          {isBn ? item.statusBn : item.statusEn}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Certificate */}
        {activeTab === 'certificate' && (
          <div className="space-y-6">
            <div className="bg-[#020714] border-2 border-amber-500/40 rounded-2xl p-8 sm:p-12 relative overflow-hidden shadow-2xl max-w-4xl mx-auto">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-bl-full pointer-events-none"></div>

              {/* Watermark crest */}
              <div className="text-center pb-6 border-b border-amber-500/30">
                <img
                  src={UGG_LOGO_URL}
                  alt="UGG Logo"
                  className="h-16 w-16 mx-auto object-contain mb-3"
                />
                <h2 className="text-2xl font-serif font-bold text-amber-400 tracking-wider uppercase">
                  United Growth Group (UGG)
                </h2>
                <p className="text-xs text-amber-200/80 font-serif italic mt-1">
                  {isBn
                    ? 'United in Unity, Rising to Greatness • সমবায় ও টেকসই কমিউনিটি ট্রাস্ট'
                    : 'United in Unity, Rising to Greatness • Sovereign Cooperative Trust'}
                </p>
                <div className="mt-3 inline-block px-4 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs uppercase tracking-widest rounded-full">
                  OFFICIAL SHARE CERTIFICATE & MEMBERSHIP DEED
                </div>
              </div>

              <div className="py-8 space-y-6 text-center max-w-2xl mx-auto">
                <p className="text-xs font-mono text-slate-400">
                  {isBn ? 'সার্টিফিকেট রেফারেন্স নং: ' : 'Certificate Ref No: '}
                  <span className="text-white font-bold">UGG-CERT-2024-1048-A</span>
                </p>

                <p className="text-sm text-slate-300 leading-relaxed font-serif">
                  {isBn ? (
                    <>
                      এতদ্বারা প্রত্যয়ন করা যাইতেছে যে, <strong className="text-amber-300 text-base">{member.nameBn}</strong>, পিতা: মো: আব্দুর রউফ, এনআইডি: {member.nid}, স্থায়ী ঠিকানা: সেক্টর-৪, উত্তরা, ঢাকা; ইউনাইটি গ্রোথ গ্রুপের গঠনতন্ত্র অনুসারে বিধিমোতাবেক নিবন্ধিত <strong className="text-white">{member.categoryBn}</strong>।
                    </>
                  ) : (
                    <>
                      This is to certify that <strong className="text-amber-300 text-base">{member.nameEn}</strong>, Father: Md. Abdur Rauf, NID: {member.nid}, Uttara, Dhaka, is a duly registered <strong className="text-white">{member.categoryEn}</strong> in good standing with the Unity Growth Group Trust.
                    </>
                  )}
                </p>

                <div className="bg-[#040e24] border border-amber-500/30 p-4 rounded-xl inline-block max-w-md w-full">
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono text-left">
                    <div>
                      <span className="text-slate-400 block">
                        {isBn ? 'মোট বরাদ্দকৃত শেয়ার:' : 'Allotted Shares:'}
                      </span>
                      <span className="text-amber-300 font-bold text-base">
                        {isBn ? `${toBanglaNumber(member.shareCount)} টি শেয়ার` : `${member.shareCount} Shares`}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">
                        {isBn ? 'মোট মূল্যমান:' : 'Nominal Value:'}
                      </span>
                      <span className="text-emerald-400 font-bold text-base">
                        ৳{isBn ? toBanglaNumber(member.shareValue.toLocaleString()) : member.shareValue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 grid grid-cols-2 gap-8 text-xs font-serif text-slate-400">
                  <div className="border-t border-slate-700 pt-2">
                    <p className="font-semibold text-white">
                      {isBn ? 'ব্যারিস্টার তৌফিক এলাহী' : "Barrister Toufiq Elahi (Lincoln's Inn)"}
                    </p>
                    <p className="text-[11px]">
                      {isBn ? 'সিনিয়র লিগ্যাল কনসালট্যান্ট ও কমপ্লায়েন্স প্রধান' : 'Senior Legal Counsel & Compliance Head'}
                    </p>
                  </div>
                  <div className="border-t border-slate-700 pt-2">
                    <p className="font-semibold text-white">
                      {isBn ? 'মো: হাফিজুর রহমান' : 'Md. Hafizur Rahman'}
                    </p>
                    <p className="text-[11px]">
                      {isBn ? 'ব্যবস্থাপনা পরিচালক, ইউজিজি বোর্ড' : 'Managing Director, UGG Board'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center pt-4 border-t border-slate-800 flex justify-center gap-4">
                <button
                  onClick={() => alert(isBn ? 'অফিশিয়াল শেয়ার সনদ পিডিএফ ডাউনলোড প্রস্তুত হয়েছে।' : 'Digital share certificate PDF generated with QR validation.')}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg cursor-pointer flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">download</span>
                  {isBn ? 'সনদপত্র ডাউনলোড করুন (PDF)' : 'Download Certificate PDF'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Notices & Voting */}
        {activeTab === 'notices' && (
          <div className="space-y-6">
            <div className="bg-[#040e24] border border-amber-500/20 rounded-xl p-6">
              <h3 className="text-lg font-serif font-bold text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400">campaign</span>
                {isBn ? 'আসন্ন এজেন্ডা ও সদস্য সাধারণ ভোট (AGM Voting)' : 'AGM Governance Voting & Agenda Ballots'}
              </h3>
              <div className="p-5 rounded-xl bg-[#020714] border border-amber-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs rounded">
                    {isBn ? 'এজেন্ডা নং: ২০২৫-০২' : 'Agenda No: 2025-02'}
                  </span>
                  <span className="text-xs text-emerald-400 font-mono font-semibold">
                    {isBn ? 'ভোট প্রদান উন্মুক্ত' : 'Voting Open'}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-base text-white">
                  {isBn
                    ? 'রাজশাহী কেন্দ্রীয় কোল্ড চেইন হাব ও নতুন সুপার শপ শাখা সম্প্রসারণ অনুমোদন'
                    : 'Approval for Rajshahi Cold-Chain Logistics Hub & Super Shop Retail Outlets'}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isBn
                    ? 'উত্তরবঙ্গের কৃষিপণ্য সরাসরি রাজধানী ও বিভাগীয় শহরে সরবরাহের সুবিধার্থে অতিরিক্ত ৳৪ কোটি টাকা মূলধন বরাদ্দ ও শেরপুরে ২ বিঘা জমি লিজ চুক্তি নবায়নের প্রস্তাব।'
                    : 'Proposal to allocate BDT 4.00 Crore for multi-zone cold storage units and lease renewal for direct farm-to-table supermarket supply.'}
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => alert(isBn ? 'আপনার "হ্যাঁ (অনুমোদন)" ভোট সফলভাবে রেজিস্টার করা হয়েছে।' : 'Your "YES / APPROVED" vote recorded.')}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">thumb_up</span>
                    {isBn ? 'হ্যাঁ (অনুমোদন)' : 'Vote YES'}
                  </button>
                  <button
                    onClick={() => alert(isBn ? 'আপনার "না" ভোট সফলভাবে রেজিস্টার করা হয়েছে।' : 'Your "NO" vote recorded.')}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">thumb_down</span>
                    {isBn ? 'না (বিপক্ষে)' : 'Vote NO'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Upload Slip Modal */}
      {showSlipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#040e24] border border-amber-500/40 rounded-2xl max-w-lg w-full p-6 text-slate-100 shadow-2xl relative">
            <button
              onClick={() => setShowSlipModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-amber-400 text-2xl">upload_file</span>
              <h3 className="text-lg font-serif font-bold text-white">
                {isBn ? 'ব্যাংক ডিপোজিট স্লিপ ও ট্রানজেকশন তথ্য আপলোড' : 'Submit Bank Deposit Slip & Transaction'}
              </h3>
            </div>
            <p className="text-xs text-slate-400 mb-5">
              {isBn
                ? 'অনলাইন ব্যাংকিং বা ব্যাংক কাউন্টারে জমাকৃত স্লিপের ছবি ও ট্রানজেকশন বিবরণ যুক্ত করুন।'
                : 'Upload proof of deposit or EFT transaction slip for verified audit reconciliation.'}
            </p>

            <form onSubmit={handleSlipSubmit} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  {isBn ? 'ব্যাংকের নাম *' : 'Bank Name *'}
                </label>
                <select
                  value={newSlip.bank}
                  onChange={(e) => setNewSlip({ ...newSlip, bank: e.target.value })}
                  className="w-full bg-[#020714] border border-slate-800 focus:border-amber-400 rounded-lg px-3 py-2 text-white outline-none cursor-pointer"
                >
                  <option>Islami Bank Bangladesh PLC</option>
                  <option>BRAC Bank PLC</option>
                  <option>Dhaka Bank Limited</option>
                  <option>City Bank PLC</option>
                  <option>Eastern Bank PLC</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {isBn ? 'জমাকৃত টাকার পরিমাণ *' : 'Deposit Amount (BDT) *'}
                  </label>
                  <input
                    type="number"
                    required
                    value={newSlip.amount}
                    onChange={(e) => setNewSlip({ ...newSlip, amount: e.target.value })}
                    placeholder="100000"
                    className="w-full bg-[#020714] border border-slate-800 focus:border-amber-400 rounded-lg px-3 py-2 text-white outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {isBn ? 'ট্রানজেকশন / স্লিপ নম্বর *' : 'Transaction / Slip Ref *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newSlip.trxId}
                    onChange={(e) => setNewSlip({ ...newSlip, trxId: e.target.value })}
                    placeholder="TRX-9821..."
                    className="w-full bg-[#020714] border border-slate-800 focus:border-amber-400 rounded-lg px-3 py-2 text-white outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  {isBn ? 'ডিপোজিট স্লিপের ছবি / কপি আপলোড করুন:' : 'Upload Deposit Slip (Photo / PDF):'}
                </label>
                <div className="border border-dashed border-slate-700 rounded-xl p-4 text-center cursor-pointer hover:border-amber-400/50 bg-[#020714]">
                  <span className="material-symbols-outlined text-amber-400 text-2xl">add_photo_alternate</span>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {isBn ? 'ছবি সিলেক্ট করতে ক্লিক করুন (JPG, PNG, PDF)' : 'Click to browse files (JPG, PNG, PDF)'}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowSlipModal(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white cursor-pointer"
                >
                  {isBn ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold uppercase rounded cursor-pointer shadow-md"
                >
                  {isBn ? 'স্লিপ জমা দিন' : 'Submit Slip'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
