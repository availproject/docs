import posthog from "posthog-js";
import type { EventName, EventProperties } from "./types";

// PostHog configuration
export const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
export const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

/**
 * Initialize PostHog with configuration
 * Should only be called once on client-side
 */
export function initPostHog(): void {
  if (typeof window === "undefined" || !POSTHOG_KEY) {
    return;
  }

  // Prevent double initialization
  if (posthog.__loaded) {
    return;
  }

  try {
    posthog.init(POSTHOG_KEY, {
      api_host: "/ingest",
      ui_host: POSTHOG_HOST,
      // Disable automatic pageview capture - we handle it manually for SPA
      capture_pageview: false,
      // Disable automatic pageleave capture - we handle it manually
      capture_pageleave: false,
      // Session recording configuration
      session_recording: {
        // Mask all text inputs for privacy
        maskAllInputs: true,
        // Mask sensitive text content
        maskTextSelector: "[data-ph-mask]",
      },
      // Autocapture configuration - only capture specific elements
      autocapture: {
        dom_event_allowlist: ["click", "submit"],
        element_allowlist: ["button", "a", "input", "form"],
        css_selector_allowlist: ["[data-ph-capture]"],
      },
      // Persistence configuration
      persistence: "localStorage+cookie",
      // Respect Do Not Track
      respect_dnt: true,
      loaded: (posthogInstance) => {
        if (process.env.NODE_ENV === "development") {
          posthogInstance.opt_out_capturing();
        }
      },
    });
  } catch {
    // Silently fail — don't crash the app if PostHog init fails
    // (e.g. corrupted localStorage, blocked by browser policy)
  }
}

/**
 * Type-safe tracking function for analytics events
 */
export function track<T extends EventName>(
  eventName: T,
  properties: EventProperties<T>,
): void {
  if (typeof window === "undefined" || !POSTHOG_KEY) {
    return;
  }

  posthog.capture(eventName, properties);
}

/**
 * Extract UTM parameters from URL
 */
export function getUTMParams(): Record<string, string> {
  if (typeof window === "undefined") {
    return {};
  }

  const params = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {};

  const utmKeys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ];
  for (const key of utmKeys) {
    const value = params.get(key);
    if (value) {
      utmParams[key] = value;
    }
  }

  return utmParams;
}

/**
 * Get referrer information
 */
export function getReferrerInfo(): {
  referrer?: string;
  referrer_domain?: string;
} {
  if (typeof window === "undefined" || !document.referrer) {
    return {};
  }

  try {
    const referrerUrl = new URL(document.referrer);
    // Don't track internal referrers
    if (referrerUrl.hostname === window.location.hostname) {
      return {};
    }
    return {
      referrer: document.referrer,
      referrer_domain: referrerUrl.hostname,
    };
  } catch {
    return { referrer: document.referrer };
  }
}

/**
 * Track page view with additional properties including referrer and UTM
 */
export function trackPageView(
  path: string,
  properties?: Record<string, unknown>,
): void {
  if (typeof window === "undefined" || !POSTHOG_KEY) {
    return;
  }

  const utmParams = getUTMParams();
  const referrerInfo = getReferrerInfo();

  posthog.capture("$pageview", {
    $current_url: window.location.href,
    $pathname: path,
    ...referrerInfo,
    ...utmParams,
    ...properties,
  });
}

/**
 * Track session start with full attribution data
 */
export function trackSessionStart(entryPage: string): void {
  if (typeof window === "undefined" || !POSTHOG_KEY) {
    return;
  }

  const utmParams = getUTMParams();
  const referrerInfo = getReferrerInfo();

  // Only track if there's attribution data
  if (
    Object.keys(utmParams).length > 0 ||
    Object.keys(referrerInfo).length > 0
  ) {
    posthog.capture("session_started", {
      entry_page: entryPage,
      page_path: entryPage,
      ...referrerInfo,
      ...utmParams,
    });

    // Also set as super properties for the session
    setSuperProperties({
      ...referrerInfo,
      ...utmParams,
      entry_page: entryPage,
    });
  }
}

/**
 * Identify user with wallet address
 */
export function identifyUser(
  walletAddress: string,
  properties?: Record<string, unknown>,
): void {
  if (typeof window === "undefined" || !POSTHOG_KEY) {
    return;
  }

  posthog.identify(walletAddress, properties);
}

/**
 * Reset user identity (on wallet disconnect)
 */
export function resetUser(): void {
  if (typeof window === "undefined" || !POSTHOG_KEY) {
    return;
  }

  posthog.reset();
}

/**
 * Set super properties that are sent with every event
 */
export function setSuperProperties(properties: Record<string, unknown>): void {
  if (typeof window === "undefined" || !POSTHOG_KEY) {
    return;
  }

  posthog.register(properties);
}

/**
 * Unset super properties
 */
export function unsetSuperProperties(propertyNames: string[]): void {
  if (typeof window === "undefined" || !POSTHOG_KEY) {
    return;
  }

  for (const name of propertyNames) {
    posthog.unregister(name);
  }
}

// Export PostHog instance for advanced usage
export { posthog };
