import { enums } from "@/constants/enums"
import { useModal } from "@/context/modalContext"
import { type Posts } from "@/interfaces/interfaces"
import { createPost } from "@/utils/utils"
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material"
import { type BaseSyntheticEvent } from "react"
import { useMutation, useQueryClient } from "react-query"

export const usePostCreate = (
  userId: string
): {
  handlePostCreate: ([title, content]: [string, string]) => (
    event: Event | BaseSyntheticEvent
  ) => void
} => {
  const { setModal, handleClose } = useModal()
  const queryClient = useQueryClient()
  const addPostMutation = useMutation(
    async ([title, content]: [string, string]) => {
      await createPost(title, content, Number(userId))
    },
    {
      onMutate: async ([title, content]: [string, string]) => {
        await queryClient.cancelQueries(["usersPosts", userId])
        const previousPosts = queryClient.getQueryData<Posts[]>([
          "usersPosts",
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
            ["usersPosts", userId],
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
            ["usersPosts", userId],
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

  const handlePostCreate =
    ([title, content]: [string, string]) =>
    (event: Event | BaseSyntheticEvent): void => {
      event.preventDefault()
      event.stopPropagation()
      setModal({
        isOpen: true,
        content: (
          <>
            <DialogTitle>{enums.REMOVE_MODAL_TITLE}</DialogTitle>
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
              <Button onClick={handleClose}>{enums.CANCEL}</Button>
              <Button
                onClick={() => {
                  addPostMutation.mutate([title, content])
                  handleClose()
                }}
                variant="contained"
              >
                {enums.REMOVE}
              </Button>
            </DialogActions>
          </>
        ),
      })
    }

  return { handlePostCreate }
}
