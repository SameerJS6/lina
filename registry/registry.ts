import * as React from "react";
import { ScrollAreaHorizontalDemo as ScrollAreaHorizontalBaseUIDemo } from "@/registry/base-ui/examples/horizontal-scroll";
import { TimezonSelectExample as TimezoneSelectBaseUIExample } from "@/registry/base-ui/examples/timezone-select";
import { ScrollAreaDemo as ScrollAreaVerticalBaseUIDemo } from "@/registry/base-ui/examples/vertical-scroll";
import { ScrollAreaHorizontalDemo as ScrollAreaHorizontalRadixDemo } from "@/registry/radix-ui/examples/horizontal-scroll";
import { TimezoneSelectExample as TimezoneSelectRadixExample } from "@/registry/radix-ui/examples/timezone-select";
import { ScrollAreaDemo as ScrollAreaVerticalRadixDemo } from "@/registry/radix-ui/examples/vertical-scroll";

const registryKeys = ["lina", "vertical-scroll", "horizontal-scroll", "timezone-select"] as const;
type RegistryKeys = (typeof registryKeys)[number];

interface Registry {
  name: string;
  description: string;
  variants: {
    radix: React.ComponentType<() => React.JSX.Element>;
    base: React.ComponentType<() => React.JSX.Element>;
  };
  categories?: string[];
  meta?: string;
}

const Index: Record<RegistryKeys, Registry> = {
  lina: {
    name: "scroll-area",
    description:
      "A responsive scroll area that feels native on touch devices, offering custom styling and enhanced interactions where it matters most.",
    variants: {
      radix: ScrollAreaVerticalRadixDemo,
      base: ScrollAreaVerticalBaseUIDemo,
    },
  },
  "vertical-scroll": {
    name: "vertical-scroll-demo",
    description: "Adaptive Vertical Scroll Area Demo",
    variants: {
      radix: ScrollAreaVerticalRadixDemo,
      base: ScrollAreaVerticalBaseUIDemo,
    },
    categories: ["scroll-area"],
    meta: "Special component that uses source.ts",
  },
  "horizontal-scroll": {
    name: "horizontal-scroll-demo",
    description: "Adaptive Horizontal Scroll Area Demo",
    variants: {
      radix: ScrollAreaHorizontalRadixDemo,
      base: ScrollAreaHorizontalBaseUIDemo,
    },
  },
  "timezone-select": {
    name: "timezone-select-demo",
    description: "Adaptive Timezone Select Demo",
    variants: {
      radix: TimezoneSelectRadixExample,
      base: TimezoneSelectBaseUIExample,
    },
  },
};

export { Index, type RegistryKeys, type Registry };
