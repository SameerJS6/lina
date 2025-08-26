import React from "react";
import { Index, type RegistryKeys } from "@/registry/registry";
import type { BundledLanguage } from "shiki/bundle/web";

import { Loader } from "lucide-react";

import CodeDisplaySection from "@/components/code-display-block";
import RenderPreview from "@/components/render-preview";
import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VariantSelect from "@/components/variant-select";

import { getComponentCode } from "@/lib/code-highlight";
import { cn } from "@/lib/utils";

type ComponentDetailsProps = {
  name: RegistryKeys;
  hideCode?: boolean;
  className?: string;
  lang?: BundledLanguage;
  align?: "center" | "start" | "end";
};

export default async function ComponentPreview({
  name,
  className,
  lang = "tsx",
  hideCode = false,
  align = "center",
}: ComponentDetailsProps) {
  const registryEntry = Index[name];
  const [radixCodeData, baseCodeData] = await Promise.all([
    getComponentCode(`${registryEntry.name}-radix`, lang),
    getComponentCode(`${registryEntry.name}-base`, lang),
  ]);

  const variantData = {
    base: { code: baseCodeData },
    radix: { code: radixCodeData },
  } as const;

  return (
    <div className={cn("group relative flex min-w-0 flex-col space-y-2", className)}>
      <Tabs defaultValue="preview" className="relative w-full">
        <div className="flex items-center justify-between pb-3">
          {!hideCode && (
            <TabsList className="relative z-0 justify-start bg-transparent p-0">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
              <TabsIndicator />
            </TabsList>
          )}
        </div>
        <TabsContent value="preview" className="focus-ring relative rounded-xl border p-4">
          <VariantSelect />
          <div
            className={cn("flex min-h-[350px] w-full justify-center p-10", {
              "items-center": align === "center",
              "items-start": align === "start",
              "items-end": align === "end",
            })}
          >
            <React.Suspense
              fallback={
                <div className="text-muted-foreground flex w-full items-center justify-center text-sm">
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </div>
              }
            >
              <RenderPreview name={name} />
            </React.Suspense>
          </div>
        </TabsContent>
        <TabsContent value="code" className="focus-ring rounded-xl">
          <CodeDisplaySection variantData={variantData} language={lang} maxHeight="[&_pre]:max-h-[435px]" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
