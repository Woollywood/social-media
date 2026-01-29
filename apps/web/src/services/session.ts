import Cookies from 'universal-cookie'

import { type AuthTokensDto } from '@/api/generated'
import { sessionCookieKey } from '@/utils/constants/session'
import { createSession, verifySession } from '@/utils/helpers/session'

class SessionClient {
  hasSessionTokens() {
    const cookies = new Cookies()
    const session = cookies.get<string | null>(sessionCookieKey)
    return !!session
  }

  async getSessionTokens() {
    const cookies = new Cookies()
    const session = cookies.get<string>(sessionCookieKey)
    const {
      payload: { accessToken, refreshToken },
    } = await verifySession(session)
    return { accessToken, refreshToken }
  }

  async createSession(tokens: AuthTokensDto) {
    const newSession = await createSession(tokens)
    const cookies = new Cookies(document.cookie, { path: '/' })
    cookies.set(sessionCookieKey, newSession)
  }

  deleteSession() {
    const cookies = new Cookies()
    cookies.remove(sessionCookieKey)
  }
}

export const sessionClient = new SessionClient()
