import { IUserChapters } from '@/type/chapter/chapter-response.type';

export interface StaticStory {
  id: string;
  slug: string;
  title: string;
  status: string;
  contentRating: string;
  tags: string[];
  updatedAt: string;
}

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
export const MOCK_CHAPTERS: IUserChapters[] = [
  {
    _id: 'ch1',
    title: 'The Beginning of the End',
    slug: 'the-beginning-of-the-end',
    storyTitle: 'The Midnight Garden',
    storySlug: 'the-midnight-garden',
    displayNumber: '1',
    status: 'published',
    version: 1,
    votes: { upvotes: 120, downvotes: 5 },
    stats: { reads: 1250, comments: 45, childBranches: 3, uniqueReaders: 1100, completionRate: 88 },
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    reportCount: 0,
    isFlagged: false,
  },
  {
    _id: 'ch2',
    title: 'A New Dawn',
    slug: 'a-new-dawn',
    storyTitle: 'Echoes of Tomorrow',
    storySlug: 'echoes-of-tomorrow',
    displayNumber: '2',
    status: 'pending_approval',
    version: 2,
    pullRequest: { isPR: true, status: 'OPEN' },
    votes: { upvotes: 0, downvotes: 0 },
    stats: { reads: 0, comments: 0, childBranches: 0, uniqueReaders: 0, completionRate: 0 },
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    reportCount: 0,
    isFlagged: false,
  },
  {
    _id: 'ch3',
    title: 'The Dark Revelation',
    slug: 'the-dark-revelation',
    storyTitle: 'Whispers in the Dark',
    storySlug: 'whispers-in-the-dark',
    displayNumber: '15',
    isEnding: true,
    status: 'published',
    votes: { upvotes: 500, downvotes: 12 },
    stats: {
      reads: 3420,
      comments: 127,
      childBranches: 5,
      uniqueReaders: 3100,
      completionRate: 95,
    },
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    reportCount: 3,
    isFlagged: true,
  },
  {
    _id: 'ch4',
    title: 'Untitled Draft',
    slug: 'untitled-draft',
    storyTitle: 'The Last Summer',
    storySlug: 'the-last-summer',
    status: 'draft',
    displayNumber: 'Draft',
    votes: { upvotes: 0, downvotes: 0 },
    stats: { reads: 0, comments: 0, childBranches: 0, uniqueReaders: 0, completionRate: 0 },
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    reportCount: 5,
    isFlagged: false,
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
