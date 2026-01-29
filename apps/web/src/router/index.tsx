import { createBrowserRouter, type RouteObject } from 'react-router'

import { DefaultLayout } from '@/layouts/default-layout'
import { ProviderLayout } from '@/layouts/provider-layout'
import { homeRoute } from '@/pages/home-page'
import { generateRouteMap } from '@/utils/helpers/router'

export const routerConfig = {
  element: <ProviderLayout />,
  children: [{ element: <DefaultLayout />, children: [homeRoute] }],
} as const satisfies RouteObject

export const paths = generateRouteMap([routerConfig])
export const router = createBrowserRouter([routerConfig])
