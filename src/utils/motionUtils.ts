/**
 * Utility functions for cinematic card lighting, 3D tilt calculations,
 * and responsive bounds. Pure mathematical functions decoupled for deterministic unit testing.
 */

export interface CardTiltResult {
  xPercent: number;
  yPercent: number;
  rotateX: number;
  rotateY: number;
  translateZ: number;
}

/**
 * Calculates normalized mouse coordinates (0% to 100%) and restrained 3D tilt angles.
 * Maximum tilt is restrained to 2.0-3.0 degrees as per design specification.
 */
export function calculateCardTiltAndLight(
  rect: { left: number; top: number; width: number; height: number },
  clientX: number,
  clientY: number,
  maxTiltDegrees = 2.5
): CardTiltResult {
  if (rect.width <= 0 || rect.height <= 0) {
    return {
      xPercent: 50,
      yPercent: 50,
      rotateX: 0,
      rotateY: 0,
      translateZ: 0,
    };
  }

  // Calculate mouse position relative to card boundaries
  const relativeX = clientX - rect.left;
  const relativeY = clientY - rect.top;

  // Clamp within 0% - 100%
  const clampedX = Math.max(0, Math.min(rect.width, relativeX));
  const clampedY = Math.max(0, Math.min(rect.height, relativeY));

  const xPercent = Number(((clampedX / rect.width) * 100).toFixed(2));
  const yPercent = Number(((clampedY / rect.height) * 100).toFixed(2));

  // Normalized offset from center: -1.0 (left/top) to +1.0 (right/bottom)
  const normX = (clampedX / rect.width - 0.5) * 2;
  const normY = (clampedY / rect.height - 0.5) * 2;

  // When pointer is on top (normY < 0), card tilts backward (rotateX > 0)
  // When pointer is on bottom (normY > 0), card tilts forward (rotateX < 0)
  const rotateX = Number((-normY * maxTiltDegrees).toFixed(2));

  // When pointer is on right (normX > 0), card rotates right (rotateY > 0)
  const rotateY = Number((normX * maxTiltDegrees).toFixed(2));

  return {
    xPercent,
    yPercent,
    rotateX,
    rotateY,
    translateZ: 4, // subtle 4px elevation
  };
}

/**
 * Returns a CSS transform string for 3D card tilt and lift.
 */
export function getCardTransformString(
  tilt: { rotateX: number; rotateY: number; translateZ: number },
  isActive: boolean
): string {
  if (!isActive) {
    return 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  }
  return `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateZ(${tilt.translateZ}px)`;
}
