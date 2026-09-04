import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { MARKDOWN_VARY } from "@/lib/agent-headers";
import { middleware } from "./middleware";

function makeRequest(
  path: string,
  accept = "text/html",
  searchParams?: Record<string, string>,
): NextRequest {
  const url = new URL(path, "http://localhost:3000");
  if (searchParams) {
    for (const [k, v] of Object.entries(searchParams)) {
      url.searchParams.set(k, v);
    }
  }
  return new NextRequest(url, {
    headers: { accept },
  });
}

describe("middleware", () => {
  it("passes through browser requests (text/html)", () => {
    const res = middleware(makeRequest("/docs/da/build/networks", "text/html"));
    // NextResponse.next() has no x-middleware-rewrite header
    expect(res.headers.get("x-middleware-rewrite")).toBeNull();
  });

  it("passes through requests with */* accept", () => {
    const res = middleware(makeRequest("/docs/da/build/networks", "*/*"));
    expect(res.headers.get("x-middleware-rewrite")).toBeNull();
  });

  it("rewrites agent requests with Accept: text/markdown", () => {
    const res = middleware(
      makeRequest("/docs/da/build/networks", "text/markdown"),
    );
    const rewrite = res.headers.get("x-middleware-rewrite");
    expect(rewrite).not.toBeNull();
    expect(new URL(rewrite!).pathname).toBe("/api/markdown/da/build/networks");
  });

  it("maps root /docs URL to /api/markdown", () => {
    const res = middleware(makeRequest("/docs", "text/markdown"));
    const rewrite = res.headers.get("x-middleware-rewrite");
    expect(rewrite).not.toBeNull();
    expect(new URL(rewrite!).pathname).toBe("/api/markdown");
  });

  it("maps /docs/ (trailing slash) to /api/markdown", () => {
    const res = middleware(makeRequest("/docs/", "text/markdown"));
    const rewrite = res.headers.get("x-middleware-rewrite");
    expect(rewrite).not.toBeNull();
    expect(new URL(rewrite!).pathname).toBe("/api/markdown");
  });

  it("preserves query params through rewrite", () => {
    const res = middleware(
      makeRequest("/docs/da/build", "text/markdown", { format: "json" }),
    );
    const rewrite = new URL(res.headers.get("x-middleware-rewrite")!);
    expect(rewrite.pathname).toBe("/api/markdown/da/build");
    expect(rewrite.searchParams.get("format")).toBe("json");
  });

  it("sets a single merged Vary header including Accept", () => {
    const res = middleware(makeRequest("/docs/da/build", "text/markdown"));
    expect(res.headers.get("vary")).toBe(MARKDOWN_VARY);
  });

  it("preserves DA slug casing rather than uppercasing it", () => {
    // Regression: the slug used to be rewritten to /api/markdown/DA/*, which
    // 404'd for every Avail DA page because content is canonicalized as `da`.
    const res = middleware(
      makeRequest("/docs/da/get-started", "text/markdown"),
    );
    const rewrite = new URL(res.headers.get("x-middleware-rewrite")!);
    expect(rewrite.pathname).toBe("/api/markdown/da/get-started");
  });

  it("rewrites .md suffix URLs to the markdown API", () => {
    const res = middleware(makeRequest("/docs/da/get-started.md"));
    const rewrite = new URL(res.headers.get("x-middleware-rewrite")!);
    expect(rewrite.pathname).toBe("/api/markdown/da/get-started");
  });

  it("rewrites when text/markdown is among multiple accept types", () => {
    const res = middleware(
      makeRequest("/docs/da/build", "text/html, text/markdown"),
    );
    const rewrite = res.headers.get("x-middleware-rewrite");
    expect(rewrite).not.toBeNull();
    expect(new URL(rewrite!).pathname).toBe("/api/markdown/da/build");
  });
});
