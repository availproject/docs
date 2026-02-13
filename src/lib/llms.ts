import { products } from "@/lib/products";
import { source } from "@/lib/source";

type ProductSlug = (typeof products)[number]["slug"];
type DocsPage = typeof source.getPages extends () => Array<infer T> ? T : never;

function urlBelongsToProduct(url: string, slug: ProductSlug): boolean {
  const normalized = url.toLowerCase();

  if (slug === "nexus") {
    return (
      normalized === "/docs/nexus" || normalized.startsWith("/docs/nexus/")
    );
  }

  return (
    normalized === "/docs" ||
    normalized === "/docs/da" ||
    normalized.startsWith("/docs/da/")
  );
}

function getProductPages(allPages: DocsPage[], slug: ProductSlug): DocsPage[] {
  const seen = new Set<string>();

  return allPages.filter((page) => {
    if (!urlBelongsToProduct(page.url, slug)) return false;
    if (seen.has(page.url)) return false;
    seen.add(page.url);
    return true;
  });
}

function bulletLink(name: string, url: string, description?: string): string {
  if (description) {
    return `- [${name}](${url}): ${description}`;
  }
  return `- [${name}](${url})`;
}

export function generateLlmsTxt(): string {
  const allPages = source.getPages();

  const lines: string[] = [
    "# Avail Documentation",
    "",
    "> Avail is a modular blockchain focused on data availability and cross-chain interoperability. This documentation covers Avail DA (data availability layer) and Avail Nexus (cross-chain unification).",
    "",
    "- [Full documentation for LLMs](/llms-full.txt): Complete content for all documentation pages",
  ];

  for (const product of products) {
    const pages = getProductPages(allPages, product.slug);
    if (pages.length === 0) continue;

    lines.push("", `## ${product.label}`, "");

    for (const page of pages) {
      lines.push(
        bulletLink(
          page.data.title,
          page.url,
          page.data.description || undefined,
        ),
      );
    }
  }

  return lines.join("\n");
}

export async function generateLlmsFullTxt(): Promise<string> {
  const allPages = source.getPages();

  const lines: string[] = [
    "# Avail Documentation",
    "",
    "> Avail is a modular blockchain focused on data availability and cross-chain interoperability. This documentation covers Avail DA (data availability layer) and Avail Nexus (cross-chain unification).",
  ];

  for (const product of products) {
    const pages = getProductPages(allPages, product.slug);
    if (pages.length === 0) continue;

    lines.push("", `## ${product.label}`);

    for (const page of pages) {
      const content = await page.data.getText("processed");
      lines.push("", `### ${page.data.title}`, "", content);
    }
  }

  return lines.join("\n");
}
