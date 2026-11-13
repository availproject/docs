"use client";

import { ArrowSquareOut, ThumbsDown, ThumbsUp } from "@phosphor-icons/react";
import { useState } from "react";
import { useAnalytics } from "@/hooks/use-analytics";
import { type FeedbackRating, feedbackIssueUrl } from "@/lib/feedback-issue";
import { cn } from "@/lib/utils";

interface FeedbackProps {
  className?: string;
}

// Ratings go to analytics only. Anything more goes to a GitHub issue.
export function Feedback({ className }: FeedbackProps) {
  const [rating, setRating] = useState<FeedbackRating | null>(null);
  const { trackEvent, pathname } = useAnalytics();

  const handleRatingClick = (value: FeedbackRating) => {
    if (value === rating) return;
    setRating(value);
    trackEvent("feedback_rating_clicked", { rating: value });
  };

  const ratingButton = (value: FeedbackRating, label: string) => (
    <button
      type="button"
      aria-pressed={rating === value}
      onClick={() => handleRatingClick(value)}
      className={cn(
        "flex items-center gap-2 h-10 w-[100px] px-4 border",
        "shadow-sm touch-manipulation",
        "transition-[color,background-color,border-color,transform]",
        "active:scale-[0.97]",
        rating === value
          ? "bg-black/10 border-border"
          : "bg-card border-border hover:bg-card-header-background",
      )}
    >
      {value === "positive" ? (
        <ThumbsUp size={20} className="shrink-0" />
      ) : (
        <ThumbsDown size={20} className="shrink-0" />
      )}
      <span className="flex-1 ui-14 text-foreground text-center">{label}</span>
    </button>
  );

  return (
    <div
      className={cn(
        "flex w-full flex-wrap items-center gap-x-8 gap-y-3",
        className,
      )}
    >
      <p className="body-16 text-card-foreground">How is this guide?</p>
      <div className="flex items-start gap-3">
        {ratingButton("positive", "Good")}
        {ratingButton("negative", "Bad")}
      </div>

      {rating && (
        <p className="body-16 text-card-foreground" aria-live="polite">
          Thanks!{" "}
          <a
            href={feedbackIssueUrl(pathname, rating)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("feedback_github_opened", {
                source: "page_rating",
                rating,
              })
            }
            className="inline-flex items-center gap-1 text-brand underline underline-offset-2 hover:text-brand/80"
          >
            Tell us more on GitHub
            <ArrowSquareOut size={14} aria-hidden="true" />
          </a>
        </p>
      )}
    </div>
  );
}
