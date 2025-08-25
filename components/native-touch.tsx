"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function NativeTouch() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTouch((prev) => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="group relative overflow-hidden border border-zinc-200/50 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/80 dark:border-zinc-800/50 dark:bg-zinc-900/50">
      <CardHeader className="relative">
        <CardTitle className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Adaptive Scrollbars</CardTitle>
        <CardDescription className="text-zinc-600 dark:text-zinc-400">
          Native experience that adapts to devices.
        </CardDescription>
      </CardHeader>
      <CardContent className="relative space-y-4">
        <div className="bg-secondary dark:bg-card relative flex h-80 items-center justify-center overflow-hidden rounded-lg border">
          {/* Desktop mockup */}
          <motion.div
            className="relative"
            animate={{
              opacity: isTouch ? 0 : 1,
              scale: isTouch ? 0.8 : 1,
              x: isTouch ? -80 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 25,
              duration: 2,
            }}
          >
            <div className="relative h-28 w-48 rounded-lg border border-zinc-300 bg-zinc-200 p-0.5 sm:h-32 sm:w-60 md:h-40 md:w-72 dark:border-zinc-600 dark:bg-zinc-700">
              {/* Screen bezel */}
              <div className="relative h-full w-full overflow-hidden rounded-md bg-zinc-900 p-0.5 dark:bg-zinc-800">
                {/* Actual screen */}
                <div className="relative h-full w-full overflow-hidden rounded-sm bg-white dark:bg-zinc-900">
                  <div className="absolute top-1 right-1 bottom-1 w-1.5 rounded-full bg-zinc-200 dark:bg-zinc-700">
                    {/* Desktop scrollbar thumb */}
                    <motion.div
                      className="absolute top-1 h-8 w-full rounded-full bg-zinc-400 dark:bg-zinc-500"
                      animate={{
                        y: [0, 50, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        repeatDelay: 1,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto -mt-0.5 h-1 w-full rounded-b-lg bg-zinc-300 lg:h-1.5 dark:bg-zinc-600" />
          </motion.div>

          {/* Mobile mockup */}
          <motion.div
            className="absolute"
            animate={{
              opacity: isTouch ? 1 : 0,
              scale: isTouch ? 1 : 0.8,
              x: isTouch ? 0 : 80,
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 25,
              duration: 2,
            }}
          >
            <div className="relative aspect-[8/16] h-56 w-28 overflow-hidden">
              <div
                className="relative h-full w-full rounded-[24px] border border-black bg-black p-[1.5px]"
                style={{
                  background: "linear-gradient(180deg, #EEEAE1 0%, #D1CCC2 100%)",
                  boxShadow: "0px 0px 1px 1px rgba(0, 0, 0, 0.20) inset, 0px 0px 2px 1px rgba(0, 0, 0, 0.40) inset",
                }}
              >
                <div
                  className="h-full w-full rounded-[21px] border border-black bg-black p-[3px]"
                  style={{
                    boxShadow: "0px 0px 2px 1px rgba(255, 255, 255, 0.25), 0px 0px 0.5px 2px #3C3C3C inset",
                  }}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-[18px] bg-white dark:bg-zinc-900">
                    {/* Screen content area */}
                    <div className="relative h-full">
                      <motion.div
                        className="absolute top-1 right-0.5 bottom-1 w-0.5 rounded-sm"
                        animate={{
                          opacity: [0, 1, 1, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Number.POSITIVE_INFINITY,
                          times: [0, 0.1, 0.9, 1],
                          repeatDelay: 1,
                        }}
                      >
                        {/* Mobile scrollbar thumb */}
                        <motion.div
                          className="absolute top-0 h-6 w-full rounded-sm bg-zinc-500/80 dark:bg-zinc-400/80"
                          animate={{
                            y: [0, 100, 0],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                            repeatDelay: 1,
                          }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <p className="text-sm leading-relaxed text-zinc-700 md:max-w-[45ch] dark:text-zinc-300">
          Automatic scrollbar adaptation between native and custom styles based on device type and touch capabilities.
        </p>
      </CardContent>
    </Card>
  );
}
