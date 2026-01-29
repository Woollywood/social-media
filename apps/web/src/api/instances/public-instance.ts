import { envConfig } from '@/utils/constants/config'
import { createAxiosInstance } from '@/utils/helpers/api'

export const publicInstance = createAxiosInstance({
  baseURL: envConfig.API_ENDPOINT,
})
