import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { OFFICIAL_SOCIAL_LINKS } from './TempleSocialConnectSection.js';
import { en } from '../i18n/en.js';
import { hi } from '../i18n/hi.js';
import { mr } from '../i18n/mr.js';
import { gu } from '../i18n/gu.js';

test('Temple Social Links: Official WhatsApp Channel configuration', () => {
  // Must be official WhatsApp Channel URL, NOT a personal chat link
  assert.strictEqual(
    OFFICIAL_SOCIAL_LINKS.whatsappChannel.url,
    'https://whatsapp.com/channel/0029Vb7mlVF30LKNt0hhbL33',
    'WhatsApp channel URL must match authoritative link'
  );
  assert.ok(
    !OFFICIAL_SOCIAL_LINKS.whatsappChannel.url.includes('wa.me'),
    'WhatsApp URL must not be personal chat link'
  );
  assert.ok(
    !OFFICIAL_SOCIAL_LINKS.whatsappChannel.url.includes('api.whatsapp.com/send'),
    'WhatsApp URL must not use personal chat API'
  );

  // QR asset path check
  const qrPath = path.resolve(process.cwd(), 'public', OFFICIAL_SOCIAL_LINKS.whatsappChannel.qrPath.replace(/^\//, ''));
  assert.ok(fs.existsSync(qrPath), `WhatsApp QR code file must exist at ${qrPath}`);
  const stats = fs.statSync(qrPath);
  assert.ok(stats.size > 1000, 'WhatsApp QR code must have valid file size');
});

test('Temple Social Links: Official Instagram configuration', () => {
  assert.strictEqual(
    OFFICIAL_SOCIAL_LINKS.instagram.handle,
    '@haripriyadwarka',
    'Instagram handle must match @haripriyadwarka'
  );
  assert.strictEqual(
    OFFICIAL_SOCIAL_LINKS.instagram.url,
    'https://www.instagram.com/haripriyadwarka/',
    'Instagram profile URL must match authoritative link'
  );

  // QR asset path check
  const qrPath = path.resolve(process.cwd(), 'public', OFFICIAL_SOCIAL_LINKS.instagram.qrPath.replace(/^\//, ''));
  assert.ok(fs.existsSync(qrPath), `Instagram QR code file must exist at ${qrPath}`);
  const stats = fs.statSync(qrPath);
  assert.ok(stats.size > 1000, 'Instagram QR code must have valid file size');
});

test('Temple Social Links: I18n translations in all 4 languages', () => {
  const dicts = [
    { lang: 'English', dict: en },
    { lang: 'Hindi', dict: hi },
    { lang: 'Marathi', dict: mr },
    { lang: 'Gujarati', dict: gu },
  ];

  for (const { lang, dict } of dicts) {
    assert.ok(dict.social.title, `${lang}: social.title must exist`);
    assert.ok(dict.social.subtitle, `${lang}: social.subtitle must exist`);
    assert.ok(dict.social.whatsapp.btnAction, `${lang}: social.whatsapp.btnAction must exist`);
    assert.ok(dict.social.instagram.btnAction, `${lang}: social.instagram.btnAction must exist`);
    assert.ok(dict.social.whatsapp.qrAlt, `${lang}: social.whatsapp.qrAlt must exist`);
    assert.ok(dict.social.instagram.qrAlt, `${lang}: social.instagram.qrAlt must exist`);
    assert.ok(dict.nav.social, `${lang}: nav.social must exist`);
    assert.ok(dict.footer.socialHeading, `${lang}: footer.socialHeading must exist`);
    assert.ok(dict.footer.whatsappChannelAria, `${lang}: footer.whatsappChannelAria must exist`);
    assert.ok(dict.footer.instagramAria, `${lang}: footer.instagramAria must exist`);
  }
});
