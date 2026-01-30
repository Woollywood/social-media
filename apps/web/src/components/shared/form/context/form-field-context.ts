import React from 'react'

import { type FormFieldContextValue } from './types'

export const FormFieldContext =
  React.createContext<FormFieldContextValue>(
    {} as FormFieldContextValue
  )
