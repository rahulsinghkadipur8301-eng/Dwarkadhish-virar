import React, { useState } from 'react';
import { Language, TEMPLE_LOCATION_RECORD, getGoogleMapsSearchUrl } from '../data/templeData';
import { MapPin, Navigation, Train, Car, X, Clock, ExternalLink } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

interface PlannerModalProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
}

export const PlannerModal: React.FC<PlannerModalProps> = ({ language, isOpen, onClose }) => {
  const { tDict } = useI18n();
  const [activeStep, setActiveStep] = useState(1);
  const loc = TEMPLE_LOCATION_RECORD;

  if (!isOpen) return null;

  const searchUrl = getGoogleMapsSearchUrl(loc);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="planner-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
    >
      <div className="bg-[#FFFDF8] max-w-3xl w-full border border-[#C8AB88] shadow-2xl relative max-h-[92vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 z-10 bg-[#6B4832] text-[#FFFDF8] p-6 border-b border-[#A67C57] flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-[#B18A4C] font-cinzel font-semibold">
              {tDict.common.planYourVisit}
            </div>
            <h3 id="planner-modal-title" className="font-serif-royal text-2xl font-bold text-[#FFFDF8]">
              {tDict.planner.modalTitle}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#E5D1B6] hover:text-white cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Journey Step Navigation */}
        <div className="bg-[#F3E7D6] border-b border-[#E5D1B6] px-6 py-3 flex items-center justify-between gap-2 text-xs font-semibold uppercase tracking-wider text-[#3C2A20] overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveStep(1)}
            className={`px-3.5 py-1.5 transition-colors whitespace-nowrap cursor-pointer ${
              activeStep === 1 ? 'bg-[#6B4832] text-white' : 'hover:text-[#6B4832]'
            }`}
          >
            1. {tDict.planner.step1Title}
          </button>
          <button
            type="button"
            onClick={() => setActiveStep(2)}
            className={`px-3.5 py-1.5 transition-colors whitespace-nowrap cursor-pointer ${
              activeStep === 2 ? 'bg-[#6B4832] text-white' : 'hover:text-[#6B4832]'
            }`}
          >
            2. {tDict.planner.step2Title}
          </button>
          <button
            type="button"
            onClick={() => setActiveStep(3)}
            className={`px-3.5 py-1.5 transition-colors whitespace-nowrap cursor-pointer ${
              activeStep === 3 ? 'bg-[#6B4832] text-white' : 'hover:text-[#6B4832]'
            }`}
          >
            3. {tDict.planner.step3Title}
          </button>
        </div>

        {/* Step Contents */}
        <div className="p-6 sm:p-8 space-y-6">
          {activeStep === 1 && (
            <div className="space-y-6">
              <div className="bg-[#FBF6ED] p-5 border border-[#C8AB88]">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-[#6B4832] text-[#E5D1B6] shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif-royal text-xl font-bold text-[#3C2A20] mb-1">
                      {tDict.location.sanctuaryAddressTitle}
                    </h4>
                    <p className="text-sm text-[#3C2A20] font-medium">
                      {loc.fullAddress}
                    </p>
                    <p className="text-xs text-[#715847] mt-1">
                      {loc.entranceNotes}
                    </p>
                  </div>
                </div>
              </div>

              {/* Transit Modes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#FBF6ED] p-5 border border-[#C8AB88]">
                  <div className="flex items-center gap-3 text-xs uppercase font-cinzel text-[#A67C57] tracking-wider mb-2">
                    <Train className="w-4 h-4 text-[#B18A4C]" />
                    <span>{tDict.location.railwayTitle}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#715847] leading-relaxed">
                    {tDict.location.railwayDescription}
                  </p>
                </div>

                <div className="bg-[#FBF6ED] p-5 border border-[#C8AB88]">
                  <div className="flex items-center gap-3 text-xs uppercase font-cinzel text-[#A67C57] tracking-wider mb-2">
                    <Car className="w-4 h-4 text-[#B18A4C]" />
                    <span>{tDict.location.roadTitle}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#715847] leading-relaxed">
                    {tDict.location.roadDescription}
                  </p>
                </div>
              </div>

              {/* Interactive Directions Action */}
              <div className="p-4 bg-[#F3E7D6] border border-[#C8AB88] flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-[#3C2A20]">
                  {tDict.common.coordinates} ({loc.latitude}° N, {loc.longitude}° E):
                </span>
                <div className="flex gap-2">
                  <a
                    href={searchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#6B4832] hover:bg-[#523725] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#B18A4C]" />
                    <span>{tDict.common.openInMaps}</span>
                    <ExternalLink className="w-3 h-3 text-white/70" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="space-y-6">
              <div className="bg-[#FBF6ED] p-5 border border-[#C8AB88]">
                <h4 className="font-serif-royal text-xl font-bold text-[#3C2A20] mb-3">
                  {tDict.planner.darshanRec}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-3 bg-[#FFFDF8] border border-[#E5D1B6]">
                    <span className="font-semibold text-[#6B4832] block mb-1">{tDict.schedule.categoryMorning}</span>
                    <span className="text-[#3C2A20]">06:00 – 12:00</span>
                    <p className="text-[11px] text-[#A67C57] mt-1">{tDict.schedule.statusOpen}</p>
                  </div>
                  <div className="p-3 bg-[#FFFDF8] border border-[#E5D1B6]">
                    <span className="font-semibold text-[#6B4832] block mb-1">{tDict.schedule.categoryEvening}</span>
                    <span className="text-[#3C2A20]">16:00 – 21:00</span>
                    <p className="text-[11px] text-[#A67C57] mt-1">{tDict.schedule.statusOpen}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong>{tDict.schedule.vishramNotice}:</strong> 12:00 PM – 04:00 PM
                </div>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className="space-y-6">
              <div className="bg-[#FBF6ED] p-5 border border-[#C8AB88]">
                <h4 className="font-serif-royal text-xl font-bold text-[#3C2A20] mb-3">
                  {tDict.planner.safetyTip}
                </h4>
                <ul className="text-xs sm:text-sm space-y-2.5 text-[#3C2A20] list-disc list-inside">
                  <li><strong>{tDict.planner.travelSummary}:</strong> {tDict.location.railwayDescription}</li>
                  <li><strong>{tDict.planner.darshanRec}:</strong> Mangala Aarti (06:00) & Sandhya Aarti (19:00)</li>
                  <li><strong>{tDict.location.crucialDistinctionTitle}:</strong> {tDict.location.crucialDistinctionBody}</li>
                </ul>
              </div>

              <div className="p-4 bg-[#6B4832] text-[#FFFDF8] border border-[#A67C57] text-xs leading-relaxed">
                <span className="font-semibold text-[#B18A4C] block mb-1">{tDict.planner.safetyTip}:</span>
                {loc.fullAddress}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="sticky bottom-0 bg-[#F3E7D6] border-t border-[#E5D1B6] p-4 flex items-center justify-between">
          <div className="flex gap-2">
            {activeStep > 1 && (
              <button
                type="button"
                onClick={() => setActiveStep(activeStep - 1)}
                className="px-4 py-2 border border-[#C8AB88] text-xs font-semibold text-[#3C2A20] bg-[#FFFDF8] cursor-pointer"
              >
                {tDict.common.back}
              </button>
            )}
          </div>

          <div className="flex gap-2">
            {activeStep < 3 ? (
              <button
                type="button"
                onClick={() => setActiveStep(activeStep + 1)}
                className="px-5 py-2 bg-[#6B4832] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                {tDict.planner.nextStep}
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-[#A67C57] hover:bg-[#6B4832] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                {tDict.common.close}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


