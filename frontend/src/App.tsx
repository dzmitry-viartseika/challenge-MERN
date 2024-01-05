import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Outlet } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastProvider } from './context/ToastContext'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css'
import React from 'react'
import { useIdleTimer } from 'react-idle-timer'
import { useLogOut } from './hooks/mutations/useLogOut'

const logger = {
  log: (...args: any[]) => console.log('[Query]', ...args),
  warn: (...args: any[]) => console.warn('[Query]', ...args),
  error: (...args: any[]) => console.error('[Query]', ...args),
}

const queryClient = new QueryClient({
  logger,
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})
const App = () => {
  const { logOutUser } = useLogOut()
  // const { isClient } = useUserRole();

  const onIdle = () => {
    logOutUser()
  }

  useIdleTimer({
    onIdle,
    timeout: 900_000,
    throttle: 500,
  })
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <main className="flex">
          <Outlet />
        </main>
      </ToastProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  )
}

App.displayName = 'App'
export default App
