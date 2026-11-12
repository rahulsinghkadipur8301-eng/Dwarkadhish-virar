import React, { useMemo, useState, useEffect } from 'react';

export interface PetalDefinition {
  id: number;
  type: 'saffron' | 'orange' | 'yellow' | 'rose';
  layer: 'bg' | 'mid' | 'fg';
  xBasePercent: number; // 5% to 95% (biased away from center 40-60% to protect the Mukharvind)
  yStartOffset: number; // Staggered entry from -30% to -5%
  fallSpeed: number; // 0.8 to 1.3
  swayAmplitude: number; // 4% to 12%
  swayFrequency: number; // 1.5 to 3.5 cycles
  swayPhase: number; // 0 to 2*PI
  rotationSpeed: number; // degrees per unit travel
  baseScale: number; // 0.7 to 1.4
  baseOpacity: number; // 0.75 to 0.95
  aspectRatio: number; // petal elongation
  colorMain: string;
  colorShade: string;
}

/**
 * 48 deterministic seeded petals:
 * - 55% saffron and orange marigold petals (26 petals)
 * - 30% yellow marigold petals (15 petals)
 * - 15% soft red/rose petals (7 petals)
 * - Clear central column: xBasePercent is distributed mainly in 6%–38% and 62%–94%
 *   to ensure Shri Dwarkadhish Bhagwan's sacred face and crown remain unobstructed.
 */
