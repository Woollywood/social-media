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
import { routes } from '@/utils/constants/routes-map'

export const Component = () => {
  return (
    <>
      <CardHeader>
        <CardTitle>Регистрация</CardTitle>
        <CardDescription>
          Создайте аккаунт, чтобы начать пользоваться сервисом.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
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
            <Label htmlFor="register-confirm">Повторите пароль</Label>
            <Input
              id="register-confirm"
              type="password"
              placeholder="Повторите пароль"
              autoComplete="new-password"
            />
          </div>
          <Button className="w-full" type="submit">
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
}
