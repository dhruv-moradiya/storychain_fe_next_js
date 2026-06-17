'use client';

import * as React from 'react';

import { Bookmark, Copy, Facebook, Heart, Link2, List, Twitter } from 'lucide-react';

import toast from '@/components/shared/toast/toast';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface ChapterSidebarProps {
  initialLikes?: number;
}

export function ChapterSidebar({ initialLikes = 124 }: ChapterSidebarProps) {
  const [liked, setLiked] = React.useState(false);
  const [likesCount, setLikesCount] = React.useState(initialLikes);
  const [saved, setSaved] = React.useState(false);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikesCount((prev) => prev - 1);
      toast.success('Removed like');
    } else {
      setLiked(true);
      setLikesCount((prev) => prev + 1);
      toast.success('Liked chapter!');
    }
  };

  const handleSave = () => {
    if (saved) {
      setSaved(false);
      toast.success('Removed from library');
    } else {
      setSaved(true);
      toast.success('Saved chapter to library!');
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    } catch {
      toast.error('Failed to copy link');
    }
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent('Check out this awesome story chapter on StoryChain!');
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="border-border/50 flex flex-col gap-6 rounded-sm border p-5 shadow-xs">
        {/* Progress */}
        <div className="flex flex-col gap-2.5">
          <div className="text-text-secondary-65 flex items-center justify-between text-xs font-semibold tracking-wide uppercase">
            <span>Chapter Progress</span>
            <span>45%</span>
          </div>
          <Progress value={45} className="h-2" />
        </div>

        {/* View All Chapters Button */}
        <Button
          variant="outline-editorial"
          className="h-10 w-full cursor-pointer rounded-sm text-sm font-semibold"
        >
          <List className="size-4" />
          View All Chapters
        </Button>

        <hr className="border-border/30" />

        {/* Share Actions (Image 2 style) */}
        <div className="flex flex-col gap-3">
          <span className="text-text-secondary-65 text-xs font-semibold tracking-wide uppercase">
            Share Chapter
          </span>
          <div className="grid grid-cols-4 gap-2">
            <Button
              variant="outline-editorial"
              size="icon"
              onClick={copyLink}
              className="h-10 w-full cursor-pointer rounded-sm [&_svg]:size-5"
              title="Copy Link"
            >
              <Link2 />
            </Button>
            <Button
              variant="outline-editorial"
              size="icon"
              onClick={shareOnTwitter}
              className="h-10 w-full cursor-pointer rounded-sm [&_svg]:size-5"
              title="Share on Twitter"
            >
              <Twitter className="fill-current text-inherit" />
            </Button>
            <Button
              variant="outline-editorial"
              size="icon"
              onClick={shareOnFacebook}
              className="h-10 w-full cursor-pointer rounded-sm [&_svg]:size-5"
              title="Share on Facebook"
            >
              <Facebook className="fill-current text-inherit" />
            </Button>
            <Button
              variant="outline-editorial"
              size="icon"
              onClick={copyLink}
              className="h-10 w-full cursor-pointer rounded-sm [&_svg]:size-5"
              title="Copy text"
            >
              <Copy />
            </Button>
          </div>
        </div>

        <hr className="border-border/30" />

        {/* Like and Save Buttons (Image 3 style) */}
        <div className="flex items-center gap-3">
          <Button
            variant={liked ? 'default' : 'outline-brand-editorial'}
            onClick={handleLike}
            className={`h-10 flex-1 cursor-pointer rounded-sm text-sm font-semibold transition-all duration-300 ${
              liked ? 'bg-brand-pink-500 hover:bg-brand-pink-600 text-white shadow-sm' : ''
            }`}
          >
            <Heart
              className={`size-4 transition-transform duration-300 ${liked ? 'scale-110 fill-current' : ''}`}
            />
            Like ({likesCount})
          </Button>

          <Button
            variant={saved ? 'default' : 'outline-editorial'}
            onClick={handleSave}
            className={`h-10 flex-1 cursor-pointer rounded-sm text-sm font-semibold transition-all duration-300 ${
              saved ? 'bg-text-secondary hover:bg-text-secondary/90 text-white shadow-sm' : ''
            }`}
          >
            <Bookmark
              className={`size-4 transition-transform duration-300 ${saved ? 'scale-110 fill-current' : ''}`}
            />
            {saved ? 'Saved' : 'Save Chapter'}
          </Button>
        </div>
      </div>
      <div className="border-border/50 flex flex-col gap-6 rounded-sm border p-5 shadow-xs">
        {/* Progress */}
        <div className="flex flex-col gap-2.5">
          <h3 className="text-text-primary text-lg font-semibold">Do you like this chapter?</h3>
          <p className="text-text-secondary-65 text-sm">Your feedback helps the author grow.</p>
        </div>

        {/* View All Chapters Button */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline-editorial"
            className="h-10 w-full cursor-pointer rounded-sm text-sm font-semibold"
          >
            <Heart className="size-4" />
            Like
          </Button>

          <Button
            variant="outline-editorial"
            className="h-10 w-full cursor-pointer rounded-sm text-sm font-semibold"
          >
            <Bookmark className="size-4" />
            Save
          </Button>
        </div>
      </div>

      <div className="border-border/50 flex flex-col gap-6 rounded-sm border p-5 shadow-xs">
        {/* Progress */}
        <div className="flex flex-col gap-2.5">
          <h3 className="text-text-primary text-lg font-semibold">Community guidelines</h3>

          <ul className="text-text-secondary-65 list-disc pl-5 text-sm">
            <li className="mb-2">Be respectful of the author and other readers</li>
            <li className="mb-2">Keep the conversation constructive</li>
            <li className="mb-2">Do not post any offensive content</li>
            <li className="mb-2">Do not post any spam content</li>
            <li className="mb-2">Do not post any hate speech</li>
          </ul>

          <Button
            variant="outline-editorial"
            className="h-10 w-full cursor-pointer rounded-sm text-sm font-semibold"
          >
            Read full guidelines
          </Button>
        </div>
      </div>
    </div>
  );
}
