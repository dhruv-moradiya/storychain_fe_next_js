import posthog from 'posthog-js';

/**
 * Enum of all PostHog tracking event names used across StoryChain.
 * Centralizing event names prevents typos and enforces consistent snake_case naming.
 */
export enum AnalyticsEvent {
  // -=-=-=-=-=-=-=-=-=-=-=  STORY EVENTS  -=-=-=-=-=-=-=-=-=-=-=
  STORY_CREATED = 'story_created',
  STORY_UPDATED = 'story_updated',
  STORY_DELETED = 'story_deleted',
  STORY_OPENED = 'story_opened',
  STORY_SHARED = 'story_shared',
  STORY_BOOKMARKED = 'story_bookmarked',
  STORY_LIKED = 'story_liked',

  // -=-=-=-=-=-=-=-=-=-=-=  CHAPTER EVENTS  -=-=-=-=-=-=-=-=-=-=-=
  CHAPTER_CREATED = 'chapter_created',
  CHAPTER_UPDATED = 'chapter_updated',
  CHAPTER_DELETED = 'chapter_deleted',
  CHAPTER_READ_STARTED = 'chapter_read_started',
  CHAPTER_READ_COMPLETED = 'chapter_read_completed',
  CHAPTER_UNLOCKED = 'chapter_unlocked',
  CHAPTER_UPVOTED = 'chapter_downvoted_or_upvoted', // chapter_upvoted
  CHAPTER_UPVOTE = 'chapter_upvoted',
  CHAPTER_DOWNVOTE = 'chapter_downvoted',
  CHAPTER_DRAFT_SAVED = 'chapter_draft_saved',

  // -=-=-=-=-=-=-=-=-=-=-=  COLLABORATOR EVENTS  -=-=-=-=-=-=-=-=-=-=-=
  COLLABORATOR_INVITED = 'collaborator_invited',
  COLLABORATOR_REMOVED = 'collaborator_removed',
  COLLABORATOR_ROLE_UPDATED = 'collaborator_role_updated',
  PULL_REQUEST_CREATED = 'pull_request_created',
  PULL_REQUEST_APPROVED = 'pull_request_approved',
  PULL_REQUEST_MERGED = 'pull_request_merged',
  PULL_REQUEST_REJECTED = 'pull_request_rejected',

  // -=-=-=-=-=-=-=-=-=-=-=  CHARACTER EVENTS  -=-=-=-=-=-=-=-=-=-=-=
  CHARACTER_CREATED = 'character_created',
  CHARACTER_UPDATED = 'character_updated',
  CHARACTER_DELETED = 'character_deleted',
  AI_PROMPT_GENERATED = 'ai_prompt_generated',

  // -=-=-=-=-=-=-=-=-=-=-=  SEARCH EVENTS  -=-=-=-=-=-=-=-=-=-=-=
  SEARCH_PERFORMED = 'search_performed',
  SEARCH_RESULT_CLICKED = 'search_result_clicked',
  FILTER_APPLIED = 'filter_applied',

  // -=-=-=-=-=-=-=-=-=-=-=  COIN EVENTS  -=-=-=-=-=-=-=-=-=-=-=
  COIN_PURCHASE_INITIATED = 'coin_purchase_initiated',
  COIN_PURCHASE_COMPLETED = 'coin_purchase_completed',
  COIN_PURCHASE_FAILED = 'coin_purchase_failed',
  COIN_SPENT = 'coin_spent',

  // -=-=-=-=-=-=-=-=-=-=-=  REPORT EVENTS  -=-=-=-=-=-=-=-=-=-=-=
  CONTENT_REPORTED = 'content_reported',
  REPORT_APPEALED = 'report_appealed',

  // -=-=-=-=-=-=-=-=-=-=-=  AUTH EVENTS  -=-=-=-=-=-=-=-=-=-=-=
  USER_IDENTIFIED = 'user_identified',
  USER_SIGNED_OUT = 'user_signed_out',
  USER_PROFILE_UPDATED = 'user_profile_updated',

