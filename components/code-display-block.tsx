"use client";

import type { JSX } from "react";
import type { BundledLanguage } from "shiki/bundle/web";

import CodeBlock from "@/components/code-block";

import { useVariantStore } from "@/lib/variant-store";

type CodeData = {
  code: string;
  highlightedCode: JSX.Element;
} | null;

type VariantData = {
  base: {
    code: CodeData;
  };
  radix: {
    code: CodeData;
  };
};

type CodeDisplaySectionProps = {
  variantData: VariantData;
  language: BundledLanguage;
  maxHeight?: string;
};

export default function CodeDisplaySection({
  variantData,
  language,
  maxHeight = "[&_pre]:max-h-[400px]",
}: CodeDisplaySectionProps) {
  const { currentVariant } = useVariantStore();
  const codeData = variantData[currentVariant]?.code;

  return (
    <>
      {!codeData ? (
        <p className="text-muted-foreground text-sm">
          No code available. If you think this is an error, please{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/SameerJS6/lina/issues"
            className="text-foreground font-medium underline hover:no-underline"
          >
            open an issue
          </a>
          .
        </p>
      ) : (
        <CodeBlock
          lang={language}
          code={codeData.code}
          preHighlighted={codeData.highlightedCode}
          className={maxHeight}
        />
      )}
    </>
  );
}
