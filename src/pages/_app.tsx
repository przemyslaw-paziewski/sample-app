import type { AppProps } from "next/app"
import { ReactQueryDevtools } from "react-query/devtools"
import { Hydrate, QueryClient, QueryClientProvider } from "react-query"
import { CssBaseline } from "@mui/material"
import { useState } from "react"

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
          <CssBaseline>
            <Component {...pageProps} />
          </CssBaseline>
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}
