import type { AuthTokensDto } from '@/api/generated'

import { jwtVerify, SignJWT } from 'jose'
import moment from 'moment'

import { envConfig } from '../constants/config'

const secretKey = envConfig.SESSION_KEY
const encodedKey = new TextEncoder().encode(secretKey)

export const verifySession = async (session: string) =>
  await jwtVerify<AuthTokensDto>(session, encodedKey)

export const createSession = async (payload: AuthTokensDto) => {
  const expiredAt = moment().add(7, 'days').toDate()

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiredAt)
    .sign(encodedKey)
}
