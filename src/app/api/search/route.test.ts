import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  searchGet: vi.fn(),
  staticGet: vi.fn(),
  track: vi.fn(),
}));

vi.mock("fumadocs-core/search/server", () => ({
  createFromSource: () => ({
    GET: mocks.searchGet,
    staticGET: mocks.staticGet,
  }),
}));

vi.mock("@/lib/source", () => ({ source: {} }));
vi.mock("@/lib/analytics/agent-tracking", () => ({
  trackAgentRequest: mocks.track,
}));

import { GET } from "./route";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("GET /api/search", () => {
  it("delegates searches with a query parameter", async () => {
    mocks.searchGet.mockResolvedValue(Response.json([{ id: "result" }]));
    const response = await GET(
      new NextRequest("https://docs.availproject.org/api/search?query=bridge"),
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual([{ id: "result" }]);
    expect(mocks.searchGet).toHaveBeenCalledOnce();
    expect(mocks.staticGet).not.toHaveBeenCalled();
    expect(mocks.track).toHaveBeenCalledOnce();
  });

  it("preserves the client-side search index and cache headers", async () => {
    mocks.staticGet.mockResolvedValue(Response.json({ index: [] }));
    const response = await GET(
      new NextRequest("https://docs.availproject.org/api/search"),
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ index: [] });
    expect(response.headers.get("cache-control")).toBe(
      "public, max-age=3600, s-maxage=31536000, stale-while-revalidate=86400",
    );
    expect(mocks.searchGet).not.toHaveBeenCalled();
  });

  it("returns a structured JSON error when search fails", async () => {
    mocks.searchGet.mockRejectedValue(new Error("Search unavailable"));
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    try {
      const response = await GET(
        new NextRequest(
          "https://docs.availproject.org/api/search?query=bridge",
        ),
      );
      expect(response.status).toBe(500);
      expect(response.headers.get("content-type")).toContain(
        "application/json",
      );
      expect(await response.json()).toEqual({
        error: {
          code: "SEARCH_FAILED",
          message: "The documentation search could not be completed.",
          resolution:
            "Retry the request, or use /llms.txt and /sitemap.xml to browse the documentation.",
          path: "/api/search",
        },
      });
    } finally {
      consoleError.mockRestore();
    }
  });
});
