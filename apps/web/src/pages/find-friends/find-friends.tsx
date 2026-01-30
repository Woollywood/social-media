import { Plus, X } from 'lucide-react'

import {
  useFriendsControllerSearchUsersSuspenseInfinite,
  useFriendsControllerSendRequest,
} from '@/api/generated'
import {
  UserCard,
  UserCardActions,
  UserCardInfo,
  UserCardTitle,
} from '@/components/shared/user-card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { createRoute } from '@/hocs/create-route'

export const Component = createRoute({
  Component: () => {
    const { mutateAsync: sendRequest, isPending } =
      useFriendsControllerSendRequest()

    const { data: users, isPending: isPendingList } =
      useFriendsControllerSearchUsersSuspenseInfinite()

    const items = users.pages.flatMap(({ items }) => items)

    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {isPendingList &&
          Array.from({ length: 6 }).map((_, index) => (
            <UserCard
              key={`find-friend-skeleton-${index}`}
              variant="gradient"
              layout="stacked"
              align="start"
              hover="none"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <Skeleton className="aspect-4/5 w-full" />
                <Skeleton className="absolute right-3 top-3 size-7 rounded-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-4 w-48" />
              </div>
              <Skeleton className="h-9 w-full rounded-md" />
            </UserCard>
          ))}
        {items.map((user) => (
          <UserCard
            key={user.id}
            variant="gradient"
            layout="stacked"
            align="start"
          >
            <div className="relative overflow-hidden rounded-2xl bg-muted">
              <div className="relative aspect-4/5 w-full">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.username}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-secondary text-2xl font-semibold text-secondary-foreground">
                    {user.username.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
              <Button
                variant="secondary"
                size="icon-xs"
                type="button"
                className="absolute right-3 top-3 rounded-full bg-background/80"
              >
                <X className="size-3.5" />
              </Button>
            </div>
            <UserCardInfo className="flex-0">
              <UserCardTitle className="text-base">
                {user.username}
              </UserCardTitle>
            </UserCardInfo>
            <UserCardActions>
              <Button
                className="w-full gap-2 rounded-full"
                type="button"
                disabled={isPending}
                onClick={() =>
                  sendRequest({ data: { receiverId: user.id } })
                }
              >
                <Plus className="size-4" />
                Добавить
              </Button>
            </UserCardActions>
          </UserCard>
        ))}
      </div>
    )
  },
})
