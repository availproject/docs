import { type NextRequest, NextResponse } from "next/server";
import { MARKDOWN_VARY } from "@/lib/agent-headers";
import { agentNotFoundResponse } from "@/lib/agent-not-found";
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
  matcher: [
    // The homepage participates in markdown negotiation only (see below).
    "/",
    // Every other page path, so an unknown path can answer an agent's
    // Accept: text/markdown request with a markdown 404. API, Next internals
    // and the OG image route never need negotiation.
    "/((?!api/|_next/|og/|ingest/).*)",
  ],
};

/** Pages that exist outside the docs content source. */
const KNOWN_PAGES = new Set(["/about", "/contact", "/privacy"]);

/** Path prefixes that handle their own responses and are never 404-rewritten. */
const RESERVED_PREFIXES = ["/docs", "/api", "/_next", "/og", "/ingest"];

/** Legacy paths whose redirect rules run through this middleware. */
const LEGACY_PREFIXES = ["/docs", "/da", "/nexus", "/user-guides"];

function hasPrefix(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

/** A path that no page or static file owns. */
function isUnknownPagePath(pathname: string): boolean {
  if (KNOWN_PAGES.has(pathname)) return false;
  if (/\.[a-z0-9]+$/i.test(pathname)) return false;
  return !RESERVED_PREFIXES.some((prefix) => hasPrefix(pathname, prefix));
}

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
  const { pathname } = request.nextUrl;

  // Homepage. Agents asking for the site as markdown get the docs index
  // rather than an HTML shell. Redirect rules deliberately do not run here:
  // the matcher covers "/" solely for content negotiation, and running them
  // would change behaviour for a path middleware previously never saw.
  if (pathname === "/") {
    return acceptsMarkdown(request)
      ? rewriteToMarkdown(new URL("/api/markdown", request.url))
      : NextResponse.next();
  }

  const unknownForAgent =
    acceptsMarkdown(request) && isUnknownPagePath(pathname);
  const isLegacyScope = LEGACY_PREFIXES.some((prefix) =>
    hasPrefix(pathname, prefix),
  );
  if (!unknownForAgent && !isLegacyScope) {
    return NextResponse.next();
  }

  // Redirect matching uses legacy prefixes internally, so only invoke it for
  // segment-aware legacy scopes. Otherwise `/database` could match `/da`.
  if (isLegacyScope) {
    const redirectResponse = applyRedirects(request);
    if (redirectResponse) {
      return redirectResponse;
    }
  }

  if (unknownForAgent) {
    return agentNotFoundResponse(pathname);
  }

  // Only docs paths participate in markdown content negotiation.
  if (!pathname.startsWith("/docs")) {
    return NextResponse.next();
  }

  // .md suffix → rewrite to markdown API
  // e.g. /docs/nexus/get-started.md → /api/markdown/nexus/get-started
  if (pathname.endsWith(".md")) {
    const slug = pathname.replace(/\.md$/, "").replace(/^\/docs\/?/, "");
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
  const slug = pathname.replace(/^\/docs\/?/, "");
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
