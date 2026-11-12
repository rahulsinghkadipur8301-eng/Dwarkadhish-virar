import React, { useEffect, useState } from 'react';

interface SpiritualAmbientBackgroundProps {
  reducedMotion?: boolean;
}

export const SpiritualAmbientBackground: React.FC<SpiritualAmbientBackgroundProps> = ({
  reducedMotion = false,
}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
        <div className="absolute inset-0 bg-[#FBF6ED]" />
      </div>
    );
  }

  // Extremely subtle parallax shifts
  const yShift1 = scrollY * -0.06;
  const yShift2 = scrollY * -0.1;
  const rotation = (scrollY * 0.02) % 360;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Layer 1: Traditional Indian Mandala & Lotus Geometry (Top-Right) */}
      <div
        style={{
          transform: `translateY(${yShift1}px)`,
          transition: 'transform 0.1s linear',
        }}
        className="absolute -top-20 -right-20 w-[580px] h-[580px] opacity-[0.035]"
      >
        <svg
          style={{ transform: `rotate(${rotation}deg)` }}
          viewBox="0 0 200 200"
          className="w-full h-full text-[#B18A4C] transition-transform duration-300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="1" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <g key={i} transform={`rotate(${angle} 100 100)`}>
              <path
                d="M 100,30 C 90,50 90,70 100,90 C 110,70 110,50 100,30 Z"
                stroke="currentColor"
                strokeWidth="1"
              />
              <circle cx="100" cy="20" r="3" fill="currentColor" />
            </g>
          ))}
        </svg>
      </div>

      {/* Layer 2: Lower-Left Traditional Temple Jali Motif */}
      <div
        style={{
          transform: `translateY(${yShift2}px)`,
          transition: 'transform 0.1s linear',
        }}
        className="absolute top-1/2 -left-28 w-[500px] h-[500px] opacity-[0.03]"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full text-[#6B4832]" fill="none">
          <pattern id="bgJaliPatt" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="0.8" />
            <path d="M20 0 V40 M0 20 H40" stroke="currentColor" strokeWidth="0.5" />
            <polygon points="20,8 32,20 20,32 8,20" stroke="currentColor" strokeWidth="0.6" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#bgJaliPatt)" />
        </svg>
      </div>

      {/* Layer 3: Warm Ambient Spiritual Light Variations */}
      <div
        className="absolute top-1/3 left-1/4 w-[700px] h-[700px] rounded-full blur-[120px] opacity-[0.045] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(198, 154, 82, 0.7) 0%, rgba(245, 215, 127, 0.3) 50%, transparent 80%)',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[100px] opacity-[0.035] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(166, 124, 87, 0.6) 0%, rgba(201, 137, 69, 0.25) 50%, transparent 80%)',
        }}
      />
    </div>
  );
};
