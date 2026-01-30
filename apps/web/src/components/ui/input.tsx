import * as React from 'react'

import { cn } from '@/utils/helpers/shadcn/utils'

export interface IInputProps extends React.ComponentProps<'input'> {
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}

export const Input = React.forwardRef<
  HTMLInputElement | null,
  IInputProps
>(
  (
    {
      startIcon,
      endIcon,
      className,
      type,
      disabled,
      onFocus,
      onBlur,
      'aria-invalid': ariaInvalid,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const rootRef = React.useRef<HTMLInputElement>(null)

    React.useImperativeHandle<
      HTMLInputElement | null,
      HTMLInputElement | null
    >(ref, () => rootRef.current, [])

    const [isFocused, setIsFocused] = React.useState(false)
    const isFile = type === 'file'

    const handleClick = () => rootRef.current?.focus()

    const handleFocus = (
      e: React.FocusEvent<HTMLInputElement, Element>
    ) => {
      setIsFocused(true)
      onFocus?.(e)
    }

    const handleBlur = (
      e: React.FocusEvent<HTMLInputElement, Element>
    ) => {
      setIsFocused(false)
      onBlur?.(e)
    }

    return (
      <div
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        className={cn(
          className,
          'dark:bg-input/30 border-input flex h-9 w-full min-w-0 cursor-text items-center gap-2 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          {
            'text-foreground inline-flex h-7 border-0 bg-transparent text-sm font-medium':
              isFile,
            'pointer-events-none cursor-not-allowed opacity-50':
              disabled,
            'border-ring ring-ring/50 ring-[3px]': isFocused,
          }
        )}
        onClick={handleClick}
      >
        {startIcon}
        <input
          ref={rootRef}
          type={type}
          data-slot="input"
          className={
            'placeholder:text-muted-foreground w-full outline-none'
          }
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {endIcon}
      </div>
    )
  }
)

Input.displayName = 'Input'
