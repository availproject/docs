import type { NextRequest } from "next/server";
import { AGENT_HEADERS } from "@/lib/agent-headers";
import { trackAgentRequest } from "@/lib/analytics/agent-tracking";
import { generateLlmsSectionTxt } from "@/lib/llms";

export function createSpokeHandler(section: "da" | "nexus") {
  const route = `/llms-${section}.txt`;

  return async function GET(request: NextRequest) {
    const text = await generateLlmsSectionTxt(section);

    trackAgentRequest(request, {
      route,
      content_length: text.length,
    });

    return new Response(text, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
        ...AGENT_HEADERS,
      },
    });
  };
}
