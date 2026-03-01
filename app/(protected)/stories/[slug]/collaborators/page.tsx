import CollaboratorSection from '@/components/stories/sections/collaborators-section';
import { buildStorySubPageMeta } from '@/components/common';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return buildStorySubPageMeta(slug, 'Collaborators');
}

export default async function CollaboratorsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className="container mx-auto py-8">
      <CollaboratorSection slug={slug} />
    </div>
  );
}
