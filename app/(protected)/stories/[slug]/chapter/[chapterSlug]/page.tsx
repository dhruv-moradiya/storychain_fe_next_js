import type { Metadata } from 'next';
import Link from 'next/link';

import axios from 'axios';
import { Lock } from 'lucide-react';

import { buildChapterMeta } from '@/components/common';
import { ContentLayout } from '@/components/dashboard';
import { ChapterReadClient, ChapterSidebar } from '@/components/stories/chapter-read';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { chapterApi } from '@/services/chapters/chapters-api';

interface IChapterPageProps {
  params: Promise<{ slug: string; chapterSlug: string }>;
}

export async function generateMetadata({ params }: IChapterPageProps): Promise<Metadata> {
  const { slug, chapterSlug } = await params;

  try {
    const response = await chapterApi.getCachedChapterBySlug(chapterSlug);
    const chapter = response.data;

    return buildChapterMeta({
      storySlug: slug,
      chapterTitle: chapter.title,
      chapterSlug,
      description: chapter.content,
      author: {
        clerkId: chapter.authorId,
        username: chapter.author.username,
        avatarUrl: chapter.author.avatarUrl,
        displayName: chapter.author.displayName,
      },
    });
  } catch {
    return buildChapterMeta({
      storySlug: slug,
      chapterTitle: chapterSlug,
      chapterSlug,
    });
  }
}

export default async function ChapterPage({ params }: IChapterPageProps) {
  const { slug: storySlug, chapterSlug } = await params;
  let chapterDetail;

  try {
    chapterDetail = await chapterApi.getCachedChapterBySlug(chapterSlug);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const code = error.response?.data?.code || error.response?.data?.error?.code;
      const message = error.response?.data?.message || error.response?.data?.error?.message;

      console.error({
        status,
        code,
        message,
      });

      if (code === 'CHAPTER_NOT_UNLOCKED') {
        return (
          <ContentLayout maxWidth="8xl" centered>
            <div className="py-32">
              <Empty className="border-none">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <Lock className="text-text-secondary-75" />
                  </EmptyMedia>
                  <EmptyTitle>Chapter Locked</EmptyTitle>
                  <EmptyDescription>
                    {message ?? 'You need to purchase this chapter to continue reading.'}
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Link href={`/stories/${storySlug}/chapters`}>
                    <Button className="cursor-pointer px-8 font-semibold">Back to Chapters</Button>
                  </Link>
                </EmptyContent>
              </Empty>
            </div>
          </ContentLayout>
        );
      }
    }

    throw error;
  }

  return (
    <ContentLayout maxWidth="8xl" centered className="grid grid-cols-12 gap-12">
      <ChapterReadClient
        initialData={chapterDetail.data}
        storySlug={storySlug}
        chapterSlug={chapterSlug}
      />

      <div className="col-span-3">
        <ChapterSidebar chapterData={chapterDetail.data} />
      </div>
    </ContentLayout>
  );
}
