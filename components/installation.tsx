import AnchorHeading from "@/components/anchor-heading";
import CLIBlock from "@/components/cli-block";
import CodeBlock from "@/components/code-block";
import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getComponentCode } from "@/lib/code-highlight";

type InstallationProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Installation({ searchParams }: InstallationProps) {
  const resolvedSearchParams = await searchParams;
  const variant = resolvedSearchParams?.variant === "base" ? "base" : "radix";
  const pathToPrimaryHook = "hooks/use-has-primary-touch.tsx";

  const language = "tsx";
  const name = "scroll-area";
  const componentName = `${name}-${variant}`;
  const [codeData, hookCodeData] = await Promise.all([
    getComponentCode(componentName, language),
    getComponentCode("", "tsx", pathToPrimaryHook),
  ]);

  const mainDependency = variant === "base" ? "@base-ui-components/react" : "@radix-ui/react-scroll-area";
  const devDependency = "tw-animate-css";

  return (
    <section className="min-w-0 space-y-6 sm:px-6">
      <div className="space-y-1">
        <AnchorHeading id="installation">Installation</AnchorHeading>
        <p className="text-muted-foreground leading-7">
          Add the adaptive scroll area component to your project with ease.
        </p>
      </div>

      <div className="">
        <Tabs defaultValue="cli" className="w-full min-w-0">
          <TabsList className="relative h-8 bg-transparent p-0">
            <TabsTrigger value="cli" className="text-base">
              CLI
            </TabsTrigger>
            <TabsTrigger value="manual" className="text-base">
              Manual
            </TabsTrigger>
            <TabsIndicator />
          </TabsList>

          <TabsContent value="cli" className="mt-6">
            <div className="space-y-6">
              <div className="space-y-0">
                <h4 className="font-heading font- mt-12 scroll-m-28 text-lg font-medium tracking-tight first:mt-0 sm:text-2xl lg:mt-20 [&+p]:!mt-4 *:[code]:text-2xl">
                  Quick Installation
                </h4>
                <p className="text-muted-foreground text-sm">
                  Use the CLI to add the component to your project. This will automatically install all dependencies and
                  copy the necessary files.
                </p>
              </div>
              <CLIBlock name="lina" className="mt-0" />
            </div>
          </TabsContent>
          <TabsContent value="manual" className="mt-6">
            <div className="space-y-6 sm:space-y-10 lg:space-y-12">
              <div className="space-y-6">
                <div className="space-y-0">
                  <h4 className="mt-12 scroll-m-28 text-lg font-medium tracking-tight first:mt-0 sm:text-2xl lg:mt-20 [&+p]:!mt-4">
                    Install main dependencies
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Install the required {variant === "base" ? "Base UI" : "Radix UI"} dependencies for the scroll area
                    component.
                  </p>
                </div>
                <CLIBlock command={`npm install ${mainDependency}`} />
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="font-heading font- mt-12 scroll-m-28 text-lg font-medium tracking-tight first:mt-0 sm:text-2xl lg:mt-20 [&+p]:!mt-4 *:[code]:text-2xl">
                    Install development dependencies
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Install the animation utilities for smooth transitions.
                  </p>
                </div>
                <CLIBlock command={`npm install -D ${devDependency}`} />
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="font-heading font- mt-12 scroll-m-28 text-lg font-medium tracking-tight first:mt-0 sm:text-2xl lg:mt-20 [&+p]:!mt-4 *:[code]:text-2xl">
                    Copy the touch detection hook
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Add the hook that detects touch-primary devices for adaptive behavior.
                  </p>
                </div>
                {!hookCodeData ? (
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
                    code={hookCodeData.code}
                    preHighlighted={hookCodeData.highlightedCode}
                    className="[&_pre]:max-h-[400px]"
                  />
                )}
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="font-heading font- mt-12 scroll-m-28 text-lg font-medium tracking-tight first:mt-0 sm:text-2xl lg:mt-20 [&+p]:!mt-4 *:[code]:text-2xl">
                    Copy the component
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Add the main scroll area component with adaptive masking and touch-optimized behavior.
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
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
