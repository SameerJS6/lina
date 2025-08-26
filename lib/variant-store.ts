"use client";

import { persist } from "zustand/middleware";

import { create } from "zustand";

type Variant = "base" | "radix";

type VariantState = {
  currentVariant: Variant;
  setVariant: (variant: Variant) => void;
};

const useVariantStore = create<VariantState>()(
  persist(
    (set) => ({
      currentVariant: "radix",
      setVariant: (variant) =>
        set({
          currentVariant: variant,
        }),
    }),
    {
      name: "variant-store",
    }
  )
);

export { useVariantStore, type Variant };
