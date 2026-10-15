import React, { useState, useEffect } from 'react';
import { PageRoute, Language, GalleryAlbum } from '../types';
import { galleryAlbumsData, toBanglaNumber } from '../data/mockData';

interface GalleryPageProps {
  onNavigate: (route: PageRoute) => void;
  language: Language;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ language }) => {
  const isBn = language === 'bn';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeAlbum, setActiveAlbum] = useState<GalleryAlbum | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Responsive Controls State
  const [displayMode, setDisplayMode] = useState<'albums' | 'photos'>('albums');
  const [gridColumns, setGridColumns] = useState<'auto' | '1' | '2' | '3' | '4'>('auto');
  const [aspectRatio, setAspectRatio] = useState<'video' | 'photo' | 'square'>('photo');
  const [previewDevice, setPreviewDevice] = useState<'fluid' | 'desktop' | 'tablet' | 'mobile'>('fluid');

  const categories = [
    { id: 'all', labelBn: 'সকল ছবি ও অ্যালবাম', labelEn: 'All Photos & Albums' },
    { id: 'agm', labelBn: 'বার্ষিক সাধারণ সভা (AGM)', labelEn: 'AGM & Conferences' },
    { id: 'site', labelBn: 'প্রকল্প ও মাঠ পরিদর্শন', labelEn: 'Project Site Visits' },
    { id: 'retail', labelBn: 'সুপার শপ ও রিটেইল চেইন', labelEn: 'Super Shop Retail' },
    { id: 'csr', labelBn: 'সিএসআর ও সামাজিক উন্নয়ন', labelEn: 'CSR & Welfare' },
  ];

  const filteredAlbums =
    selectedCategory === 'all'
      ? galleryAlbumsData
      : galleryAlbumsData.filter((a) => a.category === selectedCategory);

  // Flat list of all individual photos for photo mosaic view
  const allPhotos = filteredAlbums.flatMap((album) =>
    (album.photos || [album.coverImageUrl]).map((photoUrl, idx) => ({
      id: `${album.id}-p-${idx}`,
      url: photoUrl,
      albumTitle: isBn ? album.titleBn : (album.titleEn || album.titleBn),
      category: isBn ? album.categoryLabelBn : (album.categoryLabelEn || album.categoryLabelBn),
      date: isBn ? album.dateBn : (album.dateEn || album.dateBn),
      location: isBn ? album.locationBn : (album.locationEn || album.locationBn),
      albumRef: album,
    }))
  );

  const openLightboxWithAlbum = (album: GalleryAlbum, index = 0) => {
    setActiveAlbum(album);
    setActivePhotoIndex(index);
    setLightboxOpen(true);
    setZoomLevel(1);
  };

  const handleNextPhoto = () => {
    if (!activeAlbum) return;
    const total = activeAlbum.photos?.length || 1;
    setActivePhotoIndex((prev) => (prev + 1) % total);
    setZoomLevel(1);
  };

  const handlePrevPhoto = () => {
    if (!activeAlbum) return;
    const total = activeAlbum.photos?.length || 1;
    setActivePhotoIndex((prev) => (prev - 1 + total) % total);
    setZoomLevel(1);
  };

  // Keyboard navigation for image lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'ArrowRight') handleNextPhoto();
      if (e.key === 'ArrowLeft') handlePrevPhoto();
      if (e.key === 'Escape') setLightboxOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, activeAlbum]);

  const currentPhotoUrl =
    activeAlbum?.photos && activeAlbum.photos[activePhotoIndex]
      ? activeAlbum.photos[activePhotoIndex]
      : activeAlbum?.coverImageUrl || '';

  const getAspectClass = () => {
    switch (aspectRatio) {
      case 'video':
        return 'aspect-[16/9]';
      case 'square':
        return 'aspect-square';
      case 'photo':
      default:
        return 'aspect-[4/3]';
    }
  };

  const getDeviceContainerClass = () => {
    switch (previewDevice) {
      case 'mobile':
        return 'max-w-[390px] mx-auto border-x border-slate-700/60 shadow-2xl px-3 transition-all duration-300';
      case 'tablet':
        return 'max-w-[768px] mx-auto border-x border-slate-700/60 shadow-2xl px-5 transition-all duration-300';
      case 'desktop':
        return 'max-w-[1200px] mx-auto border-x border-slate-700/60 shadow-2xl px-6 transition-all duration-300';
      case 'fluid':
      default:
        return 'w-full transition-all duration-300';
    }
  };

  return (
    <div className="min-h-screen bg-[#000514] text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-900 pb-20">
      {/* Editorial Header with Responsive Typography */}
      <div className="relative border-b border-amber-500/20 bg-gradient-to-b from-[#030d22] via-[#020917] to-[#000514] pt-8 sm:pt-12 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-amber-400/80 mb-3 tracking-wider uppercase">
            <span>UGG-MEDIA-ARCHIVE-2025</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300">RESPONSIVE PHOTO VAULT</span>
            <span className="text-slate-600">/</span>
            <span className="bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded text-[10px]">
              {isBn
                ? `${toBanglaNumber(galleryAlbumsData.length)}টি অ্যালবাম (${toBanglaNumber(allPhotos.length)}টি ফটো)`
                : `${galleryAlbumsData.length} Albums (${allPhotos.length} Photos)`}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight mb-3">
            {isBn ? 'মিডিয়া আর্কাইভ ও চিত্রশালা' : 'Media Archive & Photo Chronicles'}
          </h1>
          <p className="max-w-3xl text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed">
            {isBn
              ? 'ইউনাইটি গ্রোথ গ্রুপের ঐতিহাসিক সম্মেলন, বার্ষিক সাধারণ সভা, প্রকল্প সাইট ভিজিট, ফ্ল্যাগশিপ সুপার শপ উদ্বোধন এবং মানবকল্যাণমূলক সিএসআর কার্যক্রমের পূর্ণাঙ্গ ভিজ্যুয়াল সংকলন।'
              : 'High-fidelity photographic archives highlighting general assemblies, agribusiness estates, modern logistics hubs, and community social projects.'}
          </p>

          {/* Responsive Device Viewport Simulator Bar */}
          <div className="mt-6 p-3 sm:p-4 rounded-xl bg-[#040e24] border border-amber-500/30 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-400 text-lg">devices</span>
              <span className="text-xs font-semibold text-white">
                {isBn ? 'রেসপনসিভ ভিউপোর্ট সিমুলেটর:' : 'Responsive Viewport Simulator:'}
              </span>
            </div>

            <div className="inline-flex items-center gap-1 bg-[#020714] p-1 rounded-lg border border-slate-800 text-xs font-mono">
              <button
                type="button"
                onClick={() => setPreviewDevice('fluid')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1 ${
                  previewDevice === 'fluid'
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Full Responsive Width (Fluid 100%)"
              >
                <span className="material-symbols-outlined text-sm">fit_screen</span>
                <span className="hidden sm:inline">{isBn ? 'স্বয়ংক্রিয় (Fluid 100%)' : 'Fluid (100%)'}</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice('desktop')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1 ${
                  previewDevice === 'desktop'
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Desktop 1200px"
              >
                <span className="material-symbols-outlined text-sm">desktop_windows</span>
                <span className="hidden sm:inline">{isBn ? 'ডেস্কটপ (1200px)' : 'Desktop (1200px)'}</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice('tablet')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1 ${
                  previewDevice === 'tablet'
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Tablet 768px"
              >
                <span className="material-symbols-outlined text-sm">tablet</span>
                <span className="hidden sm:inline">{isBn ? 'ট্যাবলেট (768px)' : 'Tablet (768px)'}</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice('mobile')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1 ${
                  previewDevice === 'mobile'
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Mobile 390px"
              >
                <span className="material-symbols-outlined text-sm">smartphone</span>
                <span className="hidden sm:inline">{isBn ? 'মোবাইল (390px)' : 'Mobile (390px)'}</span>
              </button>
            </div>
          </div>

          {/* Category Filter Tabs & Layout Controls */}
          <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  {isBn ? cat.labelBn : cat.labelEn}
                </button>
              ))}
            </div>

            {/* Display Mode & Grid Settings */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Albums vs Photos Toggle */}
              <div className="inline-flex bg-[#020714] border border-slate-800 rounded-lg p-0.5 text-xs">
                <button
                  type="button"
                  onClick={() => setDisplayMode('albums')}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1 ${
                    displayMode === 'albums'
                      ? 'bg-amber-400/20 text-amber-300 font-bold border border-amber-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-xs">folder</span>
                  <span>{isBn ? 'অ্যালবাম' : 'Albums'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDisplayMode('photos')}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1 ${
                    displayMode === 'photos'
                      ? 'bg-amber-400/20 text-amber-300 font-bold border border-amber-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-xs">grid_view</span>
                  <span>{isBn ? 'সকল ছবি' : 'All Photos'}</span>
                </button>
              </div>

              {/* Column Density Controls */}
              <div className="hidden sm:inline-flex items-center gap-1 bg-[#020714] border border-slate-800 rounded-lg p-0.5 text-xs font-mono">
                <span className="text-[10px] text-slate-400 px-1.5 uppercase font-sans">
                  {isBn ? 'কলাম:' : 'Cols:'}
                </span>
                {(['auto', '1', '2', '3', '4'] as const).map((col) => (
                  <button
                    key={col}
                    onClick={() => setGridColumns(col)}
                    className={`w-6 h-6 rounded flex items-center justify-center text-xs transition-colors cursor-pointer ${
                      gridColumns === col
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {col === 'auto' ? 'A' : col}
                  </button>
                ))}
              </div>

              {/* Aspect Ratio Switcher */}
              <div className="hidden sm:inline-flex items-center gap-1 bg-[#020714] border border-slate-800 rounded-lg p-0.5 text-xs font-mono">
                <span className="text-[10px] text-slate-400 px-1.5 uppercase font-sans">
                  {isBn ? 'অনুপাত:' : 'Ratio:'}
                </span>
                <button
                  onClick={() => setAspectRatio('photo')}
                  className={`px-2 py-0.5 rounded text-[11px] cursor-pointer ${
                    aspectRatio === 'photo' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  4:3
                </button>
                <button
                  onClick={() => setAspectRatio('video')}
                  className={`px-2 py-0.5 rounded text-[11px] cursor-pointer ${
                    aspectRatio === 'video' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  16:9
                </button>
                <button
                  onClick={() => setAspectRatio('square')}
                  className={`px-2 py-0.5 rounded text-[11px] cursor-pointer ${
                    aspectRatio === 'square' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  1:1
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container with Viewport simulation wrapper */}
      <div className={`mt-8 ${getDeviceContainerClass()}`}>
        {/* Device indicator label if in simulated mode */}
        {previewDevice !== 'fluid' && (
          <div className="mb-4 text-center">
            <span className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono rounded-full uppercase tracking-wider">
              {previewDevice === 'mobile' && (isBn ? '📱 মোবাইল স্ক্রিন সিমুলেশন (৩৯০px ভিউপোর্ট)' : '📱 Mobile Screen Simulation (390px Viewport)')}
              {previewDevice === 'tablet' && (isBn ? '📱 ট্যাবলেট স্ক্রিন সিমুলেশন (৭৬৮px ভিউপোর্ট)' : '📱 Tablet Screen Simulation (768px Viewport)')}
              {previewDevice === 'desktop' && (isBn ? '🖥️ ডেস্কটপ স্ক্রিন সিমুলেশন (১২০০px ভিউপোর্ট)' : '🖥️ Desktop Screen Simulation (1200px Viewport)')}
            </span>
          </div>
        )}

        {/* 1. ALBUMS VIEW */}
        {displayMode === 'albums' && (
          <div
            className="responsive-image-grid"
            data-cols={gridColumns !== 'auto' ? gridColumns : undefined}
          >
            {filteredAlbums.map((album) => {
              const title = isBn ? album.titleBn : (album.titleEn || album.titleBn);
              const categoryLabel = isBn ? album.categoryLabelBn : (album.categoryLabelEn || album.categoryLabelBn);
              const date = isBn ? album.dateBn : (album.dateEn || album.dateBn);
              const location = isBn ? album.locationBn : (album.locationEn || album.locationBn);
              const description = isBn ? album.descriptionBn : (album.descriptionEn || album.descriptionBn);

              return (
                <div
                  key={album.id}
                  onClick={() => openLightboxWithAlbum(album)}
                  className="bg-[#040e24] border border-amber-500/20 hover:border-amber-500/60 rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer flex flex-col justify-between"
                >
                  {/* Fluid Aspect Ratio Image Container */}
                  <div className={`fluid-image-frame ${getAspectClass()}`}>
                    <img
                      src={album.coverImageUrl}
                      alt={title}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#040e24] via-transparent to-black/30"></div>

                    <div className="absolute top-2.5 left-2.5 flex gap-2">
                      <span className="px-2 py-0.5 bg-black/75 backdrop-blur-md border border-white/10 text-amber-300 text-[10px] font-mono uppercase tracking-wider rounded">
                        {categoryLabel}
                      </span>
                    </div>

                    <div className="absolute top-2.5 right-2.5">
                      <span className="px-2 py-0.5 bg-black/75 backdrop-blur-md border border-white/10 text-white text-xs font-mono flex items-center gap-1 rounded">
                        <span className="material-symbols-outlined text-xs text-amber-400">photo_library</span>
                        {isBn ? toBanglaNumber(album.photoCount) : album.photoCount}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 left-2.5 right-2.5 text-xs text-slate-300 flex items-center justify-between">
                      <span className="flex items-center gap-1 font-mono text-[10px] text-amber-200/90">
                        <span className="material-symbols-outlined text-xs">calendar_today</span>
                        {date}
                      </span>
                      <span className="flex items-center gap-1 font-mono text-[10px] text-slate-300">
                        <span className="material-symbols-outlined text-xs">location_on</span>
                        {location}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between image-card-padding">
                    <div>
                      <h3 className="font-serif font-bold text-base sm:text-lg text-white group-hover:text-amber-300 transition-colors line-clamp-2 mb-2 leading-snug">
                        {title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                        {description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-amber-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        {isBn ? 'অ্যালবাম দেখুন' : 'Explore Album'}
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </span>
                      <span className="text-slate-500 text-[10px] font-mono">UGG ARCHIVE</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 2. PHOTO MOSAIC STREAM VIEW */}
        {displayMode === 'photos' && (
          <div
            className="responsive-image-grid"
            data-cols={gridColumns !== 'auto' ? gridColumns : undefined}
          >
            {allPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => openLightboxWithAlbum(photo.albumRef, 0)}
                className="group relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-amber-400 cursor-pointer shadow-lg transition-all"
              >
                <div className={`fluid-image-frame ${getAspectClass()}`}>
                  <img
                    src={photo.url}
                    alt={photo.albumTitle}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                    <span className="text-[10px] text-amber-300 font-mono uppercase">{photo.category}</span>
                    <h4 className="text-xs font-semibold text-white line-clamp-1">{photo.albumTitle}</h4>
                    <div className="flex items-center justify-between text-[10px] text-slate-300 mt-1 font-mono">
                      <span>{photo.date}</span>
                      <span>{photo.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FULLY RESPONSIVE LIGHTBOX MODAL WITH TOUCH & RELATIVE UNITS */}
      {lightboxOpen && activeAlbum && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/95 backdrop-blur-md animate-fadeIn">
          <div className="responsive-lightbox-dialog bg-[#040e24] border border-amber-500/40 rounded-2xl w-full flex flex-col overflow-hidden text-slate-100 shadow-2xl relative">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-slate-800 bg-[#020714]">
              <div className="flex items-center gap-2 overflow-hidden pr-2">
                <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-mono rounded uppercase flex-shrink-0">
                  {isBn ? activeAlbum.categoryLabelBn : (activeAlbum.categoryLabelEn || activeAlbum.categoryLabelBn)}
                </span>
                <h3 className="font-serif font-bold text-xs sm:text-base text-white truncate">
                  {isBn ? activeAlbum.titleBn : (activeAlbum.titleEn || activeAlbum.titleBn)}
                </h3>
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(1, z - 0.25))}
                  className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 cursor-pointer"
                  title="Zoom Out"
                >
                  <span className="material-symbols-outlined text-base">zoom_out</span>
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                  className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 cursor-pointer"
                  title="Zoom In"
                >
                  <span className="material-symbols-outlined text-base">zoom_in</span>
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(1)}
                  className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 text-[11px] font-mono cursor-pointer"
                  title="Reset Zoom"
                >
                  100%
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-full bg-slate-900 hover:bg-slate-800 cursor-pointer ml-1"
                  title="Close (Esc)"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              </div>
            </div>

            {/* Main Stage Image Wrapper with Relative Units & Touch Gestures */}
            <div className="relative responsive-lightbox-image-wrap flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px]">
              <img
                src={currentPhotoUrl}
                alt={isBn ? activeAlbum.titleBn : (activeAlbum.titleEn || activeAlbum.titleBn)}
                style={{ transform: `scale(${zoomLevel})` }}
                className="max-h-[60vh] sm:max-h-[65vh] w-auto max-w-full object-contain transition-transform duration-200 select-none"
              />

              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrevPhoto}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/10 hover:border-amber-400 transition-all cursor-pointer touch-target"
                title="Previous Image (←)"
              >
                <span className="material-symbols-outlined text-xl sm:text-2xl">chevron_left</span>
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNextPhoto}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/10 hover:border-amber-400 transition-all cursor-pointer touch-target"
                title="Next Image (→)"
              >
                <span className="material-symbols-outlined text-xl sm:text-2xl">chevron_right</span>
              </button>

              {/* Index counter badge */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-amber-300 border border-white/10">
                {isBn ? toBanglaNumber(activePhotoIndex + 1) : activePhotoIndex + 1} / {isBn ? toBanglaNumber(activeAlbum.photos?.length || 1) : (activeAlbum.photos?.length || 1)}
              </div>
            </div>

            {/* Bottom Strip: Metadata & Thumbnails */}
            <div className="p-3 sm:p-4 bg-[#020714] border-t border-slate-800 flex flex-col gap-2">
              <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2 font-mono">
                <span className="flex items-center gap-1 text-amber-300">
                  <span className="material-symbols-outlined text-sm">event</span>
                  {isBn ? activeAlbum.dateBn : (activeAlbum.dateEn || activeAlbum.dateBn)}
                </span>
                <span className="flex items-center gap-1 text-slate-300">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  {isBn ? activeAlbum.locationBn : (activeAlbum.locationEn || activeAlbum.locationBn)}
                </span>
                <span className="text-[11px] text-slate-500">
                  {isBn ? 'রেজোলিউশন: ১৯২০ × ১০৮০ | ফুল এইচডি' : 'Resolution: 1920 × 1080 | Full HD'}
                </span>
              </div>

              {/* Thumbnail Strip */}
              {activeAlbum.photos && activeAlbum.photos.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto py-1">
                  {activeAlbum.photos.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setActivePhotoIndex(idx);
                        setZoomLevel(1);
                      }}
                      className={`relative w-14 h-10 rounded overflow-hidden border-2 flex-shrink-0 cursor-pointer ${
                        activePhotoIndex === idx
                          ? 'border-amber-400 scale-105'
                          : 'border-slate-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={p} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