export const SEEDED_PETALS: PetalDefinition[] = [
  // --- FOREGROUND LAYER (10 Detailed larger petals cascading along outer frame) ---
  {
    id: 1,
    type: 'saffron',
    layer: 'fg',
    xBasePercent: 12,
    yStartOffset: -12,
    fallSpeed: 1.15,
    swayAmplitude: 8,
    swayFrequency: 2.2,
    swayPhase: 0.4,
    rotationSpeed: 280,
    baseScale: 1.35,
    baseOpacity: 0.92,
    aspectRatio: 1.3,
    colorMain: '#FF7A00',
    colorShade: '#D65A00',
  },
  {
    id: 2,
    type: 'yellow',
    layer: 'fg',
    xBasePercent: 88,
    yStartOffset: -18,
    fallSpeed: 1.1,
    swayAmplitude: 7,
    swayFrequency: 2.6,
    swayPhase: 1.8,
    rotationSpeed: -260,
    baseScale: 1.3,
    baseOpacity: 0.9,
    aspectRatio: 1.25,
    colorMain: '#FFCA28',
    colorShade: '#F57F17',
  },
  {
    id: 3,
    type: 'rose',
    layer: 'fg',
    xBasePercent: 22,
    yStartOffset: -8,
    fallSpeed: 1.05,
    swayAmplitude: 9,
    swayFrequency: 2.0,
    swayPhase: 3.1,
    rotationSpeed: 310,
    baseScale: 1.25,
    baseOpacity: 0.88,
    aspectRatio: 1.4,
    colorMain: '#E91E63',
    colorShade: '#AD1457',
  },
  {
    id: 4,
    type: 'orange',
    layer: 'fg',
    xBasePercent: 78,
    yStartOffset: -22,
    fallSpeed: 1.2,
    swayAmplitude: 10,
    swayFrequency: 2.4,
    swayPhase: 4.5,
    rotationSpeed: -290,
    baseScale: 1.3,
    baseOpacity: 0.92,
    aspectRatio: 1.3,
    colorMain: '#FF9100',
    colorShade: '#E65100',
  },
  {
    id: 5,
    type: 'saffron',
    layer: 'fg',
    xBasePercent: 8,
    yStartOffset: -26,
    fallSpeed: 1.08,
    swayAmplitude: 8,
    swayFrequency: 2.1,
    swayPhase: 0.9,
    rotationSpeed: 240,
    baseScale: 1.28,
    baseOpacity: 0.9,
    aspectRatio: 1.28,
    colorMain: '#FF6D00',
    colorShade: '#DD2C00',
  },
  {
    id: 6,
    type: 'yellow',
    layer: 'fg',
    xBasePercent: 92,
    yStartOffset: -14,
    fallSpeed: 1.18,
    swayAmplitude: 7,
    swayFrequency: 2.7,
    swayPhase: 2.5,
    rotationSpeed: -320,
    baseScale: 1.32,
    baseOpacity: 0.91,
    aspectRatio: 1.22,
    colorMain: '#FFD54F',
    colorShade: '#FFA000',
  },
  {
    id: 7,
    type: 'orange',
    layer: 'fg',
    xBasePercent: 28,
    yStartOffset: -10,
    fallSpeed: 1.02,
    swayAmplitude: 8.5,
    swayFrequency: 2.3,
    swayPhase: 5.2,
    rotationSpeed: 270,
    baseScale: 1.22,
    baseOpacity: 0.89,
    aspectRatio: 1.35,
    colorMain: '#FF9800',
    colorShade: '#F57C00',
  },
  {
    id: 8,
    type: 'rose',
    layer: 'fg',
    xBasePercent: 72,
    yStartOffset: -20,
    fallSpeed: 1.12,
    swayAmplitude: 9.5,
    swayFrequency: 2.5,
    swayPhase: 1.4,
    rotationSpeed: -300,
    baseScale: 1.26,
    baseOpacity: 0.87,
    aspectRatio: 1.42,
    colorMain: '#D81B60',
    colorShade: '#880E4F',
  },
  {
    id: 9,
    type: 'saffron',
    layer: 'fg',
    xBasePercent: 18,
    yStartOffset: -28,
    fallSpeed: 1.16,
    swayAmplitude: 7.5,
    swayFrequency: 2.2,
    swayPhase: 3.8,
    rotationSpeed: 250,
    baseScale: 1.29,
    baseOpacity: 0.9,
    aspectRatio: 1.3,
    colorMain: '#FF7A00',
    colorShade: '#E65100',
  },
  {
    id: 10,
    type: 'yellow',
    layer: 'fg',
    xBasePercent: 82,
    yStartOffset: -16,
    fallSpeed: 1.14,
    swayAmplitude: 8,
    swayFrequency: 2.6,
    swayPhase: 4.9,
    rotationSpeed: -280,
    baseScale: 1.3,
    baseOpacity: 0.9,
    aspectRatio: 1.24,
    colorMain: '#FFCA28',
    colorShade: '#FF8F00',
  },

  // --- MIDGROUND LAYER (24 Ceremonial Petals showering the shrine) ---
  {
    id: 11,
    type: 'saffron',
    layer: 'mid',
    xBasePercent: 15,
    yStartOffset: -10,
    fallSpeed: 1.0,
    swayAmplitude: 7,
    swayFrequency: 2.4,
    swayPhase: 0.2,
    rotationSpeed: 240,
    baseScale: 1.0,
    baseOpacity: 0.85,
    aspectRatio: 1.3,
    colorMain: '#FF7A00',
    colorShade: '#D65A00',
  },
  {
    id: 12,
    type: 'yellow',
    layer: 'mid',
    xBasePercent: 25,
    yStartOffset: -18,
    fallSpeed: 0.95,
    swayAmplitude: 6.5,
    swayFrequency: 2.8,
    swayPhase: 1.5,
    rotationSpeed: -220,
    baseScale: 0.95,
    baseOpacity: 0.82,
    aspectRatio: 1.25,
    colorMain: '#FFD54F',
    colorShade: '#F57F17',
  },
  {
    id: 13,
    type: 'orange',
    layer: 'mid',
    xBasePercent: 35,
    yStartOffset: -25,
    fallSpeed: 1.05,
    swayAmplitude: 8,
    swayFrequency: 2.1,
    swayPhase: 2.9,
    rotationSpeed: 260,
    baseScale: 1.05,
    baseOpacity: 0.86,
    aspectRatio: 1.32,
    colorMain: '#FF9100',
    colorShade: '#E65100',
  },
  {
    id: 14,
    type: 'rose',
    layer: 'mid',
    xBasePercent: 65,
    yStartOffset: -12,
    fallSpeed: 0.98,
    swayAmplitude: 7.5,
    swayFrequency: 2.3,
    swayPhase: 4.1,
    rotationSpeed: -250,
    baseScale: 1.02,
    baseOpacity: 0.84,
    aspectRatio: 1.4,
    colorMain: '#E91E63',
    colorShade: '#AD1457',
  },
  {
    id: 15,
    type: 'yellow',
    layer: 'mid',
    xBasePercent: 75,
    yStartOffset: -22,
    fallSpeed: 1.08,
    swayAmplitude: 6,
    swayFrequency: 2.9,
    swayPhase: 5.6,
    rotationSpeed: 230,
    baseScale: 0.98,
    baseOpacity: 0.83,
    aspectRatio: 1.22,
    colorMain: '#FFCA28',
    colorShade: '#FF8F00',
  },
  {
    id: 16,
    type: 'saffron',
    layer: 'mid',
    xBasePercent: 85,
    yStartOffset: -15,
    fallSpeed: 1.02,
    swayAmplitude: 7.5,
    swayFrequency: 2.5,
    swayPhase: 0.8,
    rotationSpeed: -270,
    baseScale: 1.05,
    baseOpacity: 0.87,
    aspectRatio: 1.28,
    colorMain: '#FF6D00',
    colorShade: '#DD2C00',
  },
  {
    id: 17,
    type: 'orange',
    layer: 'mid',
    xBasePercent: 10,
    yStartOffset: -28,
    fallSpeed: 1.1,
    swayAmplitude: 8.5,
    swayFrequency: 2.0,
    swayPhase: 2.1,
    rotationSpeed: 290,
    baseScale: 1.08,
    baseOpacity: 0.88,
    aspectRatio: 1.34,
    colorMain: '#FFA726',
    colorShade: '#EF6C00',
  },
  {
    id: 18,
    type: 'saffron',
    layer: 'mid',
    xBasePercent: 20,
    yStartOffset: -32,
    fallSpeed: 0.94,
    swayAmplitude: 6.8,
    swayFrequency: 2.6,
    swayPhase: 3.4,
    rotationSpeed: -210,
    baseScale: 0.96,
    baseOpacity: 0.81,
    aspectRatio: 1.26,
    colorMain: '#FF7A00',
    colorShade: '#E65100',
  },
  {
    id: 19,
    type: 'yellow',
    layer: 'mid',
    xBasePercent: 32,
    yStartOffset: -14,
    fallSpeed: 1.06,
    swayAmplitude: 7.2,
    swayFrequency: 2.4,
    swayPhase: 4.8,
    rotationSpeed: 260,
    baseScale: 1.02,
    baseOpacity: 0.85,
    aspectRatio: 1.24,
    colorMain: '#FFF176',
    colorShade: '#FBC02D',
  },
  {
    id: 20,
    type: 'rose',
    layer: 'mid',
    xBasePercent: 68,
    yStartOffset: -30,
    fallSpeed: 0.97,
    swayAmplitude: 8.2,
    swayFrequency: 2.2,
    swayPhase: 0.3,
    rotationSpeed: -240,
    baseScale: 1.04,
    baseOpacity: 0.83,
    aspectRatio: 1.45,
    colorMain: '#D81B60',
    colorShade: '#880E4F',
  },
  {
    id: 21,
    type: 'orange',
    layer: 'mid',
    xBasePercent: 80,
    yStartOffset: -19,
    fallSpeed: 1.04,
    swayAmplitude: 7.0,
    swayFrequency: 2.7,
    swayPhase: 1.7,
    rotationSpeed: 275,
    baseScale: 1.0,
    baseOpacity: 0.85,
    aspectRatio: 1.3,
    colorMain: '#FF9800',
    colorShade: '#E65100',
  },
  {
    id: 22,
    type: 'saffron',
    layer: 'mid',
    xBasePercent: 90,
    yStartOffset: -26,
    fallSpeed: 1.12,
    swayAmplitude: 7.8,
    swayFrequency: 2.3,
    swayPhase: 3.2,
    rotationSpeed: -285,
    baseScale: 1.06,
    baseOpacity: 0.86,
    aspectRatio: 1.32,
    colorMain: '#FF6D00',
    colorShade: '#DD2C00',
  },
  {
    id: 23,
    type: 'yellow',
    layer: 'mid',
    xBasePercent: 18,
    yStartOffset: -35,
    fallSpeed: 0.92,
    swayAmplitude: 6.2,
    swayFrequency: 3.0,
    swayPhase: 4.4,
    rotationSpeed: 215,
    baseScale: 0.94,
    baseOpacity: 0.8,
    aspectRatio: 1.2,
    colorMain: '#FFD54F',
    colorShade: '#FFA000',
  },
  {
    id: 24,
    type: 'orange',
    layer: 'mid',
    xBasePercent: 28,
    yStartOffset: -21,
    fallSpeed: 1.07,
    swayAmplitude: 7.6,
    swayFrequency: 2.5,
    swayPhase: 5.7,
    rotationSpeed: -265,
    baseScale: 1.03,
    baseOpacity: 0.84,
    aspectRatio: 1.3,
    colorMain: '#FF9100',
    colorShade: '#F57C00',
  },
  {
    id: 25,
    type: 'saffron',
    layer: 'mid',
    xBasePercent: 38,
    yStartOffset: -34,
    fallSpeed: 0.96,
    swayAmplitude: 8.0,
    swayFrequency: 2.1,
    swayPhase: 0.6,
    rotationSpeed: 250,
    baseScale: 1.01,
    baseOpacity: 0.83,
    aspectRatio: 1.33,
    colorMain: '#FF7A00',
    colorShade: '#D65A00',
  },
  {
    id: 26,
    type: 'saffron',
    layer: 'mid',
    xBasePercent: 62,
    yStartOffset: -16,
    fallSpeed: 1.03,
    swayAmplitude: 7.9,
    swayFrequency: 2.3,
    swayPhase: 1.9,
    rotationSpeed: -275,
    baseScale: 1.06,
    baseOpacity: 0.86,
    aspectRatio: 1.38,
    colorMain: '#FF7A00',
    colorShade: '#D65A00',
  },
  {
    id: 27,
    type: 'yellow',
    layer: 'mid',
    xBasePercent: 72,
    yStartOffset: -33,
    fallSpeed: 0.93,
    swayAmplitude: 6.4,
    swayFrequency: 2.8,
    swayPhase: 3.5,
    rotationSpeed: 225,
    baseScale: 0.95,
    baseOpacity: 0.81,
    aspectRatio: 1.25,
    colorMain: '#FFCA28',
    colorShade: '#F57F17',
  },
  {
    id: 28,
    type: 'orange',
    layer: 'mid',
    xBasePercent: 82,
    yStartOffset: -24,
    fallSpeed: 1.09,
    swayAmplitude: 7.4,
    swayFrequency: 2.6,
    swayPhase: 4.7,
    rotationSpeed: -290,
    baseScale: 1.05,
    baseOpacity: 0.85,
    aspectRatio: 1.31,
    colorMain: '#FFA726',
    colorShade: '#E65100',
  },
  {
    id: 29,
    type: 'saffron',
    layer: 'mid',
    xBasePercent: 14,
    yStartOffset: -40,
    fallSpeed: 1.01,
    swayAmplitude: 7.1,
    swayFrequency: 2.4,
    swayPhase: 1.1,
    rotationSpeed: 245,
    baseScale: 0.98,
    baseOpacity: 0.82,
    aspectRatio: 1.29,
    colorMain: '#FF7A00',
    colorShade: '#E65100',
  },
  {
    id: 30,
    type: 'yellow',
    layer: 'mid',
    xBasePercent: 24,
    yStartOffset: -27,
    fallSpeed: 1.05,
    swayAmplitude: 6.7,
    swayFrequency: 2.7,
    swayPhase: 2.6,
    rotationSpeed: -255,
    baseScale: 1.0,
    baseOpacity: 0.84,
    aspectRatio: 1.23,
    colorMain: '#FFD54F',
    colorShade: '#FFA000',
  },
  {
    id: 31,
    type: 'rose',
    layer: 'mid',
    xBasePercent: 76,
    yStartOffset: -38,
    fallSpeed: 0.95,
    swayAmplitude: 8.3,
    swayFrequency: 2.2,
    swayPhase: 3.9,
    rotationSpeed: 265,
    baseScale: 1.03,
    baseOpacity: 0.83,
    aspectRatio: 1.41,
    colorMain: '#E91E63',
    colorShade: '#AD1457',
  },
  {
    id: 32,
    type: 'orange',
    layer: 'mid',
    xBasePercent: 86,
    yStartOffset: -31,
    fallSpeed: 1.08,
    swayAmplitude: 7.7,
    swayFrequency: 2.5,
    swayPhase: 5.1,
    rotationSpeed: -280,
    baseScale: 1.04,
    baseOpacity: 0.85,
    aspectRatio: 1.33,
    colorMain: '#FF9100',
    colorShade: '#F57C00',
  },
  {
    id: 33,
    type: 'saffron',
    layer: 'mid',
    xBasePercent: 30,
    yStartOffset: -42,
    fallSpeed: 0.99,
    swayAmplitude: 7.3,
    swayFrequency: 2.3,
    swayPhase: 0.5,
    rotationSpeed: 235,
    baseScale: 0.97,
    baseOpacity: 0.82,
    aspectRatio: 1.28,
    colorMain: '#FF6D00',
    colorShade: '#DD2C00',
  },
  {
    id: 34,
    type: 'yellow',
    layer: 'mid',
    xBasePercent: 70,
    yStartOffset: -29,
    fallSpeed: 1.07,
    swayAmplitude: 6.9,
    swayFrequency: 2.8,
    swayPhase: 2.3,
    rotationSpeed: -270,
    baseScale: 1.02,
    baseOpacity: 0.84,
    aspectRatio: 1.26,
    colorMain: '#FFCA28',
    colorShade: '#FF8F00',
  },

  // --- BACKGROUND LAYER (14 Quieter, smaller petals in deep sanctuary alcove) ---
  {
    id: 35,
    type: 'saffron',
    layer: 'bg',
    xBasePercent: 12,
    yStartOffset: -15,
    fallSpeed: 0.85,
    swayAmplitude: 5.5,
    swayFrequency: 2.5,
    swayPhase: 0.7,
    rotationSpeed: 180,
    baseScale: 0.72,
    baseOpacity: 0.65,
    aspectRatio: 1.25,
    colorMain: '#FF7A00',
    colorShade: '#D65A00',
  },
  {
    id: 36,
    type: 'yellow',
    layer: 'bg',
    xBasePercent: 22,
    yStartOffset: -25,
    fallSpeed: 0.88,
    swayAmplitude: 5.0,
    swayFrequency: 2.8,
    swayPhase: 1.9,
    rotationSpeed: -190,
    baseScale: 0.7,
    baseOpacity: 0.62,
    aspectRatio: 1.2,
    colorMain: '#FFD54F',
    colorShade: '#F57F17',
  },
  {
    id: 37,
    type: 'orange',
    layer: 'bg',
    xBasePercent: 32,
    yStartOffset: -32,
    fallSpeed: 0.82,
    swayAmplitude: 5.8,
    swayFrequency: 2.2,
    swayPhase: 3.3,
    rotationSpeed: 170,
    baseScale: 0.74,
    baseOpacity: 0.66,
    aspectRatio: 1.3,
    colorMain: '#FF9100',
    colorShade: '#E65100',
  },
  {
    id: 38,
    type: 'rose',
    layer: 'bg',
    xBasePercent: 68,
    yStartOffset: -18,
    fallSpeed: 0.86,
    swayAmplitude: 6.0,
    swayFrequency: 2.4,
    swayPhase: 4.6,
    rotationSpeed: -200,
    baseScale: 0.73,
    baseOpacity: 0.63,
    aspectRatio: 1.35,
    colorMain: '#E91E63',
    colorShade: '#AD1457',
  },
  {
    id: 39,
    type: 'saffron',
    layer: 'bg',
    xBasePercent: 78,
    yStartOffset: -28,
    fallSpeed: 0.84,
    swayAmplitude: 5.2,
    swayFrequency: 2.7,
    swayPhase: 5.8,
    rotationSpeed: 175,
    baseScale: 0.71,
    baseOpacity: 0.64,
    aspectRatio: 1.26,
    colorMain: '#FF6D00',
    colorShade: '#DD2C00',
  },
  {
    id: 40,
    type: 'yellow',
    layer: 'bg',
    xBasePercent: 88,
    yStartOffset: -20,
    fallSpeed: 0.87,
    swayAmplitude: 5.4,
    swayFrequency: 2.6,
    swayPhase: 1.3,
    rotationSpeed: -185,
    baseScale: 0.69,
    baseOpacity: 0.61,
    aspectRatio: 1.22,
    colorMain: '#FFCA28',
    colorShade: '#FF8F00',
  },
  {
    id: 41,
    type: 'orange',
    layer: 'bg',
    xBasePercent: 16,
    yStartOffset: -38,
    fallSpeed: 0.83,
    swayAmplitude: 5.7,
    swayFrequency: 2.3,
    swayPhase: 2.7,
    rotationSpeed: 195,
    baseScale: 0.75,
    baseOpacity: 0.67,
    aspectRatio: 1.32,
    colorMain: '#FFA726',
    colorShade: '#EF6C00',
  },
  {
    id: 42,
    type: 'orange',
    layer: 'bg',
    xBasePercent: 26,
    yStartOffset: -45,
    fallSpeed: 0.81,
    swayAmplitude: 6.2,
    swayFrequency: 2.1,
    swayPhase: 3.9,
    rotationSpeed: -165,
    baseScale: 0.72,
    baseOpacity: 0.62,
    aspectRatio: 1.4,
    colorMain: '#FFA726',
    colorShade: '#EF6C00',
  },
  {
    id: 43,
    type: 'saffron',
    layer: 'bg',
    xBasePercent: 74,
    yStartOffset: -36,
    fallSpeed: 0.86,
    swayAmplitude: 5.3,
    swayFrequency: 2.6,
    swayPhase: 5.0,
    rotationSpeed: 185,
    baseScale: 0.74,
    baseOpacity: 0.65,
    aspectRatio: 1.27,
    colorMain: '#FF7A00',
    colorShade: '#E65100',
  },
  {
    id: 44,
    type: 'yellow',
    layer: 'bg',
    xBasePercent: 84,
    yStartOffset: -42,
    fallSpeed: 0.85,
    swayAmplitude: 5.1,
    swayFrequency: 2.9,
    swayPhase: 0.4,
    rotationSpeed: -175,
    baseScale: 0.7,
    baseOpacity: 0.61,
    aspectRatio: 1.21,
    colorMain: '#FFF176',
    colorShade: '#FBC02D',
  },
  {
    id: 45,
    type: 'orange',
    layer: 'bg',
    xBasePercent: 20,
    yStartOffset: -48,
    fallSpeed: 0.82,
    swayAmplitude: 5.6,
    swayFrequency: 2.4,
    swayPhase: 1.8,
    rotationSpeed: 170,
    baseScale: 0.73,
    baseOpacity: 0.64,
    aspectRatio: 1.3,
    colorMain: '#FF9800',
    colorShade: '#E65100',
  },
  {
    id: 46,
    type: 'saffron',
    layer: 'bg',
    xBasePercent: 80,
    yStartOffset: -46,
    fallSpeed: 0.84,
    swayAmplitude: 5.4,
    swayFrequency: 2.5,
    swayPhase: 3.1,
    rotationSpeed: -190,
    baseScale: 0.71,
    baseOpacity: 0.63,
    aspectRatio: 1.28,
    colorMain: '#FF6D00',
    colorShade: '#DD2C00',
  },
  {
    id: 47,
    type: 'yellow',
    layer: 'bg',
    xBasePercent: 30,
    yStartOffset: -50,
    fallSpeed: 0.88,
    swayAmplitude: 5.0,
    swayFrequency: 2.8,
    swayPhase: 4.3,
    rotationSpeed: 180,
    baseScale: 0.68,
    baseOpacity: 0.6,
    aspectRatio: 1.23,
    colorMain: '#FFD54F',
    colorShade: '#FFA000',
  },
  {
    id: 48,
    type: 'rose',
    layer: 'bg',
    xBasePercent: 70,
    yStartOffset: -52,
    fallSpeed: 0.83,
    swayAmplitude: 6.1,
    swayFrequency: 2.2,
    swayPhase: 5.4,
    rotationSpeed: -170,
    baseScale: 0.72,
    baseOpacity: 0.62,
    aspectRatio: 1.39,
    colorMain: '#EF5350',
    colorShade: '#C62828',
  },
];

