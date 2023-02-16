import { type BaseSyntheticEvent } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useModal } from '@context/modalContext'
import PageTexts from '@enums/pageTexts'
import { type Posts } from '@interfaces/interfaces'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import { createPost } from '@utils/utils'

export const usePostCreate = (
  userId: string
): {
  handlePostCreate: (event: Event | BaseSyntheticEvent) => void
} => {
  const { setModal, handleClose } = useModal()
  const queryClient = useQueryClient()
  const addPostMutation = useMutation(
    async ([title, content]: [string, string]) => {
      await createPost(title, content, Number(userId))
    },
    {
      onMutate: async ([title, content]: [string, string]) => {
        await queryClient.cancelQueries(['usersPosts', userId])
        const previousPosts = queryClient.getQueryData<Posts[]>([
          'usersPosts',
          userId,
        ])
        if (previousPosts != null && previousPosts.length > 0) {
          const postsWithNewOne = [
            ...previousPosts,
            {
              userId,
              id: parseFloat(
                (Math.random() * (1000000 - 10000) + 10000).toFixed(2)
              ),
              title,
              body: content,
            },
          ] as Posts[]

          queryClient.setQueryData<Posts[]>(
            ['usersPosts', userId],
            postsWithNewOne
          )
        }

        return { previousPosts }
      },

      onError: (_err, variables, context) => {
        if (
          context?.previousPosts != null &&
          context?.previousPosts.length > 0
        ) {
          queryClient.setQueryData<Posts[]>(
            ['usersPosts', userId],
            context.previousPosts
          )
        }
      },

      // Normalnie dodatkowo ponownie bym zfetchował to query po ununięciu lub errorze, ale tutaj, poniewaz api jest testowe, a usunięcie jest tylko symylucaję komentuję to.
      // onSettled: () => {
      //   void queryClient.invalidateQueries("usersPosts")
      // },
    }
  )

  const handleSubmit = (e: Event | BaseSyntheticEvent): void => {
    e.preventDefault()
    addPostMutation.mutate([e.target[0].value, e.target[1].value])
    handleClose()
  }

  const handlePostCreate = (event: Event | BaseSyntheticEvent): void => {
    event.preventDefault()
    event.stopPropagation()
    setModal({
      isOpen: true,
      content: (
        <>
          <DialogTitle>{PageTexts.ADD_MODAL_TITLE}</DialogTitle>
          <DialogContent sx={{ width: '500px' }}>
            <form onSubmit={handleSubmit}>
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
              <DialogActions>
                <Button onClick={handleClose} type="button">
                  {PageTexts.CANCEL}
                </Button>
                <Button type="submit" variant="contained">
                  {PageTexts.ADD}
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </>
      ),
    })
  }

  return { handlePostCreate }
}
