'use client';

import Link from 'next/link';

import { IStoryTimelineEvent } from '@/type/story';
import { format } from 'date-fns';
import {
  BookOpen,
  CheckCircle2,
  Edit3,
  Eye,
  FileCheck,
  FileEdit,
  FilePlus,
  FileText,
  FileX,
  Flag,
  GitMerge,
  GitPullRequest,
  GitPullRequestClosed,
  Image as ImageIcon,
  Images,
  MoreVertical,
  Plus,
  Settings,
  ShieldCheck,
  Sparkles,
  Trash2,
  UserCheck,
  UserCog,
  UserMinus,
  UserPlus,
  Users,
  XCircle,
} from 'lucide-react';

import { InfoBadge, SecondaryBadge, TagBadge } from '@/components/common/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface HistoryTimelineProps {
  events: IStoryTimelineEvent[];
  variant?: 'detailed' | 'compact';
  storySlug?: string;
}

interface IEventVisualConfig {
  icon: React.ReactNode;
  colorClass: string;
  defaultTitle: string;
  defaultDescription: (event: IStoryTimelineEvent) => string;
}

const getEventVisualConfig = (action: IStoryTimelineEvent['action']): IEventVisualConfig => {
  switch (action) {
    case 'story_created':
      return {
        icon: <Plus className="h-4 w-4" />,
        colorClass: 'text-brand-pink-500 bg-brand-pink-500/10 border-brand-pink-500/20',
        defaultTitle: 'Story Created',
        defaultDescription: () => 'The story was created and draft initiated.',
      };
    case 'story_published':
      return {
        icon: <Sparkles className="h-4 w-4" />,
        colorClass: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20',
        defaultTitle: 'Story Published',
        defaultDescription: () => 'The story was published for readers to discover.',
      };
    case 'story_archived':
      return {
        icon: <FileText className="h-4 w-4" />,
        colorClass: 'text-amber-600 bg-amber-500/10 border-amber-500/20',
        defaultTitle: 'Story Archived',
        defaultDescription: () => 'The story was moved to archives.',
      };
    case 'story_deleted':
      return {
        icon: <Trash2 className="h-4 w-4" />,
        colorClass: 'text-red-600 bg-red-500/10 border-red-500/20',
        defaultTitle: 'Story Deleted',
        defaultDescription: () => 'The story was deleted.',
      };

    // Chapters
    case 'chapter_added':
      return {
        icon: <FilePlus className="h-4 w-4" />,
        colorClass: 'text-brand-blue bg-brand-blue/10 border-brand-blue/20',
        defaultTitle: 'Chapter Added',
        defaultDescription: (e) =>
          e.metadata?.chapterTitle || e.metadata?.chapter?.title
            ? `Chapter "${e.metadata?.chapterTitle || e.metadata?.chapter?.title}" was added.`
            : 'A new chapter was added to the story.',
      };
    case 'chapter_updated':
      return {
        icon: <FileEdit className="h-4 w-4" />,
        colorClass: 'text-blue-600 bg-blue-500/10 border-blue-500/20',
        defaultTitle: 'Chapter Updated',
        defaultDescription: (e) =>
          e.metadata?.chapterTitle || e.metadata?.chapter?.title
            ? `Chapter "${e.metadata?.chapterTitle || e.metadata?.chapter?.title}" was updated.`
            : 'A chapter was updated.',
      };
    case 'chapter_deleted':
      return {
        icon: <FileX className="h-4 w-4" />,
        colorClass: 'text-rose-600 bg-rose-500/10 border-rose-500/20',
        defaultTitle: 'Chapter Deleted',
        defaultDescription: () => 'A chapter was deleted from the story.',
      };
    case 'chapter_marked_ending':
      return {
        icon: <FileCheck className="h-4 w-4" />,
        colorClass: 'text-purple-600 bg-purple-500/10 border-purple-500/20',
        defaultTitle: 'Chapter Marked as Finale',
        defaultDescription: (e) =>
          e.metadata?.chapterTitle || e.metadata?.chapter?.title
            ? `Chapter "${e.metadata?.chapterTitle || e.metadata?.chapter?.title}" was marked as an ending.`
            : 'A chapter branch was marked as an ending.',
      };

    // PRs
    case 'pr_submitted':
      return {
        icon: <GitPullRequest className="h-4 w-4" />,
        colorClass: 'text-purple-600 bg-purple-500/10 border-purple-500/20',
        defaultTitle: 'Submit Request Opened',
        defaultDescription: (e) =>
          e.metadata?.prTitle
            ? `Submit request "${e.metadata.prTitle}" was opened.`
            : 'A contributor submitted a new chapter proposal.',
      };
    case 'pr_approved':
      return {
        icon: <CheckCircle2 className="h-4 w-4" />,
        colorClass: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20',
        defaultTitle: 'Submit Request Approved',
        defaultDescription: (e) =>
          e.metadata?.prTitle
            ? `Submit request "${e.metadata.prTitle}" received approval.`
            : 'A submit request was approved.',
      };
    case 'pr_merged':
      return {
        icon: <GitMerge className="h-4 w-4" />,
        colorClass: 'text-indigo-600 bg-indigo-500/10 border-indigo-500/20',
        defaultTitle: 'Submit Request Merged',
        defaultDescription: (e) =>
          e.metadata?.prTitle
            ? `Merged submit request "${e.metadata.prTitle}" into the story.`
            : 'A submit request was merged into the story tree.',
      };
    case 'pr_rejected':
      return {
        icon: <XCircle className="h-4 w-4" />,
        colorClass: 'text-red-600 bg-red-500/10 border-red-500/20',
        defaultTitle: 'Submit Request Rejected',
        defaultDescription: (e) =>
          e.metadata?.reason
            ? `Submit request was rejected: "${e.metadata.reason}".`
            : 'A submit request was rejected.',
      };
    case 'pr_closed':
      return {
        icon: <GitPullRequestClosed className="h-4 w-4" />,
        colorClass: 'text-slate-600 bg-slate-500/10 border-slate-500/20',
        defaultTitle: 'Submit Request Closed',
        defaultDescription: () => 'A submit request was closed without merge.',
      };

    // Collaborators
    case 'collaborator_invited':
      return {
        icon: <UserPlus className="h-4 w-4" />,
        colorClass: 'text-brand-orange bg-brand-orange/10 border-brand-orange/20',
        defaultTitle: 'Collaborator Invited',
        defaultDescription: (e) => {
          const user = e.metadata?.targetUser?.username || e.metadata?.targetUserId || 'a user';
          const role = e.metadata?.role ? ` as ${String(e.metadata.role).replace('_', ' ')}` : '';
          return `Invited ${user}${role} to collaborate.`;
        },
      };
    case 'collaborator_invitation_accepted':
    case 'collaborator_added':
      return {
        icon: <UserCheck className="h-4 w-4" />,
        colorClass: 'text-green-600 bg-green-500/10 border-green-500/20',
        defaultTitle: 'Collaborator Joined',
        defaultDescription: (e) => {
          const user =
            e.metadata?.targetUser?.username || e.performedBy?.username || 'Collaborator';
          const role = e.metadata?.role ? ` as ${String(e.metadata.role).replace('_', ' ')}` : '';
          return `${user} joined the story team${role}.`;
        },
      };
    case 'collaborator_invitation_rejected':
      return {
        icon: <UserMinus className="h-4 w-4" />,
        colorClass: 'text-amber-600 bg-amber-500/10 border-amber-500/20',
        defaultTitle: 'Invitation Declined',
        defaultDescription: () => 'A collaborator invitation was declined.',
      };
    case 'collaborator_removed':
      return {
        icon: <Users className="h-4 w-4" />,
        colorClass: 'text-gray-600 bg-gray-500/10 border-gray-500/20',
        defaultTitle: 'Collaborator Removed',
        defaultDescription: (e) => {
          const user = e.metadata?.targetUser?.username || 'A collaborator';
          return `${user} was removed from the collaboration team.`;
        },
      };
    case 'collaborator_role_changed':
      return {
        icon: <UserCog className="h-4 w-4" />,
        colorClass: 'text-cyan-600 bg-cyan-500/10 border-cyan-500/20',
        defaultTitle: 'Collaborator Role Changed',
        defaultDescription: (e) => {
          const user = e.metadata?.targetUser?.username || 'Collaborator';
          const newRole = e.metadata?.newRole
            ? String(e.metadata.newRole).replace('_', ' ')
            : 'new role';
          return `${user}'s role was updated to ${newRole}.`;
        },
      };

    // Settings & Media
    case 'settings_updated':
      return {
        icon: <Settings className="h-4 w-4" />,
        colorClass: 'text-slate-700 dark:text-slate-300 bg-slate-500/10 border-slate-500/20',
        defaultTitle: 'Settings Updated',
        defaultDescription: (e) =>
          Array.isArray(e.metadata?.changedFields) && e.metadata.changedFields.length > 0
            ? `Updated story settings: ${e.metadata.changedFields.join(', ')}.`
            : 'Story configuration settings were modified.',
      };
    case 'cover_image_updated':
      return {
        icon: <ImageIcon className="h-4 w-4" />,
        colorClass: 'text-teal-600 bg-teal-500/10 border-teal-500/20',
        defaultTitle: 'Cover Image Updated',
        defaultDescription: () => 'Story cover artwork was updated.',
      };
    case 'card_image_updated':
      return {
        icon: <ImageIcon className="h-4 w-4" />,
        colorClass: 'text-teal-600 bg-teal-500/10 border-teal-500/20',
        defaultTitle: 'Card Image Updated',
        defaultDescription: () => 'Story thumbnail / card image was updated.',
      };

    // Gallery & Albums
    case 'gallery_image_added':
      return {
        icon: <ImageIcon className="h-4 w-4" />,
        colorClass: 'text-sky-600 bg-sky-500/10 border-sky-500/20',
        defaultTitle: 'Gallery Image Added',
        defaultDescription: () => 'A new illustration was added to the gallery.',
      };
    case 'gallery_image_updated':
      return {
        icon: <Edit3 className="h-4 w-4" />,
        colorClass: 'text-sky-600 bg-sky-500/10 border-sky-500/20',
        defaultTitle: 'Gallery Image Updated',
        defaultDescription: () => 'Gallery artwork details were updated.',
      };
    case 'gallery_image_deleted':
      return {
        icon: <Trash2 className="h-4 w-4" />,
        colorClass: 'text-rose-600 bg-rose-500/10 border-rose-500/20',
        defaultTitle: 'Gallery Image Deleted',
        defaultDescription: () => 'An image was removed from the gallery.',
      };
    case 'album_created':
      return {
        icon: <Images className="h-4 w-4" />,
        colorClass: 'text-violet-600 bg-violet-500/10 border-violet-500/20',
        defaultTitle: 'Album Created',
        defaultDescription: () => 'A new visual album was created.',
      };
    case 'album_updated':
      return {
        icon: <Edit3 className="h-4 w-4" />,
        colorClass: 'text-violet-600 bg-violet-500/10 border-violet-500/20',
        defaultTitle: 'Album Updated',
        defaultDescription: () => 'Album details were updated.',
      };
    case 'album_deleted':
      return {
        icon: <Trash2 className="h-4 w-4" />,
        colorClass: 'text-rose-600 bg-rose-500/10 border-rose-500/20',
        defaultTitle: 'Album Deleted',
        defaultDescription: () => 'An album was deleted.',
      };
    case 'images_added_to_album':
      return {
        icon: <Images className="h-4 w-4" />,
        colorClass: 'text-violet-600 bg-violet-500/10 border-violet-500/20',
        defaultTitle: 'Images Added to Album',
        defaultDescription: () => 'New images were curated into the album.',
      };

    // Moderation
    case 'story_flagged':
      return {
        icon: <Flag className="h-4 w-4" />,
        colorClass: 'text-red-600 bg-red-500/10 border-red-500/20',
        defaultTitle: 'Story Flagged',
        defaultDescription: () => 'Story was flagged for moderation review.',
      };
    case 'story_unflagged':
      return {
        icon: <ShieldCheck className="h-4 w-4" />,
        colorClass: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20',
        defaultTitle: 'Story Cleared',
        defaultDescription: () => 'Moderation flag was resolved.',
      };

    default:
      return {
        icon: <MoreVertical className="h-4 w-4" />,
        colorClass:
          'text-gray-500 bg-gray-100 border-gray-200 dark:bg-gray-800 dark:border-gray-700',
        defaultTitle: 'Story Activity',
        defaultDescription: () => 'Story activity recorded.',
      };
  }
};

