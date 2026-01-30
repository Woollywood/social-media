'use client'

import { cn } from '@/utils/helpers/shadcn/utils'

import { useFormField } from '../hooks'

import { type IFormDescriptionProps } from './types'

export function FormDescription({
  className,
  description,
  ...props
}: IFormDescriptionProps) {
  const { formDescriptionId } = useFormField()

  if (!description) {
    return null
  }

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    >
      {description}
    </p>
  )
}
