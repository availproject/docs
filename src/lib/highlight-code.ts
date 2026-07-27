import { codeToHtml, type ShikiTransformer } from "shiki";

export const transformers: ShikiTransformer[] = [
  {
    code(node) {
      if (node.tagName === "code") {
        // Original source for copy
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const raw = (this as any)?.source as string;
        node.properties ??= {};
        if (typeof raw === "string" && raw.length > 0) {
          node.properties["__raw__"] = raw;
          // Enable line numbers by default
          node.properties["data-line-numbers"] = "";
        }

        // Build CLI command variants where applicable
        const setCliVariants = (
          npm: string,
          yarn: string,
          pnpm: string,
          bun: string,
        ) => {
          node.properties["__npm__"] = npm;
          node.properties["__yarn__"] = yarn;
          node.properties["__pnpm__"] = pnpm;
          node.properties["__bun__"] = bun;
        };

        if (typeof raw === "string") {
          // Bare npm install (no package specified)
          if (raw.trim() === "npm install") {
            setCliVariants(
              raw,
              raw.replace("npm install", "yarn install"),
              raw.replace("npm install", "pnpm install"),
              raw.replace("npm install", "bun install"),
            );
          }
          // npm install with package name
          else if (raw.startsWith("npm install ")) {
            setCliVariants(
              raw,
              raw.replace("npm install", "yarn add"),
              raw.replace("npm install", "pnpm add"),
              raw.replace("npm install", "bun add"),
            );
          }
          if (raw.startsWith("npx create-")) {
            setCliVariants(
              raw,
              raw.replace("npx create-", "yarn create "),
              raw.replace("npx create-", "pnpm create "),
              raw.replace("npx", "bunx --bun"),
            );
          }
          if (raw.startsWith("npm create")) {
            setCliVariants(
              raw,
              raw.replace("npm create", "yarn create"),
              raw.replace("npm create", "pnpm create"),
              raw.replace("npm create", "bun create"),
            );
          } else if (raw.startsWith("npx")) {
            setCliVariants(
              raw,
              raw.replace("npx", "yarn"),
              raw.replace("npx", "pnpm dlx"),
              raw.replace("npx", "bunx --bun"),
            );
          }
          if (raw.startsWith("npm run")) {
            setCliVariants(
              raw,
              raw.replace("npm run", "yarn"),
              raw.replace("npm run", "pnpm"),
              raw.replace("npm run", "bun"),
            );
          }
        }
      }
    },
    pre(node) {
      node.properties ??= {};
      const existingClass =
        typeof node.properties["class"] === "string"
          ? (node.properties["class"] as string)
          : "";
      node.properties["class"] = [
        "shiki",
        "min-w-0",
        "overflow-x-auto",
        "px-4",
        "py-3.5",
        "outline-none",
        "has-[[data-highlighted-line]]:px-0",
        "has-[[data-line-numbers]]:px-0",
        "has-[[data-slot=tabs]]:p-0",
        existingClass,
      ]
        .filter(Boolean)
        .join(" ");
    },
    line(node) {
      node.properties ??= {};
      node.properties["data-line"] = "";
    },
  },
];

export async function highlightCode(
  code: string,
  language: string = "tsx",
): Promise<string> {
  const html = await codeToHtml(code, {
    lang: language,
    themes: {
      dark: "github-dark",
      light: "github-light",
    },
    transformers,
  });
  return html;
}
