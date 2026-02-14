import { type NextRequest, NextResponse } from "next/server";
import { source } from "@/lib/source";

const AGENT_HEADERS = {
  "Content-Signal": "ai-train=yes, search=yes, ai-input=yes",
  Vary: "accept",
};

export async function GET(request: NextRequest) {
  // Handle the root /docs page (empty slug)
  const page = source.getPage([]);

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
