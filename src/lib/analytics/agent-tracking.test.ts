import { describe, expect, it, vi } from "vitest";

vi.mock("./posthog-server", () => ({
  getPostHogServer: vi.fn(),
}));

import { detectAgent, trackAgentRequest } from "./agent-tracking";
import { getPostHogServer } from "./posthog-server";

describe("detectAgent", () => {
  it.each([
    ["claude-code/1.0.0", "agent-claude"],
    ["Anthropic-AI/2.0", "agent-claude"],
    ["OpenAI-Codex/1.0", "agent-openai"],
    ["ChatGPT-User/1.0", "agent-openai"],
    ["cursor/0.50.1", "agent-cursor"],
    ["Perplexity-Bot/1.0", "agent-perplexity"],
    ["Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)", "agent-unknown"],
    ["unknown", "agent-unknown"],
  ])("detects %s as %s", (userAgent, expected) => {
    expect(detectAgent(userAgent)).toBe(expected);
  });
});

describe("trackAgentRequest", () => {
  const mockCapture = vi.fn();

  function makeRequest(userAgent: string): Request {
    return new Request("https://docs.availproject.org/api/llms", {
      headers: { "user-agent": userAgent },
    });
  }

  it("calls posthog.capture with correct arguments", () => {
    vi.mocked(getPostHogServer).mockReturnValue({
      capture: mockCapture,
    } as never);

    trackAgentRequest(makeRequest("claude-code/1.0.0"), {
      route: "/api/llms",
      section: "da",
    });

    expect(mockCapture).toHaveBeenCalledWith({
      distinctId: "agent-claude",
      event: "agent_request",
      properties: {
        route: "/api/llms",
        section: "da",
        user_agent: "claude-code/1.0.0",
      },
    });
  });

  it("always includes user_agent in properties", () => {
    vi.mocked(getPostHogServer).mockReturnValue({
      capture: mockCapture,
    } as never);
    mockCapture.mockClear();

    trackAgentRequest(makeRequest("cursor/0.50.1"), {
      route: "/api/markdown/da/get-started",
      slug: "da/get-started",
      format: "markdown",
    });

    expect(mockCapture).toHaveBeenCalledOnce();
    expect(mockCapture.mock.calls[0][0].properties).toHaveProperty(
      "user_agent",
      "cursor/0.50.1",
    );
  });

  it("does not throw when PostHog client is null", () => {
    vi.mocked(getPostHogServer).mockReturnValue(null);

    expect(() =>
      trackAgentRequest(makeRequest("claude-code/1.0.0"), {
        route: "/api/llms",
      }),
    ).not.toThrow();
  });
});
