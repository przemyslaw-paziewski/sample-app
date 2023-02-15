import Head from "next/head"
import useUsers from "@hooks/useUsers"
import { Container } from "@mui/system"
import { enums } from "@/constans/enums"
import CardComponent from "@/components/CardComponent"

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

export default function Home(): JSX.Element {
  const { data } = useUsers()

  return (
    <>
      <Head>
        <title>{enums.PAGE_TITLE}</title>
        <meta name="description" content={enums.PAGE_TITLE} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Container sx={containerStyles} maxWidth="xl">
          {data
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
      </main>
    </>
  )
}
