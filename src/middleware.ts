import { type NextRequest, NextResponse } from "next/server";
import { MARKDOWN_VARY } from "@/lib/agent-headers";
import { applyRedirects } from "./redirect-middleware";

/**
 * Content negotiation middleware.
 *
 * When an agent sends `Accept: text/markdown` to any `/docs/**` URL,
 * rewrite the request to the internal `/api/markdown/` endpoint so the
 * response is clean markdown instead of HTML.
 *
 * The markdown response includes:
 *  - Content-Type: text/markdown
 *  - x-markdown-tokens: estimated token count (chars / 4)
 *  - Content-Signal: ai-train=yes, search=yes, ai-input=yes
 *  - Vary: Accept  (so CDN caches both representations)
 */

export const config = {
  // Run on docs URLs (for markdown rewrites) and on legacy paths that need redirects.
  matcher: [
    "/docs/:path*",
    "/da/:path*",
    "/nexus/:path*",
    "/user-guides/:path*",
  ],
};

function rewriteToMarkdown(markdownUrl: URL) {
  const response = NextResponse.rewrite(markdownUrl);
  // Set (not append) so the response carries one merged Vary. A separate
  // `Vary: accept` line is easy for CDNs and scanners to miss, which lets
  // an HTML response get served from an agent's markdown cache entry.
  response.headers.set("Vary", MARKDOWN_VARY);
  return response;
}

function acceptsMarkdown(request: NextRequest): boolean {
  const accept = request.headers.get("accept") ?? "";
  // Match explicit text/markdown preference.
  // Exclude broad */* (browsers) so normal page loads are unaffected.
  return accept.includes("text/markdown");
}

export function middleware(request: NextRequest) {
  // First, try to apply redirect rules for legacy URLs.
  const redirectResponse = applyRedirects(request);
  if (redirectResponse) {
    return redirectResponse;
  }

  // Only docs paths participate in markdown content negotiation.
  if (!request.nextUrl.pathname.startsWith("/docs")) {
    return NextResponse.next();
  }

  // .md suffix → rewrite to markdown API
  // e.g. /docs/nexus/get-started.md → /api/markdown/nexus/get-started
  if (request.nextUrl.pathname.endsWith(".md")) {
    const slug = request.nextUrl.pathname
      .replace(/\.md$/, "")
      .replace(/^\/docs\/?/, "");
    const markdownUrl = new URL(
      slug ? `/api/markdown/${slug}` : "/api/markdown",
      request.url,
    );
    request.nextUrl.searchParams.forEach((value, key) => {
      markdownUrl.searchParams.set(key, value);
    });
    return rewriteToMarkdown(markdownUrl);
  }

  if (!acceptsMarkdown(request)) {
    return NextResponse.next();
  }

  // Strip the /docs prefix to get the slug for the markdown API.
  // /docs/da/build/networks → /api/markdown/da/build/networks
  const slug = request.nextUrl.pathname.replace(/^\/docs\/?/, "");
  const markdownUrl = new URL(
    slug ? `/api/markdown/${slug}` : "/api/markdown",
    request.url,
  );

  // Preserve any query params (e.g. ?format=json)
  request.nextUrl.searchParams.forEach((value, key) => {
    markdownUrl.searchParams.set(key, value);
  });

  return rewriteToMarkdown(markdownUrl);
}
