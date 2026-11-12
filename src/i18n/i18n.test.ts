import test from 'node:test';
import assert from 'node:assert/strict';
import { en } from './en';
import { hi } from './hi';
import { mr } from './mr';
import { gu } from './gu';
import { Language } from './types';

const dictionaries = { en, hi, mr, gu };

function collectKeys(obj: any, prefix = ''): string[] {
  let keys: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      keys = keys.concat(collectKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

test('i18n: All four languages have identical key sets with non-empty string values', () => {
  const enKeys = collectKeys(en).sort();
  const langs: Language[] = ['hi', 'mr', 'gu'];

  assert(enKeys.length > 50, `Expected at least 50 translation keys, found ${enKeys.length}`);

  for (const lang of langs) {
    const dict = dictionaries[lang];
    const targetKeys = collectKeys(dict).sort();

    // Check for missing keys in target language compared to English
    const missingInTarget = enKeys.filter((k) => !targetKeys.includes(k));
    assert.deepEqual(
      missingInTarget,
      [],
      `Language "${lang}" is missing ${missingInTarget.length} translation keys: ${missingInTarget.join(', ')}`
    );

    // Check for extraneous keys in target language
    const extraInTarget = targetKeys.filter((k) => !enKeys.includes(k));
    assert.deepEqual(
      extraInTarget,
      [],
      `Language "${lang}" has extra keys not present in English: ${extraInTarget.join(', ')}`
    );

    // Check that every string is non-empty
    for (const key of targetKeys) {
      const parts = key.split('.');
      let val: any = dict;
      for (const p of parts) val = val[p];
      assert(typeof val === 'string', `Key ${key} in ${lang} must be a string`);
      assert(val.trim().length > 0, `Key ${key} in ${lang} must not be empty`);
    }
  }
});

test('i18n: Gujarati translations contain authentic Gujarati script glyphs', () => {
  // Test Gujarati script unicode range \u0A80-\u0AFF
  const gujaratiRegex = /[\u0A80-\u0AFF]/;
  assert(gujaratiRegex.test(gu.common.templeName), 'Temple name in Gujarati should have Gujarati script');
  assert(gujaratiRegex.test(gu.hero.tagline), 'Hero tagline in Gujarati should have Gujarati script');
  assert(gujaratiRegex.test(gu.darshan.curtainsClosed), 'Curtains closed in Gujarati should have Gujarati script');
  assert(gujaratiRegex.test(gu.darshan.flowerShower), 'Flower shower in Gujarati should have Gujarati script');
  assert(gujaratiRegex.test(gu.schedule.title), 'Schedule title in Gujarati should have Gujarati script');
});

test('i18n: Marathi translations contain authentic Marathi phrasing distinct from Hindi', () => {
  // Marathi uses 'वेळ' for time/schedule, Hindi uses 'समय'
  assert(mr.schedule.title.includes('वेळ'), 'Marathi schedule title should use "वेळ"');
  assert(hi.schedule.title.includes('समय'), 'Hindi schedule title should use "समय"');
  assert(mr.nav.darshanTimings.includes('वेळ'), 'Marathi nav should use "वेळ"');
  assert(hi.nav.darshanTimings.includes('समय'), 'Hindi nav should use "समय"');

  // Marathi uses 'पुष्पवृष्टी'
  assert(mr.darshan.flowerShower.includes('पुष्पवृष्टी'), 'Marathi darshan should use "पुष्पवृष्टी"');
  assert(hi.darshan.flowerShower.includes('पुष्प वर्षा'), 'Hindi darshan should use "पुष्प वर्षा"');
});
