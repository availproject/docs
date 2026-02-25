"use client";

import { ThumbsDown, ThumbsUp, X } from "@phosphor-icons/react";
import { upload } from "@vercel/blob/client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAnalytics } from "@/hooks/use-analytics";
import { cn } from "@/lib/utils";

interface FeedbackProps {
  className?: string;
}

type FeedbackState = "idle" | "expanded" | "submitted" | "error";
type FeedbackType = "good" | "bad" | null;

const ALLOWED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/webp",
];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

export function Feedback({ className }: FeedbackProps) {
  const [state, setState] = useState<FeedbackState>("idle");
  const [feedbackType, setFeedbackType] = useState<FeedbackType>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [issueUrl, setIssueUrl] = useState<string | null>(null);
  const [pastedImage, setPastedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const { trackEvent, pathname } = useAnalytics();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Cleanup object URL on unmount or when image is removed
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFeedbackClick = (type: "good" | "bad") => {
    setFeedbackType(type);
    setState("expanded");
    requestAnimationFrame(() => textareaRef.current?.focus());
    trackEvent("feedback_rating_clicked", {
      rating: type === "good" ? "positive" : "negative",
    });
  };

  const addImage = useCallback(
    (file: File) => {
      setImageError(null);

      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        setImageError("Only PNG, JPEG, GIF, and WebP images are supported.");
        return;
      }
      if (file.size > MAX_IMAGE_SIZE) {
        setImageError("Image must be under 5 MB.");
        return;
      }

      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPastedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    },
    [previewUrl],
  );

  const removeImage = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPastedImage(null);
    setPreviewUrl(null);
    setImageError(null);
  }, [previewUrl]);

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.startsWith("image/")) {
          e.preventDefault();
          const file = item.getAsFile();
          if (file) addImage(file);
          return;
        }
      }
    },
    [addImage],
  );

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const rating = feedbackType === "good" ? "positive" : "negative";

    try {
      let imageUrl: string | undefined;

      if (pastedImage) {
        const blob = await upload(
          `feedback/${Date.now()}-${pastedImage.name}`,
          pastedImage,
          { access: "public", handleUploadUrl: "/api/feedback/upload" },
        );
        imageUrl = blob.url;
      }

      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          comment: feedbackText || undefined,
          pagePath: pathname,
          imageUrl,
        }),
      });

      if (!res.ok) throw new Error("API error");

      const data = (await res.json()) as { issueUrl?: string };
      setIssueUrl(data.issueUrl ?? null);
      setState("submitted");
      trackEvent("feedback_submitted", {
        rating,
        has_comment: feedbackText.length > 0,
        comment_length: feedbackText.length,
        has_image: !!pastedImage,
      });
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      setState("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (state === "submitted") {
    return (
      <div className={cn("flex items-center gap-8", className)}>
        <p className="body-16 text-card-foreground">
          Thanks for your feedback!
          {issueUrl && (
            <>
              {" "}
              <a
                href={issueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand underline underline-offset-2 hover:text-brand/80"
              >
                View issue
              </a>
            </>
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
          onClick={() => setState("idle")}
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
          ? "flex-col gap-6 items-start"
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
              "flex items-center gap-2 h-10 w-[100px] px-4 border transition-colors",
              "shadow-sm",
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
              "flex items-center gap-2 h-10 w-[100px] px-4 border transition-colors",
              "shadow-sm",
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

      {/* Expanded state: Textarea, image preview, and Submit */}
      {state === "expanded" && (
        <>
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            aria-label="Feedback comment"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            onPaste={handlePaste}
            placeholder={
              feedbackType === "good"
                ? "What did you like? (paste a screenshot)"
                : "What could be improved? (paste a screenshot)"
            }
            className={cn(
              "w-full h-20 p-4 resize-none",
              "bg-surface border border-card-border",
              "body-16 text-foreground",
              "placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-1 focus:ring-brand",
            )}
          />

          {/* Image preview */}
          {previewUrl && (
            <div className="relative inline-block">
              {/* biome-ignore lint/performance/noImgElement: blob URL preview incompatible with next/image */}
              <img
                src={previewUrl}
                alt="Screenshot preview"
                className="h-16 w-auto max-w-full border border-card-border object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                aria-label="Remove screenshot"
                className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center bg-foreground text-background rounded-full"
              >
                <X size={12} weight="bold" />
              </button>
            </div>
          )}

          {/* Image validation error */}
          {imageError && <p className="text-sm text-red-500">{imageError}</p>}

          {/* Submit button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={cn(
              "flex items-center justify-center gap-2 h-10 w-[100px] px-4",
              "bg-brand text-brand-foreground",
              "shadow-sm",
              "hover:bg-brand/90 transition-colors",
              "disabled:opacity-50 disabled:cursor-not-allowed",
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
