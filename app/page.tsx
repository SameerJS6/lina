import { Suspense } from "react";
import Link from "next/link";

import Examples from "@/components/examples";
import Features from "@/components/features";
import Installation from "@/components/installation";
import PageWideScrollMask from "@/components/page-wide-scroll-mask";
import { buttonVariants } from "@/components/ui/button";
import Usage from "@/components/usage";
import Why from "@/components/why";

type HomeProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>; // TODO: IMPROVE TYPE SAFETY OF SEARCH PARAMS (USE NUQS)
};

export default async function Home({ searchParams }: HomeProps) {
  return (
    <main className="container space-y-8">
      <section className="flex flex-col items-center gap-2 py-8 text-center sm:px-6 md:py-16 lg:py-20 xl:gap-4">
        <div className="bg-card text-card-foreground mb-2 rounded-full border px-4 py-1 lg:mb-0">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="inline items-center gap-1"
            href="https://ui.shadcn.com/docs/components/scroll-area"
          >
            Shadcn UI
          </a>{" "}
          Drop-in Replacement
          {/* Drop-in replacement for{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="inline items-center gap-1 underline"
            href="https://ui.shadcn.com/docs/components/scroll-area"
          >
            shadcn/ui{" "}
          </a>
          Scroll Area */}
        </div>
        <h1 className="font-inter leading-tighter text-primary w-full text-4xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter">
          {/* Adaptive Scroll Area */}
          {/* Dynamic Scroll: Native Touch, Custom Control */}
          The Adaptive Scroll Solution for Modern UIs
        </h1>

        <p className="text-foreground max-w-4xl text-base text-balance sm:text-lg">
          {/* A responsive scroll area that feels native on touch devices and provides custom styling where it matters most. */}
          A responsive scroll area that feels native on touch devices, offering custom styling and enhanced interactions
          where it matters most.
        </p>
        <div className="flex w-full items-center justify-center gap-2 pt-2 **:data-[slot=button]:shadow-none">
          <Link href="#examples" className={buttonVariants({ size: "sm" })}>
            See it in Action
          </Link>
          <Link href="#installation" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            Install Now
          </Link>
        </div>
      </section>
      <Suspense>
        <section className="space-y-10 sm:space-y-12 md:space-y-14 lg:space-y-16 xl:space-y-24">
          <Features />
          <section className="grid w-full min-w-0 gap-4 lg:grid-cols-2">
            <Installation searchParams={searchParams} />
            <Usage searchParams={searchParams} />
          </section>
          <Why />
          <Examples searchParams={searchParams} />
        </section>
      </Suspense>
      <PageWideScrollMask />
    </main>
  );
}
