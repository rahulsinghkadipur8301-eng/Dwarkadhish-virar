import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Landmark, Heart, Users, ChevronRight, X, ZoomIn, Eye } from 'lucide-react';
import { PeacockFeather, FluteDivider, DiyaAccent } from './KrishnaMotifs';
import { useI18n } from '../i18n/I18nContext';

export interface TempleVisionSectionProps {
  reducedMotion?: boolean;
}

export interface PhotoItem {
  id: string;
  src: string;
  titleKey: string;
  captionKey: string;
  date: string;
  badge: string;
}

export const VISION_PHOTOS: PhotoItem[] = [
  {
    id: 'idol-prayer',
    src: '/assets/praveena_thakur/praveena_thakur_before_idol.png',
    titleKey: 'captionIdol',
    captionKey: 'captionIdol',
    date: 'Shrine Consecration',
    badge: 'Sanctum Darshan',
  },
  {
    id: 'ceremony',
    src: '/assets/praveena_thakur/praveena_thakur_ceremony_restored.png',
    titleKey: 'captionCeremony',
    captionKey: 'captionCeremony',
    date: 'November 2025',
    badge: 'Pran Pratishtha',
  },
  {
    id: 'golden-hour',
    src: '/assets/praveena_thakur/praveena_thakur_golden_hour_namaste.png',
    titleKey: 'captionGoldenHour',
    captionKey: 'captionGoldenHour',
    date: 'Temple Shikhara',
    badge: 'Sandhya Namaste',
  },
  {
    id: 'shrine-prayer',
    src: '/assets/praveena_thakur/praveena_thakur_pink_sari_shrine.png',
    titleKey: 'captionShrine',
    captionKey: 'captionShrine',
    date: 'Sanctum Courtyard',
    badge: 'Inner Mandapa',
  },
  {
    id: 'enhanced-portrait',
    src: '/assets/praveena_thakur/praveena_thakur_portrait_enhanced.png',
    titleKey: 'captionPortrait',
    captionKey: 'captionPortrait',
    date: 'Inaugural Milestone',
    badge: 'Devotional Patron',
  },
  {
    id: 'mandir-portrait',
    src: '/assets/praveena_thakur/praveena_thakur_mandir_portrait.png',
    titleKey: 'captionMandir',
    captionKey: 'captionMandir',
    date: 'Shirgaon Sanctuary',
    badge: 'Temple Heritage',
  },
];

