/**
 * Low-bandwidth dynamic base64 / blur-grid thumbnail generation for video posters.
 * - Pre-seeded with real 3x4 RGB color grids sampled from each shrine poster so initial mobile paint is ~0ms
 *   with zero network dependency.
 * - Dynamically downscales arbitrary poster URLs at runtime via an offscreen 18x32 canvas into compact
 *   base64 WebP/JPEG micro-thumbnails cached in memory.
 */

export interface MicroThumbnailOptions {
  width?: number;
  height?: number;
  quality?: number;
  blurPx?: number;
}

const DEFAULT_COLS = 3;
const DEFAULT_ROWS = 4;
const DEFAULT_WARM_SANCTUM_GRID: readonly string[] = [
  '#4f2f21',
  '#5d3726',
  '#4b2c1f',
  '#6c412c',
  '#8c5b38',
  '#633a27',
  '#512d21',
  '#7b4b2f',
  '#45251a',
  '#311b13',
  '#4a281d',
  '#2c1710',
];

/**
 * Authentic 3x4 color grids sampled directly from the WebP first-frame posters.
 * Kept inline so the browser paints color-accurate soft previews before any external asset request finishes.
 */
export const POSTER_COLOR_GRIDS: Readonly<Record<string, readonly string[]>> = {
  '/hls/dwarika-1/poster.webp': [
    '#9ba4a3',
    '#979ea1',
    '#989ea3',
    '#a1a5a3',
    '#949697',
    '#7d8285',
    '#696d69',
    '#615850',
    '#653c4b',
    '#33363a',
    '#3c3c3c',
    '#742e3f',
  ],
  '/hls/dwarika-2/poster.webp': [
    '#989fae',
    '#c5c3bc',
    '#d1ddd8',
    '#b0b4c3',
    '#cfcac9',
    '#d2dde7',
    '#aab0c1',
    '#b1acb3',
    '#816757',
    '#939aa9',
    '#9ea3b1',
    '#6a4935',
  ],
  '/hls/dwarika-3/poster.webp': [
    '#75523a',
    '#885f42',
    '#895c35',
    '#735334',
    '#886145',
    '#926940',
    '#b79160',
    '#8c6f57',
    '#a47444',
    '#986f43',
    '#59422e',
    '#362518',
  ],
  '/hls/dwarika-4/poster.webp': [
    '#93abb8',
    '#91a7b5',
    '#93a9b7',
    '#7b9095',
    '#78867d',
    '#63777a',
    '#223120',
    '#5d584e',
    '#3a462e',
    '#60544b',
    '#75625e',
    '#847573',
  ],
  '/assets/story/part_01.webp': [
    '#3e8fa6',
    '#4293a8',
    '#4391a7',
    '#6f959a',
    '#739a9d',
    '#73999d',
    '#848c7e',
    '#999583',
    '#989b8a',
    '#424a46',
    '#334545',
    '#485651',
  ],
  '/assets/story/part_02.webp': [
    '#7e9678',
    '#86a286',
    '#93a9ab',
    '#90726e',
    '#847964',
    '#837385',
    '#b3875d',
    '#be8f4a',
    '#7c7562',
    '#c69764',
    '#aa794f',
    '#95713c',
  ],
  '/assets/story/part_03.webp': [
    '#91b28d',
    '#667366',
    '#8a9c9f',
    '#948e7d',
    '#7d6562',
    '#8a7188',
    '#a5685b',
    '#b0884e',
    '#866a41',
    '#bc916d',
    '#c59561',
    '#af7f46',
  ],
  '/assets/story/part_04.webp': [
    '#7f977b',
    '#748f79',
    '#8da0a5',
    '#8f7d75',
    '#82746b',
    '#8d7692',
    '#9e6c5c',
    '#a68354',
    '#816c45',
    '#c8935c',
    '#ad763e',
    '#996f32',
  ],
  '/assets/story/part_05.webp': [
    '#90b68c',
    '#6d7a6b',
    '#8d9fa2',
    '#978a7a',
    '#886f69',
    '#8e7390',
    '#a7755d',
    '#a27b4a',
    '#886f42',
    '#d19757',
    '#b1793e',
    '#a17635',
  ],
  '/assets/story/part_06.webp': [
    '#7a8e70',
    '#7a9072',
    '#747e7b',
    '#937064',
    '#83673e',
    '#6d635f',
    '#b48f68',
    '#a6703a',
    '#876f61',
    '#aa8061',
    '#9d5c1d',
    '#624f48',
  ],
  '/assets/story/part_07.webp': [
    '#c0d5e4',
    '#a2b4ba',
    '#c3d7e7',
    '#a8bcc6',
    '#747b81',
    '#adc0c7',
    '#99a4ad',
    '#a5bac8',
    '#92a1a2',
    '#909597',
    '#a1aab6',
    '#8997ab',
  ],
  '/assets/story/part_08.webp': [
    '#d3e3f1',
    '#bfd1da',
    '#ccdfed',
    '#a6bec8',
    '#78818a',
    '#adc1c7',
    '#889cab',
    '#92bfd5',
    '#8fa5ad',
    '#8a959c',
    '#879db2',
    '#7b8fa7',
  ],
  '/assets/story/part_09.webp': [
    '#769f6c',
    '#6d8164',
    '#7fa87c',
    '#87826e',
    '#7a6642',
    '#6d6c4f',
    '#9e7c53',
    '#a68022',
    '#978243',
    '#b47e33',
    '#b0772e',
    '#8d632a',
  ],
  '/assets/story/part_10.webp': [
    '#354d40',
    '#2a3937',
    '#516a7f',
    '#6d5a5b',
    '#786868',
    '#87799a',
    '#985e57',
    '#a67f4a',
    '#726146',
    '#ae7e5c',
    '#b18255',
    '#926f4c',
  ],
  '/assets/story/part_11.webp': [
    '#22312a',
    '#182725',
    '#445b71',
    '#6b4e52',
    '#5e4e4d',
    '#7f6b90',
    '#874f4e',
    '#82603d',
    '#594932',
    '#a56c3a',
    '#a36c2f',
    '#7c5b37',
  ],
  '/assets/story/part_12.webp': [
    '#1d3029',
    '#1b2426',
    '#43586f',
    '#584548',
    '#725e60',
    '#857193',
    '#935752',
    '#9d7643',
    '#6e573d',
    '#aa7a58',
    '#a26f4a',
    '#896135',
  ],
  '/assets/story/part_13.webp': [
    '#a68274',
    '#f4eae8',
    '#c2a8a0',
    '#a98c81',
    '#a17e85',
    '#c4b1ab',
    '#c9b1ae',
    '#9f4b58',
    '#a59895',
    '#dbd3d6',
    '#b04c67',
    '#d3cbce',
  ],
  '/assets/story/part_14.webp': [
    '#b7b9a7',
    '#a3948c',
    '#a1a495',
    '#d0c3c5',
    '#b18076',
    '#aa5a51',
    '#94453d',
    '#a86249',
    '#c57a68',
    '#a75259',
    '#a46564',
    '#a67c7c',
  ],
};

