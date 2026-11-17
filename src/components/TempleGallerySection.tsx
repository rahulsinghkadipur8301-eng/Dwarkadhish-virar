import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { ZoomIn, Volume2, VolumeX } from 'lucide-react';
import { Language } from '../data/templeData';
import { PeacockFeather, LotusOrnament, DiyaAccent } from './KrishnaMotifs';
import { SectionBackgroundChakra } from './SectionBackgroundChakra';
import { useViewportVideo } from '../hooks/useViewportVideo';
import { useVideoMediaReady } from '../hooks/useVideoMediaReady';
import { usePosterBlurThumbnail } from '../hooks/usePosterBlurThumbnail';
import { preloadHlsModule, useHlsVideoStream } from '../hooks/useHlsVideoStream';
import {
  getMobileStreamStaggerMs,
  isDecodedVideoFrameVisible,
  shouldLoadVideoSource,
  shouldPauseGalleryCardOnPopup,
  shouldShowVideoLoaderOverlay,
} from '../utils/hlsStreamingUtils';
import {
  attemptSafeVideoPlay,
  syncVideoAutoplayAttributes,
} from '../utils/videoAutoplayUtils';
import { DEVOTIONAL_VIDEO_GRID_LAYOUT } from '../utils/videoSkeletonUtils';
import { VideoCardSkeletonOverlay } from './VideoGridSkeleton';
import {
  GalleryLightboxItem,
  GalleryLightboxPlayer,
} from './gallery/GalleryLightboxPlayer';
import dwarikaVideo1 from '../dwarika 1.mp4';
import dwarikaVideo2 from '../dwarika 2.mp4';
import dwarikaVideo3 from '../dwarika 3.mp4';
import dwarikaVideo4 from '../dwarika 4.mp4';

export interface TempleGallerySectionProps {
  language: Language;
  reducedMotion?: boolean;
}

type GalleryVideoItem = GalleryLightboxItem;

interface GalleryVideoCardProps {
  item: GalleryVideoItem;
  index: number;
  isUnmuted: boolean;
  isPopupOpen: boolean;
  isInspected: boolean;
  isMobileViewport: boolean;
  muteLabel: string;
  unmuteLabel: string;
  reducedMotion: boolean;
  onInspect: (index: number) => void;
  onToggleMute: (id: string, e: React.SyntheticEvent) => void;
  onSilenceOffscreen: (id: string) => void;
  registerVideoRef: (id: string, el: HTMLVideoElement | null) => void;
}

