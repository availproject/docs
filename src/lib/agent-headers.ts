/**
 * Next adds its own `Vary` for RSC negotiation. Emitting a bare
 * `Vary: Accept` alongside it produces two separate `Vary` header lines,
 * and CDNs (and agent-readiness scanners) commonly read only the first —
 * which risks serving an HTML response from a markdown cache entry.
 * Carry every token in one merged value instead.
 */
export const MARKDOWN_VARY =
  "Accept, RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch";

export const AGENT_HEADERS = {
  "Content-Signal": "ai-train=yes, search=yes, ai-input=yes",
  "X-Robots-Tag": "noindex",
  Vary: MARKDOWN_VARY,
};
