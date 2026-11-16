import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, MotionValue } from 'motion/react';
import { Sparkles, Eye, EyeOff, Hand } from 'lucide-react';
import { TempleBell } from './TempleBell';
import { DivineDarshanCurtains } from './DivineDarshanCurtains';
import { DivineFlowerShower, calculateCeremonyTimeline } from './DivineFlowerShower';
import { CharanAshirwadOverlay, EverywhereFlowerCanvas } from './CharanAshirwadOverlay';
import { DiyaAccent } from './KrishnaMotifs';
import { useI18n } from '../i18n/I18nContext';
import { ASHIRWAD_CEREMONY_DURATION_MS } from '../utils/ashirwadCeremonyUtils';

export interface TempleSanctumFrameProps {
  shrineRef?: React.RefObject<HTMLDivElement | null>;
  leftX?: MotionValue<string> | string;
  rightX?: MotionValue<string> | string;
  seamOpacity?: MotionValue<number> | number;
  glowOpacity?: MotionValue<number> | number;
  ceremonyProgress?: number;
  leftCurtainRef?: React.RefObject<HTMLDivElement | null>;
  rightCurtainRef?: React.RefObject<HTMLDivElement | null>;
  seamShadowRef?: React.RefObject<HTMLDivElement | null>;
  glowRef?: React.RefObject<HTMLDivElement | null>;
  manualOpen?: boolean;
  onToggleManualOpen?: () => void;
  curtainsVisible?: boolean;
  ashirwadActive?: boolean;
  ashirwadTriggerId?: number;
  onTriggerCharanSparsh?: () => void;
  reducedMotion?: boolean;
}

/**
 * TempleSanctumFrame
 *
 * A single coherent Vaishnav temple sanctum frame built on a unified responsive coordinate system:
 * - Modest stepped Shikhara upper silhouette with Amalaka and Kalash finials
 * - Fixed architectural gold hook anchor firmly embedded in the upper beam
 * - Suspended foreground brass temple bell swinging as a pendulum from the fixed hook
 * - Carved ornamental Torana (trefoil/cusped entrance arch) with delicate lotus moldings
 * - Flanking fluted sandstone & antique-gold columns with symmetrical bases and lotus capitals
 * - Shared SVG clipPath ("#vaishnavToranaClip") ensuring the photo opening, curtains, and
 *   sanctum alcove share the EXACT inside contour—eliminating rectangular corners and black gaps
 * - Supported sandstone & brass plinth base containing the sacred attribution and curtain toggle
 * - Depth order: Shadowed interior -> Deity Photo -> Velvet Curtains -> Gold Inner Lip -> Carved Frame -> Base
 */
