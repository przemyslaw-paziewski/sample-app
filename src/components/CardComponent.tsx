import Link from "next/link"
import { Card, CardContent, Typography } from "@mui/material"
import { type User } from "@/interfaces/interfaces"
import { cardStyles, dataContainerStyles } from "@/styles/styles"
import PageTexts from "@/enums/pageTexts"
import Links from "@/enums/links"

export default function CardComponent({
  id,
  name,
  username,
  phone,
  website,
  company,
}: User): JSX.Element {
  return (
    <Link
      href={`${Links.USER_PAGE}/${id}`}
      key={id}
      style={{ textDecoration: "none" }}
    >
      <Card sx={cardStyles}>
        <CardContent>
          <Typography sx={{ fontSize: 20 }} gutterBottom>
            {name}
          </Typography>
          <Typography sx={dataContainerStyles} gutterBottom>
            <span>{username}</span>
            <span>{phone}</span>
            <span>{website}</span>
            <Typography sx={{ fontSize: 20 }} variant="body1" component="span">
              {PageTexts.COMPANY_DATA_TITLE}
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
