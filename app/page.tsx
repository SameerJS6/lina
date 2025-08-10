import { ScrollAreaHorizontalDemo as BaseUIScrollAreaHorizontalDemo } from "@/registry/base-ui/examples/horizontal-scroll";
import { ScrollAreaDemo as BaseUIScrollAreaDemo } from "@/registry/base-ui/examples/vertical-scroll";
import { ScrollAreaHorizontalDemo as RadixScrollAreaHorizontalDemo } from "@/registry/radix-ui/examples/horizontal-scroll";
import { ScrollAreaDemo as RadixScrollAreaDemo } from "@/registry/radix-ui/examples/vertical-scroll";

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-wrap items-center justify-center gap-8 py-6">
      <div>
        <div className="mx-auto max-w-2xl space-y-4">
          <h2 className="text-3xl font-semibold tracking-tight max-sm:px-4">Radix UI</h2>
          <div className="flex size-full flex-wrap justify-center gap-4">
            <RadixScrollAreaDemo />
            <RadixScrollAreaHorizontalDemo />
          </div>
        </div>
      </div>

      <div>
        <div className="mx-auto max-w-2xl space-y-4">
          <h2 className="text-3xl font-semibold tracking-tight max-sm:px-4">Base UI</h2>
          <div className="flex size-full flex-wrap justify-center gap-4">
            <BaseUIScrollAreaDemo />
            <BaseUIScrollAreaHorizontalDemo />
          </div>
        </div>
      </div>
    </main>
  );
}