const GalleryVideoCard: React.FC<GalleryVideoCardProps> = React.memo(
  ({
    item,
    index,
    isUnmuted,
    isPopupOpen,
    isInspected,
    isMobileViewport,
    muteLabel,
    unmuteLabel,
    reducedMotion,
    onInspect,
    onToggleMute,
    onSilenceOffscreen,
    registerVideoRef,
  }) => {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const effectiveMuted = !isUnmuted || isPopupOpen;
    const [isStaggerReady, setIsStaggerReady] = useState(false);

    const handleCardOutOfView = useCallback(() => {
      onSilenceOffscreen(item.id);
    }, [item.id, onSilenceOffscreen]);

    const isInView = useViewportVideo({
      videoRef,
      containerRef: cardRef,
      muted: effectiveMuted,
      enabled: !isInspected,
      releaseSrcOnOutOfView: true,
      rootMargin: isMobileViewport ? '40px 0px' : '0px',
      threshold: 0.1,
      initialInView: false,
      onOutOfView: handleCardOutOfView,
    });

    // Gate & stagger source attachment while visible; release immediately on viewport exit
    useEffect(() => {
      if (!isInView || isInspected) {
        setIsStaggerReady(false);
        return;
      }
      const delayMs = getMobileStreamStaggerMs(index, isMobileViewport);
      if (delayMs === 0) {
        setIsStaggerReady(true);
        return;
      }
      const timer = window.setTimeout(() => {
        setIsStaggerReady(true);
      }, delayMs);
      return () => window.clearTimeout(timer);
    }, [isInView, isInspected, index, isMobileViewport]);

    const shouldLoad = shouldLoadVideoSource(isInView && !isInspected && isStaggerReady);

    const handleStreamReady = useCallback(() => {
      const vid = videoRef.current;
      if (vid && isInView && !isInspected) {
        attemptSafeVideoPlay(vid, { muted: effectiveMuted, loop: true });
      }
    }, [effectiveMuted, isInView, isInspected]);

    const { streamStatus, loadProgress } = useHlsVideoStream({
      videoRef,
      hlsSrc: item.hlsSrc,
      fallbackSrc: item.src,
      shouldLoad,
      isInView,
      enabled: !isInspected,
      streamKey: item.id,
      onStreamReady: handleStreamReady,
    });

    const { loadState, isBuffering, onLoadedData, onCanPlay, onPlaying, onWaiting, onError } =
      useVideoMediaReady({
        videoRef,
        watchKey: shouldLoad ? item.id : `idle-${item.id}`,
      });

    const { blurDataUri, isPosterLoaded, posterImgRef, onPosterLoad } = usePosterBlurThumbnail(
      item.posterSrc
    );

    const hasDecodedFrame =
      loadState === 'ready' ||
      isDecodedVideoFrameVisible(videoRef.current?.readyState ?? 0, loadState === 'error');

    const showLoaderOverlay = shouldShowVideoLoaderOverlay({
      shouldLoad: isInView && !isInspected,
      hasDecodedFrame,
      hasError: loadState === 'error',
      isFetching: loadProgress.isFetching,
      isBuffering,
    });

    const handleInspectCard = useCallback(() => {
      onInspect(index);
    }, [index, onInspect]);

    const handleToggleCardMute = useCallback(
      (e: React.SyntheticEvent) => {
        e.stopPropagation();
        onToggleMute(item.id, e);
      },
      [item.id, onToggleMute]
    );

    const handleSetRef = useCallback(
      (el: HTMLVideoElement | null) => {
        videoRef.current = el;
        registerVideoRef(item.id, el);
      },
      [item.id, registerVideoRef]
    );

    const handleCardKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onInspect(index);
        }
      },
      [index, onInspect]
    );

    return (
      <div
        ref={cardRef}
        role="button"
        tabIndex={0}
        onClick={handleInspectCard}
        onKeyDown={handleCardKeyDown}
        data-testid={`gallery-video-card-${item.id}`}
        className="group cursor-pointer rounded-xl sm:rounded-2xl p-1.5 sm:p-2.5 bg-[#FFFDF8] border-2 border-[#C29A54]/75 hover:border-[#741C24] shadow-[0_6px_18px_rgba(63,41,29,0.08)] sm:hover:-translate-y-1 transition-transform duration-200 flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#741C24] touch-manipulation [contain:layout_style]"
      >
        {/* Exact 9:16 portrait stage + object-contain guarantees zero video cropping */}
        <div
          data-media-state={loadState}
          data-stream-mode={streamStatus}
          data-load-phase={isBuffering ? 'buffering' : loadProgress.phase}
          data-source-loaded={String(shouldLoad)}
          className="relative w-full aspect-[9/16] rounded-lg sm:rounded-xl overflow-hidden bg-[#1D120C]"
        >
          {/* Layer 0: Instant 0ms base64 blur-grid micro-thumbnail (zero network wait) */}
          {blurDataUri && (
            <img
              src={blurDataUri}
              alt=""
              aria-hidden="true"
              decoding="sync"
              data-testid={`gallery-blur-thumb-${item.id}`}
              className="absolute inset-0 w-full h-full object-contain object-center select-none pointer-events-none scale-[1.03]"
            />
          )}

          {/* Layer 1: High-res WebP poster crossfading cleanly over the base64 preview */}
          {item.posterSrc && (
            <img
              ref={posterImgRef}
              src={item.posterSrc}
              alt={item.title}
              loading="lazy"
              decoding="async"
              onLoad={onPosterLoad}
              className={`absolute inset-0 w-full h-full object-contain object-center select-none pointer-events-none transition-opacity duration-200 ${
                blurDataUri && !isPosterLoaded ? 'opacity-0' : 'opacity-100'
              }`}
            />
          )}

          <VideoCardSkeletonOverlay
            visible={showLoaderOverlay}
            index={index}
            variant="gallery"
            reducedMotion={reducedMotion}
            hasPoster={Boolean(item.posterSrc || blurDataUri)}
            progressPct={loadProgress.progressPct}
            loadPhase={loadProgress.phase}
            isBuffering={isBuffering}
          />

          <video
            ref={handleSetRef}
            poster={item.posterSrc ?? blurDataUri}
            autoPlay
            loop
            muted={effectiveMuted}
            playsInline
            preload="none"
            aria-label={item.title}
            onLoadedData={onLoadedData}
            onCanPlay={onCanPlay}
            onPlaying={onPlaying}
            onWaiting={onWaiting}
            onError={onError}
            className={`relative z-[1] w-full h-full object-contain object-center block transition-opacity duration-200 ${
              hasDecodedFrame ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleInspectCard();
            }}
            className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-20 min-w-[36px] min-h-[36px] p-1.5 rounded-full bg-black/70 hover:bg-[#741C24] text-white border border-white/25 transition-colors shadow-md cursor-pointer flex items-center justify-center touch-manipulation"
            aria-label={`Inspect ${item.title}`}
          >
            <ZoomIn className="w-3.5 h-3.5 text-[#E8C784]" />
          </button>

          {/* Bottom Mute / Unmute button with clean native click + touch-manipulation */}
          <button
            type="button"
            onClick={handleToggleCardMute}
            data-testid={`gallery-mute-btn-${item.id}`}
            aria-pressed={isUnmuted}
            aria-label={isUnmuted ? `${muteLabel} ${item.title}` : `${unmuteLabel} ${item.title}`}
            className={`absolute bottom-2 right-2 sm:bottom-2.5 sm:right-2.5 z-20 min-h-[36px] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border text-[10px] sm:text-[11px] font-cinzel font-semibold tracking-wider flex items-center gap-1 sm:gap-1.5 shadow-md transition-colors cursor-pointer touch-manipulation active:scale-95 ${
              isUnmuted
                ? 'bg-[#741C24] text-[#FFF8E8] border-[#E8C784]'
                : 'bg-black/80 hover:bg-[#741C24] text-white border-white/25'
            }`}
          >
            {isUnmuted ? (
              <>
                <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#F5D77F]" />
                <span>{muteLabel}</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E8C784]" />
                <span>{unmuteLabel}</span>
              </>
            )}
          </button>
        </div>

        {/* Heritage Deep-Maroon Caption Footer (Static crisp Diya accent prevents mobile SVG animation jank) */}
        <div className="mt-1.5 sm:mt-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-[#4B141D] via-[#611D2B] to-[#4B141D] border-t border-[#C59B56] px-2 sm:px-3 py-2 sm:py-2.5 flex items-center justify-between gap-1.5 sm:gap-2 shadow-inner">
          <div className="min-w-0">
            <span className="block text-[9px] sm:text-[10px] font-cinzel font-bold uppercase tracking-[0.06em] sm:tracking-[0.16em] text-[#E1BD80] truncate">
              {item.tag}
            </span>
            <h3 className="font-serif-royal text-xs sm:text-base font-bold text-[#FFF5E8] leading-snug mt-0.5 truncate">
              {item.title}
            </h3>
          </div>
          <DiyaAccent animated={false} className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 opacity-90" />
        </div>
      </div>
    );
  }
);

export const TempleGallerySection: React.FC<TempleGallerySectionProps> = React.memo(({
  language,
  reducedMotion = false,
}) => {
  const [activeState, setActiveState] = useState<{ index: number; initialTime: number } | null>(
    null
  );
  const [unmutedId, setUnmutedId] = useState<string | null>(null);
  const [postCloseCooldown, setPostCloseCooldown] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const cooldownTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(max-width: 767px)');
    setIsMobileViewport(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobileViewport(e.matches);
    mql.addEventListener('change', onChange);
    // Warm hls.js asynchronously off critical path ONLY when native Apple HLS is unavailable
    const warmTimer = window.setTimeout(() => {
      preloadHlsModule().catch(() => {});
    }, 150);
    return () => {
      window.clearTimeout(warmTimer);
      mql.removeEventListener('change', onChange);
    };
  }, []);

  // Keep refs synced so callbacks retain zero dependency churn and React.memo stays intact
  const unmutedIdRef = useRef<string | null>(unmutedId);
  const activeStateRef = useRef(activeState);
  const isMobileRef = useRef(isMobileViewport);
  unmutedIdRef.current = unmutedId;
  activeStateRef.current = activeState;
  isMobileRef.current = isMobileViewport;

  const contentRecord = {
    en: {
      kicker: 'SHRINE PHOTOGRAPH ARCHIVE',
      heading: 'Sacred Moments & Consecration Seva',
      subheading: 'Continuous uncropped devotional darshan videos — tap sound on any frame to listen',
      muteLabel: 'Mute',
      unmuteLabel: 'Unmute',
      photo1Tag: 'Festival Seva',
      photo1Title: 'Diwali Puja',
      photo1Caption: 'Deepotsav prayers and sacred offerings before Lord Dwarkadhish on Diwali.',
      photo2Tag: 'Devi Aradhana',
      photo2Title: 'Devi Puja',
      photo2Caption: 'Sacred Devi worship and Vedic offerings at Shri Dwarkadhish Mandir, Shirgaon.',
      photo3Tag: 'Vedic Abhishekam',
      photo3Title: 'Rudrabhishek',
      photo3Caption: 'Solemn Vedic Rudrabhishek prayers and sacred panchamrit offerings at the shrine.',
      photo4Tag: 'Bhakti Utsav',
      photo4Title: 'Vitthal Puja',
      photo4Caption: 'Devotional Vitthal puja and serene evening worship at Shri Dwarkadhish Mandir.',
    },
    hi: {
      kicker: 'पावन मंदिर दर्शन दीर्घा',
      heading: 'पावन भक्ति एवं प्राण प्रतिष्ठा चलचित्र',
      subheading: 'बिना किसी क्रॉप के निरंतर दिव्य दर्शन वीडियो — ध्वनि सुनने के लिए नीचे म्यूट/अनम्यूट बटन दबाएं',
      muteLabel: 'म्यूट',
      unmuteLabel: 'ध्वनि',
      photo1Tag: 'पावन पर्व पूजा',
      photo1Title: 'दीवाली पूजा',
      photo1Caption: 'श्री द्वारकाधीश मंदिर में दीपोत्सव एवं पावन दीवाली पूजन।',
      photo2Tag: 'देवी आराधना',
      photo2Title: 'देवी पूजा',
      photo2Caption: 'शिरगांव मंदिर परिसर में श्रद्धापूर्वक संपन्न पावन देवी पूजन।',
      photo3Tag: 'वैदिक अभिषेक',
      photo3Title: 'रुद्राभिषेक',
      photo3Caption: 'वैदिक मंत्रोच्चार के साथ संपन्न पावन रुद्राभिषेक अनुष्ठान।',
      photo4Tag: 'भक्ति उपासना',
      photo4Title: 'विठ्ठल पूजा',
      photo4Caption: 'श्री द्वारकाधीश मंदिर में भक्तिभाव से संपन्न पावन विठ्ठल पूजन।',
    },
    mr: {
      kicker: 'पावन मंदिर दर्शन दालन',
      heading: 'पावन दर्शन आणि प्राणप्रतिष्ठा चलचित्रे',
      subheading: 'कोणत्याही क्रॉपिंगशिवाय अखंड दिव्य दर्शन व्हिडिओ — ध्वनीसाठी खालील बटणावर क्लिक करा',
      muteLabel: 'म्यूट',
      unmuteLabel: 'ध्वनी',
      photo1Tag: 'सण उत्सव सेवा',
      photo1Title: 'दिवाळी पूजा',
      photo1Caption: 'श्री द्वारकाधीश मंदिरात मंगल दीपोत्सव आणि दिवाळी पूजन.',
      photo2Tag: 'देवी आराधना',
      photo2Title: 'देवी पूजा',
      photo2Caption: 'शिरगाव मंदिरात भक्तिभावाने पार पडलेली पवित्र देवी पूजा.',
      photo3Tag: 'वैदिक अभिषेक',
      photo3Title: 'रुद्राभिषेक',
      photo3Caption: 'वैदिक मंत्रघोषात संपन्न झालेला पावन रुद्राभिषेक सोहळा.',
      photo4Tag: 'भक्ती उपासना',
      photo4Title: 'विठ्ठल पूजा',
      photo4Caption: 'श्री द्वारकाधीश मंदिरात श्रद्धापूर्वक केलेली विठ्ठल पूजा.',
    },
    gu: {
      kicker: 'પવિત્ર મંદિર દર્શન ઝલક',
      heading: 'પવિત્ર દર્શન અને પ્રાણપ્રતિષ્ઠા સેવા ચલચિત્રો',
      subheading: 'સંપૂર્ણ અનક્રોપ્ડ નિરંતર દર્શન વિડિયો — અવાજ સાંભળવા નીચેનું બટન દબાવો',
      muteLabel: 'મ્યૂટ',
      unmuteLabel: 'અવાજ',
      photo1Tag: 'ઉત્સવ પૂજા',
      photo1Title: 'દિવાળી પૂજા',
      photo1Caption: 'શ્રી દ્વારકાધીશ મંદિરમાં દીપોત્સવ અને પાવન દિવાળી પૂજન.',
      photo2Tag: 'દેવી આરાધના',
      photo2Title: 'દેવી પૂજા',
      photo2Caption: 'શિરગાવ મંદિરમાં ભક્તિભાવપૂર્વક સંપન્ન પવિત્ર દેવી પૂજા.',
      photo3Tag: 'વૈદિક અભિષેક',
      photo3Title: 'રુદ્રાભિષેક',
      photo3Caption: 'વૈદિક મંત્રોચ્ચાર સાથે સંપન્ન પવિત્ર રુદ્રાભિષેક વિધિ.',
      photo4Tag: 'ભક્તિ ઉપાસના',
      photo4Title: 'વિઠ્ઠલ પૂજા',
      photo4Caption: 'શ્રી દ્વારકાધીશ મંદિરમાં શ્રદ્ધાપૂર્વક થયેલી પવિત્ર વિઠ્ઠલ પૂજા.',
    },
  };

  const c = contentRecord[language] || contentRecord.en;

  const galleryVideos: GalleryVideoItem[] = useMemo(
    () => [
      {
        id: 'dwarika-1',
        src: dwarikaVideo1,
        hlsSrc: '/hls/dwarika-1/master.m3u8',
        posterSrc: '/hls/dwarika-1/poster.webp',
        tag: c.photo1Tag,
        title: c.photo1Title,
        caption: c.photo1Caption,
      },
      {
        id: 'dwarika-2',
        src: dwarikaVideo2,
        hlsSrc: '/hls/dwarika-2/master.m3u8',
        posterSrc: '/hls/dwarika-2/poster.webp',
        tag: c.photo2Tag,
        title: c.photo2Title,
        caption: c.photo2Caption,
      },
      {
        id: 'dwarika-3',
        src: dwarikaVideo3,
        hlsSrc: '/hls/dwarika-3/master.m3u8',
        posterSrc: '/hls/dwarika-3/poster.webp',
        tag: c.photo3Tag,
        title: c.photo3Title,
        caption: c.photo3Caption,
      },
      {
        id: 'dwarika-4',
        src: dwarikaVideo4,
        hlsSrc: '/hls/dwarika-4/master.m3u8',
        posterSrc: '/hls/dwarika-4/poster.webp',
        tag: c.photo4Tag,
        title: c.photo4Title,
        caption: c.photo4Caption,
      },
    ],
    [
      c.photo1Tag,
      c.photo1Title,
      c.photo1Caption,
      c.photo2Tag,
      c.photo2Title,
      c.photo2Caption,
      c.photo3Tag,
      c.photo3Title,
      c.photo3Caption,
      c.photo4Tag,
      c.photo4Title,
      c.photo4Caption,
    ]
  );

  const galleryVideosRef = useRef(galleryVideos);
  galleryVideosRef.current = galleryVideos;

  const registerVideoRef = useCallback((id: string, el: HTMLVideoElement | null) => {
    videoRefs.current[id] = el;
  }, []);

  const handleInspect = useCallback((index: number) => {
    const item = galleryVideosRef.current[index];
    const currentGridVid = item ? videoRefs.current[item.id] : null;
    const capturedTime =
      currentGridVid && Number.isFinite(currentGridVid.currentTime)
        ? currentGridVid.currentTime
        : 0;

    // Synchronously release mobile decoders BEFORE opening lightbox to eliminate popup lag
    for (const gridItem of galleryVideosRef.current) {
      const vid = videoRefs.current[gridItem.id];
      if (!vid) continue;
      if (isMobileRef.current || gridItem.id === item?.id) {
        vid.pause();
      }
    }

    setActiveState({ index, initialTime: capturedTime });
  }, []);

  const handleToggleMute = useCallback((id: string, e: React.SyntheticEvent) => {
    e.stopPropagation();
    const nextId = unmutedIdRef.current === id ? null : id;
    const isPopupOpen = activeStateRef.current !== null;
    for (const item of galleryVideosRef.current) {
      const vid = videoRefs.current[item.id];
      if (!vid) continue;
      const shouldMute = isPopupOpen || nextId !== item.id;
      syncVideoAutoplayAttributes(vid, { muted: shouldMute, loop: true });
      if (!shouldMute) {
        attemptSafeVideoPlay(vid, { muted: false, loop: true });
      }
    }
    setUnmutedId(nextId);
  }, []);

  const handleSilenceOffscreen = useCallback((id: string) => {
    setUnmutedId((prev) => (prev === id ? null : prev));
  }, []);

  const handleClose = useCallback(() => {
    if (isMobileRef.current) {
      setPostCloseCooldown(true);
      if (cooldownTimerRef.current !== null) {
        window.clearTimeout(cooldownTimerRef.current);
      }
      cooldownTimerRef.current = window.setTimeout(() => {
        cooldownTimerRef.current = null;
        setPostCloseCooldown(false);
      }, 180);
    }
    setActiveState(null);
  }, []);

  const handleFallbackMuted = useCallback(() => {
    setUnmutedId(null);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveState((prev) =>
      prev === null
        ? null
        : {
            index:
              (prev.index - 1 + galleryVideosRef.current.length) %
              galleryVideosRef.current.length,
            initialTime: 0,
          }
    );
  }, []);

  const handleNext = useCallback(() => {
    setActiveState((prev) =>
      prev === null
        ? null
        : {
            index: (prev.index + 1) % galleryVideosRef.current.length,
            initialTime: 0,
          }
    );
  }, []);

  const activeIndex = activeState !== null ? activeState.index : null;
  const activeVideo = activeIndex !== null ? galleryVideos[activeIndex] : null;
  const popupOrCooldownActive = activeIndex !== null || postCloseCooldown;

  useEffect(() => {
    return () => {
      if (cooldownTimerRef.current !== null) {
        window.clearTimeout(cooldownTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      else if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex, handleClose, handlePrev, handleNext]);

  const portalLightbox =
    activeVideo && activeState !== null && typeof document !== 'undefined'
      ? createPortal(
          <div
            data-testid="gallery-video-popup"
            role="dialog"
            aria-modal="true"
            aria-label={activeVideo.title}
            onClick={handleClose}
            className="fixed inset-0 z-[120] flex items-center justify-center p-2.5 sm:p-6 bg-black/75 overflow-y-auto overscroll-contain"
          >
            <div className="w-full max-w-4xl flex items-center justify-center my-auto">
              <GalleryLightboxPlayer
                item={activeVideo}
                index={activeState.index}
                total={galleryVideos.length}
                initialTime={activeState.initialTime}
                isUnmuted={unmutedId === activeVideo.id}
                muteLabel={c.muteLabel}
                unmuteLabel={c.unmuteLabel}
                onToggleMute={handleToggleMute}
                onFallbackMuted={handleFallbackMuted}
                onPrev={handlePrev}
                onNext={handleNext}
                onClose={handleClose}
              />
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-section-heading"
      className="relative w-full bg-[#F3E7D6] text-[#3F291D] py-12 sm:py-16 lg:py-20 border-b border-[#E5D1B6] overflow-hidden scroll-mt-20"
    >
      {/* Rotating Sacred Background Chakra */}
      <SectionBackgroundChakra reducedMotion={reducedMotion || activeIndex !== null} />

      <div className="w-full max-w-[min(98vw,1840px)] mx-auto px-3 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Centered Header */}
        <div className="text-center max-w-4xl mx-auto mb-7 sm:mb-10">
          <div className="flex items-center justify-center gap-2.5 mb-2">
            <PeacockFeather size={22} />
            <span className="font-cinzel text-xs sm:text-sm uppercase tracking-widest text-[#A67C57] font-bold">
              {c.kicker}
            </span>
            <PeacockFeather size={22} className="transform scale-x-[-1]" />
          </div>

          <h2
            id="gallery-section-heading"
            className="font-serif-royal text-3xl sm:text-4xl lg:text-5xl font-bold text-[#741C24] tracking-tight mb-2"
          >
            {c.heading}
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#3F291D]/80 font-serif max-w-2xl mx-auto mb-4">
            {c.subheading}
          </p>

          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#C29A54]/60 to-[#C29A54] w-16 sm:w-28" />
            <LotusOrnament size={22} className="text-[#C29A54]" />
            <div className="h-[1px] bg-gradient-to-l from-transparent via-[#C29A54]/60 to-[#C29A54] w-16 sm:w-28" />
          </div>
        </div>

        {/* Uncropped 9:16 4-Card Portrait Video Row (Exact match for 720x1280 source videos) */}
        <div className={DEVOTIONAL_VIDEO_GRID_LAYOUT.gridClass}>
          {galleryVideos.map((item, idx) => (
            <GalleryVideoCard
              key={item.id}
              item={item}
              index={idx}
              isUnmuted={unmutedId === item.id}
              isPopupOpen={popupOrCooldownActive}
              isInspected={shouldPauseGalleryCardOnPopup(
                idx,
                postCloseCooldown ? -1 : activeIndex,
                isMobileViewport
              )}
              isMobileViewport={isMobileViewport}
              muteLabel={c.muteLabel}
              unmuteLabel={c.unmuteLabel}
              reducedMotion={reducedMotion}
              onInspect={handleInspect}
              onToggleMute={handleToggleMute}
              onSilenceOffscreen={handleSilenceOffscreen}
              registerVideoRef={registerVideoRef}
            />
          ))}
        </div>
      </div>

      {portalLightbox}
    </section>
  );
});

export default TempleGallerySection;
