import type { TStoryCollaboratorRole } from '@/type/story/story.types';
import { Eye, Handshake, type LucideIcon, PenTool, Shield } from 'lucide-react';

// ── Invitable Roles (excludes OWNER) ─────────────────────────────────────────
export const INVITABLE_ROLES: TStoryCollaboratorRole[] = [
  'co_author',
  'moderator',
  'reviewer',
  'contributor',
];

// ── Role UI Configuration ─────────────────────────────────────────────────────
export interface IRoleConfig {
  icon: LucideIcon;
  label: string;
  description: string;
}

export const ROLE_CONFIG: Record<TStoryCollaboratorRole, IRoleConfig> = {
  owner: {
    icon: Shield,
    label: 'Owner',
    description: 'Full control over the story and all collaborators',
  },
  co_author: {
    icon: PenTool,
    label: 'Co-Author',
    description: 'Full editing rights, can publish chapters, manage PRs',
  },
  moderator: {
    icon: Shield,
    label: 'Moderator',
    description: 'Can moderate content, manage reports, review PRs',
  },
  reviewer: {
    icon: Eye,
    label: 'Reviewer',
    description: 'Can review and comment on PRs, provide feedback',
  },
  contributor: {
    icon: Handshake,
    label: 'Contributor',
    description: 'Can submit chapters via PR, comment on story',
  },
};
