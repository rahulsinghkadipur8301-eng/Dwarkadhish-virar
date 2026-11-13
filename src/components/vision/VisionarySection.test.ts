import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { VOLUNTEER_ROLES, PATRON_SUPPORT_TIERS } from '../../data/templeData.js';

test('Visionary Section Redesign: Primary portrait asset matches supplied transparent cutout', () => {
  const assets = {
    primaryPortrait: 'pravina_thakur_cutout.png',
    templeShikhara: 'dwarkadhish_temple_widescreen_4k.webp',
    supportingPhoto1: 'Praveena Thakur Before the Dwarkadhish Idol(1).png',
    supportingPhoto2: 'Praveena_Thakur_Devotional_Ceremony_4K_Restored(2).png',
    eventPhoto: 'Vibrant Temple Ceremony Portrait(1).png',
    donationQr: 'temple_donation_qr.png',
  };

  assert.strictEqual(assets.primaryPortrait, 'pravina_thakur_cutout.png');
  assert.strictEqual(assets.templeShikhara, 'dwarkadhish_temple_widescreen_4k.webp');
  assert.strictEqual(assets.supportingPhoto1, 'Praveena Thakur Before the Dwarkadhish Idol(1).png');
  assert.strictEqual(assets.supportingPhoto2, 'Praveena_Thakur_Devotional_Ceremony_4K_Restored(2).png');
  assert.strictEqual(assets.eventPhoto, 'Vibrant Temple Ceremony Portrait(1).png');
  assert.strictEqual(assets.donationQr, 'temple_donation_qr.png');

  // Verify file existence in public directory
  assert.ok(fs.existsSync(path.join(process.cwd(), 'public', assets.primaryPortrait)));
  assert.ok(fs.existsSync(path.join(process.cwd(), 'public', assets.templeShikhara)));
  assert.ok(fs.existsSync(path.join(process.cwd(), 'public', assets.donationQr)));
});

test('Visionary Section Redesign: Centered Royal Heading and Concise Subtitle with Woven Trust Affiliation', () => {
  const heroCode = fs.readFileSync('src/components/vision/PravinaVisionHero.tsx', 'utf-8');
  assert.ok(heroCode.includes("subtitle: 'Former Mayor of Vasai–Virar'"), 'PravinaVisionHero must use concise subtitle Former Mayor of Vasai–Virar in English');
  assert.ok(heroCode.includes('Late Shri Vishnu Waman Thakur Charitable Trust'), 'Trust affiliation must be woven into biography');
});

test('Visionary Section Redesign: Three Historical Highlights structure', () => {
  const highlights = [
    { title: 'Public Service', subtitle: 'Former Mayor of Vasai–Virar' },
    { title: 'Sacred Vision', subtitle: 'Shri Dwarkadhish Mandir' },
    { title: 'Documented Milestone', subtitle: 'November 2025 Pran Pratishtha' },
  ];

  assert.strictEqual(highlights.length, 3);
  assert.strictEqual(highlights[0].title, 'Public Service');
  assert.strictEqual(highlights[1].title, 'Sacred Vision');
  assert.strictEqual(highlights[2].title, 'Documented Milestone');
});

test('Removal of Standalone Consecration and Volunteer Seva from App, Navbar and Footer', () => {
  const appCode = fs.readFileSync('src/App.tsx', 'utf-8');
  assert.strictEqual(appCode.includes('<TempleConsecrationSection'), false, 'TempleConsecrationSection must not be mounted in App.tsx');
  assert.strictEqual(appCode.includes('<VolunteerHelpingSection'), false, 'VolunteerHelpingSection must not be mounted in App.tsx');

  const navCode = fs.readFileSync('src/components/Navbar.tsx', 'utf-8');
  assert.strictEqual(navCode.includes("id: 'consecration'"), false, 'consecration must not be in navItems');
  assert.strictEqual(navCode.includes("id: 'community'"), false, 'community must not be in navItems');
  assert.strictEqual(navCode.includes('INDEPENDENT CONCEPT DEMONSTRATION'), false, 'Top banner must be removed');
  assert.strictEqual(navCode.includes('Animation: Active'), false, 'Animation status badge must be removed');

  const footerCode = fs.readFileSync('src/components/Footer.tsx', 'utf-8');
  assert.strictEqual(footerCode.includes('#consecration'), false, 'Footer must not link to #consecration');
  assert.strictEqual(footerCode.includes('#community'), false, 'Footer must not link to #community');
});

