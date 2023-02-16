import Link from 'next/link'
import { Card, CardContent, Typography } from '@mui/material'
import Links from '@/enums/links'
import PageTexts from '@/enums/pageTexts'
import { type User } from '@/interfaces/interfaces'
import { cardStyles, dataContainerStyles } from '@/styles/styles'

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
      style={{ textDecoration: 'none' }}
    >
      <Card sx={cardStyles}>
        <CardContent>
          <Typography sx={{ fontSize: 20 }} gutterBottom>
            {name}
          </Typography>
          <Typography sx={dataContainerStyles} gutterBottom>
            {[username, phone, website].map((el) => (
              <span key={el}>{el}</span>
            ))}
            <Typography sx={{ fontSize: 20 }} variant="body1" component="span">
              {PageTexts.COMPANY_DATA_TITLE}
            </Typography>
            {Object.values(company).map((el) => (
              <span key={el}>{el}</span>
            ))}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}
