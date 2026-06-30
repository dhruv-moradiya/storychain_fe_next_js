import type { LucideIcon } from 'lucide-react';
import {
  Bell,
  BookOpen,
  BookmarkPlus,
  Clock,
  Crown,
  Edit3,
  Eye,
  GitBranch,
  LayoutDashboard,
  Library,
  PenTool,
  Settings,
  Shield,
  Smartphone,
  Trophy,
  Unlock,
  Upload,
  UserCheck,
  UserPlus,
  Users,
} from 'lucide-react';

// ─── Getting Started Steps ────────────────────────────────────────────────────

export interface GettingStartedStep {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  subSteps: string[];
}

export const gettingStartedSteps: GettingStartedStep[] = [
  {
    number: 1,
    title: 'Create Your Account',
    description:
      'Sign up with your email or social login. Complete your profile with a display name, bio, and avatar so readers and collaborators know who you are.',
    icon: UserCheck,
    color: 'text-brand-pink-500',
    bgColor: 'bg-brand-pink-500/10',
    subSteps: [
      'Visit the Sign Up page and enter your email',
      'Verify your email address',
      'Choose a unique username (this appears on all your stories)',
      'Upload a profile photo and write a short bio',
    ],
  },
  {
    number: 2,
    title: 'Create a Story',
    description:
      'From your dashboard, start a new story. Give it a compelling title, description, cover image, and select a genre and content rating.',
    icon: BookOpen,
    color: 'text-brand-blue',
    bgColor: 'bg-brand-blue/10',
    subSteps: [
      'Click "New Story" from your dashboard',
      'Enter a title, tagline, and genre',
      'Upload a cover image (recommended: 800×1200px)',
      'Set content rating (General / Mature)',
      'Choose whether the story is Free or Coin-gated',
    ],
  },
  {
    number: 3,
    title: 'Write Your First Chapter',
    description:
      'Use the built-in rich-text editor to write your first chapter. Format text, add images, and structure your narrative before saving.',
    icon: PenTool,
    color: 'text-brand-orange',
    bgColor: 'bg-brand-orange/10',
    subSteps: [
      'Open your story and click "Add Chapter"',
      'Enter a chapter title and set the chapter order',
      'Write content using the rich-text editor',
      'Add images or formatting as needed',
      'Save as Draft or mark it Ready to Publish',
    ],
  },
  {
    number: 4,
    title: 'Add More Chapters',
    description:
      'Build out your story by adding multiple chapters. Each chapter can be free or require coins to unlock. Arrange them in order from your story dashboard.',
    icon: GitBranch,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    subSteps: [
      "Go to your story's chapter list",
      'Add chapters in sequence',
      'Set coin price for premium chapters (optional)',
      'Reorder chapters by dragging in the chapter list',
    ],
  },
  {
    number: 5,
    title: 'Invite Collaborators',
    description:
      'Optionally invite co-authors or moderators to your story. Assign roles with specific permissions so everyone knows what they can and cannot do.',
    icon: UserPlus,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    subSteps: [
      'Go to Story Settings → Collaborators',
      'Search for a user by their username',
      'Assign a role: Co-Author, Collaborator, Reviewer, or Moderator',
      'The user receives an invitation notification',
      'They can accept or decline from their notifications',
    ],
  },
  {
    number: 6,
    title: 'Publish Your Story',
    description:
      'Once your story has at least one chapter ready, publish it for the world to read. You can publish chapters individually or all at once.',
    icon: Upload,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    subSteps: [
      'Mark each chapter as "Published" from the chapter editor',
      'Set story visibility to Public from Story Settings',
      'Share your story link on social media',
      'Track reads and earnings from your dashboard',
    ],
  },
];

// ─── Collaboration Roles ──────────────────────────────────────────────────────

export interface CollaborationRole {
  role: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  description: string;
  canWrite: boolean;
  canPublish: boolean;
  canManageCollaborators: boolean;
  canEditSettings: boolean;
  canModerate: boolean;
  canDistribute: boolean;
}

