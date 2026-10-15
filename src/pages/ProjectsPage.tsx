import React, { useState, useEffect } from 'react';
import { PageRoute, Language, Project } from '../types';
import { projectsData } from '../data/mockData';

interface ProjectsPageProps {
  onNavigate: (route: PageRoute) => void;
  language: Language;
}

const PRESET_PROJECT_IMAGES = [
  {
    labelBn: 'আধুনিক কোল্ড স্টোরেজ হাব',
    labelEn: 'Modern Cold Storage Hub',
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    labelBn: 'অ্যাগ্রো গ্রিনহাউস পার্ক',
    labelEn: 'Agro Greenhouse Park',
    url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1200&auto=format&fit=crop',
  },
  {
    labelBn: 'স্মার্ট ডেইরি ও পোল্ট্রি ফার্ম',
    labelEn: 'Smart Dairy & Agro Farm',
    url: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=1200&auto=format&fit=crop',
  },
  {
    labelBn: 'সুপারশপ রিটেইল চেইন',
    labelEn: 'Super Shop Retail Chain',
    url: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=1200&auto=format&fit=crop',
  },
  {
    labelBn: 'সাপ্লাই চেইন ও কোল্ড ভ্যান ফ্লিট',
    labelEn: 'Supply Chain & Cold Van Fleet',
    url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1200&auto=format&fit=crop',
  },
];

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate, language }) => {
  const isBn = language === 'bn';

  const [filter, setFilter] = useState<'all' | 'ongoing' | 'completed' | 'proposed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [proposalSuccess, setProposalSuccess] = useState(false);

  const [customProjectImages, setCustomProjectImages] = useState<{ [id: string]: string }>(() => {
    try {
      const saved = localStorage.getItem('ugg_custom_project_images');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      p3: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
    };
  });

  const [imageModalProjectId, setImageModalProjectId] = useState<string | null>(null);
  const [customUrlInput, setCustomUrlInput] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('ugg_custom_project_images', JSON.stringify(customProjectImages));
    } catch {
      // ignore
    }
  }, [customProjectImages]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && imageModalProjectId) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (result) {
          setCustomProjectImages((prev) => ({
            ...prev,
            [imageModalProjectId]: result,
          }));
          setImageModalProjectId(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredProjects = projectsData.filter((project) => {
    const matchesFilter = filter === 'all' || project.category === filter;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      project.titleBn.toLowerCase().includes(query) ||
      (project.titleEn && project.titleEn.toLowerCase().includes(query)) ||
      project.sectorBn.toLowerCase().includes(query) ||
      project.code.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full">
      {/* Top Sovereign Header / Metric Strip */}
      <section className="relative w-full bg-[#f2f3ff] px-6 lg:px-12 py-10 overflow-hidden border-b border-[#eaedff]">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="flex flex-col gap-2 max-w-3xl">
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#745b00]"></span>
                <span className="text-[11px] uppercase tracking-widest text-[#745b00] font-bold">
                  {isBn
                    ? 'কমিউনিটি ইনভেস্টমেন্ট পোর্টফোলিও • CAPITAL ALLOCATION'
                    : 'COMMUNITY INVESTMENT PORTFOLIO • CAPITAL ALLOCATION'}
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#000514] font-bold tracking-tight">
                {isBn ? 'আমাদের প্রকল্পসমূহ ও বিনিয়োগ উদ্যোগ' : 'Strategic Projects & Commercial Initiatives'}
              </h1>
              <p className="text-xs sm:text-sm text-[#44474d] leading-relaxed">
                {isBn
                  ? 'টেকসই সমবায় উদ্যোগ, শস্য প্রক্রিয়াকরণ ও আধুনিক বাণিজ্যিক পরিকাঠামো গঠনের মাধ্যমে সমৃদ্ধ আগামীর ভিত্তি।'
                  : 'Empowering collective wealth through verified commercial agriculture, retail store networks, and green cold-chain logistics.'}
              </p>
            </div>

            {/* Quick Portfolio Metrics Pill */}
            <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-[#eaedff] flex-shrink-0">
              <div className="flex flex-col px-3 py-1">
                <span className="text-[11px] text-[#75777e]">
                  {isBn ? 'মোট অনুমোদিত মূলধন' : 'Total Capital Cap'}
                </span>
                <span className="font-serif text-lg font-bold text-[#000514]">
                  {isBn ? '৳১৪,৮০,০০,০০০' : '৳ 14.80 Cr'}
                </span>
              </div>
              <div className="h-8 w-px bg-[#eaedff]"></div>
              <div className="flex flex-col px-3 py-1">
                <span className="text-[11px] text-[#75777e]">
                  {isBn ? 'সক্রিয় বিনিয়োগকারী' : 'Active Investors'}
                </span>
                <span className="font-serif text-lg font-bold text-[#745b00]">
                  {isBn ? '৬৪৫+ সদস্য' : '645+ Members'}
                </span>
              </div>
            </div>
          </div>

          {/* Controls: Search & Live Filter Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-2">
            {/* Filter Tabs */}
            <div className="inline-flex flex-wrap items-center bg-[#eaedff] rounded-xl p-1 gap-1">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filter === 'all'
                    ? 'bg-[#0d1e3a] text-white shadow-sm'
                    : 'text-[#44474d] hover:text-[#131b2e]'
                }`}
              >
                {isBn ? 'সব প্রকল্প' : 'All Projects'} <span className="ml-1 opacity-70">({projectsData.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setFilter('ongoing')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filter === 'ongoing'
                    ? 'bg-[#0d1e3a] text-white shadow-sm'
                    : 'text-[#44474d] hover:text-[#131b2e]'
                }`}
              >
                {isBn ? 'চলমান উদ্যোগ' : 'Active / Ongoing'}
              </button>
              <button
                type="button"
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filter === 'completed'
                    ? 'bg-[#0d1e3a] text-white shadow-sm'
                    : 'text-[#44474d] hover:text-[#131b2e]'
                }`}
              >
                {isBn ? 'সফলভাবে সমাপ্ত' : 'Completed'}
              </button>
              <button
                type="button"
                onClick={() => setFilter('proposed')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filter === 'proposed'
                    ? 'bg-[#0d1e3a] text-white shadow-sm'
                    : 'text-[#44474d] hover:text-[#131b2e]'
                }`}
              >
                {isBn ? 'পরিকল্পিত / পাইপলাইন' : 'Proposed'}
              </button>
            </div>

            {/* Live Search */}
            <div className="relative w-full md:w-80">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#75777e]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isBn ? 'প্রকল্পের নাম বা বিভাগ খুঁজুন...' : 'Search projects by code, sector...'}
                className="w-full bg-white pl-10 pr-4 py-2.5 rounded-xl text-xs text-[#131b2e] placeholder:text-[#75777e] focus:outline-none shadow-sm border border-[#eaedff]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Project Portfolio Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {filteredProjects.map((project) => {
            const isFeatured = project.category === 'ongoing' && project.id === 'p1';
            const colSpanClass = isFeatured
              ? 'lg:col-span-7'
              : project.id === 'p2'
              ? 'lg:col-span-5'
              : project.category === 'ongoing' || project.category === 'proposed'
              ? 'lg:col-span-6'
              : 'lg:col-span-4';

            const displayTitle = isBn ? project.titleBn : project.titleEn || project.titleBn;
            const displaySector = isBn ? project.sectorBn : project.sectorBn;
            const displayBadge = isBn ? project.categoryBadgeBn : project.category === 'ongoing' ? 'Active' : project.category === 'completed' ? 'Delivered' : 'Pipeline';

            return (
              <article
                key={project.id}
                className={`project-card ${colSpanClass} flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden group border border-[#eaedff]`}
              >
                {project.imageUrl && (
                  <div className="relative h-64 w-full overflow-hidden bg-[#eaedff]">
                    <img
                      src={customProjectImages[project.id] || project.imageUrl}
                      alt={displayTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95 contrast-105 hover:brightness-100 shadow-inner"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000514]/80 via-transparent to-transparent"></div>
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded text-[11px] text-[#000514] font-bold shadow-sm">
                        {displaySector}
                      </span>
                      <span className="bg-[#fcd358] text-[#735a00] px-3 py-1 rounded text-[11px] font-bold shadow-sm">
                        {displayBadge}
                      </span>
                    </div>

                    {/* Change Picture Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImageModalProjectId(project.id);
                        setCustomUrlInput(customProjectImages[project.id] || project.imageUrl);
                      }}
                      className="absolute top-4 right-4 z-20 bg-black/75 hover:bg-black/95 text-amber-300 hover:text-white px-2.5 py-1 rounded-md text-[11px] font-semibold border border-amber-500/30 flex items-center gap-1 shadow-md cursor-pointer transition-all"
                      title={isBn ? 'ছবি পরিবর্তন বা আপলোড করুন' : 'Change or upload picture'}
                    >
                      <span className="material-symbols-outlined text-[15px]">add_a_photo</span>
                      <span>{isBn ? 'ছবি পরিবর্তন' : 'Change Image'}</span>
                    </button>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[11px] text-[#ffe08b] uppercase tracking-wider font-mono">
                        {project.code}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-white leading-tight mt-0.5">
                        {displayTitle}
                      </h3>
                    </div>
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1 justify-between gap-5">
                  {!project.imageUrl && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-[#745b00]">{displaySector}</span>
                        <span className="bg-[#eaedff] text-[#000514] px-2.5 py-0.5 rounded text-[11px] font-semibold">
                          {displayBadge}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-[#000514] leading-tight">
                        {displayTitle}
                      </h3>
                    </div>
                  )}

                  <p className="text-xs text-[#44474d] leading-relaxed">
                    {project.descriptionBn}
                  </p>

                  {/* Progress Indicator */}
                  <div className="bg-[#f2f3ff] p-3.5 rounded-xl border border-[#eaedff] flex flex-col gap-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#131b2e] font-semibold">
                        {isBn
                          ? `অগ্রগতি: ${project.progressPercent}% সম্পন্ন`
                          : `Status: ${project.progressPercent}% executed`}
                      </span>
                      <span className="text-[#745b00] font-bold">
                        {isBn ? project.completionDateBn : 'Target: 2025'}
                      </span>
                    </div>
                    <div className="w-full bg-[#dae2fd] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#745b00] h-full rounded-full transition-all duration-500"
                        style={{ width: `${project.progressPercent}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[11px] text-[#75777e] pt-1 font-mono">
                      <span>{isBn ? `বাজেট: ${project.budgetTotalBn}` : `Cap: ${project.budgetTotalBn}`}</span>
                      <span>{isBn ? `ব্যয়িত: ${project.budgetSpentBn}` : `Spent: ${project.budgetSpentBn}`}</span>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#f2f3ff]">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-[#eaedff] flex items-center justify-center text-[#000514]">
                        <span className="material-symbols-outlined text-[18px]">person</span>
                      </span>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-[#75777e]">
                          {isBn ? 'টিম লিড' : 'Team Lead'}
                        </span>
                        <span className="text-xs font-bold text-[#000514]">{project.teamLeadBn}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#745b00] hover:text-[#000514] transition-colors cursor-pointer"
                    >
                      <span>{isBn ? 'বিস্তারিত রিপোর্ট' : 'Full Dossier'}</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Statutory Disclosure Notice */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-12 w-full">
        <div className="bg-[#eaedff] rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm border border-[#dae2fd]">
          <div className="w-12 h-12 rounded-full bg-[#0d1e3a] text-[#ffe08b] flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[26px]">gavel</span>
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <h4 className="font-serif text-base font-bold text-[#000514]">
              {isBn
                ? 'সংবিধিবদ্ধ স্বচ্ছতা ও নীতিগত ঘোষণাপত্র (Statutory Disclosure)'
                : 'Statutory Transparency & Compliance Disclosure'}
            </h4>
            <p className="text-xs text-[#44474d] leading-relaxed">
              {isBn
                ? 'ইউনাইটি গ্রোথ গ্রুপ (UGG) তার প্রতিটি প্রকল্পে স্বচ্ছতা রক্ষার্থে বদ্ধপরিকর। সকল মূলধন ব্যয় স্বাধীন অডিট ফার্ম কর্তৃক নিরীক্ষিত এবং সাধারণ সদস্যগণের অবগতির জন্য প্রতি ত্রৈমাসিকে উন্মুক্ত করা হয়।'
                : 'Unity Growth Group (UGG) maintains strict fiduciary standards. All project outlays and capital expenditures are certified by independent chartered accounting audits released quarterly.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('financial-reports')}
            className="flex-shrink-0 px-5 py-2.5 bg-[#000514] text-white rounded-lg text-xs font-bold hover:bg-[#0d1e3a] transition-colors shadow-sm cursor-pointer"
          >
            {isBn ? 'নিরীক্ষা রিপোর্ট দেখুন' : 'View Audit Reports'}
          </button>
        </div>
      </section>

      {/* Project Proposal Submission CTA */}
      <section className="w-full bg-[#0d1e3a] py-16 px-6 lg:px-12 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          <div className="flex flex-col gap-2 max-w-xl text-center lg:text-left">
            <span className="text-xs text-[#ffe08b] tracking-widest uppercase font-bold">
              {isBn ? 'সদস্য অংশীদারিত্ব প্ল্যাটফর্ম' : 'Member Co-Investment Gateway'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold">
              {isBn
                ? 'আপনার কি কোনো লাভজনক ব্যবসায়িক প্রস্তাবনা আছে?'
                : 'Propose a High-Impact Strategic Venture'}
            </h2>
            <p className="text-xs sm:text-sm text-[#b7c7eb] leading-relaxed">
              {isBn
                ? 'ইউজিজি-র সক্রিয় সদস্য হিসেবে আপনি নতুন যৌথ উদ্যোগ, কৃষি উদ্ভাবন অথবা রিটেইল ধারণার সম্ভাব্যতা সমীক্ষা জমা দিতে পারেন। নির্বাহী বোর্ড প্রতিটি প্রস্তাব গুরুত্বের সাথে মূল্যায়ন করে।'
                : 'Verified UGG members can propose feasibility studies for commercial agribusiness, retail chain expansion, or clean energy. Our investment appraisal board evaluates submissions quarterly.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={() => setShowProposalModal(true)}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#745b00] hover:bg-[#fcd358] hover:text-[#735a00] text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              {isBn ? 'নতুন প্রকল্প প্রস্তাব করুন' : 'Submit Project Proposal'}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#000514] hover:bg-white/10 rounded-xl text-xs font-bold text-[#d7e2ff] hover:text-white transition-colors text-center border border-white/15 cursor-pointer"
            >
              {isBn ? 'বিনিয়োগ সেল যোগাযোগ' : 'Contact Investment Cell'}
            </button>
          </div>
        </div>
      </section>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-[#000514]/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 lg:p-8 flex flex-col gap-6 relative border border-[#eaedff]">
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-[#75777e] hover:text-[#000514] p-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>

            <div className="flex flex-col gap-1">
              <span className="text-xs text-[#745b00] uppercase tracking-widest font-bold">
                {selectedProject.sectorBn}
              </span>
              <h3 className="font-serif text-xl font-bold text-[#000514]">
                {isBn ? selectedProject.titleBn : selectedProject.titleEn || selectedProject.titleBn}
              </h3>
              <span className="text-xs text-[#75777e] font-mono">{selectedProject.code}</span>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-[#75777e]">
                  {isBn ? 'মূল উদ্দেশ্য ও লক্ষ্য (Objectives)' : 'Venture Mission & Scope'}
                </span>
                <p className="text-xs sm:text-sm text-[#131b2e] leading-relaxed">
                  {selectedProject.descriptionBn}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-[#f2f3ff] p-4 rounded-xl border border-[#eaedff]">
                <div>
                  <span className="text-[11px] text-[#75777e]">{isBn ? 'শুরুর তারিখ' : 'Inception'}</span>
                  <p className="text-xs font-bold text-[#000514] mt-0.5">{selectedProject.startDateBn}</p>
                </div>
                <div>
                  <span className="text-[11px] text-[#75777e]">{isBn ? 'সমাপ্তির লক্ষ্য' : 'Target Target'}</span>
                  <p className="text-xs font-bold text-[#000514] mt-0.5">{selectedProject.completionDateBn}</p>
                </div>
                <div>
                  <span className="text-[11px] text-[#75777e]">{isBn ? 'প্রাক্কলিত ROI' : 'Target ROI'}</span>
                  <p className="text-xs font-bold text-[#0e996b] mt-0.5">{selectedProject.expectedRoiBn}</p>
                </div>
                <div>
                  <span className="text-[11px] text-[#75777e]">{isBn ? 'অবস্থান' : 'Location'}</span>
                  <p className="text-xs font-bold text-[#000514] mt-0.5">{selectedProject.locationBn}</p>
                </div>
              </div>

              {selectedProject.expenses && (
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-[#75777e]">
                    {isBn ? 'মূলধন বরাদ্দ ও ব্যয় বিভাজন' : 'Capital Allocation Breakdown'}
                  </span>
                  <div className="space-y-2">
                    {selectedProject.expenses.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center text-xs p-2.5 bg-[#faf8ff] rounded-lg border border-[#eaedff]"
                      >
                        <span className="text-[#131b2e]">{item.label}</span>
                        <span className="font-bold text-[#745b00] font-mono">{item.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#eaedff] flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 bg-[#eaedff] hover:bg-[#dae2fd] text-[#000514] rounded-lg text-xs font-bold cursor-pointer"
              >
                {isBn ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Project Proposal Modal */}
      {showProposalModal && (
        <div className="fixed inset-0 z-50 bg-[#000514]/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl relative border border-[#eaedff]">
            <button
              type="button"
              onClick={() => {
                setShowProposalModal(false);
                setProposalSuccess(false);
              }}
              className="absolute top-4 right-4 text-[#75777e] hover:text-[#000514] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>

            {proposalSuccess ? (
              <div className="text-center py-6 space-y-3">
                <span className="material-symbols-outlined text-5xl text-emerald-600">check_circle</span>
                <h3 className="font-serif text-lg font-bold text-[#000514]">
                  {isBn ? 'প্রস্তাবনা গৃহীত হয়েছে!' : 'Proposal Submitted Successfully!'}
                </h3>
                <p className="text-xs text-[#44474d]">
                  {isBn
                    ? 'আপনার প্রস্তাবনাটি সফলভাবে জমা হয়েছে। ইউজিজি মূল্যায়ন কমিটি খুব শীঘ্রই যোগাযোগ করবে।'
                    : 'Your venture charter has been received. Our investment appraisal board will review and respond shortly.'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowProposalModal(false);
                    setProposalSuccess(false);
                  }}
                  className="mt-4 px-6 py-2.5 bg-[#000514] text-white rounded-lg text-xs font-bold cursor-pointer"
                >
                  {isBn ? 'ঠিক আছে' : 'Done'}
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setProposalSuccess(true);
                }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#745b00]">lightbulb</span>
                  <h3 className="font-serif text-lg font-bold text-[#000514]">
                    {isBn ? 'নতুন ব্যবসায়িক প্রস্তাবনা জমা দিন' : 'Submit New Venture Proposal'}
                  </h3>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#131b2e] mb-1">
                    {isBn ? 'প্রস্তাবিত প্রকল্পের নাম' : 'Proposed Project Title'}
                  </label>
                  <input
                    required
                    type="text"
                    placeholder={isBn ? 'যেমন: সৌরশক্তি চালিত কোল্ড চেইন' : 'e.g. Solar Cold-Chain Expansion'}
                    className="w-full bg-[#f2f3ff] border border-[#eaedff] rounded-lg px-3 py-2 text-xs text-[#000514] outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#131b2e] mb-1">
                      {isBn ? 'সম্ভাব্য বাজেট' : 'Estimated Capital Cap'}
                    </label>
                    <input
                      required
                      type="text"
                      placeholder={isBn ? 'যেমন: ৳ ৫০,০০,০০০' : 'e.g. ৳ 50,00,000'}
                      className="w-full bg-[#f2f3ff] border border-[#eaedff] rounded-lg px-3 py-2 text-xs text-[#000514] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#131b2e] mb-1">
                      {isBn ? 'প্রকল্পের খাত' : 'Sector'}
                    </label>
                    <select className="w-full bg-[#f2f3ff] border border-[#eaedff] rounded-lg px-3 py-2 text-xs text-[#000514] outline-none">
                      <option>{isBn ? 'কৃষি ও প্রক্রিয়াজাতকরণ' : 'Agribusiness & Processing'}</option>
                      <option>{isBn ? 'সুপার শপ ও রিটেইল' : 'Super Shop & Retail'}</option>
                      <option>{isBn ? 'কোল্ড স্টোরেজ ও লজিস্টিকস' : 'Cold Storage & Logistics'}</option>
                      <option>{isBn ? 'টেক ও গ্রিন এনার্জি' : 'Tech & Clean Energy'}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#131b2e] mb-1">
                    {isBn ? 'সংক্ষিপ্ত বিবরণ ও সম্ভাব্যতা সমীক্ষা' : 'Summary & Feasibility Notes'}
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder={isBn ? 'প্রকল্পটির মূল লক্ষ্য এবং মুনাফার সম্ভাবনা লিখুন...' : 'Key objectives, expected returns, and operational blueprint...'}
                    className="w-full bg-[#f2f3ff] border border-[#eaedff] rounded-lg px-3 py-2 text-xs text-[#000514] outline-none"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowProposalModal(false)}
                    className="px-4 py-2 text-xs font-bold text-[#75777e] hover:text-[#000514] cursor-pointer"
                  >
                    {isBn ? 'বাতিল' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#745b00] hover:bg-[#fcd358] hover:text-[#735a00] text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                  >
                    {isBn ? 'প্রস্তাব জমা দিন' : 'Submit Proposal'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Change Image Modal */}
      {imageModalProjectId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#040e24] border border-amber-500/40 rounded-2xl max-w-xl w-full p-6 text-slate-100 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setImageModalProjectId(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-amber-400 text-2xl">add_photo_alternate</span>
              <h3 className="text-lg font-serif font-bold text-white">
                {isBn ? 'প্রকল্পের ছবি পরিবর্তন ও আপলোড' : 'Change & Upload Project Image'}
              </h3>
            </div>
            <p className="text-xs text-slate-400 mb-5">
              {isBn
                ? 'আপনার কম্পিউটার বা মোবাইল থেকে ছবি সিলেক্ট করুন, অনলাইন লিঙ্ক পেস্ট করুন অথবা নিচের নমুনা থেকে বেছে নিন।'
                : 'Upload a picture from your device, paste an image URL, or choose one from the curated gallery below.'}
            </p>

            <div className="space-y-4 text-xs font-sans">
              {/* Device Upload */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  {isBn ? '১. কম্পিউটার / মোবাইল থেকে ছবি আপলোড করুন:' : '1. Upload picture directly from your device:'}
                </label>
                <label className="border-2 border-dashed border-slate-700 hover:border-amber-400/60 rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer bg-[#020714] transition-colors">
                  <span className="material-symbols-outlined text-amber-400 text-3xl">upload_file</span>
                  <span className="text-xs text-white font-semibold mt-1">
                    {isBn ? 'ফাইল সিলেক্ট করতে এখানে ক্লিক করুন' : 'Click here to choose file'}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5">
                    JPG, PNG, WebP ({isBn ? 'সিলেক্ট করলেই সাথে সাথে কার্ডে যুক্ত হবে' : 'Instantly reflects on the project card'})
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Paste URL */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  {isBn ? '২. অথবা ছবির সরাসরি ওয়েব লিঙ্ক (URL) পেস্ট করুন:' : '2. Or paste an image Web URL:'}
                </label>
                <input
                  type="text"
                  value={customUrlInput}
                  onChange={(e) => setCustomUrlInput(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-[#020714] border border-slate-800 focus:border-amber-400 rounded-lg px-3 py-2 text-white outline-none font-mono text-xs"
                />
              </div>

              {/* One-click Presets */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">
                  {isBn ? '৩. অথবা দ্রুত নমুনা ছবি থেকে পছন্দ করুন:' : '3. Or pick a curated sample photo:'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PRESET_PROJECT_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        if (imageModalProjectId) {
                          setCustomProjectImages((prev) => ({
                            ...prev,
                            [imageModalProjectId]: preset.url,
                          }));
                          setImageModalProjectId(null);
                        }
                      }}
                      className="group relative rounded-lg overflow-hidden border border-slate-700 hover:border-amber-400 text-left cursor-pointer transition-all"
                    >
                      <img
                        src={preset.url}
                        alt={isBn ? preset.labelBn : preset.labelEn}
                        className="w-full h-16 object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="p-1.5 bg-[#020714] text-[10px] text-slate-300 truncate">
                        {isBn ? preset.labelBn : preset.labelEn}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setImageModalProjectId(null)}
                  className="px-4 py-2 text-slate-400 hover:text-white cursor-pointer"
                >
                  {isBn ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (customUrlInput.trim() && imageModalProjectId) {
                      setCustomProjectImages((prev) => ({
                        ...prev,
                        [imageModalProjectId]: customUrlInput.trim(),
                      }));
                      setImageModalProjectId(null);
                    }
                  }}
                  className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold uppercase rounded cursor-pointer shadow-md"
                >
                  {isBn ? 'ছবি সংরক্ষণ করুন' : 'Save Image'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
