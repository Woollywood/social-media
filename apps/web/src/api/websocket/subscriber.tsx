import type React from 'react'

import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  friendsControllerListFriendsSuspenseInfiniteQueryOptions,
  friendsControllerListRequestsSuspenseInfiniteQueryOptions,
  friendsControllerSearchUsersSuspenseInfiniteQueryOptions,
} from '../generated'

import { useSubscribe } from './hooks'
import { WebsocketEvent } from './types'

export const WebsocketSubscriber: React.FC<
  React.PropsWithChildren
> = ({ children }) => {
  const queryClient = useQueryClient()

  const invalidate = () => {
    queryClient.invalidateQueries(
      friendsControllerSearchUsersSuspenseInfiniteQueryOptions()
    )
    queryClient.invalidateQueries(
      friendsControllerListRequestsSuspenseInfiniteQueryOptions()
    )
    queryClient.invalidateQueries(
      friendsControllerListFriendsSuspenseInfiniteQueryOptions()
    )
  }

  useSubscribe(WebsocketEvent.NotificationsNew, (payload) => {
    switch (payload.type) {
      case 'FRIEND_ACCEPT':
        toast(`${payload.sender.username} принял заявку в друзья`)
        break
      case 'FRIEND_DECLINE':
        toast(`${payload.sender.username} отклонил заявку в друзья`)
        break
      case 'FRIEND_REQUEST':
        toast(`${payload.sender.username} отправил заявку в друзья`)
        break
      case 'FRIEND_REMOVED':
        toast(
          `${payload.sender.username} удалил вас из своего списка друзей`
        )
        break
    }

    invalidate()
  })

  return children
}
