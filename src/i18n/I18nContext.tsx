import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Language, TranslationDictionary, SUPPORTED_LANGUAGES } from './types';
import { TRANSLATIONS, getTranslation } from './index';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  tDict: TranslationDictionary;
  t: (path: string, params?: Record<string, string | number>) => string;
}

const STORAGE_KEY = 'shri_dwarkadhish_mandir_lang';

const I18nContext = createContext<I18nContextType | null>(null);

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && (saved === 'en' || saved === 'hi' || saved === 'mr' || saved === 'gu')) {
      return saved as Language;
    }
    // Check browser languages
    const browserLang = navigator.language?.toLowerCase() || '';
    if (browserLang.startsWith('hi')) return 'hi';
    if (browserLang.startsWith('mr')) return 'mr';
    if (browserLang.startsWith('gu')) return 'gu';
  } catch {
    // ignore localStorage errors
  }
  return 'en';
}

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // ignore
    }
  };

  const tDict = useMemo(() => getTranslation(language), [language]);

  // Update document title and lang attribute on language change
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      if (tDict.meta?.title) {
        document.title = tDict.meta.title;
      }
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && tDict.meta?.description) {
        metaDesc.setAttribute('content', tDict.meta.description);
      }
    }
  }, [language, tDict]);

  const t = useMemo(() => {
    return (path: string, params?: Record<string, string | number>): string => {
      const parts = path.split('.');
      let current: any = tDict;
      for (const part of parts) {
        if (current && typeof current === 'object' && part in current) {
          current = current[part];
        } else {
          // Development diagnostic reporting missing translation key
          console.warn(`[i18n] Missing translation key "${path}" for locale "${language}"`);
          return path;
        }
      }
      if (typeof current !== 'string') {
        return path;
      }
      if (params) {
        let result = current;
        Object.entries(params).forEach(([key, val]) => {
          result = result.replace(new RegExp(`{${key}}`, 'g'), String(val));
        });
        return result;
      }
      return current;
    };
  }, [tDict, language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      tDict,
      t,
    }),
    [language, tDict, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export function useI18n(): I18nContextType {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return ctx;
}
