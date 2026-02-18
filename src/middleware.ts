import { type NextRequest, NextResponse } from "next/server";
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
 *  - Vary: accept  (so CDN caches both representations)
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

function normalizeDocsSlugForMarkdownApi(slug: string): string {
  if (!slug) {
    return slug;
  }

  const [section, ...rest] = slug.split("/");
  // DA docs are canonicalized as /docs/DA/* in the content source.
  // Normalize lowercase incoming URLs so markdown API lookups succeed.
  if (section.toLowerCase() === "da") {
    return ["DA", ...rest].join("/");
  }

  return slug;
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

  if (!acceptsMarkdown(request)) {
    return NextResponse.next();
  }

  // Strip the /docs prefix to get the slug for the markdown API.
  // /docs/da/build/networks → /api/markdown/DA/build/networks
  const rawSlug = request.nextUrl.pathname.replace(/^\/docs\/?/, "");
  const slug = normalizeDocsSlugForMarkdownApi(rawSlug);
  const markdownUrl = new URL(
    slug ? `/api/markdown/${slug}` : "/api/markdown",
    request.url,
  );

  // Preserve any query params (e.g. ?format=json)
  request.nextUrl.searchParams.forEach((value, key) => {
    markdownUrl.searchParams.set(key, value);
  });

  return NextResponse.rewrite(markdownUrl, {
    headers: {
      Vary: "accept",
    },
  });
}
