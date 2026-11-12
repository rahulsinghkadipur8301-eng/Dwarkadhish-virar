import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AnimatedTempleBellProps {
  reducedMotion?: boolean;
  className?: string;
  onRing?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Synthesizes an authentic Indian brass temple bell (Ghanta) sound
 * using the Web Audio API with realistic harmonic overtones and long acoustic decay.
 * Strictly opt-in: only triggered upon explicit user click/tap.
 */
class TempleBellAudio {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public ring() {
    if (this.isMuted) return;

    try {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return;

      if (!this.ctx || this.ctx.state === 'suspended') {
        this.ctx = new AudioCtxClass();
      }

      const now = this.ctx.currentTime;

      // Authentic brass temple bell harmonics (Vedic 432 Hz fundamental + overtones)
      const frequencies = [
        { freq: 432, gain: 0.35, decay: 3.2 },
        { freq: 864, gain: 0.28, decay: 2.6 },
        { freq: 1296, gain: 0.18, decay: 1.9 },
        { freq: 1728, gain: 0.12, decay: 1.4 },
        { freq: 2592, gain: 0.08, decay: 0.9 },
        { freq: 3456, gain: 0.04, decay: 0.5 },
      ];

      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(0.35, now);
      masterGain.connect(this.ctx.destination);

      frequencies.forEach(({ freq, gain, decay }) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 3, now);

        oscGain.gain.setValueAtTime(0, now);
        oscGain.gain.linearRampToValueAtTime(gain, now + 0.006);
        oscGain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

        osc.connect(oscGain);
        oscGain.connect(masterGain);

        osc.start(now);
        osc.stop(now + decay + 0.1);
      });
    } catch {
      // AudioContext unavailable
    }
  }
}

let templeBellAudioInstance: TempleBellAudio | null = null;
const getTempleBellAudio = () => {
  if (!templeBellAudioInstance && typeof window !== 'undefined') {
    templeBellAudioInstance = new TempleBellAudio();
  }
  return templeBellAudioInstance;
};

