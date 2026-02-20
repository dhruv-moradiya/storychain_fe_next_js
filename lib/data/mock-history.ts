export interface IHistoryEvent {
  id: string;
  type:
    | 'create_story'
    | 'invite_collaborator'
    | 'accept_invitation'
    | 'reject_invitation'
    | 'remove_collaborator'
    | 'open_submit_request'
    | 'merge_submit_request'
    | 'publish_chapter';
  title: string;
  description?: string;
  user: {
    username: string;
    avatarUrl: string;
  };
  metadata?: {
    chapterTitle?: string;
    chapterId?: string;
    collaboratorName?: string;
    prId?: string;
    prTitle?: string;
  };
  createdAt: string;
}

export const MOCK_HISTORY_EVENTS: IHistoryEvent[] = [
  {
    id: '1',
    type: 'create_story',
    title: 'Story Created',
    description: 'The Chronicles of Aethelgard begins its journey.',
    user: {
      username: 'fantasy_writer',
      avatarUrl: 'https://i.pinimg.com/736x/62/2e/06/622e06c0d2544aebe627158a6776ab2a.jpg',
    },
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    type: 'publish_chapter',
    title: 'Chapter 1 Published',
    description: 'The Beginning of the End',
    user: {
      username: 'fantasy_writer',
      avatarUrl: 'https://i.pinimg.com/736x/62/2e/06/622e06c0d2544aebe627158a6776ab2a.jpg',
    },
    metadata: {
      chapterTitle: 'The Beginning of the End',
      chapterId: 'ch-1',
    },
    createdAt: '2024-01-16T14:30:00Z',
  },
  {
    id: '3',
    type: 'invite_collaborator',
    title: 'Invited Collaborator',
    description: 'Invited editor_pro to collaborate as Co-Author.',
    user: {
      username: 'fantasy_writer',
      avatarUrl: 'https://i.pinimg.com/736x/62/2e/06/622e06c0d2544aebe627158a6776ab2a.jpg',
    },
    metadata: {
      collaboratorName: 'editor_pro',
    },
    createdAt: '2024-01-18T09:15:00Z',
  },
  {
    id: '4',
    type: 'accept_invitation',
    title: 'Invitation Accepted',
    description: 'editor_pro joined as Co-Author.',
    user: {
      username: 'editor_pro',
      avatarUrl: 'https://i.pinimg.com/736x/ab/41/40/ab4140adebd1a3420ef2969ab775664f.jpg',
    },
    createdAt: '2024-01-18T11:45:00Z',
  },
  {
    id: '5',
    type: 'publish_chapter',
    title: 'Chapter 2 Published',
    description: 'Into the Unknown',
    user: {
      username: 'editor_pro',
      avatarUrl: 'https://i.pinimg.com/736x/ab/41/40/ab4140adebd1a3420ef2969ab775664f.jpg',
    },
    metadata: {
      chapterTitle: 'Into the Unknown',
      chapterId: 'ch-2',
    },
    createdAt: '2024-01-20T16:20:00Z',
  },
  {
    id: '6',
    type: 'open_submit_request',
    title: 'Submit Request Opened',
    description: 'Proposed changes for Chapter 3: The Hidden Path.',
    user: {
      username: 'lore_master',
      avatarUrl: 'https://i.pinimg.com/736x/5f/40/6a/5f406ab25e8942cbe0da6485afd26b71.jpg',
    },
    metadata: {
      prId: 'pr-101',
      prTitle: 'Fix lore inconsistencies in Ch 3',
    },
    createdAt: '2024-01-22T13:10:00Z',
  },
  {
    id: '7',
    type: 'merge_submit_request',
    title: 'Submit Request Merged',
    description: 'Merged changes for Chapter 3: The Hidden Path.',
    user: {
      username: 'fantasy_writer',
      avatarUrl: 'https://i.pinimg.com/736x/62/2e/06/622e06c0d2544aebe627158a6776ab2a.jpg',
    },
    metadata: {
      prId: 'pr-101',
      prTitle: 'Fix lore inconsistencies in Ch 3',
    },
    createdAt: '2024-01-23T10:05:00Z',
  },
  {
    id: '8',
    type: 'reject_invitation',
    title: 'Invitation Rejected',
    description: 'User stranger_1 declined the invitation.',
    user: {
      username: 'stranger_1',
      avatarUrl: '', // Fallback avatar needed in UI
    },
    createdAt: '2024-01-25T15:00:00Z',
  },
  {
    id: '9',
    type: 'remove_collaborator',
    title: 'Collaborator Removed',
    description: 'Removed inactive_user from the story.',
    user: {
      username: 'fantasy_writer',
      avatarUrl: 'https://i.pinimg.com/736x/62/2e/06/622e06c0d2544aebe627158a6776ab2a.jpg',
    },
    metadata: {
      collaboratorName: 'inactive_user',
    },
    createdAt: '2024-01-28T09:30:00Z',
  },
];
