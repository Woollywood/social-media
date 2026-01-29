import type { RoutePage } from '@/types/router'

import { routes } from '@/utils/constants/routes-map'

export const homeRoute = {
  id: 'home',
  path: routes.home,
  lazy: () => import('./home-page'),
} as const satisfies RoutePage
