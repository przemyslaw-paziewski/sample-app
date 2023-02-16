import { useState } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ModalContextProvider } from '@context/modalContext'
import { CssBaseline } from '@mui/material'
import type { AppProps } from 'next/app'
import { ReactQueryDevtools } from 'react-query/devtools'

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
