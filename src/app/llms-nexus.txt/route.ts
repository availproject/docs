import type { NextRequest } from "next/server";
import { AGENT_HEADERS } from "@/lib/agent-headers";
import { trackAgentRequest } from "@/lib/analytics/agent-tracking";
import { generateLlmsSectionTxt } from "@/lib/llms";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const text = await generateLlmsSectionTxt("nexus");

  trackAgentRequest(request, {
    route: "/llms-nexus.txt",
    content_length: text.length,
  });

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      ...AGENT_HEADERS,
    },
  });
}
