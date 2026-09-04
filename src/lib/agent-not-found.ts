import { NextResponse } from "next/server";
import { AGENT_HEADERS } from "@/lib/agent-headers";

/**
 * Recovery pointers for an agent that requested a page that does not exist.
 * A dead end costs an agent a whole turn, so every 404 names the indexes it
 * can use to find the right URL instead.
 */
export const AGENT_RECOVERY_LINKS = [
  ["/llms.txt", "Intent-based index of every documented task"],
  ["/llms-da.txt", "Avail DA documentation (single file)"],
  ["/llms-nexus.txt", "Avail Nexus documentation (single file)"],
  ["/llms-full.txt", "Complete documentation dump"],
  ["/sitemap.xml", "Every canonical page URL"],
  ["/api/reference.json", "Structured reference data (JSON)"],
] as const;

function recoveryList(): string {
  return AGENT_RECOVERY_LINKS.map(
    ([href, label]) => `- [${href}](${href}): ${label}`,
  ).join("\n");
}

/** Markdown 404 body pointing an agent at the discovery indexes. */
export function agentNotFoundMarkdown(requestedPath?: string): string {
  const requested = requestedPath ? `\n\nRequested: \`${requestedPath}\`` : "";
  return `# 404 — Page Not Found

This page does not exist in the Avail documentation.${requested}

## Where to look instead

${recoveryList()}

Any \`/docs/*\` URL also returns markdown when requested with
\`Accept: text/markdown\`, or by appending \`.md\` to the path.
`;
}

/** A 404 whose body is markdown rather than an opaque JSON error. */
export function agentNotFoundResponse(requestedPath?: string) {
  return new NextResponse(agentNotFoundMarkdown(requestedPath), {
    status: 404,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      ...AGENT_HEADERS,
    },
  });
}
