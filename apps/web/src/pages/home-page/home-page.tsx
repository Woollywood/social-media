import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const Component = () => {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-6">
      <Card className="gap-0 py-0">
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 py-4">
          <div>
            <CardDescription className="text-sm">
              Добро пожаловать
            </CardDescription>
            <CardTitle className="text-lg font-semibold">
              Главное меню
            </CardTitle>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <Button
              variant="outline"
              className="rounded-full"
              type="button"
            >
              Новое сообщение
            </Button>
            <Button className="rounded-full" type="button">
              Обновить ленту
            </Button>
          </div>
        </CardHeader>
      </Card>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[
          {
            title: 'Моя лента',
            description: 'Новые публикации друзей и сообществ.',
          },
          {
            title: 'Сообщения',
            description: 'Чаты, ответы и упоминания.',
          },
          {
            title: 'Уведомления',
            description: 'Реакции, лайки и заявки.',
          },
          {
            title: 'Сообщества',
            description: 'Твои интересы и подписки.',
          },
          {
            title: 'События',
            description: 'Предстоящие встречи и планы.',
          },
          {
            title: 'Настройки',
            description: 'Профиль, приватность и безопасность.',
          },
        ].map((card) => (
          <Card key={card.title} className="h-full">
            <CardHeader>
              <Badge variant="secondary" className="w-fit">
                Раздел
              </Badge>
              <CardTitle className="text-base">
                {card.title}
              </CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button
                variant="secondary"
                className="w-full"
                type="button"
              >
                Открыть
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>

      <Card className="gap-0 py-0">
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 py-4">
          <div>
            <CardTitle className="text-sm font-semibold">
              Активность сегодня
            </CardTitle>
            <CardDescription className="text-xs">
              Быстрый обзор последних действий.
            </CardDescription>
          </div>
          <Button
            variant="outline"
            className="rounded-full"
            type="button"
          >
            Смотреть все
          </Button>
        </CardHeader>
        <CardContent className="grid gap-3 pb-4 md:grid-cols-3">
          {[
            { label: 'Новые подписчики', value: '24' },
            { label: 'Сообщения', value: '7' },
            { label: 'Упоминания', value: '3' },
          ].map((stat) => (
            <Card key={stat.label} className="gap-2 py-0">
              <CardContent className="py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {stat.label}
                </p>
                <p className="mt-2 text-lg font-semibold">
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
