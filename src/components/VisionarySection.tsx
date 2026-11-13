import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Language } from '../data/templeData';
import { PravinaVisionHero, LightboxPhotoData } from './vision/PravinaVisionHero';
import { SectionBackgroundChakra } from './SectionBackgroundChakra';

export interface VisionarySectionProps {
  language: Language;
  reducedMotion?: boolean;
}

export const VisionarySection: React.FC<VisionarySectionProps> = ({
  language,
  reducedMotion,
}) => {
  const [globalLightboxPhoto, setGlobalLightboxPhoto] = useState<LightboxPhotoData | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setGlobalLightboxPhoto(null);
      }
    };
    if (globalLightboxPhoto) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [globalLightboxPhoto]);

  return (
    <section
      id="vision"
      aria-label="The Vision Behind Shree Dwarkadhish Dham — Smt. Pravina H. Thakur"
      className="relative w-full bg-[#FAF4E8] text-[#3F291D] py-12 sm:py-14 lg:py-16 border-b-2 border-[#C29A54]/60 overflow-hidden scroll-mt-20"
    >
      {/* Centered Rotating Sacred Background Chakra */}
      <SectionBackgroundChakra reducedMotion={reducedMotion} />

      {/* Main Fluid Content Container */}
      <div className="w-full max-w-[min(98vw,1840px)] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        
        {/* EDITORIAL HERO: Centered Royal Header, 56/44 Composition, Primary Portrait & Devotional Photos */}
        <PravinaVisionHero
          language={language}
          reducedMotion={reducedMotion}
          onOpenLightbox={(photo) => setGlobalLightboxPhoto(photo)}
        />

      </div>

      {/* Global High-Resolution Lightbox Modal (Uncropped, object-contain) */}
      <AnimatePresence>
        {globalLightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/92 backdrop-blur-md"
            onClick={() => setGlobalLightboxPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative max-w-5xl w-full bg-[#241711] rounded-3xl overflow-hidden border-2 border-[#C29A54]/70 shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setGlobalLightboxPhoto(null)}
                className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/70 hover:bg-[#741C24] text-white border border-white/20 transition-all cursor-pointer shadow-lg active:scale-95"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5 text-[#E8C784]" />
              </button>

              {/* Full Image: Strictly object-contain so facial features, bindi, folded hands are never cropped */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-black max-h-[72vh] flex items-center justify-center p-2">
                <img
                  src={globalLightboxPhoto.src}
                  onError={(e) => {
                    if (globalLightboxPhoto.fallbackSrc) {
                      (e.target as HTMLImageElement).src = globalLightboxPhoto.fallbackSrc;
                    }
                  }}
                  alt={globalLightboxPhoto.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Lightbox Caption Bar */}
              <div className="p-5 sm:p-6 bg-[#2B1B13] border-t border-[#C29A54]/40 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-cinzel font-bold bg-[#C29A54] text-[#3F291D] mb-1.5">
                    {globalLightboxPhoto.tag}
                  </span>
                  <h4 className="font-serif-royal text-xl sm:text-2xl font-bold text-[#FFFDF7] mb-1">
                    {globalLightboxPhoto.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#F1E3CC]/90 font-serif max-w-3xl leading-relaxed">
                    {globalLightboxPhoto.caption}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setGlobalLightboxPhoto(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-cinzel font-bold tracking-wider uppercase bg-[#C29A54] hover:bg-[#A88242] text-[#3F291D] transition-colors cursor-pointer shrink-0"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
