import React from 'react'

import { type FormItemContextValue } from './types'

export const FormItemContext =
  React.createContext<FormItemContextValue>(
    {} as FormItemContextValue
  )
