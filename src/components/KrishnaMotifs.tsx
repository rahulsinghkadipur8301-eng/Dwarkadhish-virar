import React from 'react';

interface PeacockFeatherProps {
  className?: string;
  size?: number;
}

export const PeacockFeather: React.FC<PeacockFeatherProps> = ({ className = '', size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${className}`}
      aria-hidden="true"
    >
      {/* Outer Feather Quill Spine */}
      <path
        d="M20 90C35 75 55 50 85 15"
        stroke="#A67C57"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Fine Ornamental Vane Whisps */}
      <path d="M40 70C35 62 38 52 46 54" stroke="#C8AB88" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M45 65C52 68 56 60 48 55" stroke="#C8AB88" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M55 55C48 45 54 38 62 42" stroke="#B18A4C" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M60 50C68 53 72 44 65 38" stroke="#B18A4C" strokeWidth="1.2" strokeLinecap="round" />
      
      {/* Sacred Eye of the Feather - Gold & Teal pigments */}
      <ellipse cx="72" cy="28" rx="14" ry="18" transform="rotate(35 72 28)" fill="#C8AB88" fillOpacity="0.3" stroke="#B18A4C" strokeWidth="1.5" />
      <ellipse cx="72" cy="28" rx="10" ry="13" transform="rotate(35 72 28)" fill="#376C68" fillOpacity="0.4" stroke="#376C68" strokeWidth="1.5" />
      <circle cx="72" cy="28" r="5" fill="#3C2A20" />
      <circle cx="70" cy="26" r="1.5" fill="#FFFDF8" />
    </svg>
  );
};

export const FluteDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center gap-3 my-6 ${className}`} aria-hidden="true">
      <div className="h-px bg-gradient-to-r from-transparent via-[#C8AB88] to-[#A67C57] flex-1 max-w-xs" />
      <svg width="48" height="14" viewBox="0 0 60 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Slender Flute Bar */}
        <rect x="4" y="6" width="52" height="4" rx="2" fill="#A67C57" />
        <circle cx="16" cy="8" r="1.5" fill="#FBF6ED" />
        <circle cx="24" cy="8" r="1.5" fill="#FBF6ED" />
        <circle cx="32" cy="8" r="1.5" fill="#FBF6ED" />
        <circle cx="40" cy="8" r="1.5" fill="#FBF6ED" />
        <circle cx="48" cy="8" r="1.5" fill="#FBF6ED" />
        {/* Peacock feather tassel at the flute end */}
        <path d="M52 10C55 14 58 13 60 15" stroke="#B18A4C" strokeWidth="1.2" />
      </svg>
      <div className="h-px bg-gradient-to-l from-transparent via-[#C8AB88] to-[#A67C57] flex-1 max-w-xs" />
    </div>
  );
};

export const LotusOrnament: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 28 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Central Lotus Petal */}
      <path d="M16 4C14 10 12 16 16 26C20 16 18 10 16 4Z" fill="#C98945" fillOpacity="0.25" stroke="#A67C57" strokeWidth="1.2" />
      {/* Side Petals */}
      <path d="M16 12C10 14 7 19 10 24C12 25 14 25 16 24" fill="#E5D1B6" fillOpacity="0.4" stroke="#A67C57" strokeWidth="1.2" />
      <path d="M16 12C22 14 25 19 22 24C20 25 18 25 16 24" fill="#E5D1B6" fillOpacity="0.4" stroke="#A67C57" strokeWidth="1.2" />
      <path d="M16 18C8 20 6 24 8 26C11 27 14 26 16 25" stroke="#C8AB88" strokeWidth="1" />
      <path d="M16 18C24 20 26 24 24 26C21 27 18 26 16 25" stroke="#C8AB88" strokeWidth="1" />
      <circle cx="16" cy="24" r="2" fill="#B18A4C" />
    </svg>
  );
};

export const DiyaAccent: React.FC<{ className?: string; animated?: boolean }> = ({ className = '', animated = true }) => {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Diya Base */}
      <path d="M6 18C6 24 12 27 16 27C20 27 26 24 26 18H6Z" fill="#A67C57" stroke="#6B4832" strokeWidth="1.5" />
      <path d="M16 27V29M12 29H20" stroke="#6B4832" strokeWidth="1.5" strokeLinecap="round" />
      {/* Glowing sacred flame */}
      <path
        d="M16 6C17 9 20 12 18 15C16.5 17 15.5 17 14 15C12 12 15 9 16 6Z"
        fill="#C98945"
        stroke="#B18A4C"
        strokeWidth="1.2"
        className={animated ? 'animate-pulse' : ''}
      />
      <circle cx="16" cy="13" r="1.5" fill="#FFFDF8" />
    </svg>
  );
};
