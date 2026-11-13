/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useI18n } from './i18n/I18nContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SacredAmbientBackground } from './components/SacredAmbientBackground';

// Code-split below-the-fold sections & modals so above-the-fold Hero renders immediately
const DevotionalPresenceSection = lazy(() =>
  import('./components/DevotionalPresenceSection').then((m) => ({
    default: m.DevotionalPresenceSection,
  }))
);
const VisionarySection = lazy(() =>
  import('./components/VisionarySection').then((m) => ({
    default: m.VisionarySection,
  }))
);
const DarshanSection = lazy(() =>
  import('./components/DarshanSection').then((m) => ({
    default: m.DarshanSection,
  }))
);
const TempleLocationSection = lazy(() =>
  import('./components/TempleLocationSection').then((m) => ({
    default: m.TempleLocationSection,
  }))
);
const FestivalsSection = lazy(() =>
  import('./components/FestivalsSection').then((m) => ({
    default: m.FestivalsSection,
  }))
);
const SevaSection = lazy(() =>
  import('./components/SevaSection').then((m) => ({
    default: m.SevaSection,
  }))
);
const TempleDonationSection = lazy(() =>
  import('./components/TempleDonationSection').then((m) => ({
    default: m.TempleDonationSection,
  }))
);
const TempleSocialConnectSection = lazy(() =>
  import('./components/TempleSocialConnectSection').then((m) => ({
    default: m.TempleSocialConnectSection,
  }))
);
const PlannerModal = lazy(() =>
  import('./components/PlannerModal').then((m) => ({
    default: m.PlannerModal,
  }))
);
const AdminDashboard = lazy(() =>
  import('./components/AdminDashboard').then((m) => ({
    default: m.AdminDashboard,
  }))
);
const Footer = lazy(() =>
  import('./components/Footer').then((m) => ({
    default: m.Footer,
  }))
);

const SectionPlaceholder: React.FC<{ id: string }> = ({ id }) => (
  <section id={id} aria-hidden="true" className="min-h-[320px] w-full bg-[#FBF6ED]" />
);

export default function App() {
  const { language, setLanguage } = useI18n();
  const [activeTab, setActiveTab] = useState('overview');
  const [plannerOpen, setPlannerOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check system prefers-reduced-motion on initial mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReducedMotion(true);
    }
  }, []);

  // Accurate active-section scroll spy accounting for sticky header
  useEffect(() => {
    if (adminOpen || typeof window === 'undefined') return;

    const sectionIds = [
      'overview',
      'presence',
      'vision',
      'darshan',
      'location',
      'festivals',
      'seva',
      'donation',
      'social',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          visibleEntries.sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
          setActiveTab(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-90px 0px -50% 0px',
        threshold: [0.1, 0.3, 0.6],
      }
    );

    const observeAll = () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    };

    observeAll();
    const timer = window.setTimeout(observeAll, 600);

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [adminOpen]);

  const handleTabChange = (tabId: string) => {
    if (tabId === 'admin') {
      setAdminOpen(true);
      return;
    }
    setActiveTab(tabId);
    setAdminOpen(false);

    if (tabId === 'overview') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const el = document.getElementById(tabId);
    if (el) {
      const headerOffset = 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleOpenSeva = () => {
    handleTabChange('seva');
  };

  if (adminOpen) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#FBF6ED]" />}>
        <AdminDashboard language={language} onClose={() => setAdminOpen(false)} />
      </Suspense>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col bg-[#FBF6ED] text-[#3C2A20] relative ${reducedMotion ? 'motion-reduce' : ''}`}>
      {/* Site-Wide Subtle Sacred Ambient Background Animation */}
      <SacredAmbientBackground reducedMotion={reducedMotion} />

      {/* Top Navigation */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onOpenPlanner={() => setPlannerOpen(true)}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion(!reducedMotion)}
      />

      <main className="flex-1">
        {/* 1. First-Page Fit Architectural Hero & Operational Utility Strip */}
        <HeroSection
          language={language}
          onExplore={handleTabChange}
          onOpenPlanner={() => setPlannerOpen(true)}
          onOpenSevaModal={handleOpenSeva}
          reducedMotion={reducedMotion}
        />

        {/* 2. In the Presence of Shri Dwarkadhish */}
        <Suspense fallback={<SectionPlaceholder id="presence" />}>
          <DevotionalPresenceSection reducedMotion={reducedMotion} />
        </Suspense>

        {/* 3. The Vision Behind Shree Dwarkadhish Dham */}
        <Suspense fallback={<SectionPlaceholder id="vision" />}>
          <VisionarySection language={language} reducedMotion={reducedMotion} />
        </Suspense>

        {/* 4. Darshan & Aarti Schedule */}
        <Suspense fallback={<SectionPlaceholder id="darshan" />}>
          <DarshanSection language={language} />
        </Suspense>

        {/* 5. Plan Your Visit — Google Maps & Practical Location */}
        <Suspense fallback={<SectionPlaceholder id="location" />}>
          <TempleLocationSection language={language} />
        </Suspense>

        {/* 6. Festivals & Annual Celebrations */}
        <Suspense fallback={<SectionPlaceholder id="festivals" />}>
          <FestivalsSection language={language} />
        </Suspense>

        {/* 7. Devotional Seva Offerings */}
        <Suspense fallback={<SectionPlaceholder id="seva" />}>
          <SevaSection language={language} />
        </Suspense>

        {/* 8. Official Contribution Portal */}
        <Suspense fallback={<SectionPlaceholder id="donation" />}>
          <TempleDonationSection language={language} reducedMotion={reducedMotion} />
        </Suspense>

        {/* 9. Official Temple Social Connect */}
        <Suspense fallback={<SectionPlaceholder id="social" />}>
          <TempleSocialConnectSection reducedMotion={reducedMotion} />
        </Suspense>
      </main>

      {/* Interactive Pilgrimage Planner Modal (loaded on demand when opened) */}
      {plannerOpen && (
        <Suspense fallback={null}>
          <PlannerModal
            language={language}
            isOpen={plannerOpen}
            onClose={() => setPlannerOpen(false)}
          />
        </Suspense>
      )}

      {/* Footer */}
      <Suspense fallback={null}>
        <Footer
          language={language}
          onNavigate={handleTabChange}
          onOpenPlanner={() => setPlannerOpen(true)}
        />
      </Suspense>
    </div>
  );
}
