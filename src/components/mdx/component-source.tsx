import fs from "fs/promises";
import path from "path";
import * as React from "react";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/helpers/copy-button";
import { CodeCollapsibleWrapper } from "./code-collapsible-wrapper";
import { highlightCode } from "@/lib/highlight-code";
import { Code, File, FileText, Terminal } from "lucide-react";
import {
  RegistryCodeBrowser,
  type RegistryProcessedFile,
} from "./registry-code-browser";
export const STYLES = [
  { name: "nexus-elements" as const, title: "Nexus Elements" },
] as const;
export type Style = (typeof STYLES)[number];

type RegistryFile = {
  path: string;
  content: string;
};

type RegistryItem = {
  files: RegistryFile[];
};

export async function getRegistryItem(
  name: string
): Promise<RegistryItem | null> {
  try {
    const jsonPath = path.join(process.cwd(), "public", "r", `${name}.json`);
    const file = await fs.readFile(jsonPath, "utf-8");
    const parsed = JSON.parse(file) as { files?: RegistryFile[] };
    if (!parsed?.files || !Array.isArray(parsed.files)) {
      return null;
    }
    return { files: parsed.files };
  } catch (error) {
    console.error("Failed to load registry item:", error);
    return null;
  }
}

export async function ComponentSource({
  name,
  src,
  title,
  language,
  collapsible = true,
  className,
  styleName = "nexus-elements",
  showAllFiles = false,
}: React.ComponentProps<"div"> & {
  name?: string;
  src?: string;
  title?: string;
  language?: string;
  collapsible?: boolean;
  styleName?: Style["name"];
  showAllFiles?: boolean;
}) {
  if (!name && !src) {
    return null;
  }

  let code: string | undefined;
  let filesFromRegistry: RegistryFile[] | undefined;

  if (name) {
    const item = await getRegistryItem(name);
    filesFromRegistry = item?.files;
    code = item?.files?.[0]?.content;
  }

  if (src) {
    const file = await fs.readFile(path.join(process.cwd(), src), "utf-8");
    code = file;
  }

  // If asked to render all files from the registry, do so
  if (showAllFiles && filesFromRegistry && filesFromRegistry.length > 0) {
    const processed: RegistryProcessedFile[] = await Promise.all(
      filesFromRegistry.map(async (f) => {
        const fileCode = f.content
          .replaceAll(`@/registry/${styleName}/`, "@/components/")
          .replaceAll("export default", "export")
          .replaceAll("/* eslint-disable react/no-children-prop */\n", "");
        const ext = f.path.split(".").pop() ?? "tsx";
        const highlighted = await highlightCode(fileCode, ext);
        return { path: f.path, code: fileCode, highlighted, language: ext };
      })
    );

    // Load provider files if available
    const providerItem = await getRegistryItem("nexus-provider");
    const providerFilesRaw = providerItem?.files ?? [];
    const providerProcessed: RegistryProcessedFile[] = await Promise.all(
      providerFilesRaw.map(async (f) => {
        const fileCode = f.content
          .replaceAll(`@/registry/${styleName}/`, "@/components/")
          .replaceAll("export default", "export")
          .replaceAll("/* eslint-disable react/no-children-prop */\n", "");
        const ext = f.path.split(".").pop() ?? "tsx";
        const highlighted = await highlightCode(fileCode, ext);
        return { path: f.path, code: fileCode, highlighted, language: ext };
      })
    );

    return (
      <div className={cn("relative", className)}>
        <RegistryCodeBrowser
          componentFiles={processed}
          providerFiles={providerProcessed}
        />
      </div>
    );
  }

  if (!code) {
    return null;
  }

  code = code.replaceAll(`@/registry/${styleName}/`, "@/components/");

  code = code.replaceAll("export default", "export");
  code = code.replaceAll("/* eslint-disable react/no-children-prop */\n", "");

  const lang = language ?? title?.split(".").pop() ?? "tsx";
  const highlightedCode = await highlightCode(code, lang);

  if (!collapsible) {
    return (
      <div className={cn("relative", className)}>
        <ComponentCode
          code={code}
          highlightedCode={highlightedCode}
          language={lang}
          title={title}
        />
      </div>
    );
  }

  return (
    <CodeCollapsibleWrapper className={className}>
      <ComponentCode
        code={code}
        highlightedCode={highlightedCode}
        language={lang}
        title={title}
      />
    </CodeCollapsibleWrapper>
  );
}

function ComponentCode({
  code,
  highlightedCode,
  language,
  title,
}: {
  code: string;
  highlightedCode: string;
  language: string;
  title: string | undefined;
}) {
  return (
    <figure data-rehype-pretty-code-figure="" className="[&>pre]:max-h-96">
      {title && (
        <figcaption
          data-rehype-pretty-code-title=""
          className="text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70"
          data-language={language}
        >
          {getIconForLanguageExtension(language)}
          {title}
        </figcaption>
      )}
      <CopyButton value={code} />
      <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
    </figure>
  );
}

function getIconForLanguageExtension(language: string) {
  const ext = language?.toLowerCase?.() ?? "";
  if (["ts", "tsx", "js", "jsx", "css"].includes(ext)) {
    return <Code />;
  }
  if (["sh", "bash"].includes(ext)) {
    return <Terminal />;
  }
  if (["json"].includes(ext)) {
    return <FileText />;
  }
  return <File />;
}
