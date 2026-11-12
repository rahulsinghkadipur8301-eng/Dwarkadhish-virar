import { en } from './en';
import { hi } from './hi';
import { mr } from './mr';
import { gu } from './gu';
import { Language, TranslationDictionary, SUPPORTED_LANGUAGES } from './types';

export * from './types';

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en,
  hi,
  mr,
  gu,
};

export function getTranslation(lang: Language): TranslationDictionary {
  return TRANSLATIONS[lang] || TRANSLATIONS.en;
}

export { en, hi, mr, gu, SUPPORTED_LANGUAGES };
