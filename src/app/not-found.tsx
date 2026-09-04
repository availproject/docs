import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AGENT_RECOVERY_LINKS } from "@/lib/agent-not-found";

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
          <p>
            This page does not exist in the Avail documentation. Use one of the
            indexes below to find the correct URL.
          </p>
          <ul>
            {AGENT_RECOVERY_LINKS.map(([href, label]) => (
              <li key={href}>
                <a href={href}>{href}</a> — {label}
              </li>
            ))}
          </ul>
          <p>
            Any <code>/docs/*</code> URL also returns markdown when requested
            with <code>Accept: text/markdown</code>, or by appending
            <code>.md</code> to the path.
          </p>
        </body>
      </html>
    );
  }

  redirect("/");
}
