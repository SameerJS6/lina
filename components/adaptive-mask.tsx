"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  calculateContentPosition,
  getCurrentPhase,
  getTotalDuration,
  SCROLL_CONFIG,
  springConfigs,
  updateMasksBasedOnPosition,
} from "@/lib/adaptive-mask-animation";

export default function AdaptiveMask() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(370); // Default fallback

  const contentXTarget = useMotionValue(0);
  const contentYTarget = useMotionValue(0);
  const topMaskTarget = useMotionValue(0);
  const bottomMaskTarget = useMotionValue(1);
  const leftMaskTarget = useMotionValue(0);
  const rightMaskTarget = useMotionValue(1);

  const contentX = useSpring(contentXTarget, springConfigs.content);
  const contentY = useSpring(contentYTarget, springConfigs.content);
  const topMaskOpacity = useSpring(topMaskTarget, springConfigs.masks);
  const bottomMaskOpacity = useSpring(bottomMaskTarget, springConfigs.masks);
  const leftMaskOpacity = useSpring(leftMaskTarget, springConfigs.masks);
  const rightMaskOpacity = useSpring(rightMaskTarget, springConfigs.masks);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateContainerWidth = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerWidth(rect.width);
      }
    };

    updateContainerWidth();

    const resizeObserver = new ResizeObserver(updateContainerWidth);
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    let currentStep = 0;
    const totalDuration = getTotalDuration();

    const animationInterval = setInterval(() => {
      currentStep = (currentStep + 1) % totalDuration;

      const { phase: currentPhase, progress: phaseProgress } = getCurrentPhase(currentStep);
      if (!currentPhase) return;

      const { x: targetX, y: targetY } = calculateContentPosition(currentPhase, phaseProgress, containerWidth);

      contentXTarget.set(targetX);
      contentYTarget.set(targetY);

      updateMasksBasedOnPosition(
        targetX,
        targetY,
        topMaskTarget,
        bottomMaskTarget,
        leftMaskTarget,
        rightMaskTarget,
        containerWidth
      );
    }, SCROLL_CONFIG.timing.fps);

    return () => clearInterval(animationInterval);
  }, [
    contentXTarget,
    contentYTarget,
    topMaskTarget,
    bottomMaskTarget,
    leftMaskTarget,
    rightMaskTarget,
    containerWidth,
  ]);

  return (
    <Card className="group relative overflow-hidden border border-zinc-200/50 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/80 dark:border-zinc-800/50 dark:bg-zinc-900/50">
      <CardHeader className="relative">
        <CardTitle className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Adaptive Mask</CardTitle>
        <CardDescription className="text-zinc-600 dark:text-zinc-400">
          Dynamic masking that responds to content.
        </CardDescription>
      </CardHeader>
      <CardContent className="relative space-y-4">
        <div ref={containerRef} className="bg-secondary dark:bg-card relative h-80 overflow-hidden rounded-lg border">
          <motion.div
            className="absolute"
            style={{
              x: contentX,
              y: contentY,
              width: "200%",
              height: "220%",
              padding: "16px",
            }}
          >
            {/* Content Grid */}
            <div className="space-y-3">
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} className="h-2 flex-1 rounded bg-emerald-300 dark:bg-emerald-600"></div>
              ))}
            </div>
          </motion.div>

          {/* Adaptive Masks */}
          <motion.div
            className="from-secondary dark:from-card pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b to-transparent"
            style={{ opacity: topMaskOpacity }}
          />
          <motion.div
            className="from-secondary dark:from-card pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t to-transparent"
            style={{ opacity: bottomMaskOpacity }}
          />
          <motion.div
            className="from-secondary dark:from-card pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r to-transparent"
            style={{ opacity: leftMaskOpacity }}
          />
          <motion.div
            className="from-secondary dark:from-card pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l to-transparent"
            style={{ opacity: rightMaskOpacity }}
          />
        </div>

        <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          Automatic edge masks that appear and fade based on scroll position and direction, creating seamless visual
          boundaries.
        </p>
      </CardContent>
    </Card>
  );
}
