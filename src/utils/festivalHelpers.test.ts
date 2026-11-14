import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { FESTIVALS_DATA, Language } from '../data/templeData';
import { EKADASHI_SCHEDULE, getLocalizedEkadashiView } from '../data/ekadashiData';
import {
  FESTIVAL_MOTIF_MAP,
  filterFestivalsByGroup,
  getCardStaggerDelay,
  getLocalizedFestivalView,
} from './festivalHelpers';

test('FESTIVALS_DATA includes all 9 chronological upcoming Krishna festivals (Dec 2026 - Oct 2027) in 4 languages', () => {
  assert.equal(FESTIVALS_DATA.length, 9, 'Should include exact 9 upcoming Krishna festivals');

  const expectedOrder = [
    'gita_jayanti',
    'holika_dahan',
    'holi',
    'jagannath_rath_yatra',
    'janmashtami',
    'radhashtami',
    'sharad_purnima',
    'narak_chaturdashi',
    'govardhan',
  ];
  assert.deepEqual(
    FESTIVALS_DATA.map((f) => f.id),
    expectedOrder,
    'Festivals should follow exact chronological order from Dec 2026 to Oct 2027'
  );

  const langs: Language[] = ['en', 'hi', 'mr', 'gu'];
  for (const fest of FESTIVALS_DATA) {
    assert.ok(FESTIVAL_MOTIF_MAP[fest.id], `Missing SVG motif mapping for ${fest.id}`);
    assert.ok(fest.dateStr.includes('2026') || fest.dateStr.includes('2027'), `Missing exact year in ${fest.id}`);

    for (const lang of langs) {
      const view = getLocalizedFestivalView(fest, lang);
      assert.ok(view.title.trim().length > 0, `Empty title for ${fest.id} in ${lang}`);
      assert.ok(view.description.trim().length > 0, `Empty description for ${fest.id} in ${lang}`);
      assert.ok(view.category.trim().length > 0, `Empty category for ${fest.id} in ${lang}`);
      assert.ok(view.month.trim().length > 0, `Empty month for ${fest.id} in ${lang}`);
      assert.ok(view.dateStr.trim().length > 0, `Empty date for ${fest.id} in ${lang}`);
      assert.ok(view.timeStr.trim().length > 0, `Empty timing for ${fest.id} in ${lang}`);
      assert.equal(view.highlights.length, 4, `Expected 4 schedule milestones for ${fest.id} in ${lang}`);
    }
  }
});

test('EKADASHI_SCHEDULE contains all 23 chronological Ekadashis (25 Nov 2026 - 18 Oct 2027) in 4 languages', () => {
  assert.equal(EKADASHI_SCHEDULE.length, 23, 'Should contain exact 23 Ekadashis');
  assert.equal(EKADASHI_SCHEDULE[0].titleEn, 'Utpanna Ekadashi');
  assert.equal(EKADASHI_SCHEDULE[0].dateEn, '25 Nov 2026');
  assert.equal(EKADASHI_SCHEDULE[0].weekdayEn, 'Wednesday');
  assert.equal(EKADASHI_SCHEDULE[22].titleEn, 'Rama Ekadashi');
  assert.equal(EKADASHI_SCHEDULE[22].dateEn, '18 Oct 2027');
  assert.equal(EKADASHI_SCHEDULE[22].weekdayEn, 'Monday');

  const langs: Language[] = ['en', 'hi', 'mr', 'gu'];
  EKADASHI_SCHEDULE.forEach((entry, idx) => {
    assert.equal(entry.number, idx + 1, `Serial number mismatch at index ${idx}`);
    for (const lang of langs) {
      const view = getLocalizedEkadashiView(entry, lang);
      assert.ok(view.title.trim().length > 0);
      assert.ok(view.date.trim().length > 0);
      assert.ok(view.weekday.trim().length > 0);
      assert.ok(view.paksha.trim().length > 0);
      assert.ok(view.deity.trim().length > 0);
      assert.ok(view.significance.trim().length > 0);
      assert.ok(view.benefit.trim().length > 0);
      assert.ok(view.observance.trim().length > 0);
    }
  });
});

test('filterFestivalsByGroup returns balanced 3-card subsets and preserves all 9 under "all"', () => {
  assert.equal(filterFestivalsByGroup(FESTIVALS_DATA, 'all').length, 9);
  assert.equal(filterFestivalsByGroup(FESTIVALS_DATA, 'wisdom').length, 3);
  assert.equal(filterFestivalsByGroup(FESTIVALS_DATA, 'appearance').length, 3);
  assert.equal(filterFestivalsByGroup(FESTIVALS_DATA, 'leela').length, 3);
});

