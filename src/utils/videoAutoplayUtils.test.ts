import test from 'node:test';
import assert from 'node:assert/strict';
import {
  syncVideoAutoplayAttributes,
  attemptSafeVideoPlay,
  shouldActivateEpisodeStream,
  quantizeVideoTime,
  resolveViewportPlaybackAction,
  isTouchTapGesture,
} from './videoAutoplayUtils.ts';

function createMockVideo(overrides: Partial<HTMLVideoElement> = {}) {
  const attrs = new Map<string, string>();
  const mock = {
    playsInline: false,
    defaultMuted: false,
    autoplay: false,
    loop: false,
    muted: false,
    paused: true,
    src: 'episode-1.mp4',
    currentSrc: 'episode-1.mp4',
    setAttribute(k: string, v: string) {
      attrs.set(k, v);
    },
    getAttribute(k: string) {
      return attrs.get(k) ?? null;
    },
    removeAttribute(k: string) {
      attrs.delete(k);
    },
    async play() {
      mock.paused = false;
    },
    _attrs: attrs,
  };
  Object.defineProperties(mock, Object.getOwnPropertyDescriptors(overrides));
  return mock as unknown as HTMLVideoElement & { _attrs: Map<string, string> };
}

test('syncVideoAutoplayAttributes: guarantees playsInline, webkit-playsinline, autoplay, defaultMuted, loop & muted attributes', () => {
  const vid = createMockVideo();
  syncVideoAutoplayAttributes(vid, { muted: true });

  assert.equal(vid.playsInline, true);
  assert.equal(vid.defaultMuted, true);
  assert.equal(vid.autoplay, true);
  assert.equal(vid.loop, true);
  assert.equal(vid.muted, true);
  assert.equal(vid._attrs.get('playsinline'), '');
  assert.equal(vid._attrs.get('webkit-playsinline'), '');
  assert.equal(vid._attrs.get('autoplay'), '');
  assert.equal(vid._attrs.get('loop'), '');
  assert.equal(vid._attrs.get('muted'), '');

  syncVideoAutoplayAttributes(vid, { muted: false, loop: false });
  assert.equal(vid.muted, false);
  assert.equal(vid.loop, false);
  assert.equal(vid._attrs.has('muted'), false);
  assert.equal(vid._attrs.has('loop'), false);
});

test('resolveViewportPlaybackAction: pauses off-screen, disabled, user-paused, or hidden videos', () => {
  assert.equal(
    resolveViewportPlaybackAction({ isInView: true, enabled: true, userPaused: false, documentHidden: false }),
    'play'
  );
  assert.equal(
    resolveViewportPlaybackAction({ isInView: false, enabled: true, userPaused: false, documentHidden: false }),
    'pause'
  );
  assert.equal(
    resolveViewportPlaybackAction({ isInView: true, enabled: false }),
    'pause'
  );
  assert.equal(
    resolveViewportPlaybackAction({ isInView: true, enabled: true, userPaused: true }),
    'pause'
  );
  assert.equal(
    resolveViewportPlaybackAction({ isInView: true, enabled: true, documentHidden: true }),
    'pause'
  );
});

test('attemptSafeVideoPlay: safely plays, skips empty src, and falls back to muted play if unmuted rejected', async () => {
  const emptyVid = createMockVideo({ src: '', currentSrc: '' });
  const emptyRes = await attemptSafeVideoPlay(emptyVid, { muted: true });
  assert.deepEqual(emptyRes, { started: false, fellBackToMuted: false });

  let calls = 0;
  let pausedState = true;
  const strictVid = createMockVideo({
    get paused() {
      return pausedState;
    },
    async play() {
      calls += 1;
      if (calls === 1) {
        throw new Error('NotAllowedError');
      }
      pausedState = false;
    },
  });

  const res = await attemptSafeVideoPlay(strictVid, { muted: false });
  assert.deepEqual(res, { started: true, fellBackToMuted: true });
  assert.equal(strictVid.muted, true);
  assert.equal(strictVid.paused, false);
});

test('shouldActivateEpisodeStream: limits initial eager streams to concurrent cap and activates in-viewport cards', () => {
  assert.equal(shouldActivateEpisodeStream(0, false, 4), true);
  assert.equal(shouldActivateEpisodeStream(3, false, 4), true);
  assert.equal(shouldActivateEpisodeStream(4, false, 4), false);
  assert.equal(shouldActivateEpisodeStream(13, false, 4), false);
  assert.equal(shouldActivateEpisodeStream(13, true, 4), true);
});

test('quantizeVideoTime: clamps negatives and rounds cleanly to 0.25s steps', () => {
  assert.equal(quantizeVideoTime(-2), 0);
  assert.equal(quantizeVideoTime(Number.NaN), 0);
  assert.equal(quantizeVideoTime(12.34), 12.25);
  assert.equal(quantizeVideoTime(12.41), 12.5);
});

test('isTouchTapGesture: distinguishes genuine stationary mobile taps from scroll swipes or long holds', () => {
  assert.equal(isTouchTapGesture(100, 200, 104, 203, 140), true);
  assert.equal(isTouchTapGesture(100, 200, 100, 235, 180), false); // vertical scroll swipe
  assert.equal(isTouchTapGesture(100, 200, 125, 200, 120), false); // horizontal swipe
  assert.equal(isTouchTapGesture(100, 200, 100, 200, 750), false); // long press / hold
});
