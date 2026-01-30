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
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from '@/components/shared/panel'
import { Button } from '@/components/ui/button'
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
          <Panel
            tone="glass"
            hover="glow"
            className="border-border/60"
          >
            <PanelHeader className="pb-0 pt-5">
              <PanelTitle className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                Главное меню
              </PanelTitle>
            </PanelHeader>
            <PanelContent className="mt-3 flex flex-col gap-1 pb-5">
              {links.map(({ label, Icon, path }) => (
                <Button
                  asChild
                  key={label}
                  variant="ghost"
                  className="w-full justify-between rounded-lg border border-transparent px-3 py-2 text-left text-sm font-medium text-muted-foreground transition-colors hover:border-border/60 hover:bg-muted/60 hover:text-foreground"
                  type="button"
                >
                  <Link to={path}>
                    <span>{label}</span>
                    <Icon className="size-4 text-muted-foreground" />
                  </Link>
                </Button>
              ))}
            </PanelContent>
          </Panel>

          <Panel
            tone="gradient"
            hover="lift"
            className="border-border/60"
          >
            <PanelHeader className="pb-0 pt-5">
              <PanelTitle className="text-sm font-semibold">
                Быстрые действия
              </PanelTitle>
            </PanelHeader>
            <PanelContent className="mt-3 flex flex-col gap-2 pb-5">
              <Button className="w-full rounded-full" type="button">
                Создать пост
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full rounded-full border-border/70"
                type="button"
              >
                <TypedLink to={{ path: paths['find-friends'] }}>
                  Найти друзей
                </TypedLink>
              </Button>
            </PanelContent>
          </Panel>
        </aside>
        <Outlet />
      </div>
    </div>
  )
}
