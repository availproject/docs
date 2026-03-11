"use client";

import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";
import {
  usePageViewTracking,
  useScrollDepthTracking,
  useTimeOnPageTracking,
} from "@/hooks/use-analytics";
import { initPostHog, POSTHOG_KEY, posthog } from "@/lib/analytics/posthog";

/**
 * Component that handles automatic page view and engagement tracking
 */
function PostHogPageViewTracker() {
  usePageViewTracking();
  useScrollDepthTracking();
  useTimeOnPageTracking();

  return null;
}

interface PostHogProviderProps {
  children: React.ReactNode;
}

/**
 * PostHog provider component for analytics
 * Initializes PostHog on mount and provides context for tracking
 */
export function PostHogProvider({ children }: PostHogProviderProps) {
  useEffect(() => {
    // Defer PostHog init until browser is idle to avoid competing with hydration
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => initPostHog());
    } else {
      setTimeout(() => initPostHog(), 2000);
    }
  }, []);

  // Don't wrap with provider if PostHog is not configured
  if (!POSTHOG_KEY) {
    return <>{children}</>;
  }

  return (
    <PHProvider client={posthog}>
      <PostHogPageViewTracker />
      {children}
    </PHProvider>
  );
}
