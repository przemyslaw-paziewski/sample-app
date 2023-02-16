import { type User } from "@/interfaces/interfaces"
import { fetchSingleUser } from "@/utils/usersUtils"
import { useQuery } from "react-query"

export const useSingleUser = (
  userId: string
): { singleUserData: User | undefined } => {
  const { data: singleUserData } = useQuery({
    queryKey: ["singleUser", userId],
    queryFn: async () => await fetchSingleUser(userId),
  })

  return {
    singleUserData,
  }
}
