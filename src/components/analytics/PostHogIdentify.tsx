"use client";

import { usePostHogIdentify } from "@/hooks/use-posthog-identify";

/**
 * Component that handles PostHog user identification based on wallet connection
 * Should be placed inside Web3Provider after NexusProvider
 */
export function PostHogIdentify() {
  usePostHogIdentify();
  return null;
}