export default function HistoryTimeline({
  events,
  variant = 'detailed',
  storySlug,
}: HistoryTimelineProps) {
  const isCompact = variant === 'compact';

  return (
    <div>
      <div className={cn('pt-4', isCompact ? 'pb-2' : 'pb-6')}>
        {/* Timeline Container */}
        <div
          className={cn(
            'before:from-border/60 relative pl-10 before:absolute before:top-3 before:left-4.75 before:h-[calc(100%-24px)] before:w-px before:bg-linear-to-b before:to-transparent',
            isCompact ? 'space-y-3' : 'space-y-6'
          )}
        >
          {events.map((event) => {
            const config = getEventVisualConfig(event.action);
            const performerName = event.performedBy?.username || 'System';
            const performerAvatar = event.performedBy?.avatarUrl;
            const eventDate = event.performedAt ? new Date(event.performedAt) : new Date();

            const chapterTitle =
              event.metadata?.chapterTitle ||
              event.metadata?.chapter?.title ||
              event.metadata?.chapterSlug;
            const chapterSlug = event.metadata?.chapterSlug || event.metadata?.chapter?.slug;
            const effectiveStorySlug = event.story?.slug || storySlug;

            const targetUserName =
              event.metadata?.targetUser?.username ||
              (typeof event.metadata?.collaboratorName === 'string'
                ? event.metadata.collaboratorName
                : undefined);
            const role = event.metadata?.role || event.metadata?.newRole;
            const prId = event.metadata?.prId;
            const prTitle = event.metadata?.prTitle;

            return (
              <div key={event._id} className="relative">
                {/* Timeline Dot Wrapper */}
                <div className="bg-background ring-background absolute top-1.5 -left-9 z-10 flex h-8 w-8 items-center justify-center rounded-full ring-4">
                  {/* Timeline Dot Content */}
                  <div
                    className={cn(
                      'flex h-full w-full items-center justify-center rounded-full border transition-all duration-300 hover:scale-110',
                      config.colorClass,
                      isCompact && 'scale-90 hover:scale-100'
                    )}
                  >
                    {config.icon}
                  </div>
                </div>

                {/* Content Card */}
                {isCompact ? (
                  // Compact View
                  <div className="bg-card group border-border/40 hover:border-primary/40 relative flex items-center justify-between gap-4 rounded-lg border px-4 py-3 shadow-xs transition-all duration-200 hover:shadow-sm">
                    <div className="flex min-w-0 items-center gap-3">
                      <Avatar className="ring-border h-6 w-6 shrink-0 ring-1">
                        <AvatarImage src={performerAvatar} alt={performerName} />
                        <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-semibold">
                          {performerName.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex min-w-0 flex-col sm:flex-row sm:items-center sm:gap-2">
                        <span className="text-foreground truncate text-sm font-medium">
                          {config.defaultTitle}
                        </span>
                        <span className="text-muted-foreground hidden text-xs sm:inline-block">
                          •
                        </span>
                        <span className="text-muted-foreground truncate text-xs">
                          by {performerName}
                        </span>
                      </div>
                    </div>

                    <time className="text-muted-foreground text-xs font-medium whitespace-nowrap">
                      {format(eventDate, 'MMM d, h:mm a')}
                    </time>
                  </div>
                ) : (
                  // Detailed View
                  <div className="bg-card group border-border/40 hover:border-primary/40 relative rounded-xl border p-5 shadow-xs transition-all duration-200 hover:shadow-sm">
                    <div className="mb-3 flex flex-wrap items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="ring-border h-9 w-9 shrink-0 ring-1">
                          <AvatarImage src={performerAvatar} alt={performerName} />
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                            {performerName.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-foreground text-sm font-semibold tracking-tight">
                            {performerName}
                          </span>
                          <time className="text-muted-foreground text-xs font-medium">
                            {format(eventDate, 'MMM d, yyyy • h:mm a')}
                          </time>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-foreground font-medium tracking-tight">
                        {config.defaultTitle}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {config.defaultDescription(event)}
                      </p>
                    </div>

                    {/* Metadata with Badges and Interactive Links */}
                    {(chapterTitle || prTitle || prId || targetUserName || role) && (
                      <div className="mt-4 flex flex-wrap items-center gap-2 pt-1">
                        {chapterTitle &&
                          (effectiveStorySlug && chapterSlug ? (
                            <Link
                              href={`/stories/${effectiveStorySlug}/chapter/${chapterSlug}`}
                              className="inline-flex"
                            >
                              <SecondaryBadge
                                label={String(chapterTitle)}
                                icon={BookOpen}
                                size="sm"
                                className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                              />
                            </Link>
                          ) : (
                            <SecondaryBadge
                              label={String(chapterTitle)}
                              icon={FileText}
                              size="sm"
                              className="bg-primary/10 text-primary border-primary/20"
                            />
                          ))}

                        {(prTitle || prId) &&
                          (effectiveStorySlug && prId ? (
                            <Link
                              href={`/stories/${effectiveStorySlug}/pull-requests/${prId}`}
                              className="inline-flex"
                            >
                              <InfoBadge
                                label={prTitle ? String(prTitle) : `PR #${String(prId).slice(-4)}`}
                                icon={GitPullRequest}
                                size="sm"
                                className="border-purple-500/20 bg-purple-500/10 text-purple-600 transition-colors hover:bg-purple-500/20 dark:text-purple-400"
                              />
                            </Link>
                          ) : (
                            <InfoBadge
                              label={prTitle ? String(prTitle) : `PR #${String(prId).slice(-4)}`}
                              icon={GitPullRequest}
                              size="sm"
                              className="border-purple-500/20 bg-purple-500/10 text-purple-600 dark:text-purple-400"
                            />
                          ))}

                        {targetUserName && (
                          <TagBadge
                            label={targetUserName}
                            icon={UserPlus}
                            size="sm"
                            className="border-orange-500/20 bg-orange-500/10 text-orange-600 transition-colors dark:text-orange-400"
                          />
                        )}

                        {role && (
                          <span className="border-border/50 bg-muted/60 text-muted-foreground rounded-md border px-2 py-0.5 text-xs font-medium capitalize">
                            {String(role).replace('_', ' ')}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
