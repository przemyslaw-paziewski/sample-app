import { type User } from "@/interfaces/interfaces"
import { fetchUsers } from "@/utils/usersUtils"
import { useQuery, type UseQueryResult } from "react-query"

export default function useUsers(): UseQueryResult<User[], Error> {
  return useQuery("users", fetchUsers)
}
