import { enums } from "@/constants/enums"
import { arrayHelper, fetchComments } from "@/utils/utils"
import { Button, Card, CardContent, Skeleton, Typography } from "@mui/material"
import { useReducer } from "react"
import { useQuery } from "react-query"

export const Comments = ({ postId }: { postId: string }): JSX.Element => {
  const { data: comments, isLoading: isFetchingComments } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => await fetchComments(postId),
  })
  const [areCommentsToggled, toggleComments] = useReducer(
    (value: boolean) => !value,
    false
  )

  return (
    <>
      <Button variant="contained" onClick={toggleComments}>
        {enums.SHOW_COMMENTS_BUTTON}
      </Button>
      {areCommentsToggled &&
        (isFetchingComments
          ? arrayHelper.map((el) => (
              <Skeleton
                variant="rectangular"
                width={"100"}
                height={"100"}
                key={el}
              />
            ))
          : comments?.map(({ id, email, body }) => (
              <Card key={id}>
                <CardContent sx={{ display: "flex" }}>
                  <Typography variant="body1" sx={{ flex: "0 0 300px" }}>
                    {email}
                  </Typography>
                  <Typography variant="body1">{body}</Typography>
                </CardContent>
              </Card>
            )))}
    </>
  )
}
