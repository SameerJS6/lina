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
  }
>(({ className, children, type = "hover", ...props }, ref) => {
  const isTouch = useTouchPrimary();

  return (
    <ScrollAreaContext.Provider value={{ isTouch, type }}>
      {isTouch ? (
        <div
          ref={ref}
          {...props}
          role="group"
          aria-roledescription="scroll area"
          className={cn("relative overflow-hidden", className)}
        >
          <div className={cn("size-full overflow-auto", className)} tabIndex={0}>
            {children}
          </div>
        </div>
      ) : (
        <ScrollAreaPrimitive.Root ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
          <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
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
      className={cn(
        "hover:bg-muted dark:hover:bg-muted/50 flex touch-none transition-[colors,opacity] duration-150 ease-out select-none",
        orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
        orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
        type === "hover" && "opacity-0 data-[hovering]:opacity-100",
        type === "scroll" && "opacity-0 data-[scrolling]:opacity-100",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        className={cn("bg-border relative flex-1 rounded-full", orientation === "vertical" && "my-1")}
      />
    </ScrollAreaPrimitive.Scrollbar>
  );
});

ScrollBar.displayName = ScrollAreaPrimitive.Scrollbar.displayName;

export { ScrollArea, ScrollBar };
