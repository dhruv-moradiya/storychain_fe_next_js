'use client';

import type { IPullRequest, TPRLabel } from '@/type';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import {
  Clock,
  Eye,
  FileText,
  GitBranch,
  GitMerge,
  GitPullRequestClosed,
  Plus,
  X,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { fadeIn } from '@/lib/utils';

import ApprovalCard from './approval-card';
import VotingCard from './voting-card';

interface PRDetailSidebarProps {
  pullRequest: IPullRequest;
}

export default function PRDetailSidebar({ pullRequest }: PRDetailSidebarProps) {
  return (
    <motion.div {...fadeIn(0.15)} className="space-y-4">
      <VotingCard votes={pullRequest.votes} />
      <ApprovalCard approvalsStatus={pullRequest.approvalsStatus} />
      <LabelsSection labels={pullRequest.labels} />
      <MetadataSection pullRequest={pullRequest} />
      {(pullRequest.status === 'open' || pullRequest.status === 'approved') && (
        <LifecycleActions canMerge={pullRequest.approvalsStatus.canMerge} />
      )}
    </motion.div>
  );
}

interface LabelsSectionProps {
  labels: TPRLabel[];
}

function LabelsSection({ labels }: LabelsSectionProps) {
  return (
    <div className="bg-card border-border/50 group hover:border-primary/30 overflow-hidden rounded-xl border p-4 transition-all hover:shadow-md">
      <h3 className="text-foreground font-libre-baskerville mb-3 text-sm font-semibold">
        Taxonomy Labels
      </h3>
      {labels.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {labels.map((label) => (
            <Badge
              key={label}
              variant="outline"
              className="text-muted-foreground border-border/40 bg-muted/50 hover:bg-muted rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-colors"
            >
              {label.replace('_', ' ')}
            </Badge>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">Uncategorized lore...</p>
      )}
      <Button
        variant="ghost"
        size="sm"
        className="border-border/40 hover:border-primary/30 hover:bg-primary/5 hover:text-primary mt-4 w-full gap-2 rounded-lg border border-dashed py-4 text-xs font-medium tracking-wide transition-all"
      >
        <Plus className="h-3.5 w-3.5" />
        Assign Label
      </Button>
    </div>
  );
}

interface MetadataSectionProps {
  pullRequest: IPullRequest;
}

interface MetadataItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}

function MetadataSection({ pullRequest }: MetadataSectionProps) {
  const metadataItems: MetadataItem[] = [
    {
      icon: Eye,
      label: 'Reader Count',
      value: pullRequest.stats.views.toLocaleString(),
    },
    {
      icon: GitBranch,
      label: 'Source Story',
      value: pullRequest.storySlug,
    },
    {
      icon: FileText,
      label: 'Parent Chapter',
      value: pullRequest.parentChapterSlug,
    },
    {
      icon: Clock,
      label: 'Submission Window',
      value: format(new Date(pullRequest.createdAt), 'MMM d, p'),
    },
  ];

  return (
    <div className="bg-card border-border/50 group hover:border-primary/30 overflow-hidden rounded-xl border p-4 transition-all hover:shadow-md">
      <h3 className="text-foreground font-libre-baskerville mb-3 text-sm font-semibold">
        Analytics &amp; Context
      </h3>
      <div className="space-y-3">
        {metadataItems.map((item, id) => (
          <div key={id} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2.5">
              <div className="bg-muted/60 flex h-6 w-6 items-center justify-center rounded-md">
                <item.icon className="text-muted-foreground h-3.5 w-3.5" />
              </div>
              <span className="text-muted-foreground font-medium">{item.label}</span>
            </div>
            <span className="text-foreground font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface LifecycleActionsProps {
  canMerge: boolean;
}

function LifecycleActions({ canMerge }: LifecycleActionsProps) {
  return (
    <div className="bg-card border-border/50 hover:border-primary/30 overflow-hidden rounded-xl border p-4 transition-all hover:shadow-md">
      <h3 className="text-foreground font-libre-baskerville mb-3 text-sm font-semibold">Actions</h3>
      <div className="space-y-3">
        {canMerge && (
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground x w-full gap-2.5 font-semibold shadow-sm transition-all hover:shadow-md">
            <GitMerge className="h-4 w-4" />
            Commit to Branch
          </Button>
        )}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="border-destructive/20 text-destructive hover:bg-destructive/10 hover:text-destructive h-10 gap-2 text-xs font-medium"
          >
            <X className="h-3.5 w-3.5" />
            Revoke
          </Button>
          <Button
            variant="outline"
            className="border-border/40 text-muted-foreground hover:bg-muted hover:text-foreground x h-10 gap-2 text-xs font-medium"
          >
            <GitPullRequestClosed className="h-3.5 w-3.5" />
            Archive
          </Button>
        </div>
      </div>
    </div>
  );
}
