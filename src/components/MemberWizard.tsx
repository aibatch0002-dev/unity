import React, { useState } from 'react';
import { Language } from '../types';
import { toBanglaNumber } from '../data/mockData';

interface MemberWizardProps {
  language: Language;
  onComplete?: (trackingCode: string) => void;
}

export const MemberWizard: React.FC<MemberWizardProps> = ({ language, onComplete }) => {
  const isBn = language === 'bn';
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');

  // Form Fields State
  const [formData, setFormData] = useState({
    nameBn: '',
    nameEn: '',
    fatherOrHusband: '',
    motherName: '',
    photoPreview: '',
    occupation: isBn ? 'ব্যবসায়ী / শিল্পোদ্যোক্তা' : 'Business / Entrepreneur',
    designation: '',
    company: '',
    education: '',
    bio: '',
    phone: '',
    email: '',
    presentAddress: '',
    permanentAddress: '',
    membershipCategory: 'life',
    nomineeName: '',
    nomineeRelation: '',
    nomineeNid: '',
    nomineeShare: '100',
    referenceId: '',
    nidNumber: '',
    docFileName: '',
    agreed1: false,
    agreed2: false,
    agreed3: false,
  });

  const totalSteps = 7;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final submission
      const generatedCode = 'UGG-APP-2025-' + Math.floor(1000 + Math.random() * 9000);
      setTrackingCode(generatedCode);
      setSubmitted(true);
      if (onComplete) onComplete(generatedCode);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, photoPreview: url }));
    }
  };

  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, docFileName: file.name }));
    }
  };

  const stepLabelsBn = [
    'মৌলিক তথ্য',
    'পেশাগত তথ্য',
    'যোগাযোগ ও ঠিকানা',
    'ক্যাটাগরি নির্বাচন',
    'নমিনী ও তথ্য',
    'রেফারেন্স ও দলিল',
    'ঘোষণা ও সমাপ্তি',
  ];

  const stepLabelsEn = [
    'Basic Info',
    'Professional',
    'Contact',
    'Category',
    'Nominee',
    'Documents',
    'Declaration',
  ];

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 sm:p-12 text-[#131b2e] shadow-2xl border border-amber-500/30 text-center animate-in fade-in zoom-in-95">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <span className="material-symbols-outlined text-[44px]">verified</span>
        </div>

        <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-600">
          UGG SOVEREIGN MEMBERSHIP PROTOCOL
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#000514] mt-2 mb-3">
          {isBn ? 'আবেদন সফলভাবে গৃহীত হয়েছে' : 'Application Received Successfully'}
        </h2>
        <p className="max-w-lg mx-auto text-sm text-[#44474d] leading-relaxed mb-6">
          {isBn
            ? 'ইউনাইটি গ্রোথ গ্রুপের নির্বাহী পর্ষদের কাছে আপনার সদস্যপদ আবেদন ও যাচাইকরণ তথ্য সুরক্ষিতভাবে দাখিল হয়েছে। আগামী ৩ কার্যদিবসের মধ্যে সচিবালয় থেকে আপনার সাথে যোগাযোগ করা হবে।'
            : 'Your membership application has been securely transmitted to the executive secretariat for verification. Our accreditation officer will reach out within 3 business days.'}
        </p>

        <div className="bg-[#f2f3ff] p-6 rounded-xl max-w-md mx-auto border border-[#eaedff] mb-8">
          <span className="text-xs text-[#75777e] font-mono block mb-1">
            {isBn ? 'ইউনিক আবেদন ট্র্যাকিং কোড' : 'Unique Application Tracking ID'}
          </span>
          <span className="font-mono text-2xl font-bold text-[#000514] tracking-wider select-all">
            {trackingCode}
          </span>
          <p className="text-[11px] text-[#75777e] mt-2">
            {isBn
              ? 'কোডটি সংরক্ষণ করুন। লগইন এবং আবেদন ট্র্যাকিং-এ এই কোডটি প্রযোজ্য হবে।'
              : 'Save this verification code to track your application status anytime.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-6 py-2.5 rounded bg-[#000514] text-white text-xs font-bold hover:bg-[#0d1e3a] transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>{isBn ? 'একনলেজমেন্ট স্লিপ প্রিন্ট' : 'Print Slip'}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setCurrentStep(1);
            }}
            className="px-6 py-2.5 rounded bg-[#eaedff] text-[#000514] text-xs font-bold hover:bg-[#dae2fd] transition-all cursor-pointer"
          >
            <span>{isBn ? 'নতুন আবেদন ফরম' : 'New Form'}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-amber-500/30 overflow-hidden text-[#131b2e]">
      {/* Step Stepper Header Strip */}
      <div className="bg-[#040e24] p-4 sm:p-6 text-white border-b border-amber-500/20">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-300">
              {isBn ? 'ধাপভিত্তিক সদস্য নিবন্ধন' : 'Official 7-Step Enrollment'}
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {isBn
              ? `ধাপ ${toBanglaNumber(currentStep)} / ${toBanglaNumber(totalSteps)}`
              : `Step ${currentStep} of ${totalSteps}`}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 rounded-full h-2 mb-6 overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-500 to-amber-300 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>

        {/* Desktop Stepper Dots */}
        <div className="hidden lg:grid grid-cols-7 gap-2">
          {Array.from({ length: totalSteps }).map((_, idx) => {
            const stepNum = idx + 1;
            const isCompleted = stepNum < currentStep;
            const isCurrent = stepNum === currentStep;

            return (
              <div
                key={idx}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-lg transition-all text-center ${
                  isCurrent
                    ? 'bg-white/10 border border-amber-400/40'
                    : isCompleted
                    ? 'opacity-80'
                    : 'opacity-40'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                    isCompleted
                      ? 'bg-amber-400 text-slate-950'
                      : isCurrent
                      ? 'bg-white text-slate-950'
                      : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {isCompleted ? '✓' : isBn ? toBanglaNumber(stepNum) : stepNum}
                </div>
                <span className="text-[11px] font-sans truncate w-full">
                  {isBn ? stepLabelsBn[idx] : stepLabelsEn[idx]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content Body */}
      <div className="p-6 sm:p-8 md:p-10">
        {/* STEP 1: Basic Personal Info */}
        {currentStep === 1 && (
          <div className="flex flex-col gap-6 animate-in fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-[#eaedff]">
              <div>
                <h3 className="font-serif text-lg md:text-xl text-[#000514] font-bold">
                  {isBn ? 'ধাপ ১: ব্যক্তিগত মৌলিক তথ্য' : 'Step 1: Basic Personal Information'}
                </h3>
                <p className="text-xs text-[#75777e] mt-0.5">
                  {isBn
                    ? 'জাতীয় পরিচয়পত্র বা পাসপোর্টের বিবরণ অনুযায়ী নির্ভুলভাবে পূরণ করুন।'
                    : 'Fill accurately as per your official NID or Passport.'}
                </p>
              </div>
              <span className="text-xs bg-[#ffe08b] text-[#735a00] font-bold px-3 py-1 rounded font-mono">
                {isBn ? 'ধাপ ১ / ৭' : 'Step 1 of 7'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#131b2e]">
                  {isBn ? 'পূর্ণ নাম (বাংলায়)' : 'Full Name (in Bengali)'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.nameBn}
                  onChange={(e) => setFormData({ ...formData, nameBn: e.target.value })}
                  placeholder={isBn ? 'উদাহরণ: মোঃ হাফিজুর রহমান' : 'Example: মোঃ হাফিজুর রহমান'}
                  className="px-4 py-3 bg-[#f2f3ff] rounded text-sm text-[#131b2e] focus:outline-none focus:bg-[#eaedff]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#131b2e]">
                  {isBn ? 'পূর্ণ নাম (ইংরেজিতে NID/Passport অনুযায়ী)' : 'Full Name (English as per NID/Passport)'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.nameEn}
                  onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                  placeholder="Example: Md. Hafizur Rahman"
                  className="px-4 py-3 bg-[#f2f3ff] rounded text-sm text-[#131b2e] focus:outline-none focus:bg-[#eaedff]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#131b2e]">
                  {isBn ? 'পিতা/স্বামীর নাম' : "Father / Husband's Name"} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fatherOrHusband}
                  onChange={(e) => setFormData({ ...formData, fatherOrHusband: e.target.value })}
                  placeholder={isBn ? 'পিতার বা স্বামীর নাম' : "Father's or Husband's Name"}
                  className="px-4 py-3 bg-[#f2f3ff] rounded text-sm text-[#131b2e] focus:outline-none focus:bg-[#eaedff]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#131b2e]">
                  {isBn ? 'মাতার নাম' : "Mother's Name"} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.motherName}
                  onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                  placeholder={isBn ? 'মাতার নাম' : "Mother's Name"}
                  className="px-4 py-3 bg-[#f2f3ff] rounded text-sm text-[#131b2e] focus:outline-none focus:bg-[#eaedff]"
                />
              </div>

              {/* Photo Upload Component */}
              <div className="md:col-span-2 flex flex-col sm:flex-row items-center gap-6 p-6 bg-[#f2f3ff] rounded-xl border border-[#eaedff]">
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center overflow-hidden border border-[#eaedff] shadow-sm flex-shrink-0">
                  {formData.photoPreview ? (
                    <img
                      src={formData.photoPreview}
                      alt="Uploaded Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="material-symbols-outlined text-[#75777e] text-[40px]">
                      account_circle
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1 flex-grow text-center sm:text-left">
                  <span className="text-sm font-bold text-[#131b2e]">
                    {isBn ? 'আনুষ্ঠানিক পাসপোর্ট সাইজ ছবি আপলোড করুন' : 'Upload Official Passport-Size Photograph'}
                  </span>
                  <span className="text-xs text-[#75777e]">
                    {isBn
                      ? 'পাসপোর্ট সাইজ রঙিন ছবি (সর্বোচ্চ ৩ মেগাবাইট, JPG/PNG ফরম্যাট)। পরিষ্কার ব্যাকগ্রাউন্ড আবশ্যক।'
                      : 'Color portrait photo (Max 3MB, JPG/PNG). High resolution with neutral background.'}
                  </span>
                  <div className="pt-2">
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#000514] text-white text-xs font-bold rounded cursor-pointer hover:bg-[#0d1e3a] transition-colors shadow-sm">
                      <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
                      <span>{isBn ? 'ছবি নির্বাচন করুন' : 'Select Photo'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoUpload}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Professional Information */}
        {currentStep === 2 && (
          <div className="flex flex-col gap-6 animate-in fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-[#eaedff]">
              <div>
                <h3 className="font-serif text-lg md:text-xl text-[#000514] font-bold">
                  {isBn ? 'ধাপ ২: পেশাগত তথ্য ও শিক্ষাগত যোগ্যতা' : 'Step 2: Professional & Educational Background'}
                </h3>
                <p className="text-xs text-[#75777e] mt-0.5">
                  {isBn ? 'আপনার বর্তমান কর্মক্ষেত্র ও অভিজ্ঞতার বিবরণ প্রদান করুন।' : 'Provide details regarding your current occupation and qualifications.'}
                </p>
              </div>
              <span className="text-xs bg-[#ffe08b] text-[#735a00] font-bold px-3 py-1 rounded font-mono">
                {isBn ? 'ধাপ ২ / ৭' : 'Step 2 of 7'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#131b2e]">
                  {isBn ? 'পেশা / কর্মসংস্থান ক্ষেত্র' : 'Profession / Industry Sector'} <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  className="px-4 py-3 bg-[#f2f3ff] rounded text-sm text-[#131b2e] focus:outline-none focus:bg-[#eaedff]"
                >
                  <option>{isBn ? 'ব্যবসায়ী / শিল্পোদ্যোক্তা' : 'Business / Entrepreneur'}</option>
                  <option>{isBn ? 'কর্পোরেট কর্মকর্তা / নির্বাহী' : 'Corporate Executive'}</option>
                  <option>{isBn ? 'ব্যাংকার / অর্থ পরামর্শক' : 'Banking & Finance'}</option>
                  <option>{isBn ? 'তথ্যপ্রযুক্তি পেশাজীবী' : 'IT & Software Professional'}</option>
                  <option>{isBn ? 'চিকিৎসক / স্বাস্থ্যসেবা' : 'Doctor / Healthcare'}</option>
                  <option>{isBn ? 'আইনজীবী / আইন উপদেষ্টা' : 'Lawyer / Legal Counsel'}</option>
                  <option>{isBn ? 'শিক্ষাবিদ / গবেষক' : 'Academic / Researcher'}</option>
                  <option>{isBn ? 'অন্যান্য' : 'Other'}</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#131b2e]">
                  {isBn ? 'পদবী / Designation' : 'Designation / Title'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  placeholder={isBn ? 'যেমন: Managing Director / Senior Manager' : 'e.g., Managing Director / Senior Manager'}
                  className="px-4 py-3 bg-[#f2f3ff] rounded text-sm text-[#131b2e] focus:outline-none focus:bg-[#eaedff]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#131b2e]">
                  {isBn ? 'বর্তমান প্রতিষ্ঠান / কোম্পানির নাম' : 'Current Organization / Company'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder={isBn ? 'প্রতিষ্ঠানের নাম' : 'Organization Name'}
                  className="px-4 py-3 bg-[#f2f3ff] rounded text-sm text-[#131b2e] focus:outline-none focus:bg-[#eaedff]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#131b2e]">
                  {isBn ? 'সর্বোচ্চ শিক্ষাগত যোগ্যতা' : 'Highest Educational Qualification'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  placeholder={isBn ? 'যেমন: MBA, B.Sc in CSE, Masters' : 'e.g., MBA, B.Sc in Engg, Masters'}
                  className="px-4 py-3 bg-[#f2f3ff] rounded text-sm text-[#131b2e] focus:outline-none focus:bg-[#eaedff]"
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#131b2e]">
                  {isBn ? 'পেশাগত সংক্ষিপ্ত পরিচিতি (সদস্য প্রোফাইলে যুক্ত হবে)' : 'Professional Bio (Appears on sovereign directory)'}
                </label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder={isBn ? 'আপনার পেশাগত অর্জন, বিশেষ দক্ষতা ও অভিজ্ঞতা সম্পর্কে সংক্ষেপে লিখুন...' : 'Brief summary of key leadership achievements and expertise...'}
                  className="px-4 py-3 bg-[#f2f3ff] rounded text-sm text-[#131b2e] focus:outline-none focus:bg-[#eaedff]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Contact & Address */}
        {currentStep === 3 && (
          <div className="flex flex-col gap-6 animate-in fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-[#eaedff]">
              <div>
                <h3 className="font-serif text-lg md:text-xl text-[#000514] font-bold">
                  {isBn ? 'ধাপ ৩: যোগাযোগ ও ঠিকানা যাচাই' : 'Step 3: Contact & Address Verification'}
                </h3>
                <p className="text-xs text-[#75777e] mt-0.5">
                  {isBn ? 'জরুরি নোটিশ এবং অফিসিয়াল যোগাযোগের জন্য সুরক্ষিত যোগাযোগ তথ্য।' : 'Secure coordinates for legal notices, OTPs, and statutory communication.'}
                </p>
              </div>
              <span className="text-xs bg-[#ffe08b] text-[#735a00] font-bold px-3 py-1 rounded font-mono">
                {isBn ? 'ধাপ ৩ / ৭' : 'Step 3 of 7'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#131b2e]">
                  {isBn ? 'অফিসিয়াল মোবাইল নম্বর (OTP যাচাইয়ের জন্য)' : 'Official Mobile Number (For OTP Verification)'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+880 1XXXXXXXXX"
                  className="px-4 py-3 bg-[#f2f3ff] rounded text-sm text-[#131b2e] focus:outline-none focus:bg-[#eaedff] font-mono"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#131b2e]">
                  {isBn ? 'ইমেইল ঠিকানা (Login Credential)' : 'Email Address (Login Credential)'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="example@domain.com"
                  className="px-4 py-3 bg-[#f2f3ff] rounded text-sm text-[#131b2e] focus:outline-none focus:bg-[#eaedff] font-mono"
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#131b2e]">
                  {isBn ? 'বর্তমান আবাসিক ঠিকানা' : 'Current Residential Address'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.presentAddress}
                  onChange={(e) => setFormData({ ...formData, presentAddress: e.target.value })}
                  placeholder={isBn ? 'বাড়ি/ফ্ল্যাট নম্বর, রোড, এলাকা, থানা, জেলা' : 'House/Flat No, Road, Area, Police Station, District'}
                  className="px-4 py-3 bg-[#f2f3ff] rounded text-sm text-[#131b2e] focus:outline-none focus:bg-[#eaedff]"
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#131b2e]">
                  {isBn ? 'স্থায়ী ঠিকানা (জাতীয় পরিচয়পত্র অনুযায়ী)' : 'Permanent Address (As per NID)'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.permanentAddress}
                  onChange={(e) => setFormData({ ...formData, permanentAddress: e.target.value })}
                  placeholder={isBn ? 'গ্রাম/মহল্লা, ডাকঘর, উপজেলা, জেলা' : 'Village, Post Office, Upazila, District'}
                  className="px-4 py-3 bg-[#f2f3ff] rounded text-sm text-[#131b2e] focus:outline-none focus:bg-[#eaedff]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Category & Investment Tier */}
        {currentStep === 4 && (
          <div className="flex flex-col gap-6 animate-in fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-[#eaedff]">
              <div>
                <h3 className="font-serif text-lg md:text-xl text-[#000514] font-bold">
                  {isBn ? 'ধাপ ৪: সদস্যপদ ক্যাটাগরি ও শেয়ার অংশীদারিত্ব' : 'Step 4: Membership Tier & Equity Class'}
                </h3>
                <p className="text-xs text-[#75777e] mt-0.5">
                  {isBn ? 'ইউনাইটি গ্রোথ গ্রুপে আপনার প্রার্থিত সদস্য পদের ধরন নির্বাচন করুন।' : 'Select your desired membership tier and equity entitlement.'}
                </p>
              </div>
              <span className="text-xs bg-[#ffe08b] text-[#735a00] font-bold px-3 py-1 rounded font-mono">
                {isBn ? 'ধাপ ৪ / ৭' : 'Step 4 of 7'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Option 1: General */}
              <label
                className={`p-5 rounded-xl cursor-pointer transition-all flex flex-col justify-between border-2 ${
                  formData.membershipCategory === 'general'
                    ? 'border-[#745b00] bg-white shadow-md'
                    : 'border-transparent bg-[#f2f3ff] hover:bg-[#eaedff]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <input
                      type="radio"
                      name="membershipCategory"
                      value="general"
                      checked={formData.membershipCategory === 'general'}
                      onChange={() => setFormData({ ...formData, membershipCategory: 'general' })}
                      className="w-4 h-4 text-[#000514]"
                    />
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#eaedff]">
                      {isBn ? 'ক্যাটাগরি-এ' : 'Tier A'}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#000514]">
                    {isBn ? 'সাধারণ সদস্য' : 'General Member'}
                  </h4>
                  <p className="text-xs text-[#44474d] mt-2 leading-relaxed">
                    {isBn
                      ? 'নিয়মিত মাসিক সঞ্চয় ও ব্যবসা প্রকল্পে সীমিত শেয়ার অংশীদারিত্বের সুযোগ।'
                      : 'Regular monthly cooperative savings and baseline commercial venture share rights.'}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#eaedff]">
                  <span className="text-xs font-bold text-[#000514]">
                    {isBn ? 'প্রবেশ ফি: ৫,০০০ টাকা' : 'Entry Fee: BDT 5,000'}
                  </span>
                </div>
              </label>

              {/* Option 2: Life Member */}
              <label
                className={`p-5 rounded-xl cursor-pointer transition-all flex flex-col justify-between border-2 ${
                  formData.membershipCategory === 'life'
                    ? 'border-[#745b00] bg-white shadow-md'
                    : 'border-transparent bg-[#f2f3ff] hover:bg-[#eaedff]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <input
                      type="radio"
                      name="membershipCategory"
                      value="life"
                      checked={formData.membershipCategory === 'life'}
                      onChange={() => setFormData({ ...formData, membershipCategory: 'life' })}
                      className="w-4 h-4 text-[#000514]"
                    />
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#ffe08b] text-[#735a00]">
                      {isBn ? 'জনপ্রিয়' : 'Most Popular'}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#000514]">
                    {isBn ? 'আজীবন সদস্য' : 'Life Member (Sovereign)'}
                  </h4>
                  <p className="text-xs text-[#44474d] mt-2 leading-relaxed">
                    {isBn
                      ? 'আজীবন ভোট প্রদান অধিকার, বিশেষ প্রকল্প সমূহে অগ্রাধিকার ইকুইটি ও সর্বোচ্চ লভ্যাংশ বণ্টন।'
                      : 'Permanent voting franchise, priority project allocation, and highest statutory dividend yield.'}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#eaedff]">
                  <span className="text-xs font-bold text-[#000514]">
                    {isBn ? 'প্রবেশ ফি: ৫০,০০০ টাকা' : 'Entry Fee: BDT 50,000'}
                  </span>
                </div>
              </label>

              {/* Option 3: Advisor */}
              <label
                className={`p-5 rounded-xl cursor-pointer transition-all flex flex-col justify-between border-2 ${
                  formData.membershipCategory === 'advisor'
                    ? 'border-[#745b00] bg-white shadow-md'
                    : 'border-transparent bg-[#f2f3ff] hover:bg-[#eaedff]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <input
                      type="radio"
                      name="membershipCategory"
                      value="advisor"
                      checked={formData.membershipCategory === 'advisor'}
                      onChange={() => setFormData({ ...formData, membershipCategory: 'advisor' })}
                      className="w-4 h-4 text-[#000514]"
                    />
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#dae2fd]">
                      {isBn ? 'বিশেষায়িত' : 'Advisory Tier'}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#000514]">
                    {isBn ? 'উপদেষ্টা / প্রাতিষ্ঠানিক' : 'Advisory / Institutional'}
                  </h4>
                  <p className="text-xs text-[#44474d] mt-2 leading-relaxed">
                    {isBn
                      ? 'অভিজ্ঞ পেশাজীবীদের জন্য নীতিনির্ধারণী ভূমিকা এবং কৌশলগত ব্যবসায়িক পরামর্শ পরিষদ।'
                      : 'Fiduciary policy stewardship, corporate partnership syndicates, and executive board consultation.'}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#eaedff]">
                  <span className="text-xs font-bold text-[#000514]">
                    {isBn ? 'আমন্ত্রণ / পর্ষদ অনুমোদন' : 'By Board Invitation'}
                  </span>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* STEP 5: Nominee Details */}
        {currentStep === 5 && (
          <div className="flex flex-col gap-6 animate-in fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-[#eaedff]">
              <div>
                <h3 className="font-serif text-lg md:text-xl text-[#000514] font-bold">
                  {isBn ? 'ধাপ ৫: মনোনীত উত্তরসূরি (নমিনী) সংক্রান্ত তথ্য' : 'Step 5: Nominee / Beneficiary Details'}
                </h3>
                <p className="text-xs text-[#75777e] mt-0.5">
                  {isBn
                    ? 'আইনি শর্তানুযায়ী আপনার সঞ্চয় ও শেয়ারের মনোনীত উত্তরাধিকারীর তথ্য দিন।'
                    : 'Statutory beneficiary credentials for equity share and deposit preservation.'}
                </p>
              </div>
              <span className="text-xs bg-[#ffe08b] text-[#735a00] font-bold px-3 py-1 rounded font-mono">
                {isBn ? 'ধাপ ৫ / ৭' : 'Step 5 of 7'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#131b2e]">
                  {isBn ? 'নমিনীর পূর্ণ নাম' : "Nominee's Full Name"} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.nomineeName}
                  onChange={(e) => setFormData({ ...formData, nomineeName: e.target.value })}
                  placeholder={isBn ? 'নমিনীর নাম' : "Nominee's Legal Name"}
                  className="px-4 py-3 bg-[#f2f3ff] rounded text-sm text-[#131b2e] focus:outline-none focus:bg-[#eaedff]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#131b2e]">
                  {isBn ? 'আবেদনকারীর সাথে সম্পর্ক' : 'Relationship with Applicant'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.nomineeRelation}
                  onChange={(e) => setFormData({ ...formData, nomineeRelation: e.target.value })}
                  placeholder={isBn ? 'যেমন: স্ত্রী / স্বামী / পুত্র / কন্যা / পিতা / মাতা' : 'e.g., Spouse / Son / Daughter / Parent'}
                  className="px-4 py-3 bg-[#f2f3ff] rounded text-sm text-[#131b2e] focus:outline-none focus:bg-[#eaedff]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#131b2e]">
                  {isBn ? 'নমিনীর জাতীয় পরিচয়পত্র / জন্মনিবন্ধন নম্বর' : "Nominee's NID / Birth Certificate No"} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.nomineeNid}
                  onChange={(e) => setFormData({ ...formData, nomineeNid: e.target.value })}
                  placeholder={isBn ? 'NID বা জন্মনিবন্ধন নম্বর' : '10 or 17-digit National ID / Birth Reg'}
                  className="px-4 py-3 bg-[#f2f3ff] rounded text-sm text-[#131b2e] focus:outline-none focus:bg-[#eaedff] font-mono"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#131b2e]">
                  {isBn ? 'অংশীদারিত্ব হার (%)' : 'Share Entitlement (%)'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={formData.nomineeShare}
                  onChange={(e) => setFormData({ ...formData, nomineeShare: e.target.value })}
                  className="px-4 py-3 bg-[#f2f3ff] rounded text-sm text-[#131b2e] focus:outline-none focus:bg-[#eaedff] font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: References & Verification Documents */}
        {currentStep === 6 && (
          <div className="flex flex-col gap-6 animate-in fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-[#eaedff]">
              <div>
                <h3 className="font-serif text-lg md:text-xl text-[#000514] font-bold">
                  {isBn ? 'ধাপ ৬: রেফারেন্স কোড ও জাতীয় পরিচয়পত্র আপলোড' : 'Step 6: Referral Code & Document Verification'}
                </h3>
                <p className="text-xs text-[#75777e] mt-0.5">
                  {isBn ? 'ইউজিজি-এর বর্তমান কোনো সদস্যের রেফারেন্স থাকলে তার কোড যুক্ত করুন।' : 'Add existing member recommendation and upload identity documents.'}
                </p>
              </div>
              <span className="text-xs bg-[#ffe08b] text-[#735a00] font-bold px-3 py-1 rounded font-mono">
                {isBn ? 'ধাপ ৬ / ৭' : 'Step 6 of 7'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#131b2e]">
                  {isBn ? 'রেফারেন্স প্রদানকারী সদস্যের আইডি (ঐচ্ছিক)' : 'Referring Member ID (Optional)'}
                </label>
                <input
                  type="text"
                  value={formData.referenceId}
                  onChange={(e) => setFormData({ ...formData, referenceId: e.target.value })}
                  placeholder="e.g. UGG-M-1001"
                  className="px-4 py-3 bg-[#f2f3ff] rounded text-sm text-[#131b2e] focus:outline-none focus:bg-[#eaedff] font-mono"
                />
                <span className="text-[11px] text-[#75777e]">
                  {isBn ? 'সরাসরি পরিচালকমণ্ডলী কর্তৃক রেফারকৃত হলে অগ্রাধিকার ভিত্তিতে অনুমোদিত হবে।' : 'Priority processing applies to candidates backed by founding board members.'}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#131b2e]">
                  {isBn ? 'আবেদনকারীর NID নম্বর (গোপনীয় থাকবে)' : 'Applicant NID Number (Secure & Encrypted)'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.nidNumber}
                  onChange={(e) => setFormData({ ...formData, nidNumber: e.target.value })}
                  placeholder={isBn ? '১০ বা ১৭ ডিজিটের এনআইডি নম্বর' : '10 or 17 digit NID number'}
                  className="px-4 py-3 bg-[#f2f3ff] rounded text-sm text-[#131b2e] focus:outline-none focus:bg-[#eaedff] font-mono"
                />
              </div>

              <div className="md:col-span-2 p-6 bg-[#f2f3ff] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#eaedff]">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-[32px] text-[#000514]">badge</span>
                  <div>
                    <span className="text-sm font-bold text-[#131b2e]">
                      {isBn ? 'জাতীয় পরিচয়পত্র / পাসপোর্ট স্ক্যান কপি' : 'Official NID / Passport Scanned Copy'}
                    </span>
                    <p className="text-xs text-[#75777e]">
                      {formData.docFileName
                        ? `${isBn ? 'আপলোডকৃত:' : 'Uploaded:'} ${formData.docFileName}`
                        : isBn
                        ? 'উভয় পৃষ্ঠার স্পষ্ট স্ক্যান অথবা পিডিএফ ফাইল (সর্বোচ্চ ৫ মেগাবাইট)'
                        : 'Both sides scan or PDF document (Max 5MB)'}
                    </p>
                  </div>
                </div>

                <label className="px-4 py-2 bg-white hover:bg-[#eaedff] text-[#000514] text-xs font-bold rounded border border-[#c5c6ce] cursor-pointer shadow-sm transition-all">
                  <span>{isBn ? 'ফাইল সিলেক্ট করুন' : 'Choose File'}</span>
                  <input type="file" className="hidden" onChange={handleDocUpload} />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: Consent Declaration & Submission */}
        {currentStep === 7 && (
          <div className="flex flex-col gap-6 animate-in fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-[#eaedff]">
              <div>
                <h3 className="font-serif text-lg md:text-xl text-[#000514] font-bold">
                  {isBn ? 'ধাপ ৭: ঘোষণাপত্র ও সম্মতিপত্র' : 'Step 7: Sovereign Covenant & Consent'}
                </h3>
                <p className="text-xs text-[#75777e] mt-0.5">
                  {isBn ? 'আবেদন সাবমিট করার পূর্বে শর্তাবলী ও শৃঙ্খলা নীতিমালা নিশ্চিত করুন।' : 'Ratify statutory terms and constitutional covenants before submission.'}
                </p>
              </div>
              <span className="text-xs bg-[#ffe08b] text-[#735a00] font-bold px-3 py-1 rounded font-mono">
                {isBn ? 'ধাপ ৭ / ৭' : 'Step 7 of 7'}
              </span>
            </div>

            <div className="p-5 bg-[#f2f3ff] rounded-xl space-y-3.5 border border-[#eaedff]">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreed1}
                  onChange={(e) => setFormData({ ...formData, agreed1: e.target.checked })}
                  className="mt-1 w-4 h-4 text-[#000514] rounded"
                />
                <span className="text-xs text-[#131b2e] leading-relaxed">
                  {isBn
                    ? 'আমি প্রত্যয়ন করছি যে উপরে প্রদত্ত যাবতীয় ব্যক্তিগত, পেশাগত ও যোগাযোগের তথ্য সম্পূর্ণ সত্য এবং সঠিক।'
                    : 'I solemnly declare and certify that all credentials, vocational declarations, and contact data provided above are true and complete.'}
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreed2}
                  onChange={(e) => setFormData({ ...formData, agreed2: e.target.checked })}
                  className="mt-1 w-4 h-4 text-[#000514] rounded"
                />
                <span className="text-xs text-[#131b2e] leading-relaxed">
                  {isBn
                    ? 'আমি ইউনাইটি গ্রোথ গ্রুপ (UGG)-এর সমবায় অর্থনৈতিক শৃঙ্খলা বিধিমালা ও সাধারণ আইন মেনে চলতে বাধ্য থাকিব।'
                    : 'I covenant to uphold the cooperative governance laws, ethical codes, and constitution of Unity Growth Group (UGG).'}
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreed3}
                  onChange={(e) => setFormData({ ...formData, agreed3: e.target.checked })}
                  className="mt-1 w-4 h-4 text-[#000514] rounded"
                />
                <span className="text-xs text-[#131b2e] leading-relaxed">
                  {isBn
                    ? 'আমি সচেতন যে আমার পাবলিক ডিরেক্টরি প্রোফাইলে কেবলমাত্র ছবি, নাম, পদবী ও পেশাগত অবদান প্রদর্শিত হবে এবং সংবেদনশীল তথ্য সম্পূর্ণ গোপন রাখা হবে।'
                    : 'I understand that only my photograph, name, designation, and public accomplishments will be visible on the member roster while sensitive financial data remains encrypted.'}
                </span>
              </label>
            </div>

            <div className="p-4 bg-[#fcd358]/20 rounded-lg flex items-center gap-3 border border-[#fcd358]/40">
              <span className="material-symbols-outlined text-[#745b00] text-[24px]">info</span>
              <p className="text-xs text-[#131b2e] leading-relaxed">
                {isBn ? (
                  <>
                    আবেদন জমা দেওয়ার পর কেন্দ্রীয় পরিচালনা পর্ষদ কর্তৃক ৩ কার্যদিবসের মধ্যে আপনার প্রদত্ত নম্বরে একটি বিশেষ <strong>ট্র্যাকিং নম্বর</strong> পাঠানো হবে।
                  </>
                ) : (
                  <>
                    Upon submission, your application will be reviewed by the central board within 3 business days, and official <strong>SMS verification</strong> will follow.
                  </>
                )}
              </p>
            </div>
          </div>
        )}

        {/* Action Button Strip */}
        <div className="pt-8 border-t border-[#eaedff] flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="px-5 py-2.5 rounded bg-[#eaedff] hover:bg-[#dae2fd] text-[#000514] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
              <span>{isBn ? 'পূর্ববর্তী ধাপ' : 'Previous Step'}</span>
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={handleNext}
            className={`px-6 py-2.5 rounded text-xs font-bold flex items-center gap-2 transition-all shadow-sm cursor-pointer ${
              currentStep === totalSteps
                ? 'bg-[#745b00] text-white hover:bg-[#fcd358] hover:text-[#735a00] shadow-md'
                : 'bg-[#000514] text-white hover:bg-[#0d1e3a]'
            }`}
          >
            <span>
              {currentStep === totalSteps
                ? isBn
                  ? 'আবেদনপত্র নিশ্চিত করুন ও জমা দিন'
                  : 'Confirm & Submit Application'
                : isBn
                ? 'পরবর্তী ধাপ'
                : 'Next Step'}
            </span>
            <span className="material-symbols-outlined text-[16px]">
              {currentStep === totalSteps ? 'send' : 'chevron_right'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
