# PostHog Analytics Integration

This document describes the comprehensive PostHog analytics integration for the Avail documentation site.

## Overview

We track user behavior across the documentation site to understand:
- How users navigate and consume content
- Which code examples are most useful
- How users interact with AI features
- Feedback patterns and sentiment
- Search behavior and effectiveness

## Setup

### Environment Variables

Add to `.env.local`:

```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_your_project_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

### Architecture

```
PostHogProvider (outermost in layout.tsx)
  └── Web3Provider
        └── NexusProvider
              └── PostHogIdentify (wallet-based identification)
                    └── App Content
```

## Event Categories

### 1. Page & Engagement Events

| Event | Description | Properties |
|-------|-------------|------------|
| `$pageview` | Automatic page view on navigation | `$current_url`, `$pathname`, `referrer`, `referrer_domain`, `utm_*` |
| `session_started` | First page view with attribution | `entry_page`, `referrer`, `referrer_domain`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content` |
| `page_navigation` | Track user flow between pages | `from_path`, `to_path`, `navigation_type`, `page_path` |
| `scroll_depth_reached` | User scrolled to 25/50/75/100% | `depth_percentage`, `time_to_reach_ms`, `page_path` |
| `time_on_page` | Sent on page leave | `time_spent_seconds`, `max_scroll_depth`, `sections_viewed`, `page_path` |

### 2. Code Interaction Events

| Event | Description | Properties |
|-------|-------------|------------|
| `code_copy_clicked` | User copied code | `language`, `content_length`, `code_title`, `code_type` (inline/block/command/component), `page_path` |
| `code_block_viewed` | Code block entered viewport | `language`, `code_title`, `code_type`, `page_path` |
| `code_package_manager_selected` | Tab switch in command blocks | `package_manager` (pnpm/npm/yarn/bun), `page_path` |
| `code_collapsible_toggled` | Expand/collapse code sections | `is_expanded`, `title`, `page_path` |
| `code_file_selected` | File selection in code browser | `file_name`, `component_name`, `page_path` |
| `code_tab_switched` | Component/Provider tab switch | `tab_name`, `previous_tab`, `page_path` |

### 3. Feedback Events

| Event | Description | Properties |
|-------|-------------|------------|
| `feedback_rating_clicked` | Thumbs up/down click | `rating` (positive/negative), `page_path` |
| `feedback_submitted` | Feedback form submitted | `rating`, `has_comment`, `comment_length`, `page_path` |

### 4. AI/LLM Integration Events

| Event | Description | Properties |
|-------|-------------|------------|
| `ai_copy_for_llm_clicked` | Copy for LLM button | `content_length`, `page_path` |
| `ai_service_opened` | Open in v0/ChatGPT/Claude | `service`, `page_path` |
| `ai_view_markdown_clicked` | View as Markdown clicked | `page_path` |
| `ai_copy_page_clicked` | Copy Page button | `content_length`, `page_path` |

### 5. Navigation Events

| Event | Description | Properties |
|-------|-------------|------------|
| `nav_footer_link_clicked` | Previous/Next nav | `direction`, `destination_path`, `destination_title`, `page_path` |
| `nav_toc_heading_clicked` | TOC link click | `heading_text`, `heading_level`, `heading_id`, `page_path` |
| `nav_sidebar_item_clicked` | Sidebar navigation | `item_type` (page/folder), `item_title`, `destination_path`, `page_path` |
| `nav_card_clicked` | Concept/Link card click | `card_title`, `card_type`, `destination_path`, `page_path` |

### 6. Search Events

| Event | Description | Properties |
|-------|-------------|------------|
| `search_dialog_opened` | Search modal opened | `trigger_type` (keyboard/click), `page_path` |
| `search_query_submitted` | Search query executed | `query`, `results_count`, `page_path` |
| `search_result_clicked` | Search result selected | `result_position`, `result_title`, `result_path`, `query`, `page_path` |

### 7. Wallet Events

| Event | Description | Properties |
|-------|-------------|------------|
| `wallet_connected` | Wallet connection | `chain_id`, `network_name`, `page_path` |
| `wallet_disconnected` | Wallet disconnect | `page_path` |

## User Identification

Users are identified by their wallet address when connected:

```typescript
// Automatic identification via PostHogIdentify component
posthog.identify(walletAddress, {
  wallet_address: walletAddress,
  chain_id: chainId,
  nexus_network: "mainnet" | "testnet",
});
```

### Super Properties

When wallet is connected, these are sent with every event:
- `wallet_connected: true`
- `connected_chain_id: number`
- `nexus_network: string`

## Usage in Components

### Basic Event Tracking

```tsx
import { useAnalytics } from "@/hooks/use-analytics";

function MyComponent() {
  const { trackEvent } = useAnalytics();

  const handleAction = () => {
    trackEvent("my_custom_event", {
      property1: "value1",
      property2: 123,
      // page_path is automatically added
    });
  };

  return <button onClick={handleAction}>Action</button>;
}
```

### Available Hooks

| Hook | Purpose |
|------|---------|
| `useAnalytics()` | Main hook with `trackEvent` function |
| `usePageViewTracking()` | Automatic page views (used in Provider) |
| `useScrollDepthTracking()` | Automatic scroll tracking (used in Provider) |
| `useTimeOnPageTracking()` | Automatic engagement tracking (used in Provider) |
| `usePostHogIdentify()` | Wallet-based identification (used in Web3Provider) |

## Files Reference

| File | Purpose |
|------|---------|
| `src/lib/analytics/types.ts` | TypeScript event type definitions |
| `src/lib/analytics/posthog.ts` | PostHog init and type-safe track function |
| `src/hooks/use-analytics.ts` | React hooks for tracking |
| `src/hooks/use-posthog-identify.ts` | Wallet identification hook |
| `src/providers/PostHogProvider.tsx` | Provider with automatic tracking |
| `src/components/analytics/PostHogIdentify.tsx` | Identification component |

## Adding New Events

1. Add type definition in `src/lib/analytics/types.ts`:

```typescript
export interface MyNewEvent {
  event: 'my_new_event'
  properties: {
    my_property: string
    page_path: string
  }
}

// Add to AnalyticsEvent union
export type AnalyticsEvent =
  | ...
  | MyNewEvent
```

2. Use in component:

```tsx
const { trackEvent } = useAnalytics();
trackEvent("my_new_event", {
  my_property: "value",
});
```

## Configuration Options

PostHog is initialized with these settings (see `src/lib/analytics/posthog.ts`):

- `capture_pageview: false` - Manual tracking for SPA
- `capture_pageleave: false` - Manual tracking
- `session_recording.maskAllInputs: true` - Privacy protection
- `persistence: 'localStorage+cookie'` - Cross-session tracking
- `respect_dnt: true` - Honor Do Not Track

## Debugging

Enable PostHog debug mode in development by uncommenting in `posthog.ts`:

```typescript
loaded: (posthogInstance) => {
  if (process.env.NODE_ENV === 'development') {
    posthogInstance.debug()
  }
}
```

## Privacy Considerations

- All text inputs are masked in session recordings
- Wallet addresses are used as identifiers (public data)
- No PII is collected beyond wallet addresses
- Respects browser Do Not Track setting
