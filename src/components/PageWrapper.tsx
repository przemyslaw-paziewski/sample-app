import Head from 'next/head'
import { type PageWrapperProps } from '@/interfaces/interfaces'

export default function PageWrapper({
  metaTitle,
  metaDescription,
  children,
}: PageWrapperProps): JSX.Element {
  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>{children}</main>
    </>
  )
}
