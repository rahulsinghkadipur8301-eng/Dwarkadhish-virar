import React, { useMemo } from 'react';

interface SacredAmbientBackgroundProps {
  reducedMotion?: boolean;
}

export const SacredAmbientBackground: React.FC<SacredAmbientBackgroundProps> = ({
  reducedMotion = false,
}) => {
  // Generate light deterministic golden dust particle coordinates
  const particles = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: `${(i * 7.1 + 3) % 96}%`,
      top: `${(i * 9.3 + 5) % 94}%`,
      size: (i % 3) + 2,
      duration: 16 + (i % 8) * 3,
      delay: (i % 6) * 1.5,
      opacity: 0.25 + (i % 4) * 0.1,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Layer 1 & 3: Soft Antique-Gold Ambient Lighting Glows */}
      <div
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none opacity-40 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(229,190,117,0.18) 0%, rgba(197,155,86,0.06) 50%, transparent 75%)',
        }}
      />
      <div
        className="absolute top-1/2 -right-32 w-[700px] h-[700px] rounded-full pointer-events-none opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(245,215,127,0.14) 0%, rgba(182,138,69,0.05) 50%, transparent 75%)',
        }}
      />

      {/* Layer 2: Faint Traditional Indian Mandala & Lotus Motifs */}
      <div className="absolute top-1/4 left-6 w-96 h-96 opacity-[0.035] pointer-events-none transform -rotate-12">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="85" stroke="#A67C57" strokeWidth="1.5" strokeDasharray="6 4" />
          <circle cx="100" cy="100" r="65" stroke="#C59B56" strokeWidth="1.2" />
          <circle cx="100" cy="100" r="45" stroke="#A67C57" strokeWidth="1" strokeDasharray="3 3" />
          {[...Array(12)].map((_, i) => (
            <line
              key={i}
              x1="100"
              y1="100"
              x2={100 + 85 * Math.cos((i * Math.PI) / 6)}
              y2={100 + 85 * Math.sin((i * Math.PI) / 6)}
              stroke="#A67C57"
              strokeWidth="0.8"
            />
          ))}
        </svg>
      </div>

      <div className="absolute bottom-1/4 right-8 w-80 h-80 opacity-[0.03] pointer-events-none transform rotate-45">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="80" stroke="#C59B56" strokeWidth="1.2" />
          <path d="M100 20 C140 60 140 140 100 180 C60 140 60 60 100 20 Z" stroke="#A67C57" strokeWidth="1" />
          <path d="M20 100 C60 140 140 140 180 100 C140 60 60 60 20 100 Z" stroke="#A67C57" strokeWidth="1" />
        </svg>
      </div>

      {/* Layer 4: Floating Golden Dust Particles (disabled if reducedMotion) */}
      {!reducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((p) => (
            <div
              key={p.id}
              style={{
                left: p.left,
                top: p.top,
                width: `${p.size}px`,
                height: `${p.size}px`,
                opacity: p.opacity,
                boxShadow: '0 0 6px 1px rgba(245, 215, 127, 0.45)',
                animation: `floatUpDust ${p.duration}s infinite linear`,
                animationDelay: `${p.delay}s`,
              }}
              className="absolute rounded-full bg-gradient-to-t from-[#C59B56] to-[#FFE8B3]"
            />
          ))}
        </div>
      )}
    </div>
  );
};
