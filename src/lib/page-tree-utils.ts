import type { Root } from "fumadocs-core/page-tree";

/**
 * Returns a filtered page tree containing only the children
 * of the top-level folder matching the given product slug.
 * Matches by checking if the folder's index URL ends with the slug.
 */
export function getProductTree(
  fullTree: Root,
  productSlug: string,
): Root {
  const expectedUrl = `/docs/${productSlug}`;

  const folder = fullTree.children.find(
    (node) =>
      node.type === "folder" && node.index?.url === expectedUrl,
  );

  if (!folder || folder.type !== "folder") {
    return fullTree;
  }

  return {
    name: folder.name ?? fullTree.name,
    children: folder.children,
  };
}
