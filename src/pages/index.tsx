import { useUsers } from "@hooks/useUsers"
import { Container } from "@mui/system"
import { enums } from "@constants/enums"
import CardComponent from "@components/CardComponent"
import { Skeleton } from "@mui/material"
import PageWrapper from "@/components/PageWrapper"

const containerStyles = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "30px",
  flexDirection: "column",
  padding: "30px 0",
  alignItems: "center",
  minHeight: "100vh",

  "@media(min-width: 700px)": {
    gridTemplateColumns: "1fr 1fr",
  },

  "@media(min-width: 1300px)": {
    gridTemplateColumns: "repeat(4, 1fr)",
  },
}
const arrayHelper = Array.from(Array(8).keys())

export default function Home(): JSX.Element {
  const { usersData, isFetchingUsers } = useUsers()

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
