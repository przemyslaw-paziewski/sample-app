import axios from "@utils/axiosInstance"
import { useQuery, type UseQueryResult } from "react-query"

interface User {
  id: number
  name: string
  username: string
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

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
