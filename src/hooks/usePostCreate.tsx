import { type BaseSyntheticEvent } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import NewPostForm from '@/components/NewPostForm'
import { useModal } from '@/context/modalContext'
import { type Posts } from '@/interfaces/interfaces'
import { createPost } from '@/utils/utils'

interface Props {
  handlePostCreate: (event: Event | BaseSyntheticEvent) => void
}

export const usePostCreate = (userId: string): Props => {
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
      content: <NewPostForm handleSubmit={handleSubmit} />,
    })
  }

  return { handlePostCreate }
}
