import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/utils/helpers/shadcn/utils'

const userCardVariants = cva(
  'w-full rounded-2xl border text-foreground transition-shadow',
  {
    variants: {
      variant: {
        plain: 'bg-card border-border',
        soft: 'bg-muted/50 border-border/60',
        glass:
          'bg-background/70 border-border/70 backdrop-blur supports-backdrop-filter:bg-background/60',
        gradient:
          'border-border/60 bg-linear-to-br from-primary/8 via-background to-secondary/15',
      },
      size: {
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-5',
      },
      layout: {
        row: 'flex items-center justify-between gap-4',
        stacked: 'flex flex-col gap-4',
      },
      align: {
        start: 'items-start',
        center: 'items-center',
      },
      hover: {
        none: '',
        lift: 'hover:shadow-md',
        glow: 'hover:shadow-[0_12px_30px_-12px_rgba(80,80,120,0.35)]',
      },
    },
    defaultVariants: {
      variant: 'plain',
      size: 'md',
      layout: 'row',
      align: 'center',
      hover: 'lift',
    },
  }
)

function UserCard({
  className,
  variant,
  size,
  layout,
  align,
  hover,
  ...props
}: React.ComponentProps<'div'> &
  VariantProps<typeof userCardVariants>) {
  return (
    <div
      data-slot="user-card"
      className={cn(
        userCardVariants({ variant, size, layout, align, hover }),
        className
      )}
      {...props}
    />
  )
}

function UserCardInfo({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="user-card-info"
      className={cn('min-w-0 flex-1', className)}
      {...props}
    />
  )
}

function UserCardTitle({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="user-card-title"
      className={cn('truncate text-sm font-semibold', className)}
      {...props}
    />
  )
}

function UserCardSubtitle({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="user-card-subtitle"
      className={cn('text-xs text-muted-foreground', className)}
      {...props}
    />
  )
}

function UserCardActions({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="user-card-actions"
      className={cn('flex flex-wrap gap-2', className)}
      {...props}
    />
  )
}

export {
  UserCard,
  UserCardInfo,
  UserCardTitle,
  UserCardSubtitle,
  UserCardActions,
}
