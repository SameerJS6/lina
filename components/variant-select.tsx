"use client";

import { useEffect, useState } from "react";

import posthog from "posthog-js";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";
import { useVariantStore, type Variant } from "@/lib/variant-store";

type VariantSelectProps = {
  size?: "sm" | "default";
};

export default function VariantSelect({ size = "default" }: VariantSelectProps) {
  const { setVariant, currentVariant } = useVariantStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleVariantChange = (value: Variant) => {
    try {
      setVariant(value);
      posthog.capture("variant_change", { to: value });
    } catch {}
  };

  return (
    <Select value={isHydrated ? currentVariant : undefined} onValueChange={handleVariantChange}>
      <SelectTrigger size={size} className={cn("h-7 text-sm font-medium [&_svg]:h-4 [&_svg]:w-4")}>
        <span className="text-muted-foreground font-normal">Variant: </span>
        {isHydrated ? <SelectValue placeholder="Configuration:" /> : <Skeleton className="h-4 w-16" />}
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="radix" aria-label="Switch to Radix UI variant">
          Radix UI
        </SelectItem>
        <SelectItem value="base" aria-label="Switch to Base UI variant">
          Base UI
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
