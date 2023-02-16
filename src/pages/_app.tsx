import type { AppProps } from 'next/app'
import { useState } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { CssBaseline } from '@mui/material'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ModalContextProvider } from '@/context/modalContext'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { refetchOnWindowFocus: false } },
      })
  )

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ModalContextProvider>
            <CssBaseline>
              <Component {...pageProps} />
            </CssBaseline>
            <ReactQueryDevtools initialIsOpen={false} />
          </ModalContextProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}
