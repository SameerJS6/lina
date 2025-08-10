"use client";

import * as React from "react";

import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "@/lib/utils";

import { useTouchPrimary } from "@/hooks/use-has-primary-touch";

const ScrollAreaContext = React.createContext<boolean>(false);

const ScrollArea = React.forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => {
  const isTouch = useTouchPrimary();

  return (
    <ScrollAreaContext.Provider value={isTouch}>
      {isTouch ? (
        <div
          ref={ref}
          role="group"
          aria-roledescription="scroll area"
          className={cn("relative overflow-hidden", className)}
          {...props}
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
  React.ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => {
  const isTouch = React.useContext(ScrollAreaContext);

  if (isTouch) return null;

  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      className={cn(
        "hover:bg-muted dark:hover:bg-muted/50 flex touch-none transition-colors select-none",
        orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
        orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        className={cn("bg-border relative flex-1 rounded-full", orientation === "vertical" && "my-1")}
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
});

ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
