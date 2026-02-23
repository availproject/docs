import { createFromSource } from "fumadocs-core/search/server";
import type { NextRequest } from "next/server";
import { trackAgentRequest } from "@/lib/analytics/agent-tracking";
import { source } from "@/lib/source";

const { GET: searchHandler } = createFromSource(source, {
  language: "english",
  search: {
    relevance: {
      k: 1.5,
      b: 0.9,
    },
  },
});

export async function GET(request: NextRequest) {
  trackAgentRequest(request, {
    route: "/api/search",
    status: 200,
  });

  return searchHandler(request);
}
