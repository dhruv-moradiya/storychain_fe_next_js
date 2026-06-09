'use client';

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
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
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

import { buildChapterColumns } from './columns';
import type { IChapterTableRow, IChaptersTableContext } from './types';

interface ChaptersTableProps {
  data: IChapterTableRow[];
  context: IChaptersTableContext;
  pageSize?: number;
  className?: string;
}

export function ChaptersTable({ data, context, pageSize = 10, className }: ChaptersTableProps) {
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);

  const columns = useMemo<ColumnDef<IChapterTableRow>[]>(
    () => buildChapterColumns(context),
    [context]
  );

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

      {/* Pagination */}
      <div className="border-border/40 bg-muted/10 flex items-center justify-between border-t px-5 py-3">
        <div className="text-text-secondary-50 hidden text-xs sm:block">
          {totalRows} row{totalRows !== 1 ? 's' : ''} total
        </div>
        <div className="ml-auto flex items-center gap-5">
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
    </div>
  );
}
