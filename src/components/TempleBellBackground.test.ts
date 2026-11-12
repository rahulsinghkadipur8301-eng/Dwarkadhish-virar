import { test } from 'node:test';
import assert from 'node:assert/strict';

/**
 * Physical pendulum parameters matching TempleBellBackground:
 * angularAcceleration = -stiffness * angle - damping * angularVelocity
 */
const STIFFNESS = 23.0; // s^-2
const DAMPING = 6.2; // s^-1
const MAX_ANGLE_RAD = 0.21; // ~12 degrees

function simulatePendulumStep(
  theta: number,
  omega: number,
  dt: number
): { theta: number; omega: number } {
  const angularAcceleration = -STIFFNESS * theta - DAMPING * omega;
  const newOmega = omega + angularAcceleration * dt;
  const rawTheta = theta + newOmega * dt;
  const clampedTheta = Math.max(-MAX_ANGLE_RAD, Math.min(MAX_ANGLE_RAD, rawTheta));
  return { theta: clampedTheta, omega: newOmega };
}

test('TempleBell Physics: Positive mouse delta creates positive angular velocity (swings right)', () => {
  let omega = 0;
  const dx = 50; // Cursor moved 50px right
  omega = omega * 0.92 + dx * 0.010;
  assert(omega > 0, 'Positive dx must generate positive omega');

  // Next step of simulation with theta=0 and omega > 0:
  const step = simulatePendulumStep(0, omega, 0.016);
  assert(step.theta > 0, 'Positive omega must swing theta to the right (positive radians)');
});

test('TempleBell Physics: Negative mouse delta creates negative angular velocity (swings left)', () => {
  let omega = 0;
  const dx = -50; // Cursor moved 50px left
  omega = omega * 0.92 + dx * 0.010;
  assert(omega < 0, 'Negative dx must generate negative omega');

  const step = simulatePendulumStep(0, omega, 0.016);
  assert(step.theta < 0, 'Negative omega must swing theta to the left (negative radians)');
});

test('TempleBell Physics: Immediate sign reversal on reverse mouse movement', () => {
  let omega = 1.5; // Currently moving right
  const reverseDx = -80; // Rapid reverse movement to left
  omega = omega * 0.92 + reverseDx * 0.010;
  // 1.5 * 0.92 + (-80 * 0.010) = 1.38 - 0.80 = 0.58
  // Another reverse frame:
  omega = omega * 0.92 + reverseDx * 0.010;
  // 0.58 * 0.92 - 0.80 = 0.5336 - 0.80 = -0.2664 (reversed!)
  assert(omega < 0, 'Consecutive reverse movement must swiftly invert angular velocity');
});

test('TempleBell Physics: Damped pendulum settles to rest (theta -> 0) when motion ceases', () => {
  let theta = 0.18; // Started deflected at ~10 degrees
  let omega = 0.0;
  const dt = 0.016; // 60 FPS frame

  // Simulate 2 seconds (125 frames) of zero input
  for (let i = 0; i < 125; i++) {
    const res = simulatePendulumStep(theta, omega, dt);
    theta = res.theta;
    omega = res.omega;
  }

  // After 2 seconds with damping=6.2 and stiffness=23, amplitude must decay below threshold
  assert(Math.abs(theta) < 0.005, `Pendulum must settle to near-zero; got ${theta}`);
  assert(Math.abs(omega) < 0.05, `Velocity must settle to near-zero; got ${omega}`);
});

test('TempleBell Physics: Angle is strictly clamped within max angle limits (±12 degrees)', () => {
  let theta = 0;
  let omega = 25.0; // Extreme velocity impulse
  const dt = 0.016;

  for (let i = 0; i < 20; i++) {
    const res = simulatePendulumStep(theta, omega, dt);
    theta = res.theta;
    omega = res.omega;
    assert(Math.abs(theta) <= MAX_ANGLE_RAD, `Theta ${theta} must not exceed ${MAX_ANGLE_RAD}`);
  }
});