test('Official Contribution Portal Star Section in TempleDonationSection', () => {
  const donationCode = fs.readFileSync('src/components/TempleDonationSection.tsx', 'utf-8');
  assert.ok(donationCode.includes('dwarkadhish_poster_clean_qr_blended.webp'), 'Must display the clean blended QR donation poster');
  assert.ok(donationCode.includes('॥ श्री द्वारकाधीशाय नमः ॥'), 'Must feature elevated spiritual Sanskrit mantra crest heading');
  assert.ok(donationCode.includes('calculateCardTiltAndLight'), 'Must include subtle 3D pointer-reactive card motion');
  assert.ok(donationCode.includes('DonationSacredAtmosphere'), 'Must mount full motion-graphics & hanging bell atmosphere');

  // Verify removal of unnecessary text, redundant VPA boxes, poster toggles, chronicle gallery, and seva cards
  assert.strictEqual(donationCode.includes('Official UPI VPA'), false, 'Unnecessary Official UPI VPA label must be removed');
  assert.strictEqual(donationCode.includes('dwarkadhish.shirgaon@upi'), false, 'Old redundant UPI VPA text must be removed');
  assert.strictEqual(donationCode.includes('Copy UPI ID'), false, 'Redundant Copy UPI ID button must be removed');
  assert.strictEqual(donationCode.includes('Security Notice'), false, 'Unnecessary Security Notice text must be removed');
  assert.strictEqual(donationCode.includes('Ornate Seva Poster'), false, 'Old poster tab toggle must be removed');
  assert.strictEqual(donationCode.includes('Monochrome QR Code'), false, 'Old QR tab toggle must be removed');
  assert.strictEqual(donationCode.includes('Download Official Poster'), false, 'Download clutter button must be removed');
  assert.strictEqual(donationCode.includes('Sacred Darshan & Devotional Seva Chronicle'), false, 'Chronicle gallery must be removed');
  assert.strictEqual(donationCode.includes('How Your Sacred Contribution Sustains the Sanctuary'), false, 'Four seva cards block must be removed');
  assert.strictEqual(donationCode.includes('Devotional Seva & Temple Upkeep'), false, 'Old left block heading must be removed');
  assert.strictEqual(donationCode.includes('Receiving Entity'), false, 'Old Receiving Entity card must be removed');
  assert.strictEqual(donationCode.includes('Presentation Preview:'), false, 'Old Presentation Preview notice must be removed');
});

test('Underlying Data Preserved in templeData.ts', () => {
  assert.strictEqual(VOLUNTEER_ROLES.length, 3);
  assert.strictEqual(VOLUNTEER_ROLES[0].id, 'utsav_care');
  assert.strictEqual(VOLUNTEER_ROLES[1].id, 'annadan_service');
  assert.strictEqual(VOLUNTEER_ROLES[2].id, 'pushpa_rangoli');

  assert.strictEqual(PATRON_SUPPORT_TIERS.length, 2);
  assert.strictEqual(PATRON_SUPPORT_TIERS[0].id, 'deepam_patron');
  assert.strictEqual(PATRON_SUPPORT_TIERS[1].id, 'cleanliness_patron');
});

test('Blended Donation Poster Asset, Google Maps Directions & Build Size Discipline', () => {
  const bannerPath = path.resolve('public/dwarkadhish_poster_clean_qr_blended.webp');
  assert.ok(fs.existsSync(bannerPath), 'public/dwarkadhish_poster_clean_qr_blended.webp must exist');

  const bannerStats = fs.statSync(bannerPath);
  assert.ok(bannerStats.size > 100000 && bannerStats.size < 2000000, 'WebP donation poster must be crisp (>100KB) and compact (<2MB)');

  const donationSectionCode = fs.readFileSync('src/components/TempleDonationSection.tsx', 'utf-8');
  assert.ok(donationSectionCode.includes('dwarkadhish_poster_clean_qr_blended.webp'), 'TempleDonationSection must reference dwarkadhish_poster_clean_qr_blended.webp');

  const locationCode = fs.readFileSync('src/components/TempleLocationSection.tsx', 'utf-8');
  assert.ok(locationCode.includes('getGoogleMapsDirectionsUrl'), 'TempleLocationSection must expose Google Maps directions URL');
  assert.ok(locationCode.includes('directionsUrl'), 'TempleLocationSection must render direct Google Maps directions links');
  assert.ok(locationCode.includes('busTitle') && locationCode.includes('commuteMetricFreq'), 'TempleLocationSection must display dedicated VVMT bus service & easy commute info');

  const visionHeroCode = fs.readFileSync('src/components/vision/PravinaVisionHero.tsx', 'utf-8');
  assert.ok(visionHeroCode.includes('golden_hour_namaste.webp'), 'Vision section must showcase golden_hour_namaste.webp as the first image');
  assert.ok(visionHeroCode.includes('Vibrant_Temple_Ceremony_Portrait_8e2d2892.png'), 'Vision section must include uploaded Vibrant_Temple_Ceremony_Portrait_8e2d2892.png');
  assert.ok(visionHeroCode.includes('Ornate_Umbrella_Ceremony_in_the_Courtyard_bb340f83.png'), 'Vision section must include uploaded Ornate_Umbrella_Ceremony_in_the_Courtyard_bb340f83.png');
  assert.ok(visionHeroCode.includes('Ornate_Temple_Procession_with_Red_Parasol_6d479e42.png'), 'Vision section must include uploaded Ornate_Temple_Procession_with_Red_Parasol_6d479e42.png');
  assert.strictEqual(visionHeroCode.includes('Sacred Moments & Consecration Seva'), false, 'Moved gallery block must not be duplicated inside PravinaVisionHero.tsx');
  assert.strictEqual(visionHeroCode.includes('{c.ceremonyCaption}'), false, 'Image cards must not render subtitle captions');
  assert.strictEqual(visionHeroCode.includes('{c.goldenCaption}'), false, 'Golden hour card must not render subtitle caption');
  assert.strictEqual(visionHeroCode.includes('object-cover'), false, 'Vision section must strictly avoid object-cover to guarantee zero face or detail cropping');

  for (const file of [
    'Vibrant_Temple_Ceremony_Portrait_8e2d2892.png',
    'Ornate_Umbrella_Ceremony_in_the_Courtyard_bb340f83.png',
    'Ornate_Temple_Procession_with_Red_Parasol_6d479e42.png',
    'dwarikadish_favicon_1c574a57.png',
  ]) {
    assert.ok(fs.existsSync(path.join(process.cwd(), 'public/assets/aistudio', file)), `Missing ${file} in public/assets/aistudio`);
  }

  const indexHtml = fs.readFileSync('index.html', 'utf-8');
  assert.ok(indexHtml.includes('dwarikadish_favicon_1c574a57.png'), 'index.html must link the uploaded Dwarkadhish favicon');

  const plannerCode = fs.readFileSync('src/components/PlannerModal.tsx', 'utf-8');
  assert.ok(plannerCode.includes('getGoogleMapsDirectionsUrl'), 'PlannerModal must provide Google Maps directions URL');
});