  // -=-=-=-=-=-=-=-=-=-=-=  ERROR EVENTS  -=-=-=-=-=-=-=-=-=-=-=
  ERROR_OCCURRED = 'error_occurred',
}

/**
 * Safely track an event with PostHog.
 * Performs environment checks to ensure PostHog is loaded before capturing.
 */
export function trackEvent(
  event: AnalyticsEvent | string,
  properties?: Record<string, unknown>
): void {
  if (typeof window === 'undefined') return;

  try {
    posthog.capture(event, properties);
  } catch (error) {
    console.error(`[Analytics] Failed to track event "${event}":`, error);
  }
}

/**
 * Identify a user in PostHog upon authentication.
 */
export function identifyUser(userId: string, personProperties?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;

  try {
    posthog.identify(userId, personProperties);
  } catch (error) {
    console.error(`[Analytics] Failed to identify user "${userId}":`, error);
  }
}

/**
 * Reset PostHog session when user logs out.
 */
export function resetUser(): void {
  if (typeof window === 'undefined') return;

  try {
    posthog.reset();
  } catch (error) {
    console.error('[Analytics] Failed to reset user session:', error);
  }
}

/**
 * Capture manual exception to PostHog error tracking.
 */
export function trackException(
  error: unknown,
  additionalProperties?: Record<string, unknown>
): void {
  if (typeof window === 'undefined') return;

  try {
    posthog.captureException(error, additionalProperties);
  } catch (err) {
    console.error('[Analytics] Failed to capture exception:', err);
  }
}

/**
 * Convenience methods for common events across StoryChain.
 */
export const analytics = {
  // Story tracking
  storyCreated: (props: { content_rating?: string; is_public?: boolean; status?: string }) =>
    trackEvent(AnalyticsEvent.STORY_CREATED, props),

  storyOpened: (props: { story_id: string; slug: string; title?: string }) =>
    trackEvent(AnalyticsEvent.STORY_OPENED, props),

  storyShared: (props: { story_id?: string; slug?: string; method: string }) =>
    trackEvent(AnalyticsEvent.STORY_SHARED, props),

  // Chapter tracking
  chapterUnlocked: (props?: { chapter_slug?: string; story_slug?: string; coin_cost?: number }) =>
    trackEvent(AnalyticsEvent.CHAPTER_UNLOCKED, props),

  chapterUpvoted: (props?: { chapter_id?: string; story_id?: string }) =>
    trackEvent(AnalyticsEvent.CHAPTER_UPVOTE, props),

  chapterDownvoted: (props?: { chapter_id?: string; story_id?: string }) =>
    trackEvent(AnalyticsEvent.CHAPTER_DOWNVOTE, props),

  chapterReadCompleted: (props: { chapter_id: string; time_spent_seconds?: number }) =>
    trackEvent(AnalyticsEvent.CHAPTER_READ_COMPLETED, props),

  // Collaboration tracking
  collaboratorInvited: (props: { role: string; invited_username?: string }) =>
    trackEvent(AnalyticsEvent.COLLABORATOR_INVITED, props),

  // Moderation tracking
  contentReported: (props: { report_reason: string; report_type: string }) =>
    trackEvent(AnalyticsEvent.CONTENT_REPORTED, props),

  // Search tracking
  searchPerformed: (props: { query: string; results_count?: number }) =>
    trackEvent(AnalyticsEvent.SEARCH_PERFORMED, props),

  // Coin & Purchase tracking
  coinPurchaseInitiated: (props: { bundle_id: string; amount: number; currency?: string }) =>
    trackEvent(AnalyticsEvent.COIN_PURCHASE_INITIATED, props),

  coinPurchaseCompleted: (props: { order_id: string; amount: number; coins: number }) =>
    trackEvent(AnalyticsEvent.COIN_PURCHASE_COMPLETED, props),
};
