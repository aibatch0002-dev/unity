import React, { useState } from 'react';
import { PageRoute, Language } from '../types';
import { toBanglaNumber } from '../data/mockData';

interface AdminPortalPageProps {
  onNavigate: (route: PageRoute) => void;
  language: Language;
}

export const AdminPortalPage: React.FC<AdminPortalPageProps> = ({
  onNavigate,
  language,
}) => {
  const isBn = language === 'bn';
  const [activeTab, setActiveTab] = useState<'applications' | 'slips' | 'audit'>('applications');

  const [pendingApplicants, setPendingApplicants] = useState([
    {
      id: 'APP-2025-089',
      nameBn: 'রহিদুল ইসলাম',
      nameEn: 'Rohidul Islam',
      phone: '01700 000000',
      categoryBn: 'সাধারণ সদস্য (General)',
      categoryEn: 'General Member',
      shares: 10,
      capitalBn: '৳১,০০,০০০',
      capitalEn: '৳100,000',
      dateBn: '১১ মিনিট পূর্বে',
      dateEn: '11 mins ago',
      statusBn: 'অপেক্ষমাণ',
      statusEn: 'Pending Review',
    },
    {
      id: 'APP-2025-088',
      nameBn: 'রহিদুল ইসলাম',
      nameEn: 'Rohidul Islam',
      phone: '01700 000000',
      categoryBn: 'আজীবন সদস্য (Life)',
      categoryEn: 'Life Member',
      shares: 25,
      capitalBn: '৳২,৫০,০০০',
      capitalEn: '৳250,000',
      dateBn: '২ ঘণ্টা পূর্বে',
      dateEn: '2 hours ago',
      statusBn: 'অপেক্ষমাণ',
      statusEn: 'Pending Review',
    },
    {
      id: 'APP-2025-087',
      nameBn: 'রহিদুল ইসলাম',
      nameEn: 'Rohidul Islam',
      phone: '01700 000000',
      categoryBn: 'প্রতিষ্ঠাতা সহযোগী (Founder Tier)',
      categoryEn: 'Founder Tier Partner',
      shares: 50,
      capitalBn: '৳৫,০০,০০০',
      capitalEn: '৳500,000',
      dateBn: 'গতকাল',
      dateEn: 'Yesterday',
      statusBn: 'অপেক্ষমাণ',
      statusEn: 'Pending Review',
    },
  ]);

  const [depositSlips, setDepositSlips] = useState([
    {
      id: 'SLIP-9901',
      memberCode: 'UGG-M-1033',
      nameBn: 'রহিদুল ইসলাম',
      nameEn: 'Rohidul Islam',
      bank: 'BRAC Bank PLC',
      trxId: 'TXN-7788192',
      amountBn: '৳২,৫০,০০০',
      amountEn: '৳250,000',
      timeBn: 'আজকে, ১০:৩০ AM',
      timeEn: 'Today, 10:30 AM',
      statusBn: 'যাচাইাধীন',
      statusEn: 'Pending Audit',
    },
    {
      id: 'SLIP-9902',
      memberCode: 'UGG-M-1019',
      nameBn: 'রহিদুল ইসলাম',
      nameEn: 'Rohidul Islam',
      bank: 'Islami Bank Bangladesh PLC',
      trxId: 'TXN-9912044',
      amountBn: '৳১,০০,০০০',
      amountEn: '৳100,000',
      timeBn: 'আজকে, ০৯:১৫ AM',
      timeEn: 'Today, 09:15 AM',
      statusBn: 'যাচাইাধীন',
      statusEn: 'Pending Audit',
    },
  ]);

  const [auditLogs, setAuditLogs] = useState([
    {
      timeBn: '১০:৪৫ AM',
      timeEn: '10:45 AM',
      operatorBn: 'বোর্ড সচিবালয় (Sec-01)',
      operatorEn: 'Board Secretariat (Sec-01)',
      actionBn: 'সদস্য UGG-M-1047-এর শেয়ার বরাদ্দ সম্পন্ন ও ডিজিটাল সনদ ইস্যু',
      actionEn: 'Share allotment finalized and certificate issued for UGG-M-1047',
      ip: '103.205.71.12',
    },
    {
      timeBn: '০৯:২০ AM',
      timeEn: '09:20 AM',
      operatorBn: 'চিফ অডিটর (Aud-02)',
      operatorEn: 'Chief Auditor (Aud-02)',
      actionBn: 'Q4 2024 আর্থিক বিবরণী সত্যায়ন ও ট্রেজারি অনুমোদন প্রদান',
      actionEn: 'Q4 2024 financial statement ratified and treasury release approved',
      ip: '103.205.71.15',
    },
    {
      timeBn: 'গতকাল',
      timeEn: 'Yesterday',
      operatorBn: 'অপারেশন ম্যানেজার (Ops-04)',
      operatorEn: 'Operations Manager (Ops-04)',
      actionBn: 'মিরপুর সুপার শপ ইনভেন্টরি স্টক অডিট সম্পন্ন',
      actionEn: 'Super shop inventory stock audit finalized in Mirpur outpost',
      ip: '103.112.45.88',
    },
  ]);

  const handleApproveApplicant = (appId: string) => {
    const applicant = pendingApplicants.find((a) => a.id === appId);
    setPendingApplicants(pendingApplicants.filter((a) => a.id !== appId));
    setAuditLogs([
      {
        timeBn: 'এইমাত্র',
        timeEn: 'Just now',
        operatorBn: 'এডমিন পোর্টাল (Gov-Master)',
        operatorEn: 'Admin Portal (Gov-Master)',
        actionBn: `আবেদনকারী ${applicant?.nameBn} (${appId})-কে নতুন সদস্য হিসেবে বোর্ড অনুমোদন প্রদান`,
        actionEn: `Applicant ${applicant?.nameEn} (${appId}) endorsed and enrolled into active registry`,
        ip: '192.168.1.100',
      },
      ...auditLogs,
    ]);
  };

  const handleApproveSlip = (slipId: string) => {
    const slip = depositSlips.find((s) => s.id === slipId);
    setDepositSlips(depositSlips.filter((s) => s.id !== slipId));
    setAuditLogs([
      {
        timeBn: 'এইমাত্র',
        timeEn: 'Just now',
        operatorBn: 'ট্রেজারি অফিসার (Treasury-01)',
        operatorEn: 'Treasury Officer (Treasury-01)',
        actionBn: `ডিপোজিট স্লিপ ${slipId} (${slip?.amountBn}) ভেরিফিকেশন সম্পন্ন ও লেজারে ক্রেডিট`,
        actionEn: `Deposit slip ${slipId} (${slip?.amountEn}) verified and ledger updated`,
        ip: '192.168.1.105',
      },
      ...auditLogs,
    ]);
  };

  return (
    <div className="min-h-screen bg-[#000514] text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-900 pb-20">
      {/* Editorial Header */}
      <div className="border-b border-amber-500/20 bg-gradient-to-b from-[#030d22] via-[#020917] to-[#000514] pt-8 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm">shield</span>
              <span>UGG-GOVERNANCE-CONSOLE</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-300">ADMIN CONTROL CENTER</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('home')}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">logout</span>
                {isBn ? 'লগআউট ও প্রধান সাইটে প্রস্থান' : 'Exit to Public Portal'}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                {isBn ? 'সার্বভৌম প্রশাসন ও গভর্ন্যান্স কন্ট্রোল' : 'Sovereign Governance & Administration'}
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                {isBn
                  ? 'সদস্যপদ অনুমোদন, ব্যাংক ডিপোজিট ভেরিফিকেশন, শেয়ার বরাদ্দ ও প্রাতিষ্ঠানিক অডিট ট্রেইল'
                  : 'Executive dashboard for membership approvals, transaction clearance, and continuous audit oversight'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-mono rounded flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
                SUPER ADMIN
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-[#040e24] border border-amber-500/20 rounded-xl p-5">
            <div className="text-xs font-mono text-slate-400 uppercase">
              {isBn ? 'মোট সক্রিয় সদস্য' : 'Active Members'}
            </div>
            <div className="text-2xl font-bold font-serif text-white mt-1">
              {isBn ? '৪৫২ জন' : '452 Members'}
            </div>
            <div className="text-xs text-emerald-400 mt-2 font-mono">
              {isBn ? '↑ ৮ জন এই মাসে যুক্ত' : '↑ 8 Added this month'}
            </div>
          </div>

          <div className="bg-[#040e24] border border-amber-500/20 rounded-xl p-5">
            <div className="text-xs font-mono text-slate-400 uppercase">
              {isBn ? 'অপেক্ষমাণ আবেদন' : 'Pending Applicants'}
            </div>
            <div className="text-2xl font-bold font-serif text-amber-300 mt-1">
              {isBn ? `${toBanglaNumber(pendingApplicants.length)} টি` : `${pendingApplicants.length} Pending`}
            </div>
            <div className="text-xs text-amber-400 mt-2 font-mono">
              {isBn ? 'অনুমোদনের অপেক্ষায়' : 'Awaiting Board Review'}
            </div>
          </div>

          <div className="bg-[#040e24] border border-amber-500/20 rounded-xl p-5">
            <div className="text-xs font-mono text-slate-400 uppercase">
              {isBn ? 'অমীমাংসিত স্লিপ' : 'Uncleared Slips'}
            </div>
            <div className="text-2xl font-bold font-serif text-amber-400 mt-1">
              {isBn ? `${toBanglaNumber(depositSlips.length)} টি` : `${depositSlips.length} Deposits`}
            </div>
            <div className="text-xs text-slate-400 mt-2 font-mono">
              {isBn ? 'ট্রেজারি যাচাই আবশ্যক' : 'Treasury Clearance Needed'}
            </div>
          </div>

          <div className="bg-[#040e24] border border-amber-500/20 rounded-xl p-5">
            <div className="text-xs font-mono text-slate-400 uppercase">
              {isBn ? 'মোট আমানত তহবিল' : 'Total Portfolio Asset'}
            </div>
            <div className="text-2xl font-bold font-serif text-emerald-400 mt-1">
              {isBn ? '৳২৫.৪০ কোটি' : 'BDT 25.40 Cr'}
            </div>
            <div className="text-xs text-slate-400 mt-2 font-mono">
              {isBn ? '১০০% কমপ্লায়েন্ট' : '100% Compliant'}
            </div>
          </div>
        </div>

        {/* Quick Link to Super Shop Sales Admin Panel */}
        <div className="bg-gradient-to-r from-[#0a1532] via-[#0f204d] to-[#0a1532] border border-amber-500/30 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold shrink-0">
              <span className="material-symbols-outlined text-2xl">point_of_sale</span>
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-white">
                {isBn ? 'ইউজিজি সুপার শপ রিটেইল অ্যাডমিন ও লাইভ সেলস কাউন্টার' : 'UGG Super Shop Retail Admin & Live Sales POS'}
              </h4>
              <p className="text-xs text-slate-400">
                {isBn
                  ? 'আজকের সেল, চলতি মাসের মোট সেল, বার্ষিক বিক্রয় ও পণ্যের স্বয়ংক্রিয় হিসাব মনিটর করুন।'
                  : 'Track today, month, year, and lifetime retail sales with real-time automatic calculation.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('super-shop-and-business')}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            <span>{isBn ? 'সুপার শপ অ্যাডমিন প্যানেলে যান' : 'Go to Super Shop Admin'}</span>
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-800 gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-5 py-3 text-xs font-semibold rounded-t-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'applications'
                ? 'bg-amber-400/10 border-b-2 border-amber-400 text-amber-300 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">how_to_reg</span>
            {isBn ? 'সদস্যপদ আবেদন যাচাই ও অনুমোদন' : 'Pending Applicants Queue'} ({pendingApplicants.length})
          </button>
          <button
            onClick={() => setActiveTab('slips')}
            className={`px-5 py-3 text-xs font-semibold rounded-t-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'slips'
                ? 'bg-amber-400/10 border-b-2 border-amber-400 text-amber-300 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">receipt</span>
            {isBn ? 'ব্যাংক ডিপোজিট অনুমোদন কিউ' : 'Deposit Clearances'} ({depositSlips.length})
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-5 py-3 text-xs font-semibold rounded-t-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'audit'
                ? 'bg-amber-400/10 border-b-2 border-amber-400 text-amber-300 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">security</span>
            {isBn ? 'অডিট ও প্রশাসনিক কর্মকাণ্ড লগ' : 'System Audit Trail'}
          </button>
        </div>

        {/* Tab 1: Pending Applications */}
        {activeTab === 'applications' && (
          <div className="bg-[#040e24] border border-amber-500/20 rounded-xl overflow-hidden p-6">
            <h3 className="text-base font-serif font-bold text-white mb-4">
              {isBn ? 'নতুন সদস্যপদ আবেদনসমূহ (বোর্ড যাচাই প্রক্রিয়া)' : 'Incoming Member Applications'}
            </h3>

            {pendingApplicants.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                {isBn
                  ? 'কোনো নতুন আবেদন অপেক্ষমাণ নেই। সকল আবেদন প্রক্রিয়াজাত সম্পন্ন হয়েছে।'
                  : 'All applications have been processed. Queue is empty.'}
              </div>
            ) : (
              <div className="space-y-4">
                {pendingApplicants.map((app) => (
                  <div
                    key={app.id}
                    className="p-5 rounded-xl bg-[#020714] border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-amber-400 font-bold">{app.id}</span>
                        <h4 className="font-bold text-white text-sm">
                          {isBn ? app.nameBn : app.nameEn}
                        </h4>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {isBn ? app.categoryBn : app.categoryEn}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono pt-1">
                        <span>📞 {app.phone}</span>
                        <span>
                          📈 {isBn ? `${toBanglaNumber(app.shares)} টি শেয়ার` : `${app.shares} Shares`} ({isBn ? app.capitalBn : app.capitalEn})
                        </span>
                        <span className="text-slate-500">• {isBn ? app.dateBn : app.dateEn}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleApproveApplicant(app.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">check</span>
                        {isBn ? 'অনুমোদন দিন' : 'Approve'}
                      </button>
                      <button
                        onClick={() => {
                          setPendingApplicants(pendingApplicants.filter((a) => a.id !== app.id));
                        }}
                        className="px-4 py-2 bg-slate-800 hover:bg-red-950/60 hover:text-red-400 text-slate-400 font-semibold text-xs rounded uppercase tracking-wider cursor-pointer"
                      >
                        {isBn ? 'প্রত্যাখ্যান' : 'Decline'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Deposit Slips */}
        {activeTab === 'slips' && (
          <div className="bg-[#040e24] border border-amber-500/20 rounded-xl overflow-hidden p-6">
            <h3 className="text-base font-serif font-bold text-white mb-4">
              {isBn ? 'ব্যাংক স্লিপ যাচাইকরণ কিউ (ট্রেজারি অডিট)' : 'Bank Deposit Reconciliation Queue'}
            </h3>

            {depositSlips.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                {isBn
                  ? 'কোনো অনিষ্পন্ন ব্যাংক স্লিপ অবশিষ্ট নেই।'
                  : 'All deposit receipts reconciled into master ledger.'}
              </div>
            ) : (
              <div className="space-y-4">
                {depositSlips.map((slip) => (
                  <div
                    key={slip.id}
                    className="p-5 rounded-xl bg-[#020714] border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-amber-400 font-bold">{slip.id}</span>
                        <h4 className="font-bold text-white text-sm">
                          {isBn ? slip.nameBn : slip.nameEn}
                        </h4>
                        <span className="font-mono text-xs text-slate-400">({slip.memberCode})</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono pt-1">
                        <span>🏦 {slip.bank}</span>
                        <span>🧾 {slip.trxId}</span>
                        <span className="text-emerald-400 font-bold">
                          {isBn ? slip.amountBn : slip.amountEn}
                        </span>
                        <span className="text-slate-500">• {isBn ? slip.timeBn : slip.timeEn}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleApproveSlip(slip.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">verified</span>
                        {isBn ? 'স্লিপ অনুমোদন ও ব্যালেন্স যোগ' : 'Verify & Credit'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Immutable Audit Trail */}
        {activeTab === 'audit' && (
          <div className="bg-[#040e24] border border-amber-500/20 rounded-xl overflow-hidden p-6">
            <h3 className="text-base font-serif font-bold text-white mb-4">
              {isBn ? 'রিয়েল-টাইম সিস্টেম অডিট ট্রেইল' : 'Immutable Real-Time Governance Log'}
            </h3>
            <div className="space-y-3 font-mono text-xs">
              {auditLogs.map((log, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-[#020714] border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-slate-300"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-amber-400 text-[11px]">
                      {isBn ? log.timeBn : log.timeEn}
                    </span>
                    <span className="text-slate-400 font-bold">
                      [{isBn ? log.operatorBn : log.operatorEn}]
                    </span>
                    <span className="text-white">
                      {isBn ? log.actionBn : log.actionEn}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500">IP: {log.ip}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
