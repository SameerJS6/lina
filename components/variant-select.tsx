"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { createVariantUrl, type ComponentLibrary } from "@/lib/variant-utils";

type VariantSelectProps = {
  currentVariant: ComponentLibrary;
  size?: "sm" | "default";
};

export default function VariantSelect({ currentVariant, size = "default" }: VariantSelectProps) {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleVariantChange = (value: ComponentLibrary) => {
    const newUrl = createVariantUrl(value);
    startTransition(() => {
      router.replace(newUrl, { scroll: false });
    });
  };

  return (
    <Select value={isHydrated ? currentVariant : undefined} onValueChange={handleVariantChange}>
      <SelectTrigger
        size={size}
        className={cn("h-7 text-sm font-medium [&_svg]:h-4 [&_svg]:w-4", isPending && "animate-pulse")}
      >
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
