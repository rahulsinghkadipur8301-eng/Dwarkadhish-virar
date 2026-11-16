import { AARTI_SCHEDULE, FESTIVALS_DATA, SEVA_OFFERINGS } from '../data/templeData';
import { EKADASHI_SCHEDULE } from '../data/ekadashiData';

export type MobileMinimizableSectionId = 'darshan' | 'location' | 'festivals' | 'seva';

export interface MobileSectionStats {
  dailyAartiCount: number;
  festivalCount: number;
  ekadashiCount: number;
  sevaCount: number;
  lowestSevaAmount: number;
}

/**
 * Mobile (<768px) progressive-disclosure defaults: all four long reference
 * sections start collapsed on small viewports to eliminate excess scrolling,
 * while remaining completely expanded on md+ desktop screens.
 */
export function isSectionInitiallyExpandedOnMobile(_sectionId: MobileMinimizableSectionId): boolean {
  return false;
}

export function toggleMobileSectionExpanded(isExpanded: boolean): boolean {
  return !isExpanded;
}

export function getMobileSectionStats(): MobileSectionStats {
  const lowestSevaAmount = SEVA_OFFERINGS.reduce(
    (min, item) => (item.proposedAmount < min ? item.proposedAmount : min),
    SEVA_OFFERINGS[0]?.proposedAmount ?? 501
  );

  return {
    dailyAartiCount: AARTI_SCHEDULE.length,
    festivalCount: FESTIVALS_DATA.length,
    ekadashiCount: EKADASHI_SCHEDULE.length,
    sevaCount: SEVA_OFFERINGS.length,
    lowestSevaAmount,
  };
}
