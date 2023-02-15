import { type User } from "@/interfaces/User"
import axios from "@utils/axiosInstance"
import { useQuery, type UseQueryResult } from "react-query"

async function fetchUsers(): Promise<User[]> {
  const res = await axios({
    method: "get",
    url: "users",
  })
  return res.data
}

export default function useUsers(): UseQueryResult<User[], Error> {
  return useQuery("users", fetchUsers)
}
