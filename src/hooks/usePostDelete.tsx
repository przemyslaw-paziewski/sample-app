import { enums } from "@/constants/enums"
import { useModal } from "@/context/modalContext"
import { type Posts } from "@/interfaces/interfaces"
import { deletePost } from "@/utils/utils"
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"
import { type BaseSyntheticEvent } from "react"
import { useMutation, useQueryClient } from "react-query"

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
        await queryClient.cancelQueries(["usersPosts", userId])
        const previousPosts = queryClient.getQueryData<Posts[]>([
          "usersPosts",
          userId,
        ])
        if (previousPosts != null) {
          console.log("test")
          const filteredPosts = [...previousPosts].filter(
            (el) => el.id.toString() !== postId
          )
          queryClient.setQueryData<Posts[]>(
            ["usersPosts", userId],
            filteredPosts
          )
        }

        return { previousPosts }
      },

      onError: (_err, variables, context) => {
        if (context?.previousPosts != null) {
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

  const handleDelete =
    (postId: string) =>
    (event: Event | BaseSyntheticEvent): void => {
      event.preventDefault()
      event.stopPropagation()
      setModal({
        isOpen: true,
        content: (
          <>
            <DialogTitle>{enums.REMOVE_MODAL_TITLE}</DialogTitle>
            <DialogContent>
              <DialogContentText>{enums.REMOVE_MODAL_TEXT}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>{enums.CANCEL}</Button>
              <Button
                onClick={() => {
                  removePostMutation.mutate(postId)
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

  return { handleDelete }
}
