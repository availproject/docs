import { type NextRequest, NextResponse } from "next/server";
import { AGENT_HEADERS } from "@/lib/agent-headers";
import { trackAgentRequest } from "@/lib/analytics/agent-tracking";
import { cleanMarkdownForAgents } from "@/lib/markdown-clean";
import { source } from "@/lib/source";

export async function GET(request: NextRequest) {
  // Handle the root /docs page (empty slug)
  const page = source.getPage([]);

  if (!page) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  try {
    const raw = await page.data.getText("processed");
    const content = cleanMarkdownForAgents(raw);
    const tokenEstimate = Math.ceil(content.length / 4);

    const format = request.nextUrl.searchParams.get("format");

    trackAgentRequest(request, {
      route: "/api/markdown",
      format: format === "json" ? "json" : "markdown",
      token_count: tokenEstimate,
      content_length: content.length,
    });

    if (format === "json") {
      return NextResponse.json(
        {
          title: page.data.title,
          description: page.data.description,
          url: page.url,
          content,
        },
        { headers: AGENT_HEADERS },
      );
    }

    // Return processed markdown with proper content type
    return new NextResponse(content, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Content-Disposition": 'inline; filename="index.md"',
        "x-markdown-tokens": String(tokenEstimate),
        ...AGENT_HEADERS,
      },
    });
  } catch (error) {
    console.error("Error fetching markdown:", error);
    return NextResponse.json(
      { error: "Failed to fetch markdown content" },
      { status: 500 },
    );
  }
}
