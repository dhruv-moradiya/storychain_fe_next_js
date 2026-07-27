import type { IAppealItem, IReportItem } from '@/type/report.type';

export const mockReports: IReportItem[] = [
  {
    _id: 'rep-101',
    reporterId: {
      clerkId: 'usr-1',
      username: 'MakiZenin',
      displayName: 'Maki Zenin',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maki',
    },
    reportType: 'CHAPTER',
    relatedStorySlug: 'jujutsu-kaisen',
    relatedChapterSlug: 'hidden-inventory-part-2',
    reason: 'INAPPROPRIATE_CONTENT',
    description:
      'This chapter contains unmoderated explicit violence that exceeds the story rating guidelines.',
    status: 'PENDING',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    _id: 'rep-102',
    reporterId: {
      clerkId: 'usr-2',
      username: 'MegumiFushiguro',
      displayName: 'Megumi Fushiguro',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Megumi',
    },
    reportType: 'COMMENT',
    relatedStorySlug: 'jujutsu-kaisen',
    relatedChapterSlug: 'gojo-past-part-1',
    relatedCommentId: 'c-999',
    reason: 'HARASSMENT',
    description:
      'Commenter is making targeted personal attacks against co-authors in the discussion thread.',
    status: 'PENDING',
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
  },
  {
    _id: 'rep-103',
    reporterId: {
      clerkId: 'usr-3',
      username: 'YujiItadori',
      displayName: 'Yuji Itadori',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yuji',
    },
    reportType: 'STORY',
    relatedStorySlug: 'jujutsu-kaisen',
    reason: 'COPYRIGHT',
    description:
      'Paragraphs 4 through 9 are copied verbatim from another published web novel without attribution.',
    status: 'REVIEWED',
    reviewedBy: {
      clerkId: 'owner-1',
      username: 'GojoSatou',
      displayName: 'Gojo Satoru',
    },
    reviewedAt: new Date(Date.now() - 86400000).toISOString(),
    resolution: 'Investigating copyright claim with the original author.',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    _id: 'rep-104',
    reporterId: {
      clerkId: 'usr-4',
      username: 'NobaraKugisaki',
      displayName: 'Nobara Kugisaki',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nobara',
    },
    reportType: 'USER',
    relatedUserId: 'usr-bad-actor',
    relatedStorySlug: 'jujutsu-kaisen',
    reason: 'SPAM',
    description:
      'User is spamming promotional link comments across multiple chapters in this story.',
    status: 'RESOLVED',
    reviewedBy: {
      clerkId: 'owner-1',
      username: 'GojoSatou',
      displayName: 'Gojo Satoru',
    },
    reviewedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    resolution: 'Spammer comments removed and user temporarily muted.',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    _id: 'rep-105',
    reporterId: {
      clerkId: 'usr-5',
      username: 'Panda',
      displayName: 'Panda',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Panda',
    },
    reportType: 'CHAPTER',
    relatedStorySlug: 'jujutsu-kaisen',
    relatedChapterSlug: 'shibuya-incident-start',
    reason: 'OFF_TOPIC',
    description: 'Proposed chapter text appears to be completely unrelated test gibberish.',
    status: 'DISMISSED',
    reviewedBy: {
      clerkId: 'owner-1',
      username: 'GojoSatou',
      displayName: 'Gojo Satoru',
    },
    reviewedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    resolution: 'Dismissed as non-violating draft placeholder.',
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
];

export const mockAppeals: IAppealItem[] = [
  {
    _id: 'app-201',
    banHistoryId: 'ban-555',
    userId: {
      clerkId: 'usr-bad-actor',
      username: 'SpamMaster99',
      displayName: 'Spam Master',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SpamMaster',
    },
    appealReason: 'Unintentional spam link submission',
    explanation:
      'My account was compromised during a browser extension security leak. I have since changed password and enabled 2FA.',
    evidenceUrls: ['https://example.com/2fa-confirmation-screenshot.png'],
    status: 'PENDING',
    priority: 'HIGH',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    _id: 'app-202',
    banHistoryId: 'ban-556',
    userId: {
      clerkId: 'usr-77',
      username: 'ChosoCursed',
      displayName: 'Choso',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Choso',
    },
    appealReason: 'Misunderstood dialogue context',
    explanation:
      'The reported comment was in-character roleplay dialogue for the Jujutsu story lore and was not intended as real harassment.',
    status: 'UNDER_REVIEW',
    priority: 'NORMAL',
    assignedTo: {
      clerkId: 'owner-1',
      username: 'GojoSatou',
      displayName: 'Gojo Satoru',
    },
    assignedAt: new Date(Date.now() - 86400000).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
];
