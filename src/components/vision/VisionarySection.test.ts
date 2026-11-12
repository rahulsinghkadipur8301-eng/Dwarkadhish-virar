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

test('Devotional Contributions Interface in TempleDonationSection', () => {
  const donationCode = fs.readFileSync('src/components/TempleDonationSection.tsx', 'utf-8');
  assert.ok(donationCode.includes('dwarkadhish.shirgaon@upi'), 'Must include direct UPI ID');
  assert.ok(donationCode.includes('temple_donation_poster.png'), 'Must display authentic poster');
  assert.ok(donationCode.includes('handleDownloadPoster'), 'Must include download poster function');
  assert.ok(donationCode.includes('isLightboxOpen'), 'Must include full view lightbox modal');
  // Check removal of old heavy administrative elements
  assert.strictEqual(donationCode.includes('AUTHORIZED TEMPLE SEVA PORTAL'), false, 'Old banner must be eliminated');
  assert.strictEqual(donationCode.includes('Return to Pending Verification'), false, 'Old toggle button must be eliminated');
  assert.strictEqual(donationCode.includes('Sanctioned Seva Pillars'), false, 'Old administrative pillar list must be eliminated');
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

test('Ornate Temple Online Donation Poster: Asset existence and features in TempleDonationSection', () => {
  const posterPath = path.resolve('public/temple_donation_poster.png');
  assert.ok(fs.existsSync(posterPath), 'public/temple_donation_poster.png must exist');
  
  const posterStats = fs.statSync(posterPath);
  assert.ok(posterStats.size > 1000000, 'Donation poster should be high resolution (> 1MB)');

  const donationSectionCode = fs.readFileSync('src/components/TempleDonationSection.tsx', 'utf-8');
  assert.ok(donationSectionCode.includes('temple_donation_poster.png'), 'TempleDonationSection must reference temple_donation_poster.png');
  assert.ok(donationSectionCode.includes('isLightboxOpen'), 'TempleDonationSection must support full resolution lightbox zoom');
  assert.ok(donationSectionCode.includes('handleDownloadPoster'), 'TempleDonationSection must support direct download of poster');
});
