import React from 'react';
import { Language, TEMPLE_LOCATION_RECORD, getGoogleMapsSearchUrl } from '../data/templeData';
import { ArrowUp, Navigation } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { WhatsAppIcon, InstagramIcon, OFFICIAL_SOCIAL_LINKS } from './TempleSocialConnectSection';

interface FooterProps {
  language: Language;
  onNavigate: (tab: string) => void;
  onOpenPlanner: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onNavigate, onOpenPlanner }) => {
  const { tDict } = useI18n();
  const loc = TEMPLE_LOCATION_RECORD;
  const searchUrl = getGoogleMapsSearchUrl(loc);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#523725] text-[#FFFDF8] border-t-2 border-[#A67C57] pt-16 sm:pt-20 pb-12">
      <div className="w-full max-w-[min(98vw,1920px)] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-[#A67C57]/60">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#3C2A20] border-2 border-[#B18A4C] flex items-center justify-center text-[#B18A4C] font-cinzel font-bold text-xl shadow-xs">
                ॐ
              </div>
              <div>
                <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-tight text-[#FFFDF8] block">
                  {tDict.common.templeName}
                </span>
                <span className="text-xs sm:text-sm text-[#D8C2A4] tracking-wider uppercase font-cinzel font-semibold">
                  {tDict.common.localityBrief}
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#F5E6D3] max-w-lg leading-relaxed">
              {tDict.footer.dedication}
            </p>

            <div className="p-4 bg-[#3C2A20] border border-[#A67C57] text-xs sm:text-sm text-[#F0DFCA] max-w-lg rounded-xs">
              <strong className="text-[#C98945] block mb-1 font-cinzel text-xs tracking-wider uppercase">{tDict.footer.attributionNoteTitle}:</strong>
              {tDict.footer.attributionNoteBody}
            </div>

            {/* Official Social Portals */}
            <div className="pt-2">
              <span className="text-xs font-cinzel font-bold tracking-wider uppercase text-[#C98945] block mb-2.5">
                {tDict.footer.socialHeading}
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={OFFICIAL_SOCIAL_LINKS.whatsappChannel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={tDict.footer.whatsappChannelAria}
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/50 text-[#FFFDF8] hover:text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs hover:shadow-sm"
                >
                  <WhatsAppIcon className="w-4.5 h-4.5 text-[#25D366]" />
                  <span>WhatsApp Channel</span>
                </a>
                <a
                  href={OFFICIAL_SOCIAL_LINKS.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={tDict.footer.instagramAria}
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg bg-[#E4405F]/20 hover:bg-[#E4405F]/30 border border-[#E4405F]/50 text-[#FFFDF8] hover:text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs hover:shadow-sm"
                >
                  <InstagramIcon className="w-4.5 h-4.5 text-[#E4405F]" />
                  <span>@haripriyadwarka</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div>
            <h4 className="font-cinzel text-xs sm:text-sm font-bold uppercase tracking-wider text-[#C98945] mb-4">
              {tDict.footer.navHeading}
            </h4>
            <ul className="space-y-3 text-sm text-[#F5E6D3]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('overview')}
                  className="hover:text-[#C98945] hover:translate-x-0.5 transition-all cursor-pointer"
                >
                  {tDict.nav.overview}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('presence')}
                  className="hover:text-[#C98945] hover:translate-x-0.5 transition-all cursor-pointer"
                >
                  {tDict.nav.divinePresence}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('vision')}
                  className="hover:text-[#C98945] hover:translate-x-0.5 transition-all cursor-pointer"
                >
                  {tDict.nav.vision}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-[#C98945] hover:translate-x-0.5 transition-all cursor-pointer"
                >
                  {tDict.nav.gallery}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('darshan')}
                  className="hover:text-[#C98945] hover:translate-x-0.5 transition-all cursor-pointer"
                >
                  {tDict.nav.darshanTimings}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('location')}
                  className="hover:text-[#C98945] hover:translate-x-0.5 transition-all text-left cursor-pointer"
                >
                  {tDict.nav.location}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('festivals')}
                  className="hover:text-[#C98945] hover:translate-x-0.5 transition-all cursor-pointer"
                >
                  {tDict.nav.festivals}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('seva')}
                  className="hover:text-[#C98945] hover:translate-x-0.5 transition-all cursor-pointer"
                >
                  {tDict.nav.seva}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('donation')}
                  className="hover:text-[#C98945] hover:translate-x-0.5 transition-all cursor-pointer"
                >
                  {tDict.nav.donation}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('social')}
                  className="text-[#C98945] font-semibold hover:underline cursor-pointer"
                >
                  {tDict.nav.social}
                </button>
              </li>
            </ul>
          </div>

          {/* Pilgrim Services */}
          <div>
            <h4 className="font-cinzel text-xs sm:text-sm font-bold uppercase tracking-wider text-[#C98945] mb-4">
              {tDict.footer.servicesHeading}
            </h4>
            <ul className="space-y-3 text-sm text-[#F5E6D3]">
              <li>
                <button
                  type="button"
                  onClick={onOpenPlanner}
                  className="hover:text-[#C98945] hover:translate-x-0.5 transition-all text-left cursor-pointer font-medium"
                >
                  {tDict.common.planYourVisit}
                </button>
              </li>
              <li>
                <a
                  href={searchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C98945] hover:translate-x-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{tDict.common.getDirections}</span>
                  <Navigation className="w-3.5 h-3.5 text-[#C98945]" />
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('admin')}
                  className="text-[#C98945] hover:underline font-bold cursor-pointer"
                >
                  {tDict.nav.admin}
                </button>
              </li>
              <li className="pt-2 text-xs text-[#E5D1B6]/80 font-mono">
                Virar Railway Station (4.5 km)
              </li>
              <li className="text-xs text-[#E5D1B6]/80">
                Daily Hours: 06:00 AM – 09:00 PM
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Operational Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#F0DFCA]">
          <div className="flex flex-wrap items-center gap-2 text-center sm:text-left">
            <span>{tDict.footer.copyright}</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-[#A67C57] hover:border-[#B18A4C] text-xs text-[#E5D1B6] transition-colors cursor-pointer"
          >
            <span>{tDict.common.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#B18A4C]" />
          </button>
        </div>
      </div>
    </footer>
  );
};


