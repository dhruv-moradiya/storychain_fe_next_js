'use client';

import { useMemo, useState } from 'react';

import type { ICollaboratorRecord } from '@/type/story/story-response.type';
import type { TStoryCollaboratorRole } from '@/type/story/story.types';

import { useGetCollaborators } from '@/services/stories/stories.query';

import {
  CollaboratorActions,
  CollaboratorTable,
  CollaboratorsEmpty,
  CollaboratorsError,
  CollaboratorsSkeleton,
  InviteDialog,
} from './components';

interface CollaboratorSectionProps {
  slug: string;
}

export default function CollaboratorSection({ slug }: CollaboratorSectionProps) {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const { data: collaboratorsResponse, isLoading, isError, refetch } = useGetCollaborators(slug);

  const collaborators = useMemo<ICollaboratorRecord[]>(
    () => collaboratorsResponse?.data ?? [],
    [collaboratorsResponse]
  );

  const roleCounts = useMemo(() => {
    return collaborators.reduce(
      (acc, c) => {
        acc[c.role] = (acc[c.role] ?? 0) + 1;
        return acc;
      },
      {} as Record<TStoryCollaboratorRole, number>
    );
  }, [collaborators]);

  const filtered = useMemo(() => {
    let result = collaborators;

    if (activeFilter !== 'all') {
      result = result.filter((c) => c.role === activeFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) => c.user.username.toLowerCase().includes(q) || c.user.email?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [search, activeFilter, collaborators]);

  const isReady = !isLoading && !isError;
  const isEmpty = isReady && collaborators.length === 0;
  const hasNoFilterResults = isReady && collaborators.length > 0 && filtered.length === 0;
  const showTable = isReady && filtered.length > 0;

  return (
    <section className="animate-in fade-in-0 mx-auto max-w-6xl space-y-6 px-4 pb-14 duration-300">
      {/* Loading */}
      {isLoading && <CollaboratorsSkeleton />}

      {/* Error */}
      {isError && <CollaboratorsError onRetry={refetch} />}

      {/* Actions bar + Invite dialog */}
      {isReady && (
        <>
          <CollaboratorActions
            search={search}
            setSearch={setSearch}
            openInvite={() => setIsInviteOpen(true)}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            counts={roleCounts}
            collaborators={collaborators}
          />
          <InviteDialog open={isInviteOpen} onOpenChange={setIsInviteOpen} slug={slug} />
        </>
      )}

      {/* Empty - no collaborators at all */}
      {isEmpty && <CollaboratorsEmpty onInvite={() => setIsInviteOpen(true)} />}

      {/* No results after filtering / search */}
      {hasNoFilterResults && (
        <div className="animate-in fade-in-0 zoom-in-95 flex flex-col items-center justify-center rounded-2xl border border-black/10 bg-white py-16 duration-200">
          <p className="text-text-secondary-65 text-sm">
            No collaborators found matching your filters
          </p>
          <button
            onClick={() => {
              setSearch('');
              setActiveFilter('all');
            }}
            className="text-brand-pink-500 hover:text-brand-pink-600 mt-2 text-sm font-medium"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Table */}
      {showTable && <CollaboratorTable data={filtered} search={search} />}
    </section>
  );
}
