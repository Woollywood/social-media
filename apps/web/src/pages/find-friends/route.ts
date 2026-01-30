import type { RoutePage } from '@/types/router'

import { routes } from '@/utils/constants/routes-map'

export const findFriendsRoute = {
  id: 'find-friends',
  path: routes.findFriends,
  lazy: () => import('./find-friends'),
} as const satisfies RoutePage
