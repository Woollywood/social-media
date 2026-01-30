import type { RoutePage } from '@/types/router'

import { routes } from '@/utils/constants/routes-map'

export const friendsRoute = {
  id: 'friends',
  path: routes.friends,
  lazy: () => import('./friends'),
} as const satisfies RoutePage
