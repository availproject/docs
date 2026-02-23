import type { NextRequest } from "next/server";
import { AGENT_HEADERS } from "@/lib/agent-headers";
import { trackAgentRequest } from "@/lib/analytics/agent-tracking";
import { generateLlmsFullTxt } from "@/lib/llms";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const section = request.nextUrl.searchParams.get("section") ?? undefined;
  const text = await generateLlmsFullTxt(section);

  trackAgentRequest(request, {
    route: "/llms-full.txt",
    section,
    content_length: text.length,
    status: 200,
  });

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": section
        ? "public, max-age=300, s-maxage=3600"
        : "public, max-age=3600, s-maxage=86400",
      ...AGENT_HEADERS,
    },
  });
}
