/**
 * PostHog Analytics Event Types
 * Defines all trackable events for the Avail documentation site
 */

// Code interaction events
export interface CodeCopyClickedEvent {
  event: "code_copy_clicked";
  properties: {
    language?: string;
    content_length: number;
    code_title?: string;
    code_type?: "inline" | "block" | "command" | "component";
    page_path: string;
  };
}

export interface CodeBlockViewedEvent {
  event: "code_block_viewed";
  properties: {
    language?: string;
    code_title?: string;
    code_type?: "block" | "command" | "component";
    page_path: string;
  };
}

export interface CodePackageManagerSelectedEvent {
  event: "code_package_manager_selected";
  properties: {
    package_manager: "pnpm" | "npm" | "yarn" | "bun";
    page_path: string;
  };
}

export interface CodeCollapsibleToggledEvent {
  event: "code_collapsible_toggled";
  properties: {
    is_expanded: boolean;
    title?: string;
    page_path: string;
  };
}

export interface CodeFileSelectedEvent {
  event: "code_file_selected";
  properties: {
    file_name: string;
    component_name?: string;
    page_path: string;
  };
}

export interface CodeTabSwitchedEvent {
  event: "code_tab_switched";
  properties: {
    tab_name: string;
    previous_tab?: string;
    page_path: string;
  };
}

// Feedback events
export interface FeedbackRatingClickedEvent {
  event: "feedback_rating_clicked";
  properties: {
    rating: "positive" | "negative";
    page_path: string;
    page_title?: string;
  };
}

export interface FeedbackSubmittedEvent {
  event: "feedback_submitted";
  properties: {
    rating: "positive" | "negative";
    has_comment: boolean;
    comment_length: number;
    has_image: boolean;
    page_path: string;
    page_title?: string;
  };
}

// AI/LLM integration events
export interface AICopyForLLMClickedEvent {
  event: "ai_copy_for_llm_clicked";
  properties: {
    content_length: number;
    page_path: string;
    page_title?: string;
  };
}

export interface AIServiceOpenedEvent {
  event: "ai_service_opened";
  properties: {
    service: "v0" | "chatgpt" | "claude" | "other";
    page_path: string;
    page_title?: string;
  };
}

export interface AIViewMarkdownClickedEvent {
  event: "ai_view_markdown_clicked";
  properties: {
    page_path: string;
    page_title?: string;
  };
}

export interface AICopyPageClickedEvent {
  event: "ai_copy_page_clicked";
  properties: {
    content_length: number;
    page_path: string;
    page_title?: string;
  };
}

// Navigation events
export interface NavFooterLinkClickedEvent {
  event: "nav_footer_link_clicked";
  properties: {
    direction: "previous" | "next";
    destination_path: string;
    destination_title: string;
    page_path: string;
  };
}

export interface NavTOCHeadingClickedEvent {
  event: "nav_toc_heading_clicked";
  properties: {
    heading_text: string;
    heading_level: number;
    heading_id: string;
    page_path: string;
  };
}

export interface NavSidebarItemClickedEvent {
  event: "nav_sidebar_item_clicked";
  properties: {
    item_type: "page" | "folder";
    item_title: string;
    destination_path?: string;
    page_path: string;
  };
}

export interface NavCardClickedEvent {
  event: "nav_card_clicked";
  properties: {
    card_title: string;
    card_type: "concept" | "icon" | "link";
    destination_path: string;
    page_path: string;
  };
}

// Search events
export interface SearchDialogOpenedEvent {
  event: "search_dialog_opened";
  properties: {
    trigger_type: "keyboard" | "click";
    page_path: string;
  };
}

export interface SearchQuerySubmittedEvent {
  event: "search_query_submitted";
  properties: {
    query: string;
    results_count: number;
    filter: string;
    page_path: string;
  };
}

