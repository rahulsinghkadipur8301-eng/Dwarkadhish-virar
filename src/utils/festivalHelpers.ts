import { FestivalEvent, FestivalFilterGroup, Language } from '../data/templeData';

export type FestivalFilterOption = 'all' | FestivalFilterGroup;

export type FestivalMotifKind =
  | 'jhulan'
  | 'lotus'
  | 'bansuri'
  | 'deepa'
  | 'chakra'
  | 'blossom'
  | 'flame'
  | 'chariot';

export interface LocalizedFestivalView {
  id: string;
  title: string;
  description: string;
  category: string;
  month: string;
  dateStr: string;
  timeStr: string;
  highlights: string[];
  motif: FestivalMotifKind;
}

export const FESTIVAL_MOTIF_MAP: Record<string, FestivalMotifKind> = {
  gita_jayanti: 'chakra',
  holika_dahan: 'flame',
  holi: 'blossom',
  jagannath_rath_yatra: 'chariot',
  janmashtami: 'jhulan',
  radhashtami: 'lotus',
  sharad_purnima: 'bansuri',
  narak_chaturdashi: 'deepa',
  govardhan: 'deepa',
};

/**
 * Resolves all localized strings and milestone highlights for a FestivalEvent
 * across English, Hindi, Marathi, and Gujarati.
 */
export function getLocalizedFestivalView(
  festival: FestivalEvent,
  language: Language
): LocalizedFestivalView {
  const motif = FESTIVAL_MOTIF_MAP[festival.id] || 'lotus';

  switch (language) {
    case 'hi':
      return {
        id: festival.id,
        title: festival.titleHi,
        description: festival.descriptionHi,
        category: festival.categoryHi,
        month: festival.monthHi,
        dateStr: festival.dateHi,
        timeStr: festival.timeHi,
        highlights: festival.highlightsHi,
        motif,
      };
    case 'mr':
      return {
        id: festival.id,
        title: festival.titleMr,
        description: festival.descriptionMr,
        category: festival.categoryMr,
        month: festival.monthMr,
        dateStr: festival.dateMr,
        timeStr: festival.timeMr,
        highlights: festival.highlightsMr,
        motif,
      };
    case 'gu':
      return {
        id: festival.id,
        title: festival.titleGu,
        description: festival.descriptionGu,
        category: festival.categoryGu,
        month: festival.monthGu,
        dateStr: festival.dateGu,
        timeStr: festival.timeGu,
        highlights: festival.highlightsGu,
        motif,
      };
    default:
      return {
        id: festival.id,
        title: festival.titleEn,
        description: festival.descriptionEn,
        category: festival.category,
        month: festival.month,
        dateStr: festival.dateStr,
        timeStr: festival.timeStr,
        highlights: festival.highlightsEn,
        motif,
      };
  }
}

/**
 * Filters Krishna festivals cleanly by selected devotion/calendar group.
 */
export function filterFestivalsByGroup(
  festivals: readonly FestivalEvent[],
  filter: FestivalFilterOption
): FestivalEvent[] {
  if (filter === 'all') {
    return [...festivals];
  }
  return festivals.filter((item) => item.filterGroup === filter);
}

/**
 * Computes staggered Framer Motion reveal delay capped for crisp pacing.
 */
export function getCardStaggerDelay(index: number, reducedMotion: boolean): number {
  if (reducedMotion || index <= 0) return 0;
  return Math.min(index * 0.05, 0.3);
}
