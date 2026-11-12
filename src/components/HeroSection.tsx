import React, { useEffect, useState } from 'react';
import { Language, TEMPLE_LOCATION_RECORD, getGoogleMapsSearchUrl } from '../data/templeData';
import { Clock, Navigation, MapPin, Sparkles, Compass } from 'lucide-react';
import { GoldenParticles } from './GoldenParticles';
import { HeroBellAtmosphere } from './HeroBellAtmosphere';
import { useI18n } from '../i18n/I18nContext';

interface HeroSectionProps {
  language: Language;
  onExplore: (tab: string) => void;
  onOpenPlanner: () => void;
  onOpenSevaModal: () => void;
  reducedMotion?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onExplore,
  onOpenPlanner,
  onOpenSevaModal,
  reducedMotion = false,
}) => {
  const { tDict } = useI18n();
  const [isLoaded, setIsLoaded] = useState(false);
  const loc = TEMPLE_LOCATION_RECORD;
  const searchUrl = getGoogleMapsSearchUrl(loc);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="overview" className="relative w-full overflow-hidden bg-[#20140D] text-[#FFFCF7] border-b border-[#B68A45]/30">
      
      {/* =========================================================================
          DESKTOP & LARGE SCREENS (lg:block):
          Full-width 92–100vh hero. Temple is prominent toward centre-right.
          Dark warm gradient on the left ensures crystal-clear text readability
          without covering or obscuring the temple architecture, spire or flag.
         ========================================================================= */}
      <div className="hidden lg:flex relative min-h-[92vh] xl:min-h-screen flex-col justify-between overflow-hidden">
        {/* Full-Width Temple Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/assets/aistudio/dwarkadhish_temple_widescreen_4k_7a041d27.webp"
            alt="Shri Dwarkadhish Mandir at sunset in Shirgaon, Virar East showing intricate sandstone carved shikhara spire, flying yellow dhwaja flag, and grand entrance staircase"
            className={`w-full h-full object-cover object-[72%_36%] transition-opacity duration-1000 ease-out ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${!reducedMotion ? 'animate-subtle-zoom' : ''}`}
            loading="eager"
            decoding="async"
          />

          {/* Desktop Left Dark Warm Gradient (Allows text readability while keeping temple bright) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, rgba(32, 20, 13, 0.94) 0%, rgba(45, 28, 18, 0.82) 34%, rgba(55, 34, 22, 0.42) 60%, rgba(20, 13, 8, 0.12) 82%, rgba(20, 13, 8, 0.28) 100%)',
            }}
          />

          {/* Top & Bottom Vignettes */}
          <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#20140D]/85 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#20140D] to-transparent pointer-events-none" />
        </div>

        {/* Floating Golden Particles */}
        <GoldenParticles reducedMotion={reducedMotion} className="z-10 opacity-70" />

        {/* Cinematic Multi-Layer Temple Bell Atmosphere (Scoped EXCLUSIVELY to Hero) */}
        <HeroBellAtmosphere reducedMotion={reducedMotion} />

        {/* Desktop Left Content Column — Shifted further left */}
        <div className="relative z-20 w-full px-5 sm:px-8 lg:pl-8 lg:pr-6 xl:pl-12 2xl:pl-16 pt-24 pb-16 my-auto flex justify-start">
          <div className="w-full max-w-xl lg:max-w-2xl xl:max-w-3xl text-left">
            
            {/* Sacred Kicker */}
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#321F14]/75 border border-[#B68A45]/40 backdrop-blur-sm text-xs font-cinzel text-[#D8C2A4] mb-4 transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B68A45]" />
              <span className="font-semibold tracking-wider text-[#FFFCF7]">{tDict.hero.kickerLocality}</span>
              <span className="text-[#B68A45]">·</span>
              <span className="text-[#D8C2A4]">{tDict.hero.kickerDistrict}</span>
            </div>

            {/* Main Primary Heading with Fluid clamp() */}
            <h1
              className={`font-devanagari text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-bold tracking-tight text-[#FFFCF7] leading-[1.12] drop-shadow-[0_3px_16px_rgba(0,0,0,0.85)] transition-all duration-700 delay-100 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              {tDict.hero.heading}
            </h1>

            {/* Golden Line Reveal Animation Beneath the Heading */}
            <div
              className={`flex items-center gap-2.5 my-3.5 transition-all duration-700 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
            >
              <div
                className={`h-[2px] bg-gradient-to-r from-transparent via-[#B68A45] to-[#B68A45] ${
                  !reducedMotion ? 'animate-gold-expand' : 'w-28'
                }`}
              />
              <span className="w-2 h-2 rotate-45 bg-[#B68A45] shadow-[0_0_8px_#B68A45]" />
              <div
                className={`h-[2px] bg-gradient-to-l from-transparent via-[#B68A45] to-[#B68A45] ${
                  !reducedMotion ? 'animate-gold-expand' : 'w-28'
                }`}
              />
            </div>

            {/* Values Sub-heading */}
            <div
              className={`font-devanagari text-lg lg:text-2xl font-medium tracking-[0.22em] text-[#D8C2A4] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] mb-2.5 transition-all duration-700 delay-250 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              {tDict.hero.virtues}
            </div>

            {/* Supporting Line */}
            <p
              className={`font-serif-royal italic text-xl lg:text-2xl text-[#F8F1E5] font-medium tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] mb-4 transition-all duration-700 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              {tDict.hero.tagline}
            </p>

            {/* Concise Devotional Context */}
            <p
              className={`text-sm lg:text-base text-[#D8C2A4] leading-relaxed mb-8 max-w-lg drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] transition-all duration-700 delay-400 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              {tDict.hero.description}
            </p>

            {/* Primary Hero Buttons */}
            <div
              className={`flex flex-wrap items-center gap-3.5 transition-all duration-700 delay-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {/* Button 1: Darshan Information */}
              <button
                type="button"
                onClick={() => onExplore('darshan')}
                className="px-6 py-3.5 text-sm font-semibold tracking-wide text-[#FFFCF7] bg-[#4A3022]/90 hover:bg-[#382317] border border-[#B68A45] rounded-xs shadow-lg hover:shadow-[#B68A45]/25 backdrop-blur-sm transition-all duration-300 flex items-center gap-2 group cursor-pointer"
              >
                <Clock className="w-4 h-4 text-[#D8C2A4] group-hover:scale-110 transition-transform" />
                <span className="font-medium">{tDict.hero.btnDarshanInfo}</span>
                <span className="text-[#D8C2A4]/80 text-xs font-normal">
                  — {tDict.hero.btnDarshanSub}
                </span>
              </button>

              {/* Button 2: Plan Your Visit */}
              <a
                href={searchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 text-sm font-bold tracking-wide text-[#20140D] bg-gradient-to-r from-[#B68A45] via-[#C9964E] to-[#B68A45] hover:from-[#A57A3A] hover:to-[#B68A45] border border-[#F8F1E5]/40 rounded-xs shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 group cursor-pointer"
                title="Open verified temple coordinates on Google Maps"
              >
                <Navigation className="w-4 h-4 text-[#20140D] group-hover:rotate-12 transition-transform" />
                <span>{tDict.hero.btnPlanVisit}</span>
                <span className="text-[#382317] text-xs font-medium">
                  — {tDict.hero.btnPlanSub}
                </span>
              </a>

              {/* Auxiliary Pilgrim Guide */}
              <button
                type="button"
                onClick={onOpenPlanner}
                className="px-3.5 py-3 text-xs text-[#D8C2A4] hover:text-[#FFFCF7] hover:underline flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Open the step-by-step pilgrimage planning guide"
              >
                <Compass className="w-3.5 h-3.5 text-[#B68A45]" />
                <span>{tDict.hero.btnGuide}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Operational Utility Ribbon */}
        <div className="relative z-20 w-full border-t border-[#B68A45]/30 bg-[#20140D]/85 backdrop-blur-md text-[#F8F1E5]">
          <div className="w-full max-w-[min(98vw,1920px)] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-4">
            <div className="grid grid-cols-4 gap-6 text-xs divide-x divide-[#B68A45]/20">
              <div className="flex items-center gap-2.5 pr-2">
                <Clock className="w-4 h-4 text-[#B68A45] shrink-0" />
                <div>
                  <span className="block text-[10px] text-[#D8C2A4] uppercase tracking-wider font-medium">
                    {tDict.hero.statDailyDarshan}
                  </span>
                  <span className="font-semibold text-[#FFFCF7]">{tDict.hero.statDailyHours}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pl-4 pr-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#B68A45] shadow-[0_0_6px_#B68A45] shrink-0" />
                <div>
                  <span className="block text-[10px] text-[#D8C2A4] uppercase tracking-wider font-medium">
                    {tDict.hero.statSandhyaAarti}
                  </span>
                  <span className="font-semibold text-[#FFFCF7]">{tDict.hero.statSandhyaTime}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pl-4 pr-2">
                <MapPin className="w-4 h-4 text-[#B68A45] shrink-0" />
                <div>
                  <span className="block text-[10px] text-[#D8C2A4] uppercase tracking-wider font-medium">
                    {tDict.hero.statSanctuary}
                  </span>
                  <span className="font-semibold text-[#FFFCF7] truncate block">
                    {tDict.hero.statDistance}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pl-4">
                <div className="w-2 h-2 rounded-full bg-[#376C68] shrink-0" />
                <div>
                  <span className="block text-[10px] text-[#D8C2A4] uppercase tracking-wider font-medium">
                    {tDict.hero.statDistrict}
                  </span>
                  <a
                    href={searchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#D8C2A4] hover:text-[#FFFCF7] hover:underline truncate block"
                  >
                    19.4674° N, 72.8295° E ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MOBILE & TABLET SCREENS (< lg):
          Separately optimized composition:
          - Top: Unobstructed view of the temple with spire, flying yellow flag,
            sandstone architecture, and grand entrance stairs clearly visible!
            No text or buttons cover the spire or entrance.
          - Bottom: Stacked content with title, values, supporting line, and
            the two primary buttons.
         ========================================================================= */}
      <div className="block lg:hidden w-full">
        {/* 1. Mobile & Tablet Unobstructed Temple Showcase */}
        <div className="relative w-full h-[320px] sm:h-[440px] md:h-[500px] overflow-hidden bg-[#180E09]">
          <img
            src="/assets/aistudio/dwarkadhish_temple_widescreen_4k_7a041d27.webp"
            alt="Shri Dwarkadhish Mandir at sunset in Shirgaon, Virar East showing intricate sandstone carved shikhara spire and flying yellow dhwaja flag"
            className={`w-full h-full object-cover object-[70%_25%] transition-opacity duration-1000 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${!reducedMotion ? 'animate-subtle-zoom' : ''}`}
            loading="eager"
            decoding="async"
          />

          {/* Top and Bottom Edge Blends */}
          <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#20140D]/70 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#20140D] via-[#20140D]/60 to-transparent pointer-events-none" />

          {/* Floating Golden Particles on Mobile */}
          <GoldenParticles reducedMotion={reducedMotion} className="z-10 opacity-60" />

          {/* Scoped Mobile Hero Bell Atmosphere */}
          <HeroBellAtmosphere reducedMotion={reducedMotion} />

          {/* Location Badge on Top Corner */}
          <div className="absolute top-3 left-3 z-20">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#20140D]/80 border border-[#B68A45]/50 backdrop-blur-md text-[10px] font-cinzel text-[#F8F1E5]">
              <Sparkles className="w-3 h-3 text-[#B68A45]" />
              <span className="font-semibold">{tDict.hero.kickerLocality}</span>
            </div>
          </div>
        </div>

        {/* 2. Mobile Stacked Content Section */}
        <div className="relative z-20 px-4 sm:px-6 md:px-12 pt-4 pb-8 bg-[#20140D]">
          
          {/* Main Primary Heading */}
          <h1
            className={`font-devanagari text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FFFCF7] leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            {tDict.hero.heading}
          </h1>

          {/* Golden Line Reveal Animation */}
          <div className="flex items-center gap-2 my-2.5">
            <div className="h-[2px] w-20 bg-gradient-to-r from-transparent via-[#B68A45] to-[#B68A45]" />
            <span className="w-1.5 h-1.5 rotate-45 bg-[#B68A45] shadow-[0_0_6px_#B68A45]" />
            <div className="h-[2px] w-20 bg-gradient-to-l from-transparent via-[#B68A45] to-[#B68A45]" />
          </div>

          {/* Values Sub-heading */}
          <div className="font-devanagari text-base sm:text-lg md:text-xl font-medium tracking-[0.2em] text-[#D8C2A4] drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)] mb-2">
            {tDict.hero.virtues}
          </div>

          {/* Supporting Line */}
          <p className="font-serif-royal italic text-lg sm:text-xl md:text-2xl text-[#F8F1E5] font-medium tracking-wide drop-shadow-sm mb-3">
            {tDict.hero.tagline}
          </p>

          {/* Concise Context */}
          <p className="text-xs sm:text-sm md:text-base text-[#D8C2A4] leading-relaxed mb-6 max-w-xl">
            {tDict.hero.description}
          </p>

          {/* Primary Buttons on Mobile */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Button 1: Darshan Information */}
            <button
              type="button"
              onClick={() => onExplore('darshan')}
              className="w-full sm:w-auto px-5 py-3.5 text-xs sm:text-sm font-semibold tracking-wide text-[#FFFCF7] bg-[#4A3022] hover:bg-[#382317] border border-[#B68A45] rounded-xs shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all"
            >
              <Clock className="w-4 h-4 text-[#D8C2A4]" />
              <span className="font-medium">{tDict.hero.btnDarshanInfo}</span>
              <span className="text-[#D8C2A4]/80 text-[11px] sm:text-xs font-normal">
                — {tDict.hero.btnDarshanSub}
              </span>
            </button>

            {/* Button 2: Plan Your Visit */}
            <a
              href={searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3.5 text-xs sm:text-sm font-bold tracking-wide text-[#20140D] bg-gradient-to-r from-[#B68A45] via-[#C9964E] to-[#B68A45] hover:from-[#A57A3A] hover:to-[#B68A45] border border-[#F8F1E5]/40 rounded-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all"
            >
              <Navigation className="w-4 h-4 text-[#20140D]" />
              <span>{tDict.hero.btnPlanVisit}</span>
              <span className="text-[#382317] text-[11px] sm:text-xs font-medium">
                — {tDict.hero.btnPlanSub}
              </span>
            </a>
          </div>

          {/* Mobile Guide Link */}
          <div className="mt-3 text-center sm:text-left">
            <button
              type="button"
              onClick={onOpenPlanner}
              className="text-xs text-[#D8C2A4] hover:text-[#FFFCF7] underline inline-flex items-center gap-1.5 cursor-pointer py-1"
            >
              <Compass className="w-3.5 h-3.5 text-[#B68A45]" />
              <span>{tDict.hero.btnGuide}</span>
            </button>
          </div>
        </div>

        {/* 3. Mobile Utility Strip */}
        <div className="w-full border-t border-[#B68A45]/30 bg-[#180E09] text-[#F8F1E5] px-4 py-3">
          <div className="grid grid-cols-2 gap-3 text-[11px]">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#B68A45] shrink-0" />
              <div>
                <span className="block text-[9px] text-[#D8C2A4] uppercase">{tDict.hero.statDailyDarshan}</span>
                <span className="font-semibold text-[#FFFCF7]">{tDict.hero.statDailyHours}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#B68A45] shadow-[0_0_4px_#B68A45] shrink-0" />
              <div>
                <span className="block text-[9px] text-[#D8C2A4] uppercase">{tDict.hero.statSandhyaAarti}</span>
                <span className="font-semibold text-[#FFFCF7]">{tDict.hero.statSandhyaTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
