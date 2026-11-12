import test from 'node:test';
import assert from 'node:assert/strict';
import { 
  AARTI_SCHEDULE, 
  FESTIVALS_DATA, 
  SEVA_OFFERINGS, 
  SPIRITUAL_LEARNING_DATA, 
  VOLUNTEER_ROLES,
  PATRON_SUPPORT_TIERS,
  UI_TRANSLATIONS 
} from './templeData';

test('Aarti schedule contains complete chronological sequence', () => {
  assert.ok(AARTI_SCHEDULE.length >= 5, 'Should have at least 5 primary aartis');
  const ids = AARTI_SCHEDULE.map(a => a.id);
  assert.ok(ids.includes('mangala'));
  assert.ok(ids.includes('shringaar'));
  assert.ok(ids.includes('rajbhog'));
  assert.ok(ids.includes('sandhya'));
  assert.ok(ids.includes('shayan'));
});

test('Multilingual translations exist for en, hi, mr, gu', () => {
  const languages = ['en', 'hi', 'mr', 'gu'] as const;
  for (const lang of languages) {
    const t = UI_TRANSLATIONS[lang];
    assert.ok(t.templeName, `templeName should be defined for ${lang}`);
    assert.ok(t.conceptDisclaimer, `conceptDisclaimer should be defined for ${lang}`);
    assert.ok(
      t.notGujaratWarning.includes('Gujarat') || 
      t.notGujaratWarning.includes('गुजरात') || 
      t.notGujaratWarning.includes('गुजरातमधील') ||
      t.notGujaratWarning.includes('ગુજરાત'), 
      `Warning should explicitly clarify not Gujarat for ${lang}`
    );
  }
});

test('Seva offerings have valid proposed amounts and categories', () => {
  for (const seva of SEVA_OFFERINGS) {
    assert.ok(seva.proposedAmount > 0, `Seva ${seva.id} should have a positive proposed amount`);
    assert.ok(seva.titleEn.length > 0);
    assert.ok(seva.titleHi.length > 0);
    assert.ok(seva.titleMr.length > 0);
  }
});

test('Spiritual learning entries contain all 3 language fields', () => {
  for (const item of SPIRITUAL_LEARNING_DATA) {
    assert.ok(item.titleEn && item.titleHi && item.titleMr);
    assert.ok(item.contentEn && item.contentHi && item.contentMr);
  }
});

test('Volunteer roles and patron support tiers have complete multilingual descriptions', () => {
  assert.ok(VOLUNTEER_ROLES.length >= 3, 'Should have at least 3 volunteer roles');
  for (const role of VOLUNTEER_ROLES) {
    assert.ok(role.titleEn && role.titleHi && role.titleMr, `Volunteer role ${role.id} missing title`);
    assert.ok(role.descriptionEn && role.descriptionHi && role.descriptionMr);
    assert.ok(role.guidelinesEn && role.guidelinesHi && role.guidelinesMr);
  }

  assert.ok(PATRON_SUPPORT_TIERS.length >= 2, 'Should have at least 2 patron tiers');
  for (const tier of PATRON_SUPPORT_TIERS) {
    assert.ok(tier.proposedAmount > 0);
    assert.ok(tier.nameEn && tier.nameHi && tier.nameMr);
    assert.ok(tier.termsEn && tier.termsHi && tier.termsMr);
  }
});

