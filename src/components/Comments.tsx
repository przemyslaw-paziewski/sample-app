import { useReducer } from 'react'
import { useQuery } from 'react-query'
import PageTexts from '@enums/pageTexts'
import { Button, Card, CardContent, Skeleton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { arrayHelper, fetchComments } from '@utils/utils'

export const Comments = ({ postId }: { postId: string }): JSX.Element => {
  const { data: comments, isLoading: isFetchingComments } = useQuery({
    queryKey: ['comments', postId],
    queryFn: async () => await fetchComments(postId),
  })
  const [areCommentsToggled, toggleComments] = useReducer(
    (value: boolean) => !value,
    false
  )

  return (
    <>
      <Button variant="contained" onClick={toggleComments}>
        {PageTexts.SHOW_COMMENTS_BUTTON}
      </Button>
      {areCommentsToggled &&
        (isFetchingComments
          ? arrayHelper.map((el) => (
              <Skeleton
                variant="rectangular"
                width={'100'}
                height={'100'}
                key={el}
              />
            ))
          : comments?.map(({ id, email, body, name }) => (
              <Card key={id}>
                <CardContent
                  sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: '15px',
                    }}
                  >
                    <Typography variant="body1">{name}</Typography>
                    <Typography variant="body1">{email}</Typography>
                  </Box>
                  <Typography variant="body1">{body}</Typography>
                </CardContent>
              </Card>
            )))}
    </>
  )
}
