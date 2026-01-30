import { MessageCircle, MoreHorizontal } from 'lucide-react'

import { useFriendsControllerListFriendsSuspenseInfinite } from '@/api/generated'
import {
  UserCard,
  UserCardActions,
  UserCardInfo,
  UserCardTitle,
} from '@/components/shared/user-card'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { createRoute } from '@/hocs/create-route'

export const Component = createRoute({
  Component: () => {
    const { data: friends, isPending } =
      useFriendsControllerListFriendsSuspenseInfinite()

    const items =
      friends?.pages?.flatMap((page) => page.items ?? []) ?? []

    return (
      <div className="w-full space-y-3">
        {isPending &&
          Array.from({ length: 6 }).map((_, index) => (
            <UserCard
              key={`friend-skeleton-${index}`}
              variant="soft"
              hover="none"
            >
              <div className="flex min-w-0 items-center gap-3">
                <Skeleton className="size-12 rounded-full" />
                <div className="min-w-0 space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-9 w-44 rounded-md" />
                </div>
              </div>
              <Skeleton className="size-9 rounded-md" />
            </UserCard>
          ))}
        {items.map((item) => (
          <UserCard key={item.id} variant="plain">
            <div className="flex min-w-0 items-center gap-3">
              <Avatar className="size-12">
                <AvatarImage
                  src={item.friend.avatarUrl ?? undefined}
                />
                <AvatarFallback className="text-sm font-semibold">
                  {item.friend.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <UserCardInfo>
                <UserCardTitle>{item.friend.username}</UserCardTitle>
                <UserCardActions className="mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 rounded-full"
                    type="button"
                  >
                    <MessageCircle className="size-4" />
                    Написать сообщение
                  </Button>
                </UserCardActions>
              </UserCardInfo>
            </div>
            <Button
              variant="ghost"
              size="icon"
              type="button"
              className="shrink-0"
            >
              <MoreHorizontal className="size-4" />
            </Button>
          </UserCard>
        ))}

        {!isPending && items.length === 0 && (
          <UserCard variant="soft" hover="none" layout="stacked">
            <div className="py-4 text-center text-sm text-muted-foreground">
              У вас пока нет друзей в списке.
            </div>
          </UserCard>
        )}
      </div>
    )
  },
})
