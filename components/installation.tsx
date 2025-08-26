import AnchorHeading from "@/components/anchor-heading";
import CLIBlock from "@/components/cli-block";
import ManualInstallationSection from "@/components/manual-installation-block";
import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getComponentCode } from "@/lib/code-highlight";

export default async function Installation() {
  const pathToPrimaryHook = "hooks/use-has-primary-touch.tsx";

  const language = "tsx";
  const name = "lina";

  const [radixCodeData, baseCodeData, hookCodeData] = await Promise.all([
    getComponentCode(`${name}-radix`, language),
    getComponentCode(`${name}-base`, language),
    getComponentCode("", "tsx", pathToPrimaryHook),
  ]);

  const variantData = {
    base: {
      code: baseCodeData,
      mainDependency: "@base-ui-components/react",
    },
    radix: {
      code: radixCodeData,
      mainDependency: "@radix-ui/react-scroll-area",
    },
  } as const;

  return (
    <section className="min-w-0 space-y-6 sm:px-6">
      <div className="space-y-1">
        <AnchorHeading id="installation">Installation</AnchorHeading>
        <p className="text-muted-foreground leading-7">
          Add the adaptive scroll area component to your project with ease.
        </p>
      </div>

      <div>
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
            <ManualInstallationSection variantData={variantData} hookCodeData={hookCodeData} language={language} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
