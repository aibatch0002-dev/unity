import React, { useState } from 'react';
import { PageRoute, Language } from '../types';
import { repositoryDocsData, toBanglaNumber } from '../data/mockData';

interface FinancialReportsPageProps {
  onNavigate: (route: PageRoute) => void;
  language: Language;
}

export const FinancialReportsPage: React.FC<FinancialReportsPageProps> = ({
  onNavigate,
  language,
}) => {
  const isBn = language === 'bn';
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [shareCount, setShareCount] = useState<number>(20);
  const sharePrice = 10000;
  const dividendRate = 18.5; // 18.5%

  const totalInvestment = shareCount * sharePrice;
  const annualDividend = Math.round(totalInvestment * (dividendRate / 100));
  const quarterlyDividend = Math.round(annualDividend / 4);

  const quarterlyReports = [
    {
      quarter: isBn ? 'চতুর্থ ত্রৈমাসিক (Q4 2024)' : 'Fourth Quarter (Q4 2024)',
      period: isBn ? 'অক্টোবর - ডিসেম্বর ২০২৪' : 'October - December 2024',
      revenue: '৳৬.৮৫ কোটি',
      netProfit: '৳১.৪২ কোটি',
      dividend: '৪.৭৫%',
      auditStatus: isBn ? 'অডিটেড ও অনুমোদিত' : 'Audited & Approved',
      statusColor: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30',
    },
    {
      quarter: isBn ? 'তৃতীয় ত্রৈমাসিক (Q3 2024)' : 'Third Quarter (Q3 2024)',
      period: isBn ? 'জুলাই - সেপ্টেম্বর ২০২৪' : 'July - September 2024',
      revenue: '৳৫.৯০ কোটি',
      netProfit: '৳১.১৮ কোটি',
      dividend: '৪.৫০%',
      auditStatus: isBn ? 'অডিটেড ও অনুমোদিত' : 'Audited & Approved',
      statusColor: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30',
    },
    {
      quarter: isBn ? 'দ্বিতীয় ত্রৈমাসিক (Q2 2024)' : 'Second Quarter (Q2 2024)',
      period: isBn ? 'এপ্রিল - জুন ২০২৪' : 'April - June 2024',
      revenue: '৳৫.২০ কোটি',
      netProfit: '৳১.০৫ কোটি',
      dividend: '৪.৫০%',
      auditStatus: isBn ? 'অডিটেড ও অনুমোদিত' : 'Audited & Approved',
      statusColor: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30',
    },
    {
      quarter: isBn ? 'প্রথম ত্রৈমাসিক (Q1 2024)' : 'First Quarter (Q1 2024)',
      period: isBn ? 'জানুয়ারি - মার্চ ২০২৪' : 'January - March 2024',
      revenue: '৳৪.৭৫ কোটি',
      netProfit: '৳০.৯৫ কোটি',
      dividend: '৪.৭৫%',
      auditStatus: isBn ? 'অডিটেড ও অনুমোদিত' : 'Audited & Approved',
      statusColor: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30',
    },
  ];

  const assetAllocation = [
    { label: isBn ? 'ইউজিজি ফ্রেশ মার্ট ও রিটেইল চেইন' : 'UGG Fresh Mart & Retail Chain', percent: 38, amount: '৳৯.৬৫ কোটি', color: 'bg-amber-500' },
    { label: isBn ? 'এগ্রো ফার্ম ও কোল্ড-চেইন অবকাঠামো' : 'Agro Farm & Cold-Chain Infra', percent: 32, amount: '৳৮.১৩ কোটি', color: 'bg-emerald-500' },
    { label: isBn ? 'আইটি পার্ক ও ডিজিটাল ফাইন্যান্স' : 'IT Park & Digital Finance', percent: 18, amount: '৳৪.৫৭ কোটি', color: 'bg-blue-500' },
    { label: isBn ? 'লিকুইডিটি ও জরুরি ক্যাশ রিজার্ভ' : 'Liquidity & Emergency Cash Reserve', percent: 12, amount: '৳৩.০৫ কোটি', color: 'bg-indigo-400' },
  ];

  return (
    <div className="min-h-screen bg-[#000514] text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-900 pb-20">
      {/* Editorial Header */}
      <div className="relative border-b border-amber-500/20 bg-gradient-to-b from-[#030d22] via-[#020917] to-[#000514] pt-12 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-amber-400/80 mb-4 tracking-wider uppercase">
            <span>UGG-FIN-AUDIT-2024-25</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300">SOVEREIGN AUDIT & FINANCIAL PORTAL</span>
            <span className="text-slate-600">/</span>
            <span className="bg-emerald-900/40 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px]">
              {isBn ? 'স্বীকৃত অডিট' : 'OFFICIALLY AUDITED'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight mb-4 leading-tight">
            {isBn ? 'আর্থিক বিবরণী, লভ্যাংশ ও নিরীক্ষা পোর্টাল' : 'Financial Statements, Dividends & Audit Portal'}
          </h1>
          <p className="max-w-3xl text-slate-300 text-sm sm:text-base leading-relaxed">
            {isBn
              ? 'ইউনাইটি গ্রোথ গ্রুপের সর্বোচ্চ নৈতিক মানদণ্ড ও শতভাগ স্বচ্ছতায় পরিচালিত আর্থিক হিসাব বিবরণী। প্রতিটি সদস্যের মূলধনের সুরক্ষা, ত্রৈমাসিক লভ্যাংশ ঘোষণা এবং প্রথিতযশা চার্টার্ড অ্যাকাউন্ট্যান্টস দ্বারা সার্বক্ষণিক অডিট নিশ্চিতকৃত।'
              : 'Financial statement repository governed by UGG sovereign fiduciary standards. Complete member equity protection, quarterly dividend declarations, and continuous auditing by certified chartered accountants.'}
          </p>

          {/* Quick Action Badges */}
          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <button
              onClick={() => {
                const el = document.getElementById('dividend-calc');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs tracking-wider uppercase rounded shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">calculate</span>
              {isBn ? 'মুনাফা ক্যালকুলেটর' : 'Dividend Calculator'}
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('repository-docs');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold tracking-wider uppercase rounded transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">file_download</span>
              {isBn ? 'নিরীক্ষা সনদ ডাউনলোড' : 'Download Audit Reports'}
            </button>
            <div className="text-xs text-slate-400 flex items-center gap-1.5 ml-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {isBn ? 'চলতি অর্থবছর: ২০২৪-২০২৫ | অডিট হালনাগাদ সম্পন্ন' : 'Fiscal Year: 2024-2025 | Audit in Good Standing'}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
        {/* Core Financial KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-[#040e24] border border-amber-500/20 rounded-xl p-6 relative overflow-hidden group hover:border-amber-500/40 transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none"></div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              <span>{isBn ? 'মোট সংগৃহীত তহবিল' : 'Total Capital Pool'}</span>
              <span className="text-emerald-400 font-bold">↑ ২৩.৫%</span>
            </div>
            <div className="text-3xl font-bold font-serif text-amber-300 mb-1">
              {isBn ? '৳২৫.৪০ কোটি' : 'BDT 25.40 Cr'}
            </div>
            <p className="text-xs text-slate-400">
              {isBn ? '৪৫০+ নিবন্ধিত সদস্যের বিনিয়োগিত মূলধন' : 'Contributed by 450+ verified members'}
            </p>
          </div>

          <div className="bg-[#040e24] border border-amber-500/20 rounded-xl p-6 relative overflow-hidden group hover:border-amber-500/40 transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full pointer-events-none"></div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              <span>{isBn ? 'প্রকল্পে বিনিয়োগিত মূলধন' : 'Deployed In Projects'}</span>
              <span className="text-amber-400 font-bold">৭৮.১৫%</span>
            </div>
            <div className="text-3xl font-bold font-serif text-emerald-400 mb-1">
              {isBn ? '৳১৯.৮৫ কোটি' : 'BDT 19.85 Cr'}
            </div>
            <p className="text-xs text-slate-400">
              {isBn ? '৮টি উৎপাদনশীল ও লাভজনক প্রকল্প' : 'Allocated in 8 revenue assets'}
            </p>
          </div>

          <div className="bg-[#040e24] border border-amber-500/20 rounded-xl p-6 relative overflow-hidden group hover:border-amber-500/40 transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full pointer-events-none"></div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              <span>{isBn ? 'বার্ষিক গড় লভ্যাংশ প্রদান' : 'Annual Dividend Yield'}</span>
              <span className="text-emerald-400 font-bold">সুদমুক্ত</span>
            </div>
            <div className="text-3xl font-bold font-serif text-amber-400 mb-1">
              {isBn ? '১৮.৫০%' : '18.50%'}
            </div>
            <p className="text-xs text-slate-400">
              {isBn ? 'ত্রৈমাসিক ভিত্তিতে সদস্যদের ব্যাংক অ্যাকাউন্টে জমা' : 'Disbursed quarterly directly to bank accounts'}
            </p>
          </div>

          <div className="bg-[#040e24] border border-amber-500/20 rounded-xl p-6 relative overflow-hidden group hover:border-amber-500/40 transition-all">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-bl-full pointer-events-none"></div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              <span>{isBn ? 'অনুমোদিত মূলধন শেয়ার' : 'Authorized Capital'}</span>
              <span className="text-slate-400">১০০% সংরক্ষিত</span>
            </div>
            <div className="text-3xl font-bold font-serif text-white mb-1">
              {isBn ? '৳৫০.০০ কোটি' : 'BDT 50.00 Cr'}
            </div>
            <p className="text-xs text-slate-400">
              {isBn ? 'রেজিস্ট্রার অব জয়েন্ট স্টক কোম্পানিজ অনুমোদিত' : 'Authorized under RJSC & Ministry'}
            </p>
          </div>
        </div>

        {/* Quarterly Statements Table */}
        <div className="bg-[#040e24] border border-amber-500/20 rounded-xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400">table_chart</span>
                {isBn ? 'ত্রৈমাসিক আর্থিক বিবরণী ও লভ্যাংশ বণ্টন (২০২৪)' : 'Quarterly Financial Statement & Dividend Disbursal (2024)'}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {isBn
                  ? 'প্রতি তিন মাস অন্তর নির্বাহী পর্ষদের অনুমোদন ও অডিটোরিয়াম অডিটের ভিত্তিতে প্রকাশিত সারসংক্ষেপ'
                  : 'Official summaries certified every quarter following board resolution and external audit'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold rounded">
                {isBn ? '৪টি ত্রৈমাসিক সম্পূর্ণ' : 'All 4 Quarters Closed'}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-[#020714] text-xs uppercase font-mono text-slate-400 border-b border-slate-800">
                <tr>
                  <th scope="col" className="px-6 py-4">{isBn ? 'ত্রৈমাসিক ও সময়কাল' : 'Quarter & Period'}</th>
                  <th scope="col" className="px-6 py-4">{isBn ? 'মোট আয় (Revenue)' : 'Total Revenue'}</th>
                  <th scope="col" className="px-6 py-4">{isBn ? 'নীট মুনাফা (Net Profit)' : 'Net Profit'}</th>
                  <th scope="col" className="px-6 py-4">{isBn ? 'প্রদত্ত লভ্যাংশ' : 'Distributed Yield'}</th>
                  <th scope="col" className="px-6 py-4">{isBn ? 'নিরীক্ষা ও কমপ্লায়েন্স' : 'Audit Status'}</th>
                  <th scope="col" className="px-6 py-4 text-right">{isBn ? 'বিবরণী' : 'Statement'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {quarterlyReports.map((q, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white">{q.quarter}</div>
                      <div className="text-xs text-slate-400 font-mono">{q.period}</div>
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-200">{q.revenue}</td>
                    <td className="px-6 py-4 font-mono font-semibold text-emerald-400">{q.netProfit}</td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-amber-400">{q.dividend}</span>
                      <span className="text-[11px] text-slate-400 ml-1">
                        {isBn ? '(সরাসরি বিতরণকৃত)' : '(Directly credited)'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs border font-medium ${q.statusColor}`}>
                        <span className="material-symbols-outlined text-xs">verified</span>
                        {q.auditStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedDoc(`Q-Statement-${idx + 1}`)}
                        className="text-amber-400 hover:text-amber-300 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">visibility</span>
                        {isBn ? 'দেখুন' : 'View'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Capital Allocation & Asset Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-[#040e24] border border-amber-500/20 rounded-xl p-6">
            <h2 className="text-xl font-serif font-bold text-white mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-400">pie_chart</span>
              {isBn ? 'মূলধন বরাদ্দ ও সম্পদ বণ্টন কাঠামো' : 'Capital Allocation & Portfolio Diversity'}
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              {isBn
                ? 'সদস্যদের তহবিলের ঝুঁকি কমাতে একাধিক লাভজনক বাণিজ্যিক ও এগ্রো খাতে কৌশলগত সুষম বিনিয়োগ।'
                : 'Balanced capital distribution across retail, agro farming, technology parks and sovereign liquidity.'}
            </p>

            <div className="space-y-5">
              {assetAllocation.map((item, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-200 font-medium">{item.label}</span>
                    <span className="font-mono text-amber-300 font-bold">
                      {item.amount} ({isBn ? toBanglaNumber(item.percent) : item.percent}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-800">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                      style={{ width: `${item.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start gap-3">
              <span className="material-symbols-outlined text-amber-400 text-xl mt-0.5">policy</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">{isBn ? 'ঝুঁকি প্রশমন নীতি:' : 'Risk Mitigation Strategy:'}</strong>{' '}
                {isBn
                  ? 'কোনো একক খাতে মোট তহবিলের ৪০% এর বেশি বরাদ্দ দেওয়া হয় না। উপরন্তু, ১২% জরুরি ক্যাশ রিজার্ভ তহবিলে সার্বক্ষণিক তারল্য বজায় রাখা হয়।'
                  : 'No single asset class receives more than 40% of pool capital. A 12% liquidity reserve is permanently maintained in tier-1 bank bonds.'}
              </p>
            </div>
          </div>

          {/* Interactive Dividend Calculator */}
          <div id="dividend-calc" className="lg:col-span-5 bg-gradient-to-b from-[#0d1e3a]/50 to-[#040e24] border border-amber-500/30 rounded-xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-amber-400 text-2xl">calculate</span>
              <div>
                <h3 className="font-serif font-bold text-white text-lg">
                  {isBn ? 'সদস্য লভ্যাংশ হিসাবকারক' : 'Dividend Returns Calculator'}
                </h3>
                <p className="text-[11px] text-amber-400/80 font-mono">
                  {isBn ? '১৮.৫০% বার্ষিক প্রাক্কলিত লভ্যাংশ অনুযায়ী' : 'Based on 18.50% annualized yield'}
                </p>
              </div>
            </div>

            <div className="space-y-4 my-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  {isBn ? 'শেয়ারের সংখ্যা নির্ধারণ করুন:' : 'Select Number of Shares:'}{' '}
                  <span className="text-amber-400 font-bold font-mono text-sm">
                    {isBn ? toBanglaNumber(shareCount) : shareCount} {isBn ? 'টি শেয়ার' : 'Shares'}
                  </span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={shareCount}
                  onChange={(e) => setShareCount(parseInt(e.target.value, 10))}
                  className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>৫ টি (৳৫০,০০০)</span>
                  <span>৫০ টি (৳৫,০০,০০০)</span>
                  <span>১০০ টি (৳১০,০০,০০০)</span>
                </div>
              </div>

              <div className="bg-[#020714] p-4 rounded-lg border border-slate-800 space-y-3 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">{isBn ? 'মোট বিনিয়োগিত মূলধন:' : 'Total Investment:'}</span>
                  <span className="font-bold text-white">
                    ৳{isBn ? toBanglaNumber(totalInvestment.toLocaleString()) : totalInvestment.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{isBn ? 'প্রাক্কলিত বার্ষিক মুনাফা (১৮.৫%):' : 'Projected Annual Return:'}</span>
                  <span className="font-bold text-emerald-400">
                    ৳{isBn ? toBanglaNumber(annualDividend.toLocaleString()) : annualDividend.toLocaleString()}
                  </span>
                </div>
                <div className="border-t border-slate-800 pt-2 flex justify-between text-sm">
                  <span className="text-amber-300 font-sans font-semibold">{isBn ? 'ত্রৈমাসিক প্রাপ্তি (প্রতি ৩ মাস):' : 'Quarterly Payout:'}</span>
                  <span className="font-bold text-amber-400">
                    ৳{isBn ? toBanglaNumber(quarterlyDividend.toLocaleString()) : quarterlyDividend.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('apply-for-membership')}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded transition-all cursor-pointer shadow-md text-center"
            >
              {isBn ? 'এই শেয়ার প্যাকেজে আবেদন করুন' : 'Apply for this Share Tier'}
            </button>
          </div>
        </div>

        {/* Audit Certification Repository */}
        <div id="repository-docs" className="bg-[#040e24] border border-amber-500/20 rounded-xl p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400">verified</span>
                {isBn ? 'অনুমোদিত অডিট সনদ ও আইনি নথি ভল্ট' : 'Certified Audit Documents & Legal Vault'}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {isBn
                  ? 'চার্টার্ড অ্যাকাউন্ট্যান্টস ও আইনি উপদেষ্টাদের অনুমোদিত আসল রিপোর্টের ডিজিটাল অনুলিপি'
                  : 'Tamper-evident digital transcripts certified by sovereign legal counsel and independent auditors'}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="material-symbols-outlined text-emerald-400 text-sm">lock</span>
              {isBn ? 'SHA-256 সুরক্ষিত নথি' : 'SHA-256 Protected Documents'}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {repositoryDocsData.map((doc) => (
              <div
                key={doc.id}
                className="bg-[#020714] border border-slate-800 hover:border-amber-500/40 rounded-xl p-5 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[10px] rounded">
                      {doc.code}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">{doc.fileSize}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors line-clamp-2 mb-2">
                    {isBn ? doc.titleBn : (doc.titleEn || doc.titleBn)}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                    {isBn ? doc.detailsBn : (doc.detailsEn || doc.detailsBn)}
                  </p>
                </div>

                <div className="border-t border-slate-800/80 pt-3 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">task_alt</span>
                    {isBn ? doc.badgeBn : (doc.badgeEn || doc.badgeBn)}
                  </span>
                  <button
                    onClick={() => setSelectedDoc(isBn ? doc.titleBn : (doc.titleEn || doc.titleBn))}
                    className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">download</span>
                    {isBn ? 'সংগ্রহ' : 'Download'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Independent External Auditors Banner */}
        <div className="bg-gradient-to-r from-[#0d1e3a]/40 via-[#040e24] to-[#0d1e3a]/40 border border-slate-800 rounded-xl p-6 text-center">
          <p className="text-xs uppercase font-mono tracking-widest text-amber-400/80 mb-2">
            {isBn ? 'স্বাধীন পেশাদার অডিট ও আইনি পরামর্শক পরিষদ' : 'Independent Professional Auditors & Legal Counsel'}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 mt-4 text-slate-300 text-sm font-serif">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-400">account_balance</span>
              <span>A. Qasem & Co. Chartered Accountants</span>
            </div>
            <div className="h-4 w-px bg-slate-700 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-400">gavel</span>
              <span>Rahman & Associates Supreme Court Legal Chamber</span>
            </div>
            <div className="h-4 w-px bg-slate-700 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-400">assured_workload</span>
              <span>Department of Co-operatives, GoB Compliance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Document View / Download Simulation Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#040e24] border border-amber-500/40 rounded-2xl max-w-lg w-full p-6 text-slate-100 shadow-2xl relative">
            <button
              onClick={() => setSelectedDoc(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
              <span className="material-symbols-outlined text-2xl">picture_as_pdf</span>
            </div>
            <h3 className="text-lg font-serif font-bold text-white mb-2">
              {isBn ? 'অফিশিয়াল নথি যাচাই ও ডাউনলোড' : 'Official Document Verification'}
            </h3>
            <p className="text-xs text-slate-300 font-mono bg-slate-900 p-3 rounded border border-slate-800 mb-4">
              {selectedDoc}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              {isBn
                ? 'এই নথিটি ইউনাইটি গ্রোথ গ্রুপ (UGG)-এর অভ্যন্তরীণ এনক্রিপ্টেড আর্কাইভ থেকে প্রস্তুত করা হয়েছে। ওয়াটারমার্কসহ ডিজিটাল সিগনেচার সংযুক্ত রয়েছে।'
                : 'This certified document has been retrieved from UGG sovereign encrypted archives with cryptographic digital signatures.'}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-2 rounded text-xs font-semibold text-slate-300 hover:bg-slate-800 cursor-pointer"
              >
                {isBn ? 'বন্ধ করুন' : 'Close'}
              </button>
              <button
                onClick={() => {
                  alert(isBn ? 'নথি সফলভাবে ডাউনলোড হয়েছে।' : 'Document downloaded successfully.');
                  setSelectedDoc(null);
                }}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs rounded uppercase tracking-wider hover:from-amber-400 hover:to-amber-500 cursor-pointer"
              >
                {isBn ? 'পিডিএফ ডাউনলোড করুন' : 'Download PDF'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
