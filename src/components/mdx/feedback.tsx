"use client";

import { ThumbsDown, ThumbsUp } from "@phosphor-icons/react";
import type { Options as ConfettiOptions } from "canvas-confetti";
import { useRef, useState } from "react";
import { useAnalytics } from "@/hooks/use-analytics";
import { cn } from "@/lib/utils";

interface FeedbackProps {
  className?: string;
}

type FeedbackState = "idle" | "expanded" | "submitted" | "error";
type FeedbackType = "good" | "bad" | null;

export function Feedback({ className }: FeedbackProps) {
  const [state, setState] = useState<FeedbackState>("idle");
  const [feedbackType, setFeedbackType] = useState<FeedbackType>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [issueUrl, setIssueUrl] = useState<string | null>(null);
  const { trackEvent, pathname } = useAnalytics();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleFeedbackClick = (type: "good" | "bad") => {
    setFeedbackType(type);
    setState("expanded");
    requestAnimationFrame(() => textareaRef.current?.focus());
    trackEvent("feedback_rating_clicked", {
      rating: type === "good" ? "positive" : "negative",
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const rating = feedbackType === "good" ? "positive" : "negative";

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          comment: feedbackText || undefined,
          contactInfo: contactInfo || undefined,
          pagePath: pathname,
        }),
      });

      if (!res.ok) throw new Error("API error");

      const data = (await res.json()) as { issueUrl?: string };
      setIssueUrl(data.issueUrl ?? null);
      setState("submitted");

      // Raycast-style confetti from bottom corners (lazy-loaded)
      const { default: confetti } = await import("canvas-confetti");
      const colors = [
        "#FF4136",
        "#0074D9",
        "#2ECC40",
        "#FF69B4",
        "#FF851B",
        "#B10DC9",
        "#FFDC00",
        "#7FDBFF",
      ];
      const defaults: ConfettiOptions = {
        spread: 120,
        startVelocity: 75,
        ticks: 300,
        gravity: 0.6,
        decay: 0.92,
        scalar: 1.2,
        colors,
        shapes: ["square", "circle"],
        disableForReducedMotion: true,
      };
      confetti({
        ...defaults,
        particleCount: 200,
        angle: 70,
        origin: { x: 0, y: 1 },
      });
      confetti({
        ...defaults,
        particleCount: 200,
        angle: 110,
        origin: { x: 1, y: 1 },
      });

      trackEvent("feedback_submitted", {
        rating,
        has_comment: feedbackText.length > 0,
        comment_length: feedbackText.length,
        has_contact: contactInfo.length > 0,
      });
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      setState("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  if (state === "submitted") {
    return (
      <div className={cn("flex items-center gap-8", className)}>
        <p className="body-16 text-card-foreground">
          {issueUrl ? (
            <>
              Thanks! To add a screenshot,{" "}
              <a
                href={issueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand underline underline-offset-2 hover:text-brand/80"
              >
                comment on the issue
              </a>
              .
            </>
          ) : (
            "Thanks for your feedback!"
          )}
        </p>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className={cn("flex items-center gap-8", className)}>
        <p className="body-16 text-muted-foreground">Something went wrong.</p>
        <button
          type="button"
          onClick={() => {
            setState("idle");
            setFeedbackText("");
            setContactInfo("");
            setFeedbackType(null);
          }}
          className={cn(
            "flex items-center justify-center gap-2 h-10 px-4",
            "border border-border bg-card",
            "shadow-sm",
            "hover:bg-card-header-background transition-colors",
          )}
        >
          <span className="ui-14 text-foreground">Try again</span>
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex w-full",
        state === "expanded"
          ? "flex-col gap-4 items-start"
          : "flex-row gap-8 items-center",
        className,
      )}
    >
      {/* Question row */}
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
        <p className="body-16 text-card-foreground">How is this guide?</p>
        <div className="flex items-start gap-3">
          {/* Good button */}
          <button
            type="button"
            onClick={() => handleFeedbackClick("good")}
            className={cn(
              "flex items-center gap-2 h-10 w-[100px] px-4 border",
              "shadow-sm touch-manipulation",
              "transition-[color,background-color,border-color,transform]",
              "active:scale-[0.97]",
              feedbackType === "good"
                ? "bg-black/10 border-border"
                : "bg-card border-border hover:bg-card-header-background",
            )}
          >
            <ThumbsUp size={20} className="shrink-0" />
            <span className="flex-1 ui-14 text-foreground text-center">
              Good
            </span>
          </button>

          {/* Bad button */}
          <button
            type="button"
            onClick={() => handleFeedbackClick("bad")}
            className={cn(
              "flex items-center gap-2 h-10 w-[100px] px-4 border",
              "shadow-sm touch-manipulation",
              "transition-[color,background-color,border-color,transform]",
              "active:scale-[0.97]",
              feedbackType === "bad"
                ? "bg-black/10 border-border"
                : "bg-card border-border hover:bg-card-header-background",
            )}
          >
            <ThumbsDown size={20} className="shrink-0" />
            <span className="flex-1 ui-14 text-foreground text-center">
              Bad
            </span>
          </button>
        </div>
      </div>

      {/* Expanded state */}
      {state === "expanded" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex w-full flex-col gap-6"
        >
          {/* Fields */}
          <div className="flex w-full flex-col gap-4">
            <textarea
              ref={textareaRef}
              aria-label="Feedback comment"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                feedbackType === "good"
                  ? "What did you like?"
                  : "What could be improved?"
              }
              className={cn(
                "w-full h-20 p-4 resize-none",
                "bg-surface border border-card-border",
                "body-16 text-foreground",
                "placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-1 focus:ring-brand",
              )}
            />

            <input
              type="text"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              placeholder="Email, Discord, or other contact (optional)"
              maxLength={200}
              spellCheck={false}
              autoComplete="off"
              className={cn(
                "w-full h-12 px-4",
                "bg-surface border border-card-border",
                "body-16 text-foreground",
                "placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-1 focus:ring-brand",
              )}
            />
            <p className="text-sm text-muted-foreground">
              Contact details are posted publicly on the GitHub issue.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "flex items-center justify-center gap-2 h-10 w-fit min-w-[140px] px-5",
              "bg-brand text-brand-foreground",
              "shadow-sm touch-manipulation",
              "transition-[background-color,transform]",
              "hover:bg-brand/90 active:scale-[0.97]",
              "disabled:opacity-50 disabled:cursor-not-allowed",
            )}
          >
            <span className="ui-14 text-center">
              {isSubmitting ? "..." : "Submit Feedback"}
            </span>
          </button>
        </form>
      )}
    </div>
  );
}
