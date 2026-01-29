import type { RoutePage } from '@/types/router'

import { routes } from '@/utils/constants/routes-map'

export const signInRoute = {
  id: 'sign-in',
  path: routes.signIn,
  lazy: () => import('./sign-in'),
} as const satisfies RoutePage
