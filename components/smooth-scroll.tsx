"use client";

import type { PropsWithChildren } from "react";
import { ReactLenis } from "lenis/react";

export default function SmoothScroll({ children }: PropsWithChildren) {
  return (
    <ReactLenis
      root
      options={{
        duration: 0.55,
        prevent: (node) => {
          // Prevent Lenis on ScrollArea components
          if (node.hasAttribute?.("data-slot") && node.getAttribute("data-slot") === "scroll-area") {
            return true;
          }

          // Prevent Lenis on Next.js error dialogs and overlays
          if (
            node.hasAttribute?.("data-nextjs-dialog-content") ||
            node.hasAttribute?.("data-nextjs-dialog-body") ||
            node.hasAttribute?.("data-nextjs-dialog") ||
            node.hasAttribute?.("data-nextjs-toast") ||
            node.hasAttribute?.("data-nextjs-dialog-overlay") ||
            node.id === "__next-build-watcher" ||
            node.classList?.contains("nextjs-container-errors-body") ||
            node.classList?.contains("nextjs__container_errors_wrapper")
          ) {
            return true;
          }

          // Check if node is inside any of these containers
          const isInsideScrollArea = node.closest?.('[data-slot="scroll-area"]');
          const isInsideNextjsDialog = node.closest?.(
            '[data-nextjs-dialog-content="true"], [data-nextjs-dialog-body="true"], [data-nextjs-dialog="true"], [data-nextjs-toast="true"], [data-nextjs-dialog-overlay="true"], .nextjs-container-errors-body, .nextjs__container_errors_wrapper'
          );

          return !!(isInsideScrollArea || isInsideNextjsDialog);
        },
        wheelMultiplier: 1.75,
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
