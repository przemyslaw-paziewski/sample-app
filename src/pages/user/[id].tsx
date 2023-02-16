import PageWrapper from "@components/PageWrapper"
import { enums } from "@constants/enums"
import {
  Button,
  Container,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material"
import { fetchSingleUser, fetchUsers } from "@utils/usersUtils"
import { type GetStaticPaths, type GetStaticProps } from "next"
import { dehydrate, QueryClient, useQuery } from "react-query"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import Link from "next/link"
import { links } from "@constants/links"
import AddIcon from "@mui/icons-material/Add"
import { topContainerStyles } from "@/styles/styles"
import { useModal } from "@/context/modalContext"

export default function UserDetails({ id }: { id: string }): JSX.Element {
  const { setModal, handleClose } = useModal()

  const { data: singleUserData } = useQuery({
    queryKey: ["singleUser", id],
    queryFn: async () => await fetchSingleUser(id),
  })

  const handlePostAdd = (): void => {
    setModal({
      isOpen: true,
      content: (
        <>
          <DialogTitle id="edit-apartment">Add new post</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="content"
              label="Content"
              multiline
              rows={4}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose} variant="contained">
              Add
            </Button>
          </DialogActions>
        </>
      ),
    })
  }

  return (
    <PageWrapper
      metaTitle={`${enums.USER_PAGE_TITLE} ${singleUserData?.name as string}`}
      metaDescription={enums.USER_PAGE_DESCRIPTION}
    >
      <Container maxWidth="xl" sx={topContainerStyles}>
        <Link href={links.HOME}>
          <ArrowBackIcon fontSize="large" />
        </Link>
        <Typography variant="h2" align="center">
          {singleUserData?.name}
        </Typography>
        <Button variant="contained" onClick={handlePostAdd}>
          <AddIcon fontSize="large" />
        </Button>
      </Container>
      <Container maxWidth="xl">
        <List>
          <ListItem>Test</ListItem>
          <ListItem>Test</ListItem>
        </List>
      </Container>
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
