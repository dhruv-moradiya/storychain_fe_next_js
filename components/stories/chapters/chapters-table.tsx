'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import {
  ColumnDef,
  ExpandedState,
  Row,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Coins,
  Eye,
  Flag,
  GitPullRequest,
  Lock,
  MessageSquare,
  ThumbsDown,
  ThumbsUp,
  Unlock,
  Users,
} from 'lucide-react';

import { chapterStatusBadge } from '@/components/common/badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

import { buildChapterColumns, formatDate, formatNumber } from './columns';
import type { IChapterTableRow, IChaptersTableContext } from './types';

const ChapterUnlockDialog = dynamic(
  () => import('./chapter-unlock-dialog').then((mod) => mod.ChapterUnlockDialog),
  { ssr: false }
);

interface ChaptersTableProps {
  data: IChapterTableRow[];
  context: IChaptersTableContext;
  pageSize?: number;
  className?: string;
}

function ChapterCard({
  row,
  context,
  onCardClick,
}: {
  row: Row<IChapterTableRow>;
  context: IChaptersTableContext;
  onCardClick: (chapter: IChapterTableRow) => void;
}) {
  const chapter = row.original;
  const isFree = chapter.coinPrice === 0;
  const isUnlocked = isFree || chapter.isUnlock || context.isOwnerOrPrivileged;

  return (
    <Card
      onClick={() => onCardClick(chapter)}
      className={cn(
        'group border-border/50 bg-card text-card-foreground hover:border-brand-pink-500/30 cursor-pointer p-4 transition-all duration-200 hover:shadow-md',
        chapter.depth > 0 &&
          'border-l-brand-pink-500/40 bg-muted/20 dark:bg-muted/10 ml-2 border-l-4 sm:ml-4'
      )}
    >
      <div className="flex flex-col gap-3">
        {/* Top: Title, Chapter #, Badges & Access */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              {chapter.chapterNumber && (
                <span className="text-text-secondary-50 shrink-0 font-mono text-xs font-semibold">
                  #{chapter.chapterNumber}
                </span>
              )}
              <h3 className="text-text-primary group-hover:text-brand-pink-500 line-clamp-1 text-sm font-semibold transition-colors">
                {chapter.title}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {chapterStatusBadge(chapter.status.toUpperCase(), {
                size: 'sm',
                className: 'uppercase',
              })}
              {chapter.depth > 0 && (
                <Badge
                  variant="outline"
                  className="border-border/40 text-text-secondary-65 h-4 px-1.5 font-mono text-[10px]"
                >
                  L{chapter.depth} Branch
                </Badge>
              )}
              {chapter.isEnding && (
                <Badge
                  variant="outline"
                  className="border-brand-pink-500/30 text-brand-pink-500 bg-brand-pink-500/5 h-4 gap-0.5 px-1 text-[9px]"
                >
                  <Flag className="h-2 w-2" />
                  Ending
                </Badge>
              )}
              {chapter.pullRequest?.isPR && (
                <Badge
                  variant="outline"
                  className="h-4 gap-0.5 border-orange-500/30 bg-orange-500/5 px-1 font-mono text-[9px] text-orange-500"
                >
                  <GitPullRequest className="h-2 w-2" />
                  PR
                </Badge>
              )}
            </div>
          </div>

          {/* Access / Coin badge */}
          <div className="shrink-0">
            {isUnlocked ? (
              <Badge
                variant="secondary"
                className="gap-1 border-emerald-500/20 bg-emerald-500/10 text-[11px] font-medium text-emerald-600 dark:text-emerald-400"
              >
                <Unlock className="h-3 w-3 text-emerald-500" />
                {isFree ? 'Free' : 'Unlocked'}
              </Badge>
            ) : (
              <Badge
                variant="secondary"
                className="gap-1 border-amber-500/20 bg-amber-500/10 text-[11px] font-semibold text-amber-600 dark:text-amber-400"
              >
                <Lock className="h-3 w-3 text-amber-500" />
                <Coins className="h-3 w-3 text-amber-400" />
                {chapter.coinPrice}
              </Badge>
            )}
          </div>
        </div>

        {/* Footer info: Author, Votes & Stats */}
        <div className="border-border/40 text-text-secondary-65 flex items-center justify-between border-t pt-2.5 text-xs">
          <span className="text-text-primary/80 max-w-[130px] truncate font-medium">
            By {chapter.authorName}
          </span>

          <div className="text-text-secondary-65 flex shrink-0 items-center gap-3">
            <span className="flex items-center gap-1">
              <ThumbsUp className="h-3 w-3 text-emerald-500" />
              {formatNumber(chapter.votes.upvotes)}
            </span>
            <span className="flex items-center gap-1">
              <ThumbsDown className="h-3 w-3 text-red-400" />
              {formatNumber(chapter.votes.downvotes)}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {formatNumber(chapter.stats.reads)}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              {formatNumber(chapter.stats.comments)}
            </span>
          </div>
        </div>

        {/* Owner / Privileged Info */}
        {context.isOwnerOrPrivileged && (
          <div className="border-border/30 text-text-secondary-50 flex items-center justify-between border-t pt-2 text-[10px]">
            <span>
              v{chapter.version} • {formatDate(chapter.updatedAt)}
            </span>
            <span
              className={cn(
                'font-semibold',
                chapter.stats.engagementScore >= 80 ? 'text-emerald-500' : 'text-amber-500'
              )}
            >
              Engagement: {chapter.stats.engagementScore}/100
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}

export function ChaptersTable({ data, context, pageSize = 10, className }: ChaptersTableProps) {
  const router = useRouter();
  const [expanded, setExpanded] = useState<ExpandedState>(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);
  const [selectedLockedChapter, setSelectedLockedChapter] = useState<{
    slug: string;
    storySlug: string;
  } | null>(null);

  const columns = useMemo<ColumnDef<IChapterTableRow>[]>(
    () => buildChapterColumns(context),
    [context]
  );

  function handleRowClick(row: IChapterTableRow) {
    const isFree = row.coinPrice === 0;
    const isUnlocked = isFree || row.isUnlock || context.isOwnerOrPrivileged;

    if (!isUnlocked) {
      setSelectedLockedChapter({ slug: row.slug, storySlug: row.storySlug });
      return;
    }
    router.push(`/stories/${row.storySlug}/chapter/${row.slug}`);
  }

  const table = useReactTable({
    data,
    columns,
    state: { expanded },
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: (row) => row.subRows,
    manualPagination: false,
  });

  // Flatten rows after expansion for pagination
  const allRows = table.getRowModel().rows;
  const totalRows = allRows.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const paginatedRows = allRows.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  const canPreviousPage = currentPage > 0;
  const canNextPage = currentPage < totalPages - 1;

  function getRowDepthStyle(row: Row<IChapterTableRow>): string {
    const depth = row.original.depth;
    if (depth === 0) return '';
    if (depth === 1) return 'bg-muted/20 border-l-2 border-l-brand-pink-500/20';
    return 'bg-muted/30 border-l-2 border-l-brand-pink-500/30';
  }

  return (
    <div
      className={cn(
        'bg-card border-border/50 overflow-hidden rounded-2xl border shadow-sm',
        className
      )}
    >
      {/* Role indicator banner */}
      {context.isOwnerOrPrivileged && (
        <div className="border-border/30 bg-brand-pink-500/5 flex items-center gap-2 border-b px-5 py-2.5">
          <Users className="text-brand-pink-500 h-3.5 w-3.5" />
          <span className="text-brand-pink-500 text-xs font-medium">
            Owner / Privileged view — all columns visible
          </span>
        </div>
      )}

      {/* DESKTOP TABLE VIEW (visible on desktop md+, hidden on small screens) */}
      <div className="hidden md:block">
        <Table wrapperClassName="max-h-[calc(100vh-300px)] overflow-y-auto">
          <TableHeader className="bg-muted/50 sticky top-0 z-10 backdrop-blur-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-border/40 hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-text-secondary-50 h-11 px-4 text-[11px] font-semibold tracking-widest uppercase"
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            <AnimatePresence initial={false}>
              {paginatedRows.length > 0 ? (
                paginatedRows.map((row, index) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2, delay: index * 0.02, ease: 'easeOut' }}
                    className={cn(
                      'border-border/30 group cursor-pointer border-b transition-all duration-200 hover:shadow-xl',
                      getRowDepthStyle(row)
                    )}
                    onClick={() => handleRowClick(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-4 py-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </motion.tr>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-text-secondary-50 h-32 text-center text-sm"
                  >
                    No chapters found.
                  </TableCell>
                </TableRow>
              )}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>

      {/* MOBILE CARD VIEW (visible on small screens, hidden on desktop md+) */}
      <div className="block space-y-3 p-4 md:hidden">
        <AnimatePresence initial={false}>
          {paginatedRows.length > 0 ? (
            paginatedRows.map((row, index) => (
              <motion.div
                key={row.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, delay: index * 0.03, ease: 'easeOut' }}
              >
                <ChapterCard row={row} context={context} onCardClick={handleRowClick} />
              </motion.div>
            ))
          ) : (
            <div className="text-text-secondary-50 py-12 text-center text-sm">
              No chapters found.
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      <div className="border-border/40 bg-muted/10 flex flex-col gap-3 border-t px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-text-secondary-50 hidden text-xs sm:block">
          {totalRows} row{totalRows !== 1 ? 's' : ''} total
        </div>
        <div className="flex w-full flex-wrap items-center justify-between gap-4 sm:w-auto sm:justify-end">
          <div className="flex items-center gap-2">
            <p className="text-text-secondary-65 text-xs font-medium">Rows per page</p>
            <Select
              value={`${rowsPerPage}`}
              onValueChange={(value) => {
                setRowsPerPage(Number(value));
                setCurrentPage(0);
              }}
            >
              <SelectTrigger className="border-border/40 bg-card text-text-primary h-8 w-[68px] text-xs">
                <SelectValue placeholder={rowsPerPage} />
              </SelectTrigger>
              <SelectContent side="top">
                {[5, 10, 20, 50].map((size) => (
                  <SelectItem key={size} value={`${size}`}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="text-text-secondary-65 flex items-center justify-center text-xs font-medium">
            Page {currentPage + 1} of {Math.max(1, totalPages)}
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              className="border-border/40 text-text-secondary-65 hover:text-text-primary hover:bg-muted/30 hidden h-8 w-8 cursor-pointer p-0 lg:flex"
              onClick={() => setCurrentPage(0)}
              disabled={!canPreviousPage}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="outline"
              className="border-border/40 text-text-secondary-65 hover:text-text-primary hover:bg-muted/30 h-8 w-8 cursor-pointer p-0"
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={!canPreviousPage}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="outline"
              className="border-border/40 text-text-secondary-65 hover:text-text-primary hover:bg-muted/30 h-8 w-8 cursor-pointer p-0"
              onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={!canNextPage}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="outline"
              className="border-border/40 text-text-secondary-65 hover:text-text-primary hover:bg-muted/30 hidden h-8 w-8 cursor-pointer p-0 lg:flex"
              onClick={() => setCurrentPage(totalPages - 1)}
              disabled={!canNextPage}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {selectedLockedChapter && (
        <ChapterUnlockDialog
          slug={selectedLockedChapter.slug}
          storySlug={selectedLockedChapter.storySlug}
          onClose={() => setSelectedLockedChapter(null)}
        />
      )}
    </div>
  );
}
