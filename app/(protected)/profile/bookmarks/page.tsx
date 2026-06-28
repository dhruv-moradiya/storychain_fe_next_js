'use client';

import Image from 'next/image';

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { motion } from 'framer-motion';
import { ArrowRight, BookmarkIcon, Filter, Search } from 'lucide-react';

import createBadge, { BadgeGroup, contentRatingBadge } from '@/components/common/badge';
import { DashboardGrid } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function BookmarkCard({ type = 'story' }: { type?: 'story' | 'chapter' }) {
  return (
    <div className="group/story-card bg-card relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[14px] p-1.5 transition-all duration-300">
      <div className="relative flex w-full gap-3 rounded-[12px] border p-3 shadow">
        <Button
          variant={'outline-editorial'}
          className={`hover:border-border/50 h-8 w-8 cursor-pointer rounded-sm text-sm font-semibold transition-all duration-300 ${
            true
              ? 'hover:bg-muted absolute top-3 right-3 z-10 rounded-full p-1.5 transition-colors'
              : ''
          }`}
        >
          <BookmarkIcon className="fill-brand-orange text-brand-orange size-4" />
        </Button>

        {/* Top accent */}
        <div className="bg-brand-orange absolute inset-x-20 top-0 h-[2px] rounded-b-full" />

        {/* Poster */}
        <div className="shrink-0">
          <Image
            src="https://res.cloudinary.com/dpji4qfnu/image/upload/v1773730326/stories/merchant-of-forbidden-seas/wyr5p9u32tmmguwxbwau.jpg"
            alt="Story poster"
            className="aspect-2/3 h-full rounded-lg object-cover"
            width={100}
            height={150}
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-2">
          <div className="mb-3 flex items-center justify-between gap-2 pr-8">
            {createBadge({
              label: type,
              color: 'slate',
            })}
          </div>

          {/* Title */}
          <h3 className="line-clamp-2 text-[15px] leading-tight font-medium">
            Merchant of Forbidden Seas
          </h3>

          <div className="mt-auto">
            {/* Rating */}
            <div className="mb-2 flex items-center gap-2 text-xs">
              <span className="text-muted-foreground font-medium">Rating:</span>

              {contentRatingBadge('all_ages', {
                size: 'xs',
                className: 'uppercase',
              })}
            </div>

            <BadgeGroup
              badges={[
                {
                  label: 'Adventure',
                  color: 'pink',
                  shape: 'pill',
                  size: 'xs',
                },
                {
                  label: 'Fantasy',
                  color: 'blue',
                  shape: 'pill',
                  size: 'xs',
                },
              ]}
              max={2}
              gap="xs"
              className="uppercase"
            />
          </div>

          <div className="mt-2 flex items-center gap-1">
            <Avatar className="size-10 overflow-hidden rounded-full">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="size-8 rounded-full grayscale"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <h3 className="line-clamp-2 text-[13px] font-medium">Dhruv</h3>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="relative mt-1.5 h-5 overflow-hidden">
        <span className="text-muted-foreground absolute top-0 left-1 text-[11px] transition-transform ease-[cubic-bezier(0.2,0.4,0,1)] group-hover/story-card:-translate-x-[calc(100%+4px)]">
          Updated 2 day ago
        </span>

        <span className="absolute top-0 right-0 flex translate-x-full items-center gap-1 text-[11px] transition-transform ease-[cubic-bezier(0.2,0.4,0,1)] group-hover/story-card:-translate-x-2">
          Go to Story <ArrowRight size={12} />
        </span>
      </div>
    </div>
  );
}

export default function Bookmark() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3"
        >
          <div className="from-brand-pink-500/20 to-brand-orange/20 flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br">
            <BookmarkIcon className="text-brand-pink-500 h-5 w-5" />
          </div>
          <div>
            <h1 className="text-text-primary text-lg font-semibold tracking-tight">Bookmarks</h1>
            <p className="text-text-secondary-65 text-sm">Manage your bookmarked stories</p>
          </div>
        </motion.div>

        <div className="flex items-center gap-3">
          <InputGroup className="max-w-xs">
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>

          <Button variant="outline-editorial" className="text-text-secondary-75 h-10 rounded-sm">
            <Filter />
            Filters
          </Button>

          <Select>
            <SelectTrigger className="h-10 w-full max-w-48 rounded-sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort by</SelectLabel>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DashboardGrid minItemWidth={280} gap="md">
        <BookmarkCard type="story" />
        <BookmarkCard type="chapter" />
        <BookmarkCard type="story" />
        <BookmarkCard type="chapter" />
      </DashboardGrid>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">4</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">5</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
