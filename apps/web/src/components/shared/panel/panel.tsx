import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/utils/helpers/shadcn/utils'

const panelVariants = cva(
  'relative rounded-2xl border text-foreground shadow-sm transition-shadow',
  {
    variants: {
      tone: {
        plain: 'bg-card border-border',
        soft: 'bg-muted/50 border-border/60',
        glass:
          'bg-background/70 border-border/70 backdrop-blur supports-backdrop-filter:bg-background/60',
        gradient:
          'border-border/60 bg-linear-to-br from-primary/8 via-background to-secondary/15',
        contrast: 'bg-secondary/70 border-border',
      },
      hover: {
        none: '',
        lift: 'hover:shadow-md',
        glow: 'hover:shadow-[0_12px_30px_-12px_rgba(80,80,120,0.35)]',
      },
    },
    defaultVariants: {
      tone: 'plain',
      hover: 'lift',
    },
  }
)

function Panel({
  className,
  tone,
  hover,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof panelVariants>) {
  return (
    <div
      data-slot="panel"
      className={cn(panelVariants({ tone, hover }), className)}
      {...props}
    />
  )
}

function PanelHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="panel-header"
      className={cn('flex flex-col gap-1 px-4 pt-4', className)}
      {...props}
    />
  )
}

function PanelTitle({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="panel-title"
      className={cn('text-base font-semibold', className)}
      {...props}
    />
  )
}

function PanelDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="panel-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

function PanelContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="panel-content"
      className={cn('px-4 pb-4', className)}
      {...props}
    />
  )
}

function PanelFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="panel-footer"
      className={cn(
        'flex items-center gap-2 px-4 pb-4 pt-2',
        className
      )}
      {...props}
    />
  )
}

export {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelDescription,
  PanelContent,
  PanelFooter,
}
