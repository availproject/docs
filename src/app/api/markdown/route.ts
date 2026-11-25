import type { NextRequest } from "next/server";
import { markdownResponse } from "@/lib/agent-markdown";

export async function GET(request: NextRequest) {
  const querySlug = request.nextUrl.searchParams.get("slug");
  const slug = querySlug ? querySlug.split("/").filter(Boolean) : [];
  return markdownResponse(request, slug);
}