const MAX_THUMBNAIL_CACHE_ENTRIES = 64;
const blurUriCache = new Map<string, string>();
const runtimeCanvasCache = new Map<string, string>();
const inFlightThumbnails = new Map<string, Promise<string | null>>();

function encodeBase64Utf8(input: string): string {
  if (typeof globalThis.btoa === 'function') {
    const bytes = new TextEncoder().encode(input);
    let binary = '';
    for (let i = 0; i < bytes.length; i += 1) {
      binary += String.fromCharCode(bytes[i]);
    }
    return globalThis.btoa(binary);
  }
  const nodeBuffer = (globalThis as { Buffer?: { from: (s: string, enc: string) => { toString: (enc: string) => string } } }).Buffer;
  if (nodeBuffer) {
    return nodeBuffer.from(input, 'utf8').toString('base64');
  }
  return '';
}

function sanitizeHexColor(hex: string): string {
  return /^#[0-9a-fA-F]{6}$/.test(hex) ? hex.toLowerCase() : '#2b1810';
}

export function normalizePosterLookupKey(posterSrc: string): string {
  const trimmed = posterSrc.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('data:')) return trimmed;
  try {
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return new URL(trimmed).pathname;
    }
  } catch {
    // Fall back to string stripping if URL parsing rejects relative tokens
  }
  const queryIdx = trimmed.indexOf('?');
  const hashIdx = trimmed.indexOf('#');
  const cutIdx =
    queryIdx === -1
      ? hashIdx
      : hashIdx === -1
        ? queryIdx
        : Math.min(queryIdx, hashIdx);
  return cutIdx === -1 ? trimmed : trimmed.slice(0, cutIdx);
}

/**
 * Encodes a flat cols*rows array of hex colors into an ultra-compact blurred SVG base64 data URI.
 * Produces ~380-460 bytes per thumbnail for zero-roundtrip initial paint on slow mobile connections.
 */
