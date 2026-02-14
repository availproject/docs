import { type NextRequest, NextResponse } from "next/server";
import { AGENT_HEADERS } from "@/lib/agent-headers";
import { source } from "@/lib/source";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await params;
  const page = source.getPage(slug);

  if (!page) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  try {
    const raw = await page.data.getText("raw");
    const tokenEstimate = Math.ceil(raw.length / 4);

    // Check if user wants JSON response or raw markdown
    const format = request.nextUrl.searchParams.get("format");

    if (format === "json") {
      return NextResponse.json(
        {
          title: page.data.title,
          description: page.data.description,
          url: page.url,
          content: raw,
        },
        { headers: AGENT_HEADERS },
      );
    }

    // Return raw markdown with proper content type
    return new NextResponse(raw, {
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
