"use client";

import { Code, File, FileText, Terminal } from "@phosphor-icons/react";
import * as React from "react";
import { CopyButton } from "@/components/helpers/copy-button";
import { useAnalytics } from "@/hooks/use-analytics";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export type RegistryProcessedFile = {
  path: string;
  code: string;
  highlighted: string;
  language: string;
};

function LanguageIcon({ language }: { language: string }) {
  const ext = language?.toLowerCase?.() ?? "";
  if (["ts", "tsx", "js", "jsx", "css"].includes(ext)) return <Code />;
  if (["sh", "bash"].includes(ext)) return <Terminal />;
  if (["json"].includes(ext)) return <FileText />;
  return <File />;
}

export function RegistryCodeBrowser({
  componentFiles,
  providerFiles,
}: {
  componentFiles: RegistryProcessedFile[];
  providerFiles?: RegistryProcessedFile[];
}) {
  const hasProvider = (providerFiles?.length ?? 0) > 0;
  const [tab, setTab] = React.useState<"component" | "provider">(
    hasProvider ? "component" : "component",
  );
  const files = tab === "component" ? componentFiles : (providerFiles ?? []);
  const [idx, setIdx] = React.useState(0);
  const { trackEvent } = useAnalytics();

  React.useEffect(() => {
    setIdx(0);
  }, []);

  const handleTabChange = (value: string) => {
    const newTab = value as "component" | "provider";
    trackEvent("code_tab_switched", {
      tab_name: newTab,
      previous_tab: tab,
    });
    setTab(newTab);
  };

  const handleFileChange = (value: string) => {
    const newIdx = parseInt(value, 10);
    const file = files[newIdx];
    if (file) {
      trackEvent("code_file_selected", {
        file_name: file.path,
        component_name: file.path.split("/").pop(),
      });
    }
    setIdx(newIdx);
  };

  const current = files[idx];
  const currentComponent = componentFiles[idx] ?? componentFiles[0];
  const currentProvider = providerFiles?.[idx] ?? providerFiles?.[0];
  const displayPath = (p?: string) =>
    (p || "").replace(/^registry\/nexus-elements\//, "components/");

  return (
    <Tabs value={tab} onValueChange={handleTabChange} className="grid gap-4">
      <TabsContent value="component" className="w-full border-none!">
        {currentComponent && (
          <figure
            data-rehype-pretty-code-figure=""
            className="[&>pre]:max-h-96"
          >
            <figcaption
              data-rehype-pretty-code-title=""
              className="text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70"
              data-language={currentComponent.language}
            >
              <LanguageIcon language={currentComponent.language} />

              <div className="flex items-center justify-between gap-x-6 w-full">
                <div className="flex items-center w-full gap-2">
                  {files.length > 1 && (
                    <Select
                      value={String(idx)}
                      onValueChange={handleFileChange}
                    >
                      <SelectTrigger className="text-sm border px-2 py-1 bg-background">
                        <SelectValue placeholder="Select file" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Files</SelectLabel>
                          {files.map((f, i) => (
                            <SelectItem key={f.path} value={String(i)}>
                              {displayPath(f.path)}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <TabsList className="p-0 bg-transparent">
                    <TabsTrigger
                      value="component"
                      className="px-2 py-1 text-xs data-[state=active]:bg-transparent bg-transparent border-none underline-offset-3"
                    >
                      Component
                    </TabsTrigger>
                    <TabsTrigger
                      value="provider"
                      className="px-2 py-1 text-xs data-[state=active]:bg-transparent bg-transparent border-none underline-offset-3"
                      disabled={!hasProvider}
                    >
                      Provider
                    </TabsTrigger>
                  </TabsList>
                  {current && (
                    <CopyButton
                      value={current.code}
                      customPosition=""
                      language={current.language}
                      codeTitle={displayPath(current.path)}
                      codeType="component"
                    />
                  )}
                </div>
              </div>
            </figcaption>
            <div
              dangerouslySetInnerHTML={{ __html: currentComponent.highlighted }}
            />
          </figure>
        )}
      </TabsContent>

      <TabsContent value="provider" className="w-full">
        {hasProvider && currentProvider && (
          <figure
            data-rehype-pretty-code-figure=""
            className="[&>pre]:max-h-96"
          >
            <figcaption
              data-rehype-pretty-code-title=""
              className="text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70"
              data-language={currentProvider.language}
            >
              <LanguageIcon language={currentProvider.language} />
              {displayPath(currentProvider.path)}

              <div className="flex items-center justify-end w-full">
                <div className="flex items-center gap-2">
                  <TabsList className="p-0 bg-transparent">
                    <TabsTrigger
                      value="component"
                      className="px-2 py-1 text-xs data-[state=active]:bg-transparent bg-transparent border-none underline-offset-3"
                    >
                      Component
                    </TabsTrigger>
                    <TabsTrigger
                      value="provider"
                      className="px-2 py-1 text-xs data-[state=active]:bg-transparent bg-transparent border-none underline-offset-3"
                      disabled={!hasProvider}
                    >
                      Provider
                    </TabsTrigger>
                  </TabsList>
                  {current && (
                    <CopyButton
                      value={current.code}
                      customPosition=""
                      language={current.language}
                      codeTitle={displayPath(current.path)}
                      codeType="component"
                    />
                  )}
                </div>
              </div>
            </figcaption>
            <div
              dangerouslySetInnerHTML={{ __html: currentProvider.highlighted }}
            />
          </figure>
        )}
      </TabsContent>
    </Tabs>
  );
}
