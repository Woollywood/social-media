import { useQueryClient } from '@tanstack/react-query'

import {
  friendRequestDirectionEnum,
  friendsControllerListRequestsSuspenseInfiniteQueryOptions,
  useFriendsControllerCancelRequest,
  useFriendsControllerListRequestsSuspenseInfinite,
} from '@/api/generated'
import {
  UserCard,
  UserCardActions,
  UserCardInfo,
  UserCardSubtitle,
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
    const queryClient = useQueryClient()

    const invalidate = () => {
      queryClient.invalidateQueries(
        friendsControllerListRequestsSuspenseInfiniteQueryOptions({
          direction: friendRequestDirectionEnum.out,
        })
      )
    }

    const {
      mutateAsync: cancelRequest,
      isPending: isPendingCancellation,
    } = useFriendsControllerCancelRequest({
      mutation: {
        onSuccess: invalidate,
      },
    })

    const { data, isPending: isPendingList } =
      useFriendsControllerListRequestsSuspenseInfinite({
        direction: friendRequestDirectionEnum.out,
      })

    const items = data.pages.flatMap(({ items }) => items)

    return (
      <div className="w-full space-y-3">
        {isPendingList &&
          Array.from({ length: 5 }).map((_, index) => (
            <UserCard
              key={`out-request-skeleton-${index}`}
              variant="soft"
              hover="none"
            >
              <div className="relative">
                <Skeleton className="size-12 rounded-full" />
                <Skeleton className="absolute bottom-0 right-0 size-3 rounded-full" />
              </div>
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-4 w-44" />
                <Skeleton className="h-3 w-52" />
                <Skeleton className="h-9 w-32 rounded-full" />
              </div>
            </UserCard>
          ))}
        {items.map((item) => {
          const user = item.receiver ?? item.requester
          const title = user?.username ?? 'Пользователь'
          return (
            <UserCard key={item.id} variant="plain">
              <div className="relative">
                <Avatar className="size-12">
                  <AvatarImage src={user?.avatarUrl ?? undefined} />
                  <AvatarFallback className="text-sm font-semibold">
                    {title.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-card bg-emerald-500" />
              </div>
              <UserCardInfo>
                <UserCardTitle>{title}</UserCardTitle>
                <UserCardSubtitle>
                  Профиль пользователя
                </UserCardSubtitle>
                <UserCardActions className="mt-2">
                  <Button
                    variant="secondary"
                    className="rounded-full px-4"
                    type="button"
                    disabled={isPendingCancellation}
                    onClick={() => cancelRequest({ id: item.id })}
                  >
                    Отписаться
                  </Button>
                </UserCardActions>
              </UserCardInfo>
            </UserCard>
          )
        })}

        {!isPendingList && items.length === 0 && (
          <UserCard variant="soft" hover="none" layout="stacked">
            <div className="py-4 text-center text-sm text-muted-foreground">
              Нет исходящих заявок.
            </div>
          </UserCard>
        )}
      </div>
    )
  },
})
