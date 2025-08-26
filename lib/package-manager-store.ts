"use client";

import { persist } from "zustand/middleware";

import { create } from "zustand";

type PackageManager = "pnpm" | "npm" | "bun" | "yarn";

type PackageManagerState = {
  selectedPackageManager: PackageManager;
  isLoading: boolean;
  setPackageManager: (pm: PackageManager) => void;
  setLoading: (loading: boolean) => void;
};

const usePackageManagerStore = create<PackageManagerState>()(
  persist(
    (set) => ({
      selectedPackageManager: "pnpm",
      isLoading: true,
      setPackageManager: (pm) => set({ selectedPackageManager: pm }),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: "package-manager-store",
    }
  )
);

export { usePackageManagerStore, type PackageManager };
