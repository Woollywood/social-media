import type {
  FormFieldContextValue,
  FormItemContextValue,
} from './types'

import React from 'react'

export const FormFieldContext =
  React.createContext<FormFieldContextValue>(
    {} as FormFieldContextValue
  )

export const FormItemContext =
  React.createContext<FormItemContextValue>(
    {} as FormItemContextValue
  )
