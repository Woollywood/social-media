import type { Socket } from 'socket.io-client'
import type {
  ClientToServerEvents,
  IWebsocketContext,
  ServerToClientEvents,
} from './types'

import { useEffect, useRef, useState } from 'react'

import { sessionClient } from '@/services/session'

import { WebsocketClient } from './client'
import { WebsocketContext } from './context'

const websocketClient = new WebsocketClient()

export const WebsocketProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const isRunEffect = useRef(false)
  const [socket, setSocket] = useState<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null)

  useEffect(() => {
    if (isRunEffect.current) {
      return
    }

    isRunEffect.current = true

    if (sessionClient.hasSessionTokens()) {
      const connect = async () => {
        await websocketClient.connect()
        websocketClient.socket?.on('connect', () => {
          setSocket(websocketClient.socket)
        })
      }

      connect()

      return () => {
        websocketClient.socket?.disconnect()
      }
    }
  }, [])

  const value: IWebsocketContext = {
    socket,
  }

  return (
    <WebsocketContext.Provider value={value}>
      {children}
    </WebsocketContext.Provider>
  )
}
