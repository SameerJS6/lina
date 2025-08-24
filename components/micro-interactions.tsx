"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function MicroInteractions() {
  const [animationPhase, setAnimationPhase] = useState(0);

  const CURSOR_POSITION = {
    INITIAL: { x: 140, y: 140, scale: 1 },
    HOVER_ON_PILL: { x: 13, y: -100, scale: 1 },
    PRESS_ON_PILL: { x: 13, y: -90, scale: 0.8 },
    END_POSITION_FOR_PILL: { x: 13, y: 50, scale: 0.8 },
    INITIAL_POSITION_FOR_PILL: { x: 13, y: -100, scale: 0.8 },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 7);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const getCursorPosition = () => {
    switch (animationPhase) {
      case 0:
        return CURSOR_POSITION.INITIAL;
      case 1:
        return CURSOR_POSITION.HOVER_ON_PILL;
      case 2:
        return CURSOR_POSITION.PRESS_ON_PILL;
      case 3:
        return CURSOR_POSITION.END_POSITION_FOR_PILL;
      case 4:
      case 5:
        return CURSOR_POSITION.INITIAL_POSITION_FOR_PILL;
      default:
        return CURSOR_POSITION.INITIAL;
    }
  };

  // const getCursorPosition = () => {
  //   switch (animationPhase) {
  //     case 0:
  //       return { x: 140, y: 140 };
  //     case 1:
  //       return { x: 13, y: -100 };
  //     // case 2:
  //     //   return { x: 13, y: -90 };
  //     case 2:
  //       return { x: 13, y: -90, scale: 0.8 };
  //     case 3:
  //       return { x: 13, y: 50, scale: 0.8 };
  //     case 4:
  //     case 5:
  //       return { x: 13, y: -100, scale: 0.8 };
  //     default:
  //       return { x: 140, y: 140, scale: 1 };
  //   }
  // };

  const THUMB_SCALE = {
    INITIAL: 1,
    HOVER: 1.1,
    PRESS: 0.95,
  };

  const getThumbScale = () => {
    switch (animationPhase) {
      case 1:
        return THUMB_SCALE.HOVER;
      // case 2:
      //   return 1.1;
      case 2:
        return THUMB_SCALE.PRESS;
      // 0.95;
      // case 3:
      //   return THUMB_SCALE.PRESS;
      // 0.95;
      // case 4:
      //   return THUMB_SCALE.PRESS;
      // 0.95;
      case 5:
        return THUMB_SCALE.INITIAL;
      // 1;
      default:
        return THUMB_SCALE.INITIAL;
      //  1;
    }
  };

  const THUMB_Y_POSITION = {
    INITIAL: -42,
    PRE_INITIAL: -40,
    END_POSITION: 90,
  };

  const getThumbY = () => {
    switch (animationPhase) {
      case 3:
        return THUMB_Y_POSITION.END_POSITION;
      case 4:
      case 5:
        return THUMB_Y_POSITION.PRE_INITIAL;
      default:
        return THUMB_Y_POSITION.INITIAL;
    }
  };

  const getBarOpacity = () => {
    switch (animationPhase) {
      case 1:
      case 2:
        return 1;
      case 3:
        return 1;
      case 4:
        return 1;
      case 5:
        return 1;
      default:
        return 0;
    }
  };

  return (
    <Card className="group relative overflow-hidden border border-zinc-200/50 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/80 dark:border-zinc-800/50 dark:bg-zinc-900/50">
      {/* <div className="group relative overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/50 p-8 backdrop-blur-sm transition-all duration-500 hover:border-zinc-200/60 hover:shadow-xl hover:shadow-zinc-900/5 dark:border-zinc-700/40 dark:bg-zinc-900/50 hover:dark:border-zinc-800/50 dark:hover:shadow-zinc-950/20">
      Animation Container */}
      <CardHeader className="relative">
        <CardTitle className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Micro Interactions</CardTitle>
        <CardDescription className="text-zinc-600 dark:text-zinc-400">
          Polished interactions that enhance usability.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-secondary dark:bg-card relative flex h-80 items-center justify-center rounded-xl border">
          <motion.div
            className="bar bg-card dark:bg-secondary absolute h-[310px] w-6 rounded-full"
            initial={false}
            animate={{
              opacity: getBarOpacity(),
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />

          <motion.div
            className="bg-primary relative z-10 h-20 w-4 rounded-full shadow-lg"
            animate={{
              scaleY: getThumbScale(),
              y: getThumbY(),
            }}
            initial={false}
            transition={{ duration: 1.5, type: "spring", bounce: 0.25 }}
            // drag="y"
            // dragConstraints={{ top: 0, bottom: 100 }}
            // dragElastic={0.2}
            style={{ marginTop: "-130px" }}
          />

          <motion.div
            className="pointer-events-none absolute z-20"
            initial={false}
            animate={getCursorPosition()}
            transition={{ duration: 1.55, type: "spring", bounce: 0.25 }}
            style={{
              transformOrigin: "center center",
              marginLeft: "-10px",
              marginTop: "-12px",
            }}
          >
            <svg
              width="24"
              height="30"
              viewBox="0 0 30 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-secondary fill-primary size-6"
            >
              <path
                d="M3.58385 1.69742C2.57836 0.865603 1.05859 1.58076 1.05859 2.88572V35.6296C1.05859 37.1049 2.93111 37.7381 3.8265 36.5656L12.5863 25.0943C12.6889 24.96 12.8483 24.8812 13.0173 24.8812H27.3245C28.7697 24.8812 29.4211 23.0719 28.3076 22.1507L3.58385 1.69742Z"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>

        <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          {/* Automatically morphs between scrollbar styles for optimal user experience across all devices. */}
          Refined micro-interactions including scrollbar fade effects, hover states, and thumb interactions for polished
          desktop experience.
        </p>
      </CardContent>

      {/* Background decoration */}
      {/* <div className="pointer-events-none absolute right-8 bottom-8 left-8 h-12 bg-gradient-to-t from-zinc-50 via-zinc-50/60 dark:from-zinc-900/50 dark:via-zinc-900/30" /> */}
    </Card>
  );
}
