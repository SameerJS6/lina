import React from "react";
import { Index, type RegistryKeys } from "@/registry/registry";
import type { BundledLanguage } from "shiki/bundle/web";

import { Loader } from "lucide-react";

import CodeBlock from "@/components/code-block";
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
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>; // TODO: IMPROVE TYPE SAFETY OF SEARCH PARAMS (USE NUQS)
};

export default async function ComponentPreview({
  name,
  className,
  lang = "tsx",
  hideCode = false,
  align = "center",
  searchParams,
}: ComponentDetailsProps) {
  const variant = (await searchParams)?.variant === "base" ? "base" : "radix";

  const registryEntry = Index[name];
  const componentName = `${registryEntry.name}-${variant}`;
  const codeData = await getComponentCode(componentName, lang);

  const Preview = !registryEntry ? (
    <p className="text-muted-foreground text-sm">
      Component <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">{name}</code> not
      found in special registry.
    </p>
  ) : (
    React.createElement(registryEntry.variants[variant])
  );

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
          <VariantSelect currentVariant={variant} />
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
              {Preview}
            </React.Suspense>
          </div>
        </TabsContent>
        <TabsContent value="code" className="focus-ring rounded-xl">
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
              lang={lang}
              code={codeData.code}
              preHighlighted={codeData.highlightedCode}
              className="[&_pre]:max-h-[435px]"
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
