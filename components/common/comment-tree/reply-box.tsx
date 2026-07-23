import { useState } from 'react';

import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface ReplyBoxProps {
  commentId: string;
  authorName: string;
  variant?: 'default' | 'flat';
  onSubmit: (content: string) => void;
  onCancel: () => void;
}

export function ReplyBox({ authorName, variant = 'default', onSubmit, onCancel }: ReplyBoxProps) {
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    const trimmed = text.trim();
    if (!trimmed) return;
    setSubmitting(true);
    await Promise.resolve(onSubmit(trimmed));
    setText('');
    setSubmitting(false);
    onCancel();
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="mt-2.5 overflow-hidden sm:mt-3"
    >
      <div
        className={cn(
          'rounded-xl p-2.5 sm:p-4',
          variant === 'flat'
            ? 'border-border/30 border-t bg-transparent p-1 sm:p-2'
            : 'ct-reply-box'
        )}
      >
        <Field className="space-y-2">
          <div className="flex items-center justify-between">
            <FieldLabel className="font-ibm-plex-mono text-[10px] font-bold tracking-wider uppercase">
              Replying to <span className="text-brand-pink-500">@{authorName}</span>
            </FieldLabel>

            <span className="font-ibm-plex-mono ct-meta-text text-[9px] font-bold">
              {text.length} / 2000
            </span>
          </div>

          <Textarea
            id="reply-textarea"
            placeholder="Write a reply..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="font-lora border-border/40 bg-background/50 focus-visible:ring-brand-pink-500 min-h-16 w-full resize-none p-2.5 text-[13px] leading-relaxed shadow-none focus-visible:ring-1 sm:min-h-24 sm:p-3 sm:text-[14px]"
            maxLength={2000}
          />

          <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
            <span className="font-ibm-plex-mono ct-meta-text hidden text-[10px] sm:inline">
              Keep replies respectful and constructive.
            </span>

            <div className="ml-auto flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onCancel}
                className="h-7 px-2.5 text-[11px] sm:h-8 sm:px-3 sm:text-xs"
              >
                Cancel
              </Button>

              <Button
                size="sm"
                onClick={handleSubmit}
                disabled={!text.trim() || submitting}
                className="bg-brand-pink-500 hover:bg-brand-pink-600 h-7 px-3.5 text-[11px] font-bold text-white shadow-xs sm:h-8 sm:px-4 sm:text-xs"
              >
                {submitting ? 'Posting…' : 'Reply'}
              </Button>
            </div>
          </div>
        </Field>
      </div>
    </motion.div>
  );
}
