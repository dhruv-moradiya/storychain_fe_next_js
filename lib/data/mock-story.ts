import { StoryCollaboratorRole } from '@/type/story';
import type { IStory, IStoryCollaboratorInfo } from '@/type/story';

export const MOCK_STORY: IStory & { collaborators: IStoryCollaboratorInfo[] } = {
  _id: '1',
  title: 'The Chronicles of Aethelgard',
  slug: 'the-chronicles-of-aethelgard',
  description:
    '<p>In a world where magic is fading, a young scholar discovers an ancient prophecy that could either restore the balance or plunge the realm into eternal darkness. Join the journey through forgotten ruins, mystical forests, and treacherous political landscapes.</p>',
  coverImage: {
    url: 'https://i.pinimg.com/originals/2d/e8/82/2de882cd4f43463b185253be16a7964b.jpg',
    publicId: 'cover-1',
  },
  status: 'published',
  genres: ['fantasy', 'adventure', 'mystery'],
  contentRating: 'teen',
  lastActivityAt: new Date(),
  collaborators: [
    {
      clerkId: 'user_1',
      username: 'fantasy_writer',
      role: StoryCollaboratorRole.OWNER,
      avatarUrl: 'https://i.pinimg.com/736x/62/2e/06/622e06c0d2544aebe627158a6776ab2a.jpg',
    },
    {
      clerkId: 'user_2',
      username: 'editor_pro',
      role: StoryCollaboratorRole.CO_AUTHOR,
      avatarUrl: 'https://i.pinimg.com/736x/ab/41/40/ab4140adebd1a3420ef2969ab775664f.jpg',
    },
    {
      clerkId: 'user_3',
      username: 'lore_master',
      role: StoryCollaboratorRole.MODERATOR,
      avatarUrl: 'https://i.pinimg.com/736x/5f/40/6a/5f406ab25e8942cbe0da6485afd26b71.jpg',
    },
    {
      clerkId: 'user_4',
      username: 'reviewer_1',
      role: StoryCollaboratorRole.REVIEWER,
      avatarUrl: 'https://i.pinimg.com/736x/92/d5/d3/92d5d376174a7428c9b36056580f1358.jpg',
    },
  ],
  // Other required fields filled with defaults for mock
  creatorId: 'user_1',
  settings: {
    isPublic: true,
    allowBranching: true,
    requireApproval: true,
    allowComments: true,
    allowVoting: true,
    genres: ['fantasy'],
    contentRating: 'teen',
  },
  stats: {
    totalChapters: 47,
    totalBranches: 12,
    totalReads: 12500,
    totalVotes: 2300,
    uniqueContributors: 23,
    averageRating: 4.7,
  },
  tags: ['magic', 'prophecy', 'hero'],
  trendingScore: 100,
  publishedAt: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const MOCK_INLINE_STATS = {
  totalChapters: 47,
  totalReads: '12.5K',
  totalVotes: '2.3K',
  totalContributors: 23,
  rating: '4.7/5',
  ratingVotes: 342,
  progressPercent: 80,
  estimatedChapters: 60,
  startedAt: 'Jan 2024',
};

export const MOCK_LATEST_CHAPTERS = [
  {
    title: 'Ch. 47: The Final Confrontation',
    reads: '1.2K',
    comments: 45,
    likes: 234,
    date: '2 days ago',
    authorName: 'Azure',
    authorRole: 'Moderator',
    authorAvatar: 'https://i.pinimg.com/474x/33/fb/eb/33fbeb45315109aa81ed6a7d1551552c.jpg',
  },
  {
    title: 'Ch. 46: Betrayal at Dawn',
    reads: '2.1K',
    comments: 89,
    likes: 456,
    date: '5 days ago',
    authorName: 'Fantasy Writer',
    authorRole: 'Owner',
    authorAvatar: 'https://i.pinimg.com/736x/4c/ab/77/4cab77de6b83b7e3149ce03867194ea5.jpg',
  },
];
