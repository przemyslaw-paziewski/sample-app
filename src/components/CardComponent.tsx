import Link from "next/link"
import { Card, CardContent, Typography } from "@mui/material"
import { type User } from "@/interfaces/User"
import { enums } from "@constants/enums"

export default function CardComponent({
  id,
  name,
  username,
  phone,
  website,
  company,
}: User): JSX.Element {
  const dataContainerStyles = {
    fontSize: 15,
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  }

  const cardStyles = {
    "@media(min-width:700px)": {
      "&:hover": {
        boxShadow: "5px 5px 10px #888888",
      },
    },
  }

  return (
    <Link href={`/users/${id}`} key={id} style={{ textDecoration: "none" }}>
      <Card sx={cardStyles}>
        <CardContent>
          <Typography sx={{ fontSize: 20 }} gutterBottom>
            {name}
          </Typography>
          <Typography sx={dataContainerStyles} gutterBottom>
            <span>{username}</span>
            <span>{phone}</span>
            <span>{website}</span>
            <Typography sx={{ fontSize: 20 }}>
              {enums.COMPANY_DATA_TITLE}
            </Typography>
            <span>{company.name}</span>
            <span>{company.catchPhrase}</span>
            <span>{company.bs}</span>
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}
