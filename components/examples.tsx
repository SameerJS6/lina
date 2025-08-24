import { Suspense } from "react";

import AnchorHeading from "@/components/anchor-heading";
import CLIBlock from "@/components/cli-block";
import ComponentPreview from "@/components/component-preview";

type ExamplesProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function Examples({ searchParams }: ExamplesProps) {
  return (
    <section className="space-y-6 sm:space-y-8 sm:px-6 lg:space-y-10">
      <div className="space-y-1">
        <AnchorHeading id="examples" className="scroll-m-16">
          Examples
        </AnchorHeading>
        <p className="text-muted-foreground leading-7">
          Explore various examples showcasing the capabilities of the Adaptive Scroll Area component.
        </p>
      </div>
      <div className="space-y-10 sm:space-y-12 lg:space-y-24">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex min-w-0 flex-col justify-between">
            <div>
              <h2 className="scroll-m-20 text-2xl font-medium tracking-tight">Vertical Scroll Demo</h2>
              <p className="text-muted-foreground mt-6 leading-7">
                Experience smooth vertical scrolling with customizable scrollbars, perfect for long content sections and
                lists.
              </p>
            </div>
            <CLIBlock name="vertical-scroll" />
          </div>
          <Suspense>
            <ComponentPreview name="vertical-scroll" className="my-0" searchParams={searchParams} />
          </Suspense>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex min-w-0 flex-col justify-between">
            <div>
              <h2 className="scroll-m-20 text-2xl font-medium tracking-tight">Horizontal Scroll Demo</h2>
              <p className="text-muted-foreground mt-6 leading-7">
                Implement elegant horizontal scrolling for carousels, galleries, and overflow content with intuitive
                controls.
              </p>
            </div>
            <CLIBlock name="horizontal-scroll" />
          </div>
          <Suspense>
            <ComponentPreview name="horizontal-scroll" className="my-0" searchParams={searchParams} />
          </Suspense>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex min-w-0 flex-col justify-between">
            <div>
              <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Timezone Select Example</h2>
              <p className="text-muted-foreground mt-6 leading-7">
                A customizable timezone select component demonstrating advanced scroll functionality with search and
                filtering capabilities.
              </p>
            </div>
            <CLIBlock name="timezone-select" />
          </div>
          <Suspense>
            <ComponentPreview name="timezone-select" searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
