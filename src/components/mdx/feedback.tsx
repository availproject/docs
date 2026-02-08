"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAnalytics } from "@/hooks/use-analytics";

interface FeedbackProps {
  className?: string;
}

type FeedbackState = "idle" | "expanded" | "submitted";
type FeedbackType = "good" | "bad" | null;

export function Feedback({ className }: FeedbackProps) {
  const [state, setState] = useState<FeedbackState>("idle");
  const [feedbackType, setFeedbackType] = useState<FeedbackType>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { trackEvent } = useAnalytics();

  const handleFeedbackClick = (type: "good" | "bad") => {
    setFeedbackType(type);
    setState("expanded");
    trackEvent("feedback_rating_clicked", {
      rating: type === "good" ? "positive" : "negative",
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // You can add analytics or API call here
      // await fetch('/api/feedback', { method: 'POST', body: JSON.stringify({ type: feedbackType, text: feedbackText }) });
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call
      trackEvent("feedback_submitted", {
        rating: feedbackType === "good" ? "positive" : "negative",
        has_comment: feedbackText.length > 0,
        comment_length: feedbackText.length,
      });
      setState("submitted");
    } catch (error) {
      console.error("Failed to submit feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (state === "submitted") {
    return (
      <div className={cn("flex items-center gap-8", className)}>
        <p className="body-16 text-card-foreground">
          Thanks for your feedback!
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex w-full",
        state === "expanded"
          ? "flex-col gap-6 items-start"
          : "flex-row gap-8 items-center",
        className
      )}
    >
      {/* Question row */}
      <div className="flex items-center gap-8">
        <p className="body-16 text-card-foreground">
          How is this guide?
        </p>
        <div className="flex items-start gap-3">
          {/* Good button */}
          <button
            type="button"
            onClick={() => handleFeedbackClick("good")}
            className={cn(
              "flex items-center gap-2 h-10 w-[100px] px-4 border transition-colors",
              "shadow-[0px_1px_4px_0px_rgba(85,85,85,0.05)]",
              feedbackType === "good"
                ? "bg-black/10 border-border"
                : "bg-card border-border hover:bg-card-header-background"
            )}
          >
            <ThumbsUp className="size-5 shrink-0" />
            <span className="flex-1 ui-14 text-foreground text-center">
              Good
            </span>
          </button>

          {/* Bad button */}
          <button
            type="button"
            onClick={() => handleFeedbackClick("bad")}
            className={cn(
              "flex items-center gap-2 h-10 w-[100px] px-4 border transition-colors",
              "shadow-[0px_1px_4px_0px_rgba(85,85,85,0.05)]",
              feedbackType === "bad"
                ? "bg-black/10 border-border"
                : "bg-card border-border hover:bg-card-header-background"
            )}
          >
            <ThumbsDown className="size-5 shrink-0" />
            <span className="flex-1 ui-14 text-foreground text-center">
              Bad
            </span>
          </button>
        </div>
      </div>

      {/* Expanded state: Textarea and Submit */}
      {state === "expanded" && (
        <>
          {/* Textarea */}
          <textarea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Leave your feedback..."
            className={cn(
              "w-full h-20 p-4 resize-none",
              "bg-surface border border-card-border",
              "body-16 text-foreground",
              "placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-1 focus:ring-brand"
            )}
          />

          {/* Submit button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={cn(
              "flex items-center justify-center gap-2 h-10 w-[100px] px-4",
              "bg-brand text-brand-foreground",
              "shadow-[0px_1px_4px_0px_rgba(85,85,85,0.05)]",
              "hover:bg-brand/90 transition-colors",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            <span className="ui-14 text-center">
              {isSubmitting ? "..." : "Submit"}
            </span>
          </button>
        </>
      )}
    </div>
  );
}
