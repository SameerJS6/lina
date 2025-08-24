"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function PageWideScrollMask() {
  const [showTopMask, setShowTopMask] = useState(false);
  const [showBottomMask, setShowBottomMask] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const isScrollable = documentHeight > windowHeight;

      if (!isScrollable) {
        setShowTopMask(false);
        setShowBottomMask(false);
        return;
      }

      const topThreshold = 50;
      setShowTopMask(scrollTop > topThreshold);

      const bottomThreshold = 50;
      const distanceFromBottom = documentHeight - (scrollTop + windowHeight);
      setShowBottomMask(distanceFromBottom > bottomThreshold);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="from-background pointer-events-none fixed top-0 z-50 h-16 w-full bg-gradient-to-b to-transparent"
        animate={{
          opacity: showTopMask ? 1 : 0,
          y: showTopMask ? 0 : -16,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        style={{
          pointerEvents: "none",
        }}
      />
      <motion.div
        aria-hidden="true"
        className="from-background pointer-events-none fixed bottom-0 z-50 h-16 w-full bg-gradient-to-t to-transparent"
        animate={{
          opacity: showBottomMask ? 1 : 0,
          y: showBottomMask ? 0 : 16,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        style={{
          pointerEvents: "none",
        }}
      />
    </>
  );
}
