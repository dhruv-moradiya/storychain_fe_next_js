import type { Metadata } from 'next';
import { Suspense } from 'react';

import { CharacterDetail } from '@/components/character-detail/character-detail';
import { buildStorySubPageMeta } from '@/components/common';

interface CharacterDetailPageProps {
  params: Promise<{ slug: string; characterId: string }>;
}

export async function generateMetadata({ params }: CharacterDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  return buildStorySubPageMeta(slug, 'Collaborators');
}

export default async function CharacterDetailPage({ params }: CharacterDetailPageProps) {
  const { slug, characterId } = await params;

  return (
    <Suspense
      fallback={
        <div className="text-text-secondary-65 flex h-screen items-center justify-center text-sm">
          Loading character...
        </div>
      }
    >
      <CharacterDetail slug={slug} characterId={characterId} />
    </Suspense>
  );
}
