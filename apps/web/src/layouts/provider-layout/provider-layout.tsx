import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AxiosError } from 'axios'
import React from 'react'
import { Outlet } from 'react-router'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        const maxFailureCount = 3
        if (error instanceof AxiosError) {
          return false
        }
        return failureCount < maxFailureCount
      },
    },
  },
})

export const ProviderLayout: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
