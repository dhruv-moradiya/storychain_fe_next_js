'use client';

import { useState } from 'react';

import type { IPRComment, IPullRequest } from '@/type';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { GitPullRequest, Send } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

import CommentCard from './comment-card';
import type { IPRDetailTimelineEntry } from './pr-detail-static-data';
import { TIMELINE_ACTION_CONFIG } from './pr-timeline-configs';

interface ConversationTabProps {
  pullRequest: IPullRequest;
  comments: IPRComment[];
  timeline: IPRDetailTimelineEntry[];
}

export default function ConversationTab({ pullRequest, comments, timeline }: ConversationTabProps) {
  const [newComment, setNewComment] = useState('');

  const handleComment = () => {
    setNewComment('');
  };

  return (
    <div className="space-y-6">
      {/* Main Description Card */}
      <div className="border-border/50 bg-card flex flex-col gap-4 rounded-sm border p-5 shadow-xs">
        <div className="border-border/50 flex items-center justify-between gap-3 border-b pb-4">
          <div className="flex items-center gap-3">
            <Avatar className="ring-border/20 h-9 w-9 shrink-0 ring-2">
              <AvatarImage src={pullRequest.author?.avatar} alt={pullRequest.author?.displayName} />
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                {(pullRequest.author?.displayName || 'A').charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-text-primary text-base font-semibold">
                  {pullRequest.author?.displayName || 'Author'}
                </h3>
                <Badge
                  variant="outline"
                  className="border-primary/30 text-primary bg-primary/5 rounded-sm px-1.5 py-0 text-[10px] font-semibold"
                >
                  Author
                </Badge>
              </div>
              <span className="text-text-secondary-65 font-mono text-[11px]">
                {formatDistanceToNow(new Date(pullRequest.createdAt), { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>
        <div>
          <p className="text-text-primary font-sans text-sm leading-relaxed whitespace-pre-wrap">
            {pullRequest.description || 'No description provided.'}
          </p>
        </div>
      </div>

      {/* Timeline + Comments */}
      <div className="relative space-y-6">
        {timeline.map((event, idx) => {
          const config = TIMELINE_ACTION_CONFIG[event.action];
          const EventIcon = config?.icon || GitPullRequest;

          return (
            <motion.div key={idx} className="relative flex items-center pl-10">
              <div
                className={cn(
                  'border-border/50 bg-card absolute left-0 flex h-8 w-8 items-center justify-center rounded-full border shadow-xs',
                  config.bgColor
                )}
              >
                <EventIcon className={cn('size-3.5', config.color)} />
              </div>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-sm">
                <span className="text-text-primary font-semibold">{event.author.displayName}</span>
                <span className="text-text-secondary-65">{config?.label}</span>
                <span className="text-text-secondary-65 font-mono text-xs opacity-75">
                  {formatDistanceToNow(new Date(event.createdAt), { addSuffix: true })}
                </span>
              </div>
            </motion.div>
          );
        })}

        {/* Comment Cards */}
        {comments.map((comment) => (
          <div key={comment._id} className="relative z-10">
            <CommentCard comment={comment} />
          </div>
        ))}
      </div>

      {/* Comment Insertion Box */}
      <div className="relative z-10 flex gap-4">
        {/* Avatar */}
        <Avatar className="ring-border/20 h-9 w-9 shrink-0 ring-2">
          <AvatarImage src="https://i.pinimg.com/736x/15/7e/59/157e59bbf90bb9942734a34aef0529a4.jpg" />
          <AvatarFallback className="bg-secondary/20 text-secondary font-semibold">
            ME
          </AvatarFallback>
        </Avatar>

        {/* Composer */}
        <div className="border-border/50 bg-card flex-1 rounded-sm border p-4 shadow-xs">
          <Textarea
            placeholder="Join the discussion..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px] resize-none border-0 bg-transparent text-sm focus-visible:ring-0"
          />

          <div className="border-border/50 flex items-center justify-end border-t pt-3">
            <Button
              size="sm"
              onClick={handleComment}
              disabled={!newComment.trim()}
              className="h-10 cursor-pointer rounded-sm font-semibold"
            >
              <Send className="size-4" />
              Comment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
