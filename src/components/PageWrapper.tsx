import Head from 'next/head'
interface Props {
  metaTitle: string
  metaDescription: string
  children: JSX.Element[] | JSX.Element
}

export default function PageWrapper({
  metaTitle,
  metaDescription,
  children,
}: Props): JSX.Element {
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
