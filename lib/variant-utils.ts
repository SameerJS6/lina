import { ReadonlyURLSearchParams } from "next/navigation";

export type ComponentLibrary = "radix" | "base";

export function getVariantFromSearchParams(searchParams: ReadonlyURLSearchParams): ComponentLibrary {
  const variant = searchParams.get("variant");
  return variant === "base" ? "base" : "radix";
}

export function createVariantUrl(variant: ComponentLibrary, currentUrl?: string): string {
  if (typeof window === "undefined") return "#";

  const params = new URLSearchParams(currentUrl || window.location.href);
  params.set("variant", variant);
  return `${window.location.pathname}?${params.toString()}`;
}
