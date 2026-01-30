import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from './types'

import { io, type Socket } from 'socket.io-client'

import { sessionClient } from '@/services/session'
import { envConfig } from '@/utils/constants/config'

export class WebsocketClient {
  private _socket: Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null = null

  constructor() {}

  async connect() {
    const { accessToken } = await sessionClient.getSessionTokens()

    this._socket = io(envConfig.API_ENDPOINT, {
      extraHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    // this._socket.on('connect', () => {})

    // this._socket.on('connect_error', (err) => {
    //   if (err instanceof Error) {
    //   }
    // })

    // this._socket.on('disconnect', () => {})
  }

  get socket() {
    return this._socket
  }
}
