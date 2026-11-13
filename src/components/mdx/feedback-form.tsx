"use client";

import { ArrowSquareOut } from "@phosphor-icons/react";
import { useAnalytics } from "@/hooks/use-analytics";
import { feedbackIssueUrl } from "@/lib/feedback-issue";
import { cn } from "@/lib/utils";

// Used on /docs/feedback: sends people to a new GitHub issue.
export function FeedbackForm() {
  const { trackEvent } = useAnalytics();

  return (
    <div className="mt-8">
      <a
        href={feedbackIssueUrl()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackEvent("feedback_github_opened", { source: "feedback_page" })
        }
        className={cn(
          "inline-flex items-center justify-center gap-2 h-10 w-fit min-w-[140px] px-5",
          "bg-brand text-brand-foreground no-underline",
          "shadow-sm touch-manipulation",
          "transition-[background-color,transform]",
          "hover:bg-brand/90 active:scale-[0.97]",
        )}
      >
        <span className="ui-14 text-center">Open an issue on GitHub</span>
        <ArrowSquareOut size={16} aria-hidden="true" />
      </a>
    </div>
  );
}
