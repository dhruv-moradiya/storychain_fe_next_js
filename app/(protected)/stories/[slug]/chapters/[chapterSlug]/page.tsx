import {
  ChapterCommentsSection,
  ChapterHeader,
  ChapterPRStatus,
  ChapterStatsBar,
  ChapterVotePanel,
  VersionHistoryDialog,
} from '@/components/chapter-read';
import { ChapterReader } from '@/components/common/chapter-reader';
import { Separator } from '@/components/ui/separator';
import {
  MOCK_CHAPTER_DETAIL,
  MOCK_CHAPTER_VERSIONS,
  MOCK_COMMENTS,
} from '@/lib/data/mock-chapter-detail';
import { cn } from '@/lib/utils';
import { BookOpen } from 'lucide-react';
import type { Metadata } from 'next';

type PageParams = {
  params: Promise<{ storySlug: string; chapterSlug: string }>;
};

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { storySlug, chapterSlug: _chapterSlug } = await params;

  // TODO: replace with real API fetch
  const chapter = MOCK_CHAPTER_DETAIL;

  return {
    title: `${chapter.title} · ${chapter.storyTitle ?? storySlug} | StoryChain`,
    description: `Read "${chapter.title}" — a chapter in ${chapter.storyTitle ?? storySlug}. Join the collaborative storytelling journey on StoryChain.`,
    openGraph: {
      title: chapter.title,
      description: `A chapter in ${chapter.storyTitle ?? storySlug}`,
      url: `/stories/${storySlug}/chapters/${chapter.slug}`,
      type: 'article',
    },
  };
}

export default async function ChapterReadPage({ params }: PageParams) {
  const { storySlug: _storySlug, chapterSlug: _chapterSlug } = await params;

  // TODO: replace with real API calls using storySlug + chapterSlug
  const chapter = MOCK_CHAPTER_DETAIL;
  const versions = MOCK_CHAPTER_VERSIONS;
  const comments = MOCK_COMMENTS;

  // Build ChapterData shape expected by the ChapterReader common component
  const chapterReaderData = {
    id: chapter._id,
    title: chapter.title,
    content: chapter.content,
    author: {
      id: chapter.authorId,
      name: chapter.author?.displayName ?? 'Unknown Author',
      avatar: chapter.author?.avatarUrl,
      username: chapter.author?.username,
    },
    storyTitle: chapter.storyTitle,
    chapterNumber: chapter.chapterNumber,
    createdAt: chapter.createdAt,
    updatedAt: chapter.updatedAt,
    status:
      chapter.status === 'published'
        ? ('published' as const)
        : chapter.status === 'draft'
          ? ('draft' as const)
          : ('pending' as const),
    stats: {
      views: chapter.stats.reads,
      likes: chapter.votes.upvotes,
      comments: chapter.stats.comments,
    },
    parentChapter: chapter.parentChapterSlug
      ? { id: chapter.parentChapterSlug, title: chapter.parentChapterTitle ?? '' }
      : undefined,
  };

  return (
    <main className="bg-bg-cream min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_340px]">
          {/* ══ LEFT — Main content ══ */}
          <div className="min-w-0 space-y-12">
            <ChapterHeader chapter={chapter} />

            <ChapterStatsBar chapter={chapter} />

            {/* Chapter prose */}
            <div className="bg-card/90 border-brand-pink-500/10 rounded-[40px] border p-8 shadow-sm backdrop-blur-md sm:p-12 lg:p-16">
              <ChapterReader
                chapter={chapterReaderData}
                showHeader={false}
                showStats={false}
                variant="full"
              />
            </div>

            {/* Voting + Version history */}
            <div className="flex flex-wrap items-center justify-between gap-6 px-4">
              <ChapterVotePanel chapter={chapter} />
              <VersionHistoryDialog versions={versions} currentVersion={chapter.version} />
            </div>

            <Separator className="bg-border/40" />

            {/* Comments */}
            <div className="px-2 sm:px-4">
              <ChapterCommentsSection
                comments={comments}
                chapterSlug={chapter.slug}
                totalCount={chapter.stats.comments}
              />
            </div>
          </div>

          {/* ══ RIGHT — Sticky sidebar ══ */}
          <aside className="space-y-8 lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pr-1">
            <ChapterPRStatus chapter={chapter} />

            {/* Chapter metadata card — refined with brand aesthetic */}
            <div className="bg-card/80 border-brand-pink-500/10 hover:border-brand-pink-500/20 space-y-6 rounded-3xl border p-6 shadow-sm backdrop-blur-md transition-all">
              <div className="flex items-center gap-3">
                <div className="bg-brand-pink-500/10 flex h-9 w-9 items-center justify-center rounded-xl">
                  <BookOpen size={16} className="text-brand-pink-500" />
                </div>
                <h2 className="font-libre-baskerville text-text-primary text-base font-bold">
                  Chapter Info
                </h2>
              </div>

              <dl className="space-y-5 text-[13px]">
                <div className="flex flex-col gap-1.5">
                  <dt className="font-ibm-plex-mono text-muted-foreground/60 text-[10px] font-bold tracking-widest uppercase">
                    Story Collection
                  </dt>
                  <dd className="text-text-primary truncate font-bold">
                    {chapter.storyTitle ?? chapter.storySlug}
                  </dd>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <dt className="font-ibm-plex-mono text-muted-foreground/60 text-[10px] font-bold tracking-widest uppercase">
                      Branch
                    </dt>
                    <dd className="font-ibm-plex-mono text-brand-pink-600 font-bold">
                      #{chapter.branchIndex}
                    </dd>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <dt className="font-ibm-plex-mono text-muted-foreground/60 text-[10px] font-bold tracking-widest uppercase">
                      Depth Level
                    </dt>
                    <dd className="font-ibm-plex-mono text-text-primary font-bold">
                      {chapter.depth}
                    </dd>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <dt className="font-ibm-plex-mono text-muted-foreground/60 text-[10px] font-bold tracking-widest uppercase">
                      Revision
                    </dt>
                    <dd className="font-ibm-plex-mono text-brand-blue font-bold">
                      v{chapter.version}
                    </dd>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <dt className="font-ibm-plex-mono text-muted-foreground/60 text-[10px] font-bold tracking-widest uppercase">
                      Est. Time
                    </dt>
                    <dd className="text-text-primary font-bold">{chapter.stats.avgReadTime} min</dd>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <div className="flex items-center justify-between">
                    <dt className="font-ibm-plex-mono text-muted-foreground/60 text-[10px] font-bold tracking-widest uppercase">
                      Engagement
                    </dt>
                    <span
                      className={cn(
                        'font-ibm-plex-mono text-[11px] font-bold',
                        chapter.stats.engagementScore >= 70
                          ? 'text-emerald-600'
                          : chapter.stats.engagementScore >= 40
                            ? 'text-amber-600'
                            : 'text-red-500'
                      )}
                    >
                      {chapter.stats.engagementScore}%
                    </span>
                  </div>
                  <div className="bg-muted/40 h-2 flex-1 overflow-hidden rounded-full p-0.5">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all duration-1000',
                        chapter.stats.engagementScore >= 70
                          ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]'
                          : chapter.stats.engagementScore >= 40
                            ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]'
                            : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]'
                      )}
                      style={{ width: `${chapter.stats.engagementScore}%` }}
                    />
                  </div>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
