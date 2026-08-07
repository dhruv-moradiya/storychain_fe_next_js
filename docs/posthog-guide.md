# PostHog — Complete Implementation Guide for StoryChain

> **Version:** posthog-js `^1.413.2` · **Framework:** Next.js 16 (App Router) · **Last updated:** August 2026

---

## Table of Contents

1. [What is PostHog?](#1-what-is-posthog)
2. [Free Plan — Limits & What You Get](#2-free-plan--limits--what-you-get)
3. [How to Max Out the Free Plan](#3-how-to-max-out-the-free-plan)
4. [Current Setup in StoryChain](#4-current-setup-in-storychain)
5. [Feature Deep Dives](#5-feature-deep-dives)
   - [5.1 Product Analytics (Events)](#51-product-analytics-events)
   - [5.2 Session Replay](#52-session-replay)
   - [5.3 Feature Flags](#53-feature-flags)
   - [5.4 A/B Testing (Experiments)](#54-ab-testing-experiments)
   - [5.5 Surveys](#55-surveys)
   - [5.6 Error Tracking](#56-error-tracking)
   - [5.7 Heatmaps & Toolbar](#57-heatmaps--toolbar)
   - [5.8 User Identification & Person Profiles](#58-user-identification--person-profiles)
   - [5.9 Group Analytics](#59-group-analytics)
   - [5.10 Cohorts](#510-cohorts)
   - [5.11 Funnels](#511-funnels)
   - [5.12 Retention Analysis](#512-retention-analysis)
6. [Best Practices](#6-best-practices)
7. [Privacy & GDPR](#7-privacy--gdpr)
8. [Environment Variables](#8-environment-variables)
9. [Useful Custom Events for StoryChain](#9-useful-custom-events-for-storychain)
10. [Debugging & Validation](#10-debugging--validation)

---

## 1. What is PostHog?

PostHog is an **all-in-one, open-source product analytics platform** that replaces the need for multiple tools like Mixpanel (analytics), LaunchDarkly (feature flags), Hotjar (session replay), and Typeform (surveys). Everything lives in one place and shares the same underlying event data.

### Why PostHog over alternatives?

| Tool         | PostHog Replacement | PostHog Advantage                      |
| ------------ | ------------------- | -------------------------------------- |
| Mixpanel     | Product Analytics   | Unified with all other features        |
| LaunchDarkly | Feature Flags       | No extra cost on free tier             |
| Hotjar       | Session Replay      | 5,000 sessions/month free              |
| Typeform     | Surveys             | Tied directly to user events & cohorts |
| Sentry       | Error Tracking      | 100,000 exceptions/month free          |

---

## 2. Free Plan — Limits & What You Get

PostHog's free tier is **extremely generous** and designed for startups. You never need a credit card to start. Limits reset **every calendar month**.

### Monthly Free Allowances

| Feature           | Free Monthly Limit      | Notes                              |
| ----------------- | ----------------------- | ---------------------------------- |
| Product Analytics | **1,000,000 events**    | Includes autocapture events        |
| Session Replay    | **5,000 recordings**    | Full replay with click maps        |
| Feature Flags     | **1,000,000 requests**  | Includes A/B test evaluations      |
| Error Tracking    | **100,000 exceptions**  | Stack traces + session replay link |
| Surveys           | **1,500 responses**     | Popover, widget, or full-page      |
| Data Warehouse    | **1,000,000 rows**      | Sync from Postgres, etc.           |
| Logs              | **10 GB ingested**      | Application logs                   |
| PostHog AI        | **500 credits (~$5)**   | AI-powered insights                |
| Workflows         | **10,000 msgs/channel** | Automated workflows                |

### Free Plan Constraints

| Constraint     | Free Plan      | Paid Plan        |
| -------------- | -------------- | ---------------- |
| Projects       | **1 project**  | Up to 6 projects |
| Data retention | **1 year**     | 7 years          |
| Support        | Community only | Email + priority |
| Team members   | Unlimited ✅   | Unlimited ✅     |
| Dashboards     | Unlimited ✅   | Unlimited ✅     |

> **⚠️ IMPORTANT — Set Billing Limits!**
> If your usage exceeds the free limits, PostHog automatically starts billing by usage.
> **Go to Settings → Billing → Set billing limits to $0** for each product you want to keep free.
> This acts as a hard cap and prevents any surprise charges. Always do this first.

---

## 3. How to Max Out the Free Plan

### Track Everything with 1M Events/Month

1M events/month is about ~33,000 events per day. For a typical app this is enormous. Here is how to use them wisely:

```
Monthly budget breakdown (example for StoryChain):
- Pageviews:           ~300,000 (10k DAU × 30 pages)
- Custom events:       ~200,000 (story created, chapter read, vote)
- Autocapture:         ~400,000 (clicks, inputs, form submits)
- Feature flag checks: NOT counted as events (separate bucket)
Total:                 ~900,000 → safely within 1M limit
```

**To control event volume:**

- Disable autocapture for noisy components (e.g. text editor keystrokes)
- Use `capture_pageview: false` and track only meaningful page transitions
- Avoid capturing on every keystroke — only on blur or submit

### Session Replay (5,000/month)

5,000 recordings is about 160 per day. You do not need to record everyone:

```typescript
// Only record 20% of sessions — reduces volume, keeps quality
posthog.init(token, {
  session_recording: {
    sample_rate: 0.2, // record 20% of sessions
    minimum_duration: 5000, // only sessions > 5 seconds
  },
});
```

### Feature Flags (1M requests/month)

Feature flags are checked on every page load per user. With 100 DAU × 30 days × 10 pages = 30,000 requests — well within limits.

**Use bootstrap to avoid network calls on every check:**

```typescript
posthog.init(token, {
  bootstrap: {
    featureFlags: { 'my-flag': true },
  },
});
```

---

## 4. Current Setup in StoryChain

Your app already has a solid PostHog foundation. Here is what is in place:

### Initialization — `instrumentation-client.ts`

```typescript
// Runs once on app load (Next.js 15+ instrumentation hook)
import posthog from 'posthog-js';

posthog.init(projectToken, {
  api_host: host,
  defaults: '2026-01-30', // uses all latest default configs
  capture_exceptions: true, // error tracking enabled ✅
  debug: process.env.NODE_ENV === 'development',
});
```

### User Identity — `clerk-theme-provider.tsx`

```typescript
// Identifies users when they sign in via Clerk
posthog.identify(user.id, {
  $email: email,
  $name: user.fullName,
  username: user.username,
});

// Resets on sign-out (clears the session link)
posthog.reset();
```

### Custom Events Already Tracked

| Event Name             | Location                    | Properties      |
| ---------------------- | --------------------------- | --------------- |
| `chapter_unlocked`     | `chapter-unlock-dialog.tsx` | none            |
| `collaborator_invited` | `invite-dialog/index.tsx`   | `role`          |
| `chapter_upvoted`      | `chapter-vote-panel.tsx`    | none            |
| `chapter_downvoted`    | `chapter-vote-panel.tsx`    | none            |
| `content_reported`     | `report-button.tsx`         | content details |
| `story_created`        | `create-story-dialog.tsx`   | story details   |

---

## 5. Feature Deep Dives

### 5.1 Product Analytics (Events)

#### What it does

Tracks user actions as **events** and lets you visualize them as trends, funnels, or retention charts.

#### How to capture an event

```typescript
import posthog from 'posthog-js';

// Basic event
posthog.capture('story_published');

// Event with properties (richer insights)
posthog.capture('story_published', {
  story_id: story.id,
  genre: story.genre,
  chapter_count: story.chapters.length,
  is_collaborative: story.collaborators.length > 1,
  word_count: story.wordCount,
});
```

#### Best practices for events

```typescript
// ✅ DO: Use snake_case for event names
posthog.capture('chapter_read_completed');

// ❌ DON'T: Mix naming conventions
posthog.capture('ChapterReadCompleted');
posthog.capture('chapter-read-completed');

// ✅ DO: Add rich, filterable properties
posthog.capture('chapter_read_completed', {
  chapter_id: 'ch_123',
  time_spent_seconds: 245,
  scroll_depth_percent: 87,
  story_genre: 'fantasy',
});

// ❌ DON'T: Track PII as event properties
// Use person properties for email, name, etc.
```

#### Setting Person Properties

```typescript
// Set properties on the person profile (persists across events)
posthog.setPersonProperties({
  subscription_plan: 'free',
  stories_created: 5,
  preferred_genre: 'fantasy',
});
```

#### Autocapture

PostHog automatically captures button clicks, link clicks, form submissions, and page views. You can fine-tune it:

```typescript
posthog.init(token, {
  autocapture: {
    dom_event_allowlist: ['click'],
    url_allowlist: ['app.storychain.com'],
    element_attribute_ignorelist: ['data-sensitive'],
  },
});
```

---

### 5.2 Session Replay

#### What it does

Records actual user sessions — mouse movements, clicks, scrolls, text input. Links directly to the events that occurred during that session.

#### Configure session replay

```typescript
posthog.init(token, {
  session_recording: {
    maskAllInputs: true, // ✅ Always mask inputs (privacy)
    maskTextSelector: '.sensitive-data',
    blockSelector: '.payment-form',
    sample_rate: 0.5, // record 50% of sessions
    minimum_duration: 3000, // only sessions > 3 seconds
  },
});
```

#### Start/stop recording programmatically

```typescript
// Start recording only for specific user segments
if (user.isPremium) {
  posthog.startSessionRecording();
}

// Stop recording sensitive sections
posthog.stopSessionRecording();

// Check if currently recording
const isRecording = posthog.isSessionRecordingActive();
```

---

### 5.3 Feature Flags

#### What it does

Control which features are visible to which users — without a redeployment. Use for gradual rollouts, beta features, and kill switches.

#### Check a feature flag

```typescript
import { useFeatureFlagEnabled, useFeatureFlagVariantKey } from 'posthog-js/react';

// React hook (recommended for components)
'use client';
function NewStoryEditor() {
  const isNewEditorEnabled = useFeatureFlagEnabled('new-story-editor');

  if (!isNewEditorEnabled) return <OldEditor />;
  return <NewEditor />;
}

// Direct call (for non-React contexts)
const showBetaBanner = posthog.isFeatureEnabled('beta-banner');

// Async check with callback
posthog.onFeatureFlags(() => {
  if (posthog.isFeatureEnabled('new-feature')) {
    initNewFeature();
  }
});
```

#### Multivariate flags (A/B/C testing)

```typescript
function PricingPage() {
  const variant = useFeatureFlagVariantKey('pricing-experiment');
  // variant will be: 'control' | 'variant-a' | 'variant-b'

  if (variant === 'variant-a') return <PricingV1 />;
  if (variant === 'variant-b') return <PricingV2 />;
  return <PricingDefault />;
}
```

#### Bootstrap flags (avoid loading delay / flicker)

```typescript
posthog.init(token, {
  bootstrap: {
    distinctID: userId,
    featureFlags: {
      'new-editor': true,
      'pricing-experiment': 'variant-a',
    },
  },
});
```

#### Override flags in development

```typescript
// Override any flag locally for testing
posthog.featureFlags.override({
  'new-feature': true,
  'pricing-experiment': 'variant-b',
});
```

---

### 5.4 A/B Testing (Experiments)

#### What it does

Run controlled experiments to measure if a change improves a metric. PostHog handles random user assignment, statistical significance calculation, and direct links to session replays per variant.

#### How to run an experiment

1. Create the feature flag in PostHog dashboard with multiple variants
2. Wrap your code in the flag check (see 5.3)
3. Capture a goal event — PostHog uses this to measure success

```typescript
function StoryPublishButton() {
  const variant = useFeatureFlagVariantKey('publish-button-experiment');

  const handlePublish = () => {
    // publish logic...

    // Capture the goal — PostHog tracks this per variant
    posthog.capture('story_published', {
      $feature_flag: 'publish-button-experiment',
      $feature_flag_response: variant,
    });
  };

  return variant === 'variant-b'
    ? <Button onClick={handlePublish}>🚀 Publish Story</Button>
    : <Button onClick={handlePublish}>Publish</Button>;
}
```

#### Experiment workflow

```
1. Hypothesis: "Adding an emoji to the publish button increases publishes"
2. Create flag: publish-button-experiment
   - control   = "Publish" (50% of users)
   - variant-b = "🚀 Publish Story" (50% of users)
3. Primary metric: story_published event
4. Run for: minimum 2 weeks (or until statistical significance)
5. Decision: PostHog shows p-value + confidence interval
```

---

### 5.5 Surveys

#### What it does

Collect in-app qualitative feedback tied to specific user actions or cohorts. No extra code needed for standard popover surveys.

#### Survey types available (free)

| Type        | Description                               |
| ----------- | ----------------------------------------- |
| Popover     | Floating widget on your site              |
| Widget      | Permanent tab on the side of the screen   |
| Full screen | Takes over the entire page                |
| Custom API  | Build your own UI, submit via PostHog API |

Standard surveys are created entirely in the PostHog dashboard. Target by URL pattern, event trigger, user cohort, or feature flag.

#### Custom survey UI

```typescript
import { usePostHog } from 'posthog-js/react';

function NpsSurvey({ surveyId }: { surveyId: string }) {
  const posthog = usePostHog();

  const submitResponse = (score: number, feedback: string) => {
    posthog.capture('survey sent', {
      $survey_id: surveyId,
      $survey_response_1: score,
      $survey_response_2: feedback,
    });

    posthog.capture('survey dismissed', { $survey_id: surveyId });
  };

  return <div>{/* Your custom survey UI */}</div>;
}
```

#### Fetch active surveys programmatically

```typescript
import { useEffect, useState } from 'react';

import { usePostHog } from 'posthog-js/react';

function useSurveys() {
  const posthog = usePostHog();
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    posthog.getActiveMatchingSurveys((activeSurveys) => {
      setSurveys(activeSurveys);
    });
  }, [posthog]);

  return surveys;
}
```

---

### 5.6 Error Tracking

#### What it does

Captures unhandled JavaScript errors with full stack traces. Links errors to session replays so you can watch exactly what the user was doing when it broke.

#### Already enabled in StoryChain ✅

```typescript
// In instrumentation-client.ts
posthog.init(token, {
  capture_exceptions: true, // already set ✅
});
```

#### Capture errors manually

```typescript
try {
  await publishStory(storyId);
} catch (error) {
  posthog.captureException(error, {
    story_id: storyId,
    user_action: 'publish_story',
  });
  toast.error('Failed to publish story');
}
```

---

### 5.7 Heatmaps & Toolbar

#### What it does

Heatmaps show where users click, hover, and scroll — no code needed.

#### How to access

1. Go to PostHog dashboard → **Toolbar**
2. Add `app.storychain.com` as an authorized domain
3. Click **Launch Toolbar**
4. The toolbar appears as a floating overlay on your live site
5. Click **Heatmaps** to see click/scroll data

#### Key points

- Heatmap data comes from **autocapture** — no extra events needed
- Heatmaps **do NOT count toward your 1M event limit** 🎉
- PostHog auto-detects **Rage clicks** (user frustration) and **Dead clicks** (confusion)

---

### 5.8 User Identification & Person Profiles

#### What it does

Links anonymous tracking data to a real user. Once identified, every event — past and future — is linked to the same person profile.

#### Already implemented in StoryChain ✅

The `PostHogIdentity` component in `clerk-theme-provider.tsx` handles this.

#### Enriching the person profile

```typescript
posthog.identify(user.id, {
  // Standard PostHog properties (used in UI)
  $email: user.email,
  $name: user.fullName,
  $avatar: user.profileImageUrl,

  // Custom properties (fully searchable/filterable)
  username: user.username,
  subscription_plan: 'free',
  stories_created: 0,
  joined_at: user.createdAt,
  referral_source: getCookie('utm_source'),
});
```

PostHog handles merging anonymous + identified sessions automatically when you call `identify()`.

---

### 5.9 Group Analytics

#### What it does

Track behaviors at the organization/team level rather than just individual users. For StoryChain, a group could be a collaborative story.

#### Use case for StoryChain

```typescript
// When a user enters a collaborative story workspace
posthog.group('story', story.id, {
  title: story.title,
  genre: story.genre,
  collaborator_count: story.collaborators.length,
  chapter_count: story.chapters.length,
  created_at: story.createdAt,
});

// Now all events captured while this group is set
// will be associated with both the user AND the story
posthog.capture('chapter_written', {
  chapter_number: 3,
  word_count: 850,
});
```

After setup you can query: "Show me stories where chapter_count > 5" or "What genre has the most upvotes?"

---

### 5.10 Cohorts

#### What it does

Cohorts are **saved user segments** you define once and reuse everywhere — in insights, feature flags, and surveys.

#### Example cohorts for StoryChain

| Cohort Name     | Definition                                      |
| --------------- | ----------------------------------------------- |
| Power Authors   | Performed `story_created` >= 3 times in 30 days |
| Engaged Readers | Performed `chapter_read_completed` >= 10 times  |
| Collaborators   | Have `collaborator_count` property > 0          |
| Churned Users   | No events in last 14 days                       |

Create cohorts in PostHog Dashboard → **People → Cohorts → New Cohort**.

---

### 5.11 Funnels

#### What it does

Visualize how many users complete a multi-step flow, and where they drop off.

#### Example: Story Publishing Funnel

```
Step 1: story_creation_started    → 1,000 users
Step 2: story_details_filled      → 750 users  (25% drop-off)
Step 3: first_chapter_written     → 400 users  (47% drop-off)
Step 4: story_published           → 200 users  (50% drop-off)
```

Create in: PostHog Dashboard → **Insights → New Insight → Funnel**

#### Useful funnels for StoryChain

1. **Onboarding**: `signed_up` → `story_created` → `chapter_written` → `collaborator_invited`
2. **Reading**: `story_opened` → `chapter_read_started` → `chapter_read_completed` → `chapter_upvoted`
3. **Unlock**: `chapter_lock_viewed` → `chapter_unlock_dialog_opened` → `chapter_unlocked`

---

### 5.12 Retention Analysis

#### What it does

Shows how many users come back to your app over time. Answers: "Are users sticky?"

#### Setup

Dashboard → **Insights → New Insight → Retention**

- **Retention event**: `chapter_read_completed`
- **Time period**: Weekly
- **Result**: Shows what % of users who read a chapter in Week 1 are still reading in Week 4

---

## 6. Best Practices

### Event Naming Convention

```typescript
// ✅ Good: object_verb pattern, snake_case
posthog.capture('story_published');
posthog.capture('chapter_unlocked');
posthog.capture('collaborator_invited');

// ❌ Bad: inconsistent, unclear
posthog.capture('publish');
posthog.capture('chapterUnlocked');
posthog.capture('INVITE_COLLABORATOR');
```

### Always Add Context Properties

```typescript
// ✅ Rich event with context
posthog.capture('chapter_read_completed', {
  chapter_id: chapter.id,
  story_id: story.id,
  story_genre: story.genre,
  chapter_number: chapter.position,
  time_spent_seconds: readingTime,
  scroll_depth_percent: scrollPercent,
  word_count: chapter.wordCount,
  is_collaborative: story.isCollaborative,
});

// ❌ Bare event — not useful for analysis
posthog.capture('chapter_read_completed');
```

### Use a Central Analytics Module

```typescript
// lib/analytics.ts
import posthog from 'posthog-js';

export const analytics = {
  storyCreated: (data: { storyId: string; genre: string; isCollaborative: boolean }) => {
    posthog.capture('story_created', {
      story_id: data.storyId,
      genre: data.genre,
      is_collaborative: data.isCollaborative,
    });
  },

  chapterReadCompleted: (data: {
    chapterId: string;
    storyId: string;
    timeSpentSeconds: number;
    scrollDepth: number;
  }) => {
    posthog.capture('chapter_read_completed', {
      chapter_id: data.chapterId,
      story_id: data.storyId,
      time_spent_seconds: data.timeSpentSeconds,
      scroll_depth_percent: data.scrollDepth,
    });
  },

  collaboratorInvited: (data: { storyId: string; role: string }) => {
    posthog.capture('collaborator_invited', {
      story_id: data.storyId,
      role: data.role,
    });
  },
};

// Usage:
// import { analytics } from '@/lib/analytics';
// analytics.storyCreated({ storyId: '123', genre: 'fantasy', isCollaborative: true });
```

### React Hook Pattern

```typescript
// hooks/use-analytics.ts
import { useCallback } from 'react';

import { usePostHog } from 'posthog-js/react';

export function useAnalytics() {
  const posthog = usePostHog();

  const trackEvent = useCallback(
    (event: string, properties?: Record<string, unknown>) => {
      posthog?.capture(event, properties);
    },
    [posthog]
  );

  return { trackEvent };
}
```

---

## 7. Privacy & GDPR

### Mask sensitive data in session replays

```typescript
posthog.init(token, {
  session_recording: {
    maskAllInputs: true, // ✅ recommended — masks ALL input fields
    blockSelector: '.no-record', // block any element from recording
    maskTextSelector: '.sensitive', // mask text (shows as ████████)
  },
});
```

```html
<!-- In your JSX: block an element from recording entirely -->
<div class="ph-no-capture">This won't appear in replays</div>

<!-- Mask text -->
<span class="ph-mask">Sensitive text here</span>
```

### Opt-out consent flow (GDPR)

```typescript
// Initialize PostHog in opted-out state
posthog.init(token, {
  opt_out_capturing_by_default: true,
});

// After user accepts your cookie banner:
function onConsentAccepted() {
  posthog.opt_in_capturing();
}

// If user declines:
function onConsentDeclined() {
  posthog.opt_out_capturing();
}

// Check current status
const isOptedIn = !posthog.has_opted_out_capturing();
```

---

## 8. Environment Variables

```bash
# .env.local
NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN=phc_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
# For EU data residency:
# NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
```

**Where to find your token:** PostHog Dashboard → **Project Settings → Project API Key**

---

## 9. Useful Custom Events for StoryChain

These events are not yet tracked but would provide high-value insights:

### Reading Engagement

```typescript
// Milestone-based scroll tracking (avoids high event volume)
posthog.capture('chapter_reading_progress', {
  chapter_id,
  story_id,
  progress_percent: 25 | 50 | 75 | 100,
});

// Time spent reading
posthog.capture('chapter_read_completed', {
  chapter_id,
  story_id,
  time_spent_seconds,
  estimated_reading_time_seconds,
  read_ratio: timeSpent / estimatedTime,
});
```

### Story Discovery

```typescript
posthog.capture('story_opened', {
  story_id,
  source: 'search' | 'trending' | 'recommended' | 'direct' | 'notification',
  search_query,
});
```

### Editor Behavior

```typescript
posthog.capture('chapter_draft_saved', {
  story_id,
  chapter_id,
  word_count,
  session_duration_seconds,
  is_autosave: true,
});
```

### Enriched Unlock Flow

```typescript
// Enrich the existing chapter_unlocked event
posthog.capture('chapter_unlocked', {
  chapter_id,
  story_id,
  unlock_method: 'coins' | 'subscription' | 'free_preview',
  coins_spent: 50,
  story_genre,
  chapter_position,
});
```

### Search

```typescript
posthog.capture('search_performed', {
  query: searchQuery,
  results_count: results.length,
  filters_applied: activeFilters,
});

posthog.capture('search_result_clicked', {
  query: searchQuery,
  result_position: index,
  story_id,
});
```

---

## 10. Debugging & Validation

### Enable debug mode (already set for dev ✅)

In development, every event is logged to the browser console:

```
[PostHog.js] [Capture] story_published { story_id: "123", genre: "fantasy" }
```

### PostHog Live Events

PostHog Dashboard → **Activity → Live Events** — events appear in real time. The fastest way to verify tracking.

### Network tab verification

Every event sends a POST to your host:

```
POST https://us.i.posthog.com/e/
Body: { event: "story_published", properties: {...} }
```

Filter by `/e/` in the browser Network tab to see all events.

### Common issues and fixes

| Issue                   | Cause                         | Fix                                                        |
| ----------------------- | ----------------------------- | ---------------------------------------------------------- |
| Events not appearing    | Missing env variables         | Check `.env.local` for `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` |
| Duplicate events        | `identify()` called too often | Use `identifiedUserId` ref guard (done ✅)                 |
| Anonymous users         | `identify()` not called       | Ensure it runs after Clerk `isLoaded && isSignedIn`        |
| Session replays missing | Under minimum duration        | Lower `minimum_duration` or remove it                      |
| Feature flags false     | Flags not loaded yet          | Use `onFeatureFlags()` callback                            |
| Too many events         | Autocapture noise             | Configure `autocapture` options in init                    |

### Verify user identification

```typescript
console.log(posthog.get_distinct_id()); // should be Clerk user.id after login
console.log(posthog.getPersonProperties()); // should have $email, $name, etc.
```

---

## Quick Reference Card

```
posthog.capture(event, props)        → Track any event
posthog.identify(id, props)          → Link session to user
posthog.setPersonProperties(props)   → Update user profile
posthog.reset()                      → Log out / new session
posthog.group(type, key, props)      → Associate with a group
posthog.isFeatureEnabled(flag)       → Boolean flag check
posthog.getFeatureFlag(flag)         → String variant check
posthog.opt_in_capturing()           → GDPR consent: accept
posthog.opt_out_capturing()          → GDPR consent: decline
posthog.captureException(error)      → Manual error capture
posthog.startSessionRecording()      → Start session recording
posthog.stopSessionRecording()       → Stop session recording
```

---

_PostHog Docs: https://posthog.com/docs | Community: https://posthog.com/community_
