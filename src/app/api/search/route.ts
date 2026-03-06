import { findPath } from "fumadocs-core/page-tree";
import { createFromSource } from "fumadocs-core/search/server";
import type { NextRequest } from "next/server";
import { trackAgentRequest } from "@/lib/analytics/agent-tracking";
import { source } from "@/lib/source";

const searchAPI = createFromSource(source, {
  language: "english",
  sort: { enabled: false },
  search: {
    relevance: {
      k: 1.5,
      b: 0.9,
    },
  },
  buildIndex: async (page) => {
    const loaded =
      "load" in page.data && typeof page.data.load === "function"
        ? await page.data.load()
        : page.data;

    const structuredData = (
      loaded as {
        structuredData: {
          headings: Array<{ id: string; content: string }>;
          contents: Array<{ heading?: string; content: string }>;
        };
      }
    ).structuredData;

    // Compute breadcrumbs from page tree
    const pageTree = source.getPageTree(page.locale);
    const path = findPath(
      pageTree.children,
      (node) => node.type === "page" && node.url === page.url,
    );
    let breadcrumbs: string[] | undefined;
    if (path) {
      breadcrumbs = [];
      path.pop();
      if (typeof pageTree.name === "string" && pageTree.name.length > 0) {
        breadcrumbs.push(pageTree.name);
      }
      for (const segment of path) {
        if (typeof segment.name === "string" && segment.name.length > 0) {
          breadcrumbs.push(segment.name);
        }
      }
    }

    return {
      id: page.url,
      title: page.data.title ?? "",
      description: page.data.description,
      breadcrumbs,
      url: page.url,
      structuredData: {
        headings: structuredData.headings,
        contents: [], // Skip content blocks — titles + headings cover navigation needs
      },
    };
  },
});

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  // Agents/programmatic consumers: server-side search with BM25 tuning
  if (url.searchParams.has("query")) {
    trackAgentRequest(request, { route: "/api/search" });
    return searchAPI.GET(request);
  }

  // Search dialog: export full index for client-side search
  const response = await searchAPI.staticGET();
  response.headers.set(
    "Cache-Control",
    "public, max-age=3600, s-maxage=31536000, stale-while-revalidate=86400",
  );
  return response;
}
