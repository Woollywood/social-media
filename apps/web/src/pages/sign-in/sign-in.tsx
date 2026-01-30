import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useAuthControllerLogin } from '@/api/generated'
import { Form } from '@/components/shared/inputs/form'
import { Input } from '@/components/shared/inputs/input'
import { Password } from '@/components/shared/inputs/password'
import { Link } from '@/components/shared/link'
import { Button } from '@/components/ui/button'
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { createConnectForm } from '@/hocs/create-connect-form'
import { createRoute } from '@/hocs/create-route'
import { useNavigate } from '@/hooks/use-navigate'
import { paths } from '@/router'
import { sessionClient } from '@/services/session'
import { routes } from '@/utils/constants/routes-map'

const schema = z.object({
  email: z.email(),
  password: z.string().min(8),
})

type Schema = z.infer<typeof schema>

const ConnectForm = createConnectForm<Schema>()

export const Component = createRoute({
  Component: () => {
    const navigate = useNavigate()
    const { mutateAsync: login, isPending } = useAuthControllerLogin({
      mutation: {
        async onSuccess(data) {
          await sessionClient.createSession(data)
          navigate({ to: { path: paths.home } })
        },
      },
    })

    return (
      <>
        <CardHeader>
          <CardTitle>Вход</CardTitle>
          <CardDescription>
            Используйте почту и пароль для входа в аккаунт.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form
            className="space-y-4"
            useFormProps={{
              resolver: zodResolver(schema),
              defaultValues: { email: '', password: '' },
            }}
            onSubmit={(data) => login({ data })}
          >
            <div className="space-y-2">
              <ConnectForm>
                {({ control }) => (
                  <Input
                    control={control}
                    name="email"
                    label="Почта"
                    placeholder="name@example.com"
                    autoComplete="email"
                  />
                )}
              </ConnectForm>
              <ConnectForm>
                {({ control }) => (
                  <Password
                    control={control}
                    name="password"
                    label="Пароль"
                    placeholder="Введите пароль"
                    autoComplete="current-password"
                  />
                )}
              </ConnectForm>
            </div>
            <Button
              className="w-full"
              type="submit"
              disabled={isPending}
            >
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
          </Form>
        </CardContent>
      </>
    )
  },
  isPrivate: false,
  redirectTo: paths.home,
})
