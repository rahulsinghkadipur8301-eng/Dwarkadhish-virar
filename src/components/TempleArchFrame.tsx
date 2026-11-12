import React from 'react';
import { Sparkles, Eye, EyeOff } from 'lucide-react';
import { AnimatedTempleBell } from './AnimatedTempleBell';
import { DivineDarshanCurtains } from './DivineDarshanCurtains';
import { DiyaAccent } from './KrishnaMotifs';

interface TempleArchFrameProps {
  targetRef?: React.RefObject<HTMLElement | null>;
  progress: number;
  manualOpen: boolean;
  onToggleManualOpen: () => void;
  reducedMotion?: boolean;
}

export const TempleArchFrame: React.FC<TempleArchFrameProps> = ({
  targetRef,
  progress,
  manualOpen,
  onToggleManualOpen,
  reducedMotion = false,
}) => {
  // Glow intensity around the frame as darshan opens
  let glowOpacity = 0.2;
  if (manualOpen || reducedMotion) {
    glowOpacity = 0.85;
  } else if (progress > 0.15 && progress < 0.85) {
    glowOpacity = 0.75;
  }

  return (
    <div className="relative w-full max-w-md lg:max-w-lg mx-auto flex flex-col items-center">
      
      {/* 1. Suspended Ceremonial Brass Temple Bell at Top Apex */}
      <div className="relative z-30 -mb-6 flex justify-center">
        <AnimatedTempleBell reducedMotion={reducedMotion} size="md" />
      </div>

      {/* 2. Grand Traditional Indian Temple Sanctum Frame (Prabhavali) */}
      <div className="relative w-full p-3 sm:p-4 bg-gradient-to-b from-[#FFFDF8] via-[#FAF6EE] to-[#EFE2CF] rounded-t-[180px] sm:rounded-t-[210px] rounded-b-2xl border-2 sm:border-[3px] border-[#B68A45] shadow-[0_24px_50px_rgba(42,28,18,0.35)]">
        
        {/* Subtle Ambient Radial Gold Glow around Frame */}
        <div
          style={{
            opacity: glowOpacity,
            background:
              'radial-gradient(ellipse at 50% 30%, rgba(198, 154, 82, 0.45) 0%, rgba(245, 215, 127, 0.2) 50%, transparent 75%)',
            transition: 'opacity 0.3s ease-out',
          }}
          className="absolute -inset-4 rounded-t-[190px] sm:rounded-t-[220px] rounded-b-3xl pointer-events-none z-0 blur-xl"
        />

        {/* Outer Architectural Sandstone & Gold Moulding Carving */}
        <div className="absolute top-2 inset-x-6 sm:inset-x-8 -top-3 pointer-events-none z-20 flex justify-between items-center text-[#B68A45]">
          {/* Left Carved Temple Leaf Finial */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="opacity-80">
            <path d="M12 2 C8 6 4 12 4 18 C8 18 12 16 12 12 C12 16 16 18 20 18 C20 12 16 6 12 2 Z" />
          </svg>
          {/* Top Sanctum Crown Kalash Accent */}
          <div className="px-3 py-0.5 rounded-full bg-[#FFFDF8] border border-[#B68A45] shadow-xs flex items-center gap-1.5 text-[10px] font-cinzel font-bold text-[#6B4832]">
            <Sparkles className="w-3 h-3 text-[#B68A45]" />
            <span>गर्भगृह दर्शन</span>
            <Sparkles className="w-3 h-3 text-[#B68A45]" />
          </div>
          {/* Right Carved Temple Leaf Finial */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="opacity-80 transform scale-x-[-1]">
            <path d="M12 2 C8 6 4 12 4 18 C8 18 12 16 12 12 C12 16 16 18 20 18 C20 12 16 6 12 2 Z" />
          </svg>
        </div>

        {/* Inner Sanctum Alcove with Cusped Arch & Fine Beaded Moulding */}
        <div className="relative rounded-t-[160px] sm:rounded-t-[190px] rounded-b-xl overflow-hidden bg-gradient-to-b from-[#180E09] via-[#24150D] to-[#140B07] border-2 border-[#B68A45]/80 p-2 sm:p-2.5 shadow-inner">
          
          {/* Sanctum Golden Aura (Radiating behind the sacred murti as darshan opens) */}
          <div
            style={{
              opacity: glowOpacity,
              background:
                'radial-gradient(circle at 50% 36%, rgba(245, 215, 127, 0.35) 0%, rgba(198, 154, 82, 0.18) 45%, transparent 75%)',
              transition: 'opacity 0.3s ease-out',
            }}
            className="absolute inset-0 pointer-events-none z-0"
          />

          {/* Fine Beaded Ratna-Mala Inner Gold Trim */}
          <div className="absolute inset-0 pointer-events-none z-30 rounded-t-[160px] sm:rounded-t-[190px] ring-1 ring-inset ring-[#F5D77F]/40" />

          {/* 3. The Authentic, Unaltered Photograph of Shri Dwarkadhish Bhagwan */}
          <div className="relative z-10 w-full flex items-center justify-center overflow-hidden">
            <picture className="w-full flex justify-center">
              <source
                type="image/webp"
                srcSet="/assets/aistudio/dwarkadhish_hero_enhanced_800.webp"
              />
              <img
                src="/assets/aistudio/dwarkadhish_hero_enhanced_4k_e7e52d48.png"
                alt="Shri Dwarkadhish Bhagwan seated in regal simhasana with golden crown, pitambar, and flower garlands at Shirgaon Mandir, Virar East"
                className="w-full h-auto max-h-[460px] sm:max-h-[500px] object-contain object-center block mx-auto drop-shadow-[0_16px_28px_rgba(0,0,0,0.8)]"
                loading="eager"
                decoding="sync"
                referrerPolicy="no-referrer"
              />
            </picture>
          </div>

          {/* 4. Realistic Red Temple Curtains Positioned in Front of the Deity */}
          <DivineDarshanCurtains
            targetRef={targetRef}
            progress={progress}
            manualOpen={manualOpen}
            reducedMotion={reducedMotion}
          />
        </div>

        {/* 5. Lower Pedestal with Sacred Attribution & Interactive Curtain Toggle */}
        <div className="mt-2.5 pt-2 border-t border-[#B68A45]/40 flex flex-col sm:flex-row items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-2">
            <DiyaAccent animated={!reducedMotion} />
            <div className="text-left">
              <span className="text-xs font-devanagari font-bold text-[#6B4832] tracking-wide block">
                श्री द्वारकाधीश भगवान · दिव्य स्वरूप
              </span>
              <span className="text-[10px] font-cinzel text-[#A67C57] tracking-wider block">
                Shirgaon Mandir · Virar East
              </span>
            </div>
          </div>

          {/* Manual Curtain Action Button */}
          <button
            type="button"
            onClick={onToggleManualOpen}
            className="px-2.5 py-1 text-[11px] font-cinzel font-semibold tracking-wider text-[#6B4832] hover:text-[#3C2A20] bg-[#FFFDF8] hover:bg-[#F3E7D6] border border-[#B68A45]/60 rounded-full shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            title={manualOpen ? 'कपाट पूर्ववत करा (Reset Curtain Scroll Sync)' : 'कपाट उघडा (Manually Open Curtains)'}
          >
            {manualOpen ? (
              <>
                <EyeOff className="w-3 h-3 text-[#A67C57]" />
                <span>कपाट बंद करा</span>
              </>
            ) : (
              <>
                <Eye className="w-3 h-3 text-[#B68A45]" />
                <span>दर्शन कपाट उघडा</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Devotee Scroll Hint */}
      <div className="mt-2 text-center text-[10px] font-cinzel tracking-wider text-[#A67C57]/90 flex items-center gap-1.5">
        <Sparkles className="w-3 h-3 text-[#B68A45]" />
        <span>स्क्रोल करा आणि दिव्य दर्शन घ्या · Scroll for Darshan</span>
        <Sparkles className="w-3 h-3 text-[#B68A45]" />
      </div>
    </div>
  );
};
