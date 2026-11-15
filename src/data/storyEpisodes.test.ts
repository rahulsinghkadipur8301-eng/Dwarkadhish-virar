import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  STORY_EPISODES_META,
  formatEpisodeDuration,
  getNextEpisodeId,
  getPreviousEpisodeId,
} from './storyEpisodesMeta.ts';
import type { Language } from './templeData.ts';

test('storyEpisodes: exports all 14 sequential episodes with verified metadata and 4-language content', () => {
  assert.equal(STORY_EPISODES_META.length, 14);
  const langs: Language[] = ['en', 'hi', 'mr', 'gu'];

  STORY_EPISODES_META.forEach((ep, idx) => {
    const expectedId = idx + 1;
    assert.equal(ep.id, expectedId);
    assert.equal(ep.contentVerified, true);
    assert.ok(ep.durationSeconds > 30 && ep.durationSeconds < 180);

    const posterFile = path.join(
      process.cwd(),
      'public/assets/story',
      `part_${String(expectedId).padStart(2, '0')}.webp`
    );
    assert.equal(ep.poster, `/assets/story/part_${String(expectedId).padStart(2, '0')}.webp`);
    assert.ok(fs.existsSync(posterFile), `Missing extracted poster ${posterFile}`);
    const stat = fs.statSync(posterFile);
    assert.ok(stat.size > 15_000, `Poster ${posterFile} should be crisp (>15KB), got ${stat.size}`);

    const videoFilename = expectedId === 1 ? 'PART 1 .mp4' : `PART ${expectedId}.mp4`;
    const videoFile = path.join(process.cwd(), 'src', 'VIDEO ', videoFilename);
    assert.ok(fs.existsSync(videoFile), `Missing source video ${videoFile}`);

    for (const lang of langs) {
      assert.ok(ep.title[lang].trim().length >= 6, `Missing title[${lang}] for Part ${expectedId}`);
      assert.ok(
        ep.summary[lang].trim().length >= 30,
        `Missing summary[${lang}] for Part ${expectedId}`
      );
    }
  });
});

test('storyEpisodes: exports clean formatEpisodeDuration and wrap-around prev/next navigation helpers', () => {
  assert.equal(formatEpisodeDuration(0), '0:00');
  assert.equal(formatEpisodeDuration(47), '0:47');
  assert.equal(formatEpisodeDuration(91), '1:31');
  assert.equal(formatEpisodeDuration(115), '1:55');
  assert.equal(formatEpisodeDuration(-5), '0:00');

  assert.equal(getNextEpisodeId(1), 2);
  assert.equal(getNextEpisodeId(14), 1);
  assert.equal(getPreviousEpisodeId(1), 14);
  assert.equal(getPreviousEpisodeId(8), 7);
});
