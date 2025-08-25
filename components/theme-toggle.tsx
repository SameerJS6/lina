"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

import { useMetaColor } from "@/hooks/use-meta-color";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const { metaColor, setMetaColor } = useMetaColor();

  React.useEffect(() => {
    setMetaColor(metaColor);
  }, [metaColor, setMetaColor]);

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  return (
    <Button variant="ghost" size="icon" className="group/toggle size-8" onClick={toggleTheme} title="Toggle theme">
      <div className="border-primary aspect-square size-4 rounded-full border-2 [background:linear-gradient(90deg,var(--background)_50%,var(--primary)_50%)]" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
