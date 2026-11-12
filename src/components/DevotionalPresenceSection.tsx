import React, { useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { Sparkles, BookOpen } from 'lucide-react';
import { PeacockFeather, FluteDivider, DiyaAccent } from './KrishnaMotifs';
import { TempleSanctumFrame } from './TempleSanctumFrame';
import { useI18n } from '../i18n/I18nContext';

interface DevotionalPresenceSectionProps {
  reducedMotion?: boolean;
}

/**
 * Exact deterministic opening and closing model as specified:
 * 0%–12%: Curtains remain closed as the shrine begins entering.
 * 12%–42%: Left and right curtains progressively open.
 * 42%–65%: Curtains remain fully open for darshan and ceremonial flower shower.
 * 65%–95%: Curtains progressively close as the shrine moves toward and beyond the top of the viewport.
 * 95%–100%: Curtains fully closed as the shrine exits.
 * Fully reversible based on scroll position without direction flags or timers.
 */
export function calculateExactCurtainOpening(P: number): number {
  if (P <= 0.12) {
    return 0;
  } else if (P < 0.42) {
    return (P - 0.12) / 0.30;
  } else if (P <= 0.65) {
    return 1;
  } else if (P < 0.95) {
    return 1 - (P - 0.65) / 0.30;
  } else {
    return 0;
  }
}

export const DevotionalPresenceSection: React.FC<DevotionalPresenceSectionProps> = ({
  reducedMotion = false,
}) => {
  const { tDict } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const shrineRef = useRef<HTMLDivElement>(null);

  const [manualOpen, setManualOpen] = useState(false);
  const [blessingRevealed, setBlessingRevealed] = useState(false);
  const [currentP, setCurrentP] = useState(0);

  // Viewport-based scroll tracking targeted directly at the sanctum shrine frame
  // Offset "start end" to "end start" maps progress from when the top of the shrine
  // enters the bottom of the viewport to when the bottom of the shrine exits the top.
  const { scrollYProgress } = useScroll({
    target: shrineRef,
    offset: ['start end', 'end start'],
  });

  // Calculate ceremony progress: 0 to 1 during the open interval [0.42, 0.65]
  const ceremonyProgress = manualOpen
    ? 0.50
    : currentP < 0.42
    ? 0
    : currentP <= 0.65
    ? (currentP - 0.42) / (0.65 - 0.42)
    : 1.0;

  // Track scroll position changes deterministically
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setCurrentP(latest);
  });

  // Apple-grade secondary motion transforms linked directly to viewport scroll progress:
  // - 0% to 12%: closed (x: 0%)
  // - 12% to 42%: opening smoothly to -82% (left) / +82% (right)
  // - 42% to 65%: wide open for holy Darshan, keeping 18% gathered velvet draped at pillars
  // - 65% to 95%: closing smoothly back to center
  // - 95% to 100%: closed (x: 0%)
  const leftXTransform = useTransform(
    scrollYProgress,
    [0, 0.12, 0.42, 0.65, 0.95, 1],
    ['0%', '0%', '-82%', '-82%', '0%', '0%']
  );

  const rightXTransform = useTransform(
    scrollYProgress,
    [0, 0.12, 0.42, 0.65, 0.95, 1],
    ['0%', '0%', '82%', '82%', '0%', '0%']
  );

  const seamOpacityTransform = useTransform(
    scrollYProgress,
    [0, 0.12, 0.22, 0.65, 0.85, 0.95, 1],
    [1, 1, 0, 0, 0, 1, 1]
  );

  const glowOpacityTransform = useTransform(
    scrollYProgress,
    [0, 0.12, 0.42, 0.65, 0.95, 1],
    [0.15, 0.15, 0.95, 0.95, 0.15, 0.15]
  );

  // In manual override or reduced motion mode, present curtains open statically
  const effectiveLeftX = manualOpen || reducedMotion ? '-82%' : leftXTransform;
  const effectiveRightX = manualOpen || reducedMotion ? '82%' : rightXTransform;
  const effectiveSeamOpacity = manualOpen || reducedMotion ? 0 : seamOpacityTransform;
  const effectiveGlowOpacity = manualOpen || reducedMotion ? 0.95 : glowOpacityTransform;

  const handleToggleManualOpen = () => {
    setManualOpen((prev) => !prev);
  };

  // Compute active status label according to exact ceremony state
  const getDarshanStatusLabel = (): string => {
    if (manualOpen) return tDict.darshan.divineRevealed;
    if (currentP < 0.12) return tDict.darshan.curtainsClosed;
    if (currentP < 0.42) return tDict.darshan.curtainsOpening;
    if (currentP <= 0.65) {
      if (ceremonyProgress >= 0.15 && ceremonyProgress <= 0.85) {
        return tDict.darshan.flowerShower;
      }
      return tDict.darshan.divineRevealed;
    }
    if (currentP < 0.95) return tDict.darshan.curtainsClosing;
    return tDict.darshan.curtainsClosed;
  };

  return (
    <section
      ref={sectionRef}
      id="presence"
      className="relative w-full bg-[#FBF6ED] border-b border-[#E5D1B6] py-14 sm:py-18 lg:py-24 select-none overflow-hidden"
    >
      {/* Subtle Background Traditional Indian Mandala Accent */}
      <div className="absolute top-6 right-6 w-72 h-72 opacity-[0.035] pointer-events-none transform rotate-12">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="85" stroke="#A67C57" strokeWidth="2" strokeDasharray="6 4" />
          <circle cx="100" cy="100" r="65" stroke="#C59B56" strokeWidth="1.5" />
          <path d="M100 20V180M20 100H180" stroke="#A67C57" strokeWidth="1" />
        </svg>
      </div>

      <div className="w-full max-w-[min(98vw,1840px)] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
        
        {/* Section Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-2 mb-2.5">
            <PeacockFeather size={28} />
            <span className="font-cinzel text-xs sm:text-sm uppercase tracking-widest text-[#A67C57] font-semibold">
              {tDict.darshan.sectionKicker}
            </span>
            <PeacockFeather size={28} className="transform scale-x-[-1]" />
          </div>

          <h2 className="font-serif-royal text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3C2A20] tracking-tight mb-2">
            {tDict.darshan.title}
          </h2>

          <p className="font-devanagari text-xl sm:text-2xl text-[#921B2C] font-semibold tracking-wide mb-3">
            {tDict.darshan.subtitle}
          </p>

          <p className="text-sm sm:text-base text-[#715847] leading-relaxed max-w-2xl mx-auto hidden sm:block mb-4">
            {tDict.darshan.description}
          </p>

          <div className="mt-4">
            <FluteDivider />
          </div>
        </div>

        {/* 2-Column Responsive Balanced Layout (50% Shrine / 50% Commentary) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 2xl:gap-16 items-center w-full">
          
          {/* LEFT COLUMN: Majestic Temple Sanctum Shrine Frame */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center items-center w-full">
            <div className="w-full flex justify-center">
              <TempleSanctumFrame
                shrineRef={shrineRef}
                leftX={effectiveLeftX}
                rightX={effectiveRightX}
                seamOpacity={effectiveSeamOpacity}
                glowOpacity={effectiveGlowOpacity}
                ceremonyProgress={ceremonyProgress}
                manualOpen={manualOpen}
                onToggleManualOpen={handleToggleManualOpen}
                reducedMotion={reducedMotion}
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Devotional Commentary & Gita Shloka */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-6 flex flex-col justify-center w-full">
            
            {/* 1. Regal Story of Dwarkadhish Card */}
            <div className="bg-[#FFFDF8] p-6 sm:p-8 rounded-xl border border-[#D8C2A4] shadow-[0_8px_24px_rgba(42,28,18,0.06)] relative overflow-hidden transition-all duration-500 hover:shadow-md">
              <div className="flex items-center gap-3 mb-3.5">
                <DiyaAccent animated={!reducedMotion} />
                <h3 className="font-serif-royal text-2xl sm:text-3xl font-bold text-[#3C2A20]">
                  {tDict.darshan.storyTitle}
                </h3>
              </div>

              <div className="w-20 h-[2px] bg-gradient-to-r from-[#B68A45] to-transparent mb-4" />

              <p className="text-sm sm:text-base text-[#715847] leading-relaxed mb-3.5">
                {tDict.darshan.storyText1}
              </p>

              <p className="text-sm sm:text-base text-[#715847] leading-relaxed">
                {tDict.darshan.storyText2}
              </p>
            </div>

            {/* 2. Interactive Bhagavad Gita Shloka Card */}
            <div className="bg-[#FFF9EE] p-6 sm:p-8 rounded-xl border-2 border-[#C59B56]/50 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#C59B56]" />
                  <span className="font-cinzel text-xs font-bold text-[#6B4832] uppercase tracking-wider">
                    {tDict.darshan.gitaCardTitle}
                  </span>
                </div>
                <span className="font-devanagari text-sm text-[#921B2C] font-semibold">
                  ॥ ॐ ॥
                </span>
              </div>

              <blockquote className="font-devanagari text-lg sm:text-xl text-[#3C2A20] font-semibold leading-relaxed mb-3.5 pl-3.5 border-l-3 border-[#C59B56]">
                {tDict.darshan.gitaVerse.split('\n').map((line: string, idx: number) => (
                  <React.Fragment key={idx}>
                    {line}
                    {idx < tDict.darshan.gitaVerse.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </blockquote>

              <p className="font-serif-royal italic text-sm sm:text-base text-[#715847] leading-relaxed mb-4">
                {tDict.darshan.gitaTranslation}
              </p>

              <button
                type="button"
                onClick={() => setBlessingRevealed(!blessingRevealed)}
                className="px-4 py-2.5 bg-[#4A3022] hover:bg-[#382317] text-[#FFFCF7] text-xs font-cinzel font-semibold tracking-wider rounded-xs border border-[#C59B56] shadow-xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E5BE75]" />
                <span>
                  {blessingRevealed ? tDict.darshan.gitaBtnHide : tDict.darshan.gitaBtnContemplate}
                </span>
              </button>

              {blessingRevealed && (
                <div className="mt-4 p-4 bg-[#FFFDF8] rounded-lg border border-[#C59B56]/30 text-xs sm:text-sm text-[#5A4515] leading-relaxed shadow-inner">
                  <p className="font-semibold mb-1 text-[#3C2A20]">
                    {tDict.darshan.gitaReflectionTitle}
                  </p>
                  <p>
                    {tDict.darshan.gitaReflectionText}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevotionalPresenceSection;
