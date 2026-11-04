import { NextRequest } from "next/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

function submit(body: unknown, ip: string) {
  return POST(
    new NextRequest("https://docs.test/api/feedback", {
      method: "POST",
      headers: { "x-forwarded-for": ip },
      body: JSON.stringify(body),
    }),
  );
}

describe("POST /api/feedback", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it.each([
    "/docs/x @someone",
    "/docs/[link](https://example.com)",
    "/docs/x\n**injected**",
    `/docs/${"a".repeat(200)}`,
    "/blog/x",
  ])("rejects pagePath %j without calling GitHub", async (pagePath) => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await submit({ rating: "general", pagePath }, "10.0.0.1");

    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("creates a text-only issue and ignores an imageUrl", async () => {
    vi.stubEnv("GITHUB_FEEDBACK_TOKEN", "test-token");
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ html_url: "https://github.test/1" }), {
        status: 201,
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const response = await submit(
      {
        rating: "general",
        pagePath: "/docs/nexus/get-started",
        comment: "Helpful",
        imageUrl: "https://attacker.test/image.png",
      },
      "10.0.0.2",
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      success: true,
      issueUrl: "https://github.test/1",
    });
    const issue = JSON.parse(fetchMock.mock.calls[0]?.[1].body);
    expect(issue.body).toContain("Helpful");
    expect(issue.body).not.toContain("attacker.test");
  });
});
