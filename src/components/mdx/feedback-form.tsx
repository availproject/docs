"use client";

import { X } from "@phosphor-icons/react";
import { upload } from "@vercel/blob/client";
import type { Options as ConfettiOptions } from "canvas-confetti";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAnalytics } from "@/hooks/use-analytics";
import { cn } from "@/lib/utils";

type FormState = "ready" | "submitted" | "error";

const ALLOWED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/webp",
];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

export function FeedbackForm() {
  const [state, setState] = useState<FormState>("ready");
  const [feedbackText, setFeedbackText] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [issueUrl, setIssueUrl] = useState<string | null>(null);
  const [pastedImage, setPastedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const { trackEvent, pathname } = useAnalytics();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

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
          rating: "general",
          comment: feedbackText || undefined,
          contactInfo: contactInfo || undefined,
          pagePath: pathname,
          imageUrl,
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
        has_image: !!pastedImage,
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
      <div className="flex items-center gap-8 mt-8">
        <p className="body-16 text-muted-foreground">Something went wrong.</p>
        <button
          type="button"
          onClick={() => {
            setState("ready");
            setFeedbackText("");
            setContactInfo("");
            removeImage();
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
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          placeholder="Tell us what's on your mind (paste a screenshot)"
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
      </div>

      {imageError && <p className="text-sm text-red-500">{imageError}</p>}

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
