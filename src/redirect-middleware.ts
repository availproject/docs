import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import overrides from "../data/redirects.override.json";
import { resolveRedirectRules } from "./lib/redirects/resolve-rules";

const normalizePath = (path: string) =>
  path === "/" ? "/" : path.replace(/\/+$/, "");

const isSkippablePath = (pathname: string) =>
  pathname.startsWith("/_next/") ||
  pathname.startsWith("/api/markdown") ||
  pathname === "/favicon.ico" ||
  pathname === "/robots.txt" ||
  pathname === "/sitemap.xml" ||
  /\.[a-z0-9]+$/i.test(pathname);

/**
 * Applies redirect rules to the incoming request.
 * Returns a NextResponse when a redirect should occur, otherwise null.
 */
export function applyRedirects(request: NextRequest): NextResponse | null {
  const { pathname, search } = request.nextUrl;
  if (isSkippablePath(pathname)) return null;

  const origin = request.nextUrl.origin;
  const rules = resolveRedirectRules(overrides);

  const normalizedRules = rules
    .map((rule) => ({ ...rule, _src: normalizePath(rule.source) }))
    .sort((a, b) => b._src.length - a._src.length);

  const pathsToCheck = [
    pathname,
    `/docs${pathname}`,
    normalizePath(pathname),
    normalizePath(`/docs${pathname}`),
  ];

  for (const candidatePath of pathsToCheck) {
    const path = normalizePath(candidatePath);
    const best = normalizedRules.find(
      ({ _src }) => path === _src || path.startsWith(`${_src}/`),
    );
    if (!best) continue;

    const suffix = path.slice(best._src.length);
    const destinationPath = normalizePath(best.destination) + suffix;

    if (destinationPath === path) return null;

    const url = new URL(destinationPath, origin);
    url.search = search;
    return NextResponse.redirect(url, { status: 301 });
  }

  // Catch-all: redirect unmatched legacy paths to homepage
  const normalizedPathname = normalizePath(pathname);
  if (
    normalizedPathname.startsWith("/da") ||
    normalizedPathname.startsWith("/nexus") ||
    normalizedPathname.startsWith("/user-guides") ||
    normalizedPathname.startsWith("/api-reference")
  ) {
    const url = new URL("/", origin);
    url.search = search;
    return NextResponse.redirect(url, { status: 302 });
  }

  return null;
}
