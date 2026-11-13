import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('Mobile Hero Image Visibility: enlarged viewport height and responsive desktop/mobile gating', () => {
  const heroCode = fs.readFileSync('src/components/HeroSection.tsx', 'utf-8');
  assert.ok(
    heroCode.includes('h-[50svh] min-h-[320px]'),
    'Mobile hero image showcase must use generous h-[50svh] min-h-[320px] sizing so the temple facade is clearly visible'
  );
  assert.ok(
    heroCode.includes('matchMedia'),
    'HeroSection must mount only the active responsive branch via matchMedia to prevent duplicate particle & bell loops'
  );
  assert.ok(
    heroCode.includes('React.memo'),
    'HeroSection must be memoized with React.memo'
  );
});

test('Vercel SPA Stability: cache headers, SPA rewrites, ErrorBoundary, and lazyWithRetry chunk resilience', () => {
  const vercelPath = path.join(process.cwd(), 'vercel.json');
  assert.ok(fs.existsSync(vercelPath), 'vercel.json must exist for SPA routing and cache headers');
  const vercelConfig = JSON.parse(fs.readFileSync(vercelPath, 'utf-8'));

  assert.ok(Array.isArray(vercelConfig.headers), 'vercel.json must define cache headers');
  const htmlHeader = vercelConfig.headers.find((h: { source: string }) => h.source === '/index.html');
  assert.ok(htmlHeader, 'vercel.json must configure Cache-Control for /index.html');
  assert.ok(
    htmlHeader.headers.some(
      (kv: { key: string; value: string }) =>
        kv.key === 'Cache-Control' && kv.value.includes('must-revalidate')
    ),
    '/index.html must use must-revalidate to prevent stale HTML/chunk mismatches after Vercel deployments'
  );

  const assetsHeader = vercelConfig.headers.find((h: { source: string }) => h.source === '/assets/(.*)');
  assert.ok(assetsHeader, 'vercel.json must configure long-lived immutable cache headers for /assets/*');

  const errorBoundaryPath = path.join(process.cwd(), 'src/components/ErrorBoundary.tsx');
  assert.ok(fs.existsSync(errorBoundaryPath), 'ErrorBoundary.tsx must exist');

  const mainCode = fs.readFileSync('src/main.tsx', 'utf-8');
  assert.ok(mainCode.includes('<ErrorBoundary>'), 'main.tsx must wrap the app in <ErrorBoundary>');

  const appCode = fs.readFileSync('src/App.tsx', 'utf-8');
  assert.ok(appCode.includes('function lazyWithRetry'), 'App.tsx must implement lazyWithRetry for dynamic imports');
  assert.ok(appCode.includes('requestIdleCallback'), 'App.tsx must preload nearby section chunks on browser idle');
});

test('CPU/GPU & Loop Optimization: zero 60fps bell setState and viewport/visibility gating', () => {
  const bellCode = fs.readFileSync('src/components/TempleBell.tsx', 'utf-8');
  assert.strictEqual(bellCode.includes('setAngle('), false, 'TempleBell must not trigger 60fps React setAngle re-renders');
  assert.ok(bellCode.includes('visibilitychange'), 'TempleBell must pause RAF when tab is hidden');

  const heroBellsCode = fs.readFileSync('src/components/HeroBellAtmosphere.tsx', 'utf-8');
  assert.ok(heroBellsCode.includes('visibilitychange'), 'HeroBellAtmosphere must pause RAF when tab is hidden');
  assert.ok(heroBellsCode.includes('IntersectionObserver'), 'HeroBellAtmosphere must gate physics behind IntersectionObserver');

  const donationAtmosCode = fs.readFileSync('src/components/DonationSacredAtmosphere.tsx', 'utf-8');
  assert.ok(donationAtmosCode.includes('visibilitychange'), 'DonationSacredAtmosphere must pause RAF when tab is hidden');
  assert.ok(donationAtmosCode.includes('animationPlayState'), 'DonationSacredAtmosphere must pause CSS spin off-screen');

  const goldenCode = fs.readFileSync('src/components/GoldenParticles.tsx', 'utf-8');
  assert.ok(goldenCode.includes('visibilitychange'), 'GoldenParticles must pause canvas RAF when tab is hidden');

  const chakraCode = fs.readFileSync('src/components/SectionBackgroundChakra.tsx', 'utf-8');
  assert.ok(chakraCode.includes('IntersectionObserver'), 'SectionBackgroundChakra must pause spin off-screen');

  const presenceCode = fs.readFileSync('src/components/DevotionalPresenceSection.tsx', 'utf-8');
  assert.ok(presenceCode.includes('Math.round(latest'), 'DevotionalPresenceSection must quantize scroll progress updates');
});

test('Compressed WebP Companions & Non-blocking Fonts', () => {
  for (const webpRel of [
    'public/assets/temple_bell.webp',
    'public/assets/aistudio/Vibrant_Temple_Ceremony_Portrait_8e2d2892.webp',
    'public/assets/aistudio/Ornate_Umbrella_Ceremony_in_the_Courtyard_bb340f83.webp',
    'public/assets/aistudio/Ornate_Temple_Procession_with_Red_Parasol_6d479e42.webp',
  ]) {
    const absPath = path.join(process.cwd(), webpRel);
    assert.ok(fs.existsSync(absPath), `${webpRel} must exist`);
    const stat = fs.statSync(absPath);
    assert.ok(stat.size > 1000 && stat.size < 600_000, `${webpRel} should be compact (<600KB), got ${stat.size}B`);
  }

  const visionHeroCode = fs.readFileSync('src/components/vision/PravinaVisionHero.tsx', 'utf-8');
  assert.ok(visionHeroCode.includes('<picture'), 'PravinaVisionHero must serve compact WebP companions via <picture>');
  assert.ok(
    visionHeroCode.includes('Vibrant_Temple_Ceremony_Portrait_8e2d2892.webp'),
    'PravinaVisionHero must reference compressed WebP companions'
  );

  const indexHtml = fs.readFileSync('index.html', 'utf-8');
  assert.ok(indexHtml.includes('media="print"'), 'index.html must load Google Fonts non-blocking');
});
