"use client";

import * as React from "react";
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui-components/react/scroll-area";

import { cn } from "@/lib/utils";

import { useTouchPrimary } from "@/hooks/use-has-primary-touch";

type ScrollAreaContextProps = {
  isTouch: boolean;
  type: "auto" | "always" | "scroll" | "hover";
};

const ScrollAreaContext = React.createContext<ScrollAreaContextProps>({
  isTouch: false,
  type: "hover",
});

const ScrollArea = React.forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
    type?: "auto" | "always" | "scroll" | "hover";
    viewportClassName?: string;
  }
>(({ className, children, type = "hover", viewportClassName, ...props }, ref) => {
  const isTouch = useTouchPrimary();

  return (
    <ScrollAreaContext.Provider value={{ isTouch, type }}>
      {isTouch ? (
        <div
          ref={ref}
          {...props}
          role="group"
          data-slot="scroll-area"
          aria-roledescription="scroll area"
          className={cn("relative overflow-hidden", className)}
        >
          <div className="size-full overflow-auto" tabIndex={0}>
            {children}
          </div>
        </div>
      ) : (
        <ScrollAreaPrimitive.Root
          ref={ref}
          data-slot="scroll-area"
          className={cn("relative overflow-hidden", viewportClassName, className)}
          {...props}
        >
          <ScrollAreaPrimitive.Viewport
            data-slot="scroll-area-viewport"
            className="focus-ring size-full rounded-[inherit]"
          >
            {children}
          </ScrollAreaPrimitive.Viewport>
          <ScrollBar />
          <ScrollAreaPrimitive.Corner />
        </ScrollAreaPrimitive.Root>
      )}
    </ScrollAreaContext.Provider>
  );
});

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.Scrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Scrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => {
  const { isTouch, type } = React.useContext(ScrollAreaContext);

  if (isTouch) return null;

  return (
    <ScrollAreaPrimitive.Scrollbar
      ref={ref}
      orientation={orientation}
      data-slot="scroll-area-scrollbar"
      className={cn(
        "hover:bg-muted dark:hover:bg-muted/50 flex touch-none p-px transition-[colors,opacity] duration-150 ease-out select-none",
        orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent px-1 pr-1.25",
        type === "hover" && "opacity-0 data-[hovering]:opacity-100",
        type === "scroll" && "opacity-0 data-[scrolling]:opacity-100",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        data-slot="scroll-area-thumb"
        className={cn(
          "bg-border relative flex-1 rounded-full transition-[scale]",
          orientation === "vertical" && "my-1 hover:scale-y-110 active:scale-y-95",
          orientation === "horizontal" && "hover:scale-x-102 active:scale-x-98"
        )}
      />
    </ScrollAreaPrimitive.Scrollbar>
  );
});

ScrollBar.displayName = ScrollAreaPrimitive.Scrollbar.displayName;

export { ScrollArea, ScrollBar };
