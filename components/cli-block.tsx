"use client";

import { Suspense, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/registry/radix-ui/scroll-area";
import { type RegistryKeys } from "@/registry/registry";

import CopyButton from "@/components/copy-button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VariantSelect from "@/components/variant-select";
import { usePackageManagerStore, type PackageManager } from "@/lib/package-manager-store";
import { convertNpmCommand } from "@/lib/package-manager-utils";
import { cn } from "@/lib/utils";

type CLIBlockProps = {
  name?: RegistryKeys;
  command?: string;
  className?: string;
};

export default function CLIBlock({ name, command }: CLIBlockProps) {
  return (
    <Suspense>
      <CLIBlockContent name={name} command={command} />
    </Suspense>
  );
}

function CLIBlockContent({ name, command }: CLIBlockProps) {
  const searchParams = useSearchParams();
  const variant = searchParams?.get("variant") === "base" ? "base" : "radix";
  const { selectedPackageManager, setPackageManager, isLoading, setLoading } = usePackageManagerStore();

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  const componentName = `${name}-${variant}`;
  const registryURL = `https://lina.sameer.sh/r/${componentName}.json`;

  const commands = useMemo(
    () => convertNpmCommand(command ? command : `npx shadcn@latest add ${registryURL}`),
    [registryURL, command]
  );

  return (
    <Tabs value={selectedPackageManager} onValueChange={setPackageManager} className={cn("mt-4 flex flex-col gap-0")}>
      <div className="bg-surface flex items-center justify-between rounded-t-xl px-4 pt-4 pb-2">
        <div className="space-y-3">
          <div>
            <VariantSelect size="sm" currentVariant={variant} />
          </div>
          <TabsList className="relative bg-transparent p-0">
            {Object.keys(commands).map((key, index) =>
              isLoading ? (
                <Skeleton key={index} className="mr-2 h-6 w-16 rounded-sm" />
              ) : (
                <TabsTrigger key={index} value={key} className="z-10 flex h-full items-end">
                  {key}
                </TabsTrigger>
              )
            )}
            <TabsIndicator className="z-5" />
          </TabsList>
        </div>
        <CopyButton
          className="z-10 !opacity-100"
          onCopy={() => navigator.clipboard.writeText(commands[selectedPackageManager])}
        />
      </div>
      {Object.keys(commands).map((key, index) => (
        <TabsContent key={index} value={key} className="mt-0">
          <ScrollArea
            maskClassName="after:from-surface before:from-surface"
            className="bg-surface max-h-[600px] w-full rounded-b-xl border-t"
          >
            <pre className={cn("pt-2 pb-4", isLoading && "p-4")}>
              <code className={cn("font-mono text-[13px] leading-tight whitespace-nowrap", !isLoading && "px-4")}>
                {isLoading ? <Skeleton className="h-5 w-full" /> : commands[key as PackageManager]}
              </code>
            </pre>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </TabsContent>
      ))}
    </Tabs>
  );
}
