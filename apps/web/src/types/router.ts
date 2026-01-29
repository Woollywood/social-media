import { type RouteObject } from 'react-router'

import { type routerConfig } from '@/router'

import { type ExtractConfig } from './libs/router'

export type RoutePage = Omit<RouteObject, 'id'> &
  Required<Pick<RouteObject, 'id'>>

type Paths = ExtractConfig<typeof routerConfig>
export type PathsKeys = Paths[keyof Paths]
