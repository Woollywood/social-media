import { Link as RouterLink } from 'react-router'

import { type PathsKeys } from '@/types/router'
import { generatePath } from '@/utils/helpers/router'

import { type ILinkProps } from './types'

export const Link = <T extends PathsKeys>({
  to,
  ...props
}: ILinkProps<T>) => {
  return <RouterLink to={generatePath(to)} {...props} />
}
