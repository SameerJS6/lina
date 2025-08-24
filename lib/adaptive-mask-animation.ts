import { MotionValue } from "motion/react";

// Configuration constants
export const SCROLL_CONFIG = {
  vertical: { max: 105, hold: 105, return: 40 },
  horizontal: { max: 370, curve: 10 },
  timing: { cycle: 280, fps: 16 },
} as const;

// Content bounds for mask calculations
export const getContentBounds = (containerWidth: number = SCROLL_CONFIG.horizontal.max) => ({
  top: 0,
  bottom: -SCROLL_CONFIG.vertical.max,
  left: 0,
  right: -containerWidth,
});

// Animation phases configuration
export type AnimationPhase = {
  name: string;
  duration: number;
};

export const animationPhases: AnimationPhase[] = [
  { name: "scrollDown", duration: 50 },
  { name: "holdBottom", duration: 10 },
  { name: "scrollUp", duration: 20 },
  { name: "scrollRight", duration: 50 },
  { name: "holdRight", duration: 10 },
  { name: "scrollLeft", duration: 50 },
  { name: "holdLeft", duration: 10 },
  { name: "scrollUp", duration: 40 },
  { name: "reset", duration: 40 },
];

// Easing functions
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 2.5);
export const curvedEasing = (t: number) => {
  const spring = 1 - Math.pow(1 - t, 1.8);
  return spring * (1 + 0.15 * Math.sin(t * Math.PI));
};

// Spring configurations
export const springConfigs = {
  content: { stiffness: 180, damping: 25, mass: 0.6 },
  masks: { stiffness: 400, damping: 30, mass: 0.3 },
} as const;

// Position-based mask logic
export const updateMasksBasedOnPosition = (
  x: number,
  y: number,
  topMaskTarget: MotionValue<number>,
  bottomMaskTarget: MotionValue<number>,
  leftMaskTarget: MotionValue<number>,
  rightMaskTarget: MotionValue<number>,
  containerWidth: number = SCROLL_CONFIG.horizontal.max
) => {
  const threshold = 2; // Smaller threshold for faster mask response
  const contentBounds = getContentBounds(containerWidth);

  // Top mask: visible when scrolled down (y is negative)
  const topMaskVisible = y < contentBounds.top - threshold;
  topMaskTarget.set(topMaskVisible ? 1 : 0);

  // Bottom mask: visible when NOT at bottom (can scroll down more)
  const bottomMaskVisible = y > contentBounds.bottom + threshold;
  bottomMaskTarget.set(bottomMaskVisible ? 1 : 0);

  // Left mask: visible when scrolled right (x is negative)
  const leftMaskVisible = x < contentBounds.left - threshold;
  leftMaskTarget.set(leftMaskVisible ? 1 : 0);

  // Right mask: visible when NOT at right edge (can scroll right more)
  const rightMaskVisible = x > contentBounds.right + threshold;
  rightMaskTarget.set(rightMaskVisible ? 1 : 0);
};

// Calculate content position for current animation phase
export const calculateContentPosition = (
  currentPhase: AnimationPhase,
  phaseProgress: number,
  containerWidth: number = SCROLL_CONFIG.horizontal.max
): { x: number; y: number } => {
  const easeProgress = easeOut(phaseProgress);
  let targetX = 0;
  let targetY = 0;

  switch (currentPhase.name) {
    case "scrollDown":
      targetX = 0;
      targetY = -easeProgress * SCROLL_CONFIG.vertical.max;
      break;
    case "holdBottom":
      targetX = 0;
      targetY = -SCROLL_CONFIG.vertical.hold;
      break;
    case "scrollUp":
      targetX = 0;
      targetY = -SCROLL_CONFIG.vertical.return;
      break;
    case "scrollRight":
      const curvedProgress = curvedEasing(phaseProgress);
      const verticalCurve = Math.sin(phaseProgress * Math.PI) * SCROLL_CONFIG.horizontal.curve;
      targetX = -curvedProgress * containerWidth;
      targetY = -SCROLL_CONFIG.vertical.return - verticalCurve;
      break;
    case "holdRight":
      targetX = -containerWidth;
      targetY = -SCROLL_CONFIG.vertical.return;
      break;
    case "scrollLeft":
      const leftProgress = curvedEasing(phaseProgress);
      const leftCurve = Math.sin(phaseProgress * Math.PI) * (SCROLL_CONFIG.horizontal.curve * 0.75);
      targetX = -containerWidth + leftProgress * containerWidth;
      targetY = -SCROLL_CONFIG.vertical.return + leftCurve;
      break;
    case "holdLeft":
      targetX = 0;
      targetY = -SCROLL_CONFIG.vertical.return;
      break;
    case "scrollUp":
      targetX = 0;
      targetY = -180 + easeProgress * 180;
      break;
    case "reset":
      targetX = 0;
      targetY = 0;
      break;
  }

  return { x: targetX, y: targetY };
};

// Find current animation phase based on step
export const getCurrentPhase = (currentStep: number): { phase: AnimationPhase | null; progress: number } => {
  let accumulatedDuration = 0;
  let currentPhase = null;
  let phaseStart = 0;

  for (const phase of animationPhases) {
    const phaseEnd = accumulatedDuration + phase.duration;
    if (currentStep >= accumulatedDuration && currentStep < phaseEnd) {
      currentPhase = phase;
      phaseStart = accumulatedDuration;
      break;
    }
    accumulatedDuration = phaseEnd;
  }

  if (!currentPhase) {
    return { phase: null, progress: 0 };
  }

  const phaseProgress = (currentStep - phaseStart) / currentPhase.duration;
  return { phase: currentPhase, progress: phaseProgress };
};

// Get total animation duration
export const getTotalDuration = () => animationPhases.reduce((sum, phase) => sum + phase.duration, 0);
