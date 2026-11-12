import React, { useState } from 'react';
import { Language, TEMPLE_LOCATION_RECORD, getGoogleMapsSearchUrl, getGoogleMapsDirectionsUrl } from '../data/templeData';
import { MapPin, Navigation, Copy, Check, ExternalLink, Info, Train, Car, Clock } from 'lucide-react';
import { FluteDivider, LotusOrnament } from './KrishnaMotifs';
import { useI18n } from '../i18n/I18nContext';

interface TempleLocationSectionProps {
  language: Language;
}

export const TempleLocationSection: React.FC<TempleLocationSectionProps> = ({ language }) => {
  const { tDict } = useI18n();
  const [copied, setCopied] = useState(false);
  const loc = TEMPLE_LOCATION_RECORD;

  const handleCopyAddress = () => {
    if (loc.fullAddress) {
      navigator.clipboard.writeText(loc.fullAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const searchUrl = getGoogleMapsSearchUrl(loc);
  const directionsUrl = getGoogleMapsDirectionsUrl(loc);

  return (
    <section id="location" className="py-20 sm:py-24 bg-[#F3E7D6] border-b border-[#E5D1B6]">
      <div className="w-full max-w-[min(98vw,1840px)] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <LotusOrnament className="mb-3 text-[#A67C57]" size={34} />
          <div className="text-xs sm:text-sm uppercase tracking-widest text-[#A67C57] font-semibold mb-2 font-cinzel">
            {tDict.location.kicker}
          </div>
          <h2 className="font-serif-royal text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3C2A20] tracking-tight mb-3">
            {tDict.location.title}
          </h2>
          <p className="text-base sm:text-lg text-[#715847] leading-relaxed max-w-2xl">
            {tDict.location.description}
          </p>
          <FluteDivider className="w-full max-w-md mt-4" />
        </div>

        {/* Verification Status Banner */}
        <div className="mb-8 p-5 bg-[#FFFDF8] border border-[#C8AB88] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xs shadow-xs">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-[#A67C57] shrink-0 mt-0.5" />
            <div className="text-sm sm:text-base text-[#3C2A20] leading-relaxed">
              <span className="font-bold text-[#6B4832] mr-2">{tDict.location.guidanceHeader}:</span>
              {tDict.location.guidanceBody}
            </div>
          </div>
          <span className="px-3.5 py-1.5 bg-[#E5D1B6] text-[#6B4832] text-xs font-cinzel font-semibold uppercase tracking-wider shrink-0">
            {tDict.location.documentedBadge}
          </span>
        </div>

        {/* Desktop 60/40 Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Interactive Google Maps Surface (60% Desktop) */}
          <div className="lg:col-span-7 bg-[#FFFDF8] border border-[#C8AB88] p-3 sm:p-4 shadow-sm flex flex-col rounded-xs">
            <div className="relative w-full h-[380px] sm:h-[440px] lg:h-[480px] bg-[#E5D1B6]/40 overflow-hidden border border-[#E5D1B6] rounded-xs">
              <iframe
                title={tDict.location.iframeAriaLabel}
                src={`https://maps.google.com/maps?q=Shirgaon%20Virar%20East%20Dwarkadhish%20Mandir&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Quick Map Bar */}
            <div className="mt-3 pt-3 border-t border-[#E5D1B6] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-[#715847]">
                <MapPin className="w-4 h-4 text-[#A67C57]" />
                <span className="font-mono">{tDict.common.coordinates}: {loc.latitude}° N, {loc.longitude}° E</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={searchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-[#6B4832] hover:bg-[#523725] text-white font-medium rounded-none flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#B18A4C]" />
                  <span>{tDict.common.openInMaps}</span>
                  <ExternalLink className="w-3 h-3 text-white/70" />
                </a>
              </div>
            </div>
          </div>

          {/* Visitor Transit & Address Information (40% Desktop) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Written Address Box with Copy Feedback */}
            <div className="bg-[#FFFDF8] border border-[#C8AB88] p-5 shadow-xs">
              <div className="text-xs uppercase tracking-wider font-cinzel text-[#A67C57] font-semibold mb-1">
                {tDict.location.sanctuaryAddressTitle}
              </div>
              <h3 className="font-serif-royal text-xl font-bold text-[#3C2A20] mb-2">
                {loc.templeName}
              </h3>
              <p className="text-xs sm:text-sm text-[#715847] leading-relaxed mb-4">
                {loc.fullAddress}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E5D1B6]">
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="px-3.5 py-2 bg-[#FBF6ED] hover:bg-[#E5D1B6] border border-[#C8AB88] text-xs font-semibold text-[#6B4832] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5 text-[#A67C57]" />}
                  <span>{copied ? tDict.common.addressCopied : tDict.common.copyAddress}</span>
                </button>

                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#6B4832] hover:bg-[#523725] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#B18A4C]" />
                  <span>{tDict.common.getDirections}</span>
                </a>
              </div>
            </div>

            {/* Practical Approach Routes */}
            <div className="bg-[#FFFDF8] border border-[#C8AB88] p-5 shadow-xs space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#F3E7D6] text-[#6B4832] shrink-0 border border-[#E5D1B6]">
                  <Train className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-serif-royal font-bold text-base text-[#3C2A20] block">
                    {tDict.location.railwayTitle}
                  </span>
                  <p className="text-xs text-[#715847] mt-0.5 leading-relaxed">
                    {tDict.location.railwayDescription}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-[#E5D1B6]">
                <div className="p-2 bg-[#F3E7D6] text-[#6B4832] shrink-0 border border-[#E5D1B6]">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-serif-royal font-bold text-base text-[#3C2A20] block">
                    {tDict.location.roadTitle}
                  </span>
                  <p className="text-xs text-[#715847] mt-0.5 leading-relaxed">
                    {tDict.location.roadDescription}
                  </p>
                </div>
              </div>
            </div>

            {/* Daily Darshan Hours Summary */}
            <div className="bg-[#FFFDF8] border border-[#C8AB88] p-4 shadow-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#F3E7D6] text-[#A67C57] shrink-0 border border-[#E5D1B6]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider font-cinzel font-semibold text-[#A67C57]">
                    Daily Darshan Timings
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-[#3C2A20]">
                    {tDict.schedule.generalDarshanHours}
                  </div>
                  <div className="text-[11px] text-[#715847] mt-0.5">
                    {tDict.schedule.vishramNotice}
                  </div>
                </div>
              </div>
            </div>

            {/* Non-Gujarat Caution Reminder */}
            <div className="p-4 bg-[#FBF6ED] border border-[#C8AB88] text-xs text-[#715847] leading-relaxed">
              <span className="font-bold text-[#6B4832] block mb-0.5">{tDict.location.crucialDistinctionTitle}:</span>
              {tDict.location.crucialDistinctionBody}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