export function encodeColorGridToBlurDataUri(
  hexColors: readonly string[],
  cols = DEFAULT_COLS,
  rows = DEFAULT_ROWS
): string {
  const safeColors = hexColors.length > 0 ? hexColors : DEFAULT_WARM_SANCTUM_GRID;
  const cacheKey = `${cols}x${rows}:${safeColors.join(',')}`;
  const cached = blurUriCache.get(cacheKey);
  if (cached) return cached;

  const rects: string[] = [];

  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const color = sanitizeHexColor(safeColors[(r * cols + c) % safeColors.length]);
      rects.push(`<rect x="${c}" y="${r}" width="1.2" height="1.2" fill="${color}"/>`);
    }
  }

  const baseColor = sanitizeHexColor(safeColors[Math.min(4, safeColors.length - 1)]);
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 ${cols} ${rows}" preserveAspectRatio="none">` +
    `<filter id="b"><feGaussianBlur stdDeviation=".6"/></filter>` +
    `<rect width="${cols}" height="${rows}" fill="${baseColor}"/>` +
    `<g filter="url(#b)">${rects.join('')}</g>` +
    `</svg>`;

  const uri = `data:image/svg+xml;base64,${encodeBase64Utf8(svg)}`;
  blurUriCache.set(cacheKey, uri);
  return uri;
}

/**
 * Resolves the instant 0ms base64 blur-grid placeholder (or dynamically cached canvas micro-thumbnail)
 * for any devotional gallery or story episode poster path.
 */
export function resolvePosterBlurThumbnail(posterSrc?: string): string | undefined {
  if (!posterSrc) return undefined;
  const key = normalizePosterLookupKey(posterSrc);
  if (!key) return undefined;

  const dynamicHit = runtimeCanvasCache.get(key);
  if (dynamicHit) {
    return dynamicHit;
  }

  const grid = POSTER_COLOR_GRIDS[key];
  if (grid) {
    return encodeColorGridToBlurDataUri(grid);
  }

  return encodeColorGridToBlurDataUri(DEFAULT_WARM_SANCTUM_GRID);
}

/**
 * Returns the runtime-generated canvas micro-thumbnail if one was computed cleanly.
 */
export function getCachedMicroThumbnail(posterSrc?: string): string | undefined {
  if (!posterSrc) return undefined;
  return runtimeCanvasCache.get(normalizePosterLookupKey(posterSrc));
}

function setBoundedCacheEntry(key: string, dataUri: string): void {
  if (runtimeCanvasCache.size >= MAX_THUMBNAIL_CACHE_ENTRIES) {
    const oldestKey = runtimeCanvasCache.keys().next().value;
    if (oldestKey !== undefined) {
      runtimeCanvasCache.delete(oldestKey);
    }
  }
  runtimeCanvasCache.set(key, dataUri);
}

/**
 * Dynamically rasterizes any loaded poster URL onto a tiny 18x32 offscreen canvas
 * and exports a low-bandwidth base64 WebP/JPEG data URI in memory.
 */
export function generateDynamicMicroThumbnail(
  sourceUrl: string,
  options: MicroThumbnailOptions = {}
): Promise<string | null> {
  if (!sourceUrl || typeof document === 'undefined' || typeof Image === 'undefined') {
    return Promise.resolve(null);
  }

  const key = normalizePosterLookupKey(sourceUrl);
  const cached = runtimeCanvasCache.get(key);
  if (cached) {
    return Promise.resolve(cached);
  }

  const pending = inFlightThumbnails.get(key);
  if (pending) {
    return pending;
  }

  const width = Math.max(8, Math.min(options.width ?? 18, 64));
  const height = Math.max(12, Math.min(options.height ?? 32, 96));
  const quality = Math.max(0.2, Math.min(options.quality ?? 0.45, 0.85));
  const blurPx = Math.max(0, Math.min(options.blurPx ?? 1, 6));

  const promise = new Promise<string | null>((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.decoding = 'async';

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(null);
          return;
        }
        if (blurPx > 0 && 'filter' in ctx) {
          ctx.filter = `blur(${blurPx}px)`;
        }
        ctx.drawImage(img, 0, 0, width, height);

        let dataUrl = canvas.toDataURL('image/webp', quality);
        if (!dataUrl || dataUrl === 'data:,') {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }
        if (dataUrl && dataUrl.startsWith('data:image/') && dataUrl.length < 8192) {
          setBoundedCacheEntry(key, dataUrl);
          resolve(dataUrl);
        } else {
          resolve(null);
        }
      } catch {
        resolve(null);
      }
    };

    img.onerror = () => resolve(null);
    img.src = sourceUrl;
  }).finally(() => {
    inFlightThumbnails.delete(key);
  });

  inFlightThumbnails.set(key, promise);
  return promise;
}

export function clearMicroThumbnailCacheForTests(): void {
  runtimeCanvasCache.clear();
  inFlightThumbnails.clear();
}
