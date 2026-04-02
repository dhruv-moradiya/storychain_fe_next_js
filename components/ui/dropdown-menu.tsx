'use client';

import * as React from 'react';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

// ── Root / Portal / Trigger ───────────────────────────────────────────────────

function DropdownMenu({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />;
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

// ── Content ───────────────────────────────────────────────────────────────────

function DropdownMenuContent({
  className,
  sideOffset = 6,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          // Layout & shape
          'z-50 min-w-32 overflow-x-hidden overflow-y-auto p-1',
          'rounded-md border',
          // Theme — more premium glass feel
          'bg-popover/95 text-text-primary',
          'border-soft',
          // Shadow
          'shadow',
          // Animation
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          'duration-150',
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

// ── Group ─────────────────────────────────────────────────────────────────────

function DropdownMenuGroup({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}

// ── Item ──────────────────────────────────────────────────────────────────────

function DropdownMenuItem({
  className,
  inset,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: 'default' | 'destructive';
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        // Base layout
        'relative flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-1.5',
        'text-sm outline-hidden select-none',
        'transition-colors duration-100',
        // Icon sizing
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "[&_svg:not([class*='text-'])]:text-text-secondary-65",
        // Disabled
        'data-disabled:cursor-not-allowed data-disabled:opacity-40',
        // Default focus/hover
        'data-[variant=default]:text-text-primary',
        'data-[variant=default]:hover:bg-brand-pink-500/8 data-[variant=default]:focus:bg-brand-pink-500/8',
        'data-[variant=default]:hover:text-text-primary data-[variant=default]:focus:text-text-primary',
        // Destructive focus/hover
        'data-[variant=destructive]:text-red-500',
        'data-[variant=destructive]:hover:bg-destructive/15 data-[variant=destructive]:focus:bg-destructive/15',
        'data-[variant=destructive]:hover:text-red-600 data-[variant=destructive]:focus:text-red-600',
        '`data-[variant=destructive]:*:[svg]:text-red-500! data-[variant=destructive]:*:[svg]:text-red-500!',
        // Inset
        'data-inset:pl-8',
        className
      )}
      {...props}
    />
  );
}

// ── Checkbox Item ─────────────────────────────────────────────────────────────

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        'relative flex cursor-pointer items-center gap-2 rounded-md py-1.5 pr-2.5 pl-8',
        'text-text-primary text-sm font-medium outline-hidden select-none',
        'transition-colors duration-100',
        'hover:bg-brand-pink-500/8 focus:bg-brand-pink-500/8',
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-40',
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="text-brand-pink-500 size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

// ── Radio Group / Item ────────────────────────────────────────────────────────

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return <DropdownMenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />;
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        'relative flex cursor-pointer items-center gap-2 rounded-md py-1.5 pr-2.5 pl-8',
        'text-text-primary text-sm font-medium outline-hidden select-none',
        'transition-colors duration-100',
        'hover:bg-brand-pink-500/8 focus:bg-brand-pink-500/8',
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-40',
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="fill-brand-pink-500 text-brand-pink-500 size-2" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

// ── Label ─────────────────────────────────────────────────────────────────────

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        'text-text-secondary-65 px-2.5 py-1.5 text-[11px] font-semibold tracking-wider uppercase',
        'data-[inset]:pl-8',
        className
      )}
      {...props}
    />
  );
}

// ── Separator ─────────────────────────────────────────────────────────────────

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn('bg-border/40 -mx-1 my-1 h-px', className)}
      {...props}
    />
  );
}

// ── Shortcut ──────────────────────────────────────────────────────────────────

function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn('text-text-secondary-65 ml-auto text-[11px] tracking-widest', className)}
      {...props}
    />
  );
}

// ── Sub ───────────────────────────────────────────────────────────────────────

function DropdownMenuSub({ ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        'flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-1.5',
        'text-text-primary text-sm font-medium outline-hidden select-none',
        'transition-colors duration-100',
        'focus:bg-brand-pink-500/8 data-[state=open]:bg-brand-pink-500/8',
        "[&_svg:not([class*='text-'])]:text-text-secondary-65",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        'data-[inset]:pl-8',
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-lg border p-1',
        'bg-popover/95 text-text-primary backdrop-blur-xl',
        'border-soft',
        'shadow-[0_4px_24px_-4px_rgba(0,0,0,0.10),0_1px_4px_-1px_rgba(0,0,0,0.06)]',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
        'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        'origin-(--radix-dropdown-menu-content-transform-origin)',
        'duration-150',
        className
      )}
      {...props}
    />
  );
}

// ── Exports ───────────────────────────────────────────────────────────────────

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
