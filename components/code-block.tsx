"use client";

import { useLayoutEffect, useRef, useState, type JSX } from "react";
import { ScrollArea, ScrollBar } from "@/registry/base-ui/scroll-area";
import type { BundledLanguage } from "shiki/bundle/web";

import CopyButton from "@/components/copy-button";
import { highlight } from "@/lib/code-highlight";
import { cn } from "@/lib/utils";

type CodeBlockProps = {
  code: string | null;
  lang: BundledLanguage;
  initial?: JSX.Element;
  preHighlighted?: JSX.Element | null;
  className?: string;
};

export default function CodeBlock({ code, lang, initial, preHighlighted, className }: CodeBlockProps) {
  const [content, setContent] = useState<JSX.Element | null>(preHighlighted || initial || null);
  const areaRef = useRef<HTMLDivElement>(null);

  const onCopy = () => {
    const pre = areaRef.current?.getElementsByTagName("pre").item(0);

    if (!pre) return;

    const clone = pre.cloneNode(true) as HTMLElement;
    navigator.clipboard.writeText(clone.textContent || "");
  };

  useLayoutEffect(() => {
    if (preHighlighted) {
      setContent(preHighlighted);
      return;
    }

    let isMounted = true;

    if (code) {
      highlight(code, lang).then((result) => {
        if (isMounted) setContent(result);
      });
    } else {
      setContent(<pre className="bg-secondary/50 rounded-md p-4">No code available</pre>);
    }

    return () => {
      isMounted = false;
    };
  }, [code, lang, preHighlighted]);

  return content ? (
    <div
      className={cn(
        "group focus-ring bg-surface relative overflow-hidden rounded-lg [&_code]:font-mono [&_code]:text-[13px] [&_pre]:p-4 [&_pre]:!leading-tight",
        className
      )}
    >
      <ScrollArea ref={areaRef} dir="ltr" className="focus-ring relative size-full rounded-lg">
        {content}
        <ScrollBar orientation="horizontal" className="focus-ring" />
        <CopyButton className="absolute top-2 right-2 z-[2] backdrop-blur-md" onCopy={onCopy} />
      </ScrollArea>
    </div>
  ) : (
    <div className="bg-secondary/50 relative my-6 min-h-[500px] overflow-hidden rounded-lg border text-sm">
      <pre className="rounded-md p-4 text-center text-sm">Loading...</pre>
    </div>
  );
}
