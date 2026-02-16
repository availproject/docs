import type { NextRequest } from "next/server";
import { generateLlmsFullTxt } from "@/lib/llms";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const section = request.nextUrl.searchParams.get("section") ?? undefined;
  const text = await generateLlmsFullTxt(section);
  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": section
        ? "public, max-age=300, s-maxage=3600"
        : "public, max-age=3600, s-maxage=86400",
    },
  });
}
