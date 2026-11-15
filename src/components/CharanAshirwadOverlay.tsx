import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ASHIRWAD_CEREMONY_DURATION_MS,
  ASHIRWAD_HAND_POS,
  LOTUS_FEET_POS,
  calculateAshirwadBeamVector,
  calculateAshirwadEnvelope,
  generateAshishMotes,
  generateEverywherePetals,
} from '../utils/ashirwadCeremonyUtils';
import { useI18n } from '../i18n/I18nContext';

export interface EverywhereFlowerCanvasProps {
  triggerId: number;
  active: boolean;
  reducedMotion?: boolean;
}

type FlowerSpriteKey =
  | 'marigoldSaffron'
  | 'marigoldYellow'
  | 'marigoldPetal'
  | 'roseCrimson'
  | 'rosePink'
  | 'mograWhite';

type FlowerSpriteBank = Record<FlowerSpriteKey, HTMLCanvasElement>;

/**
 * Pre-renders photorealistic multi-layered botanical flower sprites once per session
 * into small offscreen canvases (64x64 / 48x56) so Canvas2D blits real marigold florets,
 * veined velvet rose petals, and jasmine blossoms at 60fps on mobile and desktop.
 */
function createRealFlowerSprites(): FlowerSpriteBank {
  const makeCanvas = (size: number) => {
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    return c;
  };

  // Helper to paint an authentic multi-ring ruffled marigold (Genda Phool)
  const buildMarigold = (
    outerColor: string,
    midColor: string,
    innerColor: string,
    coreColor: string
  ): HTMLCanvasElement => {
    const size = 72;
    const c = makeCanvas(size);
    const ctx = c.getContext('2d')!;
    const cx = size / 2;
    const cy = size / 2;

    // Soft ambient shadow beneath flower layers
    ctx.save();
    ctx.translate(cx, cy);

    const drawRing = (petals: number, radius: number, petalW: number, colorA: string, colorB: string, offsetAngle: number) => {
      for (let i = 0; i < petals; i++) {
        const ang = (i / petals) * Math.PI * 2 + offsetAngle;
        ctx.save();
        ctx.rotate(ang);
        const grad = ctx.createLinearGradient(0, 0, radius, 0);
        grad.addColorStop(0, colorA);
        grad.addColorStop(0.65, colorB);
        grad.addColorStop(1, colorB);
        ctx.fillStyle = grad;

        ctx.beginPath();
        ctx.moveTo(2, -petalW * 0.25);
        ctx.bezierCurveTo(radius * 0.45, -petalW, radius * 0.88, -petalW * 0.72, radius, -petalW * 0.22);
        // Natural notched marigold tip
        ctx.lineTo(radius * 0.91, 0);
        ctx.lineTo(radius, petalW * 0.22);
        ctx.bezierCurveTo(radius * 0.88, petalW * 0.72, radius * 0.45, petalW, 2, petalW * 0.25);
        ctx.closePath();
        ctx.fill();

        // Subtle dark fold crease between overlapping florets
        ctx.strokeStyle = 'rgba(90, 24, 0, 0.22)';
        ctx.lineWidth = 0.75;
        ctx.stroke();
        ctx.restore();
      }
    };

    drawRing(14, 31, 9.5, coreColor, outerColor, 0);
    drawRing(12, 24, 8.2, outerColor, midColor, 0.22);
    drawRing(9, 15.5, 6.2, midColor, innerColor, 0.41);

    // Rich botanical floret center core
    const cg = ctx.createRadialGradient(0, 0, 1, 0, 0, 8.5);
    cg.addColorStop(0, '#5A1B00');
    cg.addColorStop(0.55, coreColor);
    cg.addColorStop(1, midColor);
    ctx.fillStyle = cg;
    ctx.beginPath();
    ctx.arc(0, 0, 7.5, 0, Math.PI * 2);
    ctx.fill();

    // Fine pollen dots
    ctx.fillStyle = innerColor;
    for (let k = 0; k < 7; k++) {
      const a = (k / 7) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(Math.cos(a) * 3.5, Math.sin(a) * 3.5, 1.1, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
    return c;
  };

  // Loose ruffled saffron marigold petal floret
  const buildLooseMarigoldPetal = (): HTMLCanvasElement => {
    const size = 54;
    const c = makeCanvas(size);
    const ctx = c.getContext('2d')!;
    const cx = size / 2;
    const cy = size / 2;
    ctx.translate(cx, cy);

    const grad = ctx.createLinearGradient(0, 18, 0, -20);
    grad.addColorStop(0, '#9E2A00');
    grad.addColorStop(0.45, '#E65100');
    grad.addColorStop(0.85, '#FF8F00');
    grad.addColorStop(1, '#FFB74D');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0, 18);
    ctx.bezierCurveTo(-13, 8, -15, -10, -7, -18);
    ctx.quadraticCurveTo(-2, -14, 0, -19);
    ctx.quadraticCurveTo(2, -14, 7, -18);
    ctx.bezierCurveTo(15, -10, 13, 8, 0, 18);
    ctx.closePath();
    ctx.fill();

    // Botanical longitudinal ridges
    ctx.strokeStyle = 'rgba(110, 28, 0, 0.25)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(0, 15);
    ctx.quadraticCurveTo(-3, 0, -4, -14);
    ctx.moveTo(0, 15);
    ctx.quadraticCurveTo(3, 0, 4, -14);
    ctx.stroke();

    return c;
  };

  // Curled velvet Rose Petal with delicate veins & pale attachment claw
  const buildRosePetal = (claw: string, deep: string, mid: string, edge: string): HTMLCanvasElement => {
    const size = 60;
    const c = makeCanvas(size);
    const ctx = c.getContext('2d')!;
    const cx = size / 2;
    const cy = size / 2;
    ctx.translate(cx, cy);

    const grad = ctx.createRadialGradient(-2, 16, 2, 0, -2, 27);
    grad.addColorStop(0, claw);
    grad.addColorStop(0.22, mid);
    grad.addColorStop(0.76, deep);
    grad.addColorStop(1, edge);

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(-2, 20);
    ctx.bezierCurveTo(-18, 12, -23, -6, -13, -18);
    ctx.bezierCurveTo(-5, -24, 3, -19, 8, -17);
    ctx.bezierCurveTo(21, -12, 20, 9, 4, 20);
    ctx.closePath();
    ctx.fill();

    // Subtle curled inner rim shadow for 3D velvet curvature
    ctx.strokeStyle = 'rgba(255, 228, 236, 0.35)';
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.moveTo(-13, -17);
    ctx.bezierCurveTo(-4, -22, 4, -18, 11, -14);
    ctx.stroke();

    // Delicate botanical branching veins
    ctx.strokeStyle = 'rgba(72, 6, 24, 0.16)';
    ctx.lineWidth = 0.7;
    for (const curveX of [-6, 0, 6]) {
      ctx.beginPath();
      ctx.moveTo(0, 18);
      ctx.quadraticCurveTo(curveX * 0.8, 1, curveX * 1.6, -13);
      ctx.stroke();
    }

    return c;
  };

  // Fresh 6-petal Mogra / Jasmine white temple blossom
  const buildMograFlower = (): HTMLCanvasElement => {
    const size = 56;
    const c = makeCanvas(size);
    const ctx = c.getContext('2d')!;
    const cx = size / 2;
    const cy = size / 2;
    ctx.translate(cx, cy);

    for (let i = 0; i < 6; i++) {
      ctx.save();
      ctx.rotate((i / 6) * Math.PI * 2 + 0.15);
      const pg = ctx.createLinearGradient(0, 0, 0, -22);
      pg.addColorStop(0, '#E9DFC5');
      pg.addColorStop(0.35, '#FAF7F0');
      pg.addColorStop(1, '#FFFFFF');
      ctx.fillStyle = pg;
      ctx.beginPath();
      ctx.moveTo(0, -1);
      ctx.bezierCurveTo(-8.5, -6, -8.5, -18, 0, -22);
      ctx.bezierCurveTo(8.5, -18, 8.5, -6, 0, -1);
      ctx.fill();
      ctx.strokeStyle = 'rgba(180, 165, 130, 0.25)';
      ctx.lineWidth = 0.6;
      ctx.stroke();
      ctx.restore();
    }

    const heart = ctx.createRadialGradient(0, 0, 0, 0, 0, 5.5);
    heart.addColorStop(0, '#D49B27');
    heart.addColorStop(0.7, '#E8C55B');
    heart.addColorStop(1, 'rgba(232, 197, 91, 0)');
    ctx.fillStyle = heart;
    ctx.beginPath();
    ctx.arc(0, 0, 5.5, 0, Math.PI * 2);
    ctx.fill();

    return c;
  };

  return {
    marigoldSaffron: buildMarigold('#D84315', '#FF6F00', '#FFA726', '#7A2000'),
    marigoldYellow: buildMarigold('#E68A00', '#FFB300', '#FFE066', '#8A4B00'),
    marigoldPetal: buildLooseMarigoldPetal(),
    roseCrimson: buildRosePetal('#FBE4DE', '#880E2D', '#C21845', '#E93B6B'),
    rosePink: buildRosePetal('#FFF0F5', '#AD1457', '#D83B78', '#F48FB1'),
    mograWhite: buildMograFlower(),
  };
}

/**
 * Full-alcove GPU/Canvas2D 3.6s Pushpa Varsha & Ashish Light Motes layer.
 * Renders real botanical marigold flowers, velvet crimson & pink rose petals, and fresh
 * mogra jasmine blossoms raining smoothly from top, sides, and blessing aura, while
 * delicate golden ashish motes drift down from Lord Dwarkadhish's blessing palm to His feet.
 */
export const EverywhereFlowerCanvas: React.FC<EverywhereFlowerCanvasProps> = ({
  triggerId,
  active,
  reducedMotion = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const spriteBankRef = useRef<FlowerSpriteBank | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active || triggerId === 0 || reducedMotion) {
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!spriteBankRef.current) {
      spriteBankRef.current = createRealFlowerSprites();
    }
    const sprites = spriteBankRef.current;

    const petals = generateEverywherePetals(isMobile);
    const motes = generateAshishMotes(isMobile);

    let rafId = 0;
    let startTime: number | null = null;

    const drawFrame = (now: number) => {
      if (startTime === null) {
        startTime = now - 16;
      }

      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetW = Math.max(1, Math.round(rect.width * dpr));
      const targetH = Math.max(1, Math.round(rect.height * dpr));

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      const w = rect.width;
      const h = rect.height;
      const elapsedMs = Math.max(16, now - startTime);
      const envelope = calculateAshirwadEnvelope(elapsedMs, ASHIRWAD_CEREMONY_DURATION_MS);

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      if (!envelope.active) {
        ctx.restore();
        return;
      }

      // 1. Delicate golden Ashish light stardust streaming softly down the Ashirwad beam
      if (envelope.ashirwadLightIntensity > 0.01) {
        const startX = (ASHIRWAD_HAND_POS.xPercent / 100) * w;
        const startY = (ASHIRWAD_HAND_POS.yPercent / 100) * h;
        const endX = (LOTUS_FEET_POS.xPercent / 100) * w;
        const endY = (LOTUS_FEET_POS.yPercent / 100) * h;

        for (const mote of motes) {
          const cycleT = ((elapsedMs / 1000) * mote.speed + mote.phase) % 1;
          const easeT = cycleT * cycleT * (3 - 2 * cycleT);
          const coneSpread = (8 + easeT * 46) * (isMobile ? 0.85 : 1.0);
          const mx =
            startX +
            (endX - startX) * easeT +
            mote.laneOffset * coneSpread +
            Math.sin(cycleT * Math.PI * 3 + mote.id) * 5;
          const my = startY + (endY - startY) * easeT;

          const moteAlpha =
            Math.sin(cycleT * Math.PI) * envelope.ashirwadLightIntensity * 0.72;
          if (moteAlpha <= 0.02) continue;

          const r = Math.min(2.2, mote.radiusPx * 0.65);
          ctx.globalAlpha = moteAlpha;
          const grad = ctx.createRadialGradient(mx, my, 0, mx, my, r * 2.4);
          grad.addColorStop(0, '#FFFFFF');
          grad.addColorStop(0.45, '#FFE8A3');
          grad.addColorStop(1, 'rgba(255, 195, 70, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(mx, my, r * 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2. Real Botanical Pushpa Varsha (Whole Marigolds, Rose Petals, Mogra Flowers)
      const tGlobal = elapsedMs / 1000;
      for (const p of petals) {
        const delaySec = p.delayFrac * (ASHIRWAD_CEREMONY_DURATION_MS / 1000);
        const localSec = tGlobal - delaySec;
        if (localSec <= 0) continue;

        const lifeFrac = localSec / ((ASHIRWAD_CEREMONY_DURATION_MS / 1000) - delaySec * 0.4);
        const edgeFade =
          lifeFrac < 0.08
            ? lifeFrac / 0.08
            : lifeFrac > 0.85
            ? Math.max(0, 1 - (lifeFrac - 0.85) / 0.15)
            : 1;
        const alpha = envelope.flowerShowerIntensity * edgeFade * 0.96;
        if (alpha <= 0.02) continue;

        const pxNorm =
          p.x0 +
          p.vx * localSec +
          Math.sin(localSec * p.swayFreq + p.phase) * p.swayAmp;
        const pyNorm =
          p.y0 + p.vy * localSec + 0.5 * p.gravity * localSec * localSec;

        if (pyNorm > 1.08 || pxNorm < -0.12 || pxNorm > 1.12) continue;

        const cx = pxNorm * w;
        const cy = pyNorm * h;

        // Gentle clarity veil exclusively over Lord Dwarkadhish's eyes/face
        const faceDx = (pxNorm - 0.505) / 0.075;
        const faceDy = (pyNorm - 0.285) / 0.065;
        const faceDistSq = faceDx * faceDx + faceDy * faceDy;
        const faceClarityFactor = faceDistSq < 1 ? 0.22 + 0.78 * faceDistSq : 1;

        let sprite: HTMLCanvasElement;
        let drawSize = p.sizePx * (isMobile ? 2.25 : 2.35);

        if (p.kind === 'marigold') {
          if (p.id % 3 === 0) {
            sprite = sprites.marigoldYellow;
            drawSize *= 1.05;
          } else if (p.id % 4 === 1) {
            sprite = sprites.marigoldPetal;
            drawSize *= 0.92;
          } else {
            sprite = sprites.marigoldSaffron;
            drawSize *= 1.08;
          }
        } else if (p.kind === 'rosePetal') {
          sprite = p.id % 3 === 0 ? sprites.rosePink : sprites.roseCrimson;
          drawSize *= 0.96;
        } else if (p.kind === 'mogra' || p.kind === 'goldenSparkle') {
          sprite = p.id % 2 === 0 ? sprites.mograWhite : sprites.marigoldPetal;
          drawSize *= 0.86;
        } else {
          sprite = sprites.marigoldSaffron;
        }

        const angleRad = ((p.rotation0 + p.rotSpeedDeg * localSec) * Math.PI) / 180;
        const tumbleX = 0.62 + 0.38 * Math.cos(localSec * 3.1 + p.phase);
        const tumbleY = 0.78 + 0.22 * Math.sin(localSec * 2.4 + p.phase);

        ctx.save();
        ctx.globalAlpha = alpha * faceClarityFactor;
        ctx.translate(cx, cy);
        ctx.rotate(angleRad);
        ctx.scale(tumbleX, tumbleY);
        ctx.drawImage(sprite, -drawSize / 2, -drawSize / 2, drawSize, drawSize);
        ctx.restore();
      }

      ctx.restore();

      if (elapsedMs < ASHIRWAD_CEREMONY_DURATION_MS) {
        rafId = window.requestAnimationFrame(drawFrame);
      }
    };

    rafId = window.requestAnimationFrame(drawFrame);
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [active, triggerId, isMobile, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      data-testid="everywhere-flower-canvas"
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

export interface CharanAshirwadOverlayProps {
  active: boolean;
  triggerId: number;
  curtainsVisible: boolean;
  reducedMotion?: boolean;
  onTouchFeet: () => void;
}

/**
 * CharanAshirwadOverlay
 *
 * Anchored directly inside the exact 3:4 portrait wrapper of Shri Dwarkadhish Bhagwan so
 * coordinates match across every mobile screen width and desktop monitor:
 * - Warm volumetric Ashirwad golden rays & glowing orb centered on His blessing hand (35.8%, 38.8%)
 * - Sacred golden Bhakti ripples & Lotus shimmer at Dwarkadhish's Lotus Feet (49.5%, 86.5%)
 * - Mobile-first large touch target right over His Lotus Feet with clear pedestal hint pill
 */
export const CharanAshirwadOverlay: React.FC<CharanAshirwadOverlayProps> = ({
  active,
  triggerId,
  curtainsVisible,
  reducedMotion = false,
  onTouchFeet,
}) => {
  const { tDict } = useI18n();

  const handAuraRef = useRef<HTMLDivElement | null>(null);
  const beamGroupRef = useRef<HTMLDivElement | null>(null);
  const raysWheelRef = useRef<SVGSVGElement | null>(null);
  const ambientBloomRef = useRef<HTMLDivElement | null>(null);
  const feetRipplesRef = useRef<HTMLDivElement | null>(null);

  const beamVector = useMemo(
    () => calculateAshirwadBeamVector(ASHIRWAD_HAND_POS, LOTUS_FEET_POS, 0.75),
    []
  );

  // Smooth 60fps imperative DOM transform/opacity animation over the exact 3.6s ceremony
  useEffect(() => {
    if (!active || triggerId === 0) {
      const zeroNodes = [
        handAuraRef.current,
        beamGroupRef.current,
        ambientBloomRef.current,
        feetRipplesRef.current,
      ];
      for (const el of zeroNodes) {
        if (el) el.style.opacity = '0';
      }
      return;
    }

    if (reducedMotion) {
      if (handAuraRef.current) {
        handAuraRef.current.style.opacity = '0.96';
        handAuraRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
      }
      if (beamGroupRef.current) beamGroupRef.current.style.opacity = '0.88';
      if (ambientBloomRef.current) ambientBloomRef.current.style.opacity = '0.55';
      if (feetRipplesRef.current) feetRipplesRef.current.style.opacity = '0.92';
      return;
    }

    let rafId = 0;
    let startTime: number | null = null;

    const step = (now: number) => {
      if (startTime === null) {
        startTime = now - 16;
      }

      const elapsed = Math.max(16, now - startTime);
      const env = calculateAshirwadEnvelope(elapsed, ASHIRWAD_CEREMONY_DURATION_MS);

      const tSec = elapsed / 1000;
      const breathe = 1 + Math.sin(tSec * 5.2) * 0.08;

      if (handAuraRef.current) {
        handAuraRef.current.style.opacity = env.ashirwadLightIntensity.toFixed(3);
        const s = (0.65 + env.ashirwadLightIntensity * 0.48) * breathe;
        handAuraRef.current.style.transform = `translate(-50%, -50%) scale(${s.toFixed(3)})`;
      }

      if (raysWheelRef.current) {
        const deg = (tSec * 28) % 360;
        raysWheelRef.current.style.transform = `rotate(${deg.toFixed(1)}deg)`;
      }

      if (beamGroupRef.current) {
        beamGroupRef.current.style.opacity = (env.ashirwadLightIntensity * 0.96).toFixed(3);
        const beamScaleY = 0.4 + 0.6 * Math.min(1, env.progress * 3.6);
        beamGroupRef.current.style.transform = `translate(-50%, 0%) rotate(${beamVector.angleDeg.toFixed(2)}deg) scaleY(${beamScaleY.toFixed(3)})`;
      }

      if (ambientBloomRef.current) {
        ambientBloomRef.current.style.opacity = (env.ashirwadLightIntensity * 0.65).toFixed(3);
      }

      if (feetRipplesRef.current) {
        feetRipplesRef.current.style.opacity = env.charanSparshIntensity.toFixed(3);
      }

      if (env.active) {
        rafId = window.requestAnimationFrame(step);
      }
    };

    rafId = window.requestAnimationFrame(step);
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [active, triggerId, reducedMotion, beamVector.angleDeg]);

  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      data-testid="charan-ashirwad-overlay"
    >
      {/* 1. Warm Sanctuary Ambient Glow Wash during Ashirwad */}
      <div
        ref={ambientBloomRef}
        style={{
          opacity: 0,
          background:
            'radial-gradient(ellipse 78% 68% at 44% 62%, rgba(255, 224, 130, 0.36) 0%, rgba(255, 160, 20, 0.18) 48%, transparent 82%)',
        }}
        className="absolute inset-0 transition-opacity duration-150"
      />

      {/* 2. Directional Volumetric Ashirwad Light Cones from Dwarkadhish's Left-Side Hand */}
      <div
        ref={beamGroupRef}
        data-testid="ashirwad-light-beam"
        style={{
          left: `${ASHIRWAD_HAND_POS.xPercent}%`,
          top: `${ASHIRWAD_HAND_POS.yPercent}%`,
          width: '66%',
          height: '62%',
          opacity: 0,
          transformOrigin: '50% 0%',
          transform: `translate(-50%, 0%) rotate(${beamVector.angleDeg}deg) scaleY(0.4)`,
        }}
        className="absolute pointer-events-none will-change-transform"
      >
        {/* Warm Rich Saffron-Gold Diffusion Cone */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: 'polygon(43% 0%, 57% 0%, 100% 100%, 0% 100%)',
            background:
              'linear-gradient(180deg, rgba(255, 245, 205, 0.88) 0%, rgba(255, 198, 72, 0.56) 32%, rgba(255, 152, 0, 0.22) 72%, transparent 100%)',
            filter: 'blur(6px)',
          }}
        />
        {/* Crisp Luminous Ivory-Gold Inner Shaft directly from His Palm toward Lotus Feet */}
        <div
          className="absolute inset-x-[20%] top-0 bottom-0"
          style={{
            clipPath: 'polygon(44% 0%, 56% 0%, 84% 100%, 16% 100%)',
            background:
              'linear-gradient(180deg, rgba(255, 255, 245, 0.94) 0%, rgba(255, 234, 156, 0.62) 42%, rgba(255, 193, 7, 0.2) 84%, transparent 100%)',
            filter: 'blur(2.5px)',
            mixBlendMode: 'screen',
          }}
        />
      </div>

      {/* 3. Radiant Palm Aura & Mandala Rays Anchored Directly on His Blessing Palm */}
      <div
        ref={handAuraRef}
        data-testid="ashirwad-palm-aura"
        style={{
          left: `${ASHIRWAD_HAND_POS.xPercent}%`,
          top: `${ASHIRWAD_HAND_POS.yPercent}%`,
          width: '28%',
          aspectRatio: '1 / 1',
          opacity: 0,
          transform: 'translate(-50%, -50%) scale(0.65)',
        }}
        className="absolute pointer-events-none will-change-transform flex items-center justify-center"
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 254, 240, 0.98) 0%, rgba(255, 224, 115, 0.78) 24%, rgba(255, 152, 0, 0.36) 54%, transparent 78%)',
          }}
        />
        <svg
          ref={raysWheelRef}
          viewBox="0 0 100 100"
          className="w-full h-full opacity-95 drop-shadow-[0_0_6px_rgba(255,215,100,0.85)]"
          aria-hidden="true"
        >
          {Array.from({ length: 12 }).map((_, idx) => (
            <line
              key={idx}
              x1="50"
              y1="50"
              x2="50"
              y2="5"
              stroke="#FFF8DC"
              strokeWidth={idx % 2 === 0 ? '2' : '1.2'}
              strokeLinecap="round"
              opacity={idx % 2 === 0 ? '0.9' : '0.6'}
              transform={`rotate(${idx * 30} 50 50)`}
            />
          ))}
        </svg>
      </div>

      {/* 4. Lotus Feet Sacred Golden Bhakti Ripples during Touch-Feet Ceremony */}
      <div
        ref={feetRipplesRef}
        data-testid="charan-sparsh-ripples"
        style={{
          left: `${LOTUS_FEET_POS.xPercent}%`,
          top: `${LOTUS_FEET_POS.yPercent}%`,
          width: '44%',
          aspectRatio: '1 / 0.52',
          opacity: 0,
          transform: 'translate(-50%, -50%)',
        }}
        className="absolute pointer-events-none flex items-center justify-center"
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255, 244, 185, 0.85) 0%, rgba(255, 183, 50, 0.42) 48%, transparent 78%)',
          }}
        />
        <span className="absolute w-[64%] h-[64%] rounded-full border border-[#FFF8DC]/90 animate-ping" />
        <span className="absolute w-[88%] h-[88%] rounded-full border border-[#FFD54F]/70 animate-pulse" />
      </div>

      {/* 5. Direct Touch Hotspot Over Dwarkadhish's Lotus Feet (Mobile & Desktop Interactive!) */}
      <button
        type="button"
        onClick={onTouchFeet}
        data-testid="charan-sparsh-hotspot"
        aria-label={tDict.darshan.touchFeetCta}
        style={{
          left: `${LOTUS_FEET_POS.xPercent}%`,
          top: `${LOTUS_FEET_POS.yPercent}%`,
          transform: 'translate(-50%, -50%)',
        }}
        className="absolute pointer-events-auto cursor-pointer touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFE5A3] rounded-full w-[92px] h-[78px] sm:w-[112px] sm:h-[90px] flex items-center justify-center group"
      >
        {/* Subtle breathing golden ring around the Lotus Feet when curtains are open & idle */}
        {curtainsVisible && !active && (
          <>
            <span
              className={`w-14 h-9 sm:w-16 sm:h-11 rounded-full border border-[#FFE5A3]/75 shadow-[0_0_16px_rgba(255,215,100,0.65)] transition-transform duration-300 group-hover:scale-110 group-active:scale-95 ${
                reducedMotion ? '' : 'animate-pulse'
              }`}
            />
            <span
              className="absolute -bottom-2.5 sm:-bottom-3 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-[#24130B]/90 border border-[#E5BE75]/75 text-[10px] sm:text-[11px] font-cinzel font-semibold tracking-wider text-[#FFF3D1] shadow-md group-hover:bg-[#3A2012] transition-colors"
            >
              {tDict.darshan.touchFeetTapHint}
            </span>
          </>
        )}
      </button>
    </div>
  );
};

export default CharanAshirwadOverlay;
