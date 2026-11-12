/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useI18n } from './i18n/I18nContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DevotionalPresenceSection } from './components/DevotionalPresenceSection';
import { VisionarySection } from './components/VisionarySection';
import { DarshanSection } from './components/DarshanSection';
import { TempleLocationSection } from './components/TempleLocationSection';
import { FestivalsSection } from './components/FestivalsSection';
import { SevaSection } from './components/SevaSection';
import { TempleDonationSection } from './components/TempleDonationSection';
import { TempleSocialConnectSection } from './components/TempleSocialConnectSection';
import { PlannerModal } from './components/PlannerModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { SacredAmbientBackground } from './components/SacredAmbientBackground';

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
          // Sort by highest intersection ratio or closest to top
          visibleEntries.sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
          setActiveTab(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-90px 0px -50% 0px',
        threshold: [0.1, 0.3, 0.6],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
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
      <AdminDashboard
        language={language}
        onClose={() => setAdminOpen(false)}
      />
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
        {/* 1. Full-Screen Architectural Hero & Visitor-Information Strip */}
        <HeroSection
          language={language}
          onExplore={handleTabChange}
          onOpenPlanner={() => setPlannerOpen(true)}
          onOpenSevaModal={handleOpenSeva}
          reducedMotion={reducedMotion}
        />

        {/* 2. In the Presence of Shri Dwarkadhish — Devotional Imagery & Sacred Shloka */}
        <DevotionalPresenceSection reducedMotion={reducedMotion} />

        {/* 3. The Vision Behind Shree Dwarkadhish Dham — Smt. Pravina H. Thakur */}
        <VisionarySection language={language} reducedMotion={reducedMotion} />

        {/* 4. Darshan & Aarti Schedule */}
        <DarshanSection language={language} />

        {/* 5. Visit Shri Dwarkadhish Mandir — Google Maps & Practical Location */}
        <TempleLocationSection language={language} />

        {/* 6. Festivals & Annual Celebrations */}
        <FestivalsSection language={language} />

        {/* 7. Devotional Seva Offerings */}
        <SevaSection language={language} />

        {/* 8. Devotional Contributions / Donation Preview */}
        <TempleDonationSection language={language} reducedMotion={reducedMotion} />

        {/* 9. Official Temple Social Connect & Verified QR Portals */}
        <TempleSocialConnectSection reducedMotion={reducedMotion} />
      </main>

      {/* Interactive Pilgrimage Planner Modal */}
      <PlannerModal
        language={language}
        isOpen={plannerOpen}
        onClose={() => setPlannerOpen(false)}
      />

      {/* Footer */}
      <Footer
        language={language}
        onNavigate={handleTabChange}
        onOpenPlanner={() => setPlannerOpen(true)}
      />
    </div>
  );
}


