import { type User } from "@/interfaces/interfaces"
import axios from "@utils/axiosInstance"

export async function fetchUsers(): Promise<User[]> {
  const res = await axios({
    method: "get",
    url: "users",
  })
  return res.data
}

export async function fetchSingleUser(id: string): Promise<User> {
  const res = await axios({
    method: "get",
    url: `users/${id}`,
  })
  return res.data
}
