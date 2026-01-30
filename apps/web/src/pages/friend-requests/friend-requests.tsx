import {
  friendRequestDirectionEnum,
  useFriendsControllerAcceptRequest,
  useFriendsControllerDeclineRequest,
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
    const { mutateAsync: acceptRequest, isPending: isPendingAccept } =
      useFriendsControllerAcceptRequest()
    const {
      mutateAsync: declineRequest,
      isPending: isPendingDecline,
    } = useFriendsControllerDeclineRequest()

    const { data, isPending: isPendingList } =
      useFriendsControllerListRequestsSuspenseInfinite({
        direction: friendRequestDirectionEnum.in,
      })

    const items = data.pages.flatMap(({ items }) => items)

    return (
      <div className="w-full space-y-3">
        {isPendingList &&
          Array.from({ length: 5 }).map((_, index) => (
            <UserCard
              key={`request-skeleton-${index}`}
              variant="soft"
              hover="none"
              align="start"
            >
              <Skeleton className="size-12 rounded-full" />
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-4 w-44" />
                <Skeleton className="h-3 w-56" />
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-9 w-36 rounded-full" />
                  <Skeleton className="h-9 w-48 rounded-full" />
                </div>
              </div>
            </UserCard>
          ))}
        {items.map((item) => {
          const user = item.receiver
          const title = user?.username ?? 'Неизвестный пользователь'

          return (
            <UserCard key={item.id} variant="plain" align="start">
              <Avatar className="size-12">
                <AvatarImage src={user?.avatarUrl ?? undefined} />
                <AvatarFallback className="text-sm font-semibold">
                  {title.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <UserCardInfo>
                <UserCardTitle>{title}</UserCardTitle>
                <UserCardSubtitle>
                  Профиль пользователя
                </UserCardSubtitle>
                <UserCardActions className="mt-3">
                  <Button
                    type="button"
                    className="rounded-full"
                    disabled={isPendingAccept || isPendingDecline}
                    onClick={() => acceptRequest({ id: item.id })}
                  >
                    Добавить в друзья
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="rounded-full text-foreground/80 hover:text-foreground"
                    disabled={isPendingAccept || isPendingDecline}
                    onClick={() => declineRequest({ id: item.id })}
                  >
                    Удалить из подписчиков
                  </Button>
                </UserCardActions>
              </UserCardInfo>
            </UserCard>
          )
        })}

        {!isPendingList && items.length === 0 && (
          <UserCard variant="soft" hover="none" layout="stacked">
            <div className="py-4 text-center text-sm text-muted-foreground">
              Нет входящих заявок в друзья.
            </div>
          </UserCard>
        )}
      </div>
    )
  },
})
