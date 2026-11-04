"use client";

import type { Options as ConfettiOptions } from "canvas-confetti";
import { useRef, useState } from "react";
import { useAnalytics } from "@/hooks/use-analytics";
import { cn } from "@/lib/utils";

type FormState = "ready" | "submitted" | "error";

export function FeedbackForm() {
  const [state, setState] = useState<FormState>("ready");
  const [feedbackText, setFeedbackText] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [issueUrl, setIssueUrl] = useState<string | null>(null);
  const { trackEvent, pathname } = useAnalytics();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating: "general",
          comment: feedbackText || undefined,
          contactInfo: contactInfo || undefined,
          pagePath: pathname,
        }),
      });

      if (!res.ok) throw new Error("API error");

      const data = (await res.json()) as { issueUrl?: string };
      setIssueUrl(data.issueUrl ?? null);
      setState("submitted");

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
        rating: "general",
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
      <div className="flex items-center gap-8 mt-8">
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
      <div className="flex items-center gap-8 mt-8">
        <p className="body-16 text-muted-foreground">Something went wrong.</p>
        <button
          type="button"
          onClick={() => {
            setState("ready");
            setFeedbackText("");
            setContactInfo("");
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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex w-full flex-col gap-6 mt-8"
    >
      <div className="flex w-full flex-col gap-4">
        <textarea
          ref={textareaRef}
          aria-label="Feedback"
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tell us what's on your mind"
          className={cn(
            "w-full h-48 p-4 resize-none",
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
          {isSubmitting ? "..." : "Send Feedback"}
        </span>
      </button>
    </form>
  );
}
