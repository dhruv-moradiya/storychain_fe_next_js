import { Suspense } from 'react';

import { CharacterDetail } from '@/components/character-detail/character-detail';

interface CharacterDetailPageProps {
  params: Promise<{ slug: string; characterId: string }>;
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
