import { type NextRequest, NextResponse } from "next/server";
import { AGENT_HEADERS } from "@/lib/agent-headers";
import { trackAgentRequest } from "@/lib/analytics/agent-tracking";
import { cleanMarkdownForAgents } from "@/lib/markdown-clean";
import { source } from "@/lib/source";

function getPageFromSlug(slug: string[]) {
  const directMatch = source.getPage(slug);
  if (directMatch) {
    return directMatch;
  }

  // DA content is canonicalized under /docs/DA/* while many links and
  // users request /docs/da/*. Support both casings for API consumers.
  if (slug.length > 0 && slug[0].toLowerCase() === "da") {
    return source.getPage(["DA", ...slug.slice(1)]);
  }

  return null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await params;
  const page = getPageFromSlug(slug);

  if (!page) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  try {
    const raw = await page.data.getText("processed");
    const content = cleanMarkdownForAgents(raw);
    const tokenEstimate = Math.ceil(content.length / 4);

    const format = request.nextUrl.searchParams.get("format");

    trackAgentRequest(request, {
      route: "/api/markdown/[slug]",
      slug: slug.join("/"),
      format: format === "json" ? "json" : "markdown",
      token_count: tokenEstimate,
      content_length: content.length,
      status: 200,
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
        "Content-Disposition": `inline; filename="${slug.join("-") || "index"}.md"`,
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
