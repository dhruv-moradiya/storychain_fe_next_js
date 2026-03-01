import type { TStoryCollaboratorRole } from '@/type/story/story.types';

export interface InviteDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  slug: string;
}

export interface ISearchUser {
  clerkId: string;
  username: string;
  email: string;
  avatarUrl?: string;
}

export interface InviteFormData {
  selectedUser: {
    id: string;
    username: string;
    email: string;
    avatarUrl?: string;
  } | null;
  role: TStoryCollaboratorRole;
  message: string;
}
