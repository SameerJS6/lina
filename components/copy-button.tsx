"use client";

import type { ButtonHTMLAttributes } from "react";

import { Check, Copy } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { useCopyButton } from "@/hooks/use-copy-button";

export default function CopyButton({
  className,
  onCopy,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  onCopy: () => void;
}) {
  const [checked, onClick] = useCopyButton(onCopy);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "icon",
            }),
            "size-[1.875rem] transition-opacity group-hover:opacity-100 [&_svg]:size-3.5",
            checked && "hover:bg-green-600/10 dark:hover:bg-green-500/10",
            !checked && "[@media(hover:hover)]:opacity-0",
            className
          )}
          aria-label={checked ? "Copied Text" : "Copy Text"}
          onClick={onClick}
          {...props}
        >
          <Check className={cn("text-green-600 transition-transform dark:text-green-500", !checked && "scale-0")} />
          <Copy className={cn("absolute transition-transform", checked && "scale-0")} />
        </button>
      </TooltipTrigger>
      <TooltipContent>{checked ? "Copied!" : "Copy to clipboard"}</TooltipContent>
    </Tooltip>
  );
}
