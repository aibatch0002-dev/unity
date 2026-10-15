import React, { useState } from 'react';
import { PageRoute, Language } from '../types';
import {
  UTTARA_HQ_MAP_IMAGE,
  RECEPTION_LOUNGE_IMAGE,
  BOARDROOM_GLASS_IMAGE,
} from '../data/mockData';

interface ContactPageProps {
  onNavigate: (route: PageRoute) => void;
  language: Language;
}

export const ContactPage: React.FC<ContactPageProps> = ({ language }) => {
  const isBn = language === 'bn';
  const [selectedOffice, setSelectedOffice] = useState<number>(0);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'membership',
    message: '',
  });

  const offices = [
    {
      nameBn: 'প্রধান কার্যালয় (উত্তরা হেড অফিস)',
      nameEn: 'Corporate Headquarters (Uttara)',
      addressBn: 'হাউস # ২৪, রোড # ১১, সেক্টর # ০৪, উত্তরা, ঢাকা-১২৩০',
      addressEn: 'House # 24, Road # 11, Sector # 04, Uttara, Dhaka-1230',
      phones: ['+880 1711-000000', '+880 2-8899770'],
      email: 'hq@unitygrowthgroup.com',
      hoursBn: 'শনিবার - বৃহস্পতিবার: সকাল ৯:০০ - সন্ধ্যা ৬:০০ (শুক্রবার বন্ধ)',
      hoursEn: 'Saturday - Thursday: 9:00 AM - 6:00 PM (Friday Closed)',
      image: RECEPTION_LOUNGE_IMAGE,
      type: 'Head Office',
    },
    {
      nameBn: 'গুলশান এক্সিকিউটিভ লাউঞ্জ ও লিগ্যাল চেম্বার',
      nameEn: 'Gulshan Executive Lounge & Legal Chamber',
      addressBn: 'লেভেল ৭, প্লট ১৪, বীর উত্তম মীর শওকত সড়ক, গুলশান-১, ঢাকা-১২১২',
      addressEn: 'Level 7, Plot 14, Bir Uttam Mir Shawkat Sarak, Gulshan-1, Dhaka-1212',
      phones: ['+880 1894-920200', '+880 2-9844332'],
      email: 'gulshan@unitygrowthgroup.com',
      hoursBn: 'রবিবার - বৃহস্পতিবার: সকাল ১০:০০ - রাত ৮:০০',
      hoursEn: 'Sunday - Thursday: 10:00 AM - 8:00 PM',
      image: BOARDROOM_GLASS_IMAGE,
      type: 'Executive & Legal',
    },
    {
      nameBn: 'বগুড়া আঞ্চলিক সমন্বয় ও এগ্রো কোল্ড-হাব',
      nameEn: 'Bogura Regional Operations & Agro Cold-Hub',
      addressBn: 'শেরপুর রোড, বনানী মোড় সংলগ্ন, বগুড়া সদর, বগুড়া-৫৮০০',
      addressEn: 'Sherpur Road, Adjacent to Banani Mor, Bogura Sadar, Bogura-5800',
      phones: ['+880 1713-445566'],
      email: 'agro.bogura@unitygrowthgroup.com',
      hoursBn: 'শনিবার - বৃহস্পতিবার: সকাল ৮:০০ - বিকাল ৫:০০',
      hoursEn: 'Saturday - Thursday: 8:00 AM - 5:00 PM',
      image: RECEPTION_LOUNGE_IMAGE,
      type: 'Agro Logistics',
    },
  ];

  const faqs = [
    {
      qBn: 'ইউনাইটি গ্রোথ গ্রুপ (UGG)-এর সদস্যপদ লাভের প্রক্রিয়া কী?',
      qEn: 'What is the process to obtain UGG membership?',
      aBn: 'অনলাইনে আমাদের ৭-ধাপের আবেদন ফরম পূরণ করে জাতীয় পরিচয়পত্র, নমিনির তথ্য এবং ন্যূনতম ৫টি শেয়ার (প্রতি শেয়ার ৳১০,০০০) ক্রয়ের অঙ্গীকার জমা দিতে হয়। পরিচালনা পর্ষদের যাচাই-বাছাই ও স্বাক্ষরের পর ৩ কার্যদিবসের মধ্যে অফিসিয়াল সদস্য সনদ ও মেম্বার পোর্টাল এক্সেস প্রদান করা হয়।',
      aEn: 'Fill out our 7-step online application with NID, nominee details, and commitment for minimum 5 shares (BDT 10,000 per share). Following verification by board, official certificates and portal access are granted in 3 business days.',
    },
    {
      qBn: 'লভ্যাংশ কখন এবং কিভাবে বণ্টন করা হয়?',
      qEn: 'When and how are dividends distributed?',
      aBn: 'প্রতি তিন মাস (ত্রৈমাসিক) অন্তর অডিট সম্পন্ন হওয়ার পর ঘোষিত মুনাফা সরাসরি সদস্যদের নিবন্ধিত ব্যাংক হিসাবে বিইএফটিএন (BEFTN) অথবা এনপিএসবি (NPSB)-এর মাধ্যমে ট্রান্সফার করা হয়। বার্ষিক ১৮.৫০% পর্যন্ত প্রাক্কলিত সুদমুক্ত মুনাফা বিতরণ করা হয়ে থাকে।',
      aEn: 'Dividends are credited quarterly directly to member bank accounts via BEFTN/NPSB following external audit. Returns yield up to 18.50% annualized based on ethical Islamic cooperative profit-sharing.',
    },
    {
      qBn: 'বিনিয়োগকৃত মূলধনের আইনি সুরক্ষা ও জামানত কী?',
      qEn: 'What legal security guarantees the member equity?',
      aBn: 'ইউজিজি-এর প্রতিটি প্রকল্প ও সম্পদ (যেমন: নিজস্ব জমি, সুপার শপের অবকাঠামো, এগ্রো ফার্ম) সমবায় ট্রাস্ট ও সদস্যদের যৌথ মালিকানায় রেজিস্ট্রিকৃত। বাংলাদেশ সরকারের সমবায় আইন ও স্বাধীন চার্টার্ড অ্যাকাউন্ট্যান্টস দ্বারা সার্বক্ষণিক অডিটের মাধ্যমে আমানতের পূর্ণ আইনি সুরক্ষা নিশ্চিত করা হয়।',
      aEn: 'All assets (freehold land, retail infrastructure, cold chains) are owned in common sovereign trust under the Co-operative Societies Act with certified quarterly external audits.',
    },
    {
      qBn: 'প্রয়োজনে কি শেয়ার হস্তান্তর বা প্রত্যাহারের সুযোগ রয়েছে?',
      qEn: 'Can shares be transferred or liquidated?',
      aBn: 'হ্যাঁ, গঠনতন্ত্র অনুযায়ী নূন্যতম ১ বছর মেয়াদের পর যেকোনো সদস্য পরিচালনা পর্ষদের অনুমোদন সাপেক্ষে অন্য যোগ্য সদস্যের কাছে অথবা অভ্যন্তরীণ লিকুইডিটি ফান্ডের মাধ্যমে শেয়ার হস্তান্তর বা সমর্পণ করতে পারেন।',
      aEn: 'Yes, after a standard 1-year maturation window, members may transfer shares to eligible nominees/members or liquidate via the internal sovereign reserve fund with board endorsement.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomTicket = `UGG-TKT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketId(randomTicket);
  };

  return (
    <div className="min-h-screen bg-[#000514] text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-900 pb-20">
      {/* Editorial Hero */}
      <div className="relative border-b border-amber-500/20 bg-gradient-to-b from-[#030d22] via-[#020917] to-[#000514] pt-12 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-amber-400/80 mb-4 tracking-wider uppercase">
            <span>UGG-CONTACT-HUB-2025</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300">EXECUTIVE PROTOCOL & MEMBER LIAISON</span>
            <span className="text-slate-600">/</span>
            <span className="bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px]">
              {isBn ? 'সক্রিয় হেল্পডেস্ক' : 'HELPDESK ONLINE'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            {isBn ? 'যোগাযোগ ও কর্পোরেট সচিবালয়' : 'Contact & Sovereign Secretariat'}
          </h1>
          <p className="max-w-3xl text-slate-300 text-sm sm:text-base leading-relaxed">
            {isBn
              ? 'ইউনাইটি গ্রোথ গ্রুপের প্রধান কার্যালয়, গুলশান এক্সিকিউটিভ লাউঞ্জ ও আঞ্চলিক অপারেশনাল হাবসমূহের সরাসরি ঠিকানা, হেল্পলাইন ও দাপ্তরিক অনুসন্ধান প্ল্যাটফর্ম।'
              : 'Direct liaison with UGG Corporate Headquarters, Gulshan Executive Chambers, regional agro hubs, and member services desk.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
        {/* Office Selection Tabs & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-[#040e24] border border-amber-500/20 rounded-2xl overflow-hidden p-6 sm:p-8">
            <h2 className="text-xl font-serif font-bold text-white mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-400">domain</span>
              {isBn ? 'অফিস ও লাউঞ্জ নির্বাচন করুন' : 'Select Corporate Location'}
            </h2>

            {/* Office Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {offices.map((office, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedOffice(idx)}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                    selectedOffice === idx
                      ? 'bg-amber-400/10 border-amber-400 text-amber-300 shadow-md'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-[10px] uppercase font-mono tracking-wider opacity-75">{office.type}</div>
                  <div className="font-semibold text-xs mt-1 text-white line-clamp-1">
                    {isBn ? office.nameBn.split('(')[0] : office.nameEn.split('(')[0]}
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Office Details */}
            {(() => {
              const current = offices[selectedOffice];
              return (
                <div className="space-y-6">
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800">
                    <img
                      src={current.image}
                      alt={current.nameBn}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-md text-amber-300 font-mono text-xs border border-amber-500/30">
                      {current.type}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-serif font-bold text-white">
                      {isBn ? current.nameBn : current.nameEn}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                    <div className="bg-[#020714] p-4 rounded-xl border border-slate-800 space-y-1">
                      <div className="text-slate-400 flex items-center gap-1.5 font-semibold">
                        <span className="material-symbols-outlined text-amber-400 text-sm">location_on</span>
                        {isBn ? 'ঠিকানা:' : 'Address:'}
                      </div>
                      <p className="text-slate-200 leading-relaxed font-sans">
                        {isBn ? current.addressBn : current.addressEn}
                      </p>
                    </div>

                    <div className="bg-[#020714] p-4 rounded-xl border border-slate-800 space-y-1">
                      <div className="text-slate-400 flex items-center gap-1.5 font-semibold">
                        <span className="material-symbols-outlined text-amber-400 text-sm">schedule</span>
                        {isBn ? 'অফিস সময়সূচী:' : 'Business Hours:'}
                      </div>
                      <p className="text-slate-200 leading-relaxed font-mono">
                        {isBn ? current.hoursBn : current.hoursEn}
                      </p>
                    </div>

                    <div className="bg-[#020714] p-4 rounded-xl border border-slate-800 space-y-1">
                      <div className="text-slate-400 flex items-center gap-1.5 font-semibold">
                        <span className="material-symbols-outlined text-amber-400 text-sm">call</span>
                        {isBn ? 'হটলাইন ও ফোন:' : 'Hotlines:'}
                      </div>
                      <p className="text-amber-300 font-mono font-bold">
                        {current.phones.join(' , ')}
                      </p>
                    </div>

                    <div className="bg-[#020714] p-4 rounded-xl border border-slate-800 space-y-1">
                      <div className="text-slate-400 flex items-center gap-1.5 font-semibold">
                        <span className="material-symbols-outlined text-amber-400 text-sm">mail</span>
                        {isBn ? 'অফিসিয়াল ইমেইল:' : 'Official Email:'}
                      </div>
                      <p className="text-slate-200 font-mono">
                        {current.email}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Inquiry / Message Form */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#0d1e3a]/40 to-[#040e24] border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-amber-400 text-2xl">send</span>
              <h2 className="text-xl font-serif font-bold text-white">
                {isBn ? 'সরাসরি বার্তা ও অনুসন্ধান' : 'Direct Official Inquiry'}
              </h2>
            </div>
            <p className="text-xs text-slate-400 mb-6">
              {isBn
                ? 'সদস্যপদ, সুপারশপ বিনিয়োগ অথবা সাধারণ জিজ্ঞাসার জন্য ফর্মটি পূরণ করুন।'
                : 'Submit your query directly to our secretariat for rapid dispatch.'}
            </p>

            {ticketId ? (
              <div className="p-6 rounded-xl bg-[#020714] border border-emerald-500/40 text-center space-y-4 animate-fadeIn">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-2xl">check_circle</span>
                </div>
                <h3 className="font-serif font-bold text-white text-lg">
                  {isBn ? 'আপনার বার্তা সফলভাবে গৃহীত হয়েছে!' : 'Query Submitted Successfully!'}
                </h3>
                <div className="bg-slate-900 p-3 rounded font-mono text-xs text-amber-400 border border-slate-800">
                  {isBn ? 'অনুসন্ধান ট্র্যাকিং নম্বর:' : 'Tracking Ticket ID:'} {ticketId}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {isBn
                    ? 'আমাদের কর্পোরেট সচিবালয় ২৪ ঘণ্টার মধ্যে আপনার প্রদত্ত ফোন বা ইমেইলে যোগাযোগ করবে।'
                    : 'Our corporate liaison desk will follow up via your provided phone/email within 24 business hours.'}
                </p>
                <button
                  onClick={() => {
                    setTicketId(null);
                    setFormData({ name: '', phone: '', email: '', subject: 'membership', message: '' });
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded font-semibold cursor-pointer"
                >
                  {isBn ? 'আরেকটি বার্তা পাঠান' : 'Send Another Message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {isBn ? 'আপনার নাম *' : 'Your Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={isBn ? 'যেমন: মোহাম্মদ আরিফুর রহমান' : 'e.g. John Doe'}
                    className="w-full bg-[#020714] border border-slate-800 focus:border-amber-400 rounded-lg px-3.5 py-2.5 text-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      {isBn ? 'মোবাইল নম্বর *' : 'Mobile Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="01XXXXXXXXX"
                      className="w-full bg-[#020714] border border-slate-800 focus:border-amber-400 rounded-lg px-3.5 py-2.5 text-white outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      {isBn ? 'ইমেইল অ্যাড্রেস' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full bg-[#020714] border border-slate-800 focus:border-amber-400 rounded-lg px-3.5 py-2.5 text-white outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {isBn ? 'অনুসন্ধানের বিষয় *' : 'Inquiry Category *'}
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#020714] border border-slate-800 focus:border-amber-400 rounded-lg px-3 py-2.5 text-white outline-none cursor-pointer"
                  >
                    <option value="membership">{isBn ? 'নতুন সদস্যপদ ও শেয়ার ক্রয়' : 'New Membership & Shares'}</option>
                    <option value="supershop">{isBn ? 'সুপার শপ ফ্র্যাঞ্চাইজি ও আউটলেট' : 'Super Shop Franchise'}</option>
                    <option value="investment">{isBn ? 'এগ্রো ও মেগা প্রকল্প বিনিয়োগ' : 'Agro & Project Capital'}</option>
                    <option value="audit">{isBn ? 'আর্থিক বিবরণী ও অডিট সংক্রান্ত' : 'Financials & Audit Inquiries'}</option>
                    <option value="general">{isBn ? 'সাধারণ কর্পোরেট যোগাযোগ' : 'General Corporate Secretariat'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    {isBn ? 'আপনার বার্তা / প্রশ্ন *' : 'Your Detailed Inquiry *'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      isBn
                        ? 'আপনার প্রস্তাবনা বা প্রশ্ন বিস্তারিত লিখুন...'
                        : 'Describe your query or investment interest...'
                    }
                    className="w-full bg-[#020714] border border-slate-800 focus:border-amber-400 rounded-lg px-3.5 py-2.5 text-white outline-none resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold uppercase tracking-wider rounded-lg shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                >
                  {isBn ? 'বার্তা প্রেরণ করুন' : 'Submit Official Message'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Map Visual Strip */}
        <div className="bg-[#040e24] border border-amber-500/20 rounded-2xl overflow-hidden shadow-xl p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-base font-serif font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400">map</span>
                {isBn ? 'উত্তরা হেডকোয়ার্টার্স ও জোনাল ম্যাপ' : 'Uttara Headquarters Geographic Location'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {isBn ? 'ঢাকা-ময়মনসিংহ হাইওয়ে ও এয়ারপোর্ট সংলগ্ন সহজ যোগাযোগ' : 'Convenient access near Airport & Dhaka-Mymensingh Highway'}
              </p>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-amber-400 hover:underline font-semibold flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">open_in_new</span>
              {isBn ? 'গুগল ম্যাপে দেখুন' : 'Open in Google Maps'}
            </a>
          </div>

          <div className="rounded-xl overflow-hidden aspect-21/9 bg-slate-900 border border-slate-800">
            <img
              src={UTTARA_HQ_MAP_IMAGE}
              alt="Uttara Headquarters Map Location"
              className="w-full h-full object-cover filter brightness-90 hover:brightness-100 transition-all"
            />
          </div>
        </div>

        {/* Frequently Asked Questions (FAQ) */}
        <div className="bg-[#040e24] border border-amber-500/20 rounded-2xl p-6 sm:p-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400">FAQ & GUIDANCE</span>
            <h2 className="text-2xl font-serif font-bold text-white mt-1">
              {isBn ? 'সচরাচর জিজ্ঞাসিত প্রশ্নাবলী' : 'Frequently Asked Inquiries'}
            </h2>
            <p className="text-xs text-slate-400 mt-2">
              {isBn
                ? 'ইউনাইটি গ্রোথ গ্রুপের নীতিমালা, সদস্যপদ ও বিনিয়োগ নিরাপত্তা সম্পর্কিত সাধারণ জিজ্ঞাসা'
                : 'Fundamental governance, membership protocol, and investment security guidelines'}
            </p>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-[#020714] border border-slate-800 rounded-xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 text-left font-semibold text-sm flex items-center justify-between text-white hover:text-amber-300 cursor-pointer"
                  >
                    <span>{isBn ? faq.qBn : faq.qEn}</span>
                    <span
                      className={`material-symbols-outlined text-amber-400 transform transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3 animate-fadeIn">
                      {isBn ? faq.aBn : faq.aEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
