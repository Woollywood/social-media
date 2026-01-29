import type { RoutePage } from '@/types/router'

import { routes } from '@/utils/constants/routes-map'

export const signUpRoute = {
  id: 'sign-up',
  path: routes.signUp,
  lazy: () => import('./sign-up'),
} as const satisfies RoutePage
