import { type NextRequest, NextResponse } from "next/server";
import { AGENT_HEADERS } from "@/lib/agent-headers";
import { agentNotFoundResponse } from "@/lib/agent-not-found";
import { trackAgentRequest } from "@/lib/analytics/agent-tracking";
import { apiErrorResponse } from "@/lib/api-error";
import { getPageMarkdownOverride } from "@/lib/llms";
import { cleanMarkdownForAgents } from "@/lib/markdown-clean";
import { source } from "@/lib/source";

const CHARS_PER_TOKEN = 4;

/** DA content is canonicalized as `da`, but older links may use uppercase. */
function getPageFromSlug(slug: string[]) {
  const directMatch = source.getPage(slug);
  if (directMatch) return directMatch;

  if (slug.length > 0 && slug[0].toLowerCase() === "da") {
    return source.getPage(["da", ...slug.slice(1)]);
  }

  return null;
}

/** Shared response implementation for path and query-addressed Markdown pages. */
export async function markdownResponse(
  request: NextRequest,
  slug: string[],
): Promise<NextResponse | Response> {
  const requestedPath = `/docs${slug.length ? `/${slug.join("/")}` : ""}`;
  const format = request.nextUrl.searchParams.get("format");

  try {
    const page = getPageFromSlug(slug);
    if (!page) {
      if (format === "json") {
        return apiErrorResponse(404, {
          code: "DOCUMENT_NOT_FOUND",
          message: "No documentation page exists for the requested slug.",
          resolution:
            "Use /llms.txt, /llms-full.txt, or /sitemap.xml to find a valid documentation URL.",
          path: requestedPath,
        });
      }
      return agentNotFoundResponse(requestedPath);
    }

    const overrideContent = getPageMarkdownOverride(page.url);
    const content =
      overrideContent ??
      cleanMarkdownForAgents(await page.data.getText("processed"));
    const tokenEstimate = Math.ceil(content.length / CHARS_PER_TOKEN);

    trackAgentRequest(request, {
      route: slug.length ? "/api/markdown/[slug]" : "/api/markdown",
      slug: slug.join("/") || undefined,
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
    return apiErrorResponse(500, {
      code: "MARKDOWN_GENERATION_FAILED",
      message: "The documentation content could not be generated.",
      resolution:
        "Retry the request, or fetch /llms-full.txt for the complete documentation dump.",
      path: requestedPath,
    });
  }
}
