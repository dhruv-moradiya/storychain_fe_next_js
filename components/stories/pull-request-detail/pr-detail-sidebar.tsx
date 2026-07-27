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
    <motion.div {...fadeIn(0.15)} className="space-y-6">
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
    <div className="border-border/50 bg-card flex flex-col gap-4 rounded-sm border p-5 shadow-xs">
      <h3 className="text-text-primary text-base font-semibold">Taxonomy Labels</h3>
      {labels.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {labels.map((label) => (
            <Badge
              key={label}
              variant="outline"
              className="border-border/40 text-text-secondary-65 bg-muted/40 hover:bg-muted rounded-sm px-2.5 py-0.5 text-xs font-medium capitalize transition-colors"
            >
              {label.replace('_', ' ')}
            </Badge>
          ))}
        </div>
      ) : (
        <p className="text-text-secondary-65 text-xs italic">Uncategorized lore...</p>
      )}
      <Button
        variant="outline-editorial"
        size="sm"
        className="h-10 w-full cursor-pointer rounded-sm text-sm font-semibold"
      >
        <Plus className="size-4" />
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
      value: (pullRequest.stats?.views ?? 0).toLocaleString(),
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
    <div className="border-border/50 bg-card flex flex-col gap-4 rounded-sm border p-5 shadow-xs">
      <h3 className="text-text-primary text-base font-semibold">Analytics &amp; Context</h3>
      <div className="space-y-2.5">
        {metadataItems.map((item, id) => (
          <div
            key={id}
            className="border-border/50 flex items-center justify-between gap-1 rounded-sm border p-3 text-sm"
          >
            <div className="flex items-center gap-2">
              <item.icon className="text-text-secondary-65 size-4" />
              <span className="text-text-secondary-65 text-xs font-medium">{item.label}</span>
            </div>
            <span className="text-text-primary font-semibold">{item.value}</span>
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
    <div className="border-border/50 bg-card flex flex-col gap-4 rounded-sm border p-5 shadow-xs">
      <h3 className="text-text-primary text-base font-semibold">Lifecycle Actions</h3>
      <div className="space-y-3">
        {canMerge && (
          <Button className="h-10 w-full cursor-pointer rounded-sm text-sm font-semibold shadow-xs">
            <GitMerge className="size-4" />
            Commit to Branch
          </Button>
        )}
        <div className="grid grid-cols-2 gap-2.5">
          <Button
            variant="outline-editorial"
            className="text-destructive hover:text-destructive hover:bg-destructive/10 h-10 cursor-pointer rounded-sm text-xs font-semibold"
          >
            <X className="size-4" />
            Revoke
          </Button>
          <Button
            variant="outline-editorial"
            className="h-10 cursor-pointer rounded-sm text-xs font-semibold"
          >
            <GitPullRequestClosed className="size-4" />
            Archive
          </Button>
        </div>
      </div>
    </div>
  );
}