export const collaborationRoles: CollaborationRole[] = [
  {
    role: 'Owner',
    icon: Crown,
    color: 'text-brand-orange',
    bgColor: 'bg-brand-orange/10',
    description:
      'The creator of the story. Has full control over all settings, chapters, and collaborators.',
    canWrite: true,
    canPublish: true,
    canManageCollaborators: true,
    canEditSettings: true,
    canModerate: true,
    canDistribute: true,
  },
  {
    role: 'Co-Author',
    icon: PenTool,
    color: 'text-brand-blue',
    bgColor: 'bg-brand-blue/10',
    description:
      'A trusted writer who can write and publish chapters, but cannot change story settings.',
    canWrite: true,
    canPublish: true,
    canManageCollaborators: false,
    canEditSettings: false,
    canModerate: true,
    canDistribute: false,
  },
  {
    role: 'Collaborator',
    icon: Users,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    description: 'Can write and submit chapters, but their work needs approval before publishing.',
    canWrite: true,
    canPublish: false,
    canManageCollaborators: false,
    canEditSettings: false,
    canModerate: false,
    canDistribute: false,
  },
  {
    role: 'Reviewer',
    icon: Eye,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    description: 'Reviews and gives feedback on chapters. Cannot write or publish content.',
    canWrite: false,
    canPublish: false,
    canManageCollaborators: false,
    canEditSettings: false,
    canModerate: false,
    canDistribute: false,
  },
  {
    role: 'Moderator',
    icon: Shield,
    color: 'text-brand-pink-500',
    bgColor: 'bg-brand-pink-500/10',
    description: 'Manages community aspects: handles reports, comments, and reader interactions.',
    canWrite: false,
    canPublish: false,
    canManageCollaborators: false,
    canEditSettings: false,
    canModerate: true,
    canDistribute: false,
  },
];

// ─── Writing & Editing Features ───────────────────────────────────────────────

export interface WritingFeature {
  icon: LucideIcon;
  title: string;
  description: string;
  tips: string[];
  color: string;
  bgColor: string;
}

