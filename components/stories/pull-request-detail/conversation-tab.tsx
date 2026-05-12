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
    <div className="space-y-8 rounded-xl">
      {/* Main Description Card */}
      <div className="bg-card border-border/50 group hover:border-primary/30 rounded-xl border transition-all hover:shadow-md">
        <div className="border-border/50 bg-muted/15 flex items-center gap-3 border-b px-6 py-4">
          <Avatar className="ring-border ring-offset-card h-10 w-10 shadow-sm ring-2 ring-offset-2">
            <AvatarImage src={'https://api.dicebear.com/7.x/avataaars/svg?seed=Naruto'} />
            <AvatarFallback className="bg-primary/20 text-primary">UN</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-sm font-bold tracking-tight">Uzumaki Naruto</h3>
            <span className="text-muted-foreground ml-2 font-mono text-[11px] opacity-70">
              {formatDistanceToNow(new Date(pullRequest.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
          <Badge
            variant="outline"
            className="text-muted-foreground border-border px-2 text-[9px] font-bold tracking-widest uppercase"
          >
            Author
          </Badge>
        </div>
        <div className="p-4 px-6">
          <p className="text-foreground/90 text-sm leading-relaxed whitespace-pre-wrap">
            {pullRequest.description}
          </p>
        </div>
      </div>

      {/* Timeline + Comments */}
      <div className="relative space-y-8">
        {timeline.map((event, idx) => {
          const config = TIMELINE_ACTION_CONFIG[event.action];
          const EventIcon = config?.icon || GitPullRequest;

          return (
            <motion.div key={idx} className="relative flex items-center pl-10">
              <div
                className={cn(
                  'bg-card ring-border border-border absolute left-0 flex h-8 w-8 items-center justify-center rounded-full border',
                  config.bgColor
                )}
              >
                <EventIcon className={cn('h-3.5 w-3.5', config.color)} />
              </div>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                <span className="text-foreground text-sm font-semibold">
                  {event.author.displayName}
                </span>
                <span className="text-muted-foreground text-sm opacity-80">{config?.label}</span>
                <span className="font-ibm-plex-mono rounded px-2 text-[10px] opacity-50">
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
        <Avatar className="ring-background h-10 w-10 shrink-0 shadow-sm ring-2">
          <AvatarImage src="https://i.pinimg.com/736x/15/7e/59/157e59bbf90bb9942734a34aef0529a4.jpg" />
          <AvatarFallback className="bg-secondary/20 text-secondary font-semibold">
            ME
          </AvatarFallback>
        </Avatar>

        {/* Composer */}
        <div className="bg-card focus-within:ring-primary/20 flex-1 rounded-xl border shadow-sm transition focus-within:shadow-md focus-within:ring-2">
          {/* Textarea */}
          <Textarea
            placeholder="Join the discussion..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[120px] resize-none border-0 bg-transparent text-sm focus-visible:ring-0"
          />

          {/* Footer */}
          <div className="flex items-center justify-end border-t px-3 py-2">
            <Button
              size="sm"
              onClick={handleComment}
              disabled={!newComment.trim()}
              className="gap-1.5"
            >
              <Send className="h-4 w-4" />
              Comment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
