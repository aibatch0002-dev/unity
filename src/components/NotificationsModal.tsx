import React from 'react';
import { Language } from '../types';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  if (!isOpen) return null;

  const isBn = language === 'bn';

  const notifications = [
    {
      id: 1,
      titleBn: 'Q1 লভ্যাংশ বণ্টন সম্পন্ন',
      titleEn: 'Q1 Dividend Disbursed',
      timeBn: '১০ মিনিট আগে',
      timeEn: '10 minutes ago',
      descBn: 'সম্মানিত সদস্যদের অ্যাকাউন্টে প্রথম প্রান্তিকের লভ্যাংশ সফলভাবে জমা হয়েছে।',
      descEn: 'First quarter dividends have been successfully credited to verified member bank accounts.',
      icon: 'payments',
      type: 'dividend',
    },
    {
      id: 2,
      titleBn: 'বগুড়া প্রকল্প পরিদর্শন সফর',
      titleEn: 'Bogura Project Site Inspection',
      timeBn: '২ ঘণ্টা আগে',
      timeEn: '2 hours ago',
      descBn: 'আসন্ন ২২-২৪ ফেব্রুয়ারি প্রকল্প সাইট ভিজিটের আসন সংখ্যা সীমিত। সদস্য হাব থেকে নিবন্ধন করুন।',
      descEn: 'Limited seats available for the upcoming Feb 22-24 project inspection tour. RSVP in Member Hub.',
      icon: 'calendar_month',
      type: 'event',
    },
    {
      id: 3,
      titleBn: 'নতুন অডিট রিপোর্ট প্রকাশ',
      titleEn: 'Annual Statutory Audit Released',
      timeBn: '১ দিন আগে',
      timeEn: '1 day ago',
      descBn: '২০২৩-২৪ অর্থবর্ষের সংবিধিবদ্ধ নিরীক্ষা প্রতিবেদন উন্মুক্ত করা হয়েছে।',
      descEn: 'The certified independent financial audit report for FY 2023-24 has been published in the repository.',
      icon: 'verified',
      type: 'audit',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 pt-16 bg-[#000514]/40 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm border border-[#eaedff] overflow-hidden animate-in fade-in slide-in-from-top-2">
        <div className="p-4 bg-[#0d1e3a] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#fcd358]">
              notifications
            </span>
            <span className="font-serif font-bold text-sm">
              {isBn ? 'বিজ্ঞপ্তি ও নোটিফিকেশন' : 'Official Notifications'}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#b7c7eb] hover:text-white"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="divide-y divide-[#eaedff] max-h-80 overflow-y-auto">
          {notifications.map((n) => (
            <div key={n.id} className="p-4 hover:bg-[#f2f3ff] transition-colors flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#eaedff] text-[#000514] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[18px]">{n.icon}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#000514]">
                    {isBn ? n.titleBn : n.titleEn}
                  </span>
                  <span className="text-[10px] text-[#75777e]">
                    {isBn ? n.timeBn : n.timeEn}
                  </span>
                </div>
                <p className="text-xs text-[#44474d] leading-relaxed mt-1">
                  {isBn ? n.descBn : n.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 bg-[#f2f3ff] text-center border-t border-[#eaedff]">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-[#745b00] hover:underline"
          >
            {isBn ? 'সবগুলো পঠিত হিসেবে চিহ্নিত করুন' : 'Mark all as read'}
          </button>
        </div>
      </div>
    </div>
  );
};
