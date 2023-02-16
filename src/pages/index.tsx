import { Container } from "@mui/system"
import { enums } from "@constants/enums"
import CardComponent from "@components/CardComponent"
import { Skeleton } from "@mui/material"
import PageWrapper from "@/components/PageWrapper"
import { containerStyles } from "@/styles/styles"
import { arrayHelper, fetchUsers } from "@/utils/utils"
import { useQuery } from "react-query"

export default function Home(): JSX.Element {
  const { data: usersData, isLoading: isFetchingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: async () => await fetchUsers(),
  })

  return (
    <PageWrapper
      metaTitle={enums.HOME_PAGE_TITLE}
      metaDescription={enums.HOME_PAGE_TITLE}
    >
      <Container sx={containerStyles} maxWidth="xl">
        {isFetchingUsers
          ? arrayHelper.map((el) => (
              <Skeleton
                variant="rectangular"
                width={"100%"}
                height={"100%"}
                key={el}
              />
            ))
          : usersData
              ?.slice(0, 8)
              .map(({ id, name, username, phone, website, company }) => (
                <CardComponent
                  id={id}
                  name={name}
                  username={username}
                  phone={phone}
                  website={website}
                  company={company}
                  key={id}
                />
              ))}
      </Container>
    </PageWrapper>
  )
}
