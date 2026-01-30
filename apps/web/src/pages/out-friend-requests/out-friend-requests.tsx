import {
  friendRequestDirectionEnum,
  useFriendsControllerCancelRequest,
  useFriendsControllerListRequestsSuspenseInfinite,
} from '@/api/generated'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { createRoute } from '@/hocs/create-route'

export const Component = createRoute({
  Component: () => {
    const {
      mutateAsync: cancelRequest,
      isPending: isPendingCancellation,
    } = useFriendsControllerCancelRequest()

    const { data, isPending: isPendingList } =
      useFriendsControllerListRequestsSuspenseInfinite({
        direction: friendRequestDirectionEnum.out,
      })

    const items = data.pages.flatMap(({ items }) => items)

    return (
      <div className="w-full space-y-3">
        {isPendingList &&
          Array.from({ length: 5 }).map((_, index) => (
            <Card
              key={`out-request-skeleton-${index}`}
              className="bg-card/95"
            >
              <CardContent className="flex items-center gap-4 px-4 py-3">
                <div className="relative">
                  <Skeleton className="size-12 rounded-full" />
                  <Skeleton className="absolute bottom-0 right-0 size-3 rounded-full" />
                </div>
                <div className="min-w-0 flex-1 space-y-2">
                  <Skeleton className="h-4 w-44" />
                  <Skeleton className="h-3 w-52" />
                  <Skeleton className="h-9 w-32 rounded-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        {items.map((item) => {
          const user = item.receiver ?? item.requester
          const title = user?.username ?? 'Пользователь'
          return (
            <Card key={item.id} className="bg-card/95">
              <CardContent className="flex items-center gap-4 px-4 py-3">
                <div className="relative">
                  <Avatar className="size-12">
                    <AvatarImage src={user?.avatarUrl ?? undefined} />
                    <AvatarFallback className="text-sm font-semibold">
                      {title.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-card bg-emerald-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">
                    {title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Профиль пользователя
                  </p>
                  <Button
                    variant="secondary"
                    className="mt-2 rounded-full px-4"
                    type="button"
                    disabled={isPendingCancellation}
                    onClick={() => cancelRequest({ id: item.id })}
                  >
                    Отписаться
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}

        {!isPendingList && items.length === 0 && (
          <Card>
            <CardContent className="py-6 text-center text-sm text-muted-foreground">
              Нет исходящих заявок.
            </CardContent>
          </Card>
        )}
      </div>
    )
  },
})