export type DeviceTier = 'desktop' | 'tablet' | 'mobile';

/**
 * Filter petals according to device performance tier and layer.
 * Desktop: all 48 seeded petals (10 fg, 24 mid, 14 bg)
 * Tablet: 22 petals (5 fg, 11 mid, 6 bg) maintaining ~55% saffron/orange, ~30% yellow, ~15% rose
 * Mobile: 14 petals (3 fg, 7 mid, 4 bg) maintaining ~55% saffron/orange, ~30% yellow, ~15% rose
 */
export function getResponsivePetals(
  layer: 'all' | 'bg' | 'mid' | 'fg' = 'all',
  tier: DeviceTier = 'desktop'
): PetalDefinition[] {
  let petals = SEEDED_PETALS;
  if (tier === 'tablet') {
    // Select deterministic subset for tablet (22 petals)
    // fg: 5 petals (ids: 1, 2, 3, 4, 8)
    // mid: 11 petals (ids: 11, 12, 13, 14, 15, 16, 17, 20, 21, 26, 31)
    // bg: 6 petals (ids: 35, 36, 37, 38, 39, 43)
    const tabletIds = new Set([1, 2, 3, 4, 8, 11, 12, 13, 14, 15, 16, 17, 20, 21, 26, 31, 35, 36, 37, 38, 39, 43]);
    petals = SEEDED_PETALS.filter((p) => tabletIds.has(p.id));
  } else if (tier === 'mobile') {
    // Select deterministic subset for mobile (14 petals)
    // fg: 3 petals (ids: 1, 2, 3)
    // mid: 7 petals (ids: 11, 12, 13, 14, 15, 16, 20)
    // bg: 4 petals (ids: 35, 36, 37, 38)
    const mobileIds = new Set([1, 2, 3, 11, 12, 13, 14, 15, 16, 20, 35, 36, 37, 38]);
    petals = SEEDED_PETALS.filter((p) => mobileIds.has(p.id));
  }

  if (layer === 'all') return petals;
  return petals.filter((p) => p.layer === layer);
}

