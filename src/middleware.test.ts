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

  it("serves the docs index as markdown for the homepage", () => {
    // The agentic scanner negotiates on the site root, not a docs URL.
    const res = middleware(makeRequest("/", "text/markdown"));
    const rewrite = new URL(res.headers.get("x-middleware-rewrite")!);
    expect(rewrite.pathname).toBe("/api/markdown");
    expect(res.headers.get("vary")).toBe(MARKDOWN_VARY);
  });

  it("leaves the homepage untouched for browsers", () => {
    const res = middleware(makeRequest("/", "text/html"));
    expect(res.headers.get("x-middleware-rewrite")).toBeNull();
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

  it("answers unknown pages with a Markdown 404 for agents", async () => {
    const res = middleware(makeRequest("/no-such-page", "text/markdown"));
    expect(res.status).toBe(404);
    expect(res.headers.get("content-type")).toBe(
      "text/markdown; charset=utf-8",
    );
    expect(res.headers.get("vary")).toBe(MARKDOWN_VARY);
    const body = await res.text();
    expect(body).toContain("`/no-such-page`");
    expect(body).toContain("[/llms.txt](/llms.txt)");
  });

  it("does not redirect non-legacy paths that merely share a prefix", async () => {
    for (const path of ["/database", "/nexus-fake", "/user-guides-archive"]) {
      const res = middleware(makeRequest(path, "text/markdown"));
      expect(res.status).toBe(404);
      expect(res.headers.get("location")).toBeNull();
      expect(res.headers.get("content-type")).toBe(
        "text/markdown; charset=utf-8",
      );
      expect(await res.text()).toContain(`\`${path}\``);
    }
  });

  it("does not return 404s for known non-docs pages", () => {
    for (const path of ["/about", "/contact", "/privacy"]) {
      const res = middleware(makeRequest(path, "text/markdown"));
      expect(res.status).not.toBe(404);
      expect(res.headers.get("x-middleware-rewrite")).toBeNull();
    }
  });

  it("does not return 404s for machine-readable static files", () => {
    for (const path of ["/openapi.json", "/robots.txt", "/sitemap.xml"]) {
      const res = middleware(makeRequest(path, "text/markdown"));
      expect(res.status).not.toBe(404);
    }
  });

  it("leaves browser requests to unknown pages untouched", () => {
    const res = middleware(makeRequest("/no-such-page", "text/html"));
    expect(res.headers.get("x-middleware-rewrite")).toBeNull();
    expect(res.status).not.toBe(404);
  });

  it("applies legacy redirects before answering an unknown page", () => {
    const res = middleware(
      makeRequest("/da/archived-content", "text/markdown"),
    );
    expect(res.headers.get("location")).toContain("/docs/da/");
  });
});
