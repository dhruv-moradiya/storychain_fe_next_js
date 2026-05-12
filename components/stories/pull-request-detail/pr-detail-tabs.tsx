'use client';

import { useState } from 'react';

import type { IPRComment, IPRReview, IPullRequest } from '@/type';
import { CheckCircle, FileEdit, MessageSquare } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import ChangesTab from './changes-tab';
import ConversationTab from './conversation-tab';
import type { IPRDetailTimelineEntry } from './pr-detail-static-data';
import ReviewsTab from './reviews-tab';

interface PRDetailTabsProps {
  pullRequest: IPullRequest;
  comments: IPRComment[];
  reviews: IPRReview[];
  timeline: IPRDetailTimelineEntry[];
}

export default function PRDetailTabs({
  pullRequest,
  comments,
  reviews,
  timeline,
}: PRDetailTabsProps) {
  const [activeTab, setActiveTab] = useState('conversation');

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-4">
      <TabsList className="bg-card border-border/50 h-auto flex-nowrap border p-1">
        {/* Conversation */}
        <TabsTrigger
          value="conversation"
          className="flex items-center gap-2 data-[state=active]:bg-blue-500/10 data-[state=active]:text-blue-600"
        >
          <MessageSquare className="h-4 w-4" />
          <span>Conversation</span>
          <Badge
            variant="secondary"
            className="ml-auto flex h-5 min-w-5 items-center justify-center border-0 bg-blue-500/10 px-1.5 py-0 text-[10px] text-blue-600"
          >
            {comments.length}
          </Badge>
        </TabsTrigger>

        {/* Changes */}
        <TabsTrigger
          value="changes"
          className="flex items-center gap-2 data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-600"
        >
          <FileEdit className="h-4 w-4" />
          <span>Changes</span>
        </TabsTrigger>

        {/* Reviews */}
        <TabsTrigger
          value="reviews"
          className="flex items-center gap-2 data-[state=active]:bg-green-500/10 data-[state=active]:text-green-600"
        >
          <CheckCircle className="h-4 w-4" />
          <span>Reviews</span>
          <Badge
            variant="secondary"
            className="ml-auto flex h-5 min-w-5 items-center justify-center border-0 bg-green-500/10 px-1.5 py-0 text-[10px] text-green-600"
          >
            {reviews.length}
          </Badge>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="conversation">
        <ConversationTab pullRequest={pullRequest} comments={comments} timeline={timeline} />
      </TabsContent>

      <TabsContent value="changes">
        <ChangesTab pullRequest={pullRequest} />
      </TabsContent>

      <TabsContent value="reviews">
        <ReviewsTab reviews={reviews} />
      </TabsContent>
    </Tabs>
  );
}
