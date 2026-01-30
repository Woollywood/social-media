import type { IWebsocketContext } from './types'

import { createContext } from 'react'

export const WebsocketContext = createContext<IWebsocketContext>({
  socket: null,
})
