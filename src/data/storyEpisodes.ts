import part01Video from '../VIDEO /PART 1 .mp4';
import part02Video from '../VIDEO /PART 2.mp4';
import part03Video from '../VIDEO /PART 3.mp4';
import part04Video from '../VIDEO /PART 4.mp4';
import part05Video from '../VIDEO /PART 5.mp4';
import part06Video from '../VIDEO /PART 6.mp4';
import part07Video from '../VIDEO /PART 7.mp4';
import part08Video from '../VIDEO /PART 8.mp4';
import part09Video from '../VIDEO /PART 9.mp4';
import part10Video from '../VIDEO /PART 10.mp4';
import part11Video from '../VIDEO /PART 11.mp4';
import part12Video from '../VIDEO /PART 12.mp4';
import part13Video from '../VIDEO /PART 13.mp4';
import part14Video from '../VIDEO /PART 14.mp4';

import {
  STORY_EPISODES_META,
  StoryEpisodeMeta,
  formatEpisodeDuration,
  getNextEpisodeId,
  getPreviousEpisodeId,
} from './storyEpisodesMeta';

export interface StoryEpisode extends StoryEpisodeMeta {
  src: string;
}

const VIDEO_SOURCES: Record<number, string> = {
  1: part01Video,
  2: part02Video,
  3: part03Video,
  4: part04Video,
  5: part05Video,
  6: part06Video,
  7: part07Video,
  8: part08Video,
  9: part09Video,
  10: part10Video,
  11: part11Video,
  12: part12Video,
  13: part13Video,
  14: part14Video,
};

export const STORY_EPISODES: StoryEpisode[] = STORY_EPISODES_META.map((meta) => ({
  ...meta,
  src: VIDEO_SOURCES[meta.id],
}));

export function getStoryEpisodeById(id: number): StoryEpisode | undefined {
  return STORY_EPISODES.find((ep) => ep.id === id);
}

export { formatEpisodeDuration, getNextEpisodeId, getPreviousEpisodeId };
