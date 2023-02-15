import type { AppProps } from "next/app"
import { ReactQueryDevtools } from "react-query/devtools"
import { QueryClient, QueryClientProvider } from "react-query"
import { CssBaseline } from "@mui/material"

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CssBaseline>
          <Component {...pageProps} />
        </CssBaseline>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}
