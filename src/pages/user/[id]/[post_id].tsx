import PageWrapper from "@components/PageWrapper"
import { enums } from "@constants/enums"
import { Container, Typography } from "@mui/material"
import { fetchSinglePost, fetchSingleUser } from "@utils/utils"
import { type GetServerSideProps } from "next"
import { dehydrate, QueryClient, useQuery } from "react-query"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import Link from "next/link"
import { links } from "@constants/links"

export default function PostDetailed({
  userId,
  postId,
}: {
  userId: string
  postId: string
}): JSX.Element {
  const { data: singleUserData } = useQuery({
    queryKey: ["singleUser", userId],
    queryFn: async () => await fetchSingleUser(userId),
  })

  const { data: singlePostData } = useQuery({
    queryKey: ["singlePost", postId],
    queryFn: async () => await fetchSinglePost(postId),
  })

  return (
    <PageWrapper
      metaTitle={`${enums.POST_PAGE_META_TITLE} ${
        singlePostData?.title as string
      }`}
      metaDescription={enums.USER_PAGE_DESCRIPTION}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "30px",
          alignItems: "center",
        }}
      >
        <Link
          href={`/${links.USER_PAGE}/${userId}`}
          style={{ color: "#1976d2", marginRight: "auto" }}
        >
          <ArrowBackIcon fontSize="large" />
        </Link>
        <Typography variant="h2" align="center" sx={{ marginRight: "auto" }}>
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
    </PageWrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = context?.params?.id
  const postId = context?.params?.post_id
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["singleUser", userId],
    queryFn: async () => await fetchSingleUser(userId as string),
  })

  await queryClient.prefetchQuery({
    queryKey: ["singlePost", postId],
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
