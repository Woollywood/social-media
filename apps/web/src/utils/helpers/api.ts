import axios, { type CreateAxiosDefaults } from 'axios'
import qs from 'qs'

export const createAxiosInstance = (config?: CreateAxiosDefaults) => {
  return axios.create({
    // adapter: 'fetch',
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: 'repeat' }),
    // withCredentials: true,
    ...config,
  })
}
