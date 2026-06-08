import { IPullRequestListItem } from '@/type/pull-reuqest/pull-request-response.type';
import { Row } from '@tanstack/react-table';
import { motion } from 'framer-motion';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface IPRSubComponentProps {
  row: Row<IPullRequestListItem>;
}

export function PRSubComponent({ row }: IPRSubComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.05 }}
      className="bg-primary/3 mx-auto overflow-hidden p-5"
    >
      <div className="flex w-full flex-col gap-6 md:flex-row md:items-start">
        <div className="w-full flex-1 space-y-4">
          <div>
            <h4 className="text-foreground font-libre-baskerville mb-1 text-sm font-semibold">
              Description
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed wrap-break-word whitespace-pre-wrap">
              {row.original.description || 'No description provided for this pull request.'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="bg-card border-border/40 rounded-lg border p-4 shadow-sm">
              <h4 className="text-foreground font-libre-baskerville mb-3 text-sm font-semibold">
                Story & Chapter
              </h4>
              <dl className="text-muted-foreground space-y-2 text-sm">
                <div className="flex flex-col">
                  <dt className="text-muted-foreground mb-1 text-xs tracking-wider uppercase">
                    Story
                  </dt>
                  <dd
                    className="text-foreground font-playfair truncate font-medium"
                    title={row.original.story?.title}
                  >
                    {row.original.story?.title}
                  </dd>
                </div>
                <div className="mt-2 flex flex-col">
                  <dt className="text-muted-foreground mb-1 text-xs tracking-wider uppercase">
                    Target Chapter
                  </dt>
                  <dd
                    className="text-foreground font-playfair truncate font-medium"
                    title={row.original.chapter?.title}
                  >
                    {row.original.chapter?.title}
                  </dd>
                </div>
                {row.original.chapter?.parentChapter && (
                  <div className="border-border/40 mt-2 flex flex-col border-t pt-2">
                    <dt className="text-muted-foreground mb-1 text-xs tracking-wider uppercase">
                      Parent Chapter
                    </dt>
                    <dd
                      className="text-foreground font-playfair truncate font-medium"
                      title={row.original.chapter?.parentChapter?.title}
                    >
                      {row.original.chapter?.parentChapter?.title}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="bg-card border-border/40 rounded-lg border p-4 shadow-sm">
              <h4 className="text-foreground font-libre-baskerville mb-3 text-sm font-semibold">
                Approval Status
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Required Approvals (Auto)</span>
                  <span className="text-foreground font-medium">
                    {row.original.approvalsStatus.required}
                    {row.original.autoApprove?.enabled &&
                      ` (${row.original.autoApprove.threshold})`}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Received</span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    {row.original.approvalsStatus.received}
                  </span>
                </div>

                {row.original.approvers && row.original.approvers.length > 0 && (
                  <div className="border-border/40 border-t pt-2">
                    <span className="text-muted-foreground mb-2 block text-xs">Approvers</span>
                    <div className="flex -space-x-2">
                      {row.original.approvers.map((approver) => (
                        <Avatar key={approver.clerkId}>
                          <AvatarImage
                            src={approver.avatarUrl}
                            alt={approver.username}
                            className="grayscale"
                          />
                          <AvatarFallback>
                            {approver.username.charAt(0).toUpperCase() || '?'}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border-border/40 w-full rounded-lg border p-4 shadow-sm md:w-64">
          <h4 className="text-foreground font-libre-baskerville mb-3 text-sm font-semibold">
            Meta Information
          </h4>
          <dl className="text-muted-foreground space-y-4 text-sm">
            <div className="flex flex-col">
              <dt className="mb-1 text-xs">Author</dt>
              <dd className="text-foreground font-playfair flex items-center gap-2 font-medium">
                <Avatar>
                  <AvatarImage
                    src={row.original.author.avatarUrl}
                    alt={row.original.author.username}
                    className="grayscale"
                  />
                  <AvatarFallback>
                    {row.original.author.username.charAt(0).toUpperCase() || '?'}
                  </AvatarFallback>
                </Avatar>
                <span className="truncate">{row.original.author?.username || 'Unknown'}</span>
              </dd>
            </div>
            <div className="border-border/40 flex items-center justify-between border-t pt-3 text-xs">
              <dt>Draft Status</dt>
              <dd>
                {row.original.isDraft ? (
                  <span className="rounded-full bg-amber-500/10 px-2 py-0.5 font-medium text-amber-600 dark:text-amber-400">
                    Draft
                  </span>
                ) : (
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-600 dark:text-emerald-400">
                    Ready
                  </span>
                )}
              </dd>
            </div>
            <div className="border-border/40 flex items-center justify-between border-t pt-3 text-xs">
              <dt>Total Views</dt>
              <dd className="text-foreground font-medium">{row.original.stats.views}</dd>
            </div>
          </dl>
        </div>
      </div>
    </motion.div>
  );
}
