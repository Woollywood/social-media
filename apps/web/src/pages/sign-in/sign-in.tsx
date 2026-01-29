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
        <CardTitle>Вход</CardTitle>
        <CardDescription>
          Используйте почту и пароль для входа в аккаунт.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="login-email">Почта</Label>
            <Input
              id="login-email"
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="login-password">Пароль</Label>
            <Input
              id="login-password"
              type="password"
              placeholder="Введите пароль"
              autoComplete="current-password"
            />
          </div>
          <Button className="w-full" type="submit">
            Войти
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Нет аккаунта?{' '}
            <Link
              className="text-foreground hover:underline"
              to={{ path: routes.signUp }}
            >
              Зарегистрируйтесь
            </Link>
          </p>
        </form>
      </CardContent>
    </>
  )
}
