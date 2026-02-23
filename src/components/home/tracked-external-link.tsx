"use client";

import { useAnalytics } from "@/hooks/use-analytics";
import type { ExternalLinkClickedEvent } from "@/lib/analytics/types";

export function TrackedExternalLink({
  href,
  label,
  className,
  category = "footer",
}: {
  href: string;
  label: string;
  className: string;
  category?: ExternalLinkClickedEvent["properties"]["category"];
}) {
  const { trackEvent } = useAnalytics();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() =>
        trackEvent("external_link_clicked", {
          destination_url: href,
          link_text: label,
          category,
        })
      }
    >
      {label}
    </a>
  );
}
