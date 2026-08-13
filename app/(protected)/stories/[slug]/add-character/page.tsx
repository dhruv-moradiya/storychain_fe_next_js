import type { Metadata } from 'next';

import { AddCharacterForm } from '@/components/add-character/add-character-form';
import { buildStorySubPageMeta } from '@/components/common';
import { FadeInView } from '@/lib/animations';

interface AddCharacterPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: AddCharacterPageProps): Promise<Metadata> {
  const { slug } = await params;
  return buildStorySubPageMeta(slug, 'Collaborators'); // Reuses Collaborators label — no dedicated sub-page type needed
}

export default async function AddCharacterPage({ params }: AddCharacterPageProps) {
  // Await params to comply with Next.js 15 async API guidelines
  await params;

  return (
    <FadeInView delay={0.1}>
      <div className="mx-auto max-w-7xl px-4 pt-4 md:px-6">
        <AddCharacterForm />
      </div>
    </FadeInView>
  );
}
