import janmashtamiArt from '../assets/images/fest_janmashtami_bg_1794595399079.webp';
import radhashtamiArt from '../assets/images/fest_radhashtami_bg_1794595399532.webp';
import sharadPurnimaArt from '../assets/images/fest_sharad_purnima_bg_1794595401696.webp';
import govardhanArt from '../assets/images/fest_govardhan_annakut_bg_1794595401211.webp';
import gitaJayantiArt from '../assets/images/fest_gita_jayanti_bg_1794595401802.webp';
import phagHoliArt from '../assets/images/fest_phag_holi_bg_1794595402756.webp';
import holikaDahanArt from '../assets/images/fest_holika_dahan_bg_1794598769208.webp';
import rathYatraArt from '../assets/images/fest_rath_yatra_bg_1794598770344.webp';
import narakChaturdashiArt from '../assets/images/fest_narak_chaturdashi_bg_1794598771160.webp';

export const FESTIVAL_ARTWORK_MAP: Record<string, string> = {
  gita_jayanti: gitaJayantiArt,
  holika_dahan: holikaDahanArt,
  holi: phagHoliArt,
  jagannath_rath_yatra: rathYatraArt,
  janmashtami: janmashtamiArt,
  radhashtami: radhashtamiArt,
  sharad_purnima: sharadPurnimaArt,
  narak_chaturdashi: narakChaturdashiArt,
  govardhan: govardhanArt,
};

export function getFestivalArtwork(festivalId: string): string {
  return FESTIVAL_ARTWORK_MAP[festivalId] || janmashtamiArt;
}
