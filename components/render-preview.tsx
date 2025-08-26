"use client";

import React from "react";
import { Index, type RegistryKeys } from "@/registry/registry";

import { useVariantStore } from "@/lib/variant-store";

type RenderPreviewProps = {
  name: RegistryKeys;
};

export default function RenderPreview({ name }: RenderPreviewProps) {
  const { currentVariant } = useVariantStore();
  const registryEntry = Index[name];

  return (
    <>
      {!registryEntry ? (
        <p className="text-muted-foreground text-sm">
          Component <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">{name}</code>{" "}
          not found in special registry.
        </p>
      ) : (
        React.createElement(registryEntry.variants[currentVariant])
      )}
    </>
  );
}
