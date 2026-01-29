import { useAuthControllerSignup } from '@/api/generated'
import { publicInstance } from '@/api/instances/public-instance'
import { generateAuthData } from '@/api/mocks/auth'
import { Link } from '@/components/shared/link'
import { Button } from '@/components/ui/button'
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createRoute } from '@/hocs/create-route'
import { useNavigate } from '@/hooks/use-navigate'
import { paths } from '@/router'
import { sessionClient } from '@/services/session'
import { routes } from '@/utils/constants/routes-map'

export const Component = createRoute({
  Component: () => {
    const navigate = useNavigate()

    const { mutateAsync, isPending } = useAuthControllerSignup({
      client: { client: publicInstance },
      mutation: {
        async onSuccess(tokens) {
          await sessionClient.createSession(tokens)
          navigate({ to: { path: paths.home } })
        },
      },
    })

    return (
      <>
        <CardHeader>
          <CardTitle>Регистрация</CardTitle>
          <CardDescription>
            Создайте аккаунт, чтобы начать пользоваться сервисом.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              mutateAsync({ data: generateAuthData() })
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="register-email">Почта</Label>
              <Input
                id="register-email"
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-password">Пароль</Label>
              <Input
                id="register-password"
                type="password"
                placeholder="Придумайте пароль"
                autoComplete="new-password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-confirm">
                Повторите пароль
              </Label>
              <Input
                id="register-confirm"
                type="password"
                placeholder="Повторите пароль"
                autoComplete="new-password"
              />
            </div>
            <Button
              className="w-full"
              type="submit"
              disabled={isPending}
            >
              Создать аккаунт
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Уже есть аккаунт?{' '}
              <Link
                className="text-foreground hover:underline"
                to={{ path: routes.signIn }}
              >
                Войти
              </Link>
            </p>
          </form>
        </CardContent>
      </>
    )
  },
  isPrivate: false,
  redirectTo: paths.home,
})
