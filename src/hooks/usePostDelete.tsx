import { type BaseSyntheticEvent } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useModal } from '@context/modalContext'
import PageTexts from '@enums/pageTexts'
import { type Posts } from '@interfaces/interfaces'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { deletePost } from '@utils/utils'

export const usePostDelete = (
  userId: string
): {
  handleDelete: (postId: string) => (event: Event | BaseSyntheticEvent) => void
} => {
  const { setModal, handleClose } = useModal()
  const queryClient = useQueryClient()
  const removePostMutation = useMutation(
    async (postId: string) => {
      await deletePost(postId)
    },
    {
      onMutate: async (postId: string) => {
        await queryClient.cancelQueries(['usersPosts', userId])
        const previousPosts = queryClient.getQueryData<Posts[]>([
          'usersPosts',
          userId,
        ])
        if (previousPosts != null && previousPosts.length > 0) {
          const filteredPosts = [...previousPosts].filter(
            (el) => el.id.toString() !== postId
          )
          queryClient.setQueryData<Posts[]>(
            ['usersPosts', userId],
            filteredPosts
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

  const handleDelete =
    (postId: string) =>
    (event: Event | BaseSyntheticEvent): void => {
      event.preventDefault()
      event.stopPropagation()
      setModal({
        isOpen: true,
        content: (
          <>
            <DialogTitle>{PageTexts.REMOVE_MODAL_TITLE}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {PageTexts.REMOVE_MODAL_TEXT}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>{PageTexts.CANCEL}</Button>
              <Button
                onClick={() => {
                  removePostMutation.mutate(postId)
                  handleClose()
                }}
                variant="contained"
              >
                {PageTexts.REMOVE}
              </Button>
            </DialogActions>
          </>
        ),
      })
    }

  return { handleDelete }
}
