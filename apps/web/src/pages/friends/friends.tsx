import { MessageCircle, MoreHorizontal } from 'lucide-react'

import { useFriendsControllerListFriendsSuspenseInfinite } from '@/api/generated'
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
    const { data: friends, isPending } =
      useFriendsControllerListFriendsSuspenseInfinite()

    const items =
      friends?.pages?.flatMap((page) => page.items ?? []) ?? []

    return (
      <div className="w-full space-y-3">
        {isPending &&
          Array.from({ length: 6 }).map((_, index) => (
            <Card
              key={`friend-skeleton-${index}`}
              className="gap-0 py-0"
            >
              <CardContent className="flex items-center justify-between px-4 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <Skeleton className="size-12 rounded-full" />
                  <div className="min-w-0 space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-9 w-44 rounded-md" />
                  </div>
                </div>
                <Skeleton className="size-9 rounded-md" />
              </CardContent>
            </Card>
          ))}
        {items.map((item) => (
          <Card key={item.id} className="gap-0 py-0">
            <CardContent className="flex items-center justify-between px-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <Avatar className="size-12">
                  <AvatarImage
                    src={item.friend.avatarUrl ?? undefined}
                  />
                  <AvatarFallback className="text-sm font-semibold">
                    {item.friend.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    {item.friend.username}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 gap-2"
                    type="button"
                  >
                    <MessageCircle className="size-4" />
                    Написать сообщение
                  </Button>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                type="button"
                className="shrink-0"
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </CardContent>
          </Card>
        ))}

        {!isPending && items.length === 0 && (
          <Card className="gap-0 py-0">
            <CardContent className="py-6 text-center text-sm text-muted-foreground">
              У вас пока нет друзей в списке.
            </CardContent>
          </Card>
        )}
      </div>
    )
  },
})
