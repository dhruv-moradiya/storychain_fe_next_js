'use client';

import { useMemo } from 'react';

import { ICoinBundle } from '@/type/coin-bundle/coin-bundle.type';

import { DataTable } from '@/components/ui/data-table';

import { getColumns } from './columns';

interface PackagesListProps {
  bundles: ICoinBundle[];
  currency: 'INR' | 'USD';
  onToggleActive: (slug: string) => void;
  onDelete: (slug: string) => void;
}

export function PackagesList({ bundles, currency, onToggleActive, onDelete }: PackagesListProps) {
  const columns = useMemo(
    () => getColumns({ currency, onToggleActive, onDelete }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currency]
  );

  return <DataTable columns={columns} data={bundles} pageSize={10} className="bg-transparent" />;
}
