import type { RedirectRule } from "./types";

/**
 * Fast-path prefix redirects that preserve the suffix.
 * These are evaluated using longest-prefix matching in middleware.
 */
export const staticRedirectRules: RedirectRule[] = [
  // Current docs live at /da/* and /nexus/*; the new site serves docs at /docs/*.
  // Prefix rules avoid needing one entry per page when slugs are unchanged.
  { source: "/da", destination: "/docs/da" },
  { source: "/nexus", destination: "/docs/nexus" },
  // User guides moved under the DA product tree in this repo.
  { source: "/user-guides", destination: "/docs/da/user-guides" },

  // Some users may still have legacy links without the /da prefix.
  // (These are not in the current sitemap, but we keep them for safety.)
  { source: "/api-reference", destination: "/docs/da/api-reference" },
];
