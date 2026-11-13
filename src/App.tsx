/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, lazy, useCallback } from 'react';
import { useI18n } from './i18n/I18nContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SacredAmbientBackground } from './components/SacredAmbientBackground';

/**
 * Retries transient dynamic import failures (e.g., mobile network drops or edge cache rollover
 * on Vercel) before surfacing cleanly to the ErrorBoundary instead of crashing or auto-reloading.
 */
function lazyWithRetry<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  retries = 2,
  delayMs = 400
) {
  return lazy(async () => {
    let lastError: unknown;
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await factory();
      } catch (err) {
        lastError = err;
        if (attempt < retries) {
          await new Promise((res) => window.setTimeout(res, delayMs * (attempt + 1)));
        }
      }
    }
    throw lastError;
  });
}

// Code-split below-the-fold sections & modals so above-the-fold Hero renders immediately
const DevotionalPresenceSection = lazyWithRetry(() =>
  import('./components/DevotionalPresenceSection').then((m) => ({
    default: m.DevotionalPresenceSection,
  }))
);
const VisionarySection = lazyWithRetry(() =>
  import('./components/VisionarySection').then((m) => ({
    default: m.VisionarySection,
  }))
);
const TempleGallerySection = lazyWithRetry(() =>
  import('./components/TempleGallerySection').then((m) => ({
    default: m.TempleGallerySection,
  }))
);
const DarshanSection = lazyWithRetry(() =>
  import('./components/DarshanSection').then((m) => ({
    default: m.DarshanSection,
  }))
);
const TempleLocationSection = lazyWithRetry(() =>
  import('./components/TempleLocationSection').then((m) => ({
    default: m.TempleLocationSection,
  }))
);
const FestivalsSection = lazyWithRetry(() =>
  import('./components/FestivalsSection').then((m) => ({
    default: m.FestivalsSection,
  }))
);
const SevaSection = lazyWithRetry(() =>
  import('./components/SevaSection').then((m) => ({
    default: m.SevaSection,
  }))
);
const TempleDonationSection = lazyWithRetry(() =>
  import('./components/TempleDonationSection').then((m) => ({
    default: m.TempleDonationSection,
  }))
);
const TempleSocialConnectSection = lazyWithRetry(() =>
  import('./components/TempleSocialConnectSection').then((m) => ({
    default: m.TempleSocialConnectSection,
  }))
);
const PlannerModal = lazyWithRetry(() =>
  import('./components/PlannerModal').then((m) => ({
    default: m.PlannerModal,
  }))
);
const AdminDashboard = lazyWithRetry(() =>
  import('./components/AdminDashboard').then((m) => ({
    default: m.AdminDashboard,
  }))
);
const Footer = lazyWithRetry(() =>
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
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // Sync system prefers-reduced-motion changes dynamically
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  // Warm below-the-fold JS chunks during browser idle time for zero-jank scrolling
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const preloadNearbySections = () => {
      import('./components/DevotionalPresenceSection').catch(() => {});
      import('./components/VisionarySection').catch(() => {});
      import('./components/TempleGallerySection').catch(() => {});
      import('./components/DarshanSection').catch(() => {});
      import('./components/TempleLocationSection').catch(() => {});
    };

    const win = window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (typeof win.requestIdleCallback === 'function') {
      const idleId = win.requestIdleCallback(preloadNearbySections, { timeout: 1800 });
      return () => {
        if (typeof win.cancelIdleCallback === 'function') {
          win.cancelIdleCallback(idleId);
        }
      };
    }

    const timerId = window.setTimeout(preloadNearbySections, 1200);
    return () => window.clearTimeout(timerId);
  }, []);

  // Accurate active-section scroll spy accounting for sticky header
  useEffect(() => {
    if (adminOpen || typeof window === 'undefined') return;

    const sectionIds = [
      'overview',
      'presence',
      'vision',
      'gallery',
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
          const nextId = visibleEntries[0].target.id;
          setActiveTab((prev) => (prev === nextId ? prev : nextId));
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

  const handleTabChange = useCallback((tabId: string) => {
    if (tabId === 'admin') {
      setAdminOpen(true);
      return;
    }
    setActiveTab((prev) => (prev === tabId ? prev : tabId));
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
  }, []);

  const handleOpenSeva = useCallback(() => {
    handleTabChange('seva');
  }, [handleTabChange]);

  const handleOpenPlanner = useCallback(() => {
    setPlannerOpen(true);
  }, []);

  const handleToggleReducedMotion = useCallback(() => {
    setReducedMotion((prev) => !prev);
  }, []);

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
        onOpenPlanner={handleOpenPlanner}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={handleToggleReducedMotion}
      />

      <main className="flex-1">
        {/* 1. First-Page Fit Architectural Hero & Operational Utility Strip */}
        <HeroSection
          language={language}
          onExplore={handleTabChange}
          onOpenPlanner={handleOpenPlanner}
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

        {/* 4. Temple Gallery — Sacred Moments & Consecration Seva */}
        <Suspense fallback={<SectionPlaceholder id="gallery" />}>
          <TempleGallerySection language={language} reducedMotion={reducedMotion} />
        </Suspense>

        {/* 5. Darshan & Aarti Schedule */}
        <Suspense fallback={<SectionPlaceholder id="darshan" />}>
          <DarshanSection language={language} reducedMotion={reducedMotion} />
        </Suspense>

        {/* 6. Plan Your Visit — Google Maps & Practical Location */}
        <Suspense fallback={<SectionPlaceholder id="location" />}>
          <TempleLocationSection language={language} reducedMotion={reducedMotion} />
        </Suspense>

        {/* 7. Festivals & Annual Celebrations */}
        <Suspense fallback={<SectionPlaceholder id="festivals" />}>
          <FestivalsSection language={language} reducedMotion={reducedMotion} />
        </Suspense>

        {/* 8. Devotional Seva Offerings */}
        <Suspense fallback={<SectionPlaceholder id="seva" />}>
          <SevaSection
            language={language}
            reducedMotion={reducedMotion}
            onRedirectToPortal={() => handleTabChange('donation')}
          />
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
          onOpenPlanner={handleOpenPlanner}
          reducedMotion={reducedMotion}
        />
      </Suspense>
    </div>
  );
}
