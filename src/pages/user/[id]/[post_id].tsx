import { type GetServerSideProps } from 'next'
import Link from 'next/link'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Container, Typography } from '@mui/material'
import { Comments } from '@/components/Comments'
import PageWrapper from '@/components/PageWrapper'
import Links from '@/enums/links'
import PageTexts from '@/enums/pageTexts'
import { postsListStyle } from '@/styles/styles'
import { fetchSinglePost, fetchSingleUser } from '@/utils/utils'

interface Props {
  userId: string
  postId: string
}

export default function PostDetailed({ userId, postId }: Props): JSX.Element {
  const { data: singleUserData } = useQuery({
    queryKey: ['singleUser', userId],
    queryFn: async () => await fetchSingleUser(userId),
  })

  const { data: singlePostData } = useQuery({
    queryKey: ['singlePost', postId],
    queryFn: async () => await fetchSinglePost(postId),
  })

  return (
    <PageWrapper
      metaTitle={`${PageTexts.POST_PAGE_META_TITLE} ${
        singlePostData?.title as string
      }`}
      metaDescription={PageTexts.USER_PAGE_DESCRIPTION}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '30px',
          alignItems: 'center',
        }}
      >
        <Link
          href={`/${Links.USER_PAGE}/${userId}`}
          style={{ color: '#1976d2', marginRight: 'auto' }}
        >
          <ArrowBackIcon fontSize="large" />
        </Link>
        <Typography variant="h2" align="center" sx={{ marginRight: 'auto' }}>
          {singleUserData?.name}
        </Typography>
      </Container>
      <Container maxWidth="xl">
        <Typography variant="h4" align="center" fontWeight="bold">
          {singlePostData?.title}
        </Typography>
        <Typography variant="body1" align="center">
          {singlePostData?.body}
        </Typography>
      </Container>
      <Container maxWidth="xl" sx={postsListStyle}>
        <Comments postId={postId} />
      </Container>
    </PageWrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = context?.params?.id
  const postId = context?.params?.post_id
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['singleUser', userId],
    queryFn: async () => await fetchSingleUser(userId as string),
  })

  await queryClient.prefetchQuery({
    queryKey: ['singlePost', postId],
    queryFn: async () => await fetchSinglePost(postId as string),
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      userId,
      postId,
    },
  }
}
