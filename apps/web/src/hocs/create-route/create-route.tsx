/* eslint-disable react/display-name */

import type { CreateRouteParams } from './types'

import { Navigate } from 'react-router'

import { sessionClient } from '@/services/session'
import { routes } from '@/utils/constants/routes-map'

export const createRoute = ({
  Component,
  isPrivate = true,
  redirectTo = routes.auth,
}: CreateRouteParams) => {
  return () => {
    const isPrivateRedirectCondition =
      isPrivate && !sessionClient.hasSessionTokens()
    const isPublicRedirectCondition =
      !isPrivate && sessionClient.hasSessionTokens()

    if (isPrivateRedirectCondition || isPublicRedirectCondition) {
      return <Navigate to={redirectTo} />
    }

    return <Component />
  }
}
