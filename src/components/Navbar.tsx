import React, { useState } from 'react';
import { Language } from '../data/templeData';
import { Globe, Menu, X, ArrowUpRight, Zap, ZapOff, ChevronDown } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenPlanner: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  activeTab,
  onTabChange,
  onOpenPlanner,
  reducedMotion,
  onToggleReducedMotion,
}) => {
  const { tDict } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  const navItems = [
    { id: 'overview', labelEn: 'Overview', labelHi: 'परिचय', labelMr: 'परिचय', labelGu: 'પરિચય' },
    { id: 'presence', labelEn: 'Divine Presence', labelHi: 'दिव्य स्वरूप', labelMr: 'दिव्य स्वरूप', labelGu: 'દિવ્ય દર્શન' },
    { id: 'vision', labelEn: 'Sacred Vision', labelHi: 'पावन संकल्प', labelMr: 'पवित्र संकल्प', labelGu: 'પવિત્ર સંકલ્પ' },
    { id: 'gallery', labelEn: 'Gallery', labelHi: 'चित्र दीर्घा', labelMr: 'चित्रदालन', labelGu: 'ચિત્ર દર્શન' },
    { id: 'darshan', labelEn: 'Darshan Timings', labelHi: 'दर्शन समय', labelMr: 'दर्शन वेळ', labelGu: 'દર્શન સમય' },
    { id: 'location', labelEn: 'Plan Your Visit', labelHi: 'स्थान व मार्ग', labelMr: 'स्थान व नकाशा', labelGu: 'સ્થાન અને નકશો' },
    { id: 'festivals', labelEn: 'Festivals', labelHi: 'उत्सव', labelMr: 'उत्सव', labelGu: 'ઉત્સવ' },
    { id: 'seva', labelEn: 'Seva Offerings', labelHi: 'सेवा', labelMr: 'सेवा', labelGu: 'સેવા' },
    { id: 'donation', labelEn: 'Contributions', labelHi: 'सेवा सहयोग', labelMr: 'देणगी सहयोग', labelGu: 'સેવા સહયોગ' },
    { id: 'social', labelEn: 'Connect', labelHi: 'जुड़ें', labelMr: 'जोडा', labelGu: 'જોડાઓ' },
    { id: 'admin', labelEn: 'Management', labelHi: 'प्रबंधन', labelMr: 'व्यवस्थापन', labelGu: 'વ્યવસ્થાપન' },
  ];

  const primaryNav = navItems.slice(0, 5);
  const secondaryNav = navItems.slice(5);

  const getLabel = (item: typeof navItems[0]) => {
    if (language === 'hi') return item.labelHi;
    if (language === 'mr') return item.labelMr;
    if (language === 'gu') return item.labelGu;
    return item.labelEn;
  };

  return (
    <>
      {/* Primary Navigation Bar in Warm Ivory */}
      <header className="sticky top-0 z-40 bg-[#FFFDF8]/96 backdrop-blur-md border-b border-[#E5D1B6] transition-all duration-200">
        <div className="w-full max-w-[min(98vw,1920px)] mx-auto px-4 sm:px-6 lg:px-6 xl:px-8 h-20 flex items-center justify-between gap-3 xl:gap-4">
          {/* Zone 1: Identity Lockup */}
          <button
            type="button"
            onClick={() => {
              onTabChange('overview');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 text-left shrink-0 group focus:outline-none"
          >
            <div className="w-10 h-10 xl:w-11 xl:h-11 rounded-full bg-[#F3E7D6] border border-[#A67C57] flex items-center justify-center text-[#6B4832] font-cinzel font-bold text-lg xl:text-xl shadow-xs group-hover:scale-105 transition-transform">
              ॐ
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-base xl:text-lg font-bold tracking-tight text-[#3C2A20] group-hover:text-[#6B4832] transition-colors whitespace-nowrap">
                {tDict.common.templeName}
              </span>
              <span className="text-[11px] font-semibold tracking-wider text-[#A67C57] uppercase font-cinzel">
                {tDict.common.localityBrief}
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-4 text-sm xl:text-[15px] font-medium text-[#3C2A20]">
            {primaryNav.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                className={`transition-colors whitespace-nowrap py-1.5 relative hover:text-[#6B4832] cursor-pointer focus-visible:outline-none focus-visible:text-[#6B4832] ${
                  activeTab === item.id ? 'text-[#6B4832] font-bold' : 'text-[#715847]'
                }`}
              >
                {getLabel(item)}
                {activeTab === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A67C57]" />
                )}
              </button>
            ))}

            {/* More Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                className={`flex items-center gap-1 transition-colors whitespace-nowrap py-1.5 hover:text-[#6B4832] cursor-pointer ${
                  secondaryNav.some((item) => item.id === activeTab) ? 'text-[#6B4832] font-bold' : 'text-[#715847]'
                }`}
                aria-expanded={moreMenuOpen}
              >
                <span>{tDict.nav.more}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {moreMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-52 bg-[#FFFDF8] border border-[#E5D1B6] shadow-xl py-2 z-50 rounded-xs animate-in fade-in slide-in-from-top-1"
                  onMouseLeave={() => setMoreMenuOpen(false)}
                >
                  {secondaryNav.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        onTabChange(item.id);
                        setMoreMenuOpen(false);
                      }}
                      className={`w-full text-left px-5 py-2.5 text-sm font-medium hover:bg-[#F3E7D6] transition-colors cursor-pointer ${
                        activeTab === item.id ? 'text-[#6B4832] font-bold bg-[#F3E7D6]/50' : 'text-[#3C2A20]'
                      }`}
                    >
                      {getLabel(item)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Zone 3: Language Selector + Primary Action CTA */}
          <div className="hidden sm:flex items-center gap-2.5 xl:gap-3 shrink-0">
            {/* Compact Integrated Language Selector */}
            <div
              className="flex items-center bg-[#F3E7D6]/90 p-1 rounded-lg border border-[#D8C2A4] shadow-xs"
              role="group"
              aria-label="Language Selector"
            >
              <div className="flex items-center pl-1.5 pr-1 text-[#76502F]">
                <Globe className="w-3.5 h-3.5 text-[#B78B49]" />
              </div>
              {(['en', 'hi', 'mr', 'gu'] as const).map((langCode) => {
                const labels = {
                  en: 'EN',
                  hi: 'हिंदी',
                  mr: 'मराठी',
                  gu: 'ગુજરાતી',
                };
                const isActive = language === langCode;
                return (
                  <button
                    key={langCode}
                    type="button"
                    onClick={() => onLanguageChange(langCode)}
                    aria-pressed={isActive}
                    className={`px-2 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#B78B49] ${
                      isActive
                        ? 'bg-[#B78B49] text-white shadow-xs font-bold'
                        : 'text-[#523725] hover:text-[#34251E] hover:bg-black/5'
                    }`}
                  >
                    {labels[langCode]}
                  </button>
                );
              })}
            </div>

            {/* Plan Your Visit CTA Button */}
            <button
              type="button"
              onClick={onOpenPlanner}
              className="px-3.5 xl:px-4 py-2.5 text-xs uppercase tracking-wider font-bold text-white bg-[#6B4832] hover:bg-[#523725] border border-[#A67C57] rounded-lg shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer active:scale-98"
            >
              <span>{tDict.common.planYourVisit}</span>
              <ArrowUpRight className="w-4 h-4 text-[#B18A4C]" />
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="p-2 text-[#3C2A20] hover:text-[#6B4832] focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu in Warm Ivory */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FFFDF8] border-b border-[#E5D1B6] px-6 py-6 shadow-xl space-y-5">
            {/* Mobile Language Selector */}
            <div className="pb-4 border-b border-[#E5D1B6]/60">
              <span className="block text-xs font-cinzel text-[#76502F] uppercase tracking-wider font-semibold mb-2">
                Select Language / भाषा निवडा:
              </span>
              <div className="grid grid-cols-4 gap-2">
                {(['en', 'hi', 'mr', 'gu'] as const).map((langCode) => {
                  const labels = {
                    en: 'English',
                    hi: 'हिंदी',
                    mr: 'मराठी',
                    gu: 'ગુજરાતી',
                  };
                  const isActive = language === langCode;
                  return (
                    <button
                      key={langCode}
                      type="button"
                      onClick={() => onLanguageChange(langCode)}
                      className={`py-2 text-center rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#B78B49] text-white shadow-xs font-bold'
                          : 'bg-[#F3E7D6] text-[#523725] hover:bg-[#E5D1B6]'
                      }`}
                    >
                      {labels[langCode]}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onTabChange(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left py-2 text-base font-medium transition-colors border-b border-[#E5D1B6]/50 ${
                    activeTab === item.id ? 'text-[#6B4832] font-bold' : 'text-[#3C2A20]'
                  }`}
                >
                  {getLabel(item)}
                </button>
              ))}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  onOpenPlanner();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-lg text-center text-xs uppercase tracking-wider font-bold text-white bg-[#6B4832] hover:bg-[#523725] flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>{tDict.common.planYourVisit}</span>
                <ArrowUpRight className="w-4 h-4 text-[#B18A4C]" />
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};


