import type { ServerToClientEvents } from './types'

import { useContext, useEffect } from 'react'

import { WebsocketContext } from './context'

export const useWebsocket = () => {
  return useContext(WebsocketContext)
}

export const useSubscribe = <
  K extends keyof ServerToClientEvents,
  T extends ServerToClientEvents[K],
>(
  event: K,
  callback: T
) => {
  const { socket } = useWebsocket()

  useEffect(() => {
    if (socket) {
      // @ts-expect-error skip
      socket.on(event, callback)

      return () => {
        // @ts-expect-error skip
        socket.off(event, callback)
      }
    }
  }, [callback, event, socket])
}
