import {
  AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios'

import { paths } from '@/router'
import { sessionClient } from '@/services/session'
import { envConfig } from '@/utils/constants/config'
import { createAxiosInstance } from '@/utils/helpers/api'

import {
  authControllerRefresh,
  type AuthTokensDto,
} from '../generated'

import { publicInstance } from './public-instance'

class Interceptors {
  private refreshPromis: Promise<void> | null = null

  private async refreshing({
    refreshToken,
  }: Pick<AuthTokensDto, 'refreshToken'>) {
    this.refreshPromis = new Promise<void>(
      async (resolve, reject) => {
        try {
          const tokens = await authControllerRefresh(
            { refreshToken },
            { client: publicInstance }
          )
          await sessionClient.createSession(tokens)
        } catch (error) {
          reject(error)
        }

        resolve()
      }
    )

    await this.refreshPromis
    this.refreshPromis = null
  }

  async interceptRequest(config: InternalAxiosRequestConfig) {
    try {
      const tokens = await sessionClient.getSessionTokens()

      if (tokens) {
        const { accessToken } = tokens
        config.headers.Authorization = `Bearer ${accessToken}`
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
    return config
  }

  interceptError = async (
    error: AxiosError,
    instance: AxiosInstance
  ) => {
    const originalConfig = error.response?.config

    if (
      error.response?.status === 401 &&
      sessionClient.hasSessionTokens()
    ) {
      try {
        const { refreshToken } =
          await sessionClient.getSessionTokens()
        if (this.refreshPromis) {
          await this.refreshPromis
        } else {
          await this.refreshing({ refreshToken })
        }
        return instance.request(originalConfig!)
      } catch (error) {
        if (error instanceof Error) {
          sessionClient.deleteSession()
          window.location.href = paths['sign-up']
        }
      }
    }

    const response = error.response
    throw new AxiosError(
      response?.statusText,
      undefined,
      response?.config,
      response?.request,
      response
    )
  }
}

const interceptors = new Interceptors()
export const clientInstance = createAxiosInstance({
  baseURL: envConfig.API_ENDPOINT,
})
clientInstance.interceptors.request.use(interceptors.interceptRequest)
clientInstance.interceptors.response.use(
  (config) => config,
  (error) => interceptors.interceptError(error, clientInstance)
)
