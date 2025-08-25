"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;

    if (typeof window === "undefined") return;

    const key = "phc_if0JhFzod0CXwQO92EQ0z5fjQgGT2xXPLPVJmu43nZl";
    if (!key) return;

    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      capture_pageview: true,
      capture_pageleave: true,
      name: "Lina",
      defaults: "2025-05-24",
      person_profiles: "always",
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
