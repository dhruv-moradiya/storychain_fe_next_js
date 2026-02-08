import SettingSection from '@/components/stories/sections/setting-section';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Settings - ${slug} | StoryChain`,
    description: `Configure settings for the story ${slug}`,
  };
}

export default async function SettingsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className="container mx-auto py-8">
      <SettingSection slug={slug} />
    </div>
  );
}
