import AnchorHeading from "@/components/anchor-heading";
import CodeDisplaySection from "@/components/code-display-block";

import { getComponentCode } from "@/lib/code-highlight";

export default async function Usage() {
  const language = "tsx";

  const [radixCodeData, baseCodeData] = await Promise.all([
    getComponentCode("", language, "registry/radix-ui/examples/usage-demo.tsx"),
    getComponentCode("", language, "registry/base-ui/examples/usage-demo.tsx"),
  ]);

  const variantData = {
    base: {
      code: baseCodeData,
    },
    radix: {
      code: radixCodeData,
    },
  } as const;

  return (
    <section className="min-w-0 space-y-6 sm:px-6">
      <div className="space-y-1">
        <AnchorHeading id="usage">Usage</AnchorHeading>
        <p className="text-muted-foreground leading-7">
          Add the adaptive scroll area component to your project with ease.
        </p>
      </div>
      <CodeDisplaySection variantData={variantData} language={language} maxHeight="[&_pre]:max-h-[400px]" />
    </section>
  );
}
