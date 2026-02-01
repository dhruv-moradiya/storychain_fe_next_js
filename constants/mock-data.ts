import type { StaticStory } from '@/components/dashboard/sections/stories-section';
import type { StaticChapter } from '@/components/dashboard/sections/my-chapters';

// Static mock data for stories (no API calls)
export const MOCK_STORIES: StaticStory[] = [
  {
    id: '1',
    slug: 'the-midnight-garden',
    title: 'The Midnight Garden: A Tale of Forgotten Dreams',
    status: 'PUBLISHED',
    contentRating: 'GENERAL',
    tags: ['Fantasy', 'Mystery', 'Adventure'],
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
  {
    id: '2',
    slug: 'echoes-of-tomorrow',
    title: 'Echoes of Tomorrow',
    status: 'DRAFT',
    contentRating: 'TEEN',
    tags: ['Sci-Fi', 'Drama'],
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  },
  {
    id: '3',
    slug: 'whispers-in-the-dark',
    title: 'Whispers in the Dark',
    status: 'COMPLETED',
    contentRating: 'MATURE',
    tags: ['Horror', 'Thriller', 'Suspense'],
    updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks ago
  },
  {
    id: '4',
    slug: 'chronicles-of-aether',
    title: 'Chronicles of Aether: The First Kingdom',
    status: 'PUBLISHED',
    contentRating: 'TEEN',
    tags: ['Fantasy', 'Epic', 'Romance'],
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
  {
    id: '5',
    slug: 'the-last-summer',
    title: 'The Last Summer',
    status: 'DRAFT',
    contentRating: 'GENERAL',
    tags: ['Coming of Age', 'Drama'],
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
  },
];

// Static mock data for chapters
export const MOCK_CHAPTERS: StaticChapter[] = [
  {
    id: 'ch1',
    title: 'The Beginning of the End',
    storyTitle: 'The Midnight Garden',
    storySlug: 'the-midnight-garden',
    status: 'published',
    stats: { reads: 1250, comments: 45, childBranches: 3 },
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'ch2',
    title: 'A New Dawn',
    storyTitle: 'Echoes of Tomorrow',
    storySlug: 'echoes-of-tomorrow',
    status: 'pending_approval',
    stats: { reads: 0, comments: 0, childBranches: 0 },
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'ch3',
    title: 'The Dark Revelation',
    storyTitle: 'Whispers in the Dark',
    storySlug: 'whispers-in-the-dark',
    status: 'published',
    stats: { reads: 3420, comments: 127, childBranches: 5 },
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'ch4',
    title: 'Untitled Draft',
    storyTitle: 'The Last Summer',
    storySlug: 'the-last-summer',
    status: 'draft',
    stats: { reads: 0, comments: 0, childBranches: 0 },
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Static notification types
export type NotificationType =
  | 'CHAPTER_PUBLISHED'
  | 'COMMENT_RECEIVED'
  | 'COLLAB_INVITATION'
  | 'STORY_FEATURED'
  | 'PR_APPROVED'
  | 'PR_REJECTED';

export interface StaticNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
  relatedStorySlug?: string;
}

// Static mock data for notifications
export const MOCK_NOTIFICATIONS: StaticNotification[] = [
  {
    id: 'n1',
    type: 'COLLAB_INVITATION',
    title: 'Collaboration Invite',
    message: "Alex Writer invited you to collaborate on 'The Midnight Garden'",
    isRead: false,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    relatedStorySlug: 'the-midnight-garden',
  },
  {
    id: 'n2',
    type: 'COMMENT_RECEIVED',
    title: 'New Comment',
    message: "Jane Reader commented on your chapter 'The Beginning'",
    isRead: false,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    actionUrl: '/chapters/ch1',
  },
  {
    id: 'n3',
    type: 'PR_APPROVED',
    title: 'Chapter Approved',
    message: "Your chapter 'A New Dawn' was approved and published",
    isRead: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    actionUrl: '/chapters/ch2',
  },
  {
    id: 'n4',
    type: 'STORY_FEATURED',
    title: 'Story Featured!',
    message: "Congratulations! 'Whispers in the Dark' was featured on the homepage",
    isRead: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    actionUrl: '/stories/whispers-in-the-dark',
  },
];