/**
 * Calculates deterministic staggered receding state for an individual petal.
 * Petals fade at slightly different progress values between 65% and 98%
 * rather than vanishing simultaneously, producing a natural ceremonial dissolution.
 */
export function calculatePetalRecedeState(
  petalId: number,
  ceremonyProgress: number
): { recedingFactor: number; individualOpacity: number } {
  if (ceremonyProgress <= 0.65) {
    return { recedingFactor: 0, individualOpacity: 1 };
  }

  // Deterministic seed offset per petal so receding starts progressively between 0.65 and 0.80
  const offset = ((petalId * 7) % 13) * 0.012; // 0.000 to 0.144
  const recedeStart = 0.65 + offset; // 0.650 to 0.794
  const recedeEnd = Math.min(0.98, recedeStart + 0.15 + ((petalId * 3) % 7) * 0.01); // 0.800 to 0.980

  if (ceremonyProgress < recedeStart) {
    return { recedingFactor: 0, individualOpacity: 1 };
  }

  if (ceremonyProgress >= recedeEnd) {
    return { recedingFactor: 1, individualOpacity: 0 };
  }

  const t = (ceremonyProgress - recedeStart) / (recedeEnd - recedeStart);
  return {
    recedingFactor: t,
    individualOpacity: Math.max(0, 1 - t),
  };
}

