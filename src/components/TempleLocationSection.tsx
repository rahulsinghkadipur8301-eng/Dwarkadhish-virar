import React, { useState } from 'react';
import { Language, TEMPLE_LOCATION_RECORD, getGoogleMapsSearchUrl, getGoogleMapsDirectionsUrl } from '../data/templeData';
import { MapPin, Navigation, Copy, Check, ExternalLink, Info, Train, Car, Clock, Bus } from 'lucide-react';
import { FluteDivider, LotusOrnament } from './KrishnaMotifs';
import { useI18n } from '../i18n/I18nContext';

interface TempleLocationSectionProps {
  language: Language;
}

export const TempleLocationSection: React.FC<TempleLocationSectionProps> = () => {
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
    <section id="location" className="py-12 sm:py-16 bg-[#F3E7D6] border-b border-[#E5D1B6]">
      <div className="w-full max-w-[min(98vw,1840px)] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <LotusOrnament className="mb-2 text-[#A67C57]" size={28} />
          <div className="text-xs sm:text-sm uppercase tracking-widest text-[#A67C57] font-semibold mb-1.5 font-cinzel">
            {tDict.location.kicker}
          </div>
          <h2 className="font-serif-royal text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-[#3C2A20] tracking-tight mb-2">
            {tDict.location.title}
          </h2>
          <p className="text-sm sm:text-base text-[#715847] leading-relaxed max-w-2xl">
            {tDict.location.description}
          </p>
          <FluteDivider className="w-full max-w-md mt-3" />
        </div>

        {/* Verification Status Banner */}
        <div className="mb-5 p-3.5 sm:p-4 bg-[#FFFDF8] border border-[#C8AB88] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xs shadow-xs">
          <div className="flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#A67C57] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-[#3C2A20] leading-relaxed">
              <span className="font-bold text-[#6B4832] mr-1.5">{tDict.location.guidanceHeader}</span>
              {tDict.location.guidanceBody}
            </div>
          </div>
          <span className="px-3 py-1 bg-[#E5D1B6] text-[#6B4832] text-[11px] font-cinzel font-semibold uppercase tracking-wider shrink-0">
            {tDict.location.documentedBadge}
          </span>
        </div>

        {/* Desktop 60/40 Split Layout — Tightly Balanced Height With Zero Empty Voids */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          {/* LEFT COLUMN (60% Desktop): Interactive Google Maps Surface + Dedicated VVMT Bus Service */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="bg-[#FFFDF8] border border-[#C8AB88] p-3 shadow-sm flex flex-col rounded-xs">
              <div className="relative w-full h-[300px] sm:h-[340px] lg:h-[365px] bg-[#E5D1B6]/40 overflow-hidden border border-[#E5D1B6] rounded-xs">
                <iframe
                  title={tDict.location.iframeAriaLabel}
                  src="https://maps.google.com/maps?q=Shirgaon%20Virar%20East%20Dwarkadhish%20Mandir&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Quick Map Bar */}
              <div className="mt-2.5 pt-2.5 border-t border-[#E5D1B6] flex flex-wrap items-center justify-between gap-2.5 text-xs">
                <div className="flex items-center gap-2 text-[#715847]">
                  <MapPin className="w-4 h-4 text-[#A67C57]" />
                  <span className="font-mono">GPS: {loc.latitude}° N, {loc.longitude}° E</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 bg-[#B68A45] hover:bg-[#9D7437] text-[#20140D] font-bold rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#20140D]" />
                    <span>{tDict.common.getDirections}</span>
                    <ExternalLink className="w-3 h-3 text-[#20140D]/80" />
                  </a>
                  <a
                    href={searchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-[#6B4832] hover:bg-[#523725] text-white font-medium rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#E5BE75]" />
                    <span>{tDict.common.openInMaps}</span>
                    <ExternalLink className="w-3 h-3 text-white/70" />
                  </a>
                </div>
              </div>
            </div>

            {/* Dedicated VVMT Municipal Bus Service & Easy Commute Card (Fills Left Column Cleanly) */}
            <div className="bg-[#FFFDF8] border-2 border-[#C29A54]/80 p-4 sm:p-5 shadow-xs rounded-xs flex-1 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-[#6B4832] text-[#E8C784] rounded-xs shrink-0">
                      <Bus className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif-royal text-lg sm:text-xl font-bold text-[#3C2A20] leading-snug">
                      {tDict.location.busTitle}
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 bg-[#F3E7D6] border border-[#C29A54]/70 text-[#741C24] text-[11px] font-cinzel font-bold uppercase tracking-wider rounded-xs shrink-0">
                    {tDict.location.busBadge}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#5A4435] leading-relaxed">
                  {tDict.location.busDescription}
                </p>
              </div>

              {/* 3 Easy Commute Quick Facts */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-4 pt-3.5 border-t border-[#E5D1B6]">
                <div className="bg-[#FBF6ED] border border-[#E5D1B6] px-3 py-2 rounded-xs flex items-center gap-2">
                  <Bus className="w-4 h-4 text-[#741C24] shrink-0" />
                  <span className="text-xs font-semibold text-[#3C2A20]">
                    {tDict.location.commuteMetricFreq}
                  </span>
                </div>
                <div className="bg-[#FBF6ED] border border-[#E5D1B6] px-3 py-2 rounded-xs flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#A67C57] shrink-0" />
                  <span className="text-xs font-semibold text-[#3C2A20]">
                    {tDict.location.commuteMetricDist}
                  </span>
                </div>
                <div className="bg-[#FBF6ED] border border-[#E5D1B6] px-3 py-2 rounded-xs flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#6B4832] shrink-0" />
                  <span className="text-xs font-semibold text-[#3C2A20]">
                    {tDict.location.commuteMetricTime}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (40% Desktop): Visitor Transit & Address Information */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {/* Written Address Box with Copy Feedback & Direct Google Maps Directions */}
            <div className="bg-[#FFFDF8] border border-[#C8AB88] p-4 shadow-xs rounded-xs">
              <div className="text-[11px] uppercase tracking-wider font-cinzel text-[#A67C57] font-semibold mb-1">
                {tDict.location.sanctuaryAddressTitle}
              </div>
              <h3 className="font-serif-royal text-lg sm:text-xl font-bold text-[#3C2A20] mb-1.5">
                {loc.templeName}
              </h3>
              <p className="text-xs sm:text-sm text-[#715847] leading-relaxed mb-2.5">
                {loc.fullAddress}
              </p>

              {/* Direct Clickable Google Maps Directions Link Box */}
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-3 px-3 py-2 bg-[#FBF6ED] hover:bg-[#F3E7D6] border border-[#C8AB88]/80 rounded-xs flex items-center justify-between gap-2 text-xs text-[#6B4832] transition-colors group"
              >
                <span className="flex items-center gap-2 min-w-0">
                  <Navigation className="w-3.5 h-3.5 text-[#B18A4C] shrink-0" />
                  <span className="font-semibold truncate">Google Maps: {loc.templeName}, Shirgaon, Virar East</span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-[#A67C57] group-hover:translate-x-0.5 transition-transform shrink-0" />
              </a>

              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E5D1B6]">
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="px-3 py-1.5 bg-[#FBF6ED] hover:bg-[#E5D1B6] border border-[#C8AB88] text-xs font-semibold text-[#6B4832] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5 text-[#A67C57]" />}
                  <span>{copied ? tDict.common.addressCopied : tDict.common.copyAddress}</span>
                </button>

                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-[#6B4832] hover:bg-[#523725] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#E5BE75]" />
                  <span>{tDict.common.getDirections}</span>
                  <ExternalLink className="w-3 h-3 text-white/75" />
                </a>
              </div>
            </div>

            {/* Practical Approach Routes */}
            <div className="bg-[#FFFDF8] border border-[#C8AB88] p-4 shadow-xs rounded-xs space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#F3E7D6] text-[#6B4832] shrink-0 border border-[#E5D1B6]">
                  <Train className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-serif-royal font-bold text-sm sm:text-base text-[#3C2A20] block">
                    {tDict.location.railwayTitle}
                  </span>
                  <p className="text-xs text-[#715847] mt-0.5 leading-relaxed">
                    {tDict.location.railwayDescription}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2.5 border-t border-[#E5D1B6]">
                <div className="p-2 bg-[#F3E7D6] text-[#6B4832] shrink-0 border border-[#E5D1B6]">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-serif-royal font-bold text-sm sm:text-base text-[#3C2A20] block">
                    {tDict.location.roadTitle}
                  </span>
                  <p className="text-xs text-[#715847] mt-0.5 leading-relaxed">
                    {tDict.location.roadDescription}
                  </p>
                </div>
              </div>
            </div>

            {/* Daily Darshan Hours Summary */}
            <div className="bg-[#FFFDF8] border border-[#C8AB88] p-3.5 shadow-xs rounded-xs flex items-center gap-3">
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

            {/* Non-Gujarat Caution Reminder */}
            <div className="p-3.5 bg-[#FBF6ED] border border-[#C8AB88] rounded-xs text-xs text-[#715847] leading-relaxed">
              <span className="font-bold text-[#6B4832] block mb-0.5">
                {tDict.location.crucialDistinctionTitle.replace(/[:：]\s*$/, '')}:
              </span>
              {tDict.location.crucialDistinctionBody}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
