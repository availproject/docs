"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FeedbackProps {
  className?: string;
}

export function Feedback({ className }: FeedbackProps) {
  const [feedback, setFeedback] = useState<"good" | "bad" | null>(null);

  const handleFeedback = (type: "good" | "bad") => {
    setFeedback(type);
    // You can add analytics or API call here
  };

  if (feedback) {
    return (
      <div className={cn("flex items-center gap-8", className)}>
        <p className="text-base leading-relaxed text-foreground">
          Thanks for your feedback!
        </p>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-8", className)}>
      <p className="text-base leading-relaxed text-foreground">
        How is this guide?
      </p>
      <div className="flex items-start gap-3">
        <Button
          variant="secondary"
          className="h-10 w-[100px] gap-2"
          onClick={() => handleFeedback("good")}
        >
          <ThumbsUp className="size-5" />
          <span>Good</span>
        </Button>
        <Button
          variant="secondary"
          className="h-10 w-[100px] gap-2"
          onClick={() => handleFeedback("bad")}
        >
          <ThumbsDown className="size-5" />
          <span>Bad</span>
        </Button>
      </div>
    </div>
  );
}
