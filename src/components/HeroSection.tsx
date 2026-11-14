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
  reducedMotion?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = React.memo(({
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
    <section
      id="overview"
      className="relative w-full min-h-[calc(100svh-4rem)] sm:min-h-[calc(100svh-5rem)] flex flex-col overflow-hidden bg-[#20140D] text-[#FFFCF7]"
    >
      {/* =========================================================================
          DESKTOP & LARGE SCREENS (lg+):
          Full-bleed borderless first-screen hero filling 100% of viewport height
          below the header (min-h-[calc(100svh-5rem)]). Temple image spans
          edge-to-edge with zero brown/white borders or matte bars.
         ========================================================================= */}
      {isDesktop ? (
        <div className="relative flex-1 flex flex-col justify-between min-h-[calc(100svh-5rem)] overflow-hidden">
          {/* Full-Bleed Borderless Background Photograph */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <picture className="block w-full h-full">
              <source srcSet="/assets/aistudio/Golden_Temple_at_Sunrise_deacf4d9.webp" type="image/webp" />
              <img
                src="/assets/aistudio/Golden_Temple_at_Sunrise_deacf4d9.png"
                alt="Shri Dwarkadhish Mandir at golden sunrise in Shirgaon, Virar East showing the full temple complex, manicured gardens, flying yellow dhwaja flag, carved sandstone shikhara, and grand entrance staircase"
                width={1869}
                height={842}
                className="w-full h-full object-cover object-[76%_50%]"
                loading="eager"
                decoding="sync"
                fetchPriority="high"
              />
            </picture>

            {/* Soft Left-Side Editorial Blend (fades transparently before the temple facade) */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to right, rgba(24, 14, 9, 0.90) 0%, rgba(28, 17, 11, 0.72) 22%, rgba(32, 20, 13, 0.34) 38%, transparent 52%)',
              }}
            />

            {/* Subtle Borderless Bottom Atmospheric Scrim */}
            <div
              className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to top, rgba(20, 12, 8, 0.25) 0%, rgba(20, 12, 8, 0.1) 55%, transparent 100%)',
              }}
            />
          </div>

          {/* Floating Golden Particles (Single active desktop instance) */}
          <GoldenParticles reducedMotion={reducedMotion} className="z-10 opacity-65" />

          {/* Cinematic Multi-Layer Temple Bell Atmosphere (Single active desktop instance) */}
          <HeroBellAtmosphere reducedMotion={reducedMotion} />

          {/* Balanced Desktop Left Content Column */}
          <div className="relative z-20 flex-1 flex items-center w-full px-6 lg:pl-8 lg:pr-4 xl:pl-12 2xl:pl-16 py-6">
            <div className="w-full max-w-[400px] xl:max-w-[520px] 2xl:max-w-[560px] text-left">
              {/* Sacred Kicker */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#24150D]/90 border border-[#B68A45]/45 text-[11px] xl:text-xs font-cinzel text-[#D8C2A4] mb-2.5 xl:mb-3 shadow-xs">
                <Sparkles className="w-3 h-3 text-[#B68A45]" />
                <span className="font-semibold tracking-wider text-[#FFFCF7]">{tDict.hero.kickerLocality}</span>
                <span className="text-[#B68A45]">·</span>
                <span className="text-[#D8C2A4]">{tDict.hero.kickerDistrict}</span>
              </div>

              {/* Main Primary Heading */}
              <h1 className="font-devanagari text-[1.75rem] lg:text-[2rem] xl:text-[2.45rem] font-bold tracking-tight text-[#FFFCF7] leading-[1.15] drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
                {tDict.hero.heading}
              </h1>

              {/* Golden Line Divider */}
              <div className="flex items-center gap-2.5 my-2 xl:my-2.5">
                <div className="h-[1.5px] w-16 bg-gradient-to-r from-transparent via-[#B68A45] to-[#B68A45]" />
                <span className="w-2 h-2 rotate-45 bg-[#B68A45] shadow-[0_0_6px_#B68A45]" />
                <div className="h-[1.5px] w-16 bg-gradient-to-l from-transparent via-[#B68A45] to-[#B68A45]" />
              </div>

              {/* Values Sub-heading */}
              <div className="font-devanagari text-[12px] xl:text-[14px] font-medium tracking-[0.2em] text-[#D8C2A4] drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)] mb-1.5 xl:mb-2">
                {tDict.hero.virtues}
              </div>

              {/* Supporting Line */}
              <p className="font-serif-royal italic text-[15px] xl:text-[17.5px] text-[#F8F1E5] font-medium tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)] mb-2 xl:mb-2.5">
                {tDict.hero.tagline}
              </p>

              {/* Concise Devotional Context */}
              <p className="text-[12.5px] xl:text-[14px] text-[#D8C2A4] leading-snug xl:leading-relaxed mb-4 xl:mb-5 max-w-lg drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)]">
                {tDict.hero.description}
              </p>

              {/* Hero Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 xl:gap-2.5">
                {/* Button 1: Darshan Information */}
                <button
                  type="button"
                  onClick={() => onExplore('darshan')}
                  className="px-3.5 xl:px-4 py-2 xl:py-2.5 text-[12px] xl:text-[13px] font-semibold tracking-wide text-[#FFFCF7] bg-[#3B2518]/92 hover:bg-[#4A3022] border border-[#B68A45]/80 rounded-xs shadow-md hover:shadow-[#B68A45]/25 transition-colors duration-200 flex items-center gap-2 group cursor-pointer"
                >
                  <Clock className="w-4 h-4 text-[#D8C2A4] shrink-0" />
                  <span className="font-medium">{tDict.hero.btnDarshanInfo}</span>
                  <span className="text-[#D8C2A4]/90 text-[11px] xl:text-[11.5px] font-normal hidden sm:inline">
                    — {tDict.hero.btnDarshanSub}
                  </span>
                </button>

                {/* Button 2: Plan Your Visit — Direct Google Maps Directions */}
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 xl:px-4 py-2 xl:py-2.5 text-[12px] xl:text-[13px] font-bold tracking-wide text-[#20140D] bg-gradient-to-r from-[#B68A45] via-[#C9964E] to-[#B68A45] hover:from-[#A57A3A] hover:to-[#B68A45] border border-[#F8F1E5]/40 rounded-xs shadow-lg transition-colors duration-200 flex items-center gap-2 group cursor-pointer"
                  title="Get Google Maps directions to Shri Dwarkadhish Mandir"
                >
                  <Navigation className="w-4 h-4 text-[#20140D] shrink-0" />
                  <span>{tDict.hero.btnPlanVisit}</span>
                  <span className="text-[#382317] text-[11px] xl:text-[11.5px] font-medium hidden sm:inline">
                    — {tDict.hero.btnPlanSub}
                  </span>
                </a>

                {/* Auxiliary Pilgrim Guide with Dedicated High-Contrast Background */}
                <button
                  type="button"
                  onClick={onOpenPlanner}
                  className="px-3.5 py-2 xl:py-2.5 text-[12px] xl:text-[12.5px] font-medium text-[#F8F1E5] hover:text-[#FFFCF7] bg-[#22130B]/90 hover:bg-[#321F14] border border-[#B68A45]/45 rounded-xs shadow-md flex items-center gap-1.5 transition-colors duration-200 cursor-pointer"
                  title="Open the step-by-step pilgrimage planning guide"
                >
                  <Compass className="w-3.5 h-3.5 text-[#D8A85A] shrink-0" />
                  <span>{tDict.hero.btnGuide}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Operational Utility Strip with 20% Background Opacity */}
          <div className="relative z-20 w-full bg-[#160D08]/20 border-t border-[#FFFCF7]/15 text-[#F8F1E5] [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]">
            <div className="w-full max-w-[min(98vw,1920px)] mx-auto px-6 lg:px-8 xl:px-12 py-3">
              <div className="grid grid-cols-4 gap-4 text-[11.5px] divide-x divide-[#FFFCF7]/15">
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
           Full-bleed borderless architectural temple photograph occupying 100%
           of the opening viewport (min-h-[calc(100svh-4rem)] sm:min-h-[calc(100svh-5rem)]),
           with no upper particles or hanging-bell silhouettes obstructing the sky
           or shikhara, and only the essential heading, 2 quick buttons, and
           single-row 20% opacity schedule strip along the bottom edge.
           ========================================================================= */
        <div className="relative flex-1 flex flex-col justify-end min-h-[calc(100svh-4rem)] sm:min-h-[calc(100svh-5rem)] overflow-hidden">
          {/* Full-Bleed Borderless Mobile Background Photograph */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <picture className="block w-full h-full">
              <source srcSet="/assets/aistudio/Golden_Temple_at_Sunrise_deacf4d9.webp" type="image/webp" />
              <img
                src="/assets/aistudio/Golden_Temple_at_Sunrise_deacf4d9.png"
                alt="Shri Dwarkadhish Mandir at golden sunrise in Shirgaon, Virar East showing the full temple complex, manicured gardens, flying yellow dhwaja flag, carved sandstone shikhara, and grand entrance staircase"
                width={1869}
                height={842}
                className="w-full h-full object-cover object-[70%_46%] sm:object-[72%_44%]"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </picture>

            {/* Minimal Bottom-Only Scrim keeping 80%+ of Temple Complex, Dhwaja & Sky bright */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to top, rgba(18, 10, 6, 0.84) 0%, rgba(18, 10, 6, 0.44) 17%, transparent 34%)',
              }}
            />
          </div>

          {/* Clear Upper Temple Showcase Spacer — leaves Golden Temple unobstructed */}
          <div className="flex-1 min-h-[54svh]" aria-hidden="true" />

          {/* Ultra-Compact Mobile Critical Overlay */}
          <div
            data-testid="mobile-hero-compact-overlay"
            className="relative z-20 px-4 sm:px-6 md:px-10 pt-2 pb-2.5 flex flex-col justify-end"
          >
            {/* Main Primary Heading */}
            <h1 className="font-devanagari text-[1.3rem] sm:text-[1.65rem] font-bold tracking-tight text-[#FFFCF7] leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.92)]">
              {tDict.hero.heading}
            </h1>

            {/* Compact Values Line */}
            <div className="flex items-center gap-2 mt-0.5 mb-2">
              <div className="font-devanagari text-[10.5px] sm:text-[12.5px] font-medium tracking-[0.16em] text-[#E6D6C0] drop-shadow-[0_1px_6px_rgba(0,0,0,0.92)]">
                {tDict.hero.virtues}
              </div>
              <span className="h-[1px] flex-1 max-w-[56px] bg-gradient-to-r from-[#B68A45] to-transparent" aria-hidden="true" />
            </div>

            {/* Compact 2-Button Action Row */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onExplore('darshan')}
                className="w-full px-2.5 py-1.5 text-[11px] sm:text-[12px] font-semibold tracking-wide text-[#FFFCF7] bg-[#3B2518]/90 hover:bg-[#4A3022] border border-[#B68A45]/80 rounded-xs shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-98 transition-colors"
              >
                <Clock className="w-3.5 h-3.5 text-[#D8C2A4] shrink-0" aria-hidden="true" />
                <span className="truncate">{tDict.hero.btnDarshanInfo}</span>
              </button>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-2.5 py-1.5 text-[11px] sm:text-[12px] font-bold tracking-wide text-[#20140D] bg-gradient-to-r from-[#B68A45] via-[#C9964E] to-[#B68A45] hover:from-[#A57A3A] hover:to-[#B68A45] border border-[#F8F1E5]/40 rounded-xs shadow-lg flex items-center justify-center gap-1.5 cursor-pointer active:scale-98 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-[#20140D] shrink-0" aria-hidden="true" />
                <span className="truncate">{tDict.hero.btnPlanVisit}</span>
              </a>
            </div>

            {/* Ultra-Slim Single-Row Operational Utility Strip (20% Background Opacity) */}
            <div className="mt-1.5 px-2.5 py-1.5 rounded-sm bg-[#160D08]/20 border border-[#FFFCF7]/20 flex items-center justify-between gap-2 text-[9.5px] sm:text-[10.5px] text-[#F8F1E5] [text-shadow:0_1px_3px_rgba(0,0,0,0.95)]">
              <div className="flex items-center gap-1.5 min-w-0">
                <Clock className="w-3 h-3 text-[#B68A45] shrink-0" aria-hidden="true" />
                <span className="font-semibold text-[#FFFCF7] truncate">{tDict.hero.statDailyHours}</span>
              </div>

              <span className="text-[#FFFCF7]/30 shrink-0" aria-hidden="true">|</span>

              <div className="flex items-center gap-1.5 min-w-0">
                <div className="w-1.5 h-1.5 rounded-full bg-[#B68A45] shadow-[0_0_4px_#B68A45] shrink-0" aria-hidden="true" />
                <span className="text-[#D8C2A4] uppercase text-[8.5px] shrink-0">{tDict.hero.statSandhyaAarti}:</span>
                <span className="font-semibold text-[#FFFCF7] truncate">{tDict.hero.statSandhyaTime}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
});
