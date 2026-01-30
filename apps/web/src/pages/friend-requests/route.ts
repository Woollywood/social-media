import type { RoutePage } from '@/types/router'

import { routes } from '@/utils/constants/routes-map'

export const friendRequestsRoute = {
  id: 'friend-requests',
  path: routes.friendRequests,
  lazy: () => import('./friend-requests'),
} as const satisfies RoutePage
