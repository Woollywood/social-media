import {
  Bell,
  Bookmark,
  Calendar,
  Home,
  MessageCircle,
  Settings,
  User,
  Users,
} from 'lucide-react'
import React from 'react'
import { Outlet } from 'react-router'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Header } from './components/header'

export const DefaultLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="mx-auto flex min-h-screen w-full max-w-7xl gap-6 px-4 pb-6 pt-24">
        <aside className="hidden w-64 shrink-0 flex-col gap-4 lg:flex">
          <Card className="gap-0 py-0">
            <CardHeader className="pb-0 pt-4">
              <CardTitle className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Главное меню
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-2 flex flex-col gap-2 pb-4">
              {[
                { label: 'Лента', icon: Home },
                { label: 'Сообщения', icon: MessageCircle },
                { label: 'Уведомления', icon: Bell },
                { label: 'Друзья', icon: User },
                { label: 'Сообщества', icon: Users },
                { label: 'События', icon: Calendar },
                { label: 'Сохраненное', icon: Bookmark },
                { label: 'Настройки', icon: Settings },
              ].map(({ label, icon: Icon }) => (
                <Button
                  key={label}
                  variant="ghost"
                  className="w-full justify-between rounded-xl border border-transparent px-3 py-2 text-left hover:border-border"
                  type="button"
                >
                  <span>{label}</span>
                  <Icon className="size-4 text-muted-foreground" />
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
                variant="outline"
                className="w-full rounded-xl"
                type="button"
              >
                Найти друзей
              </Button>
            </CardContent>
          </Card>
        </aside>

        <Outlet />

        <aside className="hidden w-72 shrink-0 flex-col gap-4 xl:flex">
          <Card className="gap-0 py-0">
            <CardHeader className="pb-0 pt-4">
              <CardTitle className="text-sm font-semibold">
                Сегодня
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-3 space-y-3 pb-4 text-sm">
              {[
                'Подборка друзей по интересам',
                'Обновления в любимых сообществах',
                'Напоминание о событии',
              ].map((item) => (
                <Card key={item} className="gap-0 py-0">
                  <CardContent className="px-3 py-2">
                    {item}
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          <Card className="gap-0 py-0">
            <CardHeader className="pb-0 pt-4">
              <CardTitle className="text-sm font-semibold">
                Рекомендации
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-3 flex flex-col gap-2 pb-4 text-sm text-muted-foreground">
              {['UX/UI дизайн', 'Фотография', 'Бег и здоровье'].map(
                (tag) => (
                  <Button
                    key={tag}
                    type="button"
                    variant="outline"
                    className="justify-between rounded-xl text-left"
                  >
                    <span>{tag}</span>
                    <span className="text-xs">+</span>
                  </Button>
                )
              )}
            </CardContent>
          </Card>

          <Card className="gap-0 py-0">
            <CardContent className="py-4 text-sm text-muted-foreground">
              Настройте приватность, чтобы управлять тем, кто видит
              ваши публикации и контакты.
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}
