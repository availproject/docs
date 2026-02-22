import { AGENT_HEADERS } from "@/lib/agent-headers";
import { generateLlmsTxt } from "@/lib/llms";

export const revalidate = false;

export async function GET() {
  const text = generateLlmsTxt();
  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      ...AGENT_HEADERS,
    },
  });
}
