import type { Socket } from 'socket.io-client'
import type { NotificationDtoTypeEnumKey } from '../generated'
import type { UserDto } from '../generated/types/UserDto'

export enum WebsocketEvent {
  NotificationsNew = 'notifications:new',
  NotificationsRead = 'notifications:read',
  NotificationsReadAll = 'notifications:read-all',
  FriendsRequestCreated = 'friends:request:created',
  FriendsRequestAccepted = 'friends:request:accepted',
  FriendsRequestDeclined = 'friends:request:declined',
  FriendsRequestCancelled = 'friends:request:cancelled',
  FriendsUpdated = 'friends:updated',
}

type NotificationType = NotificationDtoTypeEnumKey

type NotificationNewPayload =
  | {
      type: Extract<NotificationType, 'FRIEND_REQUEST'>
      requestId: string
      requesterId: string
      sender: UserDto
    }
  | {
      type: Extract<NotificationType, 'FRIEND_ACCEPT'>
      requestId: string
      friendId: string
      sender: UserDto
    }
  | {
      type: Extract<NotificationType, 'FRIEND_DECLINE'>
      requestId?: string
      friendId?: string
      sender: UserDto
      id?: string
      payload?: unknown
    }
  | {
      type: Extract<NotificationType, 'FRIEND_REQUEST_CANCELLED'>
      requestId: string
      requesterId: string
      sender: UserDto
    }
  | {
      type: Extract<NotificationType, 'FRIEND_REMOVED'>
      friendId: string
      sender: UserDto
      id?: string
      payload?: unknown
    }

export type ServerToClientEvents = {
  [WebsocketEvent.NotificationsNew]: (
    payload: NotificationNewPayload
  ) => void
  [WebsocketEvent.NotificationsRead]: (payload: {
    id: string
  }) => void
  [WebsocketEvent.NotificationsReadAll]: (payload: {
    updated: number
  }) => void
  [WebsocketEvent.FriendsRequestCreated]: (payload: {
    requestId: string
    requesterId: string
  }) => void
  [WebsocketEvent.FriendsRequestAccepted]: (payload: {
    requestId: string
    friendId: string
  }) => void
  [WebsocketEvent.FriendsRequestDeclined]: (payload: {
    requestId: string
    friendId: string
  }) => void
  [WebsocketEvent.FriendsRequestCancelled]: (payload: {
    requestId: string
    requesterId: string
  }) => void
  [WebsocketEvent.FriendsUpdated]: (payload: {
    friendId: string
  }) => void
}

export type ClientToServerEvents = Record<string, never>

export type IWebsocketContext = {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null
}
