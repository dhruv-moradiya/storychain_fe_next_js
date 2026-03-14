import React from 'react';
import { cn } from '@/lib/utils';

interface NotificationMessageProps {
  message: string;
  className?: string;
}

export function NotificationMessage({ message, className }: NotificationMessageProps) {
  // Regex to match [[type:value]]
  const pattern = /\[\[(.*?):(.*?)]]/g;

  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(message)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: message.substring(lastIndex, match.index) });
    }

    const [, type, value] = match;
    parts.push({ type, content: value });
    lastIndex = match.index + match[0].length;
  }

  // Add any remaining text
  if (lastIndex < message.length) {
    parts.push({ type: 'text', content: message.substring(lastIndex) });
  }

  return (
    <span className={cn('text-text-secondary-65 text-sm', className)}>
      {parts.map((part, index) => {
        if (part.type === 'text') {
          return <React.Fragment key={index}>{part.content}</React.Fragment>;
        }

        let typeClass = 'font-semibold text-text-primary';

        switch (part.type) {
          case 'actor':
            typeClass = 'font-semibold text-brand-pink-600';
            break;
          case 'story':
            typeClass = 'font-semibold text-blue-600 italic';
            break;
          case 'role':
            typeClass = 'font-semibold text-purple-600';
            break;
          case 'chapter':
            typeClass = 'font-semibold text-amber-600';
            break;
          default:
            typeClass = 'font-semibold text-text-primary';
            break;
        }

        return (
          <span key={index} className={typeClass}>
            {part.content}
          </span>
        );
      })}
    </span>
  );
}
