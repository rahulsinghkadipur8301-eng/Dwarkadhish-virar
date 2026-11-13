import React, { useEffect, useState } from 'react';
import { Language, TEMPLE_LOCATION_RECORD, getGoogleMapsDirectionsUrl } from '../data/templeData';
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
  onExplore,
  onOpenPlanner,
  reducedMotion = false,
}) => {
  const { tDict } = useI18n();
  const loc = TEMPLE_LOCATION_RECORD;
  const directionsUrl = getGoogleMapsDirectionsUrl(loc);

  // Mount only the active responsive branch's heavy bell/particle atmosphere to avoid double RAF loops
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)').matches : true
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(min-width: 1024px)');
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    setIsDesktop(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return (
    <section id="overview" className="relative w-full overflow-hidden bg-[#20140D] text-[#FFFCF7] border-b border-[#B68A45]/30">
      {/* =========================================================================
          DESKTOP & LARGE SCREENS (lg+):
          Sized cleanly to h-[calc(100svh-5rem)] so the entire hero + utility strip
          fits 100% on the first viewport above the fold, with compact typography (~50% smaller)
          so the carved sandstone shikhara shines unobstructed.
         ========================================================================= */}
      {isDesktop ? (
        <div className="flex relative h-[calc(100svh-5rem)] min-h-[540px] max-h-[820px] flex-col justify-between overflow-hidden">
          {/* Full-Width Temple Background Image — renders immediately for fast LCP */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="/dwarkadhish_temple_widescreen_4k.webp"
              alt="Shri Dwarkadhish Mandir at sunset in Shirgaon, Virar East showing intricate sandstone carved shikhara spire, flying yellow dhwaja flag, and grand entrance staircase"
              className={`w-full h-full object-cover object-[72%_36%] ${
                !reducedMotion ? 'animate-subtle-zoom' : ''
              }`}
              loading="eager"
              decoding="sync"
              fetchPriority="high"
            />

            {/* Desktop Left Dark Warm Gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to right, rgba(32, 20, 13, 0.92) 0%, rgba(45, 28, 18, 0.78) 34%, rgba(55, 34, 22, 0.38) 58%, rgba(20, 13, 8, 0.10) 80%, rgba(20, 13, 8, 0.25) 100%)',
              }}
            />

            {/* Top & Bottom Vignettes */}
            <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-[#20140D]/80 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#20140D] to-transparent pointer-events-none" />
          </div>

          {/* Floating Golden Particles (Single active desktop instance) */}
          <GoldenParticles reducedMotion={reducedMotion} className="z-10 opacity-70" />

          {/* Cinematic Multi-Layer Temple Bell Atmosphere (Single active desktop instance) */}
          <HeroBellAtmosphere reducedMotion={reducedMotion} />

          {/* Balanced Desktop Left Content Column (+15% scaled typography & CTAs within 100svh fit) */}
          <div className="relative z-20 w-full px-6 lg:pl-8 lg:pr-6 xl:pl-12 2xl:pl-16 py-6 my-auto flex justify-start">
            <div className="w-full max-w-lg xl:max-w-[36rem] text-left">
              {/* Sacred Kicker */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#321F14]/80 border border-[#B68A45]/45 backdrop-blur-sm text-[11.5px] xl:text-xs font-cinzel text-[#D8C2A4] mb-3">
                <Sparkles className="w-3 h-3 text-[#B68A45]" />
                <span className="font-semibold tracking-wider text-[#FFFCF7]">{tDict.hero.kickerLocality}</span>
                <span className="text-[#B68A45]">·</span>
                <span className="text-[#D8C2A4]">{tDict.hero.kickerDistrict}</span>
              </div>

              {/* Main Primary Heading (+15% larger) */}
              <h1 className="font-devanagari text-[1.75rem] lg:text-[2rem] xl:text-[2.45rem] font-bold tracking-tight text-[#FFFCF7] leading-[1.16] drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
                {tDict.hero.heading}
              </h1>

              {/* Golden Line Divider */}
              <div className="flex items-center gap-2.5 my-2.5">
                <div className="h-[1.5px] w-16 bg-gradient-to-r from-transparent via-[#B68A45] to-[#B68A45]" />
                <span className="w-2 h-2 rotate-45 bg-[#B68A45] shadow-[0_0_6px_#B68A45]" />
                <div className="h-[1.5px] w-16 bg-gradient-to-l from-transparent via-[#B68A45] to-[#B68A45]" />
              </div>

              {/* Values Sub-heading */}
              <div className="font-devanagari text-[12.5px] xl:text-[14px] font-medium tracking-[0.2em] text-[#D8C2A4] drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)] mb-2">
                {tDict.hero.virtues}
              </div>

              {/* Supporting Line */}
              <p className="font-serif-royal italic text-base xl:text-[17.5px] text-[#F8F1E5] font-medium tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)] mb-2.5">
                {tDict.hero.tagline}
              </p>

              {/* Concise Devotional Context */}
              <p className="text-[13px] xl:text-[14px] text-[#D8C2A4] leading-relaxed mb-5 max-w-lg drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)]">
                {tDict.hero.description}
              </p>

              {/* Hero Action Buttons (+15% scaled cleanly inside above-the-fold layout) */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Button 1: Darshan Information */}
                <button
                  type="button"
                  onClick={() => onExplore('darshan')}
                  className="px-4 py-2.5 text-[12.5px] xl:text-[13px] font-semibold tracking-wide text-[#FFFCF7] bg-[#4A3022]/90 hover:bg-[#382317] border border-[#B68A45] rounded-xs shadow-md hover:shadow-[#B68A45]/25 backdrop-blur-sm transition-all duration-200 flex items-center gap-2 group cursor-pointer"
                >
                  <Clock className="w-4 h-4 text-[#D8C2A4] shrink-0" />
                  <span className="font-medium">{tDict.hero.btnDarshanInfo}</span>
                  <span className="text-[#D8C2A4]/85 text-[11.5px] font-normal hidden sm:inline">
                    — {tDict.hero.btnDarshanSub}
                  </span>
                </button>

                {/* Button 2: Plan Your Visit — Direct Google Maps Directions */}
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 text-[12.5px] xl:text-[13px] font-bold tracking-wide text-[#20140D] bg-gradient-to-r from-[#B68A45] via-[#C9964E] to-[#B68A45] hover:from-[#A57A3A] hover:to-[#B68A45] border border-[#F8F1E5]/40 rounded-xs shadow-lg transition-all duration-200 flex items-center gap-2 group cursor-pointer"
                  title="Get Google Maps directions to Shri Dwarkadhish Mandir"
                >
                  <Navigation className="w-4 h-4 text-[#20140D] shrink-0" />
                  <span>{tDict.hero.btnPlanVisit}</span>
                  <span className="text-[#382317] text-[11.5px] font-medium hidden sm:inline">
                    — {tDict.hero.btnPlanSub}
                  </span>
                </a>

                {/* Auxiliary Pilgrim Guide */}
                <button
                  type="button"
                  onClick={onOpenPlanner}
                  className="px-3 py-2 text-[12.5px] text-[#D8C2A4] hover:text-[#FFFCF7] hover:underline flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Open the step-by-step pilgrimage planning guide"
                >
                  <Compass className="w-3.5 h-3.5 text-[#B68A45]" />
                  <span>{tDict.hero.btnGuide}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Compact Desktop Operational Utility Ribbon (Fits cleanly inside 100svh fold) */}
          <div className="relative z-20 w-full border-t border-[#B68A45]/30 bg-[#20140D]/88 backdrop-blur-md text-[#F8F1E5]">
            <div className="w-full max-w-[min(98vw,1920px)] mx-auto px-6 lg:px-8 xl:px-12 py-2.5">
              <div className="grid grid-cols-4 gap-4 text-[11.5px] divide-x divide-[#B68A45]/20">
                <div className="flex items-center gap-2 pr-2">
                  <Clock className="w-3.5 h-3.5 text-[#B68A45] shrink-0" />
                  <div>
                    <span className="block text-[9.5px] text-[#D8C2A4] uppercase tracking-wider font-medium">
                      {tDict.hero.statDailyDarshan}
                    </span>
                    <span className="font-semibold text-[#FFFCF7]">{tDict.hero.statDailyHours}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-4 pr-2">
                  <div className="w-2 h-2 rounded-full bg-[#B68A45] shadow-[0_0_6px_#B68A45] shrink-0" />
                  <div>
                    <span className="block text-[9.5px] text-[#D8C2A4] uppercase tracking-wider font-medium">
                      {tDict.hero.statSandhyaAarti}
                    </span>
                    <span className="font-semibold text-[#FFFCF7]">{tDict.hero.statSandhyaTime}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-4 pr-2">
                  <MapPin className="w-3.5 h-3.5 text-[#B68A45] shrink-0" />
                  <div>
                    <span className="block text-[9.5px] text-[#D8C2A4] uppercase tracking-wider font-medium">
                      {tDict.hero.statSanctuary}
                    </span>
                    <span className="font-semibold text-[#FFFCF7] truncate block">
                      {tDict.hero.statDistance}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-4">
                  <div className="w-2 h-2 rounded-full bg-[#376C68] shrink-0" />
                  <div>
                    <span className="block text-[9.5px] text-[#D8C2A4] uppercase tracking-wider font-medium">
                      {tDict.hero.statDistrict}
                    </span>
                    <a
                      href={directionsUrl}
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
      ) : (
        /* =========================================================================
           MOBILE & TABLET SCREENS (< lg):
           Scaled +15% typography & buttons while preserving first-screen fit.
           ========================================================================= */
        <div className="w-full min-h-[calc(100svh-5rem)] flex flex-col justify-between">
          {/* 1. Mobile & Tablet Unobstructed Temple Showcase */}
          <div className="relative w-full h-[200px] sm:h-[265px] md:h-[315px] overflow-hidden bg-[#180E09]">
            <img
              src="/dwarkadhish_temple_widescreen_4k.webp"
              alt="Shri Dwarkadhish Mandir at sunset in Shirgaon, Virar East showing intricate sandstone carved shikhara spire and flying yellow dhwaja flag"
              className={`w-full h-full object-cover object-[70%_25%] ${
                !reducedMotion ? 'animate-subtle-zoom' : ''
              }`}
              loading="eager"
              decoding="sync"
              fetchPriority="high"
            />

            {/* Top and Bottom Edge Blends */}
            <div className="absolute top-0 inset-x-0 h-14 bg-gradient-to-b from-[#20140D]/70 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#20140D] via-[#20140D]/60 to-transparent pointer-events-none" />

            {/* Single Active Mobile Particle & Bell Instance */}
            <GoldenParticles reducedMotion={reducedMotion} className="z-10 opacity-60" />
            <HeroBellAtmosphere reducedMotion={reducedMotion} />

            {/* Location Badge (+15% scaled) */}
            <div className="absolute top-2.5 left-2.5 z-20">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#20140D]/80 border border-[#B68A45]/50 backdrop-blur-md text-[10.5px] font-cinzel text-[#F8F1E5]">
                <Sparkles className="w-2.5 h-2.5 text-[#B68A45]" />
                <span className="font-semibold">{tDict.hero.kickerLocality}</span>
              </div>
            </div>
          </div>

          {/* 2. Mobile Stacked Content Section (+15% scaled typography) */}
          <div className="relative z-20 px-4 sm:px-6 md:px-10 pt-2.5 pb-3.5 bg-[#20140D] flex-1 flex flex-col justify-center">
            {/* Main Primary Heading */}
            <h1 className="font-devanagari text-[1.45rem] sm:text-[1.75rem] md:text-[2.15rem] font-bold tracking-tight text-[#FFFCF7] leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              {tDict.hero.heading}
            </h1>

            {/* Compact Golden Line */}
            <div className="flex items-center gap-1.5 my-1.5">
              <div className="h-[1.5px] w-14 bg-gradient-to-r from-transparent via-[#B68A45] to-[#B68A45]" />
              <span className="w-1.5 h-1.5 rotate-45 bg-[#B68A45]" />
              <div className="h-[1.5px] w-14 bg-gradient-to-l from-transparent via-[#B68A45] to-[#B68A45]" />
            </div>

            {/* Values Sub-heading */}
            <div className="font-devanagari text-[11.5px] sm:text-[13.5px] font-medium tracking-[0.18em] text-[#D8C2A4] mb-1">
              {tDict.hero.virtues}
            </div>

            {/* Supporting Line */}
            <p className="font-serif-royal italic text-base sm:text-lg text-[#F8F1E5] font-medium tracking-wide mb-1.5">
              {tDict.hero.tagline}
            </p>

            {/* Concise Context */}
            <p className="text-[12.5px] sm:text-[13.5px] text-[#D8C2A4] leading-snug sm:leading-relaxed mb-3.5 max-w-xl">
              {tDict.hero.description}
            </p>

            {/* Primary Buttons on Mobile (+15% larger) */}
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => onExplore('darshan')}
                className="w-full sm:w-auto px-4 py-2.5 text-[12.5px] font-semibold tracking-wide text-[#FFFCF7] bg-[#4A3022] hover:bg-[#382317] border border-[#B68A45] rounded-xs shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all"
              >
                <Clock className="w-4 h-4 text-[#D8C2A4]" />
                <span className="font-medium">{tDict.hero.btnDarshanInfo}</span>
                <span className="text-[#D8C2A4]/85 text-[11px] font-normal">
                  — {tDict.hero.btnDarshanSub}
                </span>
              </button>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2.5 text-[12.5px] font-bold tracking-wide text-[#20140D] bg-gradient-to-r from-[#B68A45] via-[#C9964E] to-[#B68A45] hover:from-[#A57A3A] hover:to-[#B68A45] border border-[#F8F1E5]/40 rounded-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all"
              >
                <Navigation className="w-4 h-4 text-[#20140D]" />
                <span>{tDict.hero.btnPlanVisit}</span>
                <span className="text-[#382317] text-[11px] font-medium">
                  — {tDict.hero.btnPlanSub}
                </span>
              </a>
            </div>

            {/* Guide Link */}
            <div className="mt-2 text-center sm:text-left">
              <button
                type="button"
                onClick={onOpenPlanner}
                className="text-[12.5px] text-[#D8C2A4] hover:text-[#FFFCF7] underline inline-flex items-center gap-1.5 cursor-pointer py-0.5"
              >
                <Compass className="w-3.5 h-3.5 text-[#B68A45]" />
                <span>{tDict.hero.btnGuide}</span>
              </button>
            </div>
          </div>

          {/* 3. Mobile Utility Strip */}
          <div className="w-full border-t border-[#B68A45]/30 bg-[#180E09] text-[#F8F1E5] px-4 py-2">
            <div className="grid grid-cols-2 gap-2 text-[10.5px]">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-[#B68A45] shrink-0" />
                <div>
                  <span className="block text-[8.5px] text-[#D8C2A4] uppercase">{tDict.hero.statDailyDarshan}</span>
                  <span className="font-semibold text-[#FFFCF7]">{tDict.hero.statDailyHours}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#B68A45] shadow-[0_0_4px_#B68A45] shrink-0" />
                <div>
                  <span className="block text-[8.5px] text-[#D8C2A4] uppercase">{tDict.hero.statSandhyaAarti}</span>
                  <span className="font-semibold text-[#FFFCF7]">{tDict.hero.statSandhyaTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
