"use client";

import type { JSX } from "react";
import type { BundledLanguage } from "shiki/bundle/web";

import CLIBlock from "@/components/cli-block";
import CodeDisplaySection from "@/components/code-display-block";

import { useVariantStore } from "@/lib/variant-store";

type CodeData = {
  code: string;
  highlightedCode: JSX.Element;
} | null;

type VariantData = {
  base: {
    code: CodeData;
    mainDependency: string;
  };
  radix: {
    code: CodeData;
    mainDependency: string;
  };
};

type ManualInstallationSectionProps = {
  variantData: VariantData;
  hookCodeData: CodeData;
  language: BundledLanguage;
};

export default function ManualInstallationBlock({
  variantData,
  hookCodeData,
  language,
}: ManualInstallationSectionProps) {
  const { currentVariant } = useVariantStore();

  const devDependency = "tw-animate-css";
  const mainDependency = variantData[currentVariant]?.mainDependency;

  return (
    <div className="space-y-6 sm:space-y-10 lg:space-y-12">
      <div className="space-y-6">
        <div className="space-y-0">
          <h4 className="mt-12 scroll-m-28 text-lg font-medium tracking-tight first:mt-0 sm:text-2xl lg:mt-20 [&+p]:!mt-4">
            Install main dependencies
          </h4>
          <p className="text-muted-foreground text-sm">
            Install the required {currentVariant === "base" ? "Base UI" : "Radix UI"} dependencies for the scroll area
            component.
          </p>
        </div>
        <CLIBlock command={`npm install ${mainDependency}`} />
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <h4 className="font-heading font- mt-12 scroll-m-28 text-lg font-medium tracking-tight first:mt-0 sm:text-2xl lg:mt-20 [&+p]:!mt-4 *:[code]:text-2xl">
            Install development dependencies
          </h4>
          <p className="text-muted-foreground text-sm">Install the animation utilities for smooth transitions.</p>
        </div>
        <CLIBlock command={`npm install -D ${devDependency}`} />
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <h4 className="font-heading font- mt-12 scroll-m-28 text-lg font-medium tracking-tight first:mt-0 sm:text-2xl lg:mt-20 [&+p]:!mt-4 *:[code]:text-2xl">
            Copy the touch detection hook
          </h4>
          <p className="text-muted-foreground text-sm">
            Add the hook that detects touch-primary devices for adaptive behavior.
          </p>
        </div>
        <CodeDisplaySection
          variantData={{
            base: { code: hookCodeData },
            radix: { code: hookCodeData },
          }}
          language={language}
          maxHeight="[&_pre]:max-h-[400px]"
        />
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <h4 className="font-heading font- mt-12 scroll-m-28 text-lg font-medium tracking-tight first:mt-0 sm:text-2xl lg:mt-20 [&+p]:!mt-4 *:[code]:text-2xl">
            Copy the component
          </h4>
          <p className="text-muted-foreground text-sm">
            Add the main scroll area component with adaptive masking and touch-optimized behavior.
          </p>
        </div>
        <CodeDisplaySection variantData={variantData} language={language} maxHeight="[&_pre]:max-h-[400px]" />
      </div>
    </div>
  );
}
