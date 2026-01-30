import { createBrowserRouter, type RouteObject } from 'react-router'

import { AuthLayout } from '@/layouts/auth-layout'
import { DefaultLayout } from '@/layouts/default-layout'
import { FriendsLayout } from '@/layouts/friends-layout'
import { ProviderLayout } from '@/layouts/provider-layout'
import { findFriendsRoute } from '@/pages/find-friends'
import { friendRequestsRoute } from '@/pages/friend-requests'
import { friendsRoute } from '@/pages/friends'
import { homeRoute } from '@/pages/home-page'
import { outFriendRequestsRoute } from '@/pages/out-friend-requests'
import { signInRoute } from '@/pages/sign-in'
import { signUpRoute } from '@/pages/sign-up'
import { routes } from '@/utils/constants/routes-map'
import { generateRouteMap } from '@/utils/helpers/router'

export const routerConfig = {
  element: <ProviderLayout />,
  children: [
    {
      element: <DefaultLayout />,
      children: [
        homeRoute,
        {
          path: routes.friends,
          element: <FriendsLayout />,
          children: [
            friendsRoute,
            findFriendsRoute,
            outFriendRequestsRoute,
            friendRequestsRoute,
          ],
        },
      ],
    },
    {
      id: 'auth',
      path: routes.auth,
      element: <AuthLayout />,
      children: [signInRoute, signUpRoute],
    },
  ],
} as const satisfies RouteObject

export const paths = generateRouteMap([routerConfig])
export const router = createBrowserRouter([routerConfig])
