import { headers } from "next/headers";
import { redirect } from "next/navigation";

function isAgentRequest(headersList: Headers): boolean {
  const accept = headersList.get("accept") ?? "";
  if (accept.includes("text/markdown") || accept.includes("application/json"))
    return true;

  const ua = (headersList.get("user-agent") ?? "").toLowerCase();
  return /bot|crawl|spider|llm|gpt|claude|anthropic|openai|perplexity|cohere/.test(
    ua,
  );
}

export default async function NotFound() {
  const headersList = await headers();

  if (isAgentRequest(headersList)) {
    return (
      <html lang="en">
        <body>
          <h1>404 - Page Not Found</h1>
          <p>This page does not exist. See /llms.txt for a full page index.</p>
        </body>
      </html>
    );
  }

  redirect("/");
}
