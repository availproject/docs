import { generatedRedirectRules } from "./generated";
import { staticRedirectRules } from "./static-rules";
import type { RedirectRule } from "./types";

export function resolveRedirectRules(
  overrides: RedirectRule[],
): RedirectRule[] {
  // Precedence: overrides > generated > static.
  // Middleware additionally sorts by longest `source` first to ensure
  // more specific routes beat prefixes.
  const combined: RedirectRule[] = [
    ...overrides,
    ...generatedRedirectRules,
    ...staticRedirectRules,
  ];

  const bySource = new Map<string, RedirectRule>();
  for (const rule of combined) {
    // Keep first occurrence according to precedence order above.
    if (!bySource.has(rule.source)) bySource.set(rule.source, rule);
  }

  return Array.from(bySource.values());
}
