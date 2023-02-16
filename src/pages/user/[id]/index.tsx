import PageWrapper from "@components/PageWrapper"
import { enums } from "@constants/enums"
import { Button, Container, Typography } from "@mui/material"
import { fetchSingleUser, fetchUsers } from "@utils/utils"
import { type GetStaticPaths, type GetStaticProps } from "next"
import { dehydrate, QueryClient, useQuery } from "react-query"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import Link from "next/link"
import { links } from "@constants/links"
import AddIcon from "@mui/icons-material/Add"
import { topContainerStyles } from "@/styles/styles"
import PostsList from "@/components/PostsList"
import { usePostCreate } from "@/hooks/usePostCreate"

export default function UserDetailed({ id }: { id: string }): JSX.Element {
  const { handlePostCreate } = usePostCreate(id)

  const { data: singleUserData } = useQuery({
    queryKey: ["singleUser", id],
    queryFn: async () => await fetchSingleUser(id),
  })

  return (
    <PageWrapper
      metaTitle={`${enums.USER_PAGE_TITLE} ${singleUserData?.name as string}`}
      metaDescription={enums.USER_PAGE_DESCRIPTION}
    >
      <Container maxWidth="xl" sx={topContainerStyles}>
        <Link href={links.HOME} style={{ color: "#1976d2" }}>
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
    queryKey: ["singleUser", id],
    queryFn: async () => await fetchSingleUser(id as string),
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id,
    },
  }
}