export interface CeremonialState {
  flowerShowerActive: boolean;
  globalPetalOpacity: number;
  goldenWarmthOpacity: number;
  recedingFactor: number; // 0 (crisp foreground) to 1 (receding into background)
  statusKey: 'curtainsClosed' | 'curtainsOpening' | 'divineRevealed' | 'flowerShower' | 'curtainsClosing';
}

/**
 * Calculates the exact ceremonial timeline as specified:
 * - 0%–15%: Curtains fully open; deity revealed clearly
 * - 15%–40%: Flower shower begins and increases gradually
 * - 40%–65%: Beautiful flower shower and subtle golden warmth (overlay opacity 0.10–0.16)
 * - 65%–85%: Petals drift farther into the background, becoming smaller and less saturated
 * - 85%–100%: Petals dissolve completely; golden glow gently disappears
 *
 * Outside ceremonial range or when curtains are not open, returns zeroed state.
 * Fully deterministic and reversible.
 */
export function calculateCeremonyTimeline(ceremonyProgress: number): CeremonialState {
  const p = Math.max(0, Math.min(1, ceremonyProgress));

  let flowerShowerActive = false;
  let globalPetalOpacity = 0;
  let goldenWarmthOpacity = 0;
  let recedingFactor = 0;
  let statusKey: CeremonialState['statusKey'] = 'divineRevealed';

  if (p < 0.15) {
    // 0% - 15%: Deity revealed clearly; quiet reverent darshan
    flowerShowerActive = false;
    globalPetalOpacity = 0;
    goldenWarmthOpacity = 0.04 * (p / 0.15); // gentle initial warming 0 -> 0.04
    recedingFactor = 0;
    statusKey = 'divineRevealed';
  } else if (p < 0.40) {
    // 15% - 40%: Flower shower begins and increases gradually
    flowerShowerActive = true;
    const t = (p - 0.15) / 0.25; // 0 to 1
    globalPetalOpacity = 0.2 + t * 0.8; // 0.2 -> 1.0
    goldenWarmthOpacity = 0.04 + t * 0.10; // 0.04 -> 0.14
    recedingFactor = 0;
    statusKey = 'flowerShower';
  } else if (p <= 0.65) {
    // 40% - 65%: Peak ceremonial flower shower & golden illumination
    flowerShowerActive = true;
    globalPetalOpacity = 1.0;
    goldenWarmthOpacity = 0.14; // Peak golden overlay opacity (within 0.10 - 0.16)
    recedingFactor = 0;
    statusKey = 'flowerShower';
  } else if (p < 0.85) {
    // 65% - 85%: Petals drift into background, becoming smaller, less saturated, and fading
    flowerShowerActive = true;
    const t = (p - 0.65) / 0.20; // 0 to 1
    globalPetalOpacity = 1.0 - t * 0.72; // 1.0 -> 0.28
    goldenWarmthOpacity = 0.14 - t * 0.09; // 0.14 -> 0.05
    recedingFactor = t; // 0 -> 1
    statusKey = 'flowerShower';
  } else {
    // 85% - 100%: Petals dissolve completely; golden glow gently disappears
    flowerShowerActive = false;
    const t = (p - 0.85) / 0.15; // 0 to 1
    const remaining = Math.max(0, 1 - t);
    globalPetalOpacity = 0.28 * Math.pow(remaining, 1.2); // 0.28 -> 0.0
    goldenWarmthOpacity = 0.05 * remaining; // 0.05 -> 0.0
    recedingFactor = 1.0;
    statusKey = 'divineRevealed';
  }

  return {
    flowerShowerActive,
    globalPetalOpacity,
    goldenWarmthOpacity,
    recedingFactor,
    statusKey,
  };
}

