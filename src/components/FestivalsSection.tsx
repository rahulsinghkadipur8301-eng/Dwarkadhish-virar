import React, { useState } from 'react';
import { Language, FESTIVALS_DATA, FestivalEvent } from '../data/templeData';
import { Calendar, Clock, Bell, Check, ArrowRight, X } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

interface FestivalsSectionProps {
  language: Language;
}

export const FestivalsSection: React.FC<FestivalsSectionProps> = ({ language }) => {
  const { tDict } = useI18n();
  const [selectedFestival, setSelectedFestival] = useState<FestivalEvent | null>(null);
  const [remindState, setRemindState] = useState<Record<string, boolean>>({});

  const handleRemindMe = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRemindState(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getTitle = (item: FestivalEvent) => {
    if (language === 'hi') return item.titleHi;
    if (language === 'mr') return item.titleMr;
    if (language === 'gu') return (item as any).titleGu || item.titleHi;
    return item.titleEn;
  };

  const getDesc = (item: FestivalEvent) => {
    if (language === 'hi') return item.descriptionHi;
    if (language === 'mr') return item.descriptionMr;
    if (language === 'gu') return (item as any).descriptionGu || item.descriptionHi;
    return item.descriptionEn;
  };

  return (
    <section id="festivals" className="py-20 sm:py-24 bg-[#FBF6ED] border-b border-[#E5D1B6]">
      <div className="w-full max-w-[min(98vw,1840px)] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="max-w-3xl mb-12 sm:mb-14">
          <div className="text-xs sm:text-sm uppercase tracking-widest text-[#A67C57] font-semibold mb-2.5 font-cinzel">
            {tDict.festivals.kicker}
          </div>
          <h2 className="font-serif-royal text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3C2A20] tracking-tight mb-4">
            {tDict.festivals.title}
          </h2>
          <p className="text-base sm:text-lg text-[#715847] leading-relaxed">
            {tDict.festivals.description}
          </p>
        </div>

        {/* Festival Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FESTIVALS_DATA.map((fest) => {
            const isSubscribed = remindState[fest.id];
            return (
              <div
                key={fest.id}
                onClick={() => setSelectedFestival(fest)}
                className="bg-[#FFFDF8] border border-[#E5D1B6] p-6 flex flex-col justify-between transition-all duration-300 hover:border-[#A67C57] hover:shadow-md cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#376C68] mb-3">
                    <span className="font-cinzel uppercase tracking-wider font-semibold">{fest.category}</span>
                    <span className="text-[#715847] font-mono">{fest.month}</span>
                  </div>

                  <h3 className="font-cinzel text-2xl font-bold text-[#3C2A20] group-hover:text-[#6B4832] transition-colors mb-2">
                    {getTitle(fest)}
                  </h3>

                  <div className="space-y-1.5 text-xs text-[#715847] mb-4 pb-4 border-b border-[#E5D1B6]/60">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#A67C57]" />
                      <span>{fest.dateStr}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#A67C57]" />
                      <span>{fest.timeStr}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#715847] line-clamp-3 leading-relaxed mb-4">
                    {getDesc(fest)}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#6B4832] group-hover:text-[#3C2A20] flex items-center gap-1">
                    <span>{tDict.festivals.viewProgramme}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>

                  <button
                    type="button"
                    onClick={(e) => handleRemindMe(fest.id, e)}
                    className={`px-3 py-1.5 text-xs font-medium border flex items-center gap-1.5 transition-colors cursor-pointer ${
                      isSubscribed
                        ? 'bg-[#376C68] text-white border-[#376C68]'
                        : 'border-[#E5D1B6] text-[#3C2A20] hover:bg-[#F3E7D6]'
                    }`}
                  >
                    {isSubscribed ? <Check className="w-3 h-3" /> : <Bell className="w-3 h-3 text-[#A67C57]" />}
                    <span>{isSubscribed ? tDict.festivals.reminderSetToast : tDict.festivals.remindMe}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Festival Detail Modal */}
      {selectedFestival && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FFFDF8] max-w-2xl w-full border border-[#A67C57] shadow-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedFestival(null)}
              className="absolute top-4 right-4 p-2 text-[#3C2A20] hover:text-[#6B4832] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs uppercase tracking-widest text-[#A67C57] font-cinzel mb-2">
              {selectedFestival.category} · {tDict.festivals.modalSubtitle}
            </div>

            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#3C2A20] mb-3">
              {getTitle(selectedFestival)}
            </h3>

            <div className="flex flex-wrap gap-4 text-xs font-medium text-[#3C2A20] mb-6 pb-4 border-b border-[#E5D1B6]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#A67C57]" />
                {selectedFestival.dateStr} ({selectedFestival.month})
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#A67C57]" />
                {selectedFestival.timeStr}
              </span>
            </div>

            <p className="text-sm sm:text-base text-[#3C2A20] leading-relaxed mb-6">
              {getDesc(selectedFestival)}
            </p>

            <div className="bg-[#F3E7D6]/60 p-4 border border-[#E5D1B6] mb-6">
              <h4 className="font-cinzel text-xs font-bold text-[#3C2A20] uppercase tracking-wider mb-2">
                Proposed Celebration Schedule
              </h4>
              <ul className="text-xs sm:text-sm space-y-2 text-[#715847] list-disc list-inside">
                <li>Vedic Panchamrit Mahabhishekam at Brahma Muhurta</li>
                <li>Devotional Sangeet & Akhanda Hare Krishna Sankirtan in the Mandapa</li>
                <li>Grand Shringaar with special Pitambar vastras and fragrant garlands</li>
                <li>Maha Aarti followed by Mahaprasad distribution to all visiting devotees</li>
              </ul>
            </div>

            <div className="flex justify-between items-center text-xs text-[#715847]">
              <span>*Schedule is proposed and subject to temple trust confirmation.</span>
              <button
                type="button"
                onClick={() => setSelectedFestival(null)}
                className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#6B4832] hover:bg-[#523725] cursor-pointer"
              >
                {tDict.common.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
