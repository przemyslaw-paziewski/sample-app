import Head from "next/head"
import useUsers from "@hooks/useUsers"
import { Container } from "@mui/system"
import { Card, CardContent, Typography } from "@mui/material"
import Link from "next/link"

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
        <title>Sample app</title>
        <meta name="description" content="Sample app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Container sx={containerStyles} maxWidth="xl">
          {data
            ?.slice(0, 8)
            .map(({ id, name, username, phone, website, company }) => (
              <Link
                href={`/users/${id }`}
                key={id}
                style={{ textDecoration: "none" }}
              >
                <Card>
                  <CardContent>
                    <Typography sx={{ fontSize: 20 }} gutterBottom>
                      {name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 15,
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                      }}
                      gutterBottom
                    >
                      <span>{username}</span>
                      <span>{phone}</span>
                      <span>{website}</span>
                      <Typography sx={{ fontSize: 20 }}>Company:</Typography>
                      <span>{company.name}</span>
                      <span>{company.catchPhrase}</span>
                      <span>{company.bs}</span>
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </Container>
      </main>
    </>
  )
}
