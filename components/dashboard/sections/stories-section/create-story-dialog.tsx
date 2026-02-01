'use client';

import { useState, useCallback, useRef } from 'react';
import { BookOpen, X, ArrowRight, ArrowLeft, Send, Hash, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface CreateStoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Content Rating options
const CONTENT_RATINGS = [
  { value: 'GENERAL', label: 'General', description: 'Suitable for all ages' },
  {
    value: 'TEEN',
    label: 'Teen (13+)',
    description: 'May contain mild themes',
  },
  {
    value: 'MATURE',
    label: 'Mature (17+)',
    description: 'Adult themes and content',
  },
];

// Step indicator component
function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = [
    { step: 1, label: 'Basic Info' },
    { step: 2, label: 'Settings' },
  ];

  return (
    <div className="flex items-center gap-2">
      {steps.map((s, idx) => (
        <div key={s.step} className="flex items-center">
          <div
            className={cn(
              'flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition-colors',
              currentStep >= s.step
                ? 'bg-brand-pink-500 text-white'
                : 'bg-muted text-muted-foreground'
            )}
          >
            {currentStep > s.step ? <Check size={14} /> : s.step}
          </div>
          <span
            className={cn(
              'ml-2 text-xs font-medium',
              currentStep >= s.step ? 'text-foreground' : 'text-muted-foreground'
            )}
          >
            {s.label}
          </span>
          {idx < steps.length - 1 && (
            <div
              className={cn(
                'mx-3 h-[2px] w-8',
                currentStep > s.step ? 'bg-brand-pink-500' : 'bg-muted'
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// Basic Info Step
function BasicInfoStep({
  title,
  setTitle,
  description,
  setDescription,
  tags,
  setTags,
}: {
  title: string;
  setTitle: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  tags: string[];
  setTags: (v: string[]) => void;
}) {
  const [tagInput, setTagInput] = useState('');
  const tagInputRef = useRef<HTMLInputElement>(null);

  // Auto-generate slug from title
  const slug = title
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');

  const handleAddTag = useCallback(() => {
    const trimmedTag = tagInput.trim().toLowerCase();
    if (!trimmedTag) {
      setTagInput('');
      return;
    }
    if (!tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
    }
    setTagInput('');
  }, [tagInput, tags, setTags]);

  const handleRemoveTag = useCallback(
    (tagToRemove: string) => {
      setTags(tags.filter((t) => t !== tagToRemove));
    },
    [tags, setTags]
  );

  const handleTagKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' || e.key === ',' || e.key === ' ') {
        e.preventDefault();
        handleAddTag();
      } else if (e.key === 'Backspace' && tagInput === '' && tags.length > 0) {
        handleRemoveTag(tags[tags.length - 1]);
      }
    },
    [handleAddTag, handleRemoveTag, tagInput, tags]
  );

  return (
    <div className="space-y-5">
      {/* Story Title */}
      <div className="space-y-2">
        <Label className="text-text-primary text-sm font-medium">Story Title</Label>
        <Input
          placeholder="Enter your story title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-cream-95/50 focus:border-brand-pink-500 focus:ring-brand-pink-500/20 h-10 border-black/10 focus:bg-white"
        />
        {slug && (
          <p className="text-text-secondary-65 text-xs">
            URL: <span className="text-brand-pink-500 font-ibm-plex-mono">/stories/{slug}</span>
          </p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label className="text-text-primary text-sm font-medium">Description</Label>
        <Textarea
          placeholder="Write a compelling description for your story..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-cream-95/50 focus:border-brand-pink-500 focus:ring-brand-pink-500/20 min-h-[100px] resize-none border-black/10 text-sm focus:bg-white"
        />
        <p className="text-text-secondary-65 text-right text-xs">{description.length}/2000</p>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label className="text-text-primary text-sm font-medium">
          Tags <span className="text-text-secondary-65 font-normal">(optional)</span>
        </Label>
        <div
          className="focus-within:border-brand-pink-500 focus-within:ring-brand-pink-500/20 bg-cream-95/50 flex min-h-[44px] cursor-text flex-wrap items-center gap-2 rounded-lg border border-black/10 px-3 py-2 transition-colors focus-within:bg-white focus-within:ring-1"
          onClick={() => tagInputRef.current?.focus()}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-brand-pink-500/10 text-brand-pink-600 inline-flex items-center gap-1.5 rounded-full py-1 pr-2 pl-2.5 text-xs font-medium"
            >
              <Hash className="h-3 w-3 opacity-60" />
              {tag}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveTag(tag);
                }}
                className="hover:bg-brand-pink-500/20 -mr-0.5 rounded-full p-0.5 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          <input
            ref={tagInputRef}
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            onBlur={() => tagInput.trim() && handleAddTag()}
            placeholder={tags.length === 0 ? 'Add tags...' : ''}
            className="min-w-[80px] flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
          />
        </div>
        <p className="text-text-secondary-65 text-xs">Press Enter, Space, or Comma to add a tag</p>
      </div>
    </div>
  );
}

// Settings Step
function SettingsStep({
  contentRating,
  setContentRating,
  allowCollaboration,
  setAllowCollaboration,
}: {
  contentRating: string;
  setContentRating: (v: string) => void;
  allowCollaboration: boolean;
  setAllowCollaboration: (v: boolean) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Content Rating */}
      <div className="space-y-3">
        <Label className="text-text-primary text-sm font-medium">Content Rating</Label>
        <div className="space-y-2">
          {CONTENT_RATINGS.map((rating) => (
            <label
              key={rating.value}
              className={cn(
                'flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors',
                contentRating === rating.value
                  ? 'border-brand-pink-500 bg-brand-pink-500/5'
                  : 'hover:bg-muted/50 border-black/10'
              )}
            >
              <input
                type="radio"
                name="contentRating"
                value={rating.value}
                checked={contentRating === rating.value}
                onChange={(e) => setContentRating(e.target.value)}
                className="sr-only"
              />
              <div
                className={cn(
                  'flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors',
                  contentRating === rating.value
                    ? 'border-brand-pink-500 bg-brand-pink-500'
                    : 'border-muted-foreground/30'
                )}
              >
                {contentRating === rating.value && <Check size={12} className="text-white" />}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">{rating.label}</div>
                <div className="text-muted-foreground text-xs">{rating.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Collaboration Setting */}
      <div className="space-y-3">
        <Label className="text-text-primary text-sm font-medium">Collaboration</Label>
        <label
          className={cn(
            'flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors',
            allowCollaboration
              ? 'border-brand-pink-500 bg-brand-pink-500/5'
              : 'hover:bg-muted/50 border-black/10'
          )}
        >
          <input
            type="checkbox"
            checked={allowCollaboration}
            onChange={(e) => setAllowCollaboration(e.target.checked)}
            className="sr-only"
          />
          <div
            className={cn(
              'flex h-5 w-5 items-center justify-center rounded border-2 transition-colors',
              allowCollaboration
                ? 'border-brand-pink-500 bg-brand-pink-500'
                : 'border-muted-foreground/30'
            )}
          >
            {allowCollaboration && <Check size={12} className="text-white" />}
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">Allow Collaboration</div>
            <div className="text-muted-foreground text-xs">
              Other writers can submit chapters to your story
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}

export function CreateStoryDialog({ open, onOpenChange }: CreateStoryDialogProps) {
  const [step, setStep] = useState(1);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [contentRating, setContentRating] = useState('GENERAL');
  const [allowCollaboration, setAllowCollaboration] = useState(true);

  const resetForm = useCallback(() => {
    setStep(1);
    setTitle('');
    setDescription('');
    setTags([]);
    setContentRating('GENERAL');
    setAllowCollaboration(true);
  }, []);

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      onOpenChange(isOpen);
      if (!isOpen) {
        resetForm();
      }
    },
    [onOpenChange, resetForm]
  );

  const handleNext = useCallback(() => {
    if (step === 1) setStep(2);
  }, [step]);

  const handleBack = useCallback(() => {
    if (step === 2) setStep(1);
  }, [step]);

  const handleSubmit = useCallback(() => {
    // Just log for now (static UI)
    console.log('Create story:', {
      title,
      description,
      tags,
      contentRating,
      allowCollaboration,
    });
    handleOpenChange(false);
  }, [title, description, tags, contentRating, allowCollaboration, handleOpenChange]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-bg-cream border-border/50 flex flex-col gap-0 p-0 sm:max-w-[520px]">
        {/* Header */}
        <DialogHeader className="border-border/50 relative space-y-4 border-b bg-white/50 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="bg-brand-pink-500/10 flex h-11 w-11 items-center justify-center rounded-xl">
              <BookOpen className="text-brand-pink-500 h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <DialogTitle className="text-text-primary text-lg font-semibold tracking-tight">
                Create New Story
              </DialogTitle>
              <DialogDescription className="text-text-secondary-65 text-sm">
                {step === 1 ? 'Start with the basics' : 'Configure your story settings'}
              </DialogDescription>
            </div>
          </div>
          <StepIndicator currentStep={step} />
        </DialogHeader>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {step === 1 ? (
            <BasicInfoStep
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              tags={tags}
              setTags={setTags}
            />
          ) : (
            <SettingsStep
              contentRating={contentRating}
              setContentRating={setContentRating}
              allowCollaboration={allowCollaboration}
              setAllowCollaboration={setAllowCollaboration}
            />
          )}
        </div>

        {/* Footer */}
        <DialogFooter className="border-border/50 gap-3 border-t bg-white/50 px-6 py-4">
          {step === 1 ? (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                className="border-border/60 text-text-secondary hover:bg-muted/50 hover:text-text-primary h-10 px-5"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleNext}
                className="bg-brand-pink-500 hover:bg-brand-pink-600 h-10 gap-2 px-5 text-white shadow-sm transition-all hover:shadow-md"
              >
                Next Step
                <ArrowRight className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="border-border/60 text-text-secondary hover:bg-muted/50 hover:text-text-primary h-10 gap-2 px-5"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button
                type="button"
                onClick={handleSubmit}
                className="bg-brand-pink-500 hover:bg-brand-pink-600 h-10 min-w-[140px] gap-2 px-5 text-white shadow-sm transition-all hover:shadow-md"
              >
                <Send className="h-4 w-4" />
                Create Story
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateStoryDialog;
