import { AddCharacterForm } from '@/components/add-character/add-character-form';
import { FadeInView } from '@/lib/animations';

interface AddCharacterPageProps {
  params: Promise<{ slug: string }>;
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
