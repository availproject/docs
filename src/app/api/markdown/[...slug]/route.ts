import type { NextRequest } from "next/server";
import { markdownResponse } from "@/lib/agent-markdown";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await params;
  return markdownResponse(request, slug);
}
