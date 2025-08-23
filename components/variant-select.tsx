"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { createVariantUrl, type ComponentLibrary } from "@/lib/variant-utils";

type VariantSelectProps = {
  currentVariant: ComponentLibrary;
  size?: "sm" | "default";
};

export default function VariantSelect({ currentVariant, size = "default" }: VariantSelectProps) {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleVariantChange = (value: ComponentLibrary) => {
    const newUrl = createVariantUrl(value);
    router.replace(newUrl, { scroll: false });
  };

  return (
    <Select value={isHydrated ? currentVariant : undefined} onValueChange={handleVariantChange}>
      <SelectTrigger size={size} className="h-7 text-sm font-medium [&_svg]:h-4 [&_svg]:w-4">
        <span className="text-muted-foreground font-normal">Variant: </span>
        {isHydrated ? <SelectValue placeholder="Configuration:" /> : <Skeleton className="h-4 w-16" />}
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="radix">Radix UI</SelectItem>
        <SelectItem value="base">Base UI</SelectItem>
      </SelectContent>
    </Select>
  );
}
