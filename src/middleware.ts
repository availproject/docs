import { type NextRequest, NextResponse } from "next/server";

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
  matcher: "/docs/:path*",
};

function acceptsMarkdown(request: NextRequest): boolean {
  const accept = request.headers.get("accept") ?? "";
  // Match explicit text/markdown preference.
  // Exclude broad */* (browsers) so normal page loads are unaffected.
  return accept.includes("text/markdown");
}

export function middleware(request: NextRequest) {
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

  return NextResponse.rewrite(markdownUrl, {
    headers: {
      Vary: "accept",
    },
  });
}
