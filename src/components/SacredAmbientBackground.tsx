import React, { useMemo } from 'react';

interface SacredAmbientBackgroundProps {
  reducedMotion?: boolean;
}

export const SacredAmbientBackground: React.FC<SacredAmbientBackgroundProps> = React.memo(() => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Soft Antique-Gold Ambient Glows (pure gradients, zero costly blur-3xl GPU textures) */}
      <div
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(229,190,117,0.22) 0%, rgba(197,155,86,0.06) 45%, transparent 72%)',
        }}
      />
      <div
        className="hidden sm:block absolute top-1/2 -right-32 w-[700px] h-[700px] rounded-full pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(245,215,127,0.16) 0%, rgba(182,138,69,0.05) 45%, transparent 72%)',
        }}
      />
    </div>
  );
});
