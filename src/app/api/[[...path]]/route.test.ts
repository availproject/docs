import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { GET, POST } from "./route";

describe("unknown API routes", () => {
  it("returns a structured JSON 404 with recovery guidance", async () => {
    const response = GET(
      new NextRequest("https://docs.availproject.org/api/does-not-exist"),
    );

    expect(response.status).toBe(404);
    expect(response.headers.get("content-type")).toContain("application/json");
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(response.headers.get("x-robots-tag")).toBe("noindex");
    expect(response.headers.get("vary")).toBeNull();
    expect(await response.json()).toEqual({
      error: {
        code: "API_NOT_FOUND",
        message: "No API endpoint exists at /api/does-not-exist.",
        resolution:
          "Fetch /openapi.json for the available endpoints, or /llms.txt for documentation indexes.",
        path: "/api/does-not-exist",
      },
    });
  });

  it("covers the bare /api path", async () => {
    const response = GET(new NextRequest("https://docs.availproject.org/api"));
    expect(response.status).toBe(404);
    expect((await response.json()).error.path).toBe("/api");
  });

  it("returns JSON for unsupported non-GET routes too", async () => {
    const response = POST(
      new NextRequest("https://docs.availproject.org/api/missing", {
        method: "POST",
      }),
    );
    expect(response.status).toBe(404);
    expect((await response.json()).error.code).toBe("API_NOT_FOUND");
  });
});