export const AnimatedTempleBell: React.FC<AnimatedTempleBellProps> = ({
  reducedMotion = false,
  className = '',
  onRing,
  size = 'md',
}) => {
  const [isRinging, setIsRinging] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [ripples, setRipples] = useState<number[]>([]);
  const [rotation, setRotation] = useState(0);
  const lastScrollY = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  // Track scroll velocity for realistic gentle pendulum sway
  useEffect(() => {
    if (reducedMotion) return;

    let targetRot = 0;
    let currentRot = 0;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      lastScrollY.current = currentY;

      // Cap rotation between -9 deg and +9 deg
      const impulse = Math.max(-9, Math.min(9, delta * 0.18));
      targetRot = impulse;
    };

    const updatePhysics = () => {
      // Spring damping back to center
      currentRot += (targetRot - currentRot) * 0.12;
      targetRot *= 0.92; // Damping decay
      setRotation(currentRot);
      animFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    animFrameRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [reducedMotion]);

  const scaleMap = {
    sm: 'w-16 h-28',
    md: 'w-20 h-36',
    lg: 'w-24 h-44',
  };

  const handleRing = () => {
    setIsRinging(true);
    const newId = Date.now();
    setRipples((prev) => [...prev.slice(-2), newId]);

    const audio = getTempleBellAudio();
    if (audio && audioEnabled) {
      audio.ring();
    }

    if (onRing) {
      onRing();
    }

    setTimeout(() => {
      setIsRinging(false);
    }, 1400);
  };

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !audioEnabled;
    setAudioEnabled(nextState);
    const audio = getTempleBellAudio();
    if (audio) {
      audio.setMuted(!nextState);
      if (nextState) {
        audio.ring();
      }
    }
  };

  // Determine effective rotation: active ring keyframe or scroll pendulum
  const bellTransform = isRinging && !reducedMotion
    ? 'animate-bell-ring'
    : '';

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Sound Toggle Pill (Strictly opt-in, never autoplay) */}
      <div className="mb-1 flex items-center gap-1.5 z-30">
        <button
          type="button"
          onClick={toggleAudio}
          className="px-2 py-0.5 rounded-full text-[10px] font-cinzel tracking-wider flex items-center gap-1 bg-[#1A140E]/85 hover:bg-[#2A1F16] border border-[#B68A45]/40 text-[#E5D1B6] hover:text-[#FFFDF8] shadow-xs transition-colors cursor-pointer"
          title={audioEnabled ? 'घंटा ध्वनी चालू (Sound Enabled)' : 'घंटा ध्वनी सुरू करा (Enable Bell Chime)'}
          aria-label={audioEnabled ? 'Mute temple bell sound' : 'Enable temple bell sound'}
        >
          {audioEnabled ? (
            <>
              <Volume2 className="w-3 h-3 text-[#C9964E] animate-pulse" />
              <span>ध्वनी चालू</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3 h-3 text-[#A67C57]" />
              <span>घंटा ध्वनी</span>
            </>
          )}
        </button>
      </div>

      {/* Interactive Bell Container */}
      <div
        className="relative cursor-pointer group focus:outline-hidden"
        onClick={handleRing}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleRing();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label="पवित्र मंदिर घंटा वाजवा — Tap to ring sacred temple bell"
        title="पवित्र मंदिर घंटा वाजवा (Tap to ring bell)"
      >
        {/* Golden Sonic Resonance Ripples */}
        {ripples.map((id) => (
          <div
            key={id}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border-2 border-[#C69A52] pointer-events-none z-0 animate-ping opacity-60"
          />
        ))}

        {/* Ambient Golden Glow when Ringing */}
        <div
          className={`absolute inset-0 bg-radial from-[#C69A52]/50 via-[#B68A45]/20 to-transparent blur-xl pointer-events-none transition-opacity duration-300 ${
            isRinging ? 'opacity-80 scale-125' : 'opacity-15 scale-100'
          }`}
        />

        {/* Swinging Bell SVG with Physics Rotation */}
        <div
          style={{
            transformOrigin: '50% 5%',
            transform: !isRinging && !reducedMotion ? `rotate(${rotation}deg)` : undefined,
          }}
          className={`${scaleMap[size]} relative z-10 transition-transform ${bellTransform}`}
        >
          <svg
            viewBox="0 0 100 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
          >
            <defs>
              <linearGradient id="bellBrassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4A2F13" />
                <stop offset="25%" stopColor="#8F6228" />
                <stop offset="50%" stopColor="#F5D77F" />
                <stop offset="68%" stopColor="#C9964E" />
                <stop offset="88%" stopColor="#7A521E" />
                <stop offset="100%" stopColor="#38210A" />
              </linearGradient>

              <linearGradient id="bellHighlightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF4D0" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#F5D77F" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#B68A45" stopOpacity="0.0" />
              </linearGradient>

              <linearGradient id="chainBrass" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6B4822" />
                <stop offset="50%" stopColor="#E5C365" />
                <stop offset="100%" stopColor="#4A2F13" />
              </linearGradient>

              <radialGradient id="clapperGrad" cx="40%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#FFE899" />
                <stop offset="50%" stopColor="#B8860B" />
                <stop offset="100%" stopColor="#2E1C0A" />
              </radialGradient>
            </defs>

            {/* Top Ceiling Hook */}
            <circle cx="50" cy="8" r="5" stroke="url(#chainBrass)" strokeWidth="2.5" fill="none" />

            {/* Traditional Indian Temple Chain Links */}
            <g stroke="url(#chainBrass)" strokeWidth="2" fill="none">
              <ellipse cx="50" cy="18" rx="3.5" ry="5.5" />
              <ellipse cx="50" cy="27" rx="3.5" ry="5.5" />
              <ellipse cx="50" cy="36" rx="3.5" ry="5.5" />
            </g>

            {/* Bell Crown / Top Finial */}
            <path
              d="M44 42 H56 L54 48 H46 Z"
              fill="url(#bellBrassGrad)"
              stroke="#2E1C0A"
              strokeWidth="0.8"
            />
            <path
              d="M40 48 Q50 44 60 48 L62 55 Q50 51 38 55 Z"
              fill="url(#bellBrassGrad)"
              stroke="#2E1C0A"
              strokeWidth="0.8"
            />

            {/* Bell Main Body Dome */}
            <path
              d="M38 55 Q35 75 24 102 Q22 108 26 112 Q34 116 50 116 Q66 116 74 112 Q78 108 76 102 Q65 75 62 55 Z"
              fill="url(#bellBrassGrad)"
              stroke="#2A1808"
              strokeWidth="1.2"
            />

            {/* Specular Highlight along Left Shoulder */}
            <path
              d="M40 58 Q38 75 30 102 Q35 104 46 104 Q50 78 44 58 Z"
              fill="url(#bellHighlightGrad)"
              pointerEvents="none"
            />

            {/* Decorative Carved Bands along Bell Rim */}
            <path d="M26 96 Q50 102 74 96" stroke="#3A220B" strokeWidth="1.5" fill="none" />
            <path d="M25 101 Q50 107 75 101" stroke="#FFEAA7" strokeWidth="1.2" fill="none" opacity="0.8" />
            <path d="M24 105 Q50 111 76 105" stroke="#3A220B" strokeWidth="1.2" fill="none" />

            {/* Lotus Carving dots around Rim */}
            <circle cx="34" cy="100" r="1.4" fill="#FFEAA7" />
            <circle cx="42" cy="102" r="1.4" fill="#FFEAA7" />
            <circle cx="50" cy="103" r="1.4" fill="#FFEAA7" />
            <circle cx="58" cy="102" r="1.4" fill="#FFEAA7" />
            <circle cx="66" cy="100" r="1.4" fill="#FFEAA7" />

            {/* Thick Rolled Bottom Lip */}
            <path
              d="M23 111 Q50 118 77 111 Q78 116 72 118 Q50 123 28 118 Q22 116 23 111 Z"
              fill="url(#bellBrassGrad)"
              stroke="#2A1808"
              strokeWidth="1"
            />

            {/* Inner Bell Hollow */}
            <ellipse cx="50" cy="116" rx="24" ry="4" fill="#1C1107" />

            {/* Bell Clapper (Lolaka) */}
            <g>
              <line x1="50" y1="110" x2="50" y2="132" stroke="#2A1808" strokeWidth="2.5" />
              <circle cx="50" cy="134" r="6" fill="url(#clapperGrad)" stroke="#2A1808" strokeWidth="1" />
              <circle cx="48" cy="132" r="1.5" fill="#FFF4D0" opacity="0.8" />
            </g>
          </svg>
        </div>
      </div>

      {/* Subtle Hint Text */}
      <span className="text-[9px] font-cinzel text-[#A67C57] tracking-wider mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
        घंटा वाजवा · Ring Bell
      </span>
    </div>
  );
};
