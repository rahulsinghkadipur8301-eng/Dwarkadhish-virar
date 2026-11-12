import React, { useState } from 'react';
import { Language, SEVA_OFFERINGS, SevaOffering } from '../data/templeData';
import { Check, Info, ArrowRight, X } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

interface SevaSectionProps {
  language: Language;
}

export const SevaSection: React.FC<SevaSectionProps> = ({ language }) => {
  const { tDict } = useI18n();
  const [selectedSeva, setSelectedSeva] = useState<SevaOffering | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    devoteeName: '',
    gotra: '',
    sankalpaDate: '',
    purpose: 'Birthday Seva',
  });

  const getTitle = (item: SevaOffering) => {
    if (language === 'hi') return item.titleHi;
    if (language === 'mr') return item.titleMr;
    if (language === 'gu') return (item as any).titleGu || item.titleHi;
    return item.titleEn;
  };

  const getDesc = (item: SevaOffering) => {
    if (language === 'hi') return item.descriptionHi;
    if (language === 'mr') return item.descriptionMr;
    if (language === 'gu') return (item as any).descriptionGu || item.descriptionHi;
    return item.descriptionEn;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const resetModal = () => {
    setSelectedSeva(null);
    setFormSubmitted(false);
    setFormData({
      devoteeName: '',
      gotra: '',
      sankalpaDate: '',
      purpose: 'Birthday Seva',
    });
  };

  return (
    <section id="seva" className="py-20 sm:py-24 bg-[#FBF6ED] border-b border-[#E5D1B6]">
      <div className="w-full max-w-[min(98vw,1840px)] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="max-w-3xl mb-12 sm:mb-14">
          <div className="text-xs sm:text-sm uppercase tracking-widest text-[#A67C57] font-semibold mb-2.5 font-cinzel">
            {tDict.seva.kicker}
          </div>
          <h2 className="font-serif-royal text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3C2A20] tracking-tight mb-4">
            {tDict.seva.title}
          </h2>
          <p className="text-base sm:text-lg text-[#715847] leading-relaxed">
            {tDict.seva.description}
          </p>
        </div>

        {/* Mandatory Seva Disclaimer Ribbon */}
        <div className="mb-10 p-5 bg-[#FFFDF8] border border-[#E5D1B6] flex items-start gap-3.5">
          <Info className="w-5 h-5 text-[#A67C57] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-[#3C2A20] leading-relaxed">
            <span className="font-semibold text-[#6B4832] block sm:inline mr-2">
              {tDict.seva.noticeHeader}:
            </span>
            {tDict.seva.noticeBody}
          </div>
        </div>

        {/* Seva Offerings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SEVA_OFFERINGS.map((seva) => (
            <div
              key={seva.id}
              className="bg-[#FFFDF8] border border-[#E5D1B6] p-6 flex flex-col justify-between hover:border-[#A67C57] transition-all hover:shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#376C68] uppercase tracking-wider font-cinzel mb-3">
                  <span>{seva.category}</span>
                  <span className="text-[#715847] font-mono capitalize">{seva.frequency}</span>
                </div>

                <h3 className="font-cinzel text-2xl font-bold text-[#3C2A20] mb-2">
                  {getTitle(seva)}
                </h3>

                <p className="text-xs sm:text-sm text-[#715847] leading-relaxed mb-6">
                  {getDesc(seva)}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5D1B6]/50 flex items-center justify-between">
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-[#715847]">
                    {tDict.seva.proposedOfferingLabel}
                  </span>
                  <span className="font-cinzel text-lg font-bold text-[#6B4832] tabular-nums">
                    ₹{seva.proposedAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedSeva(seva)}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#6B4832] hover:bg-[#523725] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{tDict.seva.btnSelect}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#B18A4C]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Seva Request Modal */}
      {selectedSeva && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FFFDF8] max-w-xl w-full border border-[#A67C57] shadow-2xl p-6 sm:p-8 relative max-h-[92vh] overflow-y-auto">
            <button
              type="button"
              onClick={resetModal}
              className="absolute top-4 right-4 p-2 text-[#3C2A20] hover:text-[#6B4832] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!formSubmitted ? (
              <>
                <div className="text-xs uppercase tracking-widest text-[#A67C57] font-cinzel mb-1">
                  {tDict.seva.modalSubtitle}
                </div>

                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#3C2A20] mb-2">
                  {getTitle(selectedSeva)}
                </h3>

                <div className="text-xs text-[#376C68] font-medium mb-4">
                  {tDict.seva.proposedOfferingLabel}: ₹{selectedSeva.proposedAmount.toLocaleString('en-IN')}
                </div>

                <p className="text-xs sm:text-sm text-[#715847] mb-6 leading-relaxed">
                  {getDesc(selectedSeva)}
                </p>

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-[#3C2A20] mb-1">
                      {tDict.seva.modalNameLabel}
                    </label>
                    <input
                      type="text"
                      placeholder="Name"
                      value={formData.devoteeName}
                      onChange={(e) => setFormData({ ...formData, devoteeName: e.target.value })}
                      className="w-full bg-white border border-[#E5D1B6] px-3 py-2 text-sm text-[#3C2A20] focus:outline-none focus:border-[#A67C57]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-[#3C2A20] mb-1">
                        {tDict.seva.modalGotraLabel}
                      </label>
                      <input
                        type="text"
                        placeholder="Gotra"
                        value={formData.gotra}
                        onChange={(e) => setFormData({ ...formData, gotra: e.target.value })}
                        className="w-full bg-white border border-[#E5D1B6] px-3 py-2 text-sm text-[#3C2A20] focus:outline-none focus:border-[#A67C57]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-[#3C2A20] mb-1">
                        {tDict.seva.modalSankalpaDateLabel}
                      </label>
                      <input
                        type="date"
                        value={formData.sankalpaDate}
                        onChange={(e) => setFormData({ ...formData, sankalpaDate: e.target.value })}
                        className="w-full bg-white border border-[#E5D1B6] px-3 py-2 text-sm text-[#3C2A20] focus:outline-none focus:border-[#A67C57]"
                        required
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-[#F3E7D6] border border-[#E5D1B6] text-xs text-[#715847] leading-relaxed">
                    <strong className="text-[#3C2A20]">Payment Disabled:</strong> In compliance with temple guidelines, no online transactions or banking integrations are activated.
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={resetModal}
                      className="px-4 py-2 text-xs font-medium border border-[#E5D1B6] text-[#3C2A20] hover:bg-white cursor-pointer"
                    >
                      {tDict.common.cancel}
                    </button>

                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#6B4832] hover:bg-[#523725] border border-[#A67C57] cursor-pointer"
                    >
                      {tDict.seva.modalBtnSubmit}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#376C68]/10 border border-[#376C68] flex items-center justify-center text-[#376C68] mb-4">
                  <Check className="w-7 h-7" />
                </div>

                <h4 className="font-cinzel text-2xl font-bold text-[#3C2A20] mb-2">
                  {tDict.seva.modalSuccessTitle}
                </h4>

                <p className="text-xs sm:text-sm text-[#715847] max-w-md mx-auto leading-relaxed mb-6">
                  {tDict.seva.modalSuccessMessage}
                </p>

                <button
                  type="button"
                  onClick={resetModal}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#6B4832] hover:bg-[#523725] cursor-pointer"
                >
                  {tDict.common.close}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
