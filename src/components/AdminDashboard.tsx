import React, { useState } from 'react';
import { Language, AARTI_SCHEDULE, FESTIVALS_DATA } from '../data/templeData';
import { ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

interface AdminDashboardProps {
  language: Language;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ language: propLanguage, onClose }) => {
  const { language, tDict } = useI18n();
  const currentLang = language || propLanguage;
  const [activeModule, setActiveModule] = useState<'overview' | 'darshan' | 'festivals' | 'seva' | 'donations'>('overview');
  const [announcementText, setAnnouncementText] = useState('Janmashtami Mahotsav preparations underway. Special volunteer meeting scheduled for this Sunday at 5 PM.');
  const [announcementSaved, setAnnouncementSaved] = useState(false);

  // Editable sample schedule state
  const [schedules, setSchedules] = useState(AARTI_SCHEDULE);

  const handleTimeChange = (id: string, newTime: string) => {
    setSchedules(prev => prev.map(item => item.id === id ? { ...item, time: newTime } : item));
  };

  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    setAnnouncementSaved(true);
    setTimeout(() => setAnnouncementSaved(false), 3000);
  };

  const getAartiName = (item: typeof AARTI_SCHEDULE[0]) => {
    if (currentLang === 'hi') return item.nameHi;
    if (currentLang === 'mr') return item.nameMr;
    if (currentLang === 'gu') return (item as any).nameGu || item.nameHi;
    return item.nameEn;
  };

  const getFestivalTitle = (fest: typeof FESTIVALS_DATA[0]) => {
    if (currentLang === 'hi') return fest.titleHi;
    if (currentLang === 'mr') return fest.titleMr;
    if (currentLang === 'gu') return (fest as any).titleGu || fest.titleHi;
    return fest.titleEn;
  };

  return (
    <div className="bg-[#101D32] min-h-screen text-[#F7F3E9] py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[min(94vw,2400px)] mx-auto space-y-8">
        {/* Dashboard Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#B18A45]/30">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B18A45] font-cinzel">
              <ShieldCheck className="w-4 h-4" />
              <span>{tDict.admin.dashboardSubtitle}</span>
            </div>
            <h1 className="font-serif-royal text-2xl sm:text-3xl font-bold text-[#F7F3E9] mt-1">
              {tDict.admin.dashboardTitle}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-[#176B70]/30 border border-[#176B70] text-xs font-mono text-[#D8C4A5]">
              Demo Mode · Mock Records
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#B18A45] hover:bg-[#c29c54] text-[#101D32] text-xs font-bold uppercase tracking-wider transition-colors"
            >
              {tDict.admin.btnCloseConsole}
            </button>
          </div>
        </div>

        {/* Notice of Fictional Records */}
        <div className="p-4 bg-[#17263c] border border-[#B18A45]/40 text-xs text-[#D8C4A5] leading-relaxed flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-[#B18A45] shrink-0" />
            <span>
              {tDict.admin.demoNote}
            </span>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#B18A45]/20 overflow-x-auto pb-2 text-xs font-cinzel font-semibold uppercase tracking-wider">
          <button
            type="button"
            onClick={() => setActiveModule('overview')}
            className={`px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${
              activeModule === 'overview'
                ? 'border-[#B18A45] text-[#B18A45]'
                : 'border-transparent text-[#D8C4A5]/70 hover:text-white'
            }`}
          >
            {tDict.admin.tabOverview}
          </button>
          <button
            type="button"
            onClick={() => setActiveModule('darshan')}
            className={`px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${
              activeModule === 'darshan'
                ? 'border-[#B18A45] text-[#B18A45]'
                : 'border-transparent text-[#D8C4A5]/70 hover:text-white'
            }`}
          >
            {tDict.admin.tabDarshanSchedule}
          </button>
          <button
            type="button"
            onClick={() => setActiveModule('festivals')}
            className={`px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${
              activeModule === 'festivals'
                ? 'border-[#B18A45] text-[#B18A45]'
                : 'border-transparent text-[#D8C4A5]/70 hover:text-white'
            }`}
          >
            {tDict.admin.tabFestivals}
          </button>
          <button
            type="button"
            onClick={() => setActiveModule('seva')}
            className={`px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${
              activeModule === 'seva'
                ? 'border-[#B18A45] text-[#B18A45]'
                : 'border-transparent text-[#D8C4A5]/70 hover:text-white'
            }`}
          >
            {tDict.admin.tabSevaProposals}
          </button>
          <button
            type="button"
            onClick={() => setActiveModule('donations')}
            className={`px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${
              activeModule === 'donations'
                ? 'border-[#B18A45] text-[#B18A45]'
                : 'border-transparent text-[#D8C4A5]/70 hover:text-white'
            }`}
          >
            {tDict.admin.tabVolunteerApps}
          </button>
        </div>

        {/* Module Content */}
        {activeModule === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#17263c] border border-[#B18A45]/30 p-5">
                <span className="text-[11px] uppercase tracking-wider text-[#D8C4A5]/70">{tDict.admin.metricTodayVisitors}</span>
                <div className="font-cinzel text-3xl font-bold text-[#F7F3E9] mt-1 tabular-nums">24,580</div>
                <span className="text-xs text-[#176B70] font-medium mt-1 block">Pilgrims & Devotees (Estimate)</span>
              </div>

              <div className="bg-[#17263c] border border-[#B18A45]/30 p-5">
                <span className="text-[11px] uppercase tracking-wider text-[#D8C4A5]/70">{tDict.admin.metricMandirStatus}</span>
                <div className="font-cinzel text-2xl font-bold text-[#B18A45] mt-1">{tDict.admin.metricStatusOpen}</div>
                <span className="text-xs text-[#D8C4A5]/70 mt-1 block">Nitya Darshan Active</span>
              </div>

              <div className="bg-[#17263c] border border-[#B18A45]/30 p-5">
                <span className="text-[11px] uppercase tracking-wider text-[#D8C4A5]/70">{tDict.admin.metricProposedSevas}</span>
                <div className="font-cinzel text-3xl font-bold text-[#F7F3E9] mt-1 tabular-nums">48</div>
                <span className="text-xs text-[#176B70] mt-1 block">Demonstration Pledges</span>
              </div>

              <div className="bg-[#17263c] border border-[#B18A45]/30 p-5">
                <span className="text-[11px] uppercase tracking-wider text-[#D8C4A5]/70">{tDict.admin.metricVolunteerApplicants}</span>
                <div className="font-cinzel text-3xl font-bold text-[#D68B32] mt-1 tabular-nums">112</div>
                <span className="text-xs text-[#D8C4A5]/70 mt-1 block">Local Shirgaon & Virar Sevadals</span>
              </div>
            </div>

            {/* Live Announcements Management */}
            <div className="bg-[#17263c] border border-[#B18A45]/30 p-6">
              <h3 className="font-serif-royal text-xl font-bold text-[#F7F3E9] mb-2">
                Publish Today's Temple Notice / Announcement
              </h3>
              <p className="text-xs text-[#D8C4A5]/80 mb-4">
                Changes made here immediately update the visitor information strip on the public homepage.
              </p>
              <form onSubmit={handleSaveAnnouncement} className="space-y-4">
                <textarea
                  rows={3}
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  className="w-full bg-[#101D32] border border-[#B18A45]/40 p-3 text-sm text-[#F7F3E9] focus:outline-none focus:border-[#B18A45]"
                />
                <div className="flex items-center justify-between">
                  {announcementSaved && (
                    <span className="text-xs text-[#176B70] flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-4 h-4" />
                      Notice Updated Successfully!
                    </span>
                  )}
                  <button
                    type="submit"
                    className="ml-auto px-5 py-2 bg-[#B18A45] hover:bg-[#c29c54] text-[#101D32] text-xs font-bold uppercase tracking-wider"
                  >
                    {tDict.admin.btnSaveDemoChanges}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeModule === 'darshan' && (
          <div className="bg-[#17263c] border border-[#B18A45]/30 p-6">
            <h3 className="font-serif-royal text-2xl font-bold text-[#F7F3E9] mb-2">
              {tDict.admin.tabDarshanSchedule}
            </h3>
            <p className="text-xs text-[#D8C4A5]/80 mb-6">
              Adjust scheduled timings for summer/winter Brahma Muhurta or solar transitions.
            </p>

            <div className="space-y-4">
              {schedules.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#101D32] border border-[#B18A45]/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <span className="font-serif-royal font-bold text-lg text-[#F7F3E9] block">
                      {getAartiName(item)}
                    </span>
                    <span className="text-xs text-[#176B70] uppercase tracking-wider font-cinzel">
                      {item.category} Aarti
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="text-xs text-[#D8C4A5]/70">Time:</label>
                    <input
                      type="text"
                      value={item.time}
                      onChange={(e) => handleTimeChange(item.id, e.target.value)}
                      className="bg-[#17263c] border border-[#B18A45]/40 px-3 py-1.5 text-xs font-mono text-[#B18A45] w-28 focus:outline-none"
                    />
                    <span className="text-xs text-[#176B70] font-semibold">{tDict.admin.colStatus}: Verified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeModule === 'festivals' && (
          <div className="bg-[#17263c] border border-[#B18A45]/30 p-6">
            <h3 className="font-serif-royal text-2xl font-bold text-[#F7F3E9] mb-2">
              {tDict.admin.tabFestivals}
            </h3>
            <div className="space-y-4 mt-6">
              {FESTIVALS_DATA.map((fest) => (
                <div
                  key={fest.id}
                  className="bg-[#101D32] border border-[#B18A45]/20 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div>
                    <div className="text-xs text-[#B18A45] font-cinzel">{fest.month}</div>
                    <div className="font-serif-royal text-lg font-bold text-[#F7F3E9]">{getFestivalTitle(fest)}</div>
                    <div className="text-xs text-[#D8C4A5]/70">{fest.dateStr} · {fest.timeStr}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-[#176B70]/20 border border-[#176B70] text-[11px] text-[#176B70]">
                      Crowd Security Plan Ready
                    </span>
                    <button
                      type="button"
                      className="px-3 py-1 bg-white/10 hover:bg-white/20 text-xs text-white border border-[#D8C4A5]/30"
                    >
                      {tDict.admin.edit}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeModule === 'seva' && (
          <div className="bg-[#17263c] border border-[#B18A45]/30 p-6">
            <h3 className="font-serif-royal text-2xl font-bold text-[#F7F3E9] mb-2">
              Recent Seva Demonstration Enquiries (Sample Records)
            </h3>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#B18A45]/40 text-[#B18A45] font-cinzel">
                    <th className="py-3 px-4">Yajman Name</th>
                    <th className="py-3 px-4">Offering Type</th>
                    <th className="py-3 px-4">Target Date</th>
                    <th className="py-3 px-4">Proposed Dakshina</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#B18A45]/15 text-[#D8C4A5]">
                  <tr>
                    <td className="py-3 px-4 font-semibold text-white">Anil Joshi</td>
                    <td className="py-3 px-4">Birthday Devotional Seva</td>
                    <td className="py-3 px-4">18 Nov 2026</td>
                    <td className="py-3 px-4 font-mono">₹1,100</td>
                    <td className="py-3 px-4 text-[#176B70]">Demonstration Record</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-white">Sunita & Mahendra Shah</td>
                    <td className="py-3 px-4">Anniversary Kalyan Seva</td>
                    <td className="py-3 px-4">22 Nov 2026</td>
                    <td className="py-3 px-4 font-mono">₹2,100</td>
                    <td className="py-3 px-4 text-[#176B70]">Demonstration Record</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-white">Rajendra Patil (Virar)</td>
                    <td className="py-3 px-4">Mahaprasad & Anna Daan</td>
                    <td className="py-3 px-4">25 Nov 2026</td>
                    <td className="py-3 px-4 font-mono">₹5,100</td>
                    <td className="py-3 px-4 text-[#176B70]">Demonstration Record</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeModule === 'donations' && (
          <div className="bg-[#17263c] border border-[#B18A45]/30 p-6 space-y-6">
            <h3 className="font-serif-royal text-2xl font-bold text-[#F7F3E9]">
              Temple Trust Financial Governance & Audit Ledger
            </h3>
            <div className="p-4 bg-amber-950/40 border border-amber-600/50 text-xs text-amber-200">
              <strong>Statutory Compliance:</strong> In this concept demonstration, payment gateways are disabled. In full deployment, financial contributions must settle directly into the verified Temple Trust account with 80G tax receipt dispatch.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-[#101D32] border border-[#B18A45]/20">
                <span className="text-xs text-[#D8C4A5]/70 block">Annual Audit Status</span>
                <span className="font-cinzel text-lg font-bold text-[#176B70] mt-1 block">FY 2025-26 Compliant</span>
              </div>
              <div className="p-4 bg-[#101D32] border border-[#B18A45]/20">
                <span className="text-xs text-[#D8C4A5]/70 block">Registered Bank</span>
                <span className="font-cinzel text-lg font-bold text-white mt-1 block">Official Trust Account</span>
              </div>
              <div className="p-4 bg-[#101D32] border border-[#B18A45]/20">
                <span className="text-xs text-[#D8C4A5]/70 block">Gateway Integration</span>
                <span className="font-cinzel text-lg font-bold text-[#B18A45] mt-1 block">Disabled (Demonstration)</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