export interface SearchResultClickedEvent {
  event: "search_result_clicked";
  properties: {
    result_position: number;
    result_title: string;
    result_path: string;
    query: string;
    page_path: string;
  };
}

// Scroll and engagement events
export interface ScrollDepthReachedEvent {
  event: "scroll_depth_reached";
  properties: {
    depth_percentage: 25 | 50 | 75 | 100;
    time_to_reach_ms: number;
    page_path: string;
  };
}

export interface TimeOnPageEvent {
  event: "time_on_page";
  properties: {
    time_spent_seconds: number;
    max_scroll_depth: number;
    sections_viewed: string[];
    page_path: string;
    page_title?: string;
  };
}

export interface SectionViewedEvent {
  event: "section_viewed";
  properties: {
    section_id: string;
    section_title: string;
    time_in_section_ms: number;
    page_path: string;
  };
}

// Wallet events
export interface WalletConnectedEvent {
  event: "wallet_connected";
  properties: {
    chain_id: number;
    network_name?: string;
    page_path: string;
  };
}

export interface WalletDisconnectedEvent {
  event: "wallet_disconnected";
  properties: {
    page_path: string;
  };
}

// Session/Referrer events (enhanced pageview data)
export interface SessionStartedEvent {
  event: "session_started";
  properties: {
    referrer?: string;
    referrer_domain?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
    entry_page: string;
    page_path: string;
  };
}

// Page navigation tracking for user flows
export interface PageNavigationEvent {
  event: "page_navigation";
  properties: {
    from_path: string;
    to_path: string;
    navigation_type:
      | "internal_link"
      | "sidebar"
      | "footer"
      | "card"
      | "toc"
      | "search"
      | "browser";
    page_path: string;
  };
}

// Recent search/page events
export interface RecentPageClickedEvent {
  event: "recent_page_clicked";
  properties: {
    result_title: string;
    result_path: string;
    page_path: string;
  };
}

export interface RecentSearchClickedEvent {
  event: "recent_search_clicked";
  properties: {
    query: string;
    page_path: string;
  };
}

export interface ExternalLinkClickedEvent {
  event: "external_link_clicked";
  properties: {
    destination_url: string;
    link_text: string;
    category: "footer" | "github_edit" | "v0" | "other";
    page_path: string;
  };
}

export interface NetworkChangedEvent {
  event: "network_changed";
  properties: {
    network: "mainnet" | "testnet";
    previous_network: "mainnet" | "testnet";
    page_path: string;
  };
}

// Union type of all analytics events
export type AnalyticsEvent =
  | CodeCopyClickedEvent
  | CodeBlockViewedEvent
  | CodePackageManagerSelectedEvent
  | CodeCollapsibleToggledEvent
  | CodeFileSelectedEvent
  | CodeTabSwitchedEvent
  | FeedbackRatingClickedEvent
  | FeedbackSubmittedEvent
  | AICopyForLLMClickedEvent
  | AIServiceOpenedEvent
  | AIViewMarkdownClickedEvent
  | AICopyPageClickedEvent
  | NavFooterLinkClickedEvent
  | NavTOCHeadingClickedEvent
  | NavSidebarItemClickedEvent
  | NavCardClickedEvent
  | SearchDialogOpenedEvent
  | SearchQuerySubmittedEvent
  | SearchResultClickedEvent
  | RecentPageClickedEvent
  | RecentSearchClickedEvent
  | ScrollDepthReachedEvent
  | TimeOnPageEvent
  | SectionViewedEvent
  | WalletConnectedEvent
  | WalletDisconnectedEvent
  | SessionStartedEvent
  | ExternalLinkClickedEvent
  | NetworkChangedEvent
  | PageNavigationEvent;

// Helper type to extract event name from event type
export type EventName = AnalyticsEvent["event"];

// Helper type to get properties for a specific event
export type EventProperties<T extends EventName> = Extract<
  AnalyticsEvent,
  { event: T }
>["properties"];
