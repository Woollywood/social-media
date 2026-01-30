'use client'

import React from 'react'

import { cn } from '@/utils/helpers/shadcn/utils'

import { FormItemContext } from '../context/form-item-context'

export function FormItem({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn('grid gap-1', className)}
        {...props}
      />
    </FormItemContext.Provider>
  )
}
