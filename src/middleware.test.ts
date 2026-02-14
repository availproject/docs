import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
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
    expect(rewrite.searchParams.get("format")).toBe("json");
  });

  it("sets Vary: accept header", () => {
    const res = middleware(makeRequest("/docs/da/build", "text/markdown"));
    expect(res.headers.get("vary")).toBe("accept");
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
