'use client';

import React from 'react';

import { type Variants, motion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  FadeInView                                                        */
/*  Wraps any content and fades it in when it enters the viewport.    */
/* ------------------------------------------------------------------ */

export interface FadeInViewProps {
  /** Extra vertical offset (px) the element slides in from. Default 16. */
  y?: number;
  /** Animation duration in seconds. Default 0.5. */
  duration?: number;
  /** Delay before animation starts, in seconds. Default 0. */
  delay?: number;
  /** Only animate once (true) or every time element enters viewport. Default true. */
  once?: boolean;
  /** Intersection Observer root margin. Default "-60px". */
  margin?: string;
  /** HTML tag to render. Default "div". */
  as?: 'div' | 'section' | 'footer' | 'header' | 'article' | 'aside' | 'main';
  /** Extra CSS class(es). */
  className?: string;
  children: React.ReactNode;
}

export function FadeInView({
  y = 16,
  duration = 0.5,
  delay = 0,
  once = true,
  margin = '-60px',
  as: Tag = 'div',
  className,
  children,
}: FadeInViewProps) {
  const MotionTag = motion[Tag];

  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

/* ------------------------------------------------------------------ */
/*  StaggerChildren                                                   */
/*  Wraps a list of children and staggers their entrance animation    */
/*  when the container scrolls into the viewport.                     */
/* ------------------------------------------------------------------ */

export interface StaggerChildrenProps {
  /** Delay between each child's animation, in seconds. Default 0.08. */
  stagger?: number;
  /** Animation duration for each child, in seconds. Default 0.4. */
  duration?: number;
  /** Delay before the first child starts animating, in seconds. Default 0. */
  delay?: number;
  /** Vertical offset each child slides in from (px). Default 12. */
  y?: number;
  /** Only animate once (true) or every time. Default true. */
  once?: boolean;
  /** Intersection Observer root margin. Default "-40px". */
  margin?: string;
  /** HTML tag for the container. Default "div". */
  as?: 'div' | 'section' | 'ul' | 'ol' | 'footer' | 'header';
  /** Extra CSS class(es). */
  className?: string;
  children: React.ReactNode;
}

const containerVariants = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

const childVariants = (y: number, duration: number): Variants => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: 'easeOut' },
  },
});

export function StaggerChildren({
  stagger = 0.08,
  duration = 0.4,
  delay = 0,
  y = 12,
  once = true,
  margin = '-40px',
  as: Tag = 'div',
  className,
  children,
}: StaggerChildrenProps) {
  const MotionTag = motion[Tag];

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={containerVariants(stagger, delay)}
      className={className}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return <motion.div variants={childVariants(y, duration)}>{child}</motion.div>;
      })}
    </MotionTag>
  );
}
