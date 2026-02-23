import { getPostHogServer } from "./posthog-server";

const AGENT_PATTERNS: [RegExp, string][] = [
  [/claude|anthropic/i, "agent-claude"],
  [/openai|codex|chatgpt/i, "agent-openai"],
  [/cursor/i, "agent-cursor"],
  [/perplexity/i, "agent-perplexity"],
];

export function detectAgent(userAgent: string): string {
  for (const [pattern, id] of AGENT_PATTERNS) {
    if (pattern.test(userAgent)) return id;
  }
  return "agent-unknown";
}

type AgentEventProperties = {
  route: string;
  slug?: string;
  format?: string;
  section?: string;
  token_count?: number;
  content_length?: number;
};

export function trackAgentRequest(
  request: Request,
  properties: AgentEventProperties,
): void {
  const posthog = getPostHogServer();
  if (!posthog) return;

  const userAgent = request.headers.get("user-agent") ?? "unknown";
  const distinctId = detectAgent(userAgent);

  posthog.capture({
    distinctId,
    event: "agent_request",
    properties: {
      ...properties,
      user_agent: userAgent,
    },
  });
}