export const TempleSanctumFrame: React.FC<TempleSanctumFrameProps> = React.memo(({
  shrineRef,
  leftX,
  rightX,
  seamOpacity,
  glowOpacity,
  ceremonyProgress = 0,
  leftCurtainRef,
  rightCurtainRef,
  seamShadowRef,
  glowRef,
  manualOpen = false,
  onToggleManualOpen,
  curtainsVisible = false,
  ashirwadActive = false,
  ashirwadTriggerId = 0,
  onTriggerCharanSparsh,
  reducedMotion = false,
}) => {
  const { tDict } = useI18n();
  const sanctumImgRef = useRef<HTMLImageElement | null>(null);
  const [sanctumImageReady, setSanctumImageReady] = useState(false);

  useEffect(() => {
    const img = sanctumImgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setSanctumImageReady(true);
    }
  }, []);

  // Effective ceremony progress: if manualOpen is forced, use 0.50 (peak darshan)
  const effectiveCeremonyProgress = manualOpen ? 0.50 : ceremonyProgress;
  const ceremonyState = useMemo(
    () => calculateCeremonyTimeline(effectiveCeremonyProgress),
    [effectiveCeremonyProgress]
  );

  return (
    <div
      ref={shrineRef as any}
      className="relative w-full max-w-[380px] sm:max-w-[460px] md:max-w-[540px] lg:max-w-[620px] xl:max-w-[700px] 2xl:max-w-[760px] mx-auto flex flex-col items-center select-none"
    >
      {/* =========================================================================
          SVG CLIP PATH DEFINITIONS (Shared Mathematical Normalized Coordinates)
          Coordinates normalized to [0, 1] x [0, 1] so the photo opening and curtains
          follow the exact inside contour of the carved Torana arch on all screens.
         ========================================================================= */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="vaishnavToranaClip" clipPathUnits="objectBoundingBox">
            {/* Symmetrical cusped Vaishnav temple arch:
                Bottom-left (0, 1) -> Up left column (0, 0.24) ->
                Cusped outer curve (0.16, 0.12) -> Dip (0.22, 0.14) ->
                Central cusp apex (0.50, 0.0) ->
                Dip (0.78, 0.14) -> Cusped outer curve (0.84, 0.12) ->
                Right column (1, 0.24) -> Down to (1, 1) -> Bottom (0, 1) */}
            <path d="M 0,1 L 0,0.24 C 0,0.16 0.07,0.11 0.16,0.12 C 0.24,0.06 0.36,0.01 0.5,0 C 0.64,0.01 0.76,0.06 0.84,0.12 C 0.93,0.11 1,0.16 1,0.24 L 1,1 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* =========================================================================
          1. STEPPED SHIKHARA UPPER CROWN SILHOUETTE (With Amalaka & Kalash Finial)
         ========================================================================= */}
      <div className="relative w-full z-20 flex flex-col items-center pointer-events-none">
        {/* Sacred Kalash Finial with Glowing Aureole */}
        <div className="relative flex flex-col items-center">
          {/* Soft Golden Halo Behind Finial */}
          <div
            className="absolute -top-3 w-20 h-20 rounded-full opacity-40 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, #F5D77F 0%, #C59B56 42%, transparent 72%)',
            }}
          />

          <svg width="60" height="34" viewBox="0 0 60 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="kalashGold" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7A5620" />
                <stop offset="30%" stopColor="#E5BE75" />
                <stop offset="50%" stopColor="#FFF2D6" />
                <stop offset="70%" stopColor="#E5BE75" />
                <stop offset="100%" stopColor="#6B4D1C" />
              </linearGradient>
            </defs>
            {/* Top Dhwaja / Finial Needle */}
            <path d="M30 1 L32 7 L28 7 Z" fill="#FFF2D6" />
            <circle cx="30" cy="8" r="2.5" fill="url(#kalashGold)" stroke="#3F2B10" strokeWidth="0.5" />
            {/* Kalash Pot (Kumbha) with Sacred Water */}
            <ellipse cx="30" cy="14" rx="6" ry="4" fill="url(#kalashGold)" stroke="#3F2B10" strokeWidth="0.6" />
            {/* Fluted Amalaka Disc */}
            <ellipse cx="30" cy="19" rx="12" ry="3.5" fill="url(#kalashGold)" stroke="#3F2B10" strokeWidth="0.8" />
            {/* Stepped Pedestal beneath Amalaka */}
            <path d="M20 22 H40 L43 27 H17 Z" fill="#9C7844" stroke="#4A3415" strokeWidth="0.8" />
            <rect x="13" y="27" width="34" height="4" fill="#C59B56" stroke="#4A3415" strokeWidth="0.8" />
          </svg>
        </div>

        {/* Stepped Sandstone Cornice (Chhajja Eaves) with Traditional Carved Dentils */}
        <div className="w-[84%] h-2 bg-gradient-to-r from-[#8C6D28] via-[#F4E9D8] to-[#8C6D28] border-t border-[#FFF2D6] shadow-xs rounded-t-xs" />
        <div className="w-[94%] h-2.5 bg-gradient-to-r from-[#A77B42] via-[#E8D4B8] to-[#A77B42] border-t border-[#4A3415] shadow-sm flex items-center justify-around px-4">
          {[...Array(12)].map((_, i) => (
            <span key={i} className="w-1.5 h-1 bg-[#6B4D1C] rounded-xs opacity-75" />
          ))}
        </div>

        {/* Main Architectural Lintel Beam with Fixed Central Hook Anchor */}
        <div className="w-full h-8 bg-gradient-to-r from-[#6B4D1C] via-[#B68A45] to-[#6B4D1C] border-y border-[#3A2412] shadow-md flex items-center justify-between px-3 relative">
          {/* Left Carved Leaf Ornament */}
          <div className="flex items-center gap-1 opacity-80">
            <Sparkles className="w-3 h-3 text-[#FFE8B3]" />
            <span className="text-[10px] font-devanagari text-[#FFFDF8] font-bold tracking-wider">॥ ॐ ॥</span>
          </div>

          {/* Center Sacred Sanctum Inscription Plaque */}
          <div className="px-3 py-0.5 rounded-full bg-[#2A1810] border border-[#E5BE75]/60 shadow-xs flex items-center gap-1.5">
            <Sparkles className="w-2.5 h-2.5 text-[#F5D77F]" />
            <span className="text-[10px] font-devanagari text-[#FFE8B3] font-semibold tracking-wider">
              {tDict.darshan.sanctumAttribution}
            </span>
            <Sparkles className="w-2.5 h-2.5 text-[#F5D77F]" />
          </div>

          {/* Right Carved Leaf Ornament */}
          <div className="flex items-center gap-1 opacity-80">
            <span className="text-[10px] font-devanagari text-[#FFFDF8] font-bold tracking-wider">॥ श्रीः ॥</span>
            <Sparkles className="w-3 h-3 text-[#FFE8B3]" />
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. MAIN TEMPLE BODY (Unified Flanking Columns & Inner Sanctum Opening)
         ========================================================================= */}
      <div className="relative w-full flex justify-center -mt-0.5">
        
        {/* Soft Ambient Radial Warm Halo behind entire sanctum */}
        <div
          className="absolute -inset-4 pointer-events-none z-0 opacity-50"
          style={{
            background:
              'radial-gradient(ellipse at 50% 35%, rgba(229, 190, 117, 0.42) 0%, rgba(197, 155, 86, 0.16) 52%, transparent 72%)',
          }}
        />

        {/* Outer Architectural Container Framing the Pillars and Inner Alcove */}
        <div className="relative w-full bg-gradient-to-b from-[#2E1B11] via-[#1E110A] to-[#120905] border-x-2 border-[#8C6D28] shadow-[0_20px_45px_rgba(25,12,6,0.55)] flex justify-center overflow-hidden">
          
          {/* Left Flanking Sandstone Column (Stambha) with Capital & Base */}
          <div className="absolute top-0 bottom-0 left-0 w-6 sm:w-8 z-30 pointer-events-none flex flex-col justify-between border-r border-[#6B4D1C] bg-gradient-to-r from-[#8C6D28] via-[#D8C2A4] to-[#6B4D1C] shadow-md">
            {/* Carved Lotus Capital (Sirsha) */}
            <div className="w-full h-8 bg-gradient-to-b from-[#4A3415] via-[#A77B42] to-[#6B4D1C] border-b border-[#3A2412]" />
            {/* Fluted Vertical Shaft with Gold Ornamental Rings */}
            <div className="w-full flex-1 flex flex-col justify-around py-6 opacity-75">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-full h-1 bg-[#4A3415] border-y border-[#FFE8B3]/50" />
              ))}
            </div>
            {/* Stepped Column Base Plinth */}
            <div className="w-full h-7 bg-gradient-to-t from-[#3A2412] via-[#8C6D28] to-[#6B4D1C] border-t border-[#FFE8B3]/40" />
          </div>

          {/* Right Flanking Sandstone Column (Stambha) with Capital & Base */}
          <div className="absolute top-0 bottom-0 right-0 w-6 sm:w-8 z-30 pointer-events-none flex flex-col justify-between border-l border-[#6B4D1C] bg-gradient-to-r from-[#6B4D1C] via-[#D8C2A4] to-[#8C6D28] shadow-md">
            {/* Carved Lotus Capital (Sirsha) */}
            <div className="w-full h-8 bg-gradient-to-b from-[#4A3415] via-[#A77B42] to-[#6B4D1C] border-b border-[#3A2412]" />
            {/* Fluted Vertical Shaft with Gold Ornamental Rings */}
            <div className="w-full flex-1 flex flex-col justify-around py-6 opacity-75">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-full h-1 bg-[#4A3415] border-y border-[#FFE8B3]/50" />
              ))}
            </div>
            {/* Stepped Column Base Plinth */}
            <div className="w-full h-7 bg-gradient-to-t from-[#3A2412] via-[#8C6D28] to-[#6B4D1C] border-t border-[#FFE8B3]/40" />
          </div>

          {/* =====================================================================
              INNER SANCTUM ALCOVE (Clipped to Symmetrical Vaishnav Torana Arch)
              Depth Order:
              1. Shadowed interior & golden aura (z: 1)
              2. Divine Flower Shower (Background layer, z: 1)
              3. Authentic unedited photograph of Shri Dwarkadhish (z: 2)
              4. Divine Flower Shower (Midground layer, z: 3)
              5. Golden illumination warmth overlay (z: 4)
              6. Velvet curtains (z: 10)
              7. Divine Flower Shower (Foreground layer, z: 20)
             ===================================================================== */}
          <div
            className="relative w-full mx-6 sm:mx-8 lg:mx-10 my-2 overflow-hidden aspect-[3/4.2] max-h-[480px] sm:max-h-[560px] lg:max-h-[640px] xl:max-h-[700px]"
            style={{
              containerType: 'size',
              clipPath: 'url(#vaishnavToranaClip)',
              WebkitClipPath: 'url(#vaishnavToranaClip)',
            }}
          >
            {/* 1. Warm Shadowed Sanctuary Interior Backing & Radiating Divine Aura */}
            <div
              className="absolute inset-0 z-1 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at 50% 38%, #2A170F 0%, #170C08 65%, #0B0503 100%)',
              }}
            />

            <motion.div
              ref={glowRef as any}
              style={{
                opacity: glowOpacity ?? 0.15,
                background:
                  'radial-gradient(circle at 50% 36%, rgba(245, 215, 127, 0.5) 0%, rgba(198, 154, 82, 0.25) 50%, transparent 80%)',
              }}
              className="absolute inset-0 pointer-events-none z-1"
            />

            {/* Depth Layer 1: Background Petals (Drifting in deep alcove behind deity, Z: 2) */}
            <div className="absolute inset-0 z-2 pointer-events-none">
              <DivineFlowerShower
                ceremonyProgress={effectiveCeremonyProgress}
                layer="bg"
                reducedMotion={reducedMotion}
              />
            </div>

            {/* 2. Authentic Unaltered Photograph of Shri Dwarkadhish Bhagwan (Locked 3:4 Coordinate Box, Z: 3) */}
            <div className="relative z-3 w-full h-full flex items-end justify-center overflow-hidden">
              <div
                className="relative flex items-end justify-center"
                style={{
                  width: 'min(100cqw, calc(100cqh * 0.75))',
                  height: 'min(100cqh, calc(100cqw / 0.75))',
                }}
              >
                {!sanctumImageReady && (
                  <div
                    aria-hidden="true"
                    data-testid="sanctum-image-skeleton"
                    className="absolute inset-0 z-10 bg-gradient-to-b from-[#2A170F] via-[#1D100A] to-[#120905] flex items-center justify-center pointer-events-none"
                  >
                    <div className="w-16 h-16 rounded-full border border-[#C29A54]/30 bg-[#351F14]/70 flex items-center justify-center animate-pulse">
                      <span className="font-devanagari text-xl text-[#E8C784]/60">ॐ</span>
                    </div>
                  </div>
                )}
                <picture className="w-full h-full block">
                  <source
                    type="image/webp"
                    srcSet="/assets/aistudio/dwarkadhish_hero_enhanced_800.webp"
                  />
                  <img
                    ref={sanctumImgRef}
                    src="/assets/aistudio/dwarkadhish_hero_enhanced_1600.webp"
                    alt="Shri Dwarkadhish Bhagwan seated in regal simhasana with golden crown, pitambar, and flower garlands at Shirgaon Mandir, Virar East"
                    onLoad={() => setSanctumImageReady(true)}
                    onError={() => setSanctumImageReady(true)}
                    className={`w-full h-full object-cover object-bottom block mx-auto drop-shadow-[0_16px_28px_rgba(0,0,0,0.95)] transition-opacity duration-300 ${
                      sanctumImageReady ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading="eager"
                    decoding="sync"
                    referrerPolicy="no-referrer"
                  />
                </picture>

                {/* Coordinated Charan Sparsh & Left-Hand Ashirwad Light Beam Overlay */}
                {onTriggerCharanSparsh && (
                  <CharanAshirwadOverlay
                    active={ashirwadActive}
                    triggerId={ashirwadTriggerId}
                    curtainsVisible={curtainsVisible}
                    reducedMotion={reducedMotion}
                    onTouchFeet={onTriggerCharanSparsh}
                  />
                )}
              </div>
            </div>

            {/* Depth Layer 2: Midground Petals (Directly in front of deity, showering sanctum, Z: 4) */}
            <div className="absolute inset-0 z-4 pointer-events-none">
              <DivineFlowerShower
                ceremonyProgress={effectiveCeremonyProgress}
                layer="mid"
                reducedMotion={reducedMotion}
              />
            </div>

            {/* Sacred Golden Illumination Warmth Overlay during Ceremony (Z: 5) */}
            <div
              className="absolute inset-0 z-5 pointer-events-none transition-opacity duration-300"
              style={{
                opacity: ashirwadActive ? Math.max(ceremonyState.goldenWarmthOpacity, 0.24) : ceremonyState.goldenWarmthOpacity,
                background:
                  'radial-gradient(circle at 46% 48%, rgba(255, 215, 100, 0.45) 0%, rgba(245, 166, 35, 0.22) 45%, rgba(197, 155, 86, 0.08) 70%, transparent 85%)',
                mixBlendMode: 'screen',
              }}
            />

            {/* Depth Layer 3: Foreground Petals (Cascading along outer boundaries, Z: 6) */}
            <div className="absolute inset-0 z-6 pointer-events-none">
              <DivineFlowerShower
                ceremonyProgress={effectiveCeremonyProgress}
                layer="fg"
                reducedMotion={reducedMotion}
              />
            </div>

            {/* Depth Layer 4: 3.6-Second Ceremonial Pushpa Varsha ("From Everywhere") & Ashish Motes Canvas (Z: 8) */}
            <div className="absolute inset-0 z-8 pointer-events-none">
              <EverywhereFlowerCanvas
                triggerId={ashirwadTriggerId}
                active={ashirwadActive}
                reducedMotion={reducedMotion}
              />
            </div>

            {/* 3. Sliding Velvet Curtains (In front of deity & all flower layers, Z: 10) */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              <DivineDarshanCurtains
                leftX={leftX}
                rightX={rightX}
                seamOpacity={seamOpacity}
                leftRef={leftCurtainRef}
                rightRef={rightCurtainRef}
                seamRef={seamShadowRef}
                manualOpen={manualOpen}
                reducedMotion={reducedMotion}
              />
            </div>
          </div>

          {/* =====================================================================
              INNER CARVED ORNAMENTAL TORANA ARCH BORDER OVERLAY (Layer 4/5, Z: 25)
              Provides realistic 3D depth, carved lotus relief & ratna-mala moulding
             ===================================================================== */}
          <div className="absolute inset-x-6 sm:inset-x-8 top-2 bottom-2 pointer-events-none z-25">
            <svg
              viewBox="0 0 348 450"
              preserveAspectRatio="none"
              className="w-full h-full drop-shadow-[0_4px_12px_rgba(18,8,3,0.85)]"
            >
              <defs>
                <linearGradient id="toranaGoldGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6B4D1C" />
                  <stop offset="20%" stopColor="#C59B56" />
                  <stop offset="50%" stopColor="#FFEAA7" />
                  <stop offset="80%" stopColor="#C59B56" />
                  <stop offset="100%" stopColor="#6B4D1C" />
                </linearGradient>
              </defs>

              {/* Outer Carved Torana Arch Moulding */}
              <path
                d="M 0,450 L 0,108 C 0,72 24,50 56,54 C 84,27 125,4 174,0 C 223,4 264,27 292,54 C 324,50 348,72 348,108 L 348,450"
                fill="none"
                stroke="url(#toranaGoldGrad)"
                strokeWidth="5"
                strokeLinecap="round"
              />

              {/* Inner Beaded Ratna-Mala Gold Filigree Accent */}
              <path
                d="M 5,450 L 5,110 C 5,78 28,58 58,60 C 86,34 125,12 174,8 C 223,12 262,34 290,60 C 320,58 343,78 343,110 L 343,450"
                fill="none"
                stroke="#FFF2D6"
                strokeWidth="1.2"
                strokeDasharray="3 3"
                opacity="0.75"
              />
            </svg>
          </div>

          {/* =====================================================================
              FOREGROUND TEMPLE BELL (Hangs from Fixed Hook on Upper Arch Beam)
              Centered at top apex, above deity's crown, Z: 35
             ===================================================================== */}
          <div className="absolute top-1 inset-x-0 z-35 flex justify-center pointer-events-auto">
            <TempleBell reducedMotion={reducedMotion} size="md" />
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. SUPPORTED SANDSTONE & BRASS PEDESTAL / PLINTH (Pitha / Adhisthana)
          Side rails end exactly where this base begins; includes sacred attribution
          and the manual curtain toggle button.
         ========================================================================= */}
      <div className="w-full z-20 bg-gradient-to-b from-[#2A1810] via-[#1E110A] to-[#140B07] border-2 border-[#B68A45] rounded-b-xl shadow-lg p-2.5 sm:p-3 -mt-0.5">
        
        {/* Stepped Upper Base Moulding with Gold Inlay */}
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#F5D77F] to-transparent mb-2" />

        <div className="flex flex-col gap-2.5">
          {/* Top row: Sanctum Attribution & Curtain Toggle */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <DiyaAccent animated={!reducedMotion} />
              <div className="text-left min-w-0">
                <span className="text-xs font-devanagari font-bold text-[#FFE8B3] tracking-wide block truncate">
                  {tDict.darshan.sanctumAttribution}
                </span>
                <span className="text-[10px] font-cinzel text-[#C59B56] tracking-wider block truncate">
                  {tDict.darshan.sanctumSubAttribution}
                </span>
              </div>
            </div>

            {onToggleManualOpen && (
              <button
                type="button"
                onClick={onToggleManualOpen}
                className="shrink-0 px-2.5 py-1.5 text-[10px] sm:text-[11px] font-cinzel font-semibold tracking-wider text-[#FFF8E8] hover:text-white bg-[#3A2012]/90 hover:bg-[#4D2A18] border border-[#C59B56]/70 rounded-full shadow-xs flex items-center gap-1.5 transition-all cursor-pointer active:scale-98 touch-manipulation"
                title={manualOpen ? tDict.darshan.closeCurtainsManual : tDict.darshan.openCurtainsManual}
              >
                {manualOpen ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5 text-[#FF9EA8]" />
                    <span className="hidden sm:inline">{tDict.darshan.closeCurtainsManual}</span>
                    <span className="sm:hidden">Close</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5 text-[#F5D77F]" />
                    <span className="hidden sm:inline">{tDict.darshan.openCurtainsManual}</span>
                    <span className="sm:hidden">Open</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Primary Mobile-Optimized Charan Sparsh & Ashirwad Ceremony Button */}
          {onTriggerCharanSparsh && (
            <button
              type="button"
              onClick={onTriggerCharanSparsh}
              data-testid="charan-sparsh-cta"
              className={`relative overflow-hidden w-full min-h-[44px] px-4 py-2 rounded-lg font-cinzel text-xs sm:text-sm font-bold tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer touch-manipulation active:scale-[0.985] ${
                ashirwadActive
                  ? 'bg-gradient-to-r from-[#FFDF8E] via-[#FFEFC2] to-[#FFCA5C] text-[#3B1E08] border border-[#FFF5D6] shadow-[0_0_22px_rgba(255,208,90,0.65)]'
                  : 'bg-gradient-to-r from-[#F9E3AE] via-[#FFF4D6] to-[#E6BE6C] hover:from-[#FFEBB8] hover:to-[#F1CC7B] text-[#361D0D] border border-[#FFE5A3] shadow-md'
              }`}
            >
              {ashirwadActive ? (
                <Sparkles className={`w-4 h-4 text-[#B45309] shrink-0 ${reducedMotion ? '' : 'animate-spin'}`} />
              ) : (
                <Hand className="w-4 h-4 text-[#8B5218] shrink-0" />
              )}
              <span className="truncate">
                {ashirwadActive ? tDict.darshan.touchFeetActive : tDict.darshan.touchFeetCta}
              </span>

              {/* Smooth 3.6s Golden Ceremony Progress Bar */}
              {ashirwadActive && !reducedMotion && (
                <span
                  key={ashirwadTriggerId}
                  style={{
                    animation: `ashirwadProgressBar ${ASHIRWAD_CEREMONY_DURATION_MS}ms linear forwards`,
                  }}
                  className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-[#C2410C] via-[#F59E0B] to-[#B45309] origin-left"
                />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

export default TempleSanctumFrame;
