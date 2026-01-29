import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { paths } from '@/router'

export const AuthLayout: React.FC = () => {
  const { pathname } = useLocation()

  if (pathname === paths.auth) {
    return <Navigate to={paths['sign-in']} />
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-10 px-4 py-10 lg:grid-cols-[1.1fr_1fr]">
        <div className="hidden flex-col gap-6 lg:flex">
          <Badge variant="secondary" className="w-fit">
            Социальная сеть
          </Badge>
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold">
              Общайтесь, делитесь и находите единомышленников.
            </h1>
            <p className="text-base text-muted-foreground">
              Получайте персональную ленту, общайтесь в сообщениях и
              управляйте приватностью в одном месте.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: 'Лента',
                description: 'Актуальные посты и события.',
              },
              {
                title: 'Сообщения',
                description: 'Чаты с друзьями и группами.',
              },
              {
                title: 'Сообщества',
                description: 'Интересы и полезные подборки.',
              },
              {
                title: 'Безопасность',
                description: 'Контроль доступа и настроек.',
              },
            ].map((item) => (
              <Card key={item.title} className="gap-2 py-0">
                <CardContent className="py-4">
                  <p className="text-sm font-semibold">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="mx-auto w-full max-w-md">
          <Outlet />
          <CardFooter className="flex flex-col gap-4">
            <Separator />
            <p className="text-center text-xs text-muted-foreground">
              Регистрируясь, вы соглашаетесь с правилами сервиса и
              политикой конфиденциальности.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
