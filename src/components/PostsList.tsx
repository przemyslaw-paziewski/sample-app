import { cardStyles, postsListStyle, titleTrimStyles } from "@/styles/styles"
import { arrayHelper, fetchUsersPosts } from "@/utils/usersUtils"
import { Button, Card, CardContent, Skeleton, Typography } from "@mui/material"
import { Container } from "@mui/system"
import Link from "next/link"
import { useQuery } from "react-query"
import DeleteIcon from "@mui/icons-material/Delete"
import { type BaseSyntheticEvent } from "react"

export default function PostsList({ id }: { id: string }): JSX.Element {
  const { data: usersPosts, isLoading: isFetchingPosts } = useQuery({
    queryKey: ["usersPosts", id],
    queryFn: async () => await fetchUsersPosts(id),
  })

  const handleDelete = (event: Event | BaseSyntheticEvent): void => {
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <Container maxWidth="xl" sx={postsListStyle}>
      {isFetchingPosts
        ? arrayHelper.map((el) => (
            <Skeleton
              variant="rectangular"
              width={"100"}
              height={"100"}
              key={el}
            />
          ))
        : usersPosts?.map(({ id, title }) => (
            <Link key={id} href="" style={{ textDecoration: "none" }}>
              <Card sx={{ ...cardStyles, width: "100%" }}>
                <CardContent sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    onClick={handleDelete}
                    variant="contained"
                    sx={{ marginRight: "auto" }}
                  >
                    <DeleteIcon />
                  </Button>
                  <Typography variant="h5" component="div" sx={titleTrimStyles}>
                    {title}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
    </Container>
  )
}