export const TempleVisionSection: React.FC<TempleVisionSectionProps> = ({ reducedMotion }) => {
  const { tDict } = useI18n();
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [activeMilestone, setActiveMilestone] = useState<number>(3); // Default to Consecration

  // Handle ESC key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPhoto(null);
      }
    };
    if (selectedPhoto) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedPhoto]);

  const milestones = [
    {
      year: tDict.vision.milestone1Year,
      title: tDict.vision.milestone1Title,
      desc: tDict.vision.milestone1Desc,
      icon: Heart,
    },
    {
      year: tDict.vision.milestone2Year,
      title: tDict.vision.milestone2Title,
      desc: tDict.vision.milestone2Desc,
      icon: Landmark,
    },
    {
      year: tDict.vision.milestone3Year,
      title: tDict.vision.milestone3Title,
      desc: tDict.vision.milestone3Desc,
      icon: Sparkles,
    },
    {
      year: tDict.vision.milestone4Year,
      title: tDict.vision.milestone4Title,
      desc: tDict.vision.milestone4Desc,
      icon: Calendar,
    },
  ];

  return (
    <section
      id="vision"
      aria-labelledby="vision-section-heading"
      className="relative w-full bg-[#FAF5EB] border-b border-[#E5D1B6] py-20 sm:py-24 lg:py-32 select-none overflow-hidden scroll-mt-20"
    >
      {/* Subtle Sandstone & Sacred Indian Floral Background Motifs */}
      <div className="absolute top-12 left-6 w-96 h-96 opacity-[0.035] pointer-events-none transform -rotate-12">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="90" stroke="#B78B49" strokeWidth="2" strokeDasharray="8 6" />
          <circle cx="100" cy="100" r="70" stroke="#76502F" strokeWidth="1.5" />
          <polygon points="100,20 180,140 20,140" stroke="#B78B49" strokeWidth="1.2" />
          <polygon points="100,180 180,60 20,60" stroke="#642B37" strokeWidth="1.2" />
        </svg>
      </div>
      <div className="absolute bottom-16 right-8 w-80 h-80 opacity-[0.035] pointer-events-none transform rotate-45">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="85" stroke="#B78B49" strokeWidth="2" />
          <circle cx="100" cy="100" r="55" stroke="#76502F" strokeWidth="1.5" strokeDasharray="6 4" />
          <path d="M100 10V190M10 100H190" stroke="#34251E" strokeWidth="1" />
        </svg>
      </div>

      <div className="w-full max-w-[min(94vw,1560px)] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        
        {/* =====================================================================
            1. EDITORIAL HEADER & SACRED KICKER
           ===================================================================== */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 22 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-20"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <PeacockFeather size={28} />
            <span className="font-cinzel text-xs sm:text-sm uppercase tracking-widest text-[#B78B49] font-bold">
              {tDict.vision.kicker}
            </span>
            <PeacockFeather size={28} className="transform scale-x-[-1]" />
          </div>

          <h2
            id="vision-section-heading"
            className="font-serif-royal text-3xl sm:text-4xl lg:text-5xl font-bold text-[#34251E] tracking-tight mb-3"
          >
            {tDict.vision.title}
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-[#76502F] leading-relaxed max-w-2xl mx-auto mb-4 font-medium">
            {tDict.vision.subtitle}
          </p>

          <div className="flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-cinzel font-semibold tracking-wider bg-[#FFFDF8] border border-[#B78B49]/60 text-[#642B37] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#B78B49]" />
              <span>॥ भक्तानां रक्षणार्थाय धर्मसंस्थापनार्थाय च ॥</span>
              <Sparkles className="w-3.5 h-3.5 text-[#B78B49]" />
            </span>
          </div>

          <div className="mt-5">
            <FluteDivider />
          </div>
        </motion.div>

        {/* =====================================================================
            2. THE CINEMATIC PRAVINA THAKUR EDITORIAL PORTRAIT & BIOGRAPHY
           ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center mb-20 sm:mb-28">
          
          {/* Left Column (50% desktop): Large Architectural Framed Portrait */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 1.035, y: 24 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex justify-center"
          >
            {/* Subtle Warm Background Glow */}
            <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-tr from-[#B78B49]/20 via-[#642B37]/10 to-transparent rounded-[2.5rem] blur-2xl pointer-events-none" />

            {/* Regal Carved Temple Arch Frame Container */}
            <div className="relative w-full max-w-[560px] bg-[#FFFDF8] rounded-3xl p-3.5 sm:p-5 border-2 border-[#B78B49]/70 shadow-[0_20px_50px_rgba(52,37,30,0.12)] ring-1 ring-[#B78B49]/30">
              
              {/* Corner Antique-Gold Ornamental Brackets */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#B78B49] rounded-tl-sm pointer-events-none" />
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#B78B49] rounded-tr-sm pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#B78B49] rounded-bl-sm pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#B78B49] rounded-br-sm pointer-events-none" />

              {/* Inner Arch Window */}
              <div className="relative rounded-2xl overflow-hidden bg-[#34251E] aspect-[4/5] shadow-inner group">
                <img
                  src="/assets/praveena_thakur/praveena_thakur_mandir_portrait.png"
                  alt="Smt. Pravina Hitendra Thakur at Shri Dwarkadhish Mandir, Shirgaon, Virar East"
                  className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.03] transition-transform duration-700 ease-out group-hover:scale-102"
                  loading="lazy"
                />

                {/* Subtle Inner Warm Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#34251E]/80 via-transparent to-black/10 pointer-events-none" />

                {/* Bottom Dignified Caption Bar */}
                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white bg-gradient-to-t from-[#34251E] via-[#34251E]/85 to-transparent">
                  <div className="flex items-center gap-2 mb-1.5">
                    <DiyaAccent animated={false} />
                    <span className="font-cinzel text-xs uppercase tracking-widest text-[#EFE2D1] font-bold">
                      {tDict.vision.featuredName}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#F8F2E8]/90 font-serif leading-snug">
                    {tDict.vision.featuredRole}
                  </p>
                </div>

                {/* Expand Image Button */}
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(VISION_PHOTOS[5])}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-[#34251E]/75 hover:bg-[#B78B49] text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-md active:scale-95"
                  aria-label={tDict.vision.btnViewLightbox}
                  title={tDict.vision.btnViewLightbox}
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              {/* Frame Base Dedication Tag */}
              <div className="pt-3 pb-1 text-center">
                <p className="font-cinzel text-xs text-[#76502F] tracking-widest uppercase font-semibold">
                  ॥ श्री द्वारकाधीश मंदिर · संकल्प पूर्ती ॥
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column (50% desktop): Dignified Biography & Chapter I */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* Chapter I Card */}
            <div className="bg-[#FFFDF8] rounded-2xl border border-[#D8C2A4] p-7 sm:p-9 shadow-[0_10px_30px_rgba(52,37,30,0.05)] relative overflow-hidden mb-6">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#B78B49]/10 to-transparent pointer-events-none" />

              <div className="flex items-center gap-2.5 mb-3">
                <span className="px-3 py-1 rounded-full text-[11px] font-cinzel font-bold tracking-widest uppercase bg-[#F3E7D6] text-[#642B37] border border-[#B78B49]/40">
                  {tDict.vision.chapter1Title}
                </span>
              </div>

              <h3 className="font-serif-royal text-2xl sm:text-3xl font-bold text-[#34251E] mb-3">
                {tDict.vision.chapter1Subtitle}
              </h3>

              <p className="text-base sm:text-lg text-[#523725] leading-relaxed mb-4">
                {tDict.vision.chapter1Text1}
              </p>

              <p className="text-sm sm:text-base text-[#76502F] leading-relaxed">
                {tDict.vision.chapter1Text2}
              </p>
            </div>

            {/* Quick Fact Badges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#F8F2E8] rounded-xl border border-[#D8C2A4]/80 p-4">
                <span className="block text-xs font-cinzel text-[#B78B49] font-bold uppercase tracking-wider mb-1">
                  Public Leadership
                </span>
                <p className="text-sm font-semibold text-[#34251E]">
                  Former Mayor, Vasai-Virar
                </p>
                <p className="text-xs text-[#76502F] mt-0.5">
                  VVCMC Civic Pioneer
                </p>
              </div>

              <div className="bg-[#F8F2E8] rounded-xl border border-[#D8C2A4]/80 p-4">
                <span className="block text-xs font-cinzel text-[#B78B49] font-bold uppercase tracking-wider mb-1">
                  Consecration
                </span>
                <p className="text-sm font-semibold text-[#34251E]">
                  November 2025
                </p>
                <p className="text-xs text-[#76502F] mt-0.5">
                  Vedic Pran Pratishtha
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* =====================================================================
            3. CHAPTER II — FROM VISION TO SACRED REALITY (DEVELOPMENT TIMELINE)
           ===================================================================== */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="mb-20 sm:mb-28"
        >
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-cinzel font-bold tracking-widest uppercase bg-[#F3E7D6] text-[#642B37] border border-[#B78B49]/40 mb-2">
              {tDict.vision.chapter2Title}
            </span>
            <h3 className="font-serif-royal text-2xl sm:text-3xl lg:text-4xl font-bold text-[#34251E]">
              {tDict.vision.chapter2Subtitle}
            </h3>
          </div>

          {/* Interactive Milestone Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, idx) => {
              const IconComp = m.icon;
              const isActive = activeMilestone === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveMilestone(idx)}
                  className={`group relative rounded-2xl p-6 transition-all duration-300 cursor-pointer border-2 flex flex-col justify-between text-left focus-visible:outline-2 focus-visible:outline-[#B78B49] ${
                    isActive
                      ? 'bg-[#FFFDF8] border-[#B78B49] shadow-[0_12px_32px_rgba(183,139,73,0.18)] scale-[1.02]'
                      : 'bg-[#FFFDF8]/70 hover:bg-[#FFFDF8] border-[#E5D1B6] hover:border-[#B78B49]/60 shadow-xs'
                  }`}
                  aria-pressed={isActive}
                >
                  {/* Top Header */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                          isActive
                            ? 'bg-[#B78B49] text-white shadow-sm'
                            : 'bg-[#F3E7D6] text-[#76502F] group-hover:bg-[#B78B49] group-hover:text-white'
                        }`}
                      >
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="font-cinzel text-xs font-bold tracking-wider text-[#B78B49] px-2.5 py-0.5 rounded-full bg-[#FAF5EB] border border-[#B78B49]/30">
                        {m.year}
                      </span>
                    </div>

                    <h4 className="font-serif-royal text-lg font-bold text-[#34251E] mb-2 group-hover:text-[#642B37] transition-colors">
                      {m.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-[#76502F] leading-relaxed">
                      {m.desc}
                    </p>
                  </div>

                  {/* Active Indicator bar */}
                  <div
                    className={`h-1 w-full rounded-full mt-5 transition-all ${
                      isActive ? 'bg-[#B78B49]' : 'bg-transparent group-hover:bg-[#E5D1B6]'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* =====================================================================
            4. CHAPTER III & SECONDARY HERO FEATURE (DEVOTION BEFORE IDOL)
           ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-20 sm:mb-28">
          
          {/* Chapter III Story on Left */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: -20 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="lg:col-span-6"
          >
            <div className="bg-[#FFFDF8] rounded-2xl border border-[#D8C2A4] p-7 sm:p-9 shadow-[0_10px_30px_rgba(52,37,30,0.05)]">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-cinzel font-bold tracking-widest uppercase bg-[#F3E7D6] text-[#642B37] border border-[#B78B49]/40 mb-3">
                {tDict.vision.chapter3Title}
              </span>

              <h3 className="font-serif-royal text-2xl sm:text-3xl font-bold text-[#34251E] mb-4">
                {tDict.vision.chapter3Subtitle}
              </h3>

              <p className="text-base text-[#523725] leading-relaxed mb-4">
                {tDict.vision.chapter3Text1}
              </p>

              <p className="text-sm sm:text-base text-[#76502F] leading-relaxed">
                {tDict.vision.chapter3Text2}
              </p>

              <div className="mt-6 pt-5 border-t border-[#E5D1B6] flex items-center gap-3">
                <Users className="w-5 h-5 text-[#B78B49]" />
                <span className="text-xs font-cinzel text-[#76502F] tracking-wider uppercase font-semibold">
                  Community Coordination · Transparent Devotional Service
                </span>
              </div>
            </div>
          </motion.div>

          {/* Secondary Hero Photo: Pravina ji Praying before Shri Dwarkadhish Idol */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: 20 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-2xl overflow-hidden bg-[#34251E] border-2 border-[#B78B49]/60 shadow-[0_15px_40px_rgba(52,37,30,0.1)] aspect-[16/11] group">
              <img
                src="/assets/praveena_thakur/praveena_thakur_before_idol.png"
                alt="Smt. Pravina Thakur offering prayers before the sacred Dwarkadhish idol"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white">
                <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-cinzel uppercase tracking-wider bg-[#B78B49] text-white font-bold mb-1.5">
                  Devotional Reverence
                </span>
                <p className="text-xs sm:text-sm font-serif text-[#F8F2E8] leading-snug">
                  {tDict.vision.captionIdol}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPhoto(VISION_PHOTOS[0])}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-[#B78B49] text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-md active:scale-95"
                aria-label={tDict.vision.btnViewLightbox}
                title={tDict.vision.btnViewLightbox}
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* =====================================================================
            5. CURATED DOCUMENTARY PHOTOGRAPHIC CHRONICLE & LIGHTBOX GALLERY
           ===================================================================== */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 22 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="mb-20 sm:mb-28"
        >
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="font-cinzel text-xs font-bold text-[#B78B49] uppercase tracking-widest block mb-1">
              Documentary Archives
            </span>
            <h3 className="font-serif-royal text-2xl sm:text-3xl font-bold text-[#34251E] mb-2">
              {tDict.vision.photoChronicleTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#76502F]">
              {tDict.vision.photoChronicleSubtitle}
            </p>
          </div>

          {/* Grid of Authentic Consecration Photographs */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
            {VISION_PHOTOS.map((photo) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setSelectedPhoto(photo)}
                className="group relative rounded-xl overflow-hidden aspect-[4/5] bg-[#34251E] border border-[#D8C2A4] hover:border-[#B78B49] shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-[#B78B49]"
                aria-label={`${photo.badge} - ${photo.date} - ${tDict.vision.btnViewLightbox}`}
              >
                <img
                  src={photo.src}
                  alt={photo.badge}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 pointer-events-none"
                  loading="lazy"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div className="absolute bottom-0 inset-x-0 p-3 text-white pointer-events-none">
                  <span className="text-[10px] font-cinzel font-bold text-[#EFE2D1] block uppercase tracking-wider">
                    {photo.badge}
                  </span>
                  <span className="text-[9px] text-[#F8F2E8]/75 block truncate">
                    {photo.date}
                  </span>
                </div>

                <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <Eye className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* =====================================================================
            6. CHAPTER IV — A LEGACY FOR DEVOTEES & CONCLUDING TRIBUTE QUOTE
           ===================================================================== */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 22 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="relative bg-[#FFFDF8] rounded-3xl border-2 border-[#B78B49]/60 p-8 sm:p-12 lg:p-16 text-center shadow-[0_15px_45px_rgba(183,139,73,0.12)] max-w-4xl mx-auto overflow-hidden"
        >
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-3 left-3 pointer-events-none opacity-40">
            <DiyaAccent animated={false} />
          </div>
          <div className="absolute top-3 right-3 pointer-events-none opacity-40">
            <DiyaAccent animated={false} />
          </div>

          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-cinzel font-bold tracking-widest uppercase bg-[#F3E7D6] text-[#642B37] border border-[#B78B49]/40 mb-4">
            {tDict.vision.chapter4Title}
          </span>

          <h3 className="font-serif-royal text-2xl sm:text-3xl lg:text-4xl font-bold text-[#34251E] mb-4">
            {tDict.vision.chapter4Subtitle}
          </h3>

          <p className="text-base sm:text-lg text-[#523725] leading-relaxed max-w-2xl mx-auto mb-8">
            {tDict.vision.chapter4Text1}
          </p>

          {/* Concluding Tribute Banner */}
          <div className="relative inline-block bg-[#F8F2E8] border border-[#B78B49] rounded-2xl py-5 px-8 sm:px-12 shadow-inner">
            <p className="font-serif-royal text-lg sm:text-xl lg:text-2xl font-bold text-[#642B37] tracking-tight italic">
              {tDict.vision.chapter4Quote}
            </p>
            <span className="block mt-2 font-cinzel text-xs text-[#76502F] tracking-widest uppercase font-semibold">
              ॥ श्री द्वारकाधीश अर्पणमस्तु ॥
            </span>
          </div>
        </motion.div>

      </div>

      {/* =====================================================================
          7. LIGHTBOX MODAL FOR FULL-RESOLUTION DOCUMENTARY PHOTOGRAPHS
         ===================================================================== */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative max-w-4xl w-full bg-[#1F1713] rounded-2xl overflow-hidden border border-[#B78B49]/50 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-[#B78B49] text-white border border-white/20 transition-colors cursor-pointer"
                aria-label={tDict.vision.closeLightbox}
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo Display */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-black max-h-[75vh] flex items-center justify-center">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.badge}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Caption Footer */}
              <div className="p-5 sm:p-6 bg-[#2B1F19] border-t border-[#B78B49]/30 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-cinzel font-bold bg-[#B78B49] text-white">
                      {selectedPhoto.badge}
                    </span>
                    <span className="text-xs text-[#EFE2D1] font-cinzel">
                      {selectedPhoto.date}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#F8F2E8]/90 font-serif">
                    {selectedPhoto.id === 'idol-prayer' && tDict.vision.captionIdol}
                    {selectedPhoto.id === 'ceremony' && tDict.vision.captionCeremony}
                    {selectedPhoto.id === 'golden-hour' && tDict.vision.captionGoldenHour}
                    {selectedPhoto.id === 'shrine-prayer' && tDict.vision.captionShrine}
                    {selectedPhoto.id === 'enhanced-portrait' && tDict.vision.captionPortrait}
                    {selectedPhoto.id === 'mandir-portrait' && tDict.vision.captionMandir}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  className="px-4 py-2 rounded-lg text-xs font-cinzel font-bold tracking-wider uppercase bg-[#B78B49] hover:bg-[#8D6B37] text-white transition-colors cursor-pointer shrink-0"
                >
                  {tDict.vision.closeLightbox}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
