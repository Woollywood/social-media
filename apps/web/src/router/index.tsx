import { createBrowserRouter, type RouteObject } from 'react-router'

import { AuthLayout } from '@/layouts/auth-layout'
import { DefaultLayout } from '@/layouts/default-layout'
import { ProviderLayout } from '@/layouts/provider-layout'
import { homeRoute } from '@/pages/home-page'
import { signInRoute } from '@/pages/sign-in'
import { signUpRoute } from '@/pages/sign-up'
import { routes } from '@/utils/constants/routes-map'
import { generateRouteMap } from '@/utils/helpers/router'

export const routerConfig = {
  element: <ProviderLayout />,
  children: [
    { element: <DefaultLayout />, children: [homeRoute] },
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
