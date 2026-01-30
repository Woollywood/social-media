import type { RoutePage } from '@/types/router'

import { routes } from '@/utils/constants/routes-map'

export const outFriendRequestsRoute = {
  id: 'out-friend-requests',
  path: routes.outFriendRequests,
  lazy: () => import('./out-friend-requests'),
} as const satisfies RoutePage
