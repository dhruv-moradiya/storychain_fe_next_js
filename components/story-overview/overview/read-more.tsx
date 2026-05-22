'use client';

import { useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

interface ReadMoreProps {
  html: string;
  maxLines?: number;
  className?: string;
  buttonClassName?: string;
}

export default function ReadMore({
  html,
  maxLines = 6,
  className,
  buttonClassName,
}: ReadMoreProps) {
  const [expanded, setExpanded] = useState(false);

  const shouldShowButton = useMemo(() => {
    return html?.replace(/<[^>]*>/g, '').length > 300;
  }, [html]);

  return (
    <div>
      <div
        style={
          !expanded
            ? {
                display: '-webkit-box',
                WebkitLineClamp: maxLines,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }
            : undefined
        }
        className={cn(
          'text-text-secondary text-justify font-serif text-[15px] leading-[1.75] tracking-[0.01em] sm:text-base sm:leading-[1.8]',
          className
        )}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {shouldShowButton && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className={cn('text-primary mt-2 text-sm font-medium hover:underline', buttonClassName)}
        >
          {expanded ? 'Read less' : 'Read more'}
        </button>
      )}
    </div>
  );
}
