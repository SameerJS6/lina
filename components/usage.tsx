import AnchorHeading from "@/components/anchor-heading";
import CodeBlock from "@/components/code-block";
import { getComponentCode } from "@/lib/code-highlight";

type UsageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Usage({ searchParams }: UsageProps) {
  const resolvedSearchParams = await searchParams;
  const variant = resolvedSearchParams?.variant === "base" ? "base" : "radix";

  const pathToDemoUsage =
    variant === "base" ? "registry/base-ui/examples/usage-demo.tsx" : "registry/radix-ui/examples/usage-demo.tsx";
  const language = "tsx";
  const codeData = await getComponentCode("", language, pathToDemoUsage);

  return (
    <section className="min-w-0 space-y-6 sm:px-6">
      <div className="space-y-1">
        <AnchorHeading id="usage">Usage</AnchorHeading>
        <p className="text-muted-foreground leading-7">
          Add the adaptive scroll area component to your project with ease.
        </p>
      </div>
      {!codeData ? (
        <p className="text-muted-foreground text-sm">
          No code available. If you think this is an error, please{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/SameerJS6/lina/issues"
            className="text-foreground font-medium underline hover:no-underline"
          >
            open an issue
          </a>
          .
        </p>
      ) : (
        <CodeBlock
          lang={language}
          code={codeData.code}
          preHighlighted={codeData.highlightedCode}
          className="[&_pre]:max-h-[400px]"
        />
      )}
    </section>
  );
}
