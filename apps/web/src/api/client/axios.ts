import {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios'

import { clientInstance } from '../instances/client-instance'

export type ResponseErrorConfig<T> = AxiosError<T>

export type RequestConfig<TData = unknown> = {
  url?: string
  method: 'GET' | 'PUT' | 'PATCH' | 'POST' | 'DELETE'
  params?: unknown
  data?: TData
  responseType?:
    | 'arraybuffer'
    | 'blob'
    | 'document'
    | 'json'
    | 'text'
    | 'stream'
  signal?: AbortSignal
  headers?: AxiosRequestConfig['headers']
}

export type ResponseConfig<TData = unknown> = {
  data: TData
  status: number
  statusText: string
  headers?: AxiosResponse['headers']
}

export const client = async <
  TData,
  TError = unknown,
  TVariables = unknown,
>(
  config: RequestConfig<TVariables>
): Promise<ResponseConfig<TData>> => {
  const promise = clientInstance
    .request<TVariables, ResponseConfig<TData>>({ ...config })
    .catch((e: AxiosError<TError>) => {
      throw e
    })

  return promise
}