export interface DivineFlowerShowerProps {
  ceremonyProgress: number; // 0.0 to 1.0 during the open interval
  layer?: 'all' | 'bg' | 'mid' | 'fg';
  reducedMotion?: boolean;
}

/**
 * DivineFlowerShower Component
 *
 * Renders realistic Indian temple flower petals (marigold and rose) with:
 * - 3 distinct depth layers (foreground, midground, background)
 * - Clear central column protecting Shri Dwarkadhish's sacred face
 * - Saffron, orange, yellow, and soft rose color palette
 * - Deterministic, reversible scroll-synchronized trajectory
 * - Receding into background phase with desaturation, size reduction, and dissolve
 */
export const DivineFlowerShower: React.FC<DivineFlowerShowerProps> = ({
  ceremonyProgress,
  layer = 'all',
  reducedMotion = false,
}) => {
  const [tier, setTier] = useState<DeviceTier>('desktop');

  useEffect(() => {
    const updateTier = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setTier('mobile');
      } else if (width < 1024) {
        setTier('tablet');
      } else {
        setTier('desktop');
      }
    };
    updateTier();
    window.addEventListener('resize', updateTier, { passive: true });
    return () => window.removeEventListener('resize', updateTier);
  }, []);

  const state = useMemo(
    () => calculateCeremonyTimeline(ceremonyProgress),
    [ceremonyProgress]
  );

  const filteredPetals = useMemo(() => {
    return getResponsivePetals(layer, tier);
  }, [layer, tier]);

  // If petals are dissolved or reduced motion is active, do not render falling shower
  if (state.globalPetalOpacity <= 0.005 || reducedMotion) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
      data-testid={`flower-shower-${layer}`}
    >
      {filteredPetals.map((petal) => {
        // Individual petal receding factor and opacity
        const recedeInfo = calculatePetalRecedeState(petal.id, ceremonyProgress);
        const petalEffectiveRecede = recedeInfo.recedingFactor;
        const individualOpacity = recedeInfo.individualOpacity;

        // Skip completely dissolved petals
        if (individualOpacity <= 0.005) {
          return null;
        }

        // Calculate deterministic position from ceremonyProgress
        // Petals begin descending once ceremonyProgress passes 0.12
        const effectiveT = Math.max(0, (ceremonyProgress - 0.12) / 0.88);
        
        // Travel down: y from yStartOffset% down past bottom (up to 135%)
        const totalTravel = 135;
        const currentY = petal.yStartOffset + effectiveT * totalTravel * petal.fallSpeed;

        // Sideways sway: sinusoidal based on y progress and fixed frequency
        const swayPhase = (currentY / 100) * petal.swayFrequency * Math.PI * 2 + petal.swayPhase;
        const currentX = petal.xBasePercent + Math.sin(swayPhase) * petal.swayAmplitude;

        // 3D rotation and tumble
        const rotationDeg = (currentY / 100) * petal.rotationSpeed;
        const tiltXDeg = Math.sin(swayPhase * 1.5) * 45;

        // Receding effect (65% to 100%): shrink, desaturate, blur
        const scaleFactor = 1.0 - petalEffectiveRecede * 0.45;
        const scale = petal.baseScale * scaleFactor;
        const blurPx = petalEffectiveRecede * 2.2;
        const saturatePercent = Math.max(25, 100 - petalEffectiveRecede * 75);
        const opacity = petal.baseOpacity * state.globalPetalOpacity * individualOpacity;

        // Petal dimensions (responsive base size: ~14px to 24px)
        const baseWidth = petal.layer === 'fg' ? 18 : petal.layer === 'mid' ? 14 : 10;
        const baseHeight = baseWidth * petal.aspectRatio;

        return (
          <div
            key={petal.id}
            data-petal-id={petal.id}
            data-petal-type={petal.type}
            className="absolute pointer-events-none will-change-transform"
            style={{
              left: `${currentX.toFixed(2)}%`,
              top: `${currentY.toFixed(2)}%`,
              width: `${baseWidth}px`,
              height: `${baseHeight}px`,
              transform: `translate(-50%, -50%) rotate(${rotationDeg.toFixed(1)}deg) rotateX(${tiltXDeg.toFixed(1)}deg) scale(${scale.toFixed(2)})`,
              opacity: opacity.toFixed(3),
              filter: `saturate(${saturatePercent.toFixed(0)}%) blur(${blurPx.toFixed(1)}px)`,
            }}
          >
            {/* SVG Organic Petal Path with Shading */}
            <svg
              viewBox="0 0 20 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-[0_2px_4px_rgba(40,15,5,0.45)]"
            >
              <defs>
                <linearGradient id={`petalGrad-${petal.id}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={petal.colorMain} />
                  <stop offset="60%" stopColor={petal.colorMain} />
                  <stop offset="100%" stopColor={petal.colorShade} />
                </linearGradient>
              </defs>
              {/* Organic curved petal shape with delicate tip and soft base */}
              <path
                d="M 10,0 C 16,3 20,11 19,19 C 18,25 13,28 10,28 C 7,28 2,25 1,19 C 0,11 4,3 10,0 Z"
                fill={`url(#petalGrad-${petal.id})`}
              />
              {/* Subtle natural central vein line */}
              <path
                d="M 10,4 Q 10.5,14 10,24"
                stroke={petal.colorShade}
                strokeWidth="0.7"
                strokeLinecap="round"
                opacity="0.6"
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
};
