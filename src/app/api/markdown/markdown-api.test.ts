import { NextRequest } from "next/server";
import { describe, expect, it, vi } from "vitest";

const FAKE_CONTENT = "# Test Page\n\nSome markdown content here for testing.";
// cleanMarkdownForAgents adds a trailing newline to plain markdown
const CLEANED_CONTENT = `${FAKE_CONTENT}\n`;

vi.mock("@/lib/source", () => ({
  source: {
    getPage: (slug: string[]) => {
      if (slug.length === 0 || (slug[0] === "DA" && slug[1] === "build")) {
        return {
          url:
            slug.length === 0 ? "/docs" : `/docs/DA/${slug.slice(1).join("/")}`,
          data: {
            title: "Test Page",
            description: "A test page",
            getText: vi.fn().mockResolvedValue(FAKE_CONTENT),
          },
        };
      }
      return null;
    },
  },
}));

// Import after mocks are set up
const { GET: rootGET } = await import("./route");
const { GET: slugGET } = await import("./[...slug]/route");

function makeRequest(
  path: string,
  searchParams?: Record<string, string>,
): NextRequest {
  const url = new URL(path, "http://localhost:3000");
  if (searchParams) {
    for (const [k, v] of Object.entries(searchParams)) {
      url.searchParams.set(k, v);
    }
  }
  return new NextRequest(url);
}

describe("markdown API - root route", () => {
  it("returns markdown with correct Content-Type", async () => {
    const res = await rootGET(makeRequest("/api/markdown"));
    expect(res.headers.get("Content-Type")).toBe(
      "text/markdown; charset=utf-8",
    );
  });

  it("has x-markdown-tokens header with correct estimate", async () => {
    const res = await rootGET(makeRequest("/api/markdown"));
    const tokens = Number(res.headers.get("x-markdown-tokens"));
    expect(tokens).toBe(Math.ceil(CLEANED_CONTENT.length / 4));
  });

  it("has Content-Signal header", async () => {
    const res = await rootGET(makeRequest("/api/markdown"));
    expect(res.headers.get("Content-Signal")).toBe(
      "ai-train=yes, search=yes, ai-input=yes",
    );
  });

  it("has Vary: accept header", async () => {
    const res = await rootGET(makeRequest("/api/markdown"));
    expect(res.headers.get("Vary")).toBe("accept");
  });

  it("returns JSON when format=json", async () => {
    const res = await rootGET(makeRequest("/api/markdown", { format: "json" }));
    const data = await res.json();
    expect(data).toHaveProperty("title", "Test Page");
    expect(data).toHaveProperty("description", "A test page");
    expect(data).toHaveProperty("url");
    expect(data).toHaveProperty("content", CLEANED_CONTENT);
  });
});

describe("markdown API - slug route", () => {
  it("returns markdown for lowercase DA slug (compat mode)", async () => {
    const res = await slugGET(makeRequest("/api/markdown/da/build"), {
      params: Promise.resolve({ slug: ["da", "build"] }),
    });
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe(
      "text/markdown; charset=utf-8",
    );
  });

  it("returns markdown for uppercase DA slug", async () => {
    const res = await slugGET(makeRequest("/api/markdown/DA/build"), {
      params: Promise.resolve({ slug: ["DA", "build"] }),
    });
    expect(res.status).toBe(200);
  });

  it("returns 404 for non-existent page", async () => {
    const res = await slugGET(makeRequest("/api/markdown/does/not/exist"), {
      params: Promise.resolve({ slug: ["does", "not", "exist"] }),
    });
    expect(res.status).toBe(404);
  });

  it("has x-markdown-tokens header", async () => {
    const res = await slugGET(makeRequest("/api/markdown/da/build"), {
      params: Promise.resolve({ slug: ["da", "build"] }),
    });
    const tokens = Number(res.headers.get("x-markdown-tokens"));
    expect(tokens).toBeGreaterThan(0);
    expect(tokens).toBe(Math.ceil(CLEANED_CONTENT.length / 4));
  });

  it("returns JSON with format=json param", async () => {
    const res = await slugGET(
      makeRequest("/api/markdown/da/build", { format: "json" }),
      { params: Promise.resolve({ slug: ["da", "build"] }) },
    );
    const data = await res.json();
    expect(data.title).toBe("Test Page");
    expect(data.content).toBe(CLEANED_CONTENT);
  });
});
