import { useSingleUser } from "@/hooks/useSingleUser"
import { fetchSingleUser, fetchUsers } from "@/utils/usersUtils"
import { type GetStaticPaths, type GetStaticProps } from "next"
import { dehydrate, QueryClient } from "react-query"

export default function UserDetails({ id }: { id: string }): JSX.Element {
  const { singleUserData } = useSingleUser(id)
  console.log(singleUserData)
  return <div>test</div>
}

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await fetchUsers()
  const paths = users.map((el) => {
    return {
      params: {
        id: el.id.toString(),
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context?.params?.id
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["singleUser", id],
    queryFn: async () => await fetchSingleUser(id as string),
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id,
    },
  }
}