test('getCardStaggerDelay respects reducedMotion and caps excessive delay', () => {
  assert.equal(getCardStaggerDelay(3, true), 0);
  assert.equal(getCardStaggerDelay(0, false), 0);
  assert.equal(getCardStaggerDelay(2, false), 0.1);
  assert.equal(getCardStaggerDelay(20, false), 0.3);
});

test('Every festival background image referenced in festivalArt.ts exists on disk as optimized WebP', () => {
  const artFile = readFileSync('src/components/festivalArt.ts', 'utf8');
  const matches = [...artFile.matchAll(/from\s+['"]\.\.\/assets\/images\/([^'"]+)['"]/g)];
  assert.equal(matches.length, 9, 'festivalArt.ts should import all 9 festival WebP artworks');

  for (const [, filename] of matches) {
    assert.ok(filename.endsWith('.webp'), `Expected optimized WebP asset, got ${filename}`);
    assert.ok(
      existsSync(`src/assets/images/${filename}`),
      `Missing festival image asset on disk: src/assets/images/${filename}`
    );
  }
});

test('HeroSection utility bar uses 20% opacity, Darshan & Seva headers are centered, and FestivalsSection uses All + Ekadashi tabs', () => {
  const heroSrc = readFileSync('src/components/HeroSection.tsx', 'utf8');
  assert.ok(heroSrc.includes('bg-[#160D08]/20'), 'Hero bottom operational strip should use 20% opacity');
  assert.ok(!heroSrc.includes('bg-[#160D08]/90'), 'Hero bottom strip should no longer use 90% opacity');

  const darshanSrc = readFileSync('src/components/DarshanSection.tsx', 'utf8');
  assert.ok(darshanSrc.includes('text-center max-w-4xl mx-auto'), 'DarshanSection header should be centered');
  assert.ok(darshanSrc.includes('PeacockFeather') && darshanSrc.includes('LotusOrnament'), 'DarshanSection should include temple motifs');

  const sevaSrc = readFileSync('src/components/SevaSection.tsx', 'utf8');
  assert.ok(sevaSrc.includes('text-center max-w-4xl mx-auto'), 'SevaSection header should be centered');
  assert.ok(sevaSrc.includes('PeacockFeather') && sevaSrc.includes('LotusOrnament'), 'SevaSection should include temple motifs');
  assert.ok(sevaSrc.includes('motion.div'), 'SevaSection header should use scroll animation');
  assert.ok(!sevaSrc.includes('btnSelect') && !sevaSrc.includes('Select Seva'), 'SevaSection must remove Select Seva');
  assert.ok(
    sevaSrc.includes('href="#donation"') && sevaSrc.includes('btnContributionPortal'),
    'SevaSection must redirect directly to Official Contribution Portal (#donation)'
  );

  const festSrc = readFileSync('src/components/FestivalsSection.tsx', 'utf8');
  assert.ok(festSrc.includes('filterAll') && festSrc.includes('filterEkadashi'), 'FestivalsSection should offer All Krishna Utsavs and Ekadashi tabs');
  assert.ok(!festSrc.includes('filterWisdom') && !festSrc.includes('filterAppearance') && !festSrc.includes('filterLeela'), 'Removed old sub-category filter tabs');
  assert.ok(festSrc.includes('EkadashiScrollModal'), 'FestivalsSection should mount EkadashiScrollModal');

  const ekModalSrc = readFileSync('src/components/EkadashiScrollModal.tsx', 'utf8');
  assert.ok(
    ekModalSrc.includes('tithiLabel') && ekModalSrc.includes('dateLabel') && ekModalSrc.includes('dayLabel'),
    'EkadashiScrollModal must explicitly label Tithi, Date, and Day'
  );

  assert.ok(
    heroSrc.includes('mobile-hero-compact-overlay') && heroSrc.includes('min-h-[54svh]'),
    'HeroSection mobile opening page should keep upper temple image open and display ultra-compact bottom info'
  );

  const enSrc = readFileSync('src/i18n/en.ts', 'utf8');
  assert.ok(
    enSrc.includes("planYourVisit: 'Way to Mandir'") && enSrc.includes("btnPlanVisit: 'Way to Mandir'"),
    'English dictionary should use Way to Mandir instead of Plan Your Visit'
  );
  const navSrc = readFileSync('src/components/Navbar.tsx', 'utf8');
  assert.ok(navSrc.includes("labelEn: 'Way to Mandir'"), 'Navbar location link should say Way to Mandir');
});
