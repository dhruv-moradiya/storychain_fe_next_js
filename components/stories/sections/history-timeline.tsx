'use client';

import { InfoBadge, SecondaryBadge, TagBadge } from '@/components/common/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { IHistoryEvent } from '@/lib/data/mock-history';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import {
  FileText,
  GitMerge,
  GitPullRequest,
  MoreVertical,
  Plus,
  UserCheck,
  UserMinus,
  UserPlus,
  Users,
} from 'lucide-react';

interface HistoryTimelineProps {
  events: IHistoryEvent[];
  variant?: 'detailed' | 'compact';
}

const getEventIcon = (type: IHistoryEvent['type']) => {
  switch (type) {
    case 'create_story':
      return <Plus className="h-4 w-4" />;
    case 'publish_chapter':
      return <FileText className="h-4 w-4" />;
    case 'invite_collaborator':
      return <UserPlus className="h-4 w-4" />;
    case 'accept_invitation':
      return <UserCheck className="h-4 w-4" />;
    case 'reject_invitation':
      return <UserMinus className="h-4 w-4" />;
    case 'remove_collaborator':
      return <Users className="h-4 w-4" />;
    case 'open_submit_request':
      return <GitPullRequest className="h-4 w-4" />;
    case 'merge_submit_request':
      return <GitMerge className="h-4 w-4" />;
    default:
      return <MoreVertical className="h-4 w-4" />;
  }
};

const getEventColor = (type: IHistoryEvent['type']) => {
  switch (type) {
    case 'create_story':
      return 'text-brand-pink-500 bg-brand-pink-500/10 border-brand-pink-500/20';
    case 'publish_chapter':
      return 'text-brand-blue bg-brand-blue/10 border-brand-blue/20';
    case 'invite_collaborator':
      return 'text-brand-orange bg-brand-orange/10 border-brand-orange/20';
    case 'accept_invitation':
      return 'text-green-600 bg-green-500/10 border-green-500/20';
    case 'reject_invitation':
      return 'text-red-600 bg-red-500/10 border-red-500/20';
    case 'remove_collaborator':
      return 'text-gray-600 bg-gray-500/10 border-gray-500/20';
    case 'open_submit_request':
      return 'text-purple-600 bg-purple-500/10 border-purple-500/20';
    case 'merge_submit_request':
      return 'text-indigo-600 bg-indigo-500/10 border-indigo-500/20';
    default:
      return 'text-gray-500 bg-gray-100 border-gray-200';
  }
};

export default function HistoryTimeline({ events, variant = 'detailed' }: HistoryTimelineProps) {
  const isCompact = variant === 'compact';

  return (
    <Card className="border-border/50 bg-bg-cream/50 shadow-sm transition-all duration-300">
      <CardContent className={cn('pt-6', isCompact ? 'pb-2' : 'pb-6')}>
        {/* Timeline Container */}
        <div
          className={cn(
            'before:from-border/60 relative pl-10 before:absolute before:top-3 before:left-[19px] before:h-[calc(100%-24px)] before:w-[2px] before:bg-gradient-to-b before:to-transparent',
            isCompact ? 'space-y-4' : 'space-y-8'
          )}
        >
          {events.map((event) => {
            return (
              <div key={event.id} className="relative">
                {/* Timeline Dot Wrapper (Solid Background) */}
                <div className="bg-bg-cream ring-bg-cream absolute top-1.5 -left-[36px] z-10 flex h-8 w-8 items-center justify-center rounded-full ring-4">
                  {/* Timeline Dot Content (Colored) */}
                  <div
                    className={cn(
                      'flex h-full w-full items-center justify-center rounded-full border transition-all duration-300 hover:scale-110',
                      getEventColor(event.type),
                      isCompact && 'scale-90 hover:scale-100'
                    )}
                  >
                    {getEventIcon(event.type)}
                  </div>
                </div>

                {/* Content Card */}
                {isCompact ? (
                  // Compact View
                  <div className="bg-bg-cream group border-border/40 hover:border-brand-pink-500/30 relative flex items-center justify-between gap-4 rounded-lg border px-4 py-3 shadow-sm transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-6 w-6 border border-white shadow-sm">
                        <AvatarImage src={event.user.avatarUrl} alt={event.user.username} />
                        <AvatarFallback className="bg-brand-pink-500/10 text-brand-pink-500 text-[10px] font-semibold">
                          {event.user.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                        <span className="text-text-primary text-sm font-medium">{event.title}</span>
                        <span className="text-text-secondary-65 hidden text-xs sm:inline-block">
                          •
                        </span>
                        <span className="text-text-secondary-65 text-xs">
                          by {event.user.username}
                        </span>
                      </div>
                    </div>

                    <time className="text-text-secondary-50 text-xs font-medium whitespace-nowrap">
                      {format(new Date(event.createdAt), 'MMM d, h:mm a')}
                    </time>
                  </div>
                ) : (
                  // Detailed View
                  <div className="bg-bg-cream group border-border/40 hover:border-brand-pink-500/30 relative rounded-xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                    <div className="mb-3 flex flex-wrap items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border-2 border-white shadow-sm transition-transform group-hover:scale-105">
                          <AvatarImage src={event.user.avatarUrl} alt={event.user.username} />
                          <AvatarFallback className="bg-brand-pink-500/10 text-brand-pink-500 text-xs font-semibold">
                            {event.user.username.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-text-primary text-sm font-semibold tracking-tight">
                            {event.user.username}
                          </span>
                          <time className="text-text-secondary-65 text-xs font-medium">
                            {format(new Date(event.createdAt), 'MMM d, yyyy • h:mm a')}
                          </time>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-text-primary font-medium tracking-tight">
                        {event.title}
                      </h3>
                      <p className="text-text-secondary-65 text-sm leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    {/* Metadata with Badges */}
                    {(event.metadata?.chapterTitle ||
                      event.metadata?.prTitle ||
                      event.metadata?.collaboratorName) && (
                      <div className="mt-4 flex flex-wrap gap-2 pt-1">
                        {event.metadata.chapterTitle && (
                          <SecondaryBadge
                            label={event.metadata.chapterTitle}
                            icon={FileText}
                            size="sm"
                            className="bg-brand-blue/10 text-brand-blue border-brand-blue/20 hover:bg-brand-blue/20 transition-colors"
                          />
                        )}
                        {event.metadata.prTitle && (
                          <InfoBadge
                            label={event.metadata.prTitle}
                            icon={GitPullRequest}
                            size="sm"
                            className="bg-brand-purple/10 text-brand-purple border-brand-purple/20 hover:bg-brand-purple/20 transition-colors"
                          />
                        )}
                        {event.metadata.collaboratorName && (
                          <TagBadge
                            label={event.metadata.collaboratorName}
                            icon={UserPlus}
                            size="sm"
                            className="border-orange-200 bg-orange-50 text-orange-600 transition-colors hover:bg-orange-100"
                          />
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
