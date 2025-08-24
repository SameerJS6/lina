import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

interface AnchorHeadingProps extends ComponentProps<"h2"> {}

export default function AnchorHeading({ className, id, children, ...props }: AnchorHeadingProps) {
  return (
    <h2 id={id} className={cn("group relative scroll-m-20 text-3xl font-medium tracking-tight", className)} {...props}>
      <a href={"#" + id} className="inline-block cursor-pointer">
        <span className="bg-muted pointer-events-none absolute top-1/2 -left-9 -translate-y-1/2 rounded border px-2 font-sans text-base opacity-0 transition-opacity group-hover:opacity-100">
          #
        </span>
        {children}
      </a>
    </h2>
  );
}
