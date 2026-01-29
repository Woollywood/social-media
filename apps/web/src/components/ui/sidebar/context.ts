import type { SidebarContextProps } from './types'

import React from 'react'

export const SidebarContext =
  React.createContext<SidebarContextProps | null>(null)
