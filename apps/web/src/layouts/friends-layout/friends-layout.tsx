import { UserPlus } from 'lucide-react'
import React from 'react'
import { Link, Outlet } from 'react-router'

import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from '@/components/shared/panel'
import {
  UserCard,
  UserCardInfo,
  UserCardSubtitle,
  UserCardTitle,
} from '@/components/shared/user-card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { paths } from '@/router'

type LinkProp = {
  label: string
  path: string
}

export const FriendsLayout: React.FC = () => {
  const links: LinkProp[] = [
    { label: 'Мои друзья', path: paths.friends },
    { label: 'Заявки в друзья', path: paths['friend-requests'] },
    { label: 'Исходящие заявки', path: paths['out-friend-requests'] },
    { label: 'Поиск друзей', path: paths['find-friends'] },
    // { label: 'Мало взаимодействуете', path: paths.friends },
  ]

  return (
    <div className="flex w-full min-w-0 justify-center">
      <div className="flex w-full max-w-4xl items-start gap-6">
        <div className="min-w-0 flex-1">
          <Outlet />
        </div>

        <aside className="sticky top-24 hidden h-fit w-72 shrink-0 flex-col gap-4 lg:flex">
          <Panel tone="glass" hover="glow">
            <PanelHeader className="pb-0 pt-4">
              <PanelTitle className="text-sm font-semibold">
                Разделы друзей
              </PanelTitle>
            </PanelHeader>
            <PanelContent className="mt-3 flex flex-col gap-2 pb-4 text-sm text-muted-foreground">
              {links.map(({ label, path }) => (
                <Button
                  asChild
                  key={path}
                  type="button"
                  variant="outline"
                  className="justify-between rounded-xl text-left"
                >
                  <Link to={path}>
                    <span>{label}</span>
                  </Link>
                </Button>
              ))}
            </PanelContent>
          </Panel>

          <Panel tone="soft">
            <PanelHeader className="pb-0 pt-4">
              <PanelTitle className="text-sm font-semibold">
                Возможные друзья
              </PanelTitle>
            </PanelHeader>
            <PanelContent className="mt-3 space-y-3 pb-4 text-sm">
              {[
                {
                  name: 'Анастасия Соколова',
                  initials: 'АС',
                  mutual: 12,
                },
                {
                  name: 'Илья Марков',
                  initials: 'ИМ',
                  mutual: 6,
                },
                {
                  name: 'Мария Чернова',
                  initials: 'МЧ',
                  mutual: 3,
                },
                {
                  name: 'Павел Дроздов',
                  initials: 'ПД',
                  mutual: 9,
                },
              ].map((person) => (
                <UserCard
                  key={person.name}
                  size="sm"
                  variant="soft"
                  hover="none"
                  className="gap-3"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="size-9">
                      <AvatarFallback className="text-xs font-semibold">
                        {person.initials}
                      </AvatarFallback>
                    </Avatar>
                    <UserCardInfo>
                      <UserCardTitle>{person.name}</UserCardTitle>
                      <UserCardSubtitle>
                        Общих друзей: {person.mutual}
                      </UserCardSubtitle>
                    </UserCardInfo>
                  </div>
                  <Button
                    size="icon-xs"
                    variant="outline"
                    type="button"
                    className="shrink-0"
                  >
                    <UserPlus className="size-3.5" />
                  </Button>
                </UserCard>
              ))}
            </PanelContent>
          </Panel>
        </aside>
      </div>
    </div>
  )
}
