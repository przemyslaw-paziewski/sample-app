import { type BaseSyntheticEvent } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import RemoveConfirm from '@/components/RemoveConfirm'
import { useModal } from '@/context/modalContext'
import { type Posts } from '@/interfaces/interfaces'
import { deletePost } from '@/utils/utils'

interface Props {
  handleDelete: (postId: string) => (event: Event | BaseSyntheticEvent) => void
}

export const usePostDelete = (userId: string): Props => {
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

      // Normally, after a successful mutation or an error, I would refetch the data for the "usersPosts" query.
      // However, because this is a test API and the deletion is only simulated, I am commenting this out.
      //
      // If this was a production application and the deletion was permanent, I would call the following function:
      //
      // void queryClient.invalidateQueries("usersPosts")
      //
      // This would invalidate the cached data for the "usersPosts" query, so that the next time the query is run, it would refetch the latest data from the server.
    }
  )

  const handleSubmit = (postId: string): void => {
    removePostMutation.mutate(postId)
    handleClose()
  }

  const handleDelete =
    (postId: string) =>
    (event: Event | BaseSyntheticEvent): void => {
      event.preventDefault()
      event.stopPropagation()
      setModal({
        isOpen: true,
        content: (
          <RemoveConfirm
            handleSubmit={() => {
              handleSubmit(postId)
            }}
          />
        ),
      })
    }

  return { handleDelete }
}