export const writingFeatures: WritingFeature[] = [
  {
    icon: Edit3,
    title: 'Rich Text Editor',
    description:
      'A full-featured writing environment with headings, bold/italic, bullet lists, blockquotes, and image embeds. Write exactly the way you imagine it.',
    tips: [
      'Use H2/H3 headings to break up long chapters',
      'Embed images to enhance visual storytelling',
      'Use blockquotes for character dialogue or emphasis',
      'Preview your chapter before saving to see the reader view',
    ],
    color: 'text-brand-blue',
    bgColor: 'bg-brand-blue/10',
  },
  {
    icon: LayoutDashboard,
    title: 'Chapter Management',
    description:
      'Organize all your chapters from a central dashboard. Reorder, edit, set pricing, and manage draft vs published state for each chapter individually.',
    tips: [
      'Keep early chapters free to hook new readers',
      'Use the drag-to-reorder feature to restructure your story',
      'Set coin prices per chapter, not globally',
      'Archive chapters instead of deleting to preserve history',
    ],
    color: 'text-brand-orange',
    bgColor: 'bg-brand-orange/10',
  },
  {
    icon: Clock,
    title: 'Auto-Save & Drafts',
    description:
      'Your writing is saved automatically every 30 seconds. Never lose your work. Drafts are private until you explicitly publish them.',
    tips: [
      'Look for the "Saved" indicator in the top bar',
      'Draft chapters are only visible to you and co-authors',
      'You can go back and edit published chapters anytime',
      'Use the chapter history to restore previous versions',
    ],
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
];

// ─── Reading Experience Features ──────────────────────────────────────────────

export interface ReadingFeature {
  icon: LucideIcon;
  title: string;
  description: string;
  tips: string[];
  color: string;
  bgColor: string;
}

export const readingFeatures: ReadingFeature[] = [
  {
    icon: Library,
    title: 'Explore Stories',
    description:
      'Browse a curated library of stories across genres. Filter by genre, popularity, newest, or coin-free. Follow authors to get notified when they publish.',
    tips: [
      'Use the genre filter to find stories you love',
      'Check the "Free to Read" filter for no-coin stories',
      'Follow authors to see their new releases in your feed',
      'Save stories to your reading list for later',
    ],
    color: 'text-brand-blue',
    bgColor: 'bg-brand-blue/10',
  },
  {
    icon: Unlock,
    title: 'Unlocking Chapters',
    description:
      'Premium chapters require coins to unlock. Once unlocked, a chapter is yours permanently — no re-purchasing. Your reading progress is saved automatically.',
    tips: [
      '10 coins = 1 chapter unlock (price set by author)',
      'Unlocked chapters stay in your library forever',
      'Your reading position is saved automatically',
      'You can read unlocked chapters offline after caching',
    ],
    color: 'text-brand-orange',
    bgColor: 'bg-brand-orange/10',
  },
  {
    icon: BookmarkPlus,
    title: 'Track Your Progress',
    description:
      'All your reading progress is synced across devices. Resume exactly where you left off. Use bookmarks to mark important moments in a story.',
    tips: [
      'Resume any story from your "Reading" tab in your profile',
      'Bookmark specific chapters to revisit them',
      'Leave reactions and comments to engage with authors',
      'Rate stories you finish to help other readers discover them',
    ],
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
];

// ─── Profile & Settings Features ─────────────────────────────────────────────

export interface ProfileFeature {
  icon: LucideIcon;
  title: string;
  description: string;
  tips: string[];
  color: string;
  bgColor: string;
}

export const profileFeatures: ProfileFeature[] = [
  {
    icon: Smartphone,
    title: 'Your Profile',
    description:
      'Your public profile showcases your stories, reading history, and earned badges. Customize your display name, avatar, bio, and social links.',
    tips: [
      'A strong bio with your writing style attracts more readers',
      'Pin your best story to the top of your profile',
      'Link your social accounts for cross-promotion',
      'Your profile URL is: storychain.app/@username',
    ],
    color: 'text-brand-blue',
    bgColor: 'bg-brand-blue/10',
  },
  {
    icon: Bell,
    title: 'Notifications',
    description:
      'Get real-time notifications for new chapter releases, collaboration invites, comments, and coin earnings. Configure what you want to be notified about.',
    tips: [
      'Enable push notifications to never miss a new chapter',
      'Customize which events trigger email notifications',
      'Collaboration invites expire after 7 days — act quickly',
      'Chapter earnings notifications include the exact coin amount',
    ],
    color: 'text-brand-orange',
    bgColor: 'bg-brand-orange/10',
  },
  {
    icon: Trophy,
    title: 'Achievements & Badges',
    description:
      'Earn badges for writing milestones, reading streaks, and community engagement. Badges appear on your public profile and signal your expertise.',
    tips: [
      'Write 5 stories to earn the "Storyteller" badge',
      'Maintain a 7-day reading streak for the "Avid Reader" badge',
      'Getting 100 followers unlocks the "Influencer" badge',
      'Complete all onboarding steps for the "Pioneer" badge',
    ],
    color: 'text-brand-pink-500',
    bgColor: 'bg-brand-pink-500/10',
  },
  {
    icon: Settings,
    title: 'Account Settings',
    description:
      'Manage your password, connected accounts, privacy settings, and notification preferences from the Settings page.',
    tips: [
      'Enable two-factor authentication for account security',
      'Set your profile to Private to hide from search',
      'Manage connected social accounts from Settings → Connections',
      'Download your data or delete your account from Settings → Privacy',
    ],
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
];

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export interface GuideFAQ {
  question: string;
  answer: string;
  category: 'general' | 'monetization' | 'collaboration' | 'reading';
}

export const guideFaqs: GuideFAQ[] = [
  {
    question: 'Is StoryChain free to use?',
    answer:
      'Yes — creating an account, writing stories, and reading free chapters is completely free. Coins are only needed to unlock premium chapters that authors have put behind a paywall. You can enjoy many stories on the platform without spending anything.',
    category: 'general',
  },
  {
    question: 'How do I publish my story so others can read it?',
    answer:
      'After writing at least one chapter, go to your Story Settings and set visibility to "Public". Then, in the chapter editor, mark each chapter as "Published". Published chapters are immediately visible to readers. Draft chapters remain private.',
    category: 'general',
  },
  {
    question: 'Can I edit a chapter after publishing it?',
    answer:
      'Yes. You can edit any published chapter at any time from the chapter editor. Changes are saved and immediately visible to readers. Readers who have already unlocked the chapter will see the updated version.',
    category: 'general',
  },
  {
    question: 'How do I invite someone to collaborate on my story?',
    answer:
      'Go to your Story Settings → Collaborators tab. Search for the user by their username, select a role (Co-Author, Collaborator, Reviewer, or Moderator), and send the invite. The user will receive a notification and can accept or decline. Invites expire after 7 days.',
    category: 'collaboration',
  },
  {
    question: 'What is the difference between a Collaborator and a Co-Author?',
    answer:
      'A Co-Author has nearly the same writing permissions as the Owner — they can write and publish chapters independently. A Collaborator can write chapters, but their work must be reviewed and approved by the Owner or a Co-Author before it goes live.',
    category: 'collaboration',
  },
  {
    question: 'Can I remove a collaborator from my story?',
    answer:
      'Yes. As the Story Owner, you can remove any collaborator at any time from Story Settings → Collaborators. Removed collaborators lose access immediately but any already-published content they contributed remains in the story.',
    category: 'collaboration',
  },
  {
    question: 'How do readers purchase coins?',
    answer:
      'Readers can buy coins from the Wallet section of their profile. We offer multiple coin packs — from small top-ups to large bundles with bonus coins. Payments are processed securely via Razorpay and support UPI, credit/debit cards, net banking, and popular wallets.',
    category: 'monetization',
  },
  {
    question: 'How do I set a price for my chapters?',
    answer:
      'When creating or editing a chapter, you can toggle "Coin-Gated" and set a coin price. The minimum is 1 coin. Readers will need to spend that many coins to unlock the chapter. You can also keep chapters free to attract new readers.',
    category: 'monetization',
  },
  {
    question: 'When and how do I get paid for my story earnings?',
    answer:
      "Earnings accumulate in your story's coin pool as readers unlock chapters. As the Story Owner, you can distribute earnings to collaborators and then request a withdrawal from your Wallet. Withdrawal requests are reviewed and processed by the platform within 24–48 hours.",
    category: 'monetization',
  },
  {
    question: 'What is the platform fee?',
    answer:
      "When a reader spends coins to unlock a chapter, StoryChain retains 20% as a platform fee. The remaining 80% is credited to the story's earnings pool, which the Story Owner can then distribute to collaborators and withdraw.",
    category: 'monetization',
  },
  {
    question: 'Can I read on mobile?',
    answer:
      'Yes. StoryChain is fully responsive and works on any modern mobile browser. We also support offline reading for chapters you have already unlocked — simply open the chapter while connected and it will be cached for offline access.',
    category: 'reading',
  },
  {
    question: 'What happens to my unlocked chapters if I delete my account?',
    answer:
      'We recommend exporting or saving any important reading history before deleting your account. Once an account is deleted, all unlocked chapter access and coin balance are permanently removed and cannot be recovered.',
    category: 'reading',
  },
];

// ─── Kept for backward compat (no longer used in new design) ─────────────────

export {};
