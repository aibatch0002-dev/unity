import React from 'react';
import { PageRoute, Language } from '../types';
import { MemberWizard } from '../components/MemberWizard';

interface ApplyMembershipPageProps {
  onNavigate: (route: PageRoute) => void;
  language: Language;
}

export const ApplyMembershipPage: React.FC<ApplyMembershipPageProps> = ({
  onNavigate,
  language,
}) => {
  const isBn = language === 'bn';

  return (
    <div className="min-h-screen bg-[#000514] text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-900 pb-20">
      {/* Top Banner */}
      <div className="relative border-b border-amber-500/20 bg-gradient-to-b from-[#030d22] via-[#020917] to-[#000514] pt-12 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-amber-400/80 mb-4 tracking-wider uppercase">
            <span>UGG-MEMBERSHIP-ENROLLMENT</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300">OFFICIAL 7-STEP PROTOCOL</span>
            <span className="text-slate-600">/</span>
            <span className="bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded text-[10px]">
              {isBn ? 'সদস্যপদ উন্মুক্ত' : 'APPLICATION OPEN'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            {isBn ? 'ইউনাইটি গ্রোথ গ্রুপ সদস্যপদ আবেদন পোর্টাল' : 'Sovereign Membership Application Portal'}
          </h1>
          <p className="max-w-3xl text-slate-300 text-sm sm:text-base leading-relaxed">
            {isBn
              ? 'ইউনাইটি গ্রোথ গ্রুপের স্থায়ী ও বিনিয়োগকারী সদস্যপদের জন্য আপনার ব্যক্তিগত, পেশাগত, ব্যাংকিং এবং নমিনির তথ্য ৭টি সুস্পষ্ট ধাপে পূরণ করে পরিচালনা পর্ষদের অনুমোদনের জন্য দাখিল করুন।'
              : 'Complete your personal, vocational, investment equity, and nominee credentials through the official 7-step enrollment process.'}
          </p>

          <div className="mt-6 flex flex-wrap gap-4 items-center text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5 text-amber-300">
              <span className="material-symbols-outlined text-sm">verified_user</span>
              {isBn ? 'সমবায় অধিদপ্তর আইন দ্বারা সুরক্ষিত' : 'Protected under Co-operative Societies Act'}
            </span>
            <span className="text-slate-700">•</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="material-symbols-outlined text-sm">schedule</span>
              {isBn ? 'আনুমানিক পূরণ সময়: ৮-১০ মিনিট' : 'Estimated completion: 8-10 mins'}
            </span>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => onNavigate('members')}
              className="text-amber-400 hover:underline cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">people</span>
              {isBn ? 'বিদ্যমান সদস্য ডিরেক্টরি দেখুন' : 'Explore Member Directory'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <MemberWizard
          language={language}
          onComplete={(trackingCode) => {
            console.log('Membership completed with code:', trackingCode);
          }}
        />
      </div>
    </div>
  );
};
