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

function FileSelector({
  files,
  idx,
  displayPath,
  onFileChange,
}: {
  files: RegistryProcessedFile[];
  idx: number;
  displayPath: (p?: string) => string;
  onFileChange: (value: string) => void;
}) {
  if (files.length <= 1) {
    return (
      <span className="truncate text-sm font-mono">
        {displayPath(files[0]?.path)}
      </span>
    );
  }

  return (
    <Select value={String(idx)} onValueChange={onFileChange}>
      <SelectTrigger className="text-sm font-mono border px-2 py-1 bg-background rounded-none">
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
  );
}

export function RegistryCodeBrowser({
  componentFiles,
  providerFiles,
}: {
  componentFiles: RegistryProcessedFile[];
  providerFiles?: RegistryProcessedFile[];
}) {
  const files = componentFiles;
  const [idx, setIdx] = React.useState(0);
  const { trackEvent } = useAnalytics();

  const handleFileChange = (value: string) => {
    const newIdx = Number.parseInt(value, 10);
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
  const displayPath = (p?: string) =>
    (p || "").replace(/^registry\/nexus-elements\//, "components/");

  return (
    <figure
      data-rehype-pretty-code-figure=""
      className="[&_pre]:min-w-0 [&_pre]:overflow-x-auto [&_pre]:max-h-96"
    >
      <figcaption
        data-rehype-pretty-code-title=""
        className="text-code-foreground [&_svg]:text-code-foreground flex items-center gap-3 [&_svg]:size-4 [&_svg]:opacity-70"
        data-language={current?.language}
      >
        {current && <LanguageIcon language={current.language} />}

        <div className="flex items-center justify-between w-full min-w-0 gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <FileSelector
              files={files}
              idx={idx}
              displayPath={displayPath}
              onFileChange={handleFileChange}
            />
          </div>
          <div className="flex items-center gap-2 shrink-0">
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
      {current && (
        // biome-ignore lint/security/noDangerouslySetInnerHtml: server-rendered syntax-highlighted code
        <div dangerouslySetInnerHTML={{ __html: current.highlighted }} />
      )}
    </figure>
  );
}
