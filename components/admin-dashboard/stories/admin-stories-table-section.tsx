'use client';

import * as React from 'react';
import { useState } from 'react';

import { IAdminStoryItem } from '@/type/story/admin-story.type';
import { SortingState, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Coins,
  Filter,
  GitPullRequest,
  RefreshCw,
  Search,
} from 'lucide-react';

import { storyStatusBadge } from '@/components/common/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
import { useGetAdminStories } from '@/services/stories/stories.query';

import { AdminStoryDetailDialog } from './admin-story-detail-dialog';
import { columns } from './columns';

export function AdminStoriesTableSection() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sorting, setSorting] = useState<SortingState>([]);

  const [selectedStory, setSelectedStory] = useState<IAdminStoryItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Debounce search input
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const sortBy = sorting[0]?.id;
  const sortOrder = sorting[0]?.desc ? ('desc' as const) : ('asc' as const);

  const queryParams = {
    page,
    limit,
    ...(debouncedSearch.trim() && { search: debouncedSearch.trim() }),
    ...(statusFilter !== 'all' && { status: statusFilter }),
    ...(sortBy && { sortBy, sortOrder }),
  };

  const { data: responseData, isLoading, isFetching, refetch } = useGetAdminStories(queryParams);

  const stories = responseData?.data?.docs || [];
  const totalDocs = responseData?.data?.totalDocs || 0;
  const totalPages = responseData?.data?.totalPages || 1;

  const canPreviousPage = page > 1;
  const canNextPage = page < totalPages;

  const handleSelectStory = (story: IAdminStoryItem) => {
    setSelectedStory(story);
    setIsDetailOpen(true);
  };

  const table = useReactTable({
    data: stories,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    manualPagination: true,
    pageCount: totalPages,
    meta: {
      handleSelectStory,
    },
  });

  return (
    <div className="w-full space-y-5">
      {/* Header & Filter Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-text-primary flex items-center gap-2.5 text-sm font-semibold">
          <div className="bg-brand-pink-500/10 text-brand-pink-500 flex h-8 w-8 items-center justify-center rounded-xl">
            <BookOpen className="size-4" />
          </div>
          <span>Platform Stories</span>
          <span className="border-brand-pink-500/30 bg-brand-pink-500/10 text-brand-pink-500 rounded-full border px-2 py-0.5 font-mono text-[11px] font-bold">
            {totalDocs.toLocaleString()}
          </span>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Input */}
          <div className="relative min-w-48 flex-1 sm:w-64">
            <Search className="text-text-secondary-65 absolute top-1/2 left-3 size-3.5 -translate-y-1/2" />
            <Input
              placeholder="Search title, slug, creator..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-border/50 bg-background/50 focus:bg-background h-9 rounded-xl pl-8 text-xs transition-all"
            />
          </div>

          {/* Status Filter */}
          <Select
            value={statusFilter}
            onValueChange={(val) => {
              setStatusFilter(val);
              setPage(1);
            }}
          >
            <SelectTrigger className="border-border/50 bg-background/50 h-9 w-36 rounded-xl text-xs">
              <Filter className="text-text-secondary-65 mr-1 size-3.5" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border/50 rounded-xl text-xs shadow-md">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>

          {/* Refresh Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="border-border/50 bg-card hover:bg-muted/60 h-9 w-9 cursor-pointer rounded-xl p-0"
            title="Refresh stories"
          >
            <RefreshCw className={`size-3.5 ${isFetching ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-card border-border/50 overflow-hidden rounded-2xl border shadow-xs">
        {/* DESKTOP TABLE VIEW */}
        <div className="hidden md:block">
          <Table wrapperClassName="max-h-[calc(100vh-320px)] overflow-y-auto">
            <TableHeader className="bg-muted/50 sticky top-0 z-10 backdrop-blur-sm">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-border/40 hover:bg-transparent">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-text-secondary-50 h-11 px-4 text-[11px] font-semibold tracking-wider uppercase"
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
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-text-secondary-65 h-36 text-center text-xs"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <RefreshCw className="text-brand-pink-500 size-5 animate-spin" />
                      <span>Loading platform stories...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : stories.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    onClick={() => handleSelectStory(row.original)}
                    className="border-border/30 hover:bg-muted/30 cursor-pointer transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-4 py-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-text-secondary-50 h-32 text-center text-xs"
                  >
                    No stories found matching your criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* MOBILE CARD VIEW */}
        <div className="block space-y-3 p-4 md:hidden">
          {isLoading ? (
            <div className="text-text-secondary-50 flex items-center justify-center gap-2 py-12 text-center text-xs">
              <RefreshCw className="text-brand-pink-500 size-4 animate-spin" /> Loading stories...
            </div>
          ) : stories.length > 0 ? (
            stories.map((story) => (
              <Card
                key={story._id}
                onClick={() => handleSelectStory(story)}
                className="hover:border-brand-pink-500/30 border-border/50 bg-card cursor-pointer space-y-3 p-4 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <h3 className="text-text-primary line-clamp-1 text-sm font-semibold">
                      {story.title || story.slug}
                    </h3>
                    <p className="text-text-secondary-50 font-mono text-xs">/{story.slug}</p>
                  </div>
                  {storyStatusBadge((story.status || 'draft').toUpperCase(), { size: 'sm' })}
                </div>

                <div className="border-border/30 flex items-center gap-2 border-t pt-2 text-xs">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={story.creator?.avatarUrl} />
                    <AvatarFallback className="text-[9px] font-bold">
                      {(story.creator?.username || 'U').charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-text-primary font-medium">{story.creator?.username}</span>
                </div>

                <div className="text-text-secondary-65 border-border/30 flex items-center justify-between border-t pt-2 font-mono text-xs">
                  <span className="flex items-center gap-1">
                    <BookOpen className="text-brand-pink-500 h-3 w-3" />
                    {story.chapterDetails?.totalChapters ?? story.stats?.totalChapters ?? 0} ch
                  </span>
                  <span className="flex items-center gap-1">
                    <GitPullRequest className="h-3 w-3 text-orange-500" />
                    {story.pullRequestDetails?.totalPRs ?? 0} PRs
                  </span>
                  <Badge
                    variant="secondary"
                    className="gap-0.5 bg-amber-500/10 text-[10px] text-amber-600"
                  >
                    <Coins className="h-2.5 w-2.5" />
                    {story.storyPool?.balance ?? 0}
                  </Badge>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-text-secondary-50 py-12 text-center text-xs">
              No stories found matching your criteria.
            </div>
          )}
        </div>

        {/* PAGINATION UI (Matching /stories/merchant-of-forbidden-seas/chapters) */}
        <div className="border-border/40 bg-muted/10 flex flex-col gap-3 border-t px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-text-secondary-50 hidden text-xs sm:block">
            {totalDocs} story{totalDocs !== 1 ? 'ies' : ''} total
          </div>

          <div className="flex w-full flex-wrap items-center justify-between gap-4 sm:w-auto sm:justify-end">
            <div className="flex items-center gap-2">
              <p className="text-text-secondary-65 text-xs font-medium">Rows per page</p>
              <Select
                value={`${limit}`}
                onValueChange={(value) => {
                  setLimit(Number(value));
                  setPage(1);
                }}
              >
                <SelectTrigger className="border-border/40 bg-card text-text-primary h-8 w-[68px] text-xs">
                  <SelectValue placeholder={limit} />
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
              Page {page} of {Math.max(1, totalPages)}
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                className="border-border/40 text-text-secondary-65 hover:text-text-primary hover:bg-muted/30 hidden h-8 w-8 cursor-pointer p-0 lg:flex"
                onClick={() => setPage(1)}
                disabled={!canPreviousPage}
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeft className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="outline"
                className="border-border/40 text-text-secondary-65 hover:text-text-primary hover:bg-muted/30 h-8 w-8 cursor-pointer p-0"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={!canPreviousPage}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeft className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="outline"
                className="border-border/40 text-text-secondary-65 hover:text-text-primary hover:bg-muted/30 h-8 w-8 cursor-pointer p-0"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={!canNextPage}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="outline"
                className="border-border/40 text-text-secondary-65 hover:text-text-primary hover:bg-muted/30 hidden h-8 w-8 cursor-pointer p-0 lg:flex"
                onClick={() => setPage(totalPages)}
                disabled={!canNextPage}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Inspect Detail Dialog */}
      <AdminStoryDetailDialog
        story={selectedStory}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />
    </div>
  );
}
