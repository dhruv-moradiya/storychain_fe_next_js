import { useState } from 'react';

import { motion } from 'framer-motion';

import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group';

interface ReplyBoxProps {
  commentId: string;
  authorName: string;
  onSubmit: (content: string) => void;
  onCancel: () => void;
}

export function ReplyBox({ authorName, onSubmit, onCancel }: ReplyBoxProps) {
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
      className="mt-3 overflow-hidden"
    >
      <div className="ct-reply-box rounded-xl p-4">
        <FieldGroup className="space-y-4">
          <Field>
            <div className="mb-2 flex items-center justify-between">
              <FieldLabel className="font-ibm-plex-mono text-[10px] font-bold tracking-widest uppercase">
                Replying to <span className="text-brand-pink-500">@{authorName}</span>
              </FieldLabel>

              <span className="font-ibm-plex-mono ct-meta-text text-[9px] font-bold">
                {text.length} / 2000
              </span>
            </div>

            <InputGroup>
              <InputGroupTextarea
                id="reply-textarea"
                placeholder="Write a reply..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-30 resize-none"
              />

              <InputGroupAddon align="block-end" className="gap-2">
                <InputGroupText>{text.length}/2000</InputGroupText>

                <InputGroupButton variant="ghost" size="sm" onClick={onCancel}>
                  Cancel
                </InputGroupButton>

                <InputGroupButton
                  size="sm"
                  onClick={handleSubmit}
                  disabled={!text.trim() || submitting}
                  className="bg-brand-pink-500 hover:bg-brand-pink-600"
                >
                  {submitting ? 'Posting…' : 'Reply'}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>

            <FieldDescription>Keep replies respectful and constructive.</FieldDescription>
          </Field>
        </FieldGroup>
      </div>
    </motion.div>
  );
}
