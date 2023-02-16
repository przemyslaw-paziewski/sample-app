import axios from '@utils/axiosInstance'
import { type Comment, type Posts, type User } from '@/interfaces/interfaces'

export const fetchUsers = async (): Promise<User[]> => {
  const res = await axios({
    method: 'get',
    url: 'users',
  })
  return res.data
}

export const fetchSingleUser = async (id: string): Promise<User> => {
  const res = await axios({
    method: 'get',
    url: `users/${id}`,
  })
  return res.data
}

export const fetchUsersPosts = async (id: string): Promise<Posts[]> => {
  const res = await axios({
    method: 'get',
    url: `users/${id}/posts`,
  })
  return res.data
}

export const arrayHelper = Array.from(Array(8).keys())

export const deletePost = async (postId: string): Promise<void> => {
  const res = await axios({
    method: 'delete',
    url: `posts/${postId}`,
  })

  if (res.status !== 200) {
    throw new Error()
  }
}

export const createPost = async (
  title: string,
  content: string,
  userId: number
): Promise<void> => {
  const res = await axios({
    method: 'post',
    url: 'posts',
    data: {
      title,
      content,
      userId,
    },
  })

  if (res.status !== 201) {
    throw new Error()
  }
}

export const fetchSinglePost = async (postId: string): Promise<Posts> => {
  const res = await axios({
    method: 'get',
    url: `posts/${postId}`,
  })
  return res.data
}

export const fetchComments = async (postId: string): Promise<Comment[]> => {
  const res = await axios({
    method: 'get',
    url: `posts/${postId}/comments`,
  })
  return res.data
}
