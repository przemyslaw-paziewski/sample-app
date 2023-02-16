import { type User } from "@/interfaces/interfaces"
import { fetchUsers } from "@/utils/usersUtils"
import { useQuery } from "react-query"

export const useUsers = (): {
  usersData: User[] | undefined
  isFetchingUsers: boolean
} => {
  const { data: usersData, isLoading: isFetchingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: async () => await fetchUsers(),
  })

  return {
    usersData,
    isFetchingUsers,
  }
}
