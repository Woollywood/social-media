import {
  Bell,
  Bookmark,
  Calendar,
  Home,
  type LucideProps,
  MessageCircle,
  Settings,
  User,
  Users,
} from 'lucide-react'
import React, { type FunctionComponent } from 'react'
import { Link, Outlet } from 'react-router'

import { Link as TypedLink } from '@/components/shared/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { paths } from '@/router'

import { Header } from './components/header'

type LinkProp = {
  label: string
  Icon: FunctionComponent<LucideProps>
  path: string
}

export const DefaultLayout: React.FC = () => {
  const links: LinkProp[] = [
    { label: 'Лента', Icon: Home, path: paths.home },
    { label: 'Сообщения', Icon: MessageCircle, path: paths.home },
    { label: 'Уведомления', Icon: Bell, path: paths.home },
    { label: 'Друзья', Icon: User, path: paths.friends },
    { label: 'Сообщества', Icon: Users, path: paths.home },
    { label: 'События', Icon: Calendar, path: paths.home },
    { label: 'Сохраненное', Icon: Bookmark, path: paths.home },
    { label: 'Настройки', Icon: Settings, path: paths.home },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="mx-auto flex min-h-screen w-full max-w-7xl gap-6 px-4 pb-6 pt-24">
        <aside className="sticky top-24 hidden h-fit w-64 shrink-0 flex-col gap-4 lg:flex">
          <Card className="gap-0 py-0">
            <CardHeader className="pb-0 pt-4">
              <CardTitle className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Главное меню
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-2 flex flex-col gap-2 pb-4">
              {links.map(({ label, Icon, path }) => (
                <Button
                  asChild
                  key={label}
                  variant="ghost"
                  className="w-full justify-between rounded-xl border border-transparent px-3 py-2 text-left hover:border-border"
                  type="button"
                >
                  <Link to={path}>
                    <span>{label}</span>
                    <Icon className="size-4 text-muted-foreground" />
                  </Link>
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card className="gap-0 py-0">
            <CardHeader className="pb-0 pt-4">
              <CardTitle className="text-sm font-semibold">
                Быстрые действия
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-3 flex flex-col gap-2 pb-4">
              <Button className="w-full rounded-xl" type="button">
                Создать пост
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full rounded-xl"
                type="button"
              >
                <TypedLink to={{ path: paths['find-friends'] }}>
                  Найти друзей
                </TypedLink>
              </Button>
            </CardContent>
          </Card>
        </aside>
        <Outlet />
      </div>
    </div>
  )
}
