'use client';

import { useState } from 'react';

import { IPRComment, IPRReview, IPullRequest, PRLabel } from '@/type';
import { format, formatDistanceToNow } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Copy,
  Edit2,
  Eye,
  FileEdit,
  FileText,
  Flag,
  GitBranch,
  GitMerge,
  GitPullRequest,
  GitPullRequestClosed,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Send,
  Star,
  ThumbsDown,
  ThumbsUp,
  X,
} from 'lucide-react';

import { prStatusBadge, prTypeBadge, statusBadge } from '@/components/common/badge';
import CommentCard from '@/components/stories/pull-request-detail/comment-card';
import { PR_STATUS_CONFIG } from '@/components/stories/pull-request-detail/pr-status-configs';
import { TIMELINE_ACTION_CONFIG } from '@/components/stories/pull-request-detail/pr-timeline-configs';
import ReviewCard from '@/components/stories/pull-request-detail/review-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn, fadeIn } from '@/lib/utils';

// --- STATIC DATA (Remains for prototype) ---
const staticPullRequest: IPullRequest = {
  _id: 'pr-1',
  title: "Add Gojo's Past Chapter",
  description:
    'This PR adds a new chapter to the story, focusing on the early days of Gojo Satoru and Suguru Geto.',
  storySlug: 'jujutsu-kaisen',
  chapterSlug: 'gojo-past-part-1',
  parentChapterSlug: 'hidden-inventory',
  authorId: 'author-123',
  prType: 'new_branch',
  content: {
    proposed:
      "The summer was hot. The cicadas were loud. Gojo and Geto were playing basketball at the school court. 'Suguru, do you think we're really the strongest?' Gojo asked while dunking. Geto smiled, 'Of course, Satoru. There's no doubt about it.' They didn't know that their bond would be tested soon by a man named Toji. The cursed energy in the air was thick, and the weight of their responsibility started to show.",
    wordCount: 172,
    readingMinutes: 1,
  },
  status: 'approved',
  votes: {
    upvotes: 12,
    downvotes: 1,
    score: 11,
  },
  commentCount: 3,
  autoApprove: {
    enabled: true,
    threshold: 15,
    timeWindow: 2,
  },
  labels: ['good_first_pr' as PRLabel, 'needs_review' as PRLabel],
  isDraft: false,
  draftReason: '',
  draftedAt: new Date().toISOString(),
  approvalsStatus: {
    required: 2,
    received: 2,
    pending: 0,
    approvers: ['Gojo Satoru', 'Nanami Kento'],
    blockers: [],
    canMerge: true,
  },
  stats: {
    views: 1420,
    discussions: 3,
    reviewsReceived: 2,
  },
  createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  updatedAt: new Date().toISOString(),
};