test('Dedicated TempleGallerySection & SectionBackgroundChakra across every section except main homepage', () => {
  const galleryCode = fs.readFileSync('src/components/TempleGallerySection.tsx', 'utf-8');
  assert.ok(galleryCode.includes('id="gallery"'), 'TempleGallerySection must define id="gallery"');
  assert.ok(galleryCode.includes('Sacred Moments & Consecration Seva'), 'Must include heading Sacred Moments & Consecration Seva');
  assert.ok(
    galleryCode.includes('Full uncropped devotional photographs — click any portrait to inspect at full clarity'),
    'Must include subheading for uncropped devotional portraits'
  );

  for (const expectedText of [
    'Offering Before the Deity',
    'Sanctum Darshan',
    'Consecration Abhishekam',
    'Vedic Abhishekam',
    'Dressed Dwarkadhish in Temple Splendour',
    'Dwarkadhish Splendour',
    'Humble Charan Seva',
    'Charan Seva',
    '/assets/praveena_thakur/before_idol.webp',
    '/assets/praveena_thakur/devotional_ceremony.webp',
    '/assets/praveena_thakur/dressed_dwarkadhish_splendour.webp',
    '/assets/praveena_thakur/charan_seva.webp',
  ]) {
    assert.ok(galleryCode.includes(expectedText), `TempleGallerySection must include ${expectedText}`);
  }

  assert.ok(galleryCode.includes('aspect-[9/16]') && galleryCode.includes('object-contain'), 'Gallery portraits must be uncropped 9:16 object-contain');
  assert.strictEqual(galleryCode.includes('object-cover'), false, 'TempleGallerySection must not use object-cover');
  assert.ok(galleryCode.includes('SectionBackgroundChakra'), 'TempleGallerySection must mount rotating SectionBackgroundChakra');

  const appCode = fs.readFileSync('src/App.tsx', 'utf-8');
  assert.ok(appCode.includes('<TempleGallerySection'), 'App.tsx must mount TempleGallerySection');
  assert.ok(appCode.includes("'gallery'"), 'App.tsx scroll spy must include gallery section id');

  const navCode = fs.readFileSync('src/components/Navbar.tsx', 'utf-8');
  assert.ok(navCode.includes("id: 'gallery'"), 'Navbar must include gallery navigation link');

  const footerCode = fs.readFileSync('src/components/Footer.tsx', 'utf-8');
  assert.ok(footerCode.includes("onNavigate('gallery')"), 'Footer must include gallery navigation link');

  // Verify SectionBackgroundChakra is mounted in every non-homepage content section & footer (with donation having its dedicated Mandala/Chakra)
  for (const componentPath of [
    'src/components/DevotionalPresenceSection.tsx',
    'src/components/VisionarySection.tsx',
    'src/components/TempleGallerySection.tsx',
    'src/components/DarshanSection.tsx',
    'src/components/TempleLocationSection.tsx',
    'src/components/FestivalsSection.tsx',
    'src/components/SevaSection.tsx',
    'src/components/TempleSocialConnectSection.tsx',
    'src/components/Footer.tsx',
  ]) {
    const code = fs.readFileSync(componentPath, 'utf-8');
    assert.ok(code.includes('<SectionBackgroundChakra'), `${componentPath} must mount <SectionBackgroundChakra`);
  }
  assert.ok(footerCode.includes('motion.'), 'Footer must include animated motion elements');

  // Strictly verify HeroSection (main homepage) does NOT mount SectionBackgroundChakra
  const heroSectionCode = fs.readFileSync('src/components/HeroSection.tsx', 'utf-8');
  assert.strictEqual(
    heroSectionCode.includes('SectionBackgroundChakra'),
    false,
    'HeroSection (main homepage) must NOT include background chakra'
  );
});
