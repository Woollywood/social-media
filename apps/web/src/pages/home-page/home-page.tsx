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
import { Progress } from '@/components/ui/progress'
import { createRoute } from '@/hocs/create-route'

export const Component = createRoute({
  Component: () => {
    return (
      <>
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <Card className="gap-0 overflow-hidden border-border/70 bg-linear-to-br from-primary/5 via-background to-secondary/10 py-0">
            <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 py-5">
              <div>
                <Badge
                  variant="secondary"
                  className="mb-2 w-fit bg-primary/10 text-primary"
                >
                  Персональный обзор
                </Badge>
                <CardTitle className="text-lg font-semibold">
                  Главное меню
                </CardTitle>
                <CardDescription className="text-sm">
                  Быстрый доступ к ключевым разделам и действиям.
                </CardDescription>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <Button
                  variant="outline"
                  className="rounded-full border-primary/30 bg-primary/5 text-primary hover:border-primary/50"
                  type="button"
                >
                  Новое сообщение
                </Button>
                <Button
                  className="rounded-full bg-primary/90"
                  type="button"
                >
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
            ].map((card, index) => (
              <Card
                key={card.title}
                className={`h-full border-border/70 ${
                  index % 2 === 0 ? 'bg-background' : 'bg-muted/40'
                }`}
              >
                <CardHeader>
                  <Badge
                    variant="outline"
                    className={`w-fit ${
                      index % 3 === 0
                        ? 'border-primary/40 text-primary'
                        : index % 3 === 1
                          ? 'border-chart-2/40 text-chart-2'
                          : 'border-chart-4/50 text-chart-4'
                    }`}
                  >
                    Раздел
                  </Badge>
                  <CardTitle className="text-base">
                    {card.title}
                  </CardTitle>
                  <CardDescription>
                    {card.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button
                    variant="secondary"
                    className={`w-full rounded-full ${
                      index % 3 === 0
                        ? 'bg-primary/10 text-primary hover:bg-primary/20'
                        : index % 3 === 1
                          ? 'bg-chart-2/10 text-chart-2 hover:bg-chart-2/20'
                          : 'bg-chart-4/10 text-chart-4 hover:bg-chart-4/20'
                    }`}
                    type="button"
                  >
                    Открыть
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </section>

          <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <Card className="gap-0 border-border/70 bg-background/80 py-0">
              <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 py-5">
                <div>
                  <CardTitle className="text-sm font-semibold">
                    План активности
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Поддерживайте регулярность, чтобы не терять связь.
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  className="rounded-full"
                  type="button"
                >
                  Подробнее
                </Button>
              </CardHeader>
              <CardContent className="grid gap-4 pb-5">
                {[
                  { label: 'Публикации', value: 62, tone: 'chart-1' },
                  {
                    label: 'Ответы в чатах',
                    value: 38,
                    tone: 'chart-2',
                  },
                  {
                    label: 'Новые контакты',
                    value: 24,
                    tone: 'chart-4',
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-border/60 bg-muted/30 px-3 py-3"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">
                        {item.label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.value}%
                      </span>
                    </div>
                    <Progress
                      value={item.value}
                      className={`${
                        item.tone === 'chart-1'
                          ? 'bg-chart-1/20 **:data-[slot=progress-indicator]:bg-chart-1'
                          : item.tone === 'chart-2'
                            ? 'bg-chart-2/20 **:data-[slot=progress-indicator]:bg-chart-2'
                            : 'bg-chart-4/20 **:data-[slot=progress-indicator]:bg-chart-4'
                      }`}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="gap-0 border-border/70 bg-linear-to-br from-secondary/30 via-background to-background py-0">
              <CardHeader className="py-5">
                <CardTitle className="text-sm font-semibold">
                  Актуальные темы
                </CardTitle>
                <CardDescription className="text-xs">
                  То, о чем говорят сегодня.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2 pb-5">
                {[
                  'Новые знакомства',
                  'Городские события',
                  'Спорт и здоровье',
                  'Технологии',
                  'Творчество',
                ].map((tag, index) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className={`border ${
                      index % 3 === 0
                        ? 'border-chart-1/40 bg-chart-1/10 text-chart-1'
                        : index % 3 === 1
                          ? 'border-chart-3/40 bg-chart-3/10 text-chart-3'
                          : 'border-chart-5/40 bg-chart-5/10 text-chart-5'
                    }`}
                  >
                    {tag}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </section>

          <Card className="gap-0 border-border/70 bg-muted/30 py-0">
            <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 py-5">
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
            <CardContent className="grid gap-3 pb-5 md:grid-cols-3">
              {[
                {
                  label: 'Новые подписчики',
                  value: '24',
                  tone: 'chart-1',
                },
                { label: 'Сообщения', value: '7', tone: 'chart-2' },
                { label: 'Упоминания', value: '3', tone: 'chart-5' },
              ].map((stat) => (
                <Card
                  key={stat.label}
                  className={`gap-2 border-border/60 py-0 ${
                    stat.tone === 'chart-1'
                      ? 'bg-chart-1/10'
                      : stat.tone === 'chart-2'
                        ? 'bg-chart-2/10'
                        : 'bg-chart-5/10'
                  }`}
                >
                  <CardContent className="py-4">
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

          <section className="grid gap-4 lg:grid-cols-2">
            <Card className="gap-0 border-border/70 bg-linear-to-br from-background to-muted/40 py-0">
              <CardHeader className="py-5">
                <CardTitle className="text-sm font-semibold">
                  События рядом
                </CardTitle>
                <CardDescription className="text-xs">
                  Выберите, куда сходить на этой неделе.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pb-5 text-sm">
                {[
                  {
                    title: 'Лекторий по дизайну',
                    time: 'Сегодня, 19:00',
                  },
                  { title: 'Утренняя пробежка', time: 'Сб, 08:00' },
                  { title: 'Встреча комьюнити', time: 'Вс, 16:00' },
                ].map((event, index) => (
                  <div
                    key={event.title}
                    className={`flex items-center justify-between rounded-xl border border-border/60 px-3 py-2 ${
                      index % 2 === 0
                        ? 'bg-chart-4/10'
                        : 'bg-chart-2/10'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {event.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {event.time}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" type="button">
                      Подробнее
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="gap-0 border-border/70 bg-background/80 py-0">
              <CardHeader className="py-5">
                <CardTitle className="text-sm font-semibold">
                  Недавние действия
                </CardTitle>
                <CardDescription className="text-xs">
                  Быстрый обзор последних взаимодействий.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pb-5 text-sm">
                {[
                  'Вы отметили событие «Городской фестиваль»',
                  'Новый комментарий к вашему посту',
                  'Вас упомянули в сообществе «UI / UX»',
                ].map((activity, index) => (
                  <div
                    key={activity}
                    className={`rounded-xl border border-border/60 px-3 py-2 text-muted-foreground ${
                      index % 2 === 0
                        ? 'bg-primary/10'
                        : 'bg-chart-3/10'
                    }`}
                  >
                    {activity}
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        </div>
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
      </>
    )
  },
})
