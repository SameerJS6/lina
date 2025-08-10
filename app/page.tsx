import { ScrollAreaHorizontalDemo as BaseUIScrollAreaHorizontalDemo } from "@/registry/base-ui/examples/horizontal-scroll";
import { ScrollAreaDemo as BaseUIScrollAreaDemo } from "@/registry/base-ui/examples/vertical-scroll";
import { ScrollAreaHorizontalDemo as RadixScrollAreaHorizontalDemo } from "@/registry/radix-ui/examples/horizontal-scroll";
import { ScrollAreaDemo as RadixScrollAreaDemo } from "@/registry/radix-ui/examples/vertical-scroll";

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-wrap items-center justify-center gap-4 py-6">
      <div className="flex size-full flex-wrap justify-center gap-4">
        <RadixScrollAreaDemo />
        <RadixScrollAreaHorizontalDemo />
      </div>

      <div className="flex size-full flex-wrap justify-center gap-4">
        <BaseUIScrollAreaDemo />
        <BaseUIScrollAreaHorizontalDemo />
      </div>
    </main>
  );
}
