'use client';

import { useTheme } from 'next-themes';

import { Monitor, Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-text-secondary hover:bg-brand-pink-500/10 hover:text-text-primary relative h-9 w-9"
          aria-label="Toggle theme"
        >
          <Sun className="h-[1.15rem] w-[1.15rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.15rem] w-[1.15rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="border-border/50 bg-cream-95 min-w-32 rounded-xl border p-1 shadow-xl backdrop-blur-xl"
      >
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className={cn(
            'text-text-secondary hover:text-text-primary gap-2',
            theme === 'light' && 'text-brand-pink-500 font-medium'
          )}
        >
          <Sun className="h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className={cn(
            'text-text-secondary hover:text-text-primary gap-2',
            theme === 'dark' && 'text-brand-pink-500 font-medium'
          )}
        >
          <Moon className="h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className={cn(
            'text-text-secondary hover:text-text-primary gap-2',
            theme === 'system' && 'text-brand-pink-500 font-medium'
          )}
        >
          <Monitor className="h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
