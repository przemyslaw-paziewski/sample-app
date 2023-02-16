import { dehydrate, QueryClient, useQuery } from 'react-query'
import PageWrapper from '@components/PageWrapper'
import PostsList from '@components/PostsList'
import Links from '@enums/links'
import PageTexts from '@enums/pageTexts'
import { usePostCreate } from '@hooks/usePostCreate'
import AddIcon from '@mui/icons-material/Add'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Button, Container, Typography } from '@mui/material'
import { topContainerStyles } from '@styles/styles'
import { fetchSingleUser, fetchUsers } from '@utils/utils'
import { type GetStaticPaths, type GetStaticProps } from 'next'
import Link from 'next/link'

export default function UserDetailed({ id }: { id: string }): JSX.Element {
  const { handlePostCreate } = usePostCreate(id)

  const { data: singleUserData } = useQuery({
    queryKey: ['singleUser', id],
    queryFn: async () => await fetchSingleUser(id),
  })

  return (
    <PageWrapper
      metaTitle={`${PageTexts.USER_PAGE_TITLE} ${
        singleUserData?.name as string
      }`}
      metaDescription={PageTexts.USER_PAGE_DESCRIPTION}
    >
      <Container maxWidth="xl" sx={topContainerStyles}>
        <Link href={Links.HOME} style={{ color: '#1976d2' }}>
          <ArrowBackIcon fontSize="large" />
        </Link>
        <Typography variant="h2" align="center">
          {singleUserData?.name}
        </Typography>
        <Button variant="contained" onClick={handlePostCreate}>
          <AddIcon fontSize="large" />
        </Button>
      </Container>
      <PostsList id={id} />
    </PageWrapper>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await fetchUsers()
  const paths = users.map((el) => {
    return {
      params: {
        id: el.id.toString(),
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context?.params?.id
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['singleUser', id],
    queryFn: async () => await fetchSingleUser(id as string),
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id,
    },
  }
}