const staticComments: (IPRComment & { replies?: IPRComment[] })[] = [
  {
    _id: 'c-1',
    pullRequestId: 'pr-1',
    userId: 'user-2',
    content:
      'The dialogue between Gojo and Geto feels very authentic. It captures their early dynamic perfectly. Maybe add more description about the environment?',
    commentType: 'SUGGESTION',
    user: {
      _id: 'user-2',
      username: 'GetoSuguru',
      displayName: 'Suguru Geto',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Suguru',
    },
    isEdited: false,
    isResolved: false,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    replies: [
      {
        _id: 'c-1-r-1',
        pullRequestId: 'pr-1',
        userId: 'author-123',
        content: "Thanks! I'll add more atmosphere in the next update.",
        commentType: 'GENERAL',
        user: {
          _id: 'author-123',
          username: 'GojoSatou',
          displayName: 'Gojo Satoru',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gojo',
        },
        isEdited: false,
        isResolved: false,
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
    ],
  },
  {
    _id: 'c-2',
    pullRequestId: 'pr-1',
    userId: 'user-3',
    content: "Wait, wasn't Shoko there too? I think it would be nice to include her briefly.",
    commentType: 'QUESTION',
    user: {
      _id: 'user-3',
      username: 'ShokoIeiri',
      displayName: 'Shoko Ieiri',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shoko',
    },
    isEdited: false,
    isResolved: false,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
];

const staticReviews: IPRReview[] = [
  {
    _id: 'rev-1',
    pullRequestId: 'pr-1',
    reviewerId: 'rev-1-id',
    reviewStatus: 'APPROVED',
    summary:
      'Excellent addition to the lore. The pacing is just right. The emotional weight of their friendship is handled with maturity.',
    feedback: [
      {
        section: 'Characterization',
        comment: 'The voices for Gojo and Geto are spot on.',
        rating: 5,
      },
      {
        section: 'Consistency',
        comment: 'Fits perfectly with the Hidden Inventory timeline.',
        rating: 4,
      },
    ],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    reviewer: {
      _id: 'rev-1-id',
      username: 'NanamiKento',
      displayName: 'Nanami Kento',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nanami',
    },
  },
];

const staticTimeline = [
  {
    action: 'created',
    author: {
      displayName: 'Uzumaki Naruto',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Naruto',
    },
    createdAt: new Date(Date.now() - 86400000 * 2),
  },
  {
    action: 'voted',
    author: {
      displayName: 'Suguru Geto',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Suguru',
    },
    createdAt: new Date(Date.now() - 86400000),
  },
  {
    action: 'approved',
    author: {
      displayName: 'Nanami Kento',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nanami',
    },
    createdAt: new Date(Date.now() - 3600000 * 10),
  },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState('conversation');
  const [newComment, setNewComment] = useState('');
  const [showDiff, setShowDiff] = useState(true);
  const [userVote, setUserVote] = useState<1 | -1 | null>(null);

  const statusConfig = PR_STATUS_CONFIG['approved'];
  const StatusIcon = statusConfig.icon;

  const handleComment = () => {
    console.log('Commenting:', newComment);
    setNewComment('');
  };

  const handleVote = (vote: 1 | -1) => {
    setUserVote(vote === userVote ? null : vote);
  };

  return (
    <TooltipProvider>
      <div className="bg-background text-foreground mx-auto max-w-6xl px-4 py-8 transition-colors duration-500">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:bg-muted/50 mb-6 gap-2 font-mono text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Submit Requests
        </Button>

        {/* Header Card */}
        <div className="border-border bg-card/60 mb-8 overflow-hidden rounded-2xl border p-6 shadow-sm backdrop-blur-md transition-all">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-4">
            {/* Status Icon Large */}
            <div
              className={cn(
                'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
                'bg-emerald-500/10'
              )}
            >
              <StatusIcon className={cn('h-6 w-6', 'text-emerald-600')} />
            </div>

            {/* Title & Meta Info */}
            <div className="min-w-0 flex-1">
              <h1 className="text-foreground font-serif text-2xl leading-tight font-bold">
                {staticPullRequest.title}
                <span className="text-muted-foreground ml-2 font-mono text-lg font-normal opacity-50">
                  #pr-1
                </span>
              </h1>

              {/* Badges Row */}
              <div className="mt-4 flex flex-wrap items-center gap-2.5">
                {prStatusBadge(staticPullRequest.status, { size: 'sm' })}
                {prTypeBadge(staticPullRequest.prType, { size: 'sm' })}
                {staticPullRequest.isDraft && statusBadge('Draft', 'neutral', { size: 'sm' })}
              </div>

              {/* Author Attribution */}
              <p className="text-muted-foreground mt-4 font-mono text-xs tracking-tight">
                <span className="text-foreground bg-muted mr-1.5 rounded-md px-2 py-1 leading-none font-semibold">
                  Gojo Satoru
                </span>{' '}
                wants to merge into{' '}
                <span className="text-secondary bg-secondary/15 rounded-md px-2 py-1 font-bold">
                  {staticPullRequest.parentChapterSlug}
                </span>
              </p>
            </div>

            {/* Header Action Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-background border-border hover:bg-muted shrink-0"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border w-48">
                <DropdownMenuItem className="cursor-pointer gap-2 font-mono text-sm">
                  <Edit2 className="h-4 w-4" />
                  Edit PR
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer gap-2 font-mono text-sm">
                  <Copy className="h-4 w-4" />
                  Copy PR ID
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem className="text-destructive cursor-pointer gap-2 font-mono text-sm">
                  <Flag className="h-4 w-4" />
                  Report Content
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* Tabs Navigation */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-card border">
                <TabsTrigger value="conversation" className="data-[state=active]:bg-background/60!">
                  <MessageSquare className="h-4 w-4" />
                  Conversation
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary flex h-5 min-w-5 items-center justify-center border-0 px-1.5 py-0 text-[10px]"
                  >
                    {staticComments.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="changes" className="data-[state=active]:bg-background/60!">
                  <FileEdit className="h-4 w-4" />
                  Changes
                  <div className="flex items-center gap-1 text-[9px] font-bold uppercase">
                    <span className="text-emerald-600">+15</span>
                    <span className="text-destructive">-2</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="reviews" className="data-[state=active]:bg-background/60!">
                  <CheckCircle className="h-4 w-4" />
                  Reviews
                  <Badge
                    variant="secondary"
                    className="bg-secondary/10 text-secondary flex h-5 min-w-5 items-center justify-center border-0 px-1.5 py-0 text-[10px]"
                  >
                    2
                  </Badge>
                </TabsTrigger>
              </TabsList>

              {/* Conversation Tab Panel */}
              <TabsContent value="conversation" className="mt-8 space-y-8">
                {/* Main Description */}
                <div className="border-border bg-card/40 overflow-hidden rounded-2xl border backdrop-blur-sm">
                  <div className="border-border/50 bg-muted/15 flex items-center gap-3 border-b px-6 py-4">
                    <Avatar className="ring-border ring-offset-card h-10 w-10 shadow-sm ring-2 ring-offset-2">
                      <AvatarImage src={'https://api.dicebear.com/7.x/avataaars/svg?seed=Naruto'} />
                      <AvatarFallback className="bg-primary/20 text-primary">UN</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <span className="text-foreground text-sm font-bold tracking-tight">
                        Uzumaki Naruto
                      </span>
                      <span className="text-muted-foreground ml-2 font-mono text-[11px] opacity-70">
                        {formatDistanceToNow(new Date(staticPullRequest.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-muted-foreground border-border px-2 text-[9px] font-bold tracking-widest uppercase"
                    >
                      Author
                    </Badge>
                  </div>
                  <div className="p-8">
                    <p className="text-foreground/90 text-sm leading-relaxed whitespace-pre-wrap">
                      {staticPullRequest.description}
                    </p>
                  </div>
                </div>

                {/* Timeline Items Mix */}
                <div className="before:bg-border/60 relative space-y-8 pl-4 before:absolute before:top-2 before:left-4 before:h-[calc(100%-16px)] before:w-px sm:pl-0 sm:before:left-4">
                  {staticTimeline.map((event, idx) => {
                    const config = TIMELINE_ACTION_CONFIG[event.action];
                    const EventIcon = config?.icon || GitPullRequest;

                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: idx * 0.05 }}
                        className="relative pl-10"
                      >
                        <div
                          className={cn(
                            'bg-card ring-border absolute left-0 flex h-8 w-8 items-center justify-center rounded-full shadow-md ring-2',
                            config?.bgColor
                          )}
                        >
                          <EventIcon className={cn('h-3.5 w-3.5', config?.color)} />
                        </div>
                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 pt-1.5">
                          <span className="text-foreground text-sm font-semibold">
                            {event.author.displayName}
                          </span>
                          <span className="text-muted-foreground font-mono text-sm opacity-80">
                            {config?.label}
                          </span>
                          <span className="text-muted-foreground bg-muted rounded px-2 py-0.5 font-mono text-[10px] opacity-50">
                            {formatDistanceToNow(event.createdAt, { addSuffix: true })}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}

                  {/* Integration point for comments */}
                  {staticComments.map((comment) => (
                    <div
                      key={comment._id}
                      className="relative z-10 transition-transform duration-300 hover:translate-x-1"
                    >
                      <CommentCard comment={comment} />
                    </div>
                  ))}
                </div>

                {/* Comment Insertion Box */}
                <div className="bg-card/40 border-primary/15 ring-border group relative overflow-hidden rounded-2xl border p-8 shadow-sm ring-1">
                  <div className="absolute top-0 right-0 p-4 opacity-10 transition-opacity group-hover:opacity-100">
                    <MessageSquare className="text-primary h-12 w-12" />
                  </div>
                  <div className="relative z-10 flex gap-5">
                    <Avatar className="ring-card h-12 w-12 flex-shrink-0 shadow-lg ring-4">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=currentuser" />
                      <AvatarFallback className="bg-secondary/20 text-secondary font-bold">
                        ME
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-5">
                      <Textarea
                        placeholder="Join the discussion... use @mentions or Markdown"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="bg-background/40 border-border focus:ring-primary/20 placeholder:text-muted-foreground/40 min-h-[140px] resize-none rounded-xl text-sm transition-all"
                      />
                      <div className="flex items-center justify-between pt-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground hover:bg-muted hover:text-foreground gap-2 font-mono text-[11px] tracking-tighter transition-all"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          Attach Guidelines
                        </Button>
                        <Button
                          onClick={handleComment}
                          disabled={!newComment.trim()}
                          className="bg-primary hover:bg-primary/90 text-primary-foreground h-11 gap-2.5 rounded-xl px-6 py-2 font-bold shadow-lg transition-all active:scale-95"
                        >
                          <Send className="h-4 w-4" />
                          Post Response
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Changes Tab Panel content */}
              <TabsContent value="changes" className="mt-8">
                <div className="border-border bg-card/60 overflow-hidden overflow-x-auto rounded-2xl border shadow-sm transition-all duration-500">
                  <div className="border-border/50 bg-muted/20 flex items-center justify-between border-b px-8 py-5">
                    <div className="flex items-center gap-5">
                      <div className="bg-primary/10 rounded-lg p-2">
                        <FileText className="text-primary h-5 w-5" />
                      </div>
                      <span className="text-foreground max-w-[240px] truncate text-sm font-bold tracking-tight">
                        {staticPullRequest.chapterSlug}
                      </span>
                      <div className="flex items-center gap-2 font-mono text-[10px] font-bold">
                        <span className="rounded-full border border-emerald-500/10 bg-emerald-500/15 px-3 py-1 text-emerald-600">
                          +15
                        </span>
                        <span className="bg-destructive/15 text-destructive border-destructive/10 rounded-full border px-3 py-1">
                          -2
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowDiff(!showDiff)}
                      className="border-border/60 bg-background/50 hover:bg-muted h-9 gap-2.5 px-4 text-xs font-semibold"
                    >
                      {showDiff ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                      {showDiff ? 'Collapse View' : 'Inspect Changes'}
                    </Button>
                  </div>

                  <AnimatePresence>
                    {showDiff && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="divide-border/20 divide-y overflow-hidden"
                      >
                        <div className="group/line relative">
                          <div className="bg-destructive/5 text-destructive/60 border-destructive/5 flex items-center gap-2 border-b px-8 py-3 font-mono text-[10px] font-bold tracking-widest">
                            <span className="bg-destructive/40 h-2 w-2 rounded-full" />
                            REMOVED CONTENT
                          </div>
                          <pre className="text-muted-foreground/60 decoration-destructive/20 bg-destructive/[0.02] p-8 font-mono text-xs leading-relaxed whitespace-pre-wrap line-through decoration-1">
                            The Hidden Inventory mission was a success, but the cost was high. Gojo
                            and Suguru are resting after a long battle.
                          </pre>
                        </div>
                        <div className="group/line relative">
                          <div className="flex items-center gap-2 border-b border-emerald-500/5 bg-emerald-500/5 px-8 py-3 font-mono text-[10px] font-bold tracking-widest text-emerald-600/60">
                            <span className="h-2 w-2 rounded-full bg-emerald-500/40" />
                            PROPOSED IMPROVEMENTS
                          </div>
                          <div className="text-foreground border-l-4 border-emerald-500/30 bg-emerald-500/[0.02] p-8 font-mono text-[13px] leading-relaxed whitespace-pre-wrap italic">
                            {staticPullRequest.content.proposed}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </TabsContent>

              {/* Reviews Tab Panel content */}
              <TabsContent value="reviews" className="mt-8 space-y-8">
                {staticReviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}

                {/* Call to Action: Submission Review */}
                <div className="border-border bg-muted/10 group relative overflow-hidden rounded-3xl border-2 border-dashed p-10 text-center">
                  <div className="bg-primary/5 absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  <div className="bg-primary/10 mx-auto mb-6 flex h-16 w-16 rotate-3 items-center justify-center rounded-2xl transition-transform group-hover:rotate-6">
                    <Star className="text-primary fill-primary/20 h-8 w-8" />
                  </div>
                  <h3 className="text-foreground text-xl font-bold tracking-tight">
                    Become a Reviewer
                  </h3>
                  <p className="text-muted-foreground mx-auto mt-3 max-w-sm text-sm leading-relaxed">
                    High-quality stories are built on community feedback. Review this PR to earn
                    lore points and trust reputation.
                  </p>
                  <div className="relative z-10 mt-8 flex flex-wrap justify-center gap-4">
                    <Button
                      variant="outline"
                      className="border-border/80 hover:bg-card h-11 gap-2.5 rounded-xl px-6 font-mono text-xs"
                    >
                      {/* <RefreshCcw className="h-4 w-4" /> */}
                      Request Adjustments
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/20 h-11 gap-3 rounded-xl px-8 font-bold shadow-xl transition-all active:scale-95">
                      <Check className="h-5 w-5" />
                      Approve Proposal
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <motion.div {...fadeIn(0.15)} className="space-y-6">
            {/* Voting Sentiment Card */}
            <div className="border-secondary/15 bg-card/60 overflow-hidden rounded-2xl border p-6 shadow-sm backdrop-blur-sm">
              <h3 className="text-muted-foreground mb-5 flex items-center justify-between font-mono text-[10px] font-bold tracking-widest uppercase">
                Community Sentiment
                <span className="text-primary bg-primary/10 rounded-full px-2 py-0.5 font-serif text-xs lowercase italic">
                  Trending
                </span>
              </h3>
              <div className="flex items-center gap-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={userVote === 1 ? 'default' : 'outline'}
                      size="lg"
                      onClick={() => handleVote(1)}
                      className={cn(
                        'border-border h-14 flex-1 gap-3 rounded-xl font-mono shadow-sm transition-all',
                        userVote === 1
                          ? 'border-0 bg-emerald-500 text-white shadow-emerald-500/20'
                          : 'hover:border-emerald-500/40 hover:bg-emerald-500/5 hover:text-emerald-500'
                      )}
                    >
                      <ThumbsUp className="h-5 w-5" />
                      <span className="text-xl font-black tracking-tighter">
                        {staticPullRequest.votes.upvotes}
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-card border-border text-foreground text-xs">
                    Upvote Lore
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={userVote === -1 ? 'destructive' : 'outline'}
                      size="lg"
                      onClick={() => handleVote(-1)}
                      className={cn(
                        'border-border h-14 flex-1 gap-3 rounded-xl font-mono shadow-sm transition-all',
                        userVote === -1
                          ? 'bg-destructive shadow-destructive/20 border-0 text-white'
                          : 'hover:border-destructive/40 hover:bg-destructive/5 hover:text-destructive'
                      )}
                    >
                      <ThumbsDown className="h-5 w-5" />
                      <span className="text-xl font-black tracking-tighter">
                        {staticPullRequest.votes.downvotes}
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-card border-border text-foreground text-xs">
                    Downvote Lore
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="border-border/40 justify-centers mt-5 flex items-baseline justify-between border-t pt-4">
                <span className="text-muted-foreground font-mono text-[10px] leading-none tracking-widest uppercase">
                  Net Reputation
                </span>
                <span
                  className={cn(
                    'font-mono text-xl leading-none font-black',
                    staticPullRequest.votes.score > 0
                      ? 'text-emerald-500'
                      : staticPullRequest.votes.score < 0
                        ? 'text-destructive'
                        : 'text-foreground'
                  )}
                >
                  {staticPullRequest.votes.score > 0 ? '+' : ''}
                  {staticPullRequest.votes.score}
                </span>
              </div>
            </div>

            {/* Approval Progress Card */}
            <div className="border-border bg-card/60 overflow-hidden rounded-2xl border p-6 shadow-sm backdrop-blur-sm">
              <h3 className="text-muted-foreground mb-5 font-mono text-[10px] font-bold tracking-widest uppercase">
                Consensus Tracking
              </h3>
              <div className="space-y-4">
                <div className="flex items-end justify-between font-mono">
                  <div className="flex flex-col">
                    <span className="text-foreground text-[24px] leading-none font-black">
                      {staticPullRequest.approvalsStatus.received}
                    </span>
                    <span className="text-muted-foreground mt-1 text-[10px] tracking-widest uppercase">
                      Approval Point(s)
                    </span>
                  </div>
                  <span className="text-muted-foreground bg-muted rounded px-2 py-1 text-[10px] font-bold">
                    goal: {staticPullRequest.approvalsStatus.required}
                  </span>
                </div>

                {/* Themed Progress Visual */}
                <div className="bg-muted relative h-2.5 overflow-hidden rounded-full shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.min(
                        (staticPullRequest.approvalsStatus.received /
                          staticPullRequest.approvalsStatus.required) *
                          100,
                        100
                      )}%`,
                    }}
                    transition={{ duration: 0.8, ease: 'circOut' }}
                    className={cn(
                      'h-full rounded-full transition-all duration-700',
                      staticPullRequest.approvalsStatus.received >=
                        staticPullRequest.approvalsStatus.required
                        ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                        : 'bg-secondary'
                    )}
                  />
                </div>

                {/* Reviewer Avatars */}
                {staticPullRequest.approvalsStatus.approvers.length > 0 && (
                  <div className="pt-3">
                    <span className="text-muted-foreground mb-2 block font-mono text-[9px] tracking-widest uppercase">
                      Verified by
                    </span>
                    <div className="flex -space-x-2.5">
                      {staticPullRequest.approvalsStatus.approvers.map((_, idx) => (
                        <Avatar
                          key={idx}
                          className="ring-card h-10 w-10 cursor-help ring-4 transition-transform hover:-translate-y-1"
                        >
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=approver${idx}`}
                          />
                          <AvatarFallback className="bg-primary/20 text-primary text-[10px] font-bold">
                            RE
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Labels Card */}
            <div className="border-border bg-card/60 overflow-hidden rounded-2xl border p-6 shadow-sm">
              <h3 className="text-muted-foreground mb-5 font-mono text-[10px] font-bold tracking-widest uppercase">
                Taxonomy Labels
              </h3>
              {staticPullRequest.labels.length > 0 ? (
                <div className="flex flex-wrap gap-2.5">
                  {staticPullRequest.labels.map((label) => (
                    <Badge
                      key={label}
                      variant="outline"
                      className="text-foreground/70 border-border bg-background/40 hover:bg-muted rounded-lg px-2.5 py-1 font-mono text-[10px] font-medium tracking-tight uppercase transition-colors"
                    >
                      {label.replace('_', ' ')}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground font-mono text-xs opacity-40">
                  Uncategorized lore...
                </p>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="border-border/80 hover:border-primary/40 hover:bg-primary/5 hover:text-primary mt-6 w-full gap-2 rounded-xl border border-dashed py-5 font-mono text-[10px] tracking-widest uppercase transition-all"
              >
                <Plus className="h-3.5 w-3.5" />
                Assign Label
              </Button>
            </div>

            {/* Metadata Detail Section */}
            <div className="border-border bg-card/40 overflow-hidden rounded-2xl border p-6 shadow-sm">
              <h3 className="text-muted-foreground mb-5 font-mono text-[10px] font-bold tracking-widest uppercase">
                Analytics & Context
              </h3>
              <div className="space-y-4">
                {[
                  {
                    icon: Eye,
                    label: 'Reader Count',
                    value: staticPullRequest.stats.views.toLocaleString(),
                  },
                  { icon: GitBranch, label: 'Source Story', value: staticPullRequest.storySlug },
                  {
                    icon: FileText,
                    label: 'Parent Chapter',
                    value: staticPullRequest.parentChapterSlug,
                  },
                  {
                    icon: Clock,
                    label: 'Submission Window',
                    value: format(new Date(staticPullRequest.createdAt), 'MMM d, p'),
                  },
                ].map((item, id) => (
                  <div key={id} className="group flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <item.icon className="text-muted-foreground group-hover:text-primary h-3.5 w-3.5 transition-colors" />
                      <span className="text-muted-foreground font-mono text-xs">{item.label}</span>
                    </div>
                    <span className="text-foreground group-hover:text-primary font-mono text-xs font-bold transition-colors">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lifecycle Actions */}
            {(staticPullRequest.status === 'open' || staticPullRequest.status === 'approved') && (
              <div className="border-border/30 space-y-3 border-t pt-4">
                {staticPullRequest.approvalsStatus.canMerge && (
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/10 h-12 w-full gap-3 rounded-xl font-bold shadow-xl">
                    <GitMerge className="h-4 w-4" />
                    Commit to Branch
                  </Button>
                )}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="border-destructive/20 text-destructive hover:bg-destructive/5 h-11 gap-2 rounded-xl font-mono text-[11px] tracking-tighter uppercase"
                  >
                    <X className="h-3.5 w-3.5" />
                    Revoke
                  </Button>
                  <Button
                    variant="outline"
                    className="border-border text-muted-foreground hover:bg-muted hover:text-foreground h-11 gap-2 rounded-xl font-mono text-[11px] tracking-tighter uppercase"
                  >
                    <GitPullRequestClosed className="h-3.5 w-3.5" />
                    Archive
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </TooltipProvider>
  );
}
