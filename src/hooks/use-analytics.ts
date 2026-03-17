"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import {
  POSTHOG_KEY,
  track,
  trackPageView,
  trackSessionStart,
} from "@/lib/analytics/posthog";
import type {
  EventName,
  EventProperties,
  NavigationType,
} from "@/lib/analytics/types";

/**
 * Main analytics hook that provides a type-safe trackEvent function
 */
export function useAnalytics() {
  const pathname = usePathname();

  const trackEvent = useCallback(
    <T extends EventName>(
      eventName: T,
      properties: Omit<EventProperties<T>, "page_path"> & {
        page_path?: string;
      },
    ) => {
      // Construct the full properties object with page_path
      const fullProperties = {
        ...properties,
        page_path: properties.page_path ?? pathname,
      };
      // Use type assertion since we're manually adding the required page_path
      track(eventName, fullProperties as unknown as EventProperties<T>);
    },
    [pathname],
  );

  const trackNavigation = useCallback(
    (navigationType: NavigationType, toPath: string) => {
      track("page_navigation", {
        from_path: pathname,
        to_path: toPath,
        navigation_type: navigationType,
        page_path: pathname,
      });
    },
    [pathname],
  );

  return { trackEvent, trackNavigation, pathname };
}

/**
 * Hook for automatic page view tracking on route changes
 */
export function usePageViewTracking() {
  const pathname = usePathname();
  const previousPathname = useRef<string | null>(null);
  const isFirstPageView = useRef(true);

  useEffect(() => {
    if (!POSTHOG_KEY) return;

    // Only track if pathname has changed
    if (pathname !== previousPathname.current) {
      // Track session start on first page view (with referrer/UTM)
      if (isFirstPageView.current) {
        trackSessionStart(pathname);
        isFirstPageView.current = false;
      }

      trackPageView(pathname);
      previousPathname.current = pathname;
    }
  }, [pathname]);
}

/**
 * Hook for tracking scroll depth milestones
 */
export function useScrollDepthTracking() {
  const pathname = usePathname();
  const startTime = useRef<number>(Date.now());
  const reachedMilestones = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (!POSTHOG_KEY) return;

    // Reset on pathname change
    startTime.current = Date.now();
    reachedMilestones.current.clear();

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight <= 0) return;

      const scrollPercentage = Math.round((scrollTop / docHeight) * 100);

      const milestones = [25, 50, 75, 100] as const;
      for (const milestone of milestones) {
        if (
          scrollPercentage >= milestone &&
          !reachedMilestones.current.has(milestone)
        ) {
          reachedMilestones.current.add(milestone);
          track("scroll_depth_reached", {
            depth_percentage: milestone,
            time_to_reach_ms: Date.now() - startTime.current,
            page_path: pathname,
          });
        }
      }
    };

    // Throttled scroll handler
    let ticking = false;
    const throttledHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandler, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", throttledHandler);
    };
  }, [pathname]);
}

/**
 * Hook for tracking time on page and sections viewed
 */
export function useTimeOnPageTracking() {
  const pathname = usePathname();
  const startTime = useRef<number>(Date.now());
  const maxScrollDepth = useRef<number>(0);

  // Track max scroll depth
  useEffect(() => {
    if (!POSTHOG_KEY) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight <= 0) return;

      const scrollPercentage = Math.round((scrollTop / docHeight) * 100);
      maxScrollDepth.current = Math.max(
        maxScrollDepth.current,
        scrollPercentage,
      );
    };

    let ticking = false;
    const throttledHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandler, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledHandler);
    };
  }, []);

  // Send time on page event on unmount or page leave
  useEffect(() => {
    if (!POSTHOG_KEY) return;

    // Reset on pathname change
    startTime.current = Date.now();
    maxScrollDepth.current = 0;
    let hasSent = false;

    const sendTimeOnPage = () => {
      if (hasSent) return;
      hasSent = true;

      const timeSpent = Math.round((Date.now() - startTime.current) / 1000);

      // Only track if user spent at least 1 second
      if (timeSpent >= 1) {
        track("time_on_page", {
          time_spent_seconds: timeSpent,
          max_scroll_depth: maxScrollDepth.current,
          sections_viewed: [],
          page_path: pathname,
        });
      }
    };

    window.addEventListener("beforeunload", sendTimeOnPage);

    return () => {
      sendTimeOnPage();
      window.removeEventListener("beforeunload", sendTimeOnPage);
    };
  }, [pathname]);
}
