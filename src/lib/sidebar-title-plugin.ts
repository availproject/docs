import type { LoaderPlugin } from "fumadocs-core/source";

type PageData = Record<string, unknown>;

function getSidebarTitle(
  storage: {
    read(path: string): { format: string; data: unknown } | undefined;
  },
  filePath: string,
): string | undefined {
  const file = storage.read(filePath);
  if (file?.format !== "page") return undefined;

  const sidebarTitle = (file.data as PageData).sidebarTitle;
  return typeof sidebarTitle === "string" ? sidebarTitle : undefined;
}

/**
 * Replaces sidebar item names with the `sidebarTitle` frontmatter field
 * when present, keeping the full `title` as the page heading.
 */
export function sidebarTitlePlugin(): LoaderPlugin {
  return {
    name: "sidebar-title",
    transformPageTree: {
      file(node, filePath) {
        if (!filePath) return node;

        const title = getSidebarTitle(this.storage, filePath);
        return title ? { ...node, name: title } : node;
      },
      folder(node) {
        const indexFilePath = node.index?.$ref?.file;
        if (!indexFilePath) return node;

        const title = getSidebarTitle(this.storage, indexFilePath);
        return title ? { ...node, name: title } : node;
      },
    },
  };
}
