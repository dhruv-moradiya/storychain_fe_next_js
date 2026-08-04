'use client';

import * as React from 'react';
import { useState } from 'react';

import { IPaginatedUserData } from '@/type/user/user-response.type';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { RefreshCw, Search, Users } from 'lucide-react';

import { countBadge } from '@/components/common/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
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
import {
  useBanUserGloballyMutation,
  useUnbanUserGloballyMutation,
} from '@/services/reports/reports.mutation';
import { useGetUsersList } from '@/services/users/user.query';

import { BanUserAlert } from './ban-user-alert';
import { columns } from './columns';
import { UnbanUserAlert } from './unban-user-alert';

export const UsersTable = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<IPaginatedUserData | null>(null);
  const [isBanAlertOpen, setIsBanAlertOpen] = useState(false);
  const [isUnbanAlertOpen, setIsUnbanAlertOpen] = useState(false);

  const banMutation = useBanUserGloballyMutation();
  const unbanMutation = useUnbanUserGloballyMutation();

  // Debounce search query changes to prevent excessive API requests
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const queryParams = {
    page,
    limit,
    ...(debouncedSearch.trim() && { search: debouncedSearch.trim() }),
  };

  const { data: responseData, isLoading, isFetching, refetch } = useGetUsersList(queryParams);

  const paginatedUsers = responseData?.data?.docs || [];
  const totalDocs = responseData?.data?.totalDocs || 0;
  const totalPages = responseData?.data?.totalPages || 1;

  const meta = {
    handleViewProfile: (id: string) => {},
    handleBanUser: (user: IPaginatedUserData) => {
      setSelectedUser(user);
      setIsBanAlertOpen(true);
    },
    handleUnbanUser: (user: IPaginatedUserData) => {
      setSelectedUser(user);
      setIsUnbanAlertOpen(true);
    },
  };

  const handleBanConfirm = (payload: { reason: string; durationDays?: number }) => {
    if (selectedUser) {
      banMutation.mutate({
        userId: selectedUser.clerkId,
        payload: {
          reason: payload.reason,
          durationDays: payload.durationDays,
        },
      });
    }
  };

  const handleUnbanConfirm = (payload: { reason?: string }) => {
    if (selectedUser) {
      unbanMutation.mutate({
        userId: selectedUser.clerkId,
        payload: {
          reason: payload.reason,
        },
      });
    }
  };

  const table = useReactTable({
    data: paginatedUsers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: totalPages,
    meta,
  });

  return (
    <div className="w-full space-y-5 p-6 pt-0">
      {/* Header Controls & Filter Bar */}
      <div className="border-border/50 flex flex-col gap-5 transition-all">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-text-primary flex items-center gap-2.5 text-sm font-semibold">
            <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-xl">
              <Users className="size-4" />
            </div>
            <span>Platform Users Directory</span>
            {countBadge(totalDocs, 'indigo', { size: 'sm', shape: 'pill' })}
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative min-w-48 flex-1 sm:w-64">
              <Search className="text-text-secondary-65 absolute top-1/2 left-3 size-3.5 -translate-y-1/2" />
              <Input
                placeholder="Search username, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-border/50 bg-background/50 focus:bg-background h-9 rounded-xl pl-8 text-xs transition-all"
              />
            </div>

            <Select
              value={`${limit}`}
              onValueChange={(val) => {
                setLimit(Number(val));
                setPage(1);
              }}
            >
              <SelectTrigger className="border-border/50 bg-background/50 h-9 w-28 rounded-xl text-xs">
                <SelectValue placeholder="Limit" />
              </SelectTrigger>
              <SelectContent
                side="bottom"
                className="bg-card border-border/50 rounded-xl text-xs shadow-md"
              >
                <SelectItem value="10">10 / page</SelectItem>
                <SelectItem value="20">20 / page</SelectItem>
                <SelectItem value="50">50 / page</SelectItem>
                <SelectItem value="100">100 / page</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              className="border-border/50 bg-card hover:bg-muted/60 h-9 w-9 cursor-pointer rounded-xl p-0"
              title="Refresh users list"
            >
              <RefreshCw className={`size-3.5 ${isFetching ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        {/* User Table Content */}
        <div className="border-border/50 overflow-hidden rounded-xl border">
          <div className="relative w-full overflow-auto">
            <Table className="bg-card">
              <TableHeader className="bg-muted/30">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="border-border/40 hover:bg-transparent">
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="text-text-secondary-50 h-10 px-4 text-[11px] font-semibold tracking-wider uppercase"
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
                        <RefreshCw className="text-primary size-5 animate-spin" />
                        <span>Loading user directory...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : paginatedUsers.length > 0 ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      className="border-border/30 hover:bg-muted/30 transition-colors"
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
                      No matching users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Server Pagination Controls (Reports Style) */}
        {totalPages > 1 && (
          <div className="border-border/40 flex flex-col items-center justify-between gap-3 border-t pt-4 text-xs sm:flex-row">
            <span className="text-text-secondary-65">
              Page {page} of {totalPages} ({totalDocs} users total)
            </span>
            <Pagination className="mx-0 w-auto justify-center sm:justify-end">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={(e) => {
                      e.preventDefault();
                      if (page > 1) setPage((p) => Math.max(1, p - 1));
                    }}
                    className={page <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1))
                  .map((p, idx, arr) => {
                    const prevPage = arr[idx - 1];
                    const showEllipsis = prevPage && p - prevPage > 1;
                    return (
                      <React.Fragment key={p}>
                        {showEllipsis && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}
                        <PaginationItem>
                          <PaginationLink
                            onClick={(e) => {
                              e.preventDefault();
                              setPage(p);
                            }}
                            isActive={p === page}
                            className="cursor-pointer"
                          >
                            {p}
                          </PaginationLink>
                        </PaginationItem>
                      </React.Fragment>
                    );
                  })}

                <PaginationItem>
                  <PaginationNext
                    onClick={(e) => {
                      e.preventDefault();
                      if (page < totalPages) setPage((p) => Math.min(totalPages, p + 1));
                    }}
                    className={
                      page >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {/* Dialog Alerts */}
        <BanUserAlert
          userId={selectedUser?.clerkId || null}
          username={selectedUser?.username || null}
          open={isBanAlertOpen}
          onOpenChange={setIsBanAlertOpen}
          onConfirm={handleBanConfirm}
          isSubmitting={banMutation.isPending}
        />

        <UnbanUserAlert
          userId={selectedUser?.clerkId || null}
          username={selectedUser?.username || null}
          open={isUnbanAlertOpen}
          onOpenChange={setIsUnbanAlertOpen}
          onConfirm={handleUnbanConfirm}
          isSubmitting={unbanMutation.isPending}
        />
      </div>
    </div>
  );
};
