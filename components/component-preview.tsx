import React from "react";
import { Index, type RegistryKeys } from "@/registry/registry";
import type { BundledLanguage } from "shiki/bundle/web";

import { Loader } from "lucide-react";

import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeBlock from "@/components/code-block";
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
  const codeData = await getComponentCode(name, lang);
  const registryEntry = Index[name];

  const Preview = !registryEntry ? (
    <p className="text-muted-foreground text-sm">
      Component <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">{name}</code> not
      found in special registry.
    </p>
  ) : (
    React.createElement(registryEntry.component)
  );

  return (
    <div className={cn("group relative my-4 flex flex-col space-y-2", className)}>
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex items-center justify-between pb-3">
          {!hideCode && (
            <TabsList className="relative z-0 justify-start bg-transparent p-0">
              <TabsTrigger
                value="preview"
                // className="text-muted-foreground data-[selected]:text-foreground hover:text-foreground/75 focus-visible:border-ring focus-visible:ring-ring/50 relative inline-flex h-7 w-fit items-center rounded bg-transparent px-2 pt-2 pb-3 text-sm font-semibold transition-colors transition-none duration-200 ease-out outline-none focus-visible:ring-[3px]"
              >
                Preview
              </TabsTrigger>
              <TabsTrigger
                value="code"
                // className="text-muted-foreground data-[selected]:text-foreground hover:text-foreground/75 focus-visible:border-ring focus-visible:ring-ring/50 relative inline-flex h-7 w-fit items-center rounded bg-transparent px-2 pt-2 pb-3 text-sm font-semibold transition-colors transition-none duration-200 ease-out outline-none focus-visible:ring-[3px]"
              >
                Code
              </TabsTrigger>
              <TabsIndicator />
              {/* <Tabs.Indicator className="border-border bg-surface absolute top-1/2 left-0 z-[-1] -mt-px h-7 w-(--active-tab-width) translate-x-(--active-tab-left) -translate-y-1/2 rounded border transition-all duration-200 ease-in-out" /> */}
            </TabsList>
          )}
        </div>
        <TabsContent value="preview" className="focus-ring relative rounded-lg border">
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
        <TabsContent value="code" className="focus-ring rounded-lg">
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
              className="[&_pre]:max-h-[366px]"
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
